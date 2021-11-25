import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TenantComponentsModule } from '../../components/tenant-components.module';
import { TenantService } from '../../tenant.service';
import { TenantPageRoutingModule } from './tenant-page-routing.module';
import { TenantPage } from './tenant.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TenantPageRoutingModule,
    TranslateModule,
    TenantComponentsModule
  ],
  providers: [TenantService],
  declarations: [TenantPage]
})
export class TenantPageModule { }
