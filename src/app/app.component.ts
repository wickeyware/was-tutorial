import { Component, OnInit } from '@angular/core';
import { LocalStorageService, ApiConnectionService, WASAlertPopupComponent } from 'wickeyappstore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocalStorageService, ApiConnectionService]
})
export class AppComponent implements OnInit {
  title = 'WickeyAppStore Tutorial';
  public user: any;
  public error_message: any;
  private test_alert = 0;
  public userMessage = '';
  public verifiedUser = false;

  constructor(
    private apiConnectionService: ApiConnectionService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    console.log('AppComponent: ngOnInit');
    this.loadUser(false);
  }
  loadUser(show_alert: boolean) {
    this.localStorageService.get('was-user')
      .then((value: any): void => {
        if (typeof value !== 'undefined') {
          this.user = value;
          if (this.user.email) {
            this.userMessage = 'verified user';
          } else {
            this.userMessage = '*unverified*';
          }
          // normal load
          console.log('load user from db', this.user);
          if (show_alert) {
            this.error_message = {
              title: 'User Object',
              message: `user_id: ${this.user.user_id}, coins: ${this.user.coins}, data: ${this.user.data}`,
              header_bg: '#29B6F6', header_color: 'black', button_type: 'btn-info',
              helpmessage: [],
              randcookie: `${Math.random()}${Math.random()}${Math.random()}`,
            };
          }
        } else {
          this.userMessage = '*unverified*';
          // create new user
          console.log('ngOnInit create new user');
          if (show_alert) {
            this.error_message = {
              title: 'Hi',
              message: 'User not yet created, try again',
              header_bg: '#FFA726', header_color: 'black', button_type: 'btn-warning',
              helpmessage: [],
              randcookie: `${Math.random()}${Math.random()}${Math.random()}`,
            };
          }
        }
      }
      ).then(() => console.log('WASTutorial AppComponent: db', this.user))
      .catch(this.handleError);
  }
  wasUpdate(_loc_key: any) {
    if (_loc_key === 'was-user') {
      console.log('wasUpdate: ', _loc_key);
      this.loadUser(false);
    } else {
      console.log('wasUpdate: ', _loc_key);
    }
  }
  private handleError(error: any): Promise<any> {
    // .catch(this.handleError);
    console.error('An error occurred', error);  // for demo purposes
    return Promise.reject(error.message || error);
  }
  onSubmit() {
    console.log('onSubmit: Save user locally and to server');
    // TODO: Call WAS save user function, this saves locally and to server
    this.updateUser();
  }
  updateUser(): void {
    console.log('==============\nUPDATE USER\n==============');
    console.log(this.user);
    const apiobject = {user_id: this.user.user_id, email: this.user.email, version: .1, standalone: false,
    app_coins: this.user.coins, app_data: this.user.data};
    this.apiConnectionService
      .createPerson(apiobject)
      .subscribe((res) => {
        // Handle results
        // Standard return: signature, paypal, allow_reward_push, next_reward, coins, isPro, user_id
        // PLUS: freebie_used, settings, inapps, rated_app
        if (res.status === 201) {
          console.log('updateUser: NEW RETURN:', res);
          // On new user/recover
          // TODO: Add more of a verification
          this.user = res;
        } else {
          console.log('updateUser: RETURN:', res);
          // NOTE: If a user has an email, the account was either verified by token or doesn't belong to someone else.
          if (res.email && res.user_id) {
            this.user.user_id = res.user_id;
          }
          this.user.email = res.email;
          if (res.coins) {
            this.user.coins = res.coins;
          }
          if (res.data) {
            this.user.data = res.data;
          }
          this.user.created_time = res.created_time;
          this.user.freebie_used = res.freebie_used;
          this.user.settings = res.settings;
        }
        // UPDATE USER //
        this.localStorageService.set('user', this.user).then(() => {
          this.error_message = {
              title: 'Saved User',
              message: `user_id: ${this.user.user_id}, coins: ${this.user.coins}, data: ${this.user.data}`,
              header_bg: '#29B6F6', header_color: 'black', button_type: 'btn-info',
              helpmessage: [],
              randcookie: `${Math.random()}${Math.random()}${Math.random()}`,
            };
        });
        if (res.special_message) {
          this.error_message = {
            title: res.special_message.title, message: res.special_message.message,
            button_type: 'btn-info', header_bg: '#29B6F6', header_color: 'black',
            helpmessage: [],
            randcookie: `${Math.random()}${Math.random()}${Math.random()}`
          };
        }
        // Add user context in sentry
        // Raven.setUserContext({email: this.user.email, id: this.user.user_id});
      }, (error) => {
        // <any>error | this casts error to be any
        this.error_message = {
          title: 'Attention!',
          message: error,
          header_bg: '#F44336', header_color: 'black', button_type: 'btn-danger',
          helpmessage: [],
          randcookie: `${Math.random()}${Math.random()}${Math.random()}`,
        };
      });
  }
  onWASClose(_data: any) {
    if (_data) {
      console.log('onWASClose', _data);
    } else {
      console.log('onWASClose');
    }
  }
  testAlertBox() {
    this.error_message = {
      title: 'Attention!', message: 'Sorry had an oops', helpmessage: [],
      randcookie: `${Math.random()}${Math.random()}${Math.random()}`
    };
    if (this.test_alert === 0) {
    } else if (this.test_alert === 1) {
      this.error_message.button_type = 'btn-info';
      this.error_message.header_color = 'black';
      this.error_message.header_bg = '#29B6F6';
    } else if (this.test_alert === 2) {
      this.error_message.button_type = 'btn-success';
      this.error_message.header_color = 'black';
      this.error_message.header_bg = '#66BB6A';
    } else if (this.test_alert === 3) {
      this.error_message.button_type = 'btn-warning';
      this.error_message.header_color = 'black';
      this.error_message.header_bg = '#FFA726';
    } else {
      this.error_message.button_type = 'btn-danger';
      this.error_message.header_color = 'black';
      this.error_message.header_bg = '#EF5350';
      this.test_alert = 0;
    }
    this.test_alert += 1;
  }
  onAlertClose(data: any): void {
    if (data) {
      console.log('onAlertClose', data);
    } else {
      console.log('onAlertClose');
    }
  }
  // POPOVER //
  logoutUser(_data?: any) {
    if (_data) {
      console.log('logoutUser', _data);
    } else {
      console.log('logoutUser');
    }
  }
  closeLoginScreen(_data?: any) {
    if (_data) {
      console.log('closeLoginScreen', _data);
      this.loadUser(true);
    } else {
      console.log('closeLoginScreen');
    }
  }
}
