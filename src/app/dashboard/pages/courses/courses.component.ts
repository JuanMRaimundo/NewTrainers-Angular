import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import { Observable } from 'rxjs';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]> | undefined;

  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog
  ) {
    this.courses$ = this.coursesService.getCourses$();
  }

  addCourse(): void {
    this.matDialog
      .open(CoursesDialogComponent)
      .afterClosed() //recibo info al cerrar el dialog
      .subscribe({
        //me suscribo para recibir ese resultado y crea o no un curso nuevo
        next: (result: any) => {
          if (result) {
            this.courses$ = this.coursesService.creatCourse$({
              //si recibo datos se crea y pushea el curso nuevo
              id: 0,
              name: result.name,
              startDate: result.startDate,
              finishDate: result.finishDate,
            });
          }
        },
      });
  }
  onEditCourse(courseID: number): void {
    this.matDialog
      .open(CoursesDialogComponent, {
        data: courseID,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.courses$ = this.coursesService.editCourse$(courseID, result);
          }
        },
      });
  }
  onDeleteCourse(courseID: number): void {
    this.courses$ = this.coursesService.deleteCourse$(courseID);
  }
}
