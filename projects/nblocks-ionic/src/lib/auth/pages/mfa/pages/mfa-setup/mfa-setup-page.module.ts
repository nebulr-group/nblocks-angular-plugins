import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MfaSetupPageRoutingModule } from './mfa-setup-page-routing.module';
import { MfaSetupPage } from './mfa-setup.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MfaSetupPageRoutingModule,
    TranslateModule,
  ],
  providers: [],
  declarations: [MfaSetupPage]
})
export class MfaSetupPageModule { }
