import { Injectable } from '@angular/core';
import { Student } from './models';
import { Observable, concatMap, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private httpClient: HttpClient) {}
  students: Student[] = [];

  getStudents$(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${environment.baseUrl}/students`);
  }

  creatStudent$(payload: Student): Observable<Student[]> {
    return this.httpClient
      .post<Student>(`${environment.baseUrl}/users`, payload)
      .pipe(concatMap(() => this.getStudents$()));
  }
  deleteStudent$(id: number): Observable<Student[]> {
    this.students = this.students.filter((s) => s.id !== id);
    return of(this.students);
  }
  editStudent$(id: number, payload: Student): Observable<Student[]> {
    return this.httpClient
      .put<Student>(`${environment.baseUrl}/users/${id}`, payload)
      .pipe(concatMap(() => this.getStudents$()));
  }
  getStudentByID$(id: number | null): Observable<Student | undefined> {
    return of(this.students.find((s) => s.id === id));
  }
  gererateUniqueId(data$: Observable<Student[]>): Observable<number> {
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
