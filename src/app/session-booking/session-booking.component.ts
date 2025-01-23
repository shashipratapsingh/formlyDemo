import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { updateSession } from '../state/action/session.actions';

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
        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      },
      validation: {
        messages: {
          pattern: 'Email must be in the correct format',
          required: 'Email is required',
        },
      },
    },
    {
      key: 'phone',
      type: 'input',
      templateOptions: {
        label: 'Guest Phone Number',
        placeholder: 'Enter guest phone number',
        required: true,
        maxLength: 15, // Max length to account for international phone numbers
        minLength: 8, // Min length for Indian phone numbers
        attributes: {
          inputmode: 'tel', // Opens numeric keypad on mobile
        },
      },
      hooks: {
        onInit: (field) => {
          const formControl = field.formControl;
          if (formControl) {
            formControl.valueChanges.subscribe((value) => {
              if (value) {
                let numericValue = value.replace(/[^\d+]/g, ''); // Allow only digits and '+'
                if (numericValue.startsWith('+')) {
                  // Allow international format starting with '+'
                  numericValue = numericValue.slice(0, 15); // Limit to 15 characters
                } else {
                  // Ensure default international format if no '+' is included
                  numericValue = '+91' + numericValue.replace(/^\+/, '').slice(0, 10);
                }
                formControl.setValue(numericValue, { emitEvent: false });
              }
            });
          }
        },
      },
      validation: {
        messages: {
          required: 'Phone number is required',
          maxlength: 'Phone number cannot exceed 15 digits',
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
              pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            },
            validation: {
              messages: {
                pattern: 'Email must be in the correct format',
                required: 'Email is required',
              },
            },
          },
          {
            key: 'phone',
            type: 'input',
            templateOptions: {
              label: 'Guest Phone Number',
              placeholder: 'Enter your phone number',
              required: true,
              maxLength: 15, // Max length to account for international phone numbers
              minLength: 8, // Min length for Indian phone numbers
              attributes: {
                inputmode: 'numeric', // Opens numeric keypad on mobile
              },
            },
            hooks: {
              onInit: (field) => {
                const formControl = field.formControl;
                if (formControl) {
                  formControl.valueChanges.subscribe((value) => {
                    if (value) {
                      let numericValue = value.replace(/[^\d+]/g, ''); // Allow only digits and '+'
                      if (numericValue.startsWith('+')) {
                        // Allow international format starting with '+'
                        numericValue = numericValue.slice(0, 15); // Limit to 15 characters
                      } else {
                        // Ensure default international format if no '+' is included
                        numericValue = '+91' + numericValue.replace(/^\+/, '').slice(0, 10);
                      }
                      formControl.setValue(numericValue, { emitEvent: false });
                    }
                  });
                }
              },
            },
            validation: {
              messages: {
                required: 'Phone number is required',
                maxlength: 'Phone number cannot exceed 15 digits',
              },
            },
          },
        ],
      },
    },
  ];

  constructor(private router: Router, private store: Store<AppState>) {}

  saveData() {
    const {name, email, phone} = this.model;
    const { fromSlot, tillSlot, guests } = this.model;
    guests.push({ name, email, phone });
    localStorage.setItem('sessionBookingData', JSON.stringify({ fromSlot, tillSlot, guests }));
    this.store.dispatch(updateSession({ fromSlot, tillSlot, guests }));
    this.router.navigate(['/payment-details']);
  }
}
