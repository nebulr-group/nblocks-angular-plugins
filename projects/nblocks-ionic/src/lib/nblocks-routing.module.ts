import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { TenantModule } from './tenant/tenant.module';
import { UserModule } from './user/user.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => AuthModule
  },
  {
    path: 'tenant',
    loadChildren: () => TenantModule
  },
  {
    path: 'user',
    loadChildren: () => UserModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NBlocksRoutingModule {}
