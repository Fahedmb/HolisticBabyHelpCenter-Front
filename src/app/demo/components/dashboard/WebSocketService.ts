import { Injectable } from '@angular/core';
import { CompatClient, Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: any;
  private notificationsSubject: Subject<any> = new Subject<any>();
  private sentMessages: Map<number, number> = new Map();
  private messageSubject: Subject<any> = new Subject<any>();
  constructor() {
  }
  connect() {
    const socket = new SockJS('//localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/notifications', (message: any) => {
        this.notificationsSubject.next(JSON.parse(message.body));
      });
    });
  }


  getNotifications() {
    return this.notificationsSubject.asObservable();
  }
  initializeWebSocketConnectionPrivate(userId: string) {
    const socket = new SockJS('//localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/user/${userId}/private`, (message: any) => {
        this.messageSubject.next(JSON.parse(message.body));
      });
    });
  }
  sendPrivateMessage(message: any, username: string | undefined, onMessageSent?: (actualId: number) => void) {
    this.stompClient.send(`/app/private-message/${username}`, {}, JSON.stringify(message));

    this.stompClient.subscribe(`/user/${username}/private`, (response: any) => {
      const serverResponse = JSON.parse(response.body);
      if (serverResponse && serverResponse.id) {
        const actualId = serverResponse.id;
        this.sentMessages.set(message.id, actualId);
        if (onMessageSent) {
          onMessageSent(actualId);
        }
      }
    });
  }
  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}
