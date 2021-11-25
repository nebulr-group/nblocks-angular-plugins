/*
 * Public API Surface of nblocks-ionic
 */

import { AUTH_HTTP_INTERCEPTOR_PROVIDERS } from './lib/auth/auth.module';
import { NblocksIonicModule } from './lib/nblocks-ionic.module';
import { CurrentUserDebugComponent } from './lib/shared/components/current-user-debug/current-user-debug.component';
import { LibConfig } from './lib/shared/lib-config';

export {NblocksIonicModule, LibConfig, AUTH_HTTP_INTERCEPTOR_PROVIDERS, CurrentUserDebugComponent}
