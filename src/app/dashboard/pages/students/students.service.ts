import { Injectable } from '@angular/core';
import { Student } from './models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  students: Student[] = [
    {
      id: 684132,
      name: 'Gustavo',
      lastName: 'Rojas',
      email: 'gustavo@alumnos.com',
      age: 18,
    },
    {
      id: 196554,
      name: 'Alfredo',
      lastName: 'Morales',
      email: 'alfredo@alumnos.com',
      age: 19,
    },
    {
      id: 365147,
      name: 'Fernanda',
      lastName: 'Catro',
      email: 'fernanda@alumnos.com',
      age: 19,
    },
  ];

  getStudents$(): Observable<Student[]> {
    return of(this.students);
  }

  creatStudent$(payload: Student): Observable<Student[]> {
    //observable para recibir el curso nuevo y pushearlo al [] DE CURSOS
    this.students.push(payload);
    return of([...this.students]);
  }
  deleteStudent$(id: number): Observable<Student[]> {
    this.students = this.students.filter((s) => s.id !== id);
    return of(this.students);
  }
  editStudent$(id: number, payload: Student): Observable<Student[]> {
    return of(
      this.students.map((s) => (s.id === id ? { ...s, ...payload } : s))
    );
  }
  getStudentByID$(id: number): Observable<Student | undefined> {
    return of(this.students.find((s) => s.id === id));
  }
}
