import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseUserPage } from './choose-user.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseUserPage
  },
  {
    path: ':id',
    component: ChooseUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseUserPageRoutingModule { }
