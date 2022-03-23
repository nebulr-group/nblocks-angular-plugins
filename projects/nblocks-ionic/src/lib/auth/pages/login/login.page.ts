import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { NBlocksLibService } from '../../../nblocks-lib.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'nblocks-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading = false;
  error = false;

  constructor(
    private readonly navCtrl: NavController,
    private readonly authService: AuthService,
    readonly nblocksLibService: NBlocksLibService
  ) {}

  ngOnInit() {
    this.authService.clearAuthStorage();
  }

  async login(form: NgForm) {
    const { username, password } = form.value;

    //TODO find a better approach with observables
    try {
      this.loading = true;
      this.error = false;
      const result = await this.authService.authenticate(username, password);
      switch (result.mfaState) {
        case 'DISABLED':
          this.navCtrl.navigateForward('auth/choose-user');
          break;

        case 'REQUIRED':
          this.navCtrl.navigateForward('auth/mfa/required');
          break;

        case 'SETUP':
          this.navCtrl.navigateForward('auth/mfa/setup');
          break;
      }
      
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
