import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MfaSetupPage } from './mfa-setup.page';

const routes: Routes = [
  {
    path: '',
    component: MfaSetupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MfaSetupPageRoutingModule { }
