import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedComponentsModule } from '../../../shared/components/shared-components.module';
import { ChooseUserPageRoutingModule } from './choose-user-routing.module';
import { ChooseUserPage } from './choose-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseUserPageRoutingModule,
    TranslateModule,
    SharedComponentsModule
  ],
  providers: [],
  declarations: [ChooseUserPage]
})
export class ChooseUserPageModule { }
