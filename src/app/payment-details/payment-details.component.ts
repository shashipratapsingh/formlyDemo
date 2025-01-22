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
  paymentForm: FormGroup;
  formFields: FormlyFieldConfig[] = [
    {
      key: 'ccNumber',
      type: 'number',
      templateOptions: {
        label: 'Credit Card Number',
        placeholder: 'Enter your credit card number',
        required: true,
        maxLength: 16,
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
    },
    {
      key: 'ccCVV',
      type: 'input',
      templateOptions: {
        label: 'CVV',
        required: true,
        type: 'password',
        maxLength: 3,
      },
      className: 'half-width',
    },
    {
      key: 'ccZipCode',
      type: 'input',
      templateOptions: {
        label: 'Zip Code',
        required: true,
        maxLength: 5,
        type: 'text',
      },
      className: 'half-width',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      ccNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^X{12}\d{0,4}$/), // 12 X's and up to 4 digits
        ],
      ],
      ccExp: ['', [Validators.required]],
      ccCVV: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      ccZipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  ngOnInit(): void {
    // Auto-format the credit card number
    this.paymentForm.get('ccNumber')?.valueChanges.subscribe((value) => {
      if (value) {
        const formattedValue = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
        this.paymentForm.get('ccNumber')?.setValue(formattedValue, { emitEvent: false });
      }
    });

    // Auto-format the expiration date
    this.paymentForm.get('ccExp')?.valueChanges.subscribe((value) => {
      if (value) {
        const input = value.replace(/\D/g, ''); // Remove non-numeric characters
        let formattedValue = input;
        if (input.length > 2) {
          formattedValue = input.slice(0, 2) + '/' + input.slice(2, 4);
        }
        this.paymentForm.get('ccExp')?.setValue(formattedValue, { emitEvent: false });
      }
    });
  }
  updateMaskedCreditCard(control: any, value: string): void {
   
    const digitsOnly = value.replace(/\D/g, '');
 
   
    if (digitsOnly.length <= 15) {
      control.setValue(digitsOnly, { emitEvent: false });
    } else {
   
      const masked = 'X'.repeat(12) + digitsOnly.slice(-4);
 
     
      if (value !== masked) {
        control.setValue(masked, { emitEvent: false });
      }
    }
  }
  onSubmit() {
    if (this.paymentForm.valid) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const sessionInfo = JSON.parse(localStorage.getItem('sessionInfo') || '{}');
      const paymentInfo = this.paymentForm.value;

      const allData = {
        userInfo,
        sessionInfo,
        paymentInfo,
      };
      localStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));
      localStorage.setItem('allData', JSON.stringify(allData));

      Swal.fire({
        title: 'Payment has been successfully processed!',
        icon: 'success',
        draggable: true,
      });
    }
  }
}
