import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { SetupModule } from './setup/setup.module';
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
  },
  {
    path: 'setup', //TODO should be manually included by dev? We don't want this to be available forever...
    loadChildren: () => SetupModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NBlocksRoutingModule {}
