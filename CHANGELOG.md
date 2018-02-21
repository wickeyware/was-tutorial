# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/wickeyware/was-tutorial/compare/1.2.0...HEAD)

This shows all commits since last release.

## [1.3.3](https://github.com/wickeyware/was-tutorial/compare/1.3.3...1.3.2) - 2018-21-02

### Fixed

* **package** Update to latest WAS lib (new UI), showcase new features.

## [1.3.2](https://github.com/wickeyware/was-tutorial/compare/1.3.2...1.3.1) - 2018-13-02

### Fixed

* **App** Fix push ID not always saving.
* **package** Update to latest WAS lib (new SSO).


## [1.3.1](https://github.com/wickeyware/was-tutorial/compare/1.3.1...1.3.0) - 2018-01-02

### Fixed

* **package** Update to latest WAS to fix UserService bug.

## [1.3.0](https://github.com/wickeyware/was-tutorial/compare/1.3.0...1.2.1) - 2018-26-01

### Changed

* **ServiceWorker** Switch to angular service worker.
* **WAS** Update to new WAS alert modals.

## [1.2.1](https://github.com/wickeyware/was-tutorial/compare/1.2.1...1.2.0) - 2018-25-01

### Fixed

* **Push** Add OneSignal gcm id to manifest.

## [1.2.0](https://github.com/wickeyware/was-tutorial/compare/1.2.0...1.1.11) - 2018-19-01

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

## [1.1.11](https://github.com/wickeyware/was-tutorial/releases/tag/1.1.11) - 2018-16-01

### Fixed

* **packages.json** Updated libaries: Angular, rxjs, WAS, typescript, etc.
* **PushNotifications** Added a detailed example config.
* **CHANGELOG** Added a changelog.
* **WasStore** Added an example of how to use the WAS Key/Val store.
