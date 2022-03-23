import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';
import { MfaRequiredPageRoutingModule } from './mfa-required-page-routing.module';
import { MfaRequiredPage } from './mfa-required.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MfaRequiredPageRoutingModule,
    TranslateModule,
    FormsModule,
    SharedComponentsModule
  ],
  providers: [],
  declarations: [MfaRequiredPage]
})
export class MfaRequiredPageModule { }
