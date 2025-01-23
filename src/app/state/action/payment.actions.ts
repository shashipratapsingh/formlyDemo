import { createAction, props } from '@ngrx/store';

export const updatePayment = createAction(
  '[Payment] Update Payment Details',
  props<{ 
    ccNumber: string; 
    ccNumberMasked: string; 
    ccExp: string;
    ccCVV: string;
    ccZipCode: string;
  }>()
);

export const resetPayment = createAction('[Payment] Reset Payment Details');
