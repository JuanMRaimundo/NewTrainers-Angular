import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../users/models';
import { Course } from '../courses/models';
import { Student } from '../students/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}
  users: User[] = [];
  courses: Course[] = [];
  students: Student[] = [];

  getUsers$(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/users`);
  }
  getCourses$(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/courses`);
  }
  getStudents$(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/students`);
  }
}
