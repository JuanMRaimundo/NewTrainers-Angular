import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Router } from '@angular/router';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss'],
})
export class StudentTableComponent {
  @Input()
  dataSource: Student[] = [];

  @Output()
  deleteStudent = new EventEmitter();
  @Output()
  editStudent = new EventEmitter();

  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];

  userRole$: Observable<'ADMIN' | 'TEACHER' | undefined>;

  constructor(private router: Router, private store: Store) {
    this.userRole$ = this.store
      .select(selectAuthUser)
      .pipe(map((u) => u?.role));
  }

  goToDetailStudent(studentID: number): void {
    this.router.navigate(['dashboard', 'students', 'detail', studentID]);
  }
}
