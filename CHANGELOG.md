# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/wickeyware/was-tutorial/compare/1.2.0...HEAD)

This shows all commits since last release.

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
