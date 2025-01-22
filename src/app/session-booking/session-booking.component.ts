import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Router } from '@angular/router';

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
          { value: '11:00 AM', label: '11:00 AM' },
          { value: '12:00 PM', label: '12:00 PM' },
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
        options: [],
      },
      expressionProperties: {
        'templateOptions.options': (model: any) => {
          const allSlots = [
            { value: '9:00 AM', label: '9:00 AM' },
            { value: '10:00 AM', label: '10:00 AM' },
            { value: '11:00 AM', label: '11:00 AM' },
            { value: '12:00 PM', label: '12:00 PM' },
          ];
          const fromIndex = allSlots.findIndex(
            (slot) => slot.value === model.fromSlot
          );
          return fromIndex >= 0 ? allSlots.slice(fromIndex + 1) : [];
        },
      },
    },
    {
      key: 'userName',
      type: 'input',
      templateOptions: {
        label: 'Guest Name',
        placeholder: 'Enter guest name',
        required: true,
      },
    },
    {
      key: 'userEmail',
      type: 'input',
      templateOptions: {
        label: 'Guest Email',
        placeholder: 'Enter guest email',
        required: true,
        type: 'email',
      },
    },
    {
      key: 'userPhone',
      type: 'input',
      templateOptions: {
        label: 'Guest Phone Number',
        placeholder: 'Enter guest phone number',
        required: true,
        attributes: {
          inputmode: 'numeric', // Opens numeric keypad on mobile
        },
      },
      hooks: {
        onInit: (field) => {
          const formControl = field.formControl;
          if (formControl) {
            formControl.valueChanges.subscribe((value) => {
              const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
              const trimmedValue = numericValue.slice(0, 10); // Limit to 10 digits
              if (trimmedValue !== value) {
                formControl.setValue(trimmedValue, { emitEvent: false });
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
              placeholder: 'Enter your phone number',
              required: true,
              attributes: {
                inputmode: 'numeric', // Opens numeric keypad on mobile
              },
            },
            hooks: {
              onInit: (field) => {
                const formControl = field.formControl;
                if (formControl) {
                  formControl.valueChanges.subscribe((value) => {
                    const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
                    const trimmedValue = numericValue.slice(0, 10); // Limit to 10 digits
                    if (trimmedValue !== value) {
                      formControl.setValue(trimmedValue, { emitEvent: false });
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
        ],
      },
    },
  ];

  constructor(private router: Router) {}

  saveData() {
    localStorage.setItem('sessionBookingData', JSON.stringify(this.model));
    this.router.navigate(['/payment-details']);
  }
}
