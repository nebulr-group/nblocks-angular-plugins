import { Component } from '@angular/core';
import { TenantService } from '../../../tenant/tenant.service';

@Component({
  selector: 'nblocks-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage {
  loading = false;
  tenantResult = false;
  email: string = "";

  constructor(
    private readonly tenantService: TenantService
  ) {}

  setEmail(input: any): void {
    this.email = input.detail.value;
  }

  createTenant(): void {
    this.loading = true;
    this.tenantService.createTenantAnonymous({email: this.email, plan: "BASIC"});
    this.tenantResult = true;
    this.loading = false;
  }
}
