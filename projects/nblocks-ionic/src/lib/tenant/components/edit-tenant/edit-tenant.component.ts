import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant } from '../../../generated/graphql';
import { TenantService } from '../../tenant.service';

@Component({
  selector: 'nblocks-edit-tenant',
  templateUrl: './edit-tenant.component.html',
  styleUrls: ['./edit-tenant.component.css']
})
export class EditTenantComponent implements OnInit {
  readonly EDIT_ROLES = ['OWNER'];

  mutableTenant?:Tenant;
  tenant$!: Observable<Tenant>;
  
  constructor(
    private readonly tenantService: TenantService,
  ) { }

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
