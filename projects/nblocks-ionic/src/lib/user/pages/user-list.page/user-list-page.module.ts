import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { UserComponentsModule } from '../../components/user-components.module';
import { UserListPageRoutingModule } from './user-list-page-routing.module';
import { UserListPage } from './user-list.page';
import { LoaderModule } from '../../../shared/modules/loader/loader.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UserListPageRoutingModule,
    TranslateModule,
    UserComponentsModule,
    LoaderModule
  ],
  providers: [],
  declarations: [UserListPage]
})
export class UserListPageModule { }
