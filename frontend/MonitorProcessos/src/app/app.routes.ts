import { Routes } from '@angular/router';
import { PageProcessComponent } from './pages/page-process/page-process.component';
import { PageChartsComponent } from './pages/page-charts/page-charts.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'graficos', component: PageChartsComponent},
  {path: 'processos', component: PageProcessComponent},
];
