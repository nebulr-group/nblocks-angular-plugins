import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { CurrentUser } from '../../../auth/models/current-user.model';
import { User } from '../../../generated/graphql';
import { UserService } from '../../user.service';

@Component({
  selector: 'nblocks-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users$!: Observable<User[]>;
  private currentUser!: CurrentUser;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    this.authService.currentUser$.subscribe((currentUser) => this.currentUser = currentUser);
  }

  ngOnInit(): void {
    this.users$ = this.userService.list();
  }

  isExternal(user: User): boolean {
    return user.email?.split("@")[1] != this.currentUser.getDomain();
  }

  isYou(user: User): boolean {
    return this.currentUser.isSameUser(user);
  }
}
