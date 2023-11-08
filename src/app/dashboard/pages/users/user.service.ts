import { Injectable } from '@angular/core';
import { User } from './models';
import { Observable, map, of } from 'rxjs';
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
    this.users.push(payload);
    return of([...this.users]);
  }
  deleteUsers$(id: number): Observable<User[]> {
    this.users = this.users.filter((c) => c.id !== id);
    return of(this.users);
  }
  editUsers$(id: number, payload: User): Observable<User[]> {
    return of(this.users.map((c) => (c.id === id ? { ...c, ...payload } : c)));
  }
  getUserByID$(id: number): Observable<User | undefined> {
    return of(this.users.find((u) => u.id === id));
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
