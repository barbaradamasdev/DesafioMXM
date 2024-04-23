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
  memoriaLivrePercent: number = 0;
  memoriaUtilizadaPercent: number = 0;

  constructor(){}

  ngOnInit(): void {
    this.updateChart();
  }

  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart(): void {
    if (this.processos) {
      this.memoriaLivrePercent = (this.processos.availableMemoryGB / this.processos.totalMemoryGB) * 100;
      this.memoriaUtilizadaPercent = (this.processos.usedMemoryGB / this.processos.totalMemoryGB) * 100;

      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(this.drawChart.bind(this));
    }
  }

  drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Livre', this.memoriaLivrePercent],
      ['Utilizada', this.memoriaUtilizadaPercent],
    ]);

    var options = {
      'pieHole':0.4,
      'colors': ['#140431', '#720cdb'],
      'width':600,
      'height':500
    };

    var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));
    chart.draw(data, options);
  }

}
