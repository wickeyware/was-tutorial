import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { WickeyAppStoreModule } from 'wickeyappstore';
// WAS FAN MENU IMPORT //
import { FanMenuModule } from './was_menu/menu.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    WickeyAppStoreModule,
    FanMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
