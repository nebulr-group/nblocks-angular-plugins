import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { App, GetAppAnonymousGQL } from '../generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private readonly getTenantGQL: GetAppAnonymousGQL
  ) { }

  getAppAnonymous():Observable<App>{
    return this.getTenantGQL.watch({}).valueChanges.pipe(map((results) => results.data.getAppAnonymous));
  }
}
