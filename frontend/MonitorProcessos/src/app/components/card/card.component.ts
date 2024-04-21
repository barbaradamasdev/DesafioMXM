import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../services/signal-r.service';
import { CommonModule } from '@angular/common';
import { ProcessInfoData } from '../../models/ProcessInfoData';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

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
