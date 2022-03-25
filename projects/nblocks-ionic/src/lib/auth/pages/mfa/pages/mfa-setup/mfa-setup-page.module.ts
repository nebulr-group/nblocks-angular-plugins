import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';
import { MfaSetupPageRoutingModule } from './mfa-setup-page-routing.module';
import { MfaSetupPage } from './mfa-setup.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MfaSetupPageRoutingModule,
    TranslateModule,
    FormsModule,
    SharedComponentsModule
  ],
  providers: [],
  declarations: [MfaSetupPage]
})
export class MfaSetupPageModule { }
