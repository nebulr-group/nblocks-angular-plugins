import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'social-login',
  templateUrl: './social-login.page.html',
  styleUrls: ['./social-login.page.scss'],
})
export class SocialLoginPage implements OnInit {
  public loading = false;
  public param = {};

  constructor(
    private readonly navCtrl: NavController,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.handleAuthorization();
  }

  private async handleAuthorization(): Promise<void> {
    this.route.queryParams.subscribe(async (params) => {
      const { failure, token } = params;

      if (failure !== 'true') {
        await this.authService.authorize(token);
        this.navCtrl.navigateForward('auth/choose-user');
      } else {
        this.navCtrl.navigateForward('auth/login');
      }
    });
  }
}
