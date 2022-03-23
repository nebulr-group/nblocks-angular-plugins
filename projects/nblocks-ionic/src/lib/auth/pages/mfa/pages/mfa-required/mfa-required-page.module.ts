import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MfaRequiredPageRoutingModule } from './mfa-required-page-routing.module';
import { MfaRequiredPage } from './mfa-required.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MfaRequiredPageRoutingModule,
    TranslateModule,
  ],
  providers: [],
  declarations: [MfaRequiredPage]
})
export class MfaRequiredPageModule { }
