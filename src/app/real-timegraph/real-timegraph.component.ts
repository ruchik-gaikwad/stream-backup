import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Chart from 'chart.js';
import { WebsocketService } from 'src/app/service/websocket.service';
import  * as moment from 'moment';
import * as Collections from 'typescript-collections';
import 'chartjs-plugin-streaming';


@Component({
    selector: 'app-real-timegraph',
    templateUrl: './real-timegraph.component.html',
    styleUrls: ['./real-timegraph.component.scss']
})
export class RealTimegraphComponent implements OnInit, AfterViewInit {
    @ViewChild('realTimeLineChart', { static: false })
    canvas: ElementRef

    myChart

    domainsQueue: Collections.Queue<number> = new Collections.Queue;
    
    constructor(private socket: WebsocketService) { }

    ngOnInit() {
        console.log(this.canvas)
    }

    ngAfterViewInit() {
        // this.socket.initializeWebSocketConnection();
        this.socket.PoliticalSuject.subscribe((data: any) => {
            console.log(data, "????????")
            data = JSON.parse(data)
            console.log(sentimentScore)
            let score = parseInt(data.sentimentResult.sentimentScore)
            this.domainsQueue.enqueue(score);
 
        })
            let sentimentScore = []
            let labels = []
            
            let plot = {
                type: 'line',
                data: {
                  // labels: ["", "", "", "", "", "", "", "", ""],
                  datasets: [
                    {
                      label: 'Sentiment/minute',
                      data: [],
                      fill: true,
                      lineTension: 0.1,
                      borderColor: 'red',
                      borderWidth: 1
                    }
                  ]
                },
                options: {
                  title: {
                    text: 'Line Chart',
                    fontFamily: "Montserrat",
                    display: true,
                    fontSize: 24
                  },
                  scales: {
                    xAxes: [
                      {
                        type: 'realtime',
                        realtime: {
                          duration: 20000,
                          refresh: 1000,
                          delay: 2000,
                          // pause: true,
                          onRefresh: chart => {
                            let y1 = this.domainsQueue.dequeue();
                            console.log(y1, '<< Y');
                            if (y1) {
                              chart.data.datasets.forEach(function (dataset) {
                                dataset.data.push({
                                  x: Date.now(),
                                  y: y1
                                });
                              });
                            }
                          }
                        }
                      }
                    ],
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                          max: 4,
                          stepSize: 1
                        }
                      }
                    ]
                  }
                }
              };
              this.myChart = new Chart(this.canvas.nativeElement, plot);
            
            
            
            
            // let plot = {
            //     type: 'line',
            //     data: {
            //         datasets: [{
            //             label: 'Number of Tweets',
            //             data: [],
            //             fill: false,
            //             borderColor: 'rgb(0,0,255)',
            //             backgroundColor: "white"
            //         }],
            //         labels: []
            //     },
            //     options: {
            //         elements: {
            //             line: {
            //                 tension: 0 // disables bezier curves
            //             }
            //         },
            //         legend:{
            //             display:false
            //         },
            //         scales: {
            //             yAxes: [{
            //                 ticks: {
            //                     suggestedMin: 0,
            //                     suggestedMax: 6
            //                 }
            //             }]
            //         }
            //     }
            // }
            // this.myChart = new Chart(this.canvas.nativeElement, plot);


    }

    //   

}

// import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import * as Chart from 'chart.js';

// @Component({
//   selector: 'app-real-timegraph',
//   templateUrl: './real-timegraph.component.html',
//   styleUrls: ['./real-timegraph.component.scss']
// })
// export class RealTimegraphComponent implements OnInit, AfterViewInit {
//   @ViewChild('realTimeLineChart', {static: false})
//   canvas : ElementRef
//   myChart
//   constructor() { }

//   ngOnInit() {
//     console.log(this.canvas)
//   }

//   ngAfterViewInit() {
//     console.log(this.canvas)

//     this.myChart = new Chart(this.canvas.nativeElement, {
//         type: 'line',
//         data: {
//             datasets: [{
//                 label: 'Number of Tweets',
//                 data: [0, 20, 40, 50,100,450,200],
//                 fill:false,
//                 borderColor:'rgb(0,0,255)',
//                 backgroundColor:"white"
//             }],
//             labels: ['7.0 AM', '8.0 AM', '9.0 AM', '10.0 AM','11.0 AM','12.0 AM','1.0 PM']
//         },
//         options: {
//             legend:{
//                 display:false
//             },
//             elements: {
//                 line: {
//                     tension: 0 // disables bezier curves
//                 }
//             },
//             scales: {
//                 xAxes:[
//                     {
//                         gridLines:{
//                             display:false
//                         }
//                     }
//                 ],
//                 yAxes: [{
//                     ticks: {
//                         suggestedMin: 50,
//                         suggestedMax: 100
//                     }
//                 }]
//             }
//         }
//     });
//   }

// //   

// }
