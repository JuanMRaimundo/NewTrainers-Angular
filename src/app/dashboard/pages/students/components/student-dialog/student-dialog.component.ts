import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';
import { StudentsService } from '../../students.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.scss'],
})
export class StudentDialogComponent {
  nameControl = new FormControl();
  lastNameControl = new FormControl();
  emailControl = new FormControl();
  ageControl = new FormControl();

  studentForm = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    age: this.ageControl,
  });

  constructor(
    private studentsService: StudentsService,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public studentId?: Student
  ) {
    /* this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
    }); */
    if (studentId) {
      console.log(studentId);

      this.studentsService.getStudentByID$(studentId.id).subscribe({
        next: (s) => {
          if (s) {
            console.log(s);

            this.studentForm.patchValue(s);
          }
        },
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      return this.studentForm.markAllAsTouched();
    } else {
      //logica para crear un alumno, se cierra el diálogo, y envío el valor del formulario al StudentDialogComponent, y se envía al servicio de alumnos
      this.matDialogRef.close(this.studentForm.value);
    }
  }
}
