import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { StartPage } from './start.page';
import { LoaderModule } from '../../../shared/modules/loader/loader.module';
import { StartPageRoutingModule } from './start-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    StartPageRoutingModule,
    TranslateModule,
    LoaderModule
  ],
  providers: [],
  declarations: [StartPage]
})
export class StartPageModule { }
