import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NBlocksLibService } from './nblocks-lib.service';
import { NBlocksRoutingModule } from './nblocks-routing.module';
import { CurrentUserDebugComponent } from './shared/components/current-user-debug/current-user-debug.component';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { LibConfig, LibConfigService } from './shared/lib-config';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TenantModule } from './tenant/tenant.module';

export function createTranslateLoader(http: HttpClient):TranslateHttpLoader  {
  console.log("TranslateHttpLoader");
        return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NBlocksRoutingModule,
    SharedComponentsModule,
    TenantModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
    }),
  ],
  exports: [
    CurrentUserDebugComponent
  ]
})
export class NblocksIonicModule {
  static forRoot(config: LibConfig): ModuleWithProviders<NblocksIonicModule> {
    console.log("forRoot called");
    return {
      ngModule: NblocksIonicModule,
      providers: [
        NBlocksLibService,
        {
          provide: LibConfigService,
          useValue: config
        },
        {
          provide: APOLLO_OPTIONS,
          useFactory: (httpLink: HttpLink) => {
            return {
              cache: new InMemoryCache(),
              link: httpLink.create({
                uri: `${config.apiHost}${config.graphqlPath}`
              }),
            };
          },
          deps: [HttpLink],
        },
      ]
    };
  }
}
