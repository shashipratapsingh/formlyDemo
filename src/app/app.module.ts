import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SessionBookingComponent } from './session-booking/session-booking.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { RepeatTypeComponent } from './repeat-type/repeat-type.component';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RepeatTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validators: [
        {
          name: 'ccExpValidator',
          validation: (control: AbstractControl): ValidationErrors | null => {
            const value = control.value || '';
            const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
            if (!regex.test(value)) {
              return { ccExpInvalid: true }; // Invalid case
            }

            // Further check if the date is in the future
            const currentDate = new Date();
            const [month, year] = value.split('/');
            const expDate = new Date(2000 + parseInt(year, 10), parseInt(month, 10) - 1);

            if (expDate < currentDate) {
              return { ccExpExpired: true }; // Expired case
            }

            return null; // Valid case
          },
        },
      ],
      types: [
        { name: 'repeat', component: RepeatTypeComponent },
      ],
    }),
    FormlyBootstrapModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormlyMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
