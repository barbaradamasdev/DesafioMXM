import { Component } from '@angular/core';
import { ProcessInfoData } from '../../models/ProcessInfoData';
import { SignalRService } from '../../services/signal-r.service';
import { CommonModule } from '@angular/common';
import { ProcessListComponent } from "../../components/process-list/process-list.component";
import { MemoryCardComponent } from "../../components/memory-card/memory-card.component";
import { CpuCardComponent } from "../../components/cpu-card/cpu-card.component";
import { DiskCardComponent } from "../../components/disk-card/disk-card.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CommonModule, ProcessListComponent, MemoryCardComponent, CpuCardComponent, DiskCardComponent]
})
export class DashboardComponent {
  dataUpdate: ProcessInfoData | null = null;
  isLoading: boolean = true;

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();

    this.signalRService.processInfo$.subscribe(
      data => {
        this.dataUpdate = data;
        this.isLoading = false;
      },
      error => {
        console.error('Erro ao receber dados do SignalR: ', error);
        this.isLoading = true;
      }
    );

  }
}
