import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CoursesDetailComponent } from './components/courses-detail/courses-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // /courses
        path: '',
        component: CoursesComponent,
      },
      {
        // /courses/:id
        path: ':id',
        component: CoursesDetailComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class CourseRoutingModule {}
