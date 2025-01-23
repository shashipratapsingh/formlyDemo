import { createAction, props } from '@ngrx/store';

export const updateUser = createAction(
  '[User] Update User Details',
  props<{ name: string; email: string; phone: string }>()
);

export const resetUser = createAction('[User] Reset User Details');
