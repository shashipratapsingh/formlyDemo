import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormlyMaterialModule } from '@ngx-formly/material';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { updatePayment } from '../state/action/payment.actions';
import { selectUser } from '../state/selector/user.selectors';
import { selectSession } from '../state/selector/session.selectors';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormlyModule,
    FormlyBootstrapModule,
    HttpClientModule,
    FormlyMaterialModule,
  ],
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent implements OnInit {
  paymentForm: FormGroup = new FormGroup({});
  user$ = this.store.select(selectUser);
  session$ = this.store.select(selectSession);
  ccNumberState: string='';
  formFields: FormlyFieldConfig[] = [
    {
      key: 'ccNumber',
      type: 'number',
      templateOptions: {
        label: 'Credit Card Number',
        placeholder: 'Enter your credit card number',
        required: true,
        maxLength: 19,
        minLength: 19,
        type: 'text',
      },
      className: 'half-width',
      hooks: {
        onInit: (field) => {
          const control = field.formControl;
          if (control) {
            control.valueChanges.subscribe((value: string) => {
              this.updateMaskedCreditCard(control, value);
            });
          }
        },
      },
    },
    {
      key: 'ccExp',
      type: 'input',
      templateOptions: {
        label: 'Expiration Date (MM/YY)',
        placeholder: 'MM/YY',
        required: true,
        maxLength: 5,
        type: 'text',
      },
      validators: {
        validation: ['ccExpValidator'],
      },
      validation: {
        messages: {
          ccExpInvalid: 'Invalid expiration date. Please use MM/YY format.',
          ccExpExpired: 'The expiration date has passed. Please enter a valid date.',
        },
      },
      className: 'half-width',
      hooks: {
        onInit: (field) => {
          const control = field.formControl;
          if (control) {
            control.valueChanges.subscribe((value: string) => {
              if (value) {
                const formattedValue = value
                  .replace(/\D/g, '') // Remove non-digits
                  .slice(0, 4) // Limit to 4 digits
                  .replace(/(\d{2})(\d{1,2})/, '$1/$2'); // Add slash after MM
                control.setValue(formattedValue, { emitEvent: false });
              }
            });
          }
        },
      },
    },
    {
      key: 'ccCVV',
      type: 'number',
      templateOptions: {
        label: 'CVV',
        required: true,
        type: 'password',
        maxLength: 3,
      },
      className: 'half-width',
      hooks: {
        onInit: (field) => {
          const control = field.formControl;
          if (control) {
            control.valueChanges.subscribe((value: string) => {
              if (value) {
                const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
                control.setValue(numericValue, { emitEvent: false });
              }
            });
          }
        },
      },
    },
    {
      key: 'ccZipCode',
      type: 'number',
      templateOptions: {
        label: 'Zip Code',
        required: true,
        maxLength: 5,
        minLength: 5,
        type: 'text',
      },
      className: 'half-width',
      hooks: {
        onInit: (field) => {
          const control = field.formControl;
          if (control) {
            control.valueChanges.subscribe((value: string) => {
              if (value) {
                const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
                control.setValue(numericValue, { emitEvent: false });
              }
            });
          }
        },
      },
    },
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    
  }

  updateMaskedCreditCard(control: any, value: string): void {
   
    const digitsOnly = value.replace(/\D/g, '');
 
    this.ccNumberState = digitsOnly;
    if (digitsOnly.length <= 15) {
      control.setValue(digitsOnly, { emitEvent: false });
    } else {
   
      let masked = 'X'.repeat(12) + digitsOnly.slice(-4);
      masked = masked.replace(/(.{4})(?=.)/g, '$1 ');
      if (value !== masked) {
        control.setValue(masked, { emitEvent: false });
      }
    }
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const userInfo = JSON.parse(localStorage.getItem('userDetails') || '{}');
      const sessionInfo = JSON.parse(localStorage.getItem('sessionBookingData') || '{}');
      this.paymentForm.value['ccNumberUnmasked']=this.ccNumberState;
      const paymentInfo = this.paymentForm.value;
      this.user$.subscribe((user) => {
        console.log('User from NgRx Store:',user);
      });
      this.session$.subscribe((session) => {
        console.log('Session from NgRx Store:',session);
      });
      const allData = {
        userInfo,
        sessionInfo,
        paymentInfo,
      };
      localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
      localStorage.setItem('allData', JSON.stringify(allData));
      const {ccNumber,ccNumberMasked, ccExp, ccCVV, ccZipCode} = paymentInfo;
      this.store.dispatch(updatePayment({ ccNumber, ccNumberMasked, ccExp, ccCVV, ccZipCode }));
      Swal.fire({
        title: 'Payment has been successfully processed!',
        icon: 'success',
        draggable: true,
      });
    }
  }
}
