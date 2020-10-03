import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { FormControl } from '@angular/forms';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Message } from './message';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './home/home.page.html',
  styleUrls: ['./home/home.page.css'],
})
export class AppComponent implements OnInit {
  users = 0;
  message = '';
  messages: Message[];
  name = new FormControl('');
  user;
  isChat = false;
  serverUrl = environment.messageServerUrl;

  constructor(private chatService: ChatService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(`${this.serverUrl}/messages`)
      .toPromise()
      .then((data: Message[]) => (this.messages = data))
      .catch((error) => console.log(error));
    this.chatService.receiveChat().subscribe((message: Message) => {
      this.messages.push(message);
    });
    this.chatService.getUsers().subscribe((users: number) => {
      this.users = users;
    });
  }

  addChat(): void {
    const currMessage = this.message.trim();
    if (currMessage) {
      const msg: Message = {
        username: this.user.name,
        text: currMessage,
        datetime: new Date(),
      };
      this.messages.push(msg);
      this.chatService.sendChat(msg);
      this.message = '';
    }
  }

  setName(): void {
    this.user = new User(this.name.value);
    console.log(this.name.value);
    if (this.name.value?.trim() === '') {
      console.error('Invalid username!');
    } else {
      console.log('switch to chat');
      this.isChat = true;
    }
  }
}
