import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  userName = '';
  randomId = Math.floor(Math.random() * 1000000);
  lastId = this.randomId;
  users: User[] = [
    {
      id: 125937,
      name: 'Pedro',
      lastName: 'Farías',
      email: 'pedro@alumnos.com',
      age: 18,
    },
    {
      id: 135431,
      name: 'Fernando',
      lastName: 'Vieites',
      email: 'fernando@alumnos.com',
      age: 19,
    },
    {
      id: 184553,
      name: 'María',
      lastName: 'López',
      email: 'maría@alumnos.com',
      age: 19,
    },
  ];
  constructor(private matDialog: MatDialog) {}
  openUserDialog(): void {
    this.matDialog
      .open(UsersDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          console.log('valor', v);

          if (!!v) {
            this.lastId++;
            this.users = [
              ...this.users,
              {
                ...v,
                id: this.lastId,
              },
            ];
          }
        },
      });
  }

  onEditUser(eUser: User): void {
    this.matDialog
      .open(UsersDialogComponent, {
        data: eUser,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.users = this.users.map((u) =>
              u.id === eUser.id ? { ...u, ...v } : u
            );
          }
        },
      });
  }

  onDeleteUser(userId: number): void {
    this.users = this.users.filter((u) => u.id !== userId);
  }
}
