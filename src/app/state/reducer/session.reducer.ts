import { createReducer, on } from '@ngrx/store';
import { updateSession, resetSession } from '../action/session.actions';
import { SessionState } from '../app.state';

const initialState: SessionState = {
  fromSlot: '',
  tillSlot: '',
  guests: [],
};

export const sessionReducer = createReducer(
  initialState,
  on(updateSession, (state, { fromSlot, tillSlot, guests }) => ({ fromSlot, tillSlot, guests })),
  on(resetSession, () => initialState)
);
