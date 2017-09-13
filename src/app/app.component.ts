import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { WASAlertComponent, UserService, User, UserParams } from 'wickeyappstore';
import { Howl } from 'howler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(WASAlertComponent) wasalert: WASAlertComponent;
  public busy: Subscription;
  title = 'WAS Tutorial';
  private test_alert = 0;
  public userMessage = '';
  public verifiedUser = false;
  private oneSignal: any;
  private sound = new Howl({
    src: ['/assets/sounds/airhorn.mp3']
  });

  constructor(
    public userService: UserService
  ) {
  }


  public config: Object = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 20,
    initialSlide: 1, // slide number which you want to show-- 0 by default
  };

  playHorn(horn: number) {
    console.log('playHorn', horn);
    if (horn === 1) {
      this.sound.play();
    } else {
      // check if locked
      console.log('this horn is locked');
      this.wasalert.open(
        { title: 'Locked', text: 'This sound is locked' } // Login error
      );
    }
  }
  closealert(action: any) {
    console.log('close alert');
  }

  // PUSH NOTIFICATIONS
  // STEP 1: Create an account https://onesignal.com
  // STEP 2: https://documentation.onesignal.com/docs/web-push-sdk-setup-https
  // OneSignal API: https://documentation.onesignal.com/docs/web-push-sdk
  doOneSignal() {
    // INIT PUSH serviceWorkerUpdaterPath: 'was-tutorial',
    this.oneSignal.push(['init', {
      appId: '5198c0dc-616c-46df-9357-15830b47ffbc',
      safari_web_id: 'web.onesignal.auto.48d27e8c-5bf0-4f8f-a083-e09c208eb2cb',
      path: 'was-tutorial/',
      autoRegister: false,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: false
      }
    }]);
    // REGISTER FOR PUSH
    this.oneSignal.push(() => {
      console.log('OneSignal: Register For Push');
      // CHECK IF PUSH IS ENABLED
      this.oneSignal.isPushNotificationsEnabled().then((isEnabled) => {
        if (isEnabled) {
          console.log('Push notifications are enabled!');
        } else {
          // SHOW PUSH REGISTRATION POPUP
          // this.oneSignal.push(['registerForPushNotifications', {modalPrompt: true}]);
          this.oneSignal.registerForPushNotifications({
            modalPrompt: true
          });
        }
      });
    });
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
        this.oneSignal.getUserId().then((userId) => {
          console.log('OneSignal: User ID is', userId);
          this.updateUserPushId(userId);
        });
      });
    });
    // GET USER ID
    this.oneSignal.push(() => {
      this.oneSignal.getUserId().then((userId) => {
        console.log('OneSignal User ID is', userId);
        this.updateUserPushId(userId);
      });
    });
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
        this.doOneSignal();
      }
    }, 500);
  }
  // PUSH NOTIFICATIONS

  ngOnInit(): void {
    console.log('WASTutorial ngOnInit:');
    this.loadOneSignal();
  }

  updateUserPushId(push_id: string) {
    this.userService.updateUser({ 'push_id': push_id })
      .subscribe((usr) => {
        console.log('WASTutorial updateUserPushId: RETURN:', usr);
        // NOTE: all user APIS can return a `special_message`
        if (usr.special_message) {
          this.wasalert.open(
            { title: usr.special_message.title, text: usr.special_message.message } // Login error
          );
        }
      }, (error) => {
        // <any>error | this casts error to be any
        // NOTE: Can handle error return messages
        console.log('WASTutorial updateUserPushId: RETURN ERROR:', error);
        this.wasalert.open(
          { title: 'Attention', text: error } // Login error
        );
      });
  }

  get displayMessage() {
    return this.userService.user.map((usr: User) => {
      let _displayMsg = '';
      if (usr.email) {
        _displayMsg = 'Welcome back';
      } else {
        _displayMsg = 'Use SSO to sign into your Wickey App Store account';
      }
      return _displayMsg;
    });
  }



  playGame(_lessThan: boolean) {
    // This gets a random integer and compares it to last value
    const newVal = Math.round(Math.random() * 100);
    let _app_data;
    try {
      _app_data = JSON.parse(this.userService.data);
    } catch (error) {
      console.log('WASTutorial playGame: Set initial game value');
      _app_data = { 'score': Math.round(Math.random() * 100) };
    }
    if (newVal < _app_data.score) {
      let titleMsg = 'Uhoh you lost...';
      if (_lessThan === true) {
        titleMsg = 'WIN!';
      }
      // SHOW RESULTS IN POPUP
      this.wasalert.open(
        { title: titleMsg, text: `New random value ${newVal} < current ${_app_data.score}` } // Login error
      );
    } else {
      let titleMsg = 'Uhoh you lost...';
      if (_lessThan === false) {
        titleMsg = 'WIN!';
      }
      // SHOW RESULTS IN POPUP
      this.wasalert.open(
        { title: titleMsg, text: `New random value ${newVal} >= current ${_app_data.score}` } // Login error
      );
    }
    _app_data.score = newVal;
    this.updateUser(this.userService.coins, JSON.stringify(_app_data));
  }
  private handleError(error: any): Promise<any> {
    // .catch(this.handleError);
    console.error('An error occurred', error);  // for demo purposes
    return Promise.reject(error.message || error);
  }
  onSubmit() {
    console.log('onSubmit: Save user locally and to server');
    // Call WAS save user function, this saves locally and to server
    // this.updateUser();
  }

  updateUser(app_coins?: number, app_data?: string): void {
    console.log('WASTutorial updateUser:');
    this.busy = this.userService.updateUser({ 'coins': app_coins, 'data': app_data })
      .subscribe((usr) => {
        console.log('WASTutorial updateUser: RETURN:', usr);
        // NOTE: all user APIS can return a `special_message`
        if (usr.special_message) {
          this.wasalert.open(
            { title: usr.special_message.title, text: usr.special_message.message } // Login error
          );
        }
        // this.busy = null;
        // Add user context in sentry
        // Raven.setUserContext({email: usr.email, id: usr.user_id});
      }, (error) => {
        // <any>error | this casts error to be any
        // NOTE: Can handle error return messages
        console.log('WASTutorial updateUser: RETURN ERROR:', error);
        this.wasalert.open(
          { title: 'Attention', text: error } // Login error
        );
      });
  }




}
