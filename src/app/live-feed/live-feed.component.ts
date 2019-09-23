import { Component, OnInit, Input } from '@angular/core';
import { WebsocketService } from '../service/websocket.service';

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
        console.log(dataJson, "########################################")

        this.Activities.unshift(JSON.parse(data));
        if (count == 100) {
          count = 0
          this.Activities = [];
        }
      })
  }

}
