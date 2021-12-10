import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { CurrentUser } from '../../../auth/models/current-user.model';
import { User } from '../../../generated/graphql';
import { Utils } from '../../../shared/helpers/utils';
import { UserService } from '../../user.service';

@Component({
  selector: 'nblocks-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  mutableUsers: User[] = [];
  roles: SelectItem[] = [];

  private subscriptions: Subscription = new Subscription();
  private authenticatedUser!: CurrentUser;
  private enabledRoles = ["OWNER", "ADMIN", "MANAGER", "VIEWER"];

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly translateService: TranslateService,
    private primengConfig: PrimeNGConfig,
  ) {
  }

  ngOnInit(): void {
    //TODO should be set on host
    this.primengConfig.ripple = true;
    const authenticatedUser$ = this.authService.currentUser$.pipe(filter((u) => u.authenticated));
    const users$ = this.userService.list();
    this.subscriptions.add(
      combineLatest([authenticatedUser$, users$]).subscribe(([user, users]) => {
        this.authenticatedUser = user;
        this.mutableUsers = Utils.deepClone(users);
      })
    );

    //TODO this happens to fast, before translations has been loaded
    this.translateService.get('dummyTranslation').toPromise().then(() => {
      this.enabledRoles.forEach(name => {
        this.roles.push({value: name, label: this.translateService.instant(`ROLE.${name}`)});
      });
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  isExternal(user: User): boolean {
    return user.email?.split("@")[1] != this.authenticatedUser.getDomain();
  }

  isYou(user: User): boolean {
    return this.authenticatedUser.isSameUser(user);
  }

  showInviteUsersModal(): void {

  }

  presentPopover(arg1:any, arg2:any): void {

  }

  toggleEnabled(user:User): void {
    this.userService.updateUser(user);
  }

  onRoleChange(user:User): void {
    this.userService.updateUser(user);
  }
}
