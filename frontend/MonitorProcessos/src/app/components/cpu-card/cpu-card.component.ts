import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { ProcessInfoData } from '../../models/ProcessInfoData';
import { ChartModule } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-cpu-card',
  standalone: true,
  imports: [CommonModule, ChartModule, HighchartsChartModule],
  templateUrl: './cpu-card.component.html',
  styleUrl: './cpu-card.component.css'
})
export class CpuCardComponent {
  @Input() processos: ProcessInfoData['cpu'] | null = null;



  // lineChart=new Chart({
  //   chart: {
  //     type: 'line'
  //   },
  //   title: {
  //     text: 'CPU'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   series: [
  //     {
  //       name: 'Tempo',
  //       data: [5, 7, 1, 15, 32, 10, 14]
  //     } as any
  //   ]

  // })
}
