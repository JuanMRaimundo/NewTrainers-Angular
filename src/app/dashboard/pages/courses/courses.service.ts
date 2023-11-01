import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from './models';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  courses: Course[] = [
    {
      id: 1,
      name: 'Entrenamiento Intermitente',
      startDate: new Date(),
    },
    {
      id: 2,
      name: 'Fútbol Infantil',
      startDate: new Date(),
    },
    {
      id: 3,
      name: 'Entrenamiento Funcional',
      startDate: new Date(),
    },
  ];

  getCourses$(): Observable<Course[]> {
    return of(this.courses);
  }

  creatCourse$(payload: Course): Observable<Course[]> {
    //observable para recibir el curso nuevo y pushearlo al [] DE CURSOS
    this.courses.push(payload);
    return of([...this.courses]); //creo un nuevo array para que me tome la tabla de A.M.
  }
  deleteCourse$(id: number): Observable<Course[]> {
    this.courses = this.courses.filter((c) => c.id !== id);
    return of(this.courses);
  }
  editCourse$(id: number, payload: Course): Observable<Course[]> {
    return of(
      this.courses.map((c) => (c.id === id ? { ...c, ...payload } : c)) //uso map para crear un nuevo array
    );
  }
  getCourseByID$(id: number): Observable<Course | undefined> {
    return of(this.courses.find((c) => c.id === id));
  }
}
