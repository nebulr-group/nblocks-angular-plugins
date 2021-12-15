import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'nblocks-verify-modal',
  templateUrl: './verify-modal.component.html',
  styleUrls: ['./verify-modal.component.scss'],
})
export class VerifyModalComponent {
  @Input() titleKey!:string; 
  @Input() questionKey!:string;

  @Input() props?:unknown; 

  static readonly SUBMIT_ACTION = 'SUBMITTED';

  constructor(private popoverController: PopoverController) { }

  cancel() {
    this.popoverController.dismiss();
  }

  submit() {
    this.popoverController.dismiss({ "action": VerifyModalComponent.SUBMIT_ACTION, "data": this.props });
  }
}
