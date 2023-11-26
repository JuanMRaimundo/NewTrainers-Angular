import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, of } from 'rxjs';
import { environment } from 'src/environments/environment.local';
import { User } from '../../../users/models';

@Injectable({
  providedIn: 'root',
})
export class CoursesDialogService {
  private teachers: string[] = [];

  constructor(private httpClient: HttpClient) {
    this.loadTeachers();
  }
  getTeachers$(): Observable<string[]> {
    // Devuelve la lista de docentes
    return of(this.teachers);
  }
  private loadTeachers(): void {
    // Realiza la petición al db.json para obtener la lista de docentes
    this.httpClient.get<User[]>(`${environment.baseUrl}/users`).subscribe(
      (users) => {
        // Actualiza la lista de docentes cuando la petición tenga éxito
        this.teachers = users
          .filter((user) => user.role === 'TEACHER')
          .map((teacher) => `${teacher.name} ${teacher.lastName || ''}`);
      },
      (error) => {
        console.error('Error al cargar los docentes', error);
      }
    );
  }
}
