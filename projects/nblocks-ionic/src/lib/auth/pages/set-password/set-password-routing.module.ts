import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetPasswordPage } from './set-password.page';

const routes: Routes = [
  {
    path: '',
    component: SetPasswordPage
  },
  {
    path: ':token',
    component: SetPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetPasswordPageRoutingModule { }
