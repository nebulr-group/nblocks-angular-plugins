import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { NBlocksLibService } from '../../nblocks-lib.service';

@Injectable()
export class AuthRequestInterceptor implements HttpInterceptor {
  
  private openRoutes:string[];

  constructor(
    private readonly authService: AuthService,
    private readonly nBlocksLibService: NBlocksLibService,
    private readonly router: Router
  ) {
    this.openRoutes = this.nBlocksLibService.config.openRoutes;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler): Promise<any> {
    //FIXME just attach credentials to calls made to Nebulr APIs. Otherwise we expose credentials to other servers
    const [authToken, mfaToken, tenantUserId] = await Promise.all([this.authService.getAuthToken(), this.authService.getMfaToken(), this.authService.getTenantUserId()]);
    if (req.body?.operationName)
      console.log(req.body.operationName, req.body.variables, new Date());
    if (authToken) {
      req = req.clone({
        setHeaders: {
          'x-auth-token': mfaToken ? `${authToken}_${mfaToken}` : authToken,
        },
      });
    } else {
      // Requests missing authToken and made outside of the /auth route and open routes from environment should get to login screen
      if (!AuthService.isAssetsUrl(req.url)) {
        const redirected = await this.authService.handleAuthenticatedUserRedirect();
        if (redirected) {
          throw new Error("Request is missing authToken and made outside of the /auth route and open routes fron environment");
        }
      }
    }
    if (tenantUserId) {
      req = req.clone({
        setHeaders: {
          'x-tenant-user-id': tenantUserId,
        },
      });
    }
    return next.handle(req).toPromise();
  }

  isOpenRoute(route: string): boolean {
    if (this.openRoutes.includes(route)) {
      return true;
    } else {
      return false;
    }
  }

  private handleError(error: any): Observable<any> {
    console.log("Received request error", error);
    return throwError(error);
  }
}
