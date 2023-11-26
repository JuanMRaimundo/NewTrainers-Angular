import { Component } from '@angular/core';
import { InscriptionActions } from '../../store/inscription.actions';
import { Store } from '@ngrx/store';
import {
  selectCoursesSelector,
  selectIsLoadingDialogSelector,
  selectStudentsSelector,
} from '../../store/inscription.selectors';
import { Observable, take } from 'rxjs';
import { Course } from '../../../courses/models';
import { Student } from '../../../students/models';
import { FormControl, FormGroup } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscription-dialog',
  templateUrl: './inscription-dialog.component.html',
  styleUrls: ['./inscription-dialog.component.scss'],
})
export class InscriptionDialogComponent {
  studentIdControl = new FormControl<number | null>(null);
  courseIdControl = new FormControl<number | null>(null);

  inscriptionForm = new FormGroup({
    courseId: this.courseIdControl,
    studentId: this.studentIdControl,
  });

  courseSelector$: Observable<Course[]>;
  studentSelector$: Observable<Student[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store,
    private action$: Actions,
    private matDialogRef: MatDialogRef<InscriptionDialogComponent>
  ) {
    this.store.dispatch(InscriptionActions.loadInscriptionDialogSelector());
    this.isLoading$ = this.store.select(selectIsLoadingDialogSelector);
    this.courseSelector$ = this.store.select(selectCoursesSelector);
    this.studentSelector$ = this.store.select(selectStudentsSelector);
    this.action$
      .pipe(ofType(InscriptionActions.loadInscriptions), take(1))
      .subscribe({
        next: () => this.matDialogRef.close(),
      });
  }
  onSubmit(): void {
    this.store.dispatch(
      InscriptionActions.creatInscription({
        payload: this.inscriptionForm.getRawValue(),
      })
    );
  }
}
