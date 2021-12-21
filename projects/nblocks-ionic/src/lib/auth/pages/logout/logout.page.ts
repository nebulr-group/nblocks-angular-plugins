import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastService } from '../../../shared/toast.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'nblocks-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private readonly navCtrl: NavController, 
    private readonly authService: AuthService,
    private readonly toastService: ToastService
    ) { }

  ngOnInit(): void {
    this.handleLogout();
  }

  private async handleLogout() {
    await this.authService.deauthenticate();
    this.toastService.presentMessage(["AUTH.LOGGED_OUT"]);
    this.navCtrl.navigateRoot("auth/login");
  }
}
