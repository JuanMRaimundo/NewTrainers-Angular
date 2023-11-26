import { Injectable } from '@angular/core';
import { User } from './models';
import { Observable, concatMap, delay, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}
  users: User[] = [];

  getUsers$(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${environment.baseUrl}/users`)
      .pipe(delay(1000));
  }

  creatUsers$(payload: User): Observable<User[]> {
    return this.httpClient
      .post<User>(`${environment.baseUrl}/users`, payload)
      .pipe(concatMap(() => this.getUsers$()));
  }
  deleteUsers$(id: number): Observable<User[]> {
    return this.httpClient
      .delete<User[]>(`${environment.baseUrl}/users/${id}`)
      .pipe(concatMap(() => this.getUsers$()));
  }
  editUsers$(id: number, payload: User): Observable<User[]> {
    return this.httpClient
      .put<User>(`${environment.baseUrl}/users/${id}`, payload)
      .pipe(concatMap(() => this.getUsers$()));
  }

  getUserByID$(id: number): Observable<User | undefined> {
    return this.getUsers$().pipe(
      map((users) => users.find((u) => u.id === id))
    );
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
  generateUniqueToken(data$: Observable<User[]>): Observable<string> {
    return data$.pipe(
      map((objects) => {
        let randomToken: string;
        do {
          randomToken = (Math.floor(Math.random() * 9000) + 1000).toString(); // Número aleatorio entre 1000 y 9999
        } while (objects.some((obj) => obj.token == randomToken));

        return randomToken;
      })
    );
  }
}
