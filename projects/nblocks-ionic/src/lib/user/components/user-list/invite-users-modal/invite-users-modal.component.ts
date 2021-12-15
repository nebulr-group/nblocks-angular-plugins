import { Component } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'nblocks-invite-users-modal',
  templateUrl: './invite-users-modal.component.html',
  styleUrls: ['./invite-users-modal.component.scss'],
})
export class InviteUsersModalComponent {

  static readonly SUBMIT_ACTION = 'INVITE_USERS';

  constructor(
    private popoverController: PopoverController,
  ) {}

  emails:string[] = [];

  cancel() {
    this.popoverController.dismiss();
  }

  submit() {
    if (this.emails.length === 0) {
      return;
    }

    this.popoverController.dismiss({
      action: InviteUsersModalComponent.SUBMIT_ACTION,
      emails: this.emails,
    });
  }
}
