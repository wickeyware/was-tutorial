# WickeyAppStore

Reach the next One Billion users, AppStore for Progressive WebApps.

## Progressive Web App Store

Reach the next One Billion users. WickeyAppStore is a full featured App Store for **PWA** web-apps. A **PWA** makes use of new Web and JavaScript API to deliver an experience similar to a native app on the web.

Apps on the WickeyAppStore must meet quality and security requirements:

* **Safety** - must be served via HTTPS to ensure that the real content has not been tampered.
* **Responsive** - can fit all resolutions like desktop, tablet and mobile.
* **Progressive**- work in all modern browsers because they use progressive enhancement concepts.
* **Connectivity independent** - need to work on any type of connection, including offline.
* **Engageable** - using push notifications, "add to home" feature to be more app-like.

## Benefits

* **Trust** - each app is vetted and approved manually.  Only high quality apps are featured on the WickeyAppStore.
* **Single Sign On** - you do not need to sign into apps you do not know or trust. Your WickeyAppStore SSO is all you need.
* **Monetization** - we provide monetization tools including in-app purchases and ads.
* **Traffic** - we feature unique and cool apps, and all apps benefit from being under one umbrella. 

## Submit your app

If you have an app you want to submit, email us at [wickeyappstore@gmail.com](mailto:wickeyappstore@gmail.com).

Can also submit apps here: [Developer Portal](https://developer.wickeyappstore.com) (NOTE: this is still a work in progress, so not everything is finished)

**NOTE**: Please check back frequently. We will keep this document updated all the time.

# WasTutorial

This project shows a small Angular app that implements the WickeyAppStore npm (https://www.npmjs.com/package/wickeyappstore).
It shows an implementation of Service Workers, and Push notifications using [OneSignal](https://onesignal.com/) (create a free account to setup/use).

## QuickStart

1. `npm install -g @angular/cli@latest` you can SKIP if you already have this installed
2. Clone project `git clone https://github.com/wickeyware/was-tutorial.git`
3. `cd was-tutorial`
4. `npm install` or if you have yarn `yarn`
6. `npm start` or `yarn start` @ `http://localhost:4204/` Development server (reloads on file change)
7. ONE LINER BUILD/SERVE: `npm run build` @ `http://localhost:8080/`

## Help Installing via npm or yarn

- `npm install -g @angular/cli@latest` The `-g` installs globally
- `npm install --save <package>` or as dev `npm install --save-dev <package>`
- `yarn add <package>` as dev `--dev`
- `npm install` if all packages are already in packages.json
- `yarn` if all packages are already in packages.json

## New to Angular

New to Angular, check out their [QuickStart](https://angular.io/guide/quickstart)

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

[All Options](https://github.com/angular/angular-cli#generating-components-directives-pipes-and-services)

## Running unit tests

TODO: Add unit tests

## Running end-to-end tests

TODO: Add end-to-end tests
