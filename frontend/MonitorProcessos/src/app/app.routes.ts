import { Routes } from '@angular/router';
import { CardComponent } from './components/card/card.component';

export const routes: Routes = [
  {path: '', redirectTo: 'card', pathMatch: 'full'},
  {path: 'card', component: CardComponent},
];
