import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { WASAlertPopupComponent, UserService, User, UserParams } from 'wickeyappstore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public busy: Subscription;
  title = 'WAS Tutorial';
  public error_message: any;
  private test_alert = 0;
  public userMessage = '';
  public verifiedUser = false;
  public options = {
    radius: 240,
    defaultPosition: 'bottomLeft',
    buttonOpacity: 0.85,
    defaultOpen: false,
    spinable: false,
  };
  public wings = [
    {
      'title': 'Leave a Review',
      'color': '#ea2a29',
      'icon': {
        'name': 'fa fa-send',
      },
      'name': 'review',
    },
    {
      'title': 'Open the Store',
      'color': '#f16729',
      'icon': {
        'name': 'fa fa-shopping-bag'
      },
      'name': 'store',
    }
  ];
  public gutter = { top: 30, left: 10, right: 10, bottom: 30 };

  public startAngles = {
    topLeft: 20,
    topRight: 130,
    bottomRight: 186,
    bottomLeft: 324
  };

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    console.log('WASTutorial ngOnInit:');
  }
  public WASMenuClick(open: any) {
    // returns true or false
    console.log('WASMenuClick', open);
  }
  public WASWingClick(event: any) {
    // returns the 'wings' object of the clicked
    console.log('WASWingClick', event);
  }

  get displayMessage() {
    return this.userService.user.map((usr: User) => {
      let _displayMsg = '';
      if (usr.email) {
        _displayMsg = 'verified user';
      } else {
        _displayMsg = '*unverified*';
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
      this.error_message = {
        title: titleMsg,
        message: `New random value ${newVal} < current ${_app_data.score}`,
        header_bg: '#29B6F6', header_color: 'black', button_type: 'btn-info',
        helpmessage: [],
        randcookie: `${Math.random()}${Math.random()}${Math.random()}`,
      };
    } else {
      let titleMsg = 'Uhoh you lost...';
      if (_lessThan === false) {
        titleMsg = 'WIN!';
      }
      // SHOW RESULTS IN POPUP
      this.error_message = {
        title: titleMsg,
        message: `New random value ${newVal} >= current ${_app_data.score}`,
        header_bg: '#29B6F6', header_color: 'black', button_type: 'btn-info',
        helpmessage: [],
        randcookie: `${Math.random()}${Math.random()}${Math.random()}`,
      };
    }
    _app_data.score = newVal;
    this.updateUser(this.userService.coins, JSON.stringify(_app_data));
  }
  wasUpdate(_loc_key: any) {
    if (_loc_key === 'was-user') {
      console.log('wasUpdate: ', _loc_key);
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
          this.error_message = {
            title: usr.special_message.title, message: usr.special_message.message,
            button_type: 'btn-info', header_bg: '#29B6F6', header_color: 'black',
            helpmessage: [],
            randcookie: `${Math.random()}${Math.random()}${Math.random()}`
          };
        }
        // this.busy = null;
        // Add user context in sentry
        // Raven.setUserContext({email: usr.email, id: usr.user_id});
      }, (error) => {
        // <any>error | this casts error to be any
        // NOTE: Can handle error return messages
        console.log('WASTutorial updateUser: RETURN ERROR:', error);
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
    } else {
      console.log('closeLoginScreen');
    }
  }
}
