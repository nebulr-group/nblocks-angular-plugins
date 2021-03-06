import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TenantPageModule } from './pages/tenant/tenant-page.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => TenantPageModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantRoutingModule { }
