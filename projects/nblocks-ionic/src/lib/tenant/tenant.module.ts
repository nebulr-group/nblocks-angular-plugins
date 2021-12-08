import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantRoutingModule } from './tenant-routing.module';
import { TenantPageModule } from './pages/tenant/tenant-page.module';



@NgModule({
  declarations: [],
  exports: [],
  imports: [
    CommonModule,
    TenantRoutingModule,
    TenantPageModule
  ]
})
export class TenantModule { }
