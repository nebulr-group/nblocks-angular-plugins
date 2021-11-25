import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { LogoComponent } from './logo/logo.component';
import { CurrentUserDebugComponent } from './current-user-debug/current-user-debug.component';

@NgModule({
  declarations: [FooterComponent, LogoComponent, CurrentUserDebugComponent],
  exports: [FooterComponent, LogoComponent, CurrentUserDebugComponent],
  imports: [
    IonicModule,
    CommonModule,
    TranslateModule
  ]
})
export class SharedComponentsModule { }
