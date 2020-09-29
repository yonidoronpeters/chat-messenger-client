import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {FormsModule} from '@angular/forms';

const messageServerUrl = 'https://cryptochatter.herokuapp.com';
const config: SocketIoConfig = { url: messageServerUrl };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule,
  ],
  providers: [{provide: 'serverUrl', useValue: messageServerUrl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
