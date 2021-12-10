import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedDirectivesModule } from '../../shared/directives/shared-directives.module';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserListComponent
  ],
  exports: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TableModule,
    InputSwitchModule,
    DropdownModule,
    TranslateModule,
    SharedDirectivesModule,
    SharedPipesModule
  ]
})
export class UserComponentsModule { }
