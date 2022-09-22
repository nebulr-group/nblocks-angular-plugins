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
  firstName?: string;
  lastName?: string;

  constructor(
    private readonly tenantService: TenantService
  ) {}

  setEmail(input: any): void {
    this.email = input.detail.value;
  }

  setFirstName(input: any): void {
    this.firstName = input.detail.value;
  }

  setLastName(input: any): void {
    this.lastName = input.detail.value;
  }

  createTenant(): void {
    this.loading = true;
    this.tenantService.createTenantAnonymous({owner: {email: this.email, firstName: this.firstName, lastName: this.lastName }, plan: "BASIC"});
    this.tenantResult = true;
    this.loading = false;
  }
}
