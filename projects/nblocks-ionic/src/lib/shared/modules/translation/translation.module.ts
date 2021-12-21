import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NblocksTranslationService } from './nblocks-translation.service';

export function createTranslateLoader(http: HttpClient):TranslateHttpLoader  {
  console.log("TranslateHttpLoader");
        return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function onAppInit(nblocksTranslationService: NblocksTranslationService)  {
  return () => {};
}

/** This module provides translation capabilities accross app. 
 * It uses @ngx-translate and creates a singelton service instance NblocksTranslationService
 * NblocksTranslationService will intially set the app language and monitor for changes
 * */
@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: onAppInit,
      deps:[NblocksTranslationService],
      multi: true
    }
  ]
})
export class TranslationModule { }

