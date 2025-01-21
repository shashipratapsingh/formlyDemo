import { CommonModule } from '@angular/common'; // Correct import for standalone component
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [
    CommonModule,  // Correct: Use CommonModule here
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormlyModule,
    FormlyBootstrapModule,
    HttpClientModule,
  ],
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent implements OnInit {
  paymentForm: FormGroup;
  formFields: FormlyFieldConfig[] = [
    {
      key: 'ccNumber',
      type: 'input',
      templateOptions: {
        label: 'Credit Card Number',
        placeholder: 'Enter your credit card number',
        required: true,
        maxLength: 16,
        type: 'text',
      },
      className: 'half-width',
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
        [Validators.required, Validators.pattern(/^(?:\d{4} ){3}\d{4}$/)],
      ],
      ccExp: ['', [Validators.required]],
      ccCVV: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      ccZipCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
    });
  }

  ngOnInit(): void { }

  maskCreditCard(value: string): void {
    const input = value.replace(/\D/g, '');
    const masked = input.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.paymentForm.get('ccNumber')?.setValue(masked);
  }

  formatExpDate(value: string): void {
    let input = value.replace(/\D/g, '');
    if (input.length > 2) {
      input = input.slice(0, 2) + '/' + input.slice(2);
    }
    this.paymentForm.get('ccExp')?.setValue(input);
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
      alert('Payment has been successfully processed!');
    }
  }
}
