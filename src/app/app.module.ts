import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// TODO extract property
// const messageServerUrl = 'https://cryptochatter.herokuapp.com';
const messageServerUrl = 'http://localhost:3005';
const config: SocketIoConfig = { url: messageServerUrl };

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{provide: 'serverUrl', useValue: messageServerUrl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
