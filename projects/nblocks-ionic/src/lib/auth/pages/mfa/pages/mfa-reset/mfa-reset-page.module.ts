import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MfaResetPageRoutingModule } from './mfa-reset-page-routing.module';
import { MfaResetPage } from './mfa-reset.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MfaResetPageRoutingModule,
    TranslateModule,
  ],
  providers: [],
  declarations: [MfaResetPage]
})
export class MfaResetPageModule { }
