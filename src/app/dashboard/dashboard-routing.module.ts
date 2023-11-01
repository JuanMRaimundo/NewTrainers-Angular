import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', // /dashboard,
        component: DashboardComponent,
        children: [
          {
            path: 'home', // /dashboard/home
            component: HomeComponent,
          },

          {
            path: 'courses',
            loadChildren: () =>
              import('./pages/courses/courses.module').then(
                (m) => m.CoursesModule
              ),
          },

          {
            path: 'users',
            loadChildren: () =>
              import('./pages/users/users.module').then((m) => m.UsersModule),
          },
          {
            path: 'students',
            loadChildren: () =>
              import('./pages/students/students.module').then(
                (m) => m.StudentsModule
              ),
          },

          {
            path: '**',
            redirectTo: 'home',
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
