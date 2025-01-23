import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectSession = (state: AppState) => state.session;

export const selectSessionFromSlot = createSelector(selectSession, (session) => session.fromSlot);
export const selectSessionTillSlot = createSelector(selectSession, (session) => session.tillSlot);
export const selectSessionGuests = createSelector(selectSession, (session) => session.guests);
