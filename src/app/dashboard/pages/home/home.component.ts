import { Component, OnInit } from '@angular/core';
import { User } from '../users/models';
import { Course } from '../courses/models';
import { Student } from '../students/models';
import { HomeService } from './home.service';
import { Observable, catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users$: Observable<User[]>;
  courses$: Observable<Course[]>;
  students$: Observable<Student[]>;
  userCount: number = 0;
  studentCount: number = 0;
  courseCount: number = 0;

  constructor(private homeService: HomeService) {
    this.users$ = this.homeService.getUsers$();
    this.courses$ = this.homeService.getCourses$();
    this.students$ = this.homeService.getStudents$();
  }
  ngOnInit() {
    forkJoin([
      this.homeService.getUsers$(),
      this.homeService.getStudents$(),
      this.homeService.getCourses$(),
    ])
      .pipe(
        catchError((error) => {
          console.error('Error en las llamadas HTTP', error);
          return of([]);
        })
      )
      .subscribe(([users, students, courses]) => {
        this.userCount = users.length;
        this.studentCount = students.length;
        this.courseCount = courses.length;
      });
  }
}
