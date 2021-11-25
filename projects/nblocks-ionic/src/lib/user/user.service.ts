import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListUsersGQL, User } from '../generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly listUsersGQL: ListUsersGQL
  ) { }

  list():Observable<User[]>{
    return this.listUsersGQL.watch({}).valueChanges.pipe(map((results) => results.data.listUsers));
  }
}
