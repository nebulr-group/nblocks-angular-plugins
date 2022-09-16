import { Inject, Injectable } from '@angular/core';
import { LibConfig, LibConfigService } from './shared/lib-config';

@Injectable({
  providedIn: 'root',
})
export class NBlocksLibService {
  constructor(@Inject(LibConfigService) readonly config: LibConfig) {
    // Check variables for faulty user input
    if (config.passwordComplexityRegex) {
      try {
        new RegExp(config.passwordComplexityRegex);
      } catch(e) {
          throw new NblocksError(`The provided Regex for \'passwordComplexityRegex\' is not a valid expression. Got ${config.passwordComplexityRegex}`);
      }
    }
  }
}
