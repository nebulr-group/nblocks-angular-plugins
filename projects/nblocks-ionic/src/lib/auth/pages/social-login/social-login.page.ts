import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../auth.service';
import { ToastService } from '../../../shared/toast.service';

@Component({
  selector: 'social-login',
  templateUrl: './social-login.page.html'
})
export class SocialLoginPage implements OnInit {
  loading = false;

  constructor(
    private readonly navCtrl: NavController,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.handleAuthorization();
  }

  private async handleAuthorization(): Promise<void> {
    this.route.queryParams.subscribe(async (params) => {
      const { token } = params;
      let path = 'auth/login';
      if (token !== 'false') {
        try {
          await this.authService.storeAuthToken(token);
          path = 'auth/choose-user';
        } catch (error) {
          this.toastService.presentError(['AUTH.SOCIAL_LOGIN.SESSION_TOKEN_ERROR']);
          console.error('AUTH.SOCIAL_LOGIN.SESSION_TOKEN_ERROR', error);
        }
      } else {
        this.toastService.presentError(['AUTH.SOCIAL_LOGIN.SESSION_TOKEN_ERROR']);
      }

      this.navCtrl.navigateForward(path);
    });
  }
}
