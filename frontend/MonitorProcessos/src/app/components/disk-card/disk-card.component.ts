import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ProcessInfoData } from '../../models/ProcessInfoData';
import { GoogleChartsModule } from 'angular-google-charts';

declare var google:any;

@Component({
  selector: 'app-disk-card',
  standalone: true,
  imports: [CommonModule, GoogleChartsModule],
  templateUrl: './disk-card.component.html',
  styleUrl: './disk-card.component.css'
})
export class DiskCardComponent implements OnInit, OnChanges  {
  @Input() processos: ProcessInfoData['cpu'] | null = null;
  diskLivrePercent: number = 0;
  diskUtilizadaPercent: number = 0;
  selectedDriveIndex: number  | null = null;

  constructor(){}

  ngOnInit(): void {
    this.selectedDriveIndex = 0;
    this.updateChart();
  }

  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart(): void {
    if (this.processos && this.processos.drives && this.selectedDriveIndex !== null) {
      const drive = this.processos.drives[this.selectedDriveIndex];

      this.diskLivrePercent = (drive.availableFreeSpace / drive.totalSize) * 100;
      this.diskUtilizadaPercent = (drive.usedSpace / drive.totalSize) * 100;

      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(this.drawChart.bind(this));
    }
  }

  drawChart(): void {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Livre', this.diskLivrePercent],
      ['Ocupada', this.diskUtilizadaPercent],
    ]);

    var options = {
      'is3D': true,
      'colors': ['#140431', '#720cdb'],
    };

    var chart = new google.visualization.PieChart(document.getElementById(`disk-chart`));
    chart.draw(data, options);
  }

  selectDrive(index: number): void {
    this.selectedDriveIndex = index;
    this.updateChart();
  }

  getDriveTypeName(driveType: number): string {
    switch (driveType) {
      case 0:
        return 'Unknown';
      case 1:
        return 'NoRootDirectory';
      case 2:
        return 'Removable';
      case 3:
        return 'Fixed';
      case 4:
        return 'Network';
      case 5:
        return 'CD-ROM';
      case 6:
        return 'RAMDisk';
      default:
        return 'Unknown';
    }
  }
}
