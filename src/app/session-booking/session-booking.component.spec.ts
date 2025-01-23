
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';

import { SessionBookingComponent } from './session-booking.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepeatTypeComponent } from '../repeat-type/repeat-type.component';

describe('SessionBookingComponent', () => {
  let component: SessionBookingComponent;
  let fixture: ComponentFixture<SessionBookingComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        FormlyModule.forRoot({
          types: [
            { name: 'repeat', component: RepeatTypeComponent },
          ],
        }),
        FormlyMaterialModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        SessionBookingComponent,
        BrowserAnimationsModule
      ],
      declarations: [RepeatTypeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionBookingComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the formly form', () => {
    const formElement = fixture.debugElement.query(By.css('formly-form'));
    expect(formElement).toBeTruthy();
  });

  it('should disable the submit button if the form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable the submit button when the form is valid', () => {
    component.model = {
      fromSlot: '9:00 AM',
      tillSlot: '10:00 AM',
      userName: 'Test',
      userEmail: 'test@example.com',
      userPhone: '1234567890',
      guests: [],
    };
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(submitButton.disabled).toBeFalse();
  });

  it('should call saveData() method on form submission', () => {
    spyOn(component, 'saveData').and.callThrough();

    component.model = {
      fromSlot: '9:00 AM',
      tillSlot: '10:00 AM',
      userName: 'Test',
      userEmail: 'test@example.com',
      userPhone: '1234567890',
      guests: [],
    };
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
    formElement.dispatchEvent(new Event('submit'));

    expect(component.saveData).toHaveBeenCalled();
  });

  it('should navigate to the payment-details page on form submission', () => {
    spyOn(router, 'navigate');
    component.model = {
      fromSlot: '9:00 AM',
      tillSlot: '10:00 AM',
      userName: 'Test',
      userEmail: 'test@example.com',
      userPhone: '1234567890',
      guests: [],
    };
    component.saveData();
    expect(router.navigate).toHaveBeenCalledWith(['/payment-details']);
  });  
  
  it('should enforce numeric and 10-digit limit for userPhone', () => {
    const userPhoneField = component.fields.find((field) => field.key === 'userPhone');
    const formControl = userPhoneField?.formControl;

    formControl?.setValue('12345678901234');
    fixture.detectChanges();

    expect(formControl?.value).toBe('1234567890');
  });
});
