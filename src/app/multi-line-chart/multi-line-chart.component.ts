import { Component, OnInit, Input } from '@angular/core';
import * as Chart from 'chart.js'
@Component({
  selector: 'app-multi-line-chart',
  templateUrl: './multi-line-chart.component.html',
  styleUrls: ['./multi-line-chart.component.scss']
})
export class MultiLineChartComponent implements OnInit {
linechart:any

@Input()
data;
  constructor() { }

  ngOnInit() {
    this.data.subscribe(data => {
      console.log(data , "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")

      let plot = {
        type:'line',
        data:{
        labels: data.negative.map(e => e.currentTime).splice(0, 10),
         datasets:[
               {
                 label:'Negative Tweets',
                 data: data.negative.map(e => e.score).splice(0, 10),
                 backgroundColor:'red',
                 borderColor:'red',
                 fill:false
                } ,
                {
                  label:'Neutral Tweets',
                  data:data.neutral.map(e => e.score).splice(0, 10),
                  backgroundColor:'blue',
                  borderColor:'blue',
                  fill:false
                },
                {
                  label:'Positive Tweets',
                  data:data.positive.map(e => e.score).splice(0, 10),
                  backgroundColor:'green',
                  borderColor:'green',
                  fill:false
                }
            ]
          },
            options : {
              legend: {
                position: 'right' as 'right',
                padding:20,
                fontSize:30 
              }
            }
          }
    
         
      this.linechart=new Chart('multiline', plot)




    })
    
   
  }

}
