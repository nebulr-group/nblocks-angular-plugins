import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { uniq } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private readonly translateService: TranslateService,
    private readonly toastController: ToastController
  ) { }

  /**
   * 
   * @param translationKeys an array of translation keys. Will be prepend with ERROR_MESSAGE.
   * @returns 
   */
  async presentError(translationKeys: string[]): Promise<void> {
    const message = uniq(translationKeys).map((key: string) => {
      const translation = this.translateService.instant(`NBLOCKS.ERROR_MESSAGE.${key}`);
      return translation !== key ? translation : this.translateService.instant("NBLOCKS.ERROR_MESSAGE.GENERAL");
    }).join("\n");
    return this._presentToast(message, true);
  }

  /**
   * 
   * @param translationKeys an array of translation keys. Will be prepend with TOAST_MESSAGE.
   * @returns 
   */
  async presentMessage(translationKeys: string[]): Promise<void> {
    const message = uniq(translationKeys).map((key: string) => {
      const translation = this.translateService.instant(`NBLOCKS.TOAST_MESSAGE.${key}`);
      return translation;
    }).join("\n");
    return this._presentToast(message, false);
  }
  
  private async _presentToast(message: string, error:boolean): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      cssClass:`ion-text-center ${error ? 'toast-error' : 'toast-info'}`
    });
    toast.present();
  }
}
