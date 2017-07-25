import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {BusyModule} from 'angular2-busy';
import { WickeyAppStoreModule, ApiConnectionService, LocalStorageService } from 'wickeyappstore';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WickeyAppStoreModule
  ],
  providers: [ApiConnectionService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
