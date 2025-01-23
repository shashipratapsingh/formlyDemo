import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectUser = (state: AppState) => state.user;

export const selectUserName = createSelector(selectUser, (user) => user.name);
export const selectUserEmail = createSelector(selectUser, (user) => user.email);
export const selectUserPhone = createSelector(selectUser, (user) => user.phone);
