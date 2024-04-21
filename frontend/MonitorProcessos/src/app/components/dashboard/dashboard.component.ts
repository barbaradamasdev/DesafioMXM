import { Component } from '@angular/core';
import { ProcessInfoData } from '../../models/ProcessInfoData';
import { SignalRService } from '../../services/signal-r.service';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
import { ProcessListComponent } from "../process-list/process-list.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CommonModule, ChartModule, ProcessListComponent]
})
export class DashboardComponent {
  dataUpdate: ProcessInfoData | null = null;

  constructor(private signalRService: SignalRService) { }

  lineChart=new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'CPU'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Tempo',
        data: [5, 7, 1, 15, 32, 10, 14]
      } as any
    ]

  })

  pieChart=new Chart({
    chart: {
      type: 'pie',
      plotShadow: false,
    },

    credits: {
      enabled: false,
    },

    plotOptions: {
      pie: {
        innerSize: '99%',
        borderWidth: 10,
        borderColor: '',
        slicedOffset: 10,
        dataLabels: {
          connectorWidth: 0,
        },
      },
    },

    title: {
      verticalAlign: 'middle',
      floating: true,
      text: 'Memória',
    },

    legend: {
      enabled: false,
    },

    series: [
      {
        type: 'pie',
        data: [
          { name: 'Utilizado', y: 1, color: 'var(--clr-medium)' },
          { name: 'Livre', y: 2, color: 'var(--clr-light)' },
        ],
      },
    ],
  })

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.processInfo$.subscribe(data => {
      this.dataUpdate = data;
      console.log("Data:", this.dataUpdate);

      //quero atualizar aqui
      const totalGB = this.dataUpdate?.memoria.totalMemoryGB || 0;
      const usadoGB = this.dataUpdate?.memoria.committedMemoryGB || 0;
      const livreGB = this.dataUpdate?.memoria.availableMemoryGB || 0;
      const livre = totalGB - usadoGB;
      const percentUsado = (usadoGB / totalGB) * 100;
      const percentUsadoDoBack = this.dataUpdate?.memoria.memoryUsagePercent;
      const percentLivre = 100 - percentUsado;

      console.log('total ' + totalGB)
      console.log('usado ' + usadoGB)
      console.log('livre ' + livreGB)
      console.log('livre ' + livre)
      console.log(percentUsado + '% - calculado aqui')
      console.log(percentUsadoDoBack + '% - do back')
      console.log(percentLivre + '%')

      // Criar a nova série de dados com as porcentagens
      // const novaSerie = [
      //   { name: 'Utilizado', y: percentUsado, color: 'var(--clr-medium)' },
      //   { name: 'Livre', y: percentLivre, color: 'var(--clr-light)' },
      // ];

      // if (this.pieChart) {
      //   const chart = this.pieChart as any;
      //   chart.update({
      //     series: [{
      //       data: [
      //         { name: 'Utilizado', y: percentUsado, color: 'var(--clr-medium)' },
      //         { name: 'Livre', y: percentLivre, color: 'var(--clr-light)' },
      //       ],
      //     }]
      //   }, false);
      // }

    }, error => {
      console.error('Erro ao receber dados do SignalR: ', error);
    });
  }


}
