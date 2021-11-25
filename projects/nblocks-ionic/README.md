# NBlocks for Ionic Framework

Welcome to NBlocks, the platform toolbox from Nebulr made by developers for developers. If you're new to this concept, head over to our [site](https://nblocks.dev) and check out the capabilities.

[nblocks.dev](https://nblocks.dev)

This plugin gives a plug-n-play experience for **NBlocks** on the **Ionic** framework. It enables you to faster build your app using our toolbox of features. This plugin requires another NBlocks API plugin to serve it with data. If you haven't looked them in you should as it might save you a bunch of time building your app API. See the [NBlocks download](https://nblocks.dev/download) page for a list of supported API plugins or Plug-n-play experiences for other technologies.

## Plug-n-play features

- Auth views like (login, reset password, onboarding etc.)
- Interceptors (401 responses are routed to login page, other errors are shown as toast messages)
- User management views
- Tenancy management views
- Other utils via directives, components and services, e.g. `access-control` directive to show/hide elements for certain user roles

## Install

```javascript
npm i @nebulr-group/nblocks-ionic
```

## Quick start

1. From your project root, run

```javascript
npx @nebulr-group/nblocks-ionic setup
```

to get the initial config structure and peer dependencies in place. More on that later.

2. Import the `NblocksIonicModule` in your root App module or what you call the top most module for your project. Also register the interceptors under provider.

```javascript
import { NblocksIonicModule, AUTH_HTTP_INTERCEPTOR_PROVIDERS } from 'nblocks-ionic';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
      ...
        NblocksIonicModule.forRoot({
            apiHost: "http://localhost:3000", // Your running NBlocks API
            logoPath: "https://www.northwhistle.com/wp-content/uploads/2021/08/NorthWhistle-logo-retina-2.png", // Url to your app logo
            privacyPolicyUrl: "https://www.myapp.com/privacy", // Url to your app privacy policy
            graphqlPath: "/graphql", // If you have exposed the GraphQL endpoint somewhere else than standard on NBlocks API
            openRoutes: ["/home"] // Retrieving a 401 response, the interceptors will not redirect to login if user is on any of these UI routes
        })

    providers: [
        ...
        AUTH_HTTP_INTERCEPTOR_PROVIDERS
})
```

3. Start your app and expect it to work exactly the same as before!

## Customizing

The setup script created just the minimal configuration needed for the project to start. It placed some translation files under the `assets` folder which you can edit and add the lingo you want.

### Using translations

TBD


## Deep dive

The project use RXJS Observables to push data to subscribers. This means you can subscribe to events like a user became authenticated, the language was changed etc from anywhere in the app.

### Get the current user
TBD

### Interceptors
TBD

### Cherry picking functionality
TBD

### Components
```typescript
Show a JSON representation of current user
<nblocks-user-debug></nblocks-user-debug>

{
  "user": {
    "id": "605b603cfeb49f00082686b8",
    "role": "OWNER",
    "email": "john.doe@example.com",
    "username": "john.doe@example.com",
    "fullName": "John Doe",
    "onboarded": true,
    "tenant": {
      "id": "605b603cfeb49f00082686b7",
      "name": "Monsters Inc",
      "locale": "en"
    }
  },
  "authenticated": true
}
```

### Directives
```typescript
const roles = ['OWNER',...]

<div [nblocksAccessControl]='ROLES'>
  <p>Only owners will see me</p>
</div>
```

Instead of importing `NblocksIonicModule` containing the full set of tools you can import key feature areas individually.

TBD

## FAQ

