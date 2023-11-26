import { Injectable } from '@angular/core';
import { Student } from './models';
import { Observable, catchError, concatMap, delay, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private httpClient: HttpClient) {}
  students: Student[] = [];

  getStudents$(): Observable<Student[]> {
    return this.httpClient
      .get<Student[]>(`${environment.baseUrl}/students`)
      .pipe(delay(1000));
  }

  creatStudent$(payload: Student): Observable<Student[]> {
    return this.httpClient
      .post<Student>(`${environment.baseUrl}/students`, payload)
      .pipe(concatMap(() => this.getStudents$()));
  }
  deleteStudent$(id: number): Observable<Student[]> {
    return this.httpClient
      .delete(`${environment.baseUrl}/students/${id}`)
      .pipe(concatMap(() => this.getStudents$()));
  }
  editStudent$(id: number, payload: Student): Observable<Student[]> {
    return this.httpClient
      .put<Student>(`${environment.baseUrl}/students/${id}`, payload)
      .pipe(concatMap(() => this.getStudents$()));
  }
  getStudentByID$(id: number): Observable<Student | undefined> {
    return this.getStudents$().pipe(
      map((students) => students.find((s) => s.id === id)),
      catchError((error) => {
        console.error('Error al obtener estudiante por ID:', error);
        return of(undefined);
      })
    );
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
