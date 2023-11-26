import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateInscriptionPayload, Inscription } from '../models';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';

export const InscriptionActions = createActionGroup({
  source: 'Inscription',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{ data: Inscription[] }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),
    'Load InscriptionDialog Selector': emptyProps(),
    'Load InscriptionDialog Selector Succes': props<{
      courses: Course[];
      students: Student[];
    }>(),
    'Load InscriptionDialog Selector Failure': props<{ error: unknown }>(),
    'Creat Inscription': props<{ payload: CreateInscriptionPayload }>(),
    'Creat Inscription Failure': props<{ error: unknown }>(),
    'Delete Inscription': props<{ inscriptionID: number }>(),
    'Delete Inscription Failure': props<{ error: unknown }>(),
  },
});
