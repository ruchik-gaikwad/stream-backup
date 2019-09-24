import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from '../service/websocket.service';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt'

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  styleUrls: ['./live-feed.component.scss']
})
export class LiveFeedComponent implements OnInit {

  @Input()
  activity;

  debug = new JwtHelperService();
  
  Activities = [];

  constructor(private _socket:WebsocketService) { }

  ngOnInit() {
      let count = 0;
      let token = this.debug.decodeToken(localStorage.getItem('token'))
      console.log(token)
      if (token.Role == "IBM") {
        this._socket.IBMSubject.subscribe((data: any) => {
          count++
          let dataJson = JSON.parse(data)
          dataJson.timeStamp = moment(parseInt(dataJson.timeStamp)).format("HH:MM:SS")
          console.log(dataJson.timeStamp)
          this.Activities.unshift(dataJson);
          if (count == 100) {
            count = 0
            this.Activities = [];
          }
        })  
      } else {
        this._socket.PoliticalSuject.subscribe((data: any) => {
          count++
          let dataJson = JSON.parse(data)
          dataJson.timeStamp = moment(parseInt(dataJson.timeStamp)).format("HH:MM:SS")
          console.log(dataJson.timeStamp)
          this.Activities.unshift(dataJson);
          if (count == 100) {
            count = 0
            this.Activities = [];
          }
        })

      }
  }

}
