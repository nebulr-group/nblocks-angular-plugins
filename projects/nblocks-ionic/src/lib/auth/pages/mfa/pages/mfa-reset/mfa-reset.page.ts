import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'nblocks-mfa-reset',
  templateUrl: './mfa-reset.page.html',
  styleUrls: ['./mfa-reset.page.css']
})
export class MfaResetPage {

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
      
      const { backupCode } = form.value;
      await this.authService.resetUserMfaSetup(backupCode);
      this.navCtrl.navigateRoot('auth/mfa/setup');
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
