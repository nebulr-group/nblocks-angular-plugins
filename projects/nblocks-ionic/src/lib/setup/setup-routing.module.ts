import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupPageModule } from './pages/signup.page/signup.module';
import { StartPageModule } from './pages/start.page/start-page.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'start',
    loadChildren: () => StartPageModule
  },
  {
    path: 'signup',
    loadChildren: () => SignupPageModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
