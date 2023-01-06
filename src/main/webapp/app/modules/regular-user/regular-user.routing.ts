import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const regularUserRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent
  }
];
