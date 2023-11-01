import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesDetailRoutingModule } from './courses-detail-routing.module';
import { CoursesDetailComponent } from './courses-detail.component';


@NgModule({
  declarations: [
    CoursesDetailComponent
  ],
  imports: [
    CommonModule,
    CoursesDetailRoutingModule
  ]
})
export class CoursesDetailModule { }
