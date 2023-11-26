import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import { Observable, of, switchMap } from 'rxjs';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  loadingCourses: boolean = true;
  idUnique: number = 0;

  constructor(
    private coursesService: CoursesService,
    private matDialog: MatDialog
  ) {
    this.courses$ = this.coursesService.getCourses$();
    this.courses$.subscribe({
      next: () => {
        this.loadingCourses = false;
      },
    });
  }
  addCourse(): void {
    this.matDialog
      .open(CoursesDialogComponent)
      .afterClosed() //recibo info al cerrar el dialog
      .subscribe({
        //me suscribo para recibir ese resultado y crea o no un curso nuevo
        next: (result: any) => {
          if (result) {
            this.coursesService
              .creatCourse$({
                //si recibo datos se crea y pushea el curso nuevo
                id: this.onIdUnique(),
                name: result.name,
                teacher: result.teacher,
                startDate: result.startDate,
                finishDate: result.finishDate,
              })
              .pipe(switchMap(() => this.coursesService.getCourses$()))
              .subscribe((students) => {
                this.courses$ = of(students);
              });
          }
        },
      });
  }
  onEditCourse(courseID: number): void {
    this.coursesService.getCourseByID$(courseID).subscribe({
      next: (course) => {
        if (course) {
          this.matDialog
            .open(CoursesDialogComponent, {
              data: course,
            })
            .afterClosed()
            .subscribe({
              next: (result) => {
                if (!!result) {
                  this.courses$ = this.coursesService.editCourse$(
                    courseID,
                    result
                  );
                }
              },
            });
        }
      },
    });
  }

  onDeleteCourse(courseID: number): void {
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
        this.courses$ = this.coursesService.deleteCourse$(courseID);
      }
    });
  }
  onIdUnique(): number {
    this.coursesService.gererateUniqueId(this.courses$).subscribe({
      next: (v) => {
        this.idUnique = v;
      },
      complete: () => {},
    });
    return this.idUnique;
  }
}
