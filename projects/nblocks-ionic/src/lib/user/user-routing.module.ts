import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListPageModule } from './pages/user-list.page/user-list-page.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: () => UserListPageModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
