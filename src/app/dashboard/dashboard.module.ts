import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsPageModule } from './pages/forms-page/forms-page.module';
import { UsersModule } from './pages/users/users.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    FormsPageModule,
    MatButtonModule,
    UsersModule,
    SharedModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
