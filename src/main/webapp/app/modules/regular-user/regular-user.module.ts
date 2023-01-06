import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { regularUserRoutes } from './regular-user.routing';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, RouterModule.forChild(regularUserRoutes), SharedModule]
})
export class RegularUserModule {}
