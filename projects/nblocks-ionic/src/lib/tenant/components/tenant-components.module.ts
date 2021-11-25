import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTenantComponent } from './edit-tenant/edit-tenant.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedDirectivesModule } from '../../shared/directives/shared-directives.module';



@NgModule({
  declarations: [
    EditTenantComponent,
  ],
  exports: [
    EditTenantComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    SharedDirectivesModule,
  ]
})
export class TenantComponentsModule { }
