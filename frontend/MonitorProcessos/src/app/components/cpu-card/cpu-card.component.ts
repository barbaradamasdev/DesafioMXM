import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ProcessInfoData } from '../../models/ProcessInfoData';
import { GoogleChartsModule } from 'angular-google-charts';

declare var google:any;

@Component({
  selector: 'app-cpu-card',
  standalone: true,
  imports: [CommonModule, GoogleChartsModule],
  templateUrl: './cpu-card.component.html',
  styleUrl: './cpu-card.component.css'
})
export class CpuCardComponent implements OnInit  {
  @Input() processos: ProcessInfoData['cpu'] | null = null;
  private dataTable: google.visualization.DataTable | null = null;
  private options: google.visualization.LineChartOptions;

  constructor(){
    this.options = {
      curveType: 'function',
      legend: { position: 'bottom' },
      colors: ['#720cdb'],
    };
  }

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.drawChart();
      setInterval(() => {
        this.updateChart();
      }, 1000);
    });
  }

  drawChart(): void {
    if (this.processos) {
      this.dataTable = new google.visualization.DataTable();
      this.dataTable!.addColumn('string', 'Uso da CPU em %');
      this.dataTable!.addColumn('number', 'Tempo (segundos)');
      this.dataTable!.addRow([this.getCurrentTime(), this.processos.percentUsed]);

      const options = {
        curveType: 'function',
        legend: { position: 'bottom' },
        colors: ['#720cdb'],
        series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'Temps'},
          1: {axis: 'Daylight'}
        },
        axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
            Temps: {label: 'Temps (Celsius)'},
            Daylight: {label: 'Daylight'}
          }
        }
      };

      const chart = new google.visualization.LineChart(document.getElementById('curve-chart'));
      chart.draw(this.dataTable, this.options);
    }
  }

  updateChart(): void {
    if (this.processos && this.dataTable) {
      this.dataTable.addRow([this.getCurrentTime(), this.processos.percentUsed]);
      const chart = new google.visualization.LineChart(document.getElementById('curve-chart'));
      chart.draw(this.dataTable, this.options);
    }
  }

  private getCurrentTime(): string {
    const now = new Date();
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${seconds}`;
  }
}
