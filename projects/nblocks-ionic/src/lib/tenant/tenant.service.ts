import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateTenantAnonymousGQL, CreateTenantInput, GetTenantGQL, Tenant, UpdateTenantGQL } from '../generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(
    private readonly getTenantGQL: GetTenantGQL,
    private readonly updateTenantGQL: UpdateTenantGQL,
    private readonly createTenantAnonymousGQL: CreateTenantAnonymousGQL
  ) { }

  getTenant():Observable<Tenant>{
    return this.getTenantGQL.watch({}).valueChanges.pipe(map((results) => results.data.getTenant));
  }

  updateTenant(name: string, locale: string):void {
    this.updateTenantGQL.mutate({tenant: {name, locale}}).subscribe();
  }

  createTenantAnonymous(tenant: CreateTenantInput):void {
    this.createTenantAnonymousGQL.mutate({tenant}).subscribe();
  }
}
