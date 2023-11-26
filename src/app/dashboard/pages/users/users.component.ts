import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';
import { UsersService } from './user.service';
import { Observable, forkJoin, tap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  idUnique: number = 0;
  loadingUsers: boolean = true;
  users$: Observable<User[]>;
  uniqueToken: string = '';

  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService
  ) {
    this.users$ = this.usersService.getUsers$();
    this.users$.subscribe({
      next: () => {
        this.loadingUsers = false;
      },
    });
  }

  /* addUser(): void {
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
              password: result.password,
              age: result.age,
              role: result.role,
              token: this.onUniqueToken(),
            });
          }
        },
      });
  } */
  addUser(): void {
    forkJoin({
      id: this.usersService.gererateUniqueId(this.users$),
      token: this.usersService.generateUniqueToken(this.users$),
    })
      .pipe(
        tap((result) => {
          this.matDialog
            .open(UsersDialogComponent)
            .afterClosed()
            .subscribe({
              next: (dialogResult: any) => {
                if (dialogResult) {
                  this.users$ = this.usersService.creatUsers$({
                    id: result.id,
                    name: dialogResult.name,
                    lastName: dialogResult.lastName,
                    email: dialogResult.email,
                    password: dialogResult.password,
                    age: dialogResult.age,
                    role: dialogResult.role,
                    token: result.token,
                  });
                }
              },
            });
        })
      )
      .subscribe();
  }
  onEditUser(userId: number): void {
    this.usersService.getUserByID$(userId).subscribe({
      next: (user) => {
        if (user) {
          this.matDialog
            .open(UsersDialogComponent, {
              data: user,
            })
            .afterClosed()
            .subscribe({
              next: (result) => {
                if (!!result) {
                  this.users$ = this.usersService.editUsers$(userId, result);
                }
              },
            });
        }
      },
    });
  }

  onDeleteUser(userId: number): void {
    Swal.fire({
      title: '¿Estás seguro que desea eliminarlo?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        this.users$ = this.usersService.deleteUsers$(userId);
      }
    });
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

  onUniqueToken(): string {
    this.usersService.generateUniqueToken(this.users$).subscribe({
      next: (v) => {
        this.uniqueToken = v;
      },
      complete: () => {},
    });
    return this.uniqueToken;
  }
}
