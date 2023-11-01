import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';
import { UsersService } from './user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  userName = '';
  randomId = Math.floor(Math.random() * 1000000);
  lastId = this.randomId; // ARREGLAR PARA RECIBIR ID ALEATORIO
  users$: Observable<User[]> | undefined;

  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService
  ) {
    this.users$ = this.usersService.getUsers$();
  }
  addUser(): void {
    this.matDialog
      .open(UsersDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result: any) => {
          if (result) {
            this.users$ = this.usersService.creatUsers$({
              id: 0, // ARREGLAR PARA RECIBIR ID ALEATORIO
              name: result.name,
              lastName: result.lastName,
              email: result.email,
              age: result.age,
            });
          }
        },
      });
  }

  onEditUser(userID: number): void {
    this.matDialog
      .open(UsersDialogComponent, {
        data: userID,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.users$ = this.usersService.editUsers$(userID, result);
          }
        },
      });
  }

  onDeleteUser(userId: number): void {
    this.users$ = this.usersService.deleteUsers$(userId);
  }
}
