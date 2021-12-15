import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedDirectivesModule } from '../../shared/directives/shared-directives.module';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChipsModule } from 'primeng/chips';
import { FormsModule } from '@angular/forms';
import { InviteUsersModalComponent } from './user-list/invite-users-modal/invite-users-modal.component';
import { UserPopoverComponent } from './user-list/user-popover/user-popover.component';

@NgModule({
  declarations: [
    UserListComponent,
    InviteUsersModalComponent,
    UserPopoverComponent
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
    ChipsModule,
    DropdownModule,
    TranslateModule,
    SharedDirectivesModule,
    SharedPipesModule
  ]
})
export class UserComponentsModule { }
