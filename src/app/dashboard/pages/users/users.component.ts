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
  idUnique: number = 0;

  users$: Observable<User[]>;

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
              id: this.onIdUnique(),
              name: result.name,
              lastName: result.lastName,
              email: result.email,
              age: result.age,
              role: result.role,
              token: '', //ARREGLAR PARA RECIBIR TOKEN
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

  onIdUnique(): number {
    this.usersService.gererateUniqueId(this.users$).subscribe({
      next: (v) => {
        this.idUnique = v;
      },
      complete: () => {},
    });
    return this.idUnique;
  }
}
