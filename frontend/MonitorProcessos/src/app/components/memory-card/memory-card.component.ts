import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { ProcessInfoData } from '../../models/ProcessInfoData';
import { ChartModule } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-memory-card',
  standalone: true,
  imports: [CommonModule, ChartModule, HighchartsChartModule],
  templateUrl: './memory-card.component.html',
  styleUrl: './memory-card.component.css'
})
export class MemoryCardComponent {
  @Input() processos: ProcessInfoData['memoria'] | null = null;

  
}

//   // ngOnChanges(changes: import('@angular/core').SimpleChanges) {
//   ngOnChanges(): void {
//     if (this.processos) {
//       this.updateChart();
//     }
//   }


//   Highcharts: typeof Highcharts = Highcharts;
//   updateFlag: boolean = true; // optional boolean
//   oneToOneFlag: boolean = true; // optional boolean, defaults to false
//   chartOptions: Highcharts.Options = {
//     series: [{
//       data: [
//         ['Livre', this.processos?.availableMemoryGB],
//         ['Ocupado', this.processos?.usedMemoryGB]
//       ],
//       type: 'pie'
//     }]
//   };

//   ngOnInit(): void {
//     this.updateChart();
//   }

//   ngAfterViewInit(): void {
//     this.chart = Highcharts.chart(this.elementRef.nativeElement.querySelector('#container'), {
//       title: {
//         text: 'Uso de Memória'
//       },
//       series: [{
//         type: 'pie',
//         data: []
//       }]
//     });
//   }

//   updateChart() {
//     if (!this.processos) {
//       return;
//     }

//     const data = [
//       ['Livre', this.processos?.availableMemoryGB],
//       ['Ocupado', this.processos?.usedMemoryGB]
//     ];

//     this.chart.update({
//       series: [{
//         type: 'column',
//         colorByPoint: true,
//         data: data,
//         showInLegend: false
//       }]
//     });

//     this.chart = Highcharts.chart(this.elementRef.nativeElement.querySelector('#container'), {
//       title: {
//         text: 'Uso de Memória'
//       },
//       series: [{
//         type: 'pie',
//         data: []
//       }]
//     });

//     // console.log('atualizou metodo')
//     // const dataMemory = {
//     //   totalMemoryGB: this.processos?.totalMemoryGB,
//     //   usedMemoryGB: this.processos?.usedMemoryGB,
//     //   availableMemoryGB: this.processos?.availableMemoryGB
//     // };


//   }
// }

// pieChart = new Chart({
  //   chart: {
  //     type: 'pie',
  //     plotShadow: false
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   legend: {
  //     enabled: false
  //   },
  //   series: [{
  //     type: 'pie',
  //     data: [{
  //       name: 'Utilizado',
  //       y: 1,
  //       color: 'var(--clr-medium)'
  //     }, {
  //       name: 'Livre',
  //       y: 1,
  //       color: 'var(--clr-light)'
  //     }]
  //   }]
  // });
