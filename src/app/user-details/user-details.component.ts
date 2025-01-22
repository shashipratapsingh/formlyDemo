import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormlyModule,
    FormlyMaterialModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  // Define dynamic Formly fields with correct formControlName binding
  fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Enter your name',
        required: true,
      },
    },
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        placeholder: 'Enter your email',
        required: true,
        pattern: /@mycompany\.tld$/,
      },
      validation: {
        messages: {
          pattern: 'Email must be in the @mycompany.tld domain',
          required: 'Email is required',
        },
      },
    },
    {
      key: 'phone',
      type: 'input',
      templateOptions: {
        label: 'Phone Number',
        placeholder: 'Enter your phone number',
        required: true,
        maxLength: 10,
        attributes: {
          inputmode: 'numeric', // Opens numeric keypad on mobile
        },
      },
      hooks: {
        onInit: (field) => {
          // Add custom input handling for numeric-only restriction
          const formControl = field.formControl;
          if (formControl) {
            formControl.valueChanges.subscribe((value) => {
              const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
              if (numericValue !== value) {
                formControl.setValue(numericValue, { emitEvent: false });
              }
            });
          }
        },
      },
      validation: {
        messages: {
          required: 'Phone number is required',
          maxlength: 'Phone number cannot exceed 10 digits',
        },
      },
    },
  ];

  // Inject Router and FormBuilder
  constructor(private router: Router, private fb: FormBuilder) {}

  // Handle form submission
  onSubmit() {
    if (this.form.valid) {
      localStorage.setItem('userDetails', JSON.stringify(this.model));
      console.log('Form Submitted!', this.model);
      // Navigate to session-booking page after form submission
      this.router.navigate(['/session-booking']);
    }
  }
}
