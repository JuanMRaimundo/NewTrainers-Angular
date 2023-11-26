import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './models';
import { StudentsService } from './students.service';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { Observable, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  studentsName = '';
  idUnique = 0;
  loadingStudents: boolean = true;
  students$: Observable<Student[]>;

  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsService
  ) {
    this.students$ = this.studentsService.getStudents$();
    this.students$.subscribe({
      next: () => {
        this.loadingStudents = false;
      },
    });
  }
  addStudent(): void {
    this.matDialog
      .open(StudentDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result: any) => {
          if (result) {
            this.studentsService
              .creatStudent$({
                id: this.onIdUnique(),
                name: result.name,
                lastName: result.lastName,
                email: result.email,
                age: result.age,
              })
              .pipe(switchMap(() => this.studentsService.getStudents$()))
              .subscribe((students) => {
                this.students$ = of(students);
              });
          }
        },
      });
  }

  onEditStudent(student: Student): void {
    this.matDialog
      .open(StudentDialogComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (v) => {
          if (!!v) {
            this.students$ = this.studentsService.editStudent$(student.id, v);
          }
        },
      });
  }

  onDeleteStudent(studentId: number): void {
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
        this.students$ = this.studentsService.deleteStudent$(studentId);
      }
    });
  }
  onIdUnique(): void {
    this.studentsService.gererateUniqueId(this.students$).subscribe((v) => {
      this.idUnique = v;
    });
  }
}
