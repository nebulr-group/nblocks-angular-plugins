import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ComponentRef, OverlayEventDetail } from '@ionic/core';
import { VerifyModalComponent } from './components/verify-modal/verify-modal.component';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor(
    private readonly popoverController: PopoverController
  ) { }

  async presentModal(size: 'small' | 'medium' | 'large', component: ComponentRef, componentProps?: Record<string, unknown>): Promise<OverlayEventDetail<any>> {
    const popover = await this.popoverController.create({
      component,
      componentProps,
      cssClass: `${size}-modal`,
      translucent: true,
      showBackdrop: true,
    });

    popover.present();

    return popover.onDidDismiss();
  }

  async presentVerifyModal(titleKey: string, questionKey: string, props?: Record<string, unknown>): Promise<OverlayEventDetail<any>> {
    const popover = await this.popoverController.create({
      component: VerifyModalComponent,
      componentProps: {
        titleKey,
        questionKey,
        props
      },
      cssClass: `verify-modal`,
      translucent: true,
      showBackdrop: true,
    });

    popover.present();

    return popover.onDidDismiss();
  }
}
