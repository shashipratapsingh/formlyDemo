import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectPayment = (state: AppState) => state.payment;

export const selectPaymentCCNumber = createSelector(selectPayment, (payment) => payment.ccNumber);
export const selectPaymentCCNumberMasked = createSelector(selectPayment, (payment) => payment.ccNumberMasked);
export const selectPaymentCCExp = createSelector(selectPayment, (payment) => payment.ccExp);
export const selectPaymentCCCVV = createSelector(selectPayment, (payment) => payment.ccCVV);
export const selectPaymentCCZipCode = createSelector(selectPayment, (payment) => payment.ccZipCode);

