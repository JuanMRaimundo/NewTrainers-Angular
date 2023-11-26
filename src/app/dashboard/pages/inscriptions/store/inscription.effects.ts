import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, delay } from 'rxjs/operators';
import { Observable, forkJoin, of } from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.local';
import { CreateInscriptionPayload, Inscription } from '../models';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';

@Injectable()
export class InscriptionEffects {
  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadInscriptions),
      delay(1500),
      concatMap(() =>
        this.getInscriptions().pipe(
          map((data) => InscriptionActions.loadInscriptionsSuccess({ data })),
          catchError((error) =>
            of(InscriptionActions.loadInscriptionsFailure({ error }))
          )
        )
      )
    );
  });

  loadInscriptionsSelect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadInscriptionDialogSelector),
      concatMap(() =>
        this.getInscriptionOptions().pipe(
          map((data) =>
            InscriptionActions.loadInscriptionDialogSelectorSucces(data)
          ),
          catchError((error) =>
            of(
              InscriptionActions.loadInscriptionDialogSelectorFailure({ error })
            )
          )
        )
      )
    );
  });

  constructor(private actions$: Actions, private httpClient: HttpClient) {}

  getInscriptionOptions(): Observable<{
    courses: Course[];
    students: Student[];
  }> {
    return forkJoin([
      this.httpClient.get<Course[]>(`${environment.baseUrl}/courses`),
      this.httpClient.get<Student[]>(`${environment.baseUrl}/students`),
    ]).pipe(
      map((resp) => {
        return {
          courses: resp[0],
          students: resp[1],
        };
      })
    );
  }
  getInscriptions(): Observable<Inscription[]> {
    return this.httpClient.get<Inscription[]>(
      `${environment.baseUrl}/inscriptions?_expand=course&_expand=student`
    );
  }
  creatInscription(payload: CreateInscriptionPayload): Observable<Inscription> {
    return this.httpClient.post<Inscription>(
      `${environment.baseUrl}/inscriptions`,
      payload
    );
  }
  deleteInscription(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/inscriptions/${id}`);
  }

  creatInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.creatInscription),
      concatMap((action) =>
        this.creatInscription(action.payload).pipe(
          map((data) => InscriptionActions.loadInscriptions()),
          catchError((error) =>
            of(InscriptionActions.creatInscriptionFailure({ error }))
          )
        )
      )
    );
  });

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.deleteInscription),
      switchMap((action) =>
        this.deleteInscription(action.inscriptionID).pipe(
          map(() => InscriptionActions.loadInscriptions()),
          catchError((error) =>
            of(InscriptionActions.deleteInscriptionFailure({ error }))
          )
        )
      )
    );
  });
}
