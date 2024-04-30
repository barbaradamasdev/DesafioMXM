import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ProcessInfoData } from '../../models/ProcessInfoData';
import { GoogleChartsModule } from 'angular-google-charts';

declare var google:any;

@Component({
  selector: 'app-memory-card',
  standalone: true,
  imports: [CommonModule, GoogleChartsModule],
  templateUrl: './memory-card.component.html',
  styleUrl: './memory-card.component.css'
})
export class MemoryCardComponent implements OnInit, OnChanges  {
  @Input() processos: ProcessInfoData['memoria'] | null = null;
  memoriaLivrePorcentagem: number = 0;
  memoriaUtilizadaPorcentagem: number = 0;

  constructor(){}

  ngOnInit(): void {
    this.updateChart();
  }

  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart(): void {
    if (this.processos) {
      this.memoriaLivrePorcentagem = (this.processos.memoriaDisponivel / this.processos.memoriaTotal) * 100;
      this.memoriaUtilizadaPorcentagem = (this.processos.memoriaUtilizada / this.processos.memoriaTotal) * 100;

      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(this.drawChart.bind(this));
    }
  }

  drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Livre', this.memoriaLivrePorcentagem],
      ['Ocupada', this.memoriaUtilizadaPorcentagem],
    ]);

    var options = {
      'pieHole':0.3,
      'colors': ['green', '#ca2d2d'],
    };

    var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));
    chart.draw(data, options);
  }

}
