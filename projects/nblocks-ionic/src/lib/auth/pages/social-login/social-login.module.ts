import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { SocialLoginPageRoutingModule } from './social-login-routing.module';

import { SocialLoginPage } from './social-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    SocialLoginPageRoutingModule,
  ],
  declarations: [SocialLoginPage],
})
export class SocialLoginPageModule {}
