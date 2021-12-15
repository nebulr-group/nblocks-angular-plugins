import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUsersGQL, ListUsersGQL, UpdateUserGQL, User } from '../generated/graphql';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly listUsersGQL: ListUsersGQL,
    private readonly updateUserGQL: UpdateUserGQL,
    private readonly createUsersGQL: CreateUsersGQL
  ) { }

  list():Observable<User[]>{
    return this.listUsersGQL.watch({}).valueChanges.pipe(map((results) => results.data.listUsers));
  }

  updateUser(user:User): void{
    this.updateUserGQL.mutate({user: {id: user.id!, enabled: user.enabled, role: user.role}}).subscribe();
  }

  inviteUsers(emails:string[]): void{
    this.createUsersGQL.mutate({userNames: emails}, {refetchQueries: [{query: this.listUsersGQL.document}]}).subscribe();
  }
}
