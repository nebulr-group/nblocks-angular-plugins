import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'nblocks-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading = false;
  error = false;
  googleButton = false;
  githubButton = false;
  facebookButton = false;

  constructor(
    private readonly navCtrl: NavController,
    private readonly authService: AuthService
  ) {
    this.googleButton = authService.GOOGLE_BUTTON_ENABLED;
    this.githubButton = authService.FACEBOOK_BUTTON_ENABLED;
    this.facebookButton = authService.GITHUB_BUTTON_ENABLED;
  }

  ngOnInit() {
    this.authService.clearAuthStorage();
  }

  async login(form: NgForm) {
    const { username, password } = form.value;

    //TODO find a better approach with observables
    try {
      this.loading = true;
      this.error = false;
      await this.authService.authenticate(username, password);
      this.navCtrl.navigateForward('auth/choose-user');
    } catch (error) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  async handleKeyUp(e: KeyboardEvent, form: NgForm) {
    if (e.key === 'Enter' && form.valid) {
      this.login(form);
    }
  }

  async handleSocialLogin(provider: string): Promise<void> {
    await this.authService.handleSocialLogin(provider);
  }
}
