# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/wickeyware/was-tutorial/compare/1.11.0...HEAD)

This shows all commits since last release.

## [1.11.0](https://github.com/wickeyware/was-tutorial/compare/1.10.3...1.11.0) - 2019-07-27

### Fixed

* **package** Update to latest Angular, rxjs, and WickeyAppStore.

## [1.10.3](https://github.com/wickeyware/was-tutorial/compare/1.10.2...1.10.3) - 2019-09-30

### Fixed

* **package** Update to latest Angular and WickeyAppStore.

## [1.10.2](https://github.com/wickeyware/was-tutorial/compare/1.10.1...1.10.2) - 2019-02-13

### Fixed

* **wasData** Use WasDataService instead of deprecated UserService.get/setStore.

## [1.10.1](https://github.com/wickeyware/was-tutorial/compare/1.10.0...1.10.1) - 2019-02-05

### Fixed

* **package** Update to latest Angular and WickeyAppStore.
* **deploy** Remove unused deploy script.
* **manifest** Remove reference to deploy script.
* **manifest** Set manifest start url to only a slash.
* **project** Update to latest Angular project standards.

## [1.10.0](https://github.com/wickeyware/was-tutorial/compare/1.9.2...1.10.0) - 2018-11-08

### Fixed

* **package** Update to latest Angular and WickeyAppStore.

## [1.9.2](https://github.com/wickeyware/was-tutorial/compare/1.9.1...1.9.2) - 2018-9-25

### Fixed

* **package** Remove un-used dependencies vast player, material icons from index.html.
* **package** Update to latest Angular and WickeyAppStore.
* **Contact Us** Add email contact button

## [1.9.1](https://github.com/wickeyware/was-tutorial/compare/1.9.0...1.9.1) - 2018-05-16

### Fixed

* **package** Remove un-used dependencies swiper, hammerjs, and rxjs-compat.
* **package** Update to latest Angular and WickeyAppStore.

## [1.9.0](https://github.com/wickeyware/was-tutorial/compare/1.6.1...1.9.0) - 2018-05-15

### Changed

* **packages** [BREAKING] Update to Angular 6 and rxjs 6, these are breaking changes. [how to update](https://update.angular.io/)

## [1.6.1](https://github.com/wickeyware/was-tutorial/compare/1.6.1...1.2.0) - 2018-04-19

### Added

* **package** Updated WAS lib. Removed swiper dependancy

## [1.6.0](https://github.com/wickeyware/was-tutorial/compare/1.6.0...1.5.0) - 2018-04-18

### Added

* **package** Updated WAS lib. Fixed title bar icon

## [1.5.0](https://github.com/wickeyware/was-tutorial/compare/1.5.0...1.4.9) - 2018-04-11

### Added

* **purchase** Add ability to purchase other sound.

## [1.4.9](https://github.com/wickeyware/was-tutorial/compare/1.4.9...1.4.7) - 2018-04-11

### Fixed

* **package** Update to latest WAS library.
* **Screenshots** Updated screenshots

## [1.4.7](https://github.com/wickeyware/was-tutorial/compare/1.4.7...1.4.6) - 2018-04-03

### Fixed

* **package** Update to latest WAS menu button, show shop on apps with inapps.

## [1.4.6](https://github.com/wickeyware/was-tutorial/compare/1.4.6...1.4.5) - 2018-03-29

### Fixed

* **package** Update to latest WAS to fix SSO login.

## [1.4.5](https://github.com/wickeyware/was-tutorial/compare/1.4.5...1.3.4) - 2018-03-23

### Added

* **Vast** Add new WAS dependency Vast Player.

### Fixed

* **package** Update to latest angular libs.

### Removed

* **swprecache** Remove old sw precache config.

## [1.3.4](https://github.com/wickeyware/was-tutorial/compare/1.3.4...1.3.3) - 2018-02-23

### Fixed

* **package** Update to latest WAS lib 2.0.0, this removes many old deprecated popovers in favor of the dialog based ones.
* **README** Fix the build and start example commands.

## [1.3.3](https://github.com/wickeyware/was-tutorial/compare/1.3.3...1.3.2) - 2018-02-21

### Fixed

* **package** Update to latest WAS lib (new UI), showcase new features.

## [1.3.2](https://github.com/wickeyware/was-tutorial/compare/1.3.2...1.3.1) - 2018-02-13

### Fixed

* **App** Fix push ID not always saving.
* **package** Update to latest WAS lib (new SSO).

## [1.3.1](https://github.com/wickeyware/was-tutorial/compare/1.3.1...1.3.0) - 2018-02-01

### Fixed

* **package** Update to latest WAS to fix UserService bug.

## [1.3.0](https://github.com/wickeyware/was-tutorial/compare/1.3.0...1.2.1) - 2018-01-26

### Changed

* **ServiceWorker** Switch to angular service worker.
* **WAS** Update to new WAS alert modals.

## [1.2.1](https://github.com/wickeyware/was-tutorial/compare/1.2.1...1.2.0) - 2018-01-25

### Fixed

* **Push** Add OneSignal gcm id to manifest.

## [1.2.0](https://github.com/wickeyware/was-tutorial/compare/1.2.0...1.1.11) - 2018-01-19

### Changed

* **HOST** Move from https://wickeyware.github.io/was-tutorial/ -> https://airhorn.wickeyappstore.com/
* **deploy** Update deploy script for new host `yarn run deploy`.
* **assets** Update manifest and index to use local icons (since they are hosted on AWS S3).
* **app** Update main page to use 3 page tab, instead of swiper.
* **package** Update to new WAS, which adds feature to keep signed in while using other WAS apps.
* **package** Add new WAS Angular Material dependency.
* **PUSH** Wait to ask to allow push notifications till after horn use.
* **MANIFEST** Updated start_url to denote that app started from home screen.
* **app** Center tab bar.

## [1.1.11](https://github.com/wickeyware/was-tutorial/releases/tag/1.1.11) - 2018-01-16

### Fixed

* **packages.json** Updated libaries: Angular, rxjs, WAS, typescript, etc.
* **PushNotifications** Added a detailed example config.
* **CHANGELOG** Added a changelog.
* **WasStore** Added an example of how to use the WAS Key/Val store.
