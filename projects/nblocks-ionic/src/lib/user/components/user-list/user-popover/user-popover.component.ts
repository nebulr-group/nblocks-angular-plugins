import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { User } from '../../../../generated/graphql';

@Component({
  selector: 'nblocks-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss'],
})
export class UserPopoverComponent{
  
  static readonly EDIT_USER_ACTION = 'EDIT_USER';
  static readonly RESET_PASSWORD_ACTION = 'SEND_RESET_PASSWORD_LINK';
  static readonly DELETE_USER_ACTION = 'DELETE_USER';

  @Input() user!: User;

  constructor(private popoverController: PopoverController) { }

  editUser() {    
    this.popoverController.dismiss({"action":UserPopoverComponent.EDIT_USER_ACTION,"user":this.user});
  }

  sendResetPasswordLink() {    
    this.popoverController.dismiss({ "action": UserPopoverComponent.RESET_PASSWORD_ACTION, "user": this.user });
  }

  deleteUser(){            
    this.popoverController.dismiss({ "action": UserPopoverComponent.DELETE_USER_ACTION, "user": this.user });
  }
}
