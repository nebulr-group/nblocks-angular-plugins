import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseUserPageModule } from './pages/choose-user/choose-user.module';
import { ForgotPasswordPageModule } from './pages/forgot-password/forgot-password.module';
import { LoginPageModule } from './pages/login/login.module';
import { LogoutPageModule } from './pages/logout/logout.module';
import { MfaModule } from './pages/mfa/mfa.module';
import { OnboardingPageModule } from './pages/onboarding/onboarding.module';
import { SetPasswordPageModule } from './pages/set-password/set-password.module';
import { SocialLoginPageModule } from './pages/social-login/social-login.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => LoginPageModule
  },
  {
    path: 'choose-user',
    loadChildren: () => ChooseUserPageModule
  },
  {
    path: 'forgot-password',
    loadChildren: () => ForgotPasswordPageModule
  },
  {
    path: 'set-password',
    loadChildren: () => SetPasswordPageModule
  },
  {
    path: 'logout',
    loadChildren: () => LogoutPageModule
  },
  {
    path: 'onboarding',
    loadChildren: () => OnboardingPageModule
  },
  {
    path: 'social-login',
    loadChildren: () => SocialLoginPageModule
  },
  {
    path: 'mfa',
    loadChildren: () => MfaModule
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
