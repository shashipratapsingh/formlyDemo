import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@Component({
  selector: 'app-session-booking',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormlyModule,
    FormlyMaterialModule,
  ],
  templateUrl: './session-booking.component.html',
  styleUrls: ['./session-booking.component.css'],
})
export class SessionBookingComponent {
  form = new FormGroup({});
  model: any = {
    timeSlot: '',
    fromSlot: '',
    tillSlot: '',
    guests: [],
  };

  fields: FormlyFieldConfig[] = [
    {
      key: 'fromSlot',
      type: 'select',
      templateOptions: {
        label: 'From Slot',
        placeholder: 'Select start time',
        required: true,
        options: [
          { value: '9:00 AM', label: '9:00 AM' },
          { value: '10:00 AM', label: '10:00 AM' },
          // ... other time slots
        ],
      },
    },
    {
      key: 'tillSlot',
      type: 'select',
      templateOptions: {
        label: 'Till Slot',
        placeholder: 'Select end time',
        required: true,
        options: [
          { value: '10:00 AM', label: '10:00 AM' },
          { value: '11:00 AM', label: '11:00 AM' },
          // ... other time slots
        ],
      },
    },
    {
      key: 'guests',
      type: 'repeat',
      templateOptions: {
        addText: 'Add Guest',
      },
      fieldArray: {
        fieldGroup: [
          {
            key: 'name',
            type: 'input',
            templateOptions: {
              label: 'Guest Name',
              placeholder: 'Enter guest name',
              required: true,
            },
          },
          {
            key: 'email',
            type: 'input',
            templateOptions: {
              label: 'Guest Email',
              placeholder: 'Enter guest email',
              required: true,
              type: 'email',
            },
          },
          {
            key: 'phone',
            type: 'input',
            templateOptions: {
              label: 'Guest Phone Number',
              placeholder: 'Enter guest phone number',
              required: true,
              pattern: /^[0-9]{10}$/,
            },
            validation: {
              messages: {
                pattern: 'Phone number must be 10 digits.',
              },
            },
          },
        ],
      },
    },
  ];

  saveData() {
    localStorage.setItem('sessionBookingData', JSON.stringify(this.model));
    alert('Data saved successfully!');
  }
}
