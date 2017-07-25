import { Component, OnInit } from '@angular/core';
import { LocalStorageService, WASAlertPopupComponent } from 'wickeyappstore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WickeyAppStore Tutorial';
  public user: any;
  public error_message: any;
  private test_alert = 0;

  constructor(
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
          // normal load
          console.log('load user from db', this.user);
          if (show_alert) {
            this.error_message = {
              title: 'User Object',
              message: `${JSON.stringify(this.user)}`,
              header_bg: '#29B6F6', header_color: 'black', button_type: 'btn-info',
              helpmessage: [],
              randcookie: `${Math.random()}${Math.random()}${Math.random()}`,
            };
          }
        } else {
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
  private handleError(error: any): Promise<any> {
    // .catch(this.handleError);
    console.error('An error occurred', error);  // for demo purposes
    return Promise.reject(error.message || error);
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
