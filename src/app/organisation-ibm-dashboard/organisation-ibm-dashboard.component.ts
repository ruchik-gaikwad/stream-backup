import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ActivityService } from '../service/activity.service';
import { Subject } from 'rxjs';
import * as moment from  'moment';

@Component({
  selector: 'app-organisation-ibm-dashboard',
  templateUrl: './organisation-ibm-dashboard.component.html',
  styleUrls: ['./organisation-ibm-dashboard.component.scss']
})
export class OrganisationIbmDashboardComponent implements OnInit {
  barChartData: any = new Subject();
  pieChartData:any =new Subject();
  multiLineChart: any = new Subject();
  constructor(
    private authenticationService: AuthenticationService,
     private router: Router, private activity: ActivityService) { 

     }

  ngOnInit() {

    this.activity.getActivitiesIBM().subscribe(data => {
      console.log(data)
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
    console.log("SCORES:::", Negative, Positive, VeryNegative, VeryPositive, Neutral)

    this.barChartData.next({
      xAxisData : [VeryNegative, Negative, Neutral, Positive, VeryPositive],
      lables : ["Very Negative", "Negative", "Neutral", "Positive", "Very Positive"],
      ymax: ymax,
      ymin: ymin
    }) 
}
populatePieChartData(data){
  console.log(data)
  let general=0
  let hr=0
  let product=0
  let marketing=0
  let labels=[]
  let plotData=new Array(labels.length)
  data.map(e=>{
    // console.log
    if(labels.indexOf(e.subDomain) ==-1){
      labels.push(e.subDomain);
    }
    if(e.subDomain == "HUMAN RESOURCES"){
      hr++
    }else if(e.subDomain == "Products And Services"){
      product++
    }
    else if(e.subDomain == "Marketing"){
      marketing++
    }else if(e.subDomain == "General"){
      general++
    }    
})
console.log(labels)
console.log(general,hr,product,marketing)
console.log({
  plotData:[hr,product,marketing,general],
  labels : ["Human Resource","Products & Services","Marketing","General"],
  })
this.pieChartData.next({
plotData:[hr,product,marketing,general],
labels : ["Human Resource","Products & Services","Marketing","General"],
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
