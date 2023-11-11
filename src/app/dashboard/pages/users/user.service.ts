import { Injectable } from '@angular/core';
import { User } from './models';
import { Observable, concatMap, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}
  users: User[] = [];

  getUsers$(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.baseUrl}/users`);
  }

  creatUsers$(payload: User): Observable<User[]> {
    return this.httpClient
      .post<User>(`${environment.baseUrl}/users`, payload)
      .pipe(concatMap(() => this.getUsers$()));
  }
  deleteUsers$(id: number): Observable<User[]> {
    this.users = this.users.filter((c) => c.id !== id);
    return of(this.users);
  }
  editUsers$(id: number, payload: User): Observable<User[]> {
    return this.httpClient
      .put<User>(`${environment.baseUrl}/users/${id}`, payload)
      .pipe(concatMap(() => this.getUsers$()));
  }

  getUserByID$(id: number | null): Observable<User | undefined> {
    if (id === null) {
      console.log('getUserByID$ called with ID:', id);
      return of(undefined);
    }
    return this.httpClient.get<User>(`${environment.baseUrl}/users/${id}`);
  }
  gererateUniqueId(data$: Observable<User[]>): Observable<number> {
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
