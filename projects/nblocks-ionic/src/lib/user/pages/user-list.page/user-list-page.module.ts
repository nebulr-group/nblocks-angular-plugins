import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserComponentsModule } from '../../components/user-components.module';
import { UserListPageRoutingModule } from './user-list-page-routing.module';
import { UserListPage } from './user-list.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UserListPageRoutingModule,
    TranslateModule,
    UserComponentsModule
  ],
  providers: [],
  declarations: [UserListPage]
})
export class UserListPageModule { }
