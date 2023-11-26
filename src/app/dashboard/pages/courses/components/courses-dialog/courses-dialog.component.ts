import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models';
import { CoursesDialogService } from './courses-dialog.service';

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss'],
})
export class CoursesDialogComponent {
  nameControl = new FormControl();
  teacherControl = new FormControl();
  startDateControl = new FormControl();
  finishDateControl = new FormControl();

  courseForm = new FormGroup({
    name: this.nameControl,
    teacher: this.teacherControl,
    startDate: this.startDateControl,
    finishDate: this.finishDateControl,
  });

  teachers: string[] = [];

  constructor(
    private matDialogREef: MatDialogRef<CoursesDialogComponent>,
    private coursesDialogService: CoursesDialogService,
    @Inject(MAT_DIALOG_DATA) public course?: Course
  ) {
    if (course) {
      this.courseForm.patchValue(course);
    }
    this.coursesDialogService.getTeachers$().subscribe((teachers) => {
      this.teachers = teachers;
    });
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
