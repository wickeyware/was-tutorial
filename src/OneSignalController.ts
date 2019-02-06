// This is Was-Tutorial implementation of OneSignal
import { UserService } from 'wickeyappstore';

/**
 * STEP 1: Create an account https://onesignal.com
 * STEP 2: https://documentation.onesignal.com/docs/web-push-sdk-setup-https
 */
export class OneSignalController {


    private oneSignal: any;
    private oneSignalInited = false;

    private appId;
    private safariWebId;
    private oneSignalConfig = { title: 'Air Horn', exampleNotificationMessage: 'New horn sounds are here, get em now!' };
    private ENABLED = true;

    private userService: UserService;

    /**
     * This initiate the Push Service. Do this on login status changes
     * @param appId The app id from onesignal
     * @param safariWebId The safari web id from onesignal
     */
    public loadPushSystem(userService: UserService, appId: string, safariWebId: string,
                          oneSignalConfig: { title: string, exampleNotificationMessage: string }, ENABLED: boolean) {
        console.log('OneSignalController', 'loadPushSystem');
        this.ENABLED = ENABLED;
        if (this.ENABLED) {
            console.log('OneSignalController', appId, safariWebId);
            this.userService = userService;
            this.appId = appId;
            this.safariWebId = safariWebId;
            this.oneSignalConfig = oneSignalConfig;
            this.loadOneSignal();
        } else {
            console.log('OneSignalController', 'NOT ENABLED');
        }
    }

    /**
     * Ask for push in appropriate circumstances.
     * For instance, if you ask the user if they want to be notified about updates and they say yes. Then askForPush()
     */
    public askForPush() {
        if (this.ENABLED) {
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
                            this.oneSignal.registerForPushNotifications({ modalPrompt: true });
                        }
                    });
                });
            } catch (pusherror) {
                console.error('askForPush', pusherror);
            }
        } else {
            console.log('OneSignalController', 'NOT ENABLED');
        }
    }


    // PUSH NOTIFICATIONS
    // STEP 1: Create an account https://onesignal.com
    // STEP 2: https://documentation.onesignal.com/docs/web-push-sdk-setup-https
    // OneSignal API: https://documentation.onesignal.com/docs/web-push-sdk
    // https://documentation.onesignal.com/v3.0/docs/customize-permission-messages
    private doOneSignal() {
        // INIT PUSH serviceWorkerUpdaterPath: 'was-tutorial',
        if (this.oneSignalInited === false) {
            this.oneSignal.push(['init', {
                appId: this.appId,
                safari_web_id: this.safariWebId,
                path: '/',
                autoRegister: false,
                allowLocalhostAsSecureOrigin: true,
                notifyButton: {
                    enable: false
                },
                promptOptions: {
                    /* Change bold title, limited to 30 characters */
                    siteName: this.oneSignalConfig.title,
                    /* Subtitle, limited to 90 characters */
                    actionMessage: `We'd like to show you push notifications for new app content and important news.`,
                    /* Example notification title */
                    exampleNotificationTitle: 'New App Content!',
                    /* Example notification message */
                    exampleNotificationMessage: this.oneSignalConfig.exampleNotificationMessage,
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



    private loadOneSignal() {
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

}
