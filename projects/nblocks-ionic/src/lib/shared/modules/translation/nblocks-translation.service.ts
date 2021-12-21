import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/api';
import { BehaviorSubject, combineLatest } from 'rxjs'
import { filter, tap } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { Tenant } from '../../../generated/graphql';
import { NBlocksLibService } from '../../../nblocks-lib.service';
import { TenantService } from '../../../tenant/tenant.service';

/**
 * The NebulrTranslationService helps UI to render different languages / translations. It wraps ngx-translate under the hood.
 * On initialization, it will query GetTenantGQL and set current language based on Tenant locale.
 * An anonymous clone `NebulrAnonymousTranslationService` (that queries GetTenantAnonymousGQL instead) is available.
 */
@Injectable({
  providedIn: 'root',
})
export class NblocksTranslationService {

  /**
   * Convenient way for displaying languages in a translated dropdown. Will be re translated on language change, keeping reference to the array.
   */
  selectableLanguages: SelectItem<string>[];

  /* Language was initially set, or just changed. Safe to assume translation has been downloaded and keys resolved by now */
  languageChanged: BehaviorSubject<string>;

  private _loadedLanguages: Record<string, Record<string, unknown>> = {};

  constructor(
    private readonly httpClient: HttpClient,
    private readonly translateService: TranslateService,
    private readonly authService: AuthService,
    private readonly tenantService: TenantService,
    private readonly nBlocksLibService: NBlocksLibService
    ) {

      console.log("NblocksTranslationService");

    // Register the default lang as the lang currently in use!
    this.languageChanged = new BehaviorSubject(this.translateService.currentLang);
    this.translateService.use(this.translateService.defaultLang);

    // Download all enabled languages as JSONS via HTTP. If we had race condition with getTenantGQL, we will retry to setLanguage() again after download

    const authenticatedUser$ = this.authService.currentUser$.pipe(filter((u) => u.authenticated));
    const langDownloads$ = this.nBlocksLibService.config.languages.map(lang => this.httpClient.get<Record<string, unknown>>(`./assets/i18n/nblocks_${lang}.json`).pipe(tap((r) => r['LANG_ID'] = lang)));

    // Make sure user is authenticated before trying to pull tenant
    //TODO with this approach we're not downloading SV until someone is authenticated!
    authenticatedUser$.subscribe((currentUser) => {
      combineLatest([this.tenantService.getTenant(), ...langDownloads$]).subscribe(([tenant, ...langs]) => {
        langs.forEach((lang) => {
          this._loadedLanguages[lang['LANG_ID'] as string] = lang;
        });
        if (this.translateService.currentLang !== tenant.locale) {
          this._setLanguage((tenant as Tenant).locale!);
        }
      });
    });

    // // Construct a translated easy to use array of language options for UI display. Retranslate it if current language is changed
    this.selectableLanguages = this._constructSelectableLanguages();
    this.translateService.onLangChange.subscribe(() => {
      this._constructSelectableLanguages().forEach((newItem) => {
        const match = this.selectableLanguages.find(currentItem => currentItem.value == newItem.value);
        if (match)
          match.label = newItem.label;
      });
      this.languageChanged.next(this.translateService.currentLang);
    });
    
  }

  /**
   * Sets the current language via ngx-translate.
   * @param language 
   * @returns 
   */
  _setLanguage(language: string): void {
    if (!this.translateService.getLangs().includes(language))
      this.translateService.setTranslation(language, this._getTranslations(language), true);
    this.translateService.use(language).subscribe();
  }

  /**
   * Convenient way for displaying languages in a translated dropdown
   * @returns 
   */
  private _constructSelectableLanguages(): SelectItem<string>[] {
    return this.nBlocksLibService.config.languages.map(lang => {return {value: lang, label: this.translateService.instant(`NBLOCKS.LANGUAGES.${lang.toUpperCase()}`)}});
  }

  private _getTranslations(language: string): Record<string, unknown> {
    if (this.nBlocksLibService.config.languages.includes(language) && !{}.hasOwnProperty.call(this._loadedLanguages, language))
      throw new LanguageNotYetLoadedError(`${language} not loaded yet`);

    return this._loadedLanguages[language];
  }
}

export class LanguageNotYetLoadedError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
