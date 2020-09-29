import {Component, Inject, OnInit} from '@angular/core';
import {ChatService} from './services/chat.service';

const fetcher = (url) => fetch(url).then((res) => res.json());

@Component({
  selector: 'app-root',
  templateUrl: './home/home.page.html',
  styleUrls: ['./home/home.page.css']
})
export class AppComponent implements OnInit {
  public users = 0;
  public message = '';
  public messages: string[];

  constructor(private chatService: ChatService,
              @Inject('serverUrl') serverUrl: string) {
    fetcher(`${serverUrl}/messages`).then((data) => this.messages = data).catch((error) => console.log(error));
  }

  ngOnInit(): void {
    this.chatService.receiveChat().subscribe((message: string) => {
      this.messages.push(message);
    });
    this.chatService.getUsers().subscribe((users: number) => {
      this.users = users;
    });
  }

  addChat(): void {
    const currMessage = this.message.trim();
    if (currMessage) {
      this.messages.push(currMessage);
      this.chatService.sendChat(currMessage);
      this.message = '';
    }
  }
}
