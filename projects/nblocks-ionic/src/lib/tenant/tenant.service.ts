import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetTenantGQL, Tenant, UpdateTenantGQL } from '../generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(
    private readonly getTenantGQL: GetTenantGQL,
    private readonly updateTenantGQL: UpdateTenantGQL,
  ) { }

  getTenant():Observable<Tenant>{
    return this.getTenantGQL.watch({}).valueChanges.pipe(map((results) => results.data.getTenant));
  }

  updateTenant(name: string, locale: string):Observable<Tenant> {
      return this.updateTenantGQL.mutate({name, locale}).pipe(map((results) => (results.data as {updateTenant: Tenant}).updateTenant));
  }
}
