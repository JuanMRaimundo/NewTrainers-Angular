import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input()
  dataSource: User[] = [];

  @Output()
  deleteUser = new EventEmitter();
  @Output()
  editUser = new EventEmitter();

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  userRole$: Observable<'ADMIN' | 'TEACHER' | undefined>;

  constructor(private router: Router, private store: Store) {
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map((u) => u?.role));
  }
  goToDetailUser(userID: number): void {
    this.router.navigate(['dashboard', 'users', 'detail', userID]);
  }
}
