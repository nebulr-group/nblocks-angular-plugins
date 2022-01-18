import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NBlocksLibService } from '../../../nblocks-lib.service';
import { AuthService } from '../../auth.service';
import { AuthTenantUserResponseDto } from '../../models/auth-tenant-user-response.dto';

@Component({
  selector: 'nblocks-choose-user',
  templateUrl: './choose-user.page.html',
  styleUrls: ['./choose-user.page.scss'],
})
export class ChooseUserPage implements OnInit {
  tenantUsers: AuthTenantUserResponseDto[];
  selectedUser?: AuthTenantUserResponseDto;

  loading = false;
  error = false;
  noEnabledUserError = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly navCtrl: NavController,
    private readonly authService: AuthService,
    private readonly nBlocksLibService: NBlocksLibService
  ) {
    this.tenantUsers = [];
  }

  ngOnInit(): void {
    this.loadAndHandleTenantUsers().then(() => {
      this.route.params.subscribe((params) => {
        // Quick select a predefined user from Url
        if (params.id) {
          const user = this.findUserById(params.id);
          if (user) {
            this.chooseUser(user);
          }
        }
      });
    });
  }

  private async loadAndHandleTenantUsers() {
    this.loading = true;
    this.tenantUsers = await this.authService.loadTenantUsers();

    switch (this.tenantUsers.length) {
      case 0:
        this.error = true;
        this.noEnabledUserError = true;
        break;
      case 1:
        this.chooseUser(this.tenantUsers[0]);
        break;
      default:
        const currentId = await this.authService.getTenantUserId();
        if (currentId) {
          const user = this.findUserById(currentId);
          if (user) {
            this.markUser(user);
          }
        }
        break;
    }

    this.loading = false;
  }

  async chooseUser(selectedUser: AuthTenantUserResponseDto): Promise<void> {
    try {
      this.error = false;
      await this.authService.setTenantUserId(selectedUser.id);
      this.authService.userDidAuthenticate();
    } catch (error) {
      this.error = true;
    }

    if (!selectedUser.onboarded && this.nBlocksLibService.config.onboarding.enabled) {
      // Make user answer some personal information during an nblocks onboarding
      this.navCtrl.navigateRoot('auth/onboarding');
    } else {
      if (selectedUser.tenant.name) {
        // Normal case, redirect to app root
        this.navCtrl.navigateRoot('');
      } else {
        // Have app onboarding take over for a new user and new tenant
        this.navCtrl.navigateRoot('onboarding');
      } 
    }
  }

  markUser(user: AuthTenantUserResponseDto): void {
    this.selectedUser = user;
  }

  getTenantInitials(tenantName: string): string {
    return tenantName?.charAt(0).toUpperCase();
  }

  normalizeRoleName(roleName: string): string {
    return `${roleName.charAt(0).toUpperCase()}${roleName
      .substring(1)
      .toLowerCase()}`;
  }

  private findUserById(id: string): AuthTenantUserResponseDto | undefined {
    return this.tenantUsers.find((tu) => tu.id === id);
  }
}
