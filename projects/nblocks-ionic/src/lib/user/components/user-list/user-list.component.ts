import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { combineLatest, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { CurrentUser } from '../../../auth/models/current-user.model';
import { User } from '../../../generated/graphql';
import { NBlocksLibService } from '../../../nblocks-lib.service';
import { Utils } from '../../../shared/helpers/utils';
import { NblocksTranslationService } from '../../../shared/modules/translation/nblocks-translation.service';
import { PopoverService } from '../../../shared/popover.service';
import { UserService } from '../../user.service';
import { InviteUsersModalComponent, InviteUsersModalComponentResult } from './invite-users-modal/invite-users-modal.component';
import { UserPopoverComponent, UserPopoverComponentResult } from './user-popover/user-popover.component';
import { LoaderService } from '../../../shared/modules/loader/loader.service';

@Component({
  selector: 'nblocks-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  mutableUsers: User[] = [];
  roles: SelectItem<string>[] = [];

  private subscriptions: Subscription = new Subscription();
  private authenticatedUser!: CurrentUser;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly translateService: TranslateService,
    private readonly nblocksTranslationService: NblocksTranslationService,
    private readonly primengConfig: PrimeNGConfig,
    private readonly popoverService: PopoverService,
    private readonly nBlocksLibService: NBlocksLibService,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.loaderService.showLoader();
    //TODO should be set on host
    this.primengConfig.ripple = true;
    const authenticatedUser$ = this.authService.currentUser$.pipe(filter((u) => u.authenticated));
    const users$ = this.userService.list();
    this.subscriptions.add(
      combineLatest([authenticatedUser$, users$]).subscribe(([user, users]) => {
          this.authenticatedUser = user;
          this.mutableUsers = Utils.deepClone(users);
          this.loaderService.hideLoader();
        })
    );

    this.nblocksTranslationService.languageChanged.subscribe((lang) => {
      this._reRenderRolePicker();
    });
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

  async showInviteUsersModal(): Promise<void> {
    const result = await this.popoverService.presentModal('medium', InviteUsersModalComponent);
    if (result.data) {
      const data: InviteUsersModalComponentResult = result.data;
      if (data.action == InviteUsersModalComponent.SUBMIT_ACTION) {
        this.loaderService.showLoader();
        this._inviteUsers(data.emails);
      }
    }
  }

  async presentUserPopover(user:User): Promise<void> {
    const result = await this.popoverService.presentModal('small', UserPopoverComponent, {user});
    if (result.data) {
      const data: UserPopoverComponentResult = result.data;
      switch(data.action) {
        case UserPopoverComponent.RESET_PASSWORD_ACTION:
          await this._presentResetPasswordModal(user);
          break;

        case UserPopoverComponent.DELETE_USER_ACTION:
          await this._presentDeleteUserModal(user);
          break;
      }
    }
  }

  toggleEnabled(user:User): void {
    this.userService.updateUser(user);
  }

  onRoleChange(user:User): void {
    this.userService.updateUser(user);
  }

  private async _presentResetPasswordModal(user:User): Promise<void> {
    const result = await this.popoverService.presentVerifyModal(
      "NBLOCKS.VERIFY_MODAL.RESET_PASSWORD.TITLE", 
      "NBLOCKS.VERIFY_MODAL.RESET_PASSWORD.BODY", 
      {user}
      );
    this._resetPassword(user);
  }

  private async _presentDeleteUserModal(user:User): Promise<void> {
    const result = await this.popoverService.presentVerifyModal(
      "NBLOCKS.VERIFY_MODAL.DELETE_USER.TITLE", 
      "NBLOCKS.VERIFY_MODAL.DELETE_USER.BODY", 
      {user}
      );
      if (result.data)
    this._deleteUser(user);
  }

  private _inviteUsers(emails: string[]): void {
    this.userService.inviteUsers(emails);
  }

  private _resetPassword(user:User): void {
    this.userService.resetPassword(user);
  }

  private _deleteUser(user:User): void {
    this.userService.deleteUser(user);
  }

  private _reRenderRolePicker(): void {
    const roles: SelectItem<string>[] = [];
    this.nBlocksLibService.config.roles.forEach(name => {
      roles.push({value: name, label: this.translateService.instant(`NBLOCKS.ROLE.${name}`)});
    });
    this.roles = roles;
  }
}
