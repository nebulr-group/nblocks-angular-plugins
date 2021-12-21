import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTenantComponent } from './edit-tenant/edit-tenant.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedDirectivesModule } from '../../shared/directives/shared-directives.module';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';



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
    DropdownModule,
    FormsModule
  ]
})
export class TenantComponentsModule { }
