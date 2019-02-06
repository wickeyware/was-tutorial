import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { OneSignalController } from '../OneSignalController';
import { UserService, User, UserParams, WasUp, WasAlert, WasPay, PromptUpdateService } from 'wickeyappstore';
import { Howl } from 'howler';
import { SupportPopupComponent } from './support-popup/support-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // (1) SET THESE VALUES FOR YOUR APP ****************************
  public title = 'Air Horn';
  public version = '1.10.1';
  public whatsNew = 'Update to latest Angular and WickeyAppStore.';
  // (2) UPDATE the version to match in package.json ****************************
  //     UPDATE the version & description in ngsw-config.json
  //
  //
  // (3) SET THESE VALUES FOR YOUR APP ****************************
  // IF YOU DO NOT HAVE PUSH NOTIFICATIONS just set ONESIGNAL_ENABLED = FALSE
  private ONESIGNAL_ENABLED = true;
  private oneSignalAppId = '5198c0dc-616c-46df-9357-15830b47ffbc';
  private oneSignalSafariWebId = 'web.onesignal.auto.48d27e8c-5bf0-4f8f-a083-e09c208eb2cb';
  private oneSignalConfig = { title: this.title, exampleNotificationMessage: 'New horn sounds are here, get em now!' };
  //



  // Variables //
  // push controller
  private oneSignalController = new OneSignalController();
  // declare the air horn sounds
  private classicsound = new Howl({ src: ['assets/sounds/airhorn.mp3'] });
  private trombonesound = new Howl({ src: ['assets/sounds/sad-trombone.mp3'] });

  // stat to save
  public hornPresses = 0;
  public trombonePurchaseId = 10;  // This is from the developer.wickeyappstore.com panel after inapps are added.


  constructor(
    public userService: UserService,
    private promptUpdateService: PromptUpdateService,
    public dialog: MatDialog
  ) {
    // Pushes update on all login status changes (also pushes status on initial load)
    this.userService.loginChange.subscribe((isLogged: boolean) => {
      console.log('USER LOADED:', this.userService.userObject.user_id);
      if (isLogged) {
        console.warn('LOGGED IN');
        // load save data from server
        this.getFromCloud();
      } else {
        console.warn('LOGGED OUT');
        // reset progress
        this.hornPresses = 0;
      }
      // This initiate the Push Service. Do on login status changes
      this.oneSignalController.loadPushSystem(this.userService, this.oneSignalAppId, this.oneSignalSafariWebId,
        this.oneSignalConfig, this.ONESIGNAL_ENABLED);
    });
  }

  // Play the air horn sound
  playHorn(horn: number) {
    console.log('playHorn', horn);
    let DIDSOUNDPLAY = false;
    if (horn === 1) {
      DIDSOUNDPLAY = true;
      this.classicsound.play();
    } else {
      // TODO: Need to change to different icon if unlocked <i class="material-icons">sentiment_very_dissatisfied</i>
      const tromboneInapp = this.userService.getInapp(this.trombonePurchaseId);
      // check if locked
      if (tromboneInapp && tromboneInapp.isOwned === true) {
        DIDSOUNDPLAY = true;
        this.trombonesound.play();
      } else {
        console.log('this horn is locked');
        this.dialog.open(WasPay, { data: tromboneInapp }).afterClosed().subscribe(isSuccess => {
          if (isSuccess === true) {
            DIDSOUNDPLAY = true;
            this.playHorn(horn);
          }
        });
      }
    }
    // check if sound played
    if (DIDSOUNDPLAY) {
      this.hornPresses = this.hornPresses + 1;
      this.saveToCloud();
      if (this.hornPresses === 5) {
        this.oneSignalController.askForPush();
      }
    }
  }

  //  Return the login message
  get displayMessage() {
    return this.userService.user.pipe(map((usr: User) => {
      if (usr.email) {
        return 'Welcome Back!';
      } else {
        return 'Sign in with the WickeyAppStore button';
      }
    }));
  }

  // open the support popup
  supportPopUp() {
    this.dialog.open(SupportPopupComponent, {
      width: '80%',
      data: {
        title: 'Contact Us'
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // AIR HORN SAVE/GET
  // We are using 'horn_key' as our identifier. Any key is valid - if you set it, you can update it and read from it.
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  saveToCloud() {
    this.userService.setStore({ horn_key: this.hornPresses });
  }
  getFromCloud() {
    const mykey = 'horn_key';
    this.userService.getStore([mykey]).subscribe((res) => {
      // console.log('WAS: getMetaData RETURN:', res);
      if (res[mykey]) {
        this.hornPresses = Number(res[mykey]);
      }
    }, (error) => {
      // may want to deal with the error - or ignore and try it again
    });
  }
  deleteKeyStoreCloud(key: string) {
    const mykeys = [key];
    this.userService.deleteStore(mykeys).subscribe((res) => {
      // console.log('WAS: deleteStore RETURN:', res);
    }, (error) => {
      // may want to deal with the error - or ignore and try it again
      // this.dialog.open(WasAlert, {data: { title: 'Attention', body: error }});
    });
  }

}
