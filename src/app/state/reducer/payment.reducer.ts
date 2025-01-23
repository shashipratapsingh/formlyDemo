import { createReducer, on } from '@ngrx/store';
import { updatePayment, resetPayment } from '../action/payment.actions';
import { PaymentState } from '../app.state';

const initialState: PaymentState = {
  ccNumber: '',
  ccNumberMasked: '',
  ccExp: '',
  ccCVV: '',
  ccZipCode: ''
};

export const paymentReducer = createReducer(
  initialState,
  on(updatePayment, (state, { ccNumber, ccNumberMasked, ccExp, ccCVV, ccZipCode }) => ({ ccNumber, ccNumberMasked, ccExp, ccCVV, ccZipCode })),
  on(resetPayment, () => initialState)
);
