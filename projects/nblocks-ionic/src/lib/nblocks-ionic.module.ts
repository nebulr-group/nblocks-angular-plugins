import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NBlocksLibService } from './nblocks-lib.service';
import { NBlocksRoutingModule } from './nblocks-routing.module';
import { CurrentUserDebugComponent } from './shared/components/current-user-debug/current-user-debug.component';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { defaultLibConfig, LibConfig, LibConfigService } from './shared/lib-config';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './shared/modules/primeng.module';
import { TranslationModule } from './shared/modules/translation/translation.module';



@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NBlocksRoutingModule,
    SharedComponentsModule,
    PrimengModule,
    TranslationModule
  ],
  exports: [
    CurrentUserDebugComponent
  ]
})
export class NblocksIonicModule {
  static forRoot(config: Partial<LibConfig>): ModuleWithProviders<NblocksIonicModule> {
    const defaultData = defaultLibConfig(config);
    return {
      ngModule: NblocksIonicModule,
      providers: [
        NBlocksLibService,
        {
          provide: LibConfigService,
          useValue: defaultData
        },
        {
          provide: APOLLO_OPTIONS,
          useFactory: (httpLink: HttpLink) => {
            
            return {
              cache: new InMemoryCache(),
              link: httpLink.create({
                uri: `${defaultData.apiHost}${defaultData.graphqlPath}`
              }),
            };
          },
          deps: [HttpLink],
        },
      ]
    };
  }
}
