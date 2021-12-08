import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant } from '../../../generated/graphql';
import { TenantService } from '../../tenant.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'nblocks-edit-tenant',
  templateUrl: './edit-tenant.component.html',
  styleUrls: ['./edit-tenant.component.css']
})
export class EditTenantComponent implements OnInit {
  readonly EDIT_ROLES = ['OWNER'];

  mutableTenant?:Tenant;
  tenant$!: Observable<Tenant>;

  cities: City[];

  selectedCity?: City;
  
  constructor(
    private readonly tenantService: TenantService,
    private readonly primengConfig: PrimeNGConfig
  ) {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }

  ngOnInit(): void {
    
    this.tenant$ = this.getTenant();

    this.tenant$.subscribe(t => {
      this.mutableTenant = JSON.parse(JSON.stringify(t));
    });
  }

  private getTenant():Observable<Tenant>{
    return this.tenantService.getTenant();
  }

  private updateTenant():Observable<Tenant> {
    const {name, locale} = this.mutableTenant as Tenant;
    return this.tenantService.updateTenant(name, locale as string);
  }

}

interface City {
  name: string,
  code: string
}

