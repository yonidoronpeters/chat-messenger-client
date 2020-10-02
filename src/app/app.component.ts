import {Component, Inject, OnInit} from '@angular/core';
import {ChatService} from './services/chat.service';
import {FormControl} from '@angular/forms';
import {User} from './user';
import {HttpClient} from '@angular/common/http';
import {Message} from './message';

const fetcher = (url) => fetch(url).then((res) => res.json());

@Component({
  selector: 'app-root',
  templateUrl: './home/home.page.html',
  styleUrls: ['./home/home.page.css']
})
export class AppComponent implements OnInit {
  users = 0;
  message = '';
  messages: Message[];
  name = new FormControl('');
  user;
  isChat = false;

  constructor(private chatService: ChatService,
              private http: HttpClient,
              @Inject('serverUrl') serverUrl: string) {
    fetcher(`${serverUrl}/messages`).then((data) => this.messages = data).catch((error) => console.log(error));
  }

  ngOnInit(): void {
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
      const msg: Message = { username: this.user.name, text: currMessage };
      this.messages.push(msg);
      this.chatService.sendChat(msg);
      this.message = '';
    }
  }

  async setName(): Promise<void> {
    this.user = new User(this.name.value);
    console.log(this.name.value);
    // serverside validation
    if (this.name.value?.trim() === '') {
      console.error('Invalid username!');
    } else {
      console.log('switch to chat');
      this.isChat = true;
    }
  }
}
