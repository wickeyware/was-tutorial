import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {BusyModule} from 'angular2-busy';
import { WickeyAppStoreModule, ApiConnectionService, LocalStorageService, UserService } from 'wickeyappstore';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    WickeyAppStoreModule
  ],
  providers: [ApiConnectionService, LocalStorageService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
