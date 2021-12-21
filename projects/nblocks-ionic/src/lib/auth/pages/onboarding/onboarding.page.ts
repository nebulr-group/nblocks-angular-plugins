import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'nblocks-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage {
  public loading = false;
  public error = false;

  constructor(
    private readonly navCtrl: NavController,
    private readonly authService: AuthService,
  ) {
  }

  public async save(form: NgForm) {
    const { firstName, lastName, phoneNumber } = form.value;

    try {
      this.loading = true;
      this.error = false;
      await this.authService.updateUserInfo(firstName, lastName, phoneNumber);
      this.navCtrl.navigateForward(`auth/choose-user/${await this.authService.getTenantUserId()}`);
    } catch (error) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  public async handleKeyUp(e: KeyboardEvent, form: NgForm) {
    if (e.key === 'Enter' && form.valid) {
      this.save(form);
    }
  }
}
