import { Inject, Injectable } from '@angular/core';
import { defaultLibConfig, LibConfig, LibConfigService } from './shared/lib-config';

@Injectable({
  providedIn: 'root',
})
export class NBlocksLibService {
  constructor(@Inject(LibConfigService) readonly config: LibConfig) {
    this.config = defaultLibConfig(config);
    console.log('Loaded config: ', config, this.config);
  }
}
