import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastService } from '../../../shared/toast.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'nblocks-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  public loading = false;
  constructor(
    private readonly authService: AuthService,
    private readonly navCtrl: NavController,
    private readonly toastService: ToastService
  ) {
  }

  public async forgotPassword(form: NgForm): Promise<void> {
    this.loading = true;
    const { username } = form.value;
    await this.authService.forgotPassword(username);
    this.toastService.presentMessage(['RESET_PASSWORD_SENT']);
    this.loading = false;
    this.navCtrl.navigateRoot('auth/login');
  }

  public async handleKeyUp(e: KeyboardEvent, form: NgForm): Promise<void> {
    if (e.key === 'Enter' && form.valid) {
      this.forgotPassword(form);
    }
  }
}
