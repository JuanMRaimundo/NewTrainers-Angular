import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscription from './inscription.reducer';

export const selectInscriptionState =
  createFeatureSelector<fromInscription.State>(
    fromInscription.inscriptionFeatureKey
  );

export const selectInscription = createSelector(
  selectInscriptionState,
  (state) => state.inscription
);

export const selectCoursesSelector = createSelector(
  selectInscriptionState,
  (state) => state.courseSelector
);
export const selectStudentsSelector = createSelector(
  selectInscriptionState,
  (state) => state.studentSelector
);
export const selectInscriptionLoading = createSelector(
  selectInscriptionState,
  (state) => state.isLoading
);
export const selectIsLoadingDialogSelector = createSelector(
  selectInscriptionState,
  (state) => state.isLoadingDialog
);
export const selectDeleteInscription = createSelector(
  selectInscriptionState,
  (state) => state.inscription
);
