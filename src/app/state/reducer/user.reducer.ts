import { createReducer, on } from '@ngrx/store';
import { updateUser, resetUser } from '../action/user.actions';
import { UserState } from '../app.state';

const initialState: UserState = {
  name: '',
  email: '',
  phone: '',
};

export const userReducer = createReducer(
  initialState,
  on(updateUser, (state, { name, email, phone }) => ({ name, email, phone })),
  on(resetUser, () => initialState)
);
