import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'nblocks-mfa-required',
  templateUrl: './mfa-required.page.html',
  styleUrls: ['./mfa-required.page.css']
})
export class MfaRequiredPage {

  error = false;
  loading = false;
  
  constructor(
    private readonly authService: AuthService,
    private readonly navCtrl: NavController
  ) {
  }

  public async submit(form: NgForm): Promise<void> {
    try {
      this.loading = true;
      this.error = false;
      
      const { mfaCode } = form.value;
      await this.authService.commitMfaCode(mfaCode);
      this.navCtrl.navigateRoot('auth/choose-user');
    } catch (error) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  public async handleKeyUp(e: KeyboardEvent, form: NgForm): Promise<void> {
    if (e.key === 'Enter' && form.valid) {
      this.submit(form);
    }
  }

}
