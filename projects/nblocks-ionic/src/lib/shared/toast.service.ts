import { Injectable } from '@angular/core';
import { ToastController, ToastButton } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { uniq } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private DEFAULT_TOAST_DURATION = 5000

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
  * Display message without translation with provided duration
  */
  async presentErrorNoTranslation(errorMessage: string, duration?: number): Promise<void> {
    return this._presentToast(errorMessage, true, duration);
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
  
  private async _presentToast(message: string, error: boolean, duration?: number): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: duration ? duration : this.DEFAULT_TOAST_DURATION,
      cssClass: `ion-text-center ${error ? 'toast-error' : 'toast-info'}`,
      color: error ? 'warning' : 'dark',
      buttons: error ? [
        {
          side: 'end',
          icon: 'close',
          role: 'cancel'
        }
      ] : []
    });
    toast.present();
  }
}
