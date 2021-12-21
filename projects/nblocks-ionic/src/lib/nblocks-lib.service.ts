import { Inject, Injectable } from '@angular/core';
import { LibConfig, LibConfigService } from './shared/lib-config';

@Injectable({
  providedIn: 'root',
})
export class NBlocksLibService {
  constructor(@Inject(LibConfigService) readonly config: LibConfig) {
    console.log('Loaded config: ', config, this.config);
  }
}
