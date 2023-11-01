import { Injectable } from '@angular/core';
import { User } from './models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: User[] = [
    {
      id: 125937,
      name: 'Pedro',
      lastName: 'Farías',
      email: 'pedro@usuario.com',
      age: 33,
    },
    {
      id: 135431,
      name: 'Fernando',
      lastName: 'Vieites',
      email: 'fernando@usuario.com',
      age: 40,
    },
    {
      id: 184553,
      name: 'María',
      lastName: 'López',
      email: 'maría@usuario.com',
      age: 35,
    },
  ];

  getUsers$(): Observable<User[]> {
    return of(this.users);
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
}
