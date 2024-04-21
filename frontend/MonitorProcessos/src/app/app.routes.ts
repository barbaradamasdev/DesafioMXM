import { Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'card', component: CardComponent},
  {path: 'dashboard', component: DashboardComponent},
];
