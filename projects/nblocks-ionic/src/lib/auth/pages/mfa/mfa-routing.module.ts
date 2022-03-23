import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MfaRequiredPageModule } from './pages/mfa-required/mfa-required-page.module';
import { MfaResetPageModule } from './pages/mfa-reset/mfa-reset-page.module';
import { MfaSetupPageModule } from './pages/mfa-setup/mfa-setup-page.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'required',
    pathMatch: 'full'
  },
  {
    path: 'required',
    loadChildren: () => MfaRequiredPageModule
  },
  {
    path: 'setup',
    loadChildren: () => MfaSetupPageModule
  },
  {
    path: 'reset',
    loadChildren: () => MfaResetPageModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MfaRoutingModule { }
