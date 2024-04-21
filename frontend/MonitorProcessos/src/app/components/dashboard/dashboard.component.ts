import { Component } from '@angular/core';
import { ProcessInfoData } from '../../models/ProcessInfoData';
import { SignalRService } from '../../services/signal-r.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  data: ProcessInfoData | null = null;

  constructor(private signalRService: SignalRService) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.signalRService.processInfo$.subscribe(data => {
      this.data = data;
      console.log("Data:", this.data);
    }, error => {
      console.error('Erro ao receber dados do SignalR: ', error);
    });
  }
}
