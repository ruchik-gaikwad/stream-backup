import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from '../service/websocket.service';
import * as moment from 'moment';

@Component({
  selector: 'app-live-feed',
  templateUrl: './live-feed.component.html',
  styleUrls: ['./live-feed.component.scss']
})
export class LiveFeedComponent implements OnInit {

  @Input()
  activity;
  
  Activities = [];

  constructor(private _socket:WebsocketService) { }

  ngOnInit() {
      let count = 0;
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
