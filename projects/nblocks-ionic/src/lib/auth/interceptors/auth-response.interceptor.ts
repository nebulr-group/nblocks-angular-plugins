import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NBlocksLibService } from '../../nblocks-lib.service';
import { ToastService } from '../../shared/toast.service';

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {
  private authRoute = '/auth/';
  private authLoginRoute = '/auth/login';
  private graphQLUrl: string;

  constructor(
    private readonly navCtrl: NavController,
    private readonly injector: Injector,
    private readonly router: Router,
    private readonly nBlocksLibService: NBlocksLibService
  ) {
    this.graphQLUrl = this.nBlocksLibService.config.graphqlPath;
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this._handle(req, next);
  }

  private _handle(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>  {
    return next
      .handle(req)
      .pipe(
        tap((response: any) => {
          // GraphQL specific logic
          if (this._isGraphQLResponse(response)) {

            if (this._isGraphQLUnauthorized(response.body)) {
              throw new UnauthorizedException();
            }

            if (this._isGraphQLForbidden(response.body)) {
              throw new ForbiddenException();
            }
            
            if (response.body.errors) {
              throw new GenericGraphqlException(response.body)
            }
          }
        }),
        catchError((error) => this._handleError(error)),
      );
  }

  private _handleError(error: HttpErrorResponse): Observable<never> {
    switch (error.status) {
      case 401:
        console.log("Caught 401 error", error);
        if (!this.router.url.startsWith(this.authRoute)) {
          this.navCtrl.navigateRoot(this.authLoginRoute);
          this._presentToast(["UNAUTHORIZED"], false);
        }
        break;

      case 403:
        console.log("Caught 403 error", error);
        if (!this.router.url.startsWith(this.authRoute)) {
          this._presentToast(["FORBIDDEN"], true);
        }
        break;
    
      default:
        if (error instanceof GenericGraphqlException) {
          console.log("Caught GenericGraphqlException", error);
          this._presentToast(error.errors.map((e) => e.extensions.code), true);
        } else {
          console.log("Caught Other error", error);
          this._presentToast(["GENERAL"], true);
        }
        break;
    }

    return throwError(error);
  }

  private _isGraphQLResponse(response: any): boolean {
    return (
      !!response &&
      response.status === 200 &&
      !!response.url &&
      response.url.startsWith(this.graphQLUrl) &&
      !!response.body
    );
  }

  private _isGraphQLUnauthorized(body: any): boolean {
    const data = body.data;
    const errors: Array<any> = body.errors;
    return !data && errors.some((e) => e.message === 'Unauthorized');
  }

  private _isGraphQLForbidden(body: any): boolean {
    const data = body.data;
    const errors: Array<any> = body.errors;
    return !data && errors.some((e) => e.message === 'Forbidden');
  }

  /**
   * @param translationKeys array of translation keys
   */
  private async _presentToast(translationKeys: string[], error: boolean): Promise<void> {
    const toastService = this.injector.get<ToastService>(ToastService);
    if (error)
      await toastService.presentError(translationKeys);
    else
      await toastService.presentMessage(translationKeys);
  }
}

class UnauthorizedException extends HttpErrorResponse {
  constructor() {
    super({status: 401, statusText: "Unauthorized"});
  }
}

class ForbiddenException extends HttpErrorResponse {
  constructor() {
    super({status: 403, statusText: "Forbidden"});
  }
}

class GenericGraphqlException extends HttpErrorResponse {
  errors:{extensions: {code: string}, message: string}[];
  constructor(body: any) {
    super({status: 500, statusText: "General error"});
    this.errors = body.errors;
  }
}
