import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MfaResetPageRoutingModule } from './mfa-reset-page-routing.module';
import { MfaResetPage } from './mfa-reset.page';
import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MfaResetPageRoutingModule,
    TranslateModule,
    FormsModule,
    SharedComponentsModule
  ],
  providers: [],
  declarations: [MfaResetPage]
})
export class MfaResetPageModule { }
