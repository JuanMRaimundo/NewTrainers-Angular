import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './models';
import { StudentsService } from './students.service';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  studentsName = '';
  randomId = Math.floor(Math.random() * 1000000);
  lastId = this.randomId;
  students$: Observable<Student[]> | undefined;

  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsService
  ) {
    this.students$ = this.studentsService.getStudents$();
  }
  addStudent(): void {
    this.matDialog
      .open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result: any) => {
          if (result) {
            this.students$ = this.studentsService.creatStudent$({
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

  onEditStudent(studentID: number): void {
    this.matDialog
      .open(StudentDialogComponent, {
        data: studentID,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.students$ = this.studentsService.editStudent$(studentID, v);
          }
        },
      });
  }

  onDeleteStudent(studentId: number): void {
    this.students$ = this.studentsService.deleteStudent$(studentId);
  }
}
