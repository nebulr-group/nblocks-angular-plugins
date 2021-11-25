import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedDirectivesModule } from '../../shared/directives/shared-directives.module';
import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';



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
    TranslateModule,
    SharedDirectivesModule,
    SharedPipesModule
  ]
})
export class UserComponentsModule { }
