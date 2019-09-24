import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ActivityService } from '../service/activity.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-political-nda-dash-board',
  templateUrl: './political-nda-dash-board.component.html',
  styleUrls: ['./political-nda-dash-board.component.scss']
})
export class PoliticalNDADashBoardComponent implements OnInit {
  barChartData: any = new Subject();
  pieChartData:any = new Subject();
  liveFeed: any = new Subject();
  multiLineChart: any = new Subject();

  constructor(private authenticationService: AuthenticationService, private router: Router, private activity: ActivityService) {

  }

  ngOnInit() {

    this.activity.getActivities().subscribe(data => {
      console.log(data, "asdasdasdadsasdadsas")
      this.populateBarChartData(data)
      this.populatePieChartData(data)
      this.populateMultiLineChart(data);

    })

    

  }
  populateBarChartData(data){
    let ymax = data.length
    let ymin = 0
    let ystepSize = data.length / (data.length/2)
    let responsive = true
    let lables = []
    let xAxisData = new Array(lables.length);
    let Negative = 0
    let Positive = 0
    let Neutral = 0
    let VeryNegative = 0
    let VeryPositive = 0

    data.map(e => {
      if(lables.indexOf(e.sentimentResult.sentimentType) == -1){
        lables.push(e.sentimentResult.sentimentType);
      }
      if(e.sentimentResult.sentimentType == ("Very Negative" || "very negative")) {
        VeryNegative++
      }  else if (e.sentimentResult.sentimentType == ("Negative" || "negative")) {
        Negative++
      }else if (e.sentimentResult.sentimentType == ("Neutral" || "neutral")){
        Neutral++
      }else if(e.sentimentResult.sentimentType == ("Positive" || "positive")){
        Positive++
      }else if (e.sentimentResult.sentimentType == ("Very Postivive" || "very positive")){
        VeryPositive++
      }
    })
    console.log(lables)
   // lables = lables.sort();

    console.log(lables.sort())
    console.log("SCORES:::", Negative, Positive, VeryNegative, VeryPositive, Neutral)

    this.barChartData.next({
      xAxisData : [VeryNegative, Negative, Neutral, Positive, VeryPositive],
      lables : ["Very Negative", "Negative", "Neutral", "Positive", "Very Positive"],
      ymax: ymax,
      ymin: ymin
    }) 
}
  populatePieChartData(data){
    console.log(data," ??????????????????")
    let general=0
    let health=0
    let finance=0
    let foreign=0
    let labels=[]
    let plotData=new Array(labels.length)
    data.map(e=>{
      if(labels.indexOf(e.subDomain) ==-1){
        labels.push(e.subDomain);
      }
      if(e.subDomain == "Political General"){
        general++
      }else if(e.subDomain == "health"){
        health++
      }
      else if(e.subDomain == "finance"){
        finance++
      }else if(e.subDomain == "foreign"){
        foreign++
      }    
  })
  console.log(labels)
  console.log(general,health,finance,foreign, "askdnakjsldkjalksdj@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")

this.pieChartData.next({
  plotData:[health,finance,foreign,general],
  //labels : labels,
  labels: ["health","finance","foreign","general"]
}) 
  }

  populateMultiLineChart(data) {
    data = data.splice(0, 100)
    let dataSet = {
      positive: [],
      negative: [],
      neutral: []
    }
    let currentTime = 0;
    let positive = {
      currentTime: 0,
      score: 0
    }
    let neutral = {
      currentTime: 0,
      score: 0
    }
    let negative = {
      currentTime: 0,
      score: 0
    }
    data.map(e => {
      // JSON.parse(e);
      let duration = moment.duration(parseInt(e.timeStamp));
      // console.log(Math.floor(duration.asHours()))
      console.log(currentTime == Math.floor(duration.asHours()))
      let time = Math.floor(duration.asHours())
      console.log(currentTime, time)
      if (currentTime == time) {
        if (e.sentimentResult.sentimentType == "Positive") {
          positive.currentTime = Math.floor(duration.asHours());
          positive.score = positive.score + parseInt(e.sentimentResult.sentimentScore)
        }
        if (e.sentimentResult.sentimentType == "Neutral") {
          neutral.currentTime = Math.floor(duration.asHours());
          neutral.score = neutral.score + parseInt(e.sentimentResult.sentimentScore)
        }
        if(e.sentimentResult.sentimentType == "Negative") {
          negative.currentTime = Math.floor(duration.asHours());
          
          negative.score = negative.score + parseInt(e.sentimentResult.sentimentScore)
          // console.log(negative.score, "HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          
        }
    
      }
      
      if (currentTime !== time){
        console.log(positive, negative, neutral)
        currentTime = Math.floor(duration.asHours());
        dataSet.positive.push(positive);
        dataSet.negative.push(negative);
        dataSet.neutral.push(neutral);
        console.log("ELSE::::::::::::", negative)

      }
      
    })
    this.multiLineChart.next(dataSet);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}
