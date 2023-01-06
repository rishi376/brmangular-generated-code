import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { customerServiceRoutes } from './customer-service.routing';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProfileSearchModule } from './profile/search/search.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterModule.forChild(customerServiceRoutes), CommonModule, MatCardModule, SharedModule, DashboardModule, ProfileSearchModule]
})
export class CustomerServiceModule {}
