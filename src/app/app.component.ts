import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SwUpdate } from '@angular/service-worker';
import {
  UserService, User, UserParams,
  WasUp, WasAlert
} from 'wickeyappstore';
import { Howl } from 'howler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'Air Horn';
  public version = '1.4.6';
  public whats_new = 'Update to latest WAS menu button, showcase new features.';
  private oneSignal: any;
  private oneSignalInited = false;
  private sound = new Howl({
    src: ['assets/sounds/airhorn.mp3']
  });

  // stat to save
  public horn_presses = 0;


  constructor(
    public userService: UserService,
    updates: SwUpdate,
    public dialog: MatDialog
  ) {
    // Pushes update on all login status changes (also pushes status on initial load)
    this.userService.loginChange.subscribe( (_isLogged: boolean) => {
      console.log('USER LOADED:', this.userService.userObject.user_id);
      if (_isLogged) {
        console.warn('LOGGED IN');
      } else {
        console.warn('LOGGED OUT');
      }
      // load save data from server
      this.getGame();
      // This initiate the Push Service. Do on login status changes
      this.loadOneSignal();
    });

    // LISTEN/HANDLE FOR NEW SITE VERSION //
    updates.available.subscribe(event => {
      console.log('promptUser: NEW CONTENT', event);
      // event.available.name/description/version
      let app_title = 'New Content';
      let app_description = 'New or updated content is available! Please refresh your page.';
      let app_version = null;
      let app_askToUpdate = true;
      if (event.available.appData) {
        if (event.available.appData.hasOwnProperty('title') && event.available.appData['title'] !== null) {
          app_title = event.available.appData['title'];
        }
        if (event.available.appData.hasOwnProperty('description') && event.available.appData['description'] !== null) {
          app_description = event.available.appData['description'];
        }
        if (event.available.appData.hasOwnProperty('version') && event.available.appData['version'] !== null) {
          app_version = event.available.appData['version'];
        }
        if (event.available.appData.hasOwnProperty('askToUpdate') && event.available.appData['askToUpdate'] !== null) {
          app_askToUpdate = event.available.appData['askToUpdate'];
        }
      }
      if (app_version !== null) {
        app_description += ` [v${app_version}]`;
      }
      if (app_askToUpdate) {
        this.dialog.open(WasAlert, {
          data: { title: app_title, body: app_description, buttons: ['Refresh', 'No'] }
        }).afterClosed().subscribe(result => {
          // result is the index of the button pressed
          if (result === 0) {
            updates.activateUpdate().then(() => document.location.reload());
          }
        });
      }
    });
    // LISTEN/HANDLE FOR NEW SITE VERSION //
  }

  // PUSH NOTIFICATIONS
  // STEP 1: Create an account https://onesignal.com
  // STEP 2: https://documentation.onesignal.com/docs/web-push-sdk-setup-https
  // OneSignal API: https://documentation.onesignal.com/docs/web-push-sdk
  // https://documentation.onesignal.com/v3.0/docs/customize-permission-messages
  doOneSignal() {
    // INIT PUSH serviceWorkerUpdaterPath: 'was-tutorial',
    if (this.oneSignalInited === false) {
      this.oneSignal.push(['init', {
        appId: '5198c0dc-616c-46df-9357-15830b47ffbc',
        safari_web_id: 'web.onesignal.auto.48d27e8c-5bf0-4f8f-a083-e09c208eb2cb',
        path: '/',
        autoRegister: false,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          enable: false
        },
        promptOptions: {
          /* Change bold title, limited to 30 characters */
          siteName: 'AirHorner',
          /* Subtitle, limited to 90 characters */
          actionMessage: `We'd like to show you push notifications for new app content and important news.`,
          /* Example notification title */
          exampleNotificationTitle: 'New App Content!',
          /* Example notification message */
          exampleNotificationMessage: 'New horn sounds are here, honk honk!',
          /* Text below example notification, limited to 50 characters */
          exampleNotificationCaption: 'You can unsubscribe anytime',
          /* Accept button text, limited to 15 characters */
          acceptButtonText: 'ALLOW',
          /* Cancel button text, limited to 15 characters */
          cancelButtonText: 'NO THANKS'
      }
      }]);
      this.oneSignalInited = true;
    }
    // // CHECK IF PUSH SUPPORTED
    // this.oneSignal.push(() => {
    //   const isPushSupported = this.oneSignal.isPushNotificationsSupported();
    //   if (isPushSupported) {
    //     console.log('=======\nPUSH ALLOWED\n=======');
    //     // Push notifications are supported
    //   } else {
    //     // Push notifications are not supported
    //     console.log('=======\nOH NO, NO PUSH\n=======');
    //   }
    // });
    // ADD LISTENER ON SUBSCRIPTION CHANGE
    this.oneSignal.push(() => {
      // Occurs when the user's subscription changes to a new value.
      this.oneSignal.on('subscriptionChange', (isSubscribed) => {
        console.log(`OneSignal: The user's subscription state is now:`, isSubscribed);
        this.oneSignal.getUserId().then((pushId) => {
          console.log('OneSignal: User ID is', pushId);
          this.userService.updateUserPushId(pushId);
        });
      });
    });
    // GET USER ID
    this.oneSignal.push(() => {
      this.oneSignal.isPushNotificationsEnabled().then((isEnabled) => {
        this.oneSignal.getUserId().then((pushId) => {
          console.log('OneSignal User ID is', pushId);
          this.userService.updateUserPushId(pushId);
        });
      });
    });
    // NOTE: To immediately ask for push, uncomment following line
    // this.askForPush();
  }

  askForPush() {
    try {
      // REGISTER FOR PUSH
      this.oneSignal.push(() => {
        console.log('OneSignal: Register For Push');
        // CHECK IF PUSH IS ENABLED
        this.oneSignal.isPushNotificationsEnabled().then((isEnabled) => {
          if (isEnabled) {
            console.log('Push notifications are enabled!');
            this.oneSignal.push(() => {
              this.oneSignal.getUserId().then((pushId) => {
                console.log('OneSignal User ID is', pushId);
                this.userService.updateUserPushId(pushId);
              });
            });
          } else {
            // SHOW PUSH REGISTRATION POPUP
            this.oneSignal.registerForPushNotifications({modalPrompt: true});
          }
        });
      });
    } catch (pusherror) {
      console.error('askForPush', pusherror);
    }
  }

  loadOneSignal() {
    console.log('loadOneSignal');
    // Wait till window has OneSignal, else don't do push stuff
    // const OneSignal = window['OneSignal'] || [];
    const myTimer = setInterval(() => {
      console.log('Check if OneSignal is loaded');
      if (window.hasOwnProperty('OneSignal')) {
        clearInterval(myTimer);
        console.log('OneSignal: READY FOR INIT');
        this.oneSignal = window['OneSignal'];
        // This asks user to enable push
        this.doOneSignal();
      }
    }, 500);
  }
  // PUSH NOTIFICATIONS

