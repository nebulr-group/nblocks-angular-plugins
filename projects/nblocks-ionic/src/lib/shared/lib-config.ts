import { InjectionToken } from "@angular/core";

export interface LibConfig {
  /** Base Url to a backend API running a NBlocks compatable feature set. E.g. `https://api.myapp.com` */
  apiHost: string;

  /** The path which host the graphql endpoint, will be concatenated with apiHost. E.g. `/graphql` */
  graphqlPath: string;

  /** Asset Path to your logo. E.g. `https://www.myapp.com/logo.png` or `assets/logos/logo.png` */
  logoPath: string;

  /** Url to a privacy policy, will be used in href links. E.g. `https://www.myapp.com/privacy` */
  privacyPolicyUrl: string;

  /** View routes that are considered public accessable and interceptors should not require authentication context. E.g. `['/about', '/home']` */
  openRoutes: string[];

  /** Available roles that users can bee assigned to. Must match your app model roles */
  roles: string[];

  /** Available languages that the user can set for the workspace. Can just be 'en' or 'sv' at the moment */
  languages: string[];

  /** Enable password complexity according to ISO27001 */
  passwordComplexity: boolean;

  /** Ask for personal information after first time user logs in. Can be setup to require specific fields */
  onboarding: {
    enabled: boolean,
    requiredFields: {
      firstName: boolean;
      lastName: boolean;
      phoneNumber: boolean;
    }
  }

  /** Available social login providers and account api data that the user can use for authorization. */
  socialLogins: {
    accountApiHost: string;
    appId: string;
    providers: {
      google: boolean;
      github: boolean;
      facebook: boolean;
    }
  },
}

export const defaultLibConfig = (config: Partial<LibConfig>): LibConfig => {
  return {
    apiHost: "http://localhost:3000",
    logoPath: "'https://nebulr-group.github.io/nblocks-docs/img/logo.png',",
    privacyPolicyUrl: "https://www.myapp.com/privacy",
    graphqlPath: "/graphql",
    openRoutes: ["/", '/setup/start', '/setup/signup'],
    roles: ["OWNER", "ADMIN", "MANAGER", "VIEWER"],
    languages: ['en','sv'],
    passwordComplexity: false, // Sensible default (dev)
    onboarding: {
      enabled: true,
      requiredFields: {
        firstName: true,
        lastName: true,
        phoneNumber: false
      }
    },
    socialLogins: {
      accountApiHost: "https://account-api.nebulr-core.com",
      appId: '61c462cd422c2300088d369d',
      providers: {
        google: false,
        github: false,
        facebook: false,
      }
    },
    ...config
  }
}
   
export const LibConfigService = new InjectionToken<LibConfig>('LibConfig');