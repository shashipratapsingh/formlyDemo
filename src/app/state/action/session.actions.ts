import { createAction, props } from '@ngrx/store';

export const updateSession = createAction(
  '[Session] Update Session Details',
  props<{ 
    fromSlot: string; 
    tillSlot: string; 
    guests: { name: string; email: string; phone: string }[] 
  }>()
);

export const resetSession = createAction('[Session] Reset Session Details');