// Play the air horn sound
  playHorn(horn: number) {
    console.log('playHorn', horn);
    if (horn === 1) {
      this.sound.play();
      this.horn_presses = this.horn_presses + 1;
      this.saveGame();
      this.askForPush();
    } else {
      // check if locked
      console.log('this horn is locked');
      this.dialog.open(WasAlert, {
        data: { title: 'Locked', body: 'This sound is locked' }
      });
    }
  }

//  Return the login message
  get displayMessage() {
    return this.userService.user.map((usr: User) => {
      let _displayMsg = '';
      if (usr.email) {
        _displayMsg = 'Welcome Back!';
      } else {
        _displayMsg = 'Sign in with the WickeyAppStore button';
      }
      return _displayMsg;
    });
  }

  ////////////////////////////////////////////
  // AIR HORN SAVE/GET
  // This uses getStore and setStore...
  // just added as convenience methods
  ////////////////////////////////////////////
  saveGame() {
    this.setStore({'horn_key': this.horn_presses});
  }
  getGame() {
    const _mykey = 'horn_key';
    this.userService.getStore([_mykey]).subscribe((res) => {
      console.log('WAS: getMetaData RETURN:', res);
      if (res[_mykey]) {
        this.horn_presses = Number(res[_mykey]);
      }
    }, (error) => {
      this.dialog.open(WasAlert, {
        data: { title: 'Attention', body: error }
      });
    });
  }

  ///////////////////////////////
  // WAS DATA STORE //
  ///////////////////////////////
  getStore(key: string) {
    const _mykeys = [key];
    this.userService.getStore(_mykeys).subscribe((res) => {
      // console.log('WAS: getStore RETURN:', res);
    }, (error) => {
      // console.log('WAS: getStore ERROR:', error);
      this.dialog.open(WasAlert, {
        data: { title: 'Attention', body: error }
      });
    });
  }
  setStore(data) {
    const _was_data = data; // { 'key1': 'my value' };
    this.userService.setStore(_was_data).subscribe((res) => {
      // console.log('WAS: setStore RETURN:', res);
    }, (error) => {
      // console.log('WAS: setStore ERROR:', error);
      this.dialog.open(WasAlert, {
        data: { title: 'Attention', body: error }
      });
    });
  }
  deleteStore() {
    const _mykeys = ['key1'];
    this.userService.deleteStore(_mykeys).subscribe((res) => {
      // console.log('WAS: deleteStore RETURN:', res);
    }, (error) => {
      // console.log('WAS: deleteStore ERROR:', error);
      this.dialog.open(WasAlert, {
        data: { title: 'Attention', body: error }
      });
    });
  }
  ///////////////////////////////
  // WAS DATA STORE //
  ///////////////////////////////




}
