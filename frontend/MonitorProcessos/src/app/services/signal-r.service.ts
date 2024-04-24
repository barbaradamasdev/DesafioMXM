import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!: signalR.HubConnection;

  private processInfoSubject = new Subject<any>();
  private cpuListSubject = new Subject<number[]>();

  processInfo$ = this.processInfoSubject.asObservable();
  cpuList$ = this.cpuListSubject.asObservable();

  constructor() { }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/hub')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Conexão SignalR estabelecida'))
      .catch(err => console.error('Erro ao estabelecer conexão SignalR: ', err));

    this.hubConnection.on('InitialProcessInfo', (cpuList: number[]) => {
      this.cpuListSubject.next(cpuList);
    });

    this.hubConnection.on('ReceiveProcessInfo', (data) => {
      this.processInfoSubject.next(data);
    });
  }
}
