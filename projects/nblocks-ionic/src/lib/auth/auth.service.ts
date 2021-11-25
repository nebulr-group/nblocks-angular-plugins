import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NBlocksLibService } from '../nblocks-lib.service';
import { AuthTenantUserResponseDto } from './models/auth-tenant-user-response.dto';
import { CurrentUser } from './models/current-user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_STORAGE_KEY = "x-auth-token";
  private readonly USER_STORAGE_KEY = "x-tenant-user-id";
  private readonly ENDPOINTS = {
    authenticate: "/auth-proxy/authenticate",
    authenticated: "/auth-proxy/authenticated",
    tenantUsers: "/auth-proxy/tenantUsers",
    currentUser: "/auth/currentUser",
    password: "/auth-proxy/password",
    user: "/auth-proxy/user"
  }

  private BASE_URL: string;

  private readonly _currentUserSource = new BehaviorSubject<CurrentUser>(new CurrentUser(false));
  readonly currentUser$ = this._currentUserSource.asObservable();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly nBlocksLibService: NBlocksLibService
  ) {
    this.BASE_URL = this.nBlocksLibService.config.apiHost;
    this.checkCurrentUserAuthenticated();
  }

  private async checkCurrentUserAuthenticated(): Promise<void> {
    if (await this.hasFullAuthContext())
      if (await this.authenticated())
        this.userDidAuthenticate();
  }

  getTrademarkParams(): {year: string} {
    return {year:`${new Date().getFullYear()}`};
  }

  async authenticate(username:string, password:string): Promise<void> {
    const result:any = await this.httpClient.post(`${this.BASE_URL}${this.ENDPOINTS.authenticate}`, {username, password}).toPromise();
    await Storage.set({key: this.TOKEN_STORAGE_KEY, value: result.token});
  }

  async loadTenantUsers():Promise<any> {
    return this.httpClient.get(`${this.BASE_URL}${this.ENDPOINTS.tenantUsers}`).toPromise();
  }

  async getAuthToken(): Promise<string | null> {
    return (await Storage.get({ key: this.TOKEN_STORAGE_KEY })).value;
  }

  async getTenantUserId(): Promise<string | null> {
    return (await Storage.get({ key: this.USER_STORAGE_KEY })).value;
  }

  async setTenantUserId(id:string):Promise<void> {
    await Storage.set({key: this.USER_STORAGE_KEY, value: id});
  }

  async authenticated(): Promise<boolean> {
    const response: any = await this.httpClient
      .get(`${this.BASE_URL}${this.ENDPOINTS.authenticated}`)
      .toPromise();
    return response.authenticated;
  }

  async forgotPassword(username:string): Promise<void> {
    await this.httpClient.post(`${this.BASE_URL}${this.ENDPOINTS.password}`, {username}).toPromise();
  }

  async resetPassword(token:string, password:string): Promise<void> {
    await this.httpClient.put(`${this.BASE_URL}${this.ENDPOINTS.password}`, {token, password}).toPromise();
  }

  async updateUserInfo(
    firstName: string,
    lastName: string,
    phoneNumber: string,
  ): Promise<void> {
    await this.httpClient.put(`${this.BASE_URL}${this.ENDPOINTS.user}`, { firstName, lastName, phoneNumber }).toPromise();
  }

  /** Checks if localstorage contains all auth related keys needed to be "fully authenticated" */
  async hasFullAuthContext(): Promise<boolean> {
    return !!(await this.getAuthToken()) && !!(await this.getTenantUserId());
  }

  async deauthenticate(): Promise<void> {
    //TODO Call auth/deauthenticate? (Remove API session)?
    // this.apollo.getClient().resetStore();?
    await this.clearAuthStorage();
  }

  async clearAuthStorage(): Promise<void> {
    await Promise.all([
      Storage.remove({ key: this.TOKEN_STORAGE_KEY }),
      Storage.remove({ key: this.USER_STORAGE_KEY }),
    ]);
    console.log("Auth context cleared");
  }

  /**
     * Should be called from a component / service that just performed an authentication process
     * Lets this service (re)fetch currentUser and push update to all other subscribers
     */
  userDidAuthenticate(): void {
    this._setCurrentUser();
  }

  /**
   * Fetch current user over HTTP and tell subscribers
   */
  private _setCurrentUser(): void {
      //TODO add rxjs catchError
      this.httpClient.get<AuthTenantUserResponseDto>(
          `${this.BASE_URL}${this.ENDPOINTS.currentUser}`).pipe(
              map((tu) => new CurrentUser(true, tu))).subscribe(currentUser => {this._currentUserSource.next(currentUser)},
              error => { 
                  if (error instanceof HttpErrorResponse) {
                      console.log("handled error", error);
                  } else {
                      console.error("Handled generic error", error)
                  } 
              }
      );
  }
}
