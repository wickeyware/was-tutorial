import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { WickeyAppStoreModule } from 'wickeyappstore';
import { SupportPopupComponent } from './support-popup/support-popup.component';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SupportPopupComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('OneSignalSDKWorker.js', {enabled: environment.production}),
    FormsModule,
    WickeyAppStoreModule
  ],
  entryComponents: [SupportPopupComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
