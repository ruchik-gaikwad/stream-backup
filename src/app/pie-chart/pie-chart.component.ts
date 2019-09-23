import { Component, OnInit,Input } from '@angular/core';
import * as Chart from 'chart.js';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
   piechart:any
  constructor() { 
    
  }
  @Input()
  data: any
  ngOnInit() {
   
    let inputData={
      labels: [],
      plotData: [],
    }
  this.data.subscribe(data =>{
    inputData=data
    console.log(data)
    let plot={
      type:'pie',
      options:{
        legend:{
          position:'right' as 'right'
        }
      },
          data:{
              labels:inputData.labels,
               datasets:[{
                 data:inputData.plotData,
                 backgroundColor:["red","orange","green","blue"],
               }],
             },
             
  } 
  console.log(inputData.plotData)
  this.piechart = new Chart('pie', plot);
  
  })
  }

  }


