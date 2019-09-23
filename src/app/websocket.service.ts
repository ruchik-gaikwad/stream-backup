import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {


  private serverUrl = 'http://13.235.223.235:9098/websocket-example';
  private title = 'WebSockets chat';
  private stompClient;
  public PoliticalSuject = new Subject();
  public IBMSubject =  new Subject();

  constructor(){
    this.initializeWebSocketConnection();
  }
 
  initializeWebSocketConnection(){
    console.log("here ??")
    let ws = new SockJS('http://13.235.223.235:9098/websocket-example');
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, (frame)  => {
      that.stompClient.subscribe("/topic/PoliticalDomainNda", (message) => {
        this.PoliticalSuject.next(message.body)
      });
      this.stompClient.subscribe("/topic/user", message => {
        this.IBMSubject.next(message)
      });
    });
  }

}