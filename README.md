# NBlocks for Angular

Welcome to NBlocks, the platform toolbox from Nebulr made by developers for developers. If you're new to this concept, head over to our [site](https://nblocks.dev) and check out the capabilities.

[nblocks.dev](https://nblocks.dev)

This project gathers all Angular flavoured libraries for NBlocks. Please head over to each sub project README to get started.

## NBlocks for Ionic Framework
[Go to project](projects/nblocks-ionic)

# For developers
Angular helps organise different libraries and each library is stored as a sub project and located in the `/projects` directory.

## Build the sources directly
From the root directory of this project (not in library) run `ng build`.   
All libraries will compiled to different directories under `dist/`.

### Publish to NPM
Once built, step into each compiled library and run `npm publish`. 

### Test library locally with NPM link
A library can be tested locally without publishing.
1. Build library from root directory of this project, e.g. `npm build --watch` activate recompilation on source change.
2. Step into the compiled library output directory in `dist/name-of-lib`.
3. Run `npm link` to have library linked into a global npm package folder. Observe the name of the output in which this library was saved as.
4. Go to the root folder of the Angular project where you want to install this library.
5. Run `npm link name-of-lib` (same name as from npm link output).
6. You now have the plugin installed in `node_modules` and can be used in project. Observe the package.json is not updated which is OK.

Some angular projects have a problem installing and using linked plugins and requires you add `preserveSymlinks: true` to angular.json. See [this](https://stackoverflow.com/questions/58260202/preserve-symlinks-in-angular-libraries) for more information.

## Add a new project
To generate a new project, e.g.   
`ng generate library nblocks-ionic --prefix=nblocks`

