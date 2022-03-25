import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, of, throwError } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { NBlocksLibService } from '../../nblocks-lib.service';

@Injectable()
export class AuthRequestInterceptor implements HttpInterceptor {
  
  private authRoute = '/auth/';
  private authLoginRoute = '/auth/login';
  private publicAssetPaths = ['./assets', 'assets'];
  private openRoutes:string[];

  constructor(
    private readonly authService: AuthService,
    private readonly nBlocksLibService: NBlocksLibService,
    private readonly router: Router,
    private navCtrl: NavController,
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
    const url = this.getUrlWithoutParams();
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
      if (!this.isPublicAsset(req.url)  && !this.isOpenRoute(url) && !url.startsWith(this.authRoute)) {
        console.log(
          'Request is missing authToken and made outside of the /auth route and open routes fron environment - going to login screen'
        );
        this.navCtrl.navigateRoot(this.authLoginRoute);
        throw new Error("Request is missing authToken and made outside of the /auth route and open routes fron environment")
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

  isPublicAsset(url: string): boolean {
    return this.publicAssetPaths.filter(p => url.startsWith(p)).length > 0
  }

  private getUrlWithoutParams() {
    const urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams = {};
    return urlTree.toString();
  }

  private handleError(error: any): Observable<any> {
    console.log("Received request error", error);
    return throwError(error);
  }
}
