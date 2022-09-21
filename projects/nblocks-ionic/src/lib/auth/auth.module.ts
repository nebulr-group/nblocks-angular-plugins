import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRequestInterceptor } from './interceptors/auth-request.interceptor';
import { AuthResponseInterceptor } from './interceptors/auth-response.interceptor';

/** Http interceptor providers in outside-in order */
export const NBLOCKS_AUTH_HTTP_INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthRequestInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthResponseInterceptor, multi: true },
];

@NgModule({
  declarations: [],
  providers: [],
  exports: [],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]

})
export class AuthModule { }
