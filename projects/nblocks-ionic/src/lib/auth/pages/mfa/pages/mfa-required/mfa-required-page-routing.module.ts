import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MfaRequiredPage } from './mfa-required.page';

const routes: Routes = [
  {
    path: '',
    component: MfaRequiredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MfaRequiredPageRoutingModule { }
