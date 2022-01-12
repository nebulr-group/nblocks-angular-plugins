import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialLoginPage } from './social-login.page';

const routes: Routes = [
  {
    path: '',
    component: SocialLoginPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialLoginPageRoutingModule {}
