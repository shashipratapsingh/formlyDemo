import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Router } from '@angular/router';  // Import Router

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
  styleUrls: ['./user-details.component.css']
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
        pattern: /^(\+?\d{1,3})?(\d{10})$/,
      },
      validation: {
        messages: {
          pattern: 'Phone number should support multiple formats (e.g., +1234567890, 1234567890)',
          required: 'Phone number is required',
        },
      },
    },
  ];

  // Inject Router
  constructor(private router: Router) {}

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
