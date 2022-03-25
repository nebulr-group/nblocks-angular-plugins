import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MfaResetPage } from './mfa-reset.page';

const routes: Routes = [
  {
    path: '',
    component: MfaResetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MfaResetPageRoutingModule { }
