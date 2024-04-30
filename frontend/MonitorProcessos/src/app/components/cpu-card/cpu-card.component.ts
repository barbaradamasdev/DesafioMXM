import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  dataTable: google.visualization.DataTable | null = null;
  options: google.visualization.LineChartOptions;

  count : number = -2;

  constructor(){
    this.options = {
      curveType: 'function',
      legend: { position: 'bottom' },
      colors: ['#720cdb'],
      vAxis: {
        title: 'Uso da CPU (%)'
      }
    };
  }

  ngOnInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => {
      this.drawChart();
      setInterval(() => {
        this.updateChart();
      }, 2000);
    });
  }

  drawChart(): void {
    if (this.processos) {
      this.dataTable = new google.visualization.DataTable();
      this.dataTable!.addColumn('string', 'Uso da CPU (%)');
      this.dataTable!.addColumn('number', 'Tempo (seg)');

      if (this.processos.listaCPUemPorcentagem) {
        this.processos.listaCPUemPorcentagem.forEach((counter) => {
          this.dataTable!.addRow([this.getCount(), counter]);
        });
      } else {
        this.dataTable!.addRow([this.getCount(), this.processos.porcentagemUsadaDoCPU]);
      }

      const chart = new google.visualization.LineChart(document.getElementById('curve-chart'));
      chart.draw(this.dataTable, this.options);
    }
  }

  updateChart(): void {
    if (this.processos && this.dataTable) {
      this.dataTable.addRow([this.getCount(), this.processos.porcentagemUsadaDoCPU]);
      const chart = new google.visualization.LineChart(document.getElementById('curve-chart'));
      chart.draw(this.dataTable, this.options);
    }
  }

  private getCount(): string {
    this.count = this.count + 2;
    return `${this.count}`;
  }
}
