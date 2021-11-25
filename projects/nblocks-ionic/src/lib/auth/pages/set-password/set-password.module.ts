import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SetPasswordPageRoutingModule } from './set-password-routing.module';
import { SetPasswordPage } from './set-password.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SetPasswordPageRoutingModule,
    TranslateModule,
    SharedComponentsModule
  ],
  providers: [],
  declarations: [SetPasswordPage],
})
export class SetPasswordPageModule {}
