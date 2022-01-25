/*
 * Public API Surface of nblocks-ionic
 */

import { AUTH_HTTP_INTERCEPTOR_PROVIDERS } from './lib/auth/auth.module';
import { AuthService } from './lib/auth/auth.service';
import { CurrentUser } from './lib/auth/models/current-user.model';
import { NblocksIonicModule } from './lib/nblocks-ionic.module';
import { CurrentUserDebugComponent } from './lib/shared/components/current-user-debug/current-user-debug.component';
import { FooterComponent } from './lib/shared/components/footer/footer.component';
import { LogoComponent } from './lib/shared/components/logo/logo.component';
import { SharedComponentsModule } from './lib/shared/components/shared-components.module';
import { LibConfig } from './lib/shared/lib-config';
import { UserComponentsModule } from './lib/user/components/user-components.module';
import { UserListComponent } from './lib/user/components/user-list/user-list.component';

export {
    NblocksIonicModule, 
    LibConfig, 
    AUTH_HTTP_INTERCEPTOR_PROVIDERS, 
    AuthService, 
    CurrentUser, 
    SharedComponentsModule,
    FooterComponent,
    LogoComponent,
    CurrentUserDebugComponent,
    UserComponentsModule,
    UserListComponent
}
