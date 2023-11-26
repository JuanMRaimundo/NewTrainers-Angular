import { ActionReducerMap } from '@ngrx/store';
import {
  State as authState,
  authFeatureKey,
  reducer as authReducer,
} from './auth/auth.reducer';

export interface AppState {
  [authFeatureKey]: authState;
}

export const appReducer: ActionReducerMap<any> = {
  [authFeatureKey]: authReducer,
};
