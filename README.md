# WasTutorial

This project shows a small Angular app that implements the WickeyAppStore npm (https://www.npmjs.com/package/wickeyappstore).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

## First time user DEVELOPMENT

- Clone project `git clone https://github.com/wickeyware/was-tutorial.git`
- `cd was-tutorial`
- `npm install` or if you have yarn `yarn`
- `npm start` or `yarn start` @ `http://localhost:4200/`
- ONE LINER: `npm run buildrun` it runs the following three lines
- Production build: `ng build --aot --prod`
- Create service worker: `npm run sw` or `yarn run sw` AFTER BUILDING
- Serve build: `npm run serve:cli` or `yarn run serve:cli` @ `http://localhost:8080/`

## Installing

- `npm install -g angular-cli@latest` GLOBAL npm angular cli
- `npm install --save <package>` or as dev `npm install --save-dev <package>`
- `yarn add <package>` as dev `--dev`
- `npm install` if all packages are already in packages.json
- `yarn` if all packages are already in packages.json

## Development server

This serves the content on `http://localhost:4200/`

- `npm start` 
- `yarn start`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

- `ng build --aot --prod`
- `ng build`
- `ng build --prod`

## SW PRECACHE SERVICE WORKER

- `npm run sw` AFTER BUILDING
- `yarn run sw` AFTER BUILDING

## Run server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

- `npm run serve:cli` serves `dist/` directory on `http://localhost:8080/`
- `yarn run serve:cli` serves `dist/` directory on `http://localhost:8080/`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Generating Components, Directives, Pipes and Services

[CLI GENERATE OPTIONS](https://github.com/angular/angular-cli#generating-components-directives-pipes-and-services)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Yarn commands

- yarn add <package>
- yarn add <package> --dev
- yarn run <cmd>
