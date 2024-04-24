import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessListComponent } from "../../components/process-list/process-list.component";
import { SignalRService } from '../../services/signal-r.service';
import { ProcessInfoData } from '../../models/ProcessInfoData';

@Component({
  selector: 'app-page-process',
  standalone: true,
  imports: [CommonModule, ProcessListComponent],
  templateUrl: './page-process.component.html',
  styleUrl: './page-process.component.css'
})
export class PageProcessComponent {
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
