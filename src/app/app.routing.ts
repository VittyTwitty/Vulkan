import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeListComponent } from './home-list/home-list.component';
import { HistoryListComponent } from './history-list/history-list.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: HomeListComponent
      },
      {
        path: 'history',
        component: HistoryListComponent
      }
    ]
  }
];
