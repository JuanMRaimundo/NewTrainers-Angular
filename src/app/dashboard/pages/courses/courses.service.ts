import { Injectable } from '@angular/core';
import { Observable, concatMap, delay, map } from 'rxjs';
import { Course } from './models';
import { environment } from 'src/environments/environment.local';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  constructor(private httpClient: HttpClient) {}
  courses: Course[] = [];

  getCourses$(): Observable<Course[]> {
    return this.httpClient
      .get<Course[]>(`${environment.baseUrl}/courses`)
      .pipe(delay(1000));
  }

  creatCourse$(payload: Course): Observable<Course[]> {
    return this.httpClient
      .post<Course>(`${environment.baseUrl}/courses`, payload)
      .pipe(concatMap(() => this.getCourses$()));
  }
  deleteCourse$(id: number): Observable<Course[]> {
    return this.httpClient
      .delete<Course[]>(`${environment.baseUrl}/courses/${id}`)
      .pipe(concatMap(() => this.getCourses$()));
  }

  editCourse$(id: number, payload: Course): Observable<Course[]> {
    return this.httpClient
      .put<Course>(`${environment.baseUrl}/courses/${id}`, payload)
      .pipe(concatMap(() => this.getCourses$()));
  }
  getCourseByID$(id: number): Observable<Course | undefined> {
    return this.getCourses$().pipe(
      map((courses) => courses.find((c) => c.id === id))
    );
  }
  gererateUniqueId(data$: Observable<Course[]>): Observable<number> {
    return data$.pipe(
      map((objects) => {
        const maxID = objects.reduce(
          (max, obj) => (obj.id > max ? obj.id : max),
          0
        );
        let newId = maxID + 1;

        while (objects.some((obj) => obj.id === newId)) {
          newId++;
        }
        return newId;
      })
    );
  }
}
