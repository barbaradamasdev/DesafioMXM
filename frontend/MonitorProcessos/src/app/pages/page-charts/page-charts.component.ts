import { Component } from '@angular/core';
import { ProcessInfoData } from '../../models/ProcessInfoData';
import { SignalRService } from '../../services/signal-r.service';
import { CommonModule } from '@angular/common';
import { MemoryCardComponent } from "../../components/memory-card/memory-card.component";
import { CpuCardComponent } from "../../components/cpu-card/cpu-card.component";
import { DiskCardComponent } from "../../components/disk-card/disk-card.component";

@Component({
  selector: 'app-page-charts',
  standalone: true,
  imports: [CommonModule, MemoryCardComponent, CpuCardComponent, DiskCardComponent],
  templateUrl: './page-charts.component.html',
  styleUrl: './page-charts.component.css'
})
export class PageChartsComponent {
  dataUpdate: ProcessInfoData | null = null;

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.processInfo$.subscribe(data => {
      this.dataUpdate = data;
    }, error => {
      console.error('Erro ao receber dados do SignalR: ', error);
    });
  }
}
