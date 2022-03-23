import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'nblocks-mfa-setup',
  templateUrl: './mfa-setup.page.html',
  styleUrls: ['./mfa-setup.page.css']
})
export class MfaSetupPage {

  error = false;
  loading = false;
  step: 0 | 1 | 2 = 0;
  recoverCode: string = "";

  constructor(
    private readonly authService: AuthService,
    private readonly navCtrl: NavController
  ) {
  }

  async nextStep(form?: NgForm): Promise<void> {
    switch (this.step) {
      case 0:
        await this.submitPhoneNumber(form!);
        break;
    
      case 1:
        await this.submitMfaCode(form!);
        break;

      case 2:
        this.navCtrl.navigateRoot('auth/choose-user');
        break;
    }
  }

  async submitPhoneNumber(form: NgForm): Promise<void> {
    try {
      this.loading = true;
      this.error = false;
      
      const { phoneNumber } = form.value;
      await this.authService.startMfaUserSetup(phoneNumber);
      this.step = 1;
    } catch (error) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  async submitMfaCode(form: NgForm): Promise<void> {
    try {
      this.loading = true;
      this.error = false;
      
      const { mfaCode } = form.value;
      this.recoverCode = await this.authService.finishMfaUserSetup(mfaCode);
      this.step = 2;
    } catch (error) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  async handleKeyUp(e: KeyboardEvent, form: NgForm): Promise<void> {
    if (e.key === 'Enter' && form.valid) {
      this.nextStep(form);
    }
  }

}
