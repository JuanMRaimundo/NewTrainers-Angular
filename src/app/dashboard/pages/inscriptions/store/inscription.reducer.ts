import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionActions } from './inscription.actions';
import { Inscription } from '../models';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';

export const inscriptionFeatureKey = 'inscription';

export interface State {
  isLoading: boolean;
  isLoadingDialog: boolean;
  studentSelector: Student[];
  courseSelector: Course[];
  inscription: Inscription[];
  error: unknown;
}

export const initialState: State = {
  isLoading: false,
  isLoadingDialog: false,
  studentSelector: [],
  courseSelector: [],
  inscription: [],
  error: null,
};

export const reducer = createReducer(
  initialState,

  // for InscriptionComponent
  on(InscriptionActions.loadInscriptions, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(InscriptionActions.loadInscriptionsSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    inscription: data,
  })),
  on(InscriptionActions.loadInscriptionsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // for InscriptionDialogComponent
  on(InscriptionActions.loadInscriptionDialogSelector, (state) => ({
    ...state,
    isLoadingDialog: true,
  })),
  on(
    InscriptionActions.loadInscriptionDialogSelectorSucces,
    (state, action) => ({
      ...state,
      studentSelector: action.students,
      courseSelector: action.courses,
      isLoadingDialog: false,
    })
  ),
  on(
    InscriptionActions.loadInscriptionDialogSelectorFailure,
    (state, action) => ({
      ...state,
      error: action.error,
      isLoadingDialog: false,
    })
  ),
  // for InscriptionTableComponent
  on(InscriptionActions.deleteInscription, (state, action) => {
    const updatedInscriptions = state.inscription.filter(
      (inscription) => inscription.id !== action.inscriptionID
    );
    return {
      ...state,
      inscriptions: updatedInscriptions,
      isLoading: false,
    };
  })
);

export const inscriptionFeature = createFeature({
  name: inscriptionFeatureKey,
  reducer,
});
