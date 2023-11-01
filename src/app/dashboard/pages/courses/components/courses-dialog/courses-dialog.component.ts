import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss'],
})
export class CoursesDialogComponent {
  nameControl = new FormControl();
  startDateControl = new FormControl();
  finishDateControl = new FormControl();

  courseForm = new FormGroup({
    name: this.nameControl,
    startDate: this.startDateControl,
    finishDate: this.finishDateControl,
  });
  constructor(
    private matDialogREef: MatDialogRef<CoursesDialogComponent>,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA) public courseID?: number
  ) {
    console.log('courseID:', courseID);
    if (courseID) {
      this.coursesService.getCourseByID$(courseID).subscribe({
        next: (c) => {
          console.log('course data:', c);
          if (c) {
            this.courseForm.patchValue(c); //parcheo para ver los datos del curso a editar en el dialog
          }
        },
      });
    }
  } //referencia al diálogo

  onSubmit(): void {
    if (this.courseForm.invalid) {
      return this.courseForm.markAllAsTouched();
    } else {
      //logica para crear un curso, se cierra el diálogo, y envío el valor del formulario al CourseDialogComponent, y se envía al servicio de cursos
      this.matDialogREef.close(this.courseForm.value);
    }
  }
}
