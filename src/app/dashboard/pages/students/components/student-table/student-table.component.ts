import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}
  goToDetailStudent(studentID: number): void {
    this.router.navigate(['dashboard', 'student', 'detail', studentID]);
  }
}
