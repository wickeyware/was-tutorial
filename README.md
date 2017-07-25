# WasTutorial

This project shows a small Angular app that implements the WickeyAppStore npm (https://www.npmjs.com/package/wickeyappstore).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

## QuickStart

1. `npm install -g angular-cli@1.2.1` you can SKIP if you already have this installed
2. Clone project `git clone https://github.com/wickeyware/was-tutorial.git`
3. `cd was-tutorial`
4. `npm install` or if you have yarn `yarn`
6. `npm start` or `yarn start` @ `http://localhost:4200/` Development server (reloads on file change)
7. ONE LINER BUILD/SERVE: `npm run buildrun` @ `http://localhost:8080/`

## Other Commands
- Production build: `ng build --aot --prod`
- Create service worker: `npm run sw` or `yarn run sw` AFTER BUILDING
- Serve build: `npm run serve:cli` or `yarn run serve:cli` @ `http://localhost:8080/`

## Help Installing via npm or yarn

- `npm install -g angular-cli@latest` GLOBAL npm angular cli
- `npm install --save <package>` or as dev `npm install --save-dev <package>`
- `yarn add <package>` as dev `--dev`
- `npm install` if all packages are already in packages.json
- `yarn` if all packages are already in packages.json

## Angular Cli Help

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

### Generating Components, Directives, Pipes and Services

[CLI GENERATE OPTIONS](https://github.com/angular/angular-cli#generating-components-directives-pipes-and-services)

## Running unit tests

TODO: Add unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

TODO: Add end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Yarn commands

- yarn add <package>
- yarn add <package> --dev
- yarn run <cmd>
