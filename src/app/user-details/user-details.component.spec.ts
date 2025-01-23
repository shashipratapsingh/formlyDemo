
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, Store } from '@ngrx/store';
import { userReducer } from '../state/reducer/user.reducer';
import { UserState } from '../state/app.state';
import { updateUser } from '../state/action/user.actions';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let router: Router;
  let store: Store<UserState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormlyModule.forRoot(),
        FormlyMaterialModule,
        RouterTestingModule,
        UserDetailsComponent,
        BrowserAnimationsModule,
        StoreModule.forRoot({ user: userReducer }),
      ],
      providers: [
        Store, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should initialize form fields correctly', () => {
    const form = component.form;
    expect(form.contains('name')).toBeTrue();
    expect(form.contains('email')).toBeTrue();
    expect(form.contains('phone')).toBeTrue();
  });

  it('should show validation errors for invalid form submission', () => {
    const userDetails = {
      name: '',
      email: 'invalidemail',
      phone: '1234567890',
    };

    const formGroup = component.form as FormGroup;

    formGroup.controls['name'].setValue(userDetails.name);
    formGroup.controls['email'].setValue(userDetails.email);
    formGroup.controls['phone'].setValue(userDetails.phone);

    fixture.detectChanges();

    component.onSubmit();

    expect(formGroup.controls['name'].hasError('required')).toBeTrue();
    expect(formGroup.controls['email'].hasError('pattern')).toBeTrue();
    expect(formGroup.controls['phone'].hasError('required')).toBeFalse();
  });

  it('should store user details in localStorage and navigate to session-booking on form submission', () => {
    const userDetails = { name: 'Test', email: 'test@mycompany.tld', phone: '+919876543210' };

    component.model = { ...userDetails };

    const formGroup = component.form as FormGroup;

    formGroup.controls['name'].setValue(userDetails.name);
    formGroup.controls['email'].setValue(userDetails.email);
    formGroup.controls['phone'].setValue(userDetails.phone);

    spyOn(localStorage, 'setItem');
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(store, 'dispatch');

    component.onSubmit();

    expect(component.form.valid).toBeTrue();
    expect(localStorage.setItem).toHaveBeenCalledWith('userDetails', JSON.stringify(userDetails));
    expect(router.navigate).toHaveBeenCalledWith(['/session-booking']);
    expect(store.dispatch).toHaveBeenCalledWith(updateUser(userDetails));
  });

  it('should automatically format phone number with country code', () => {
    component.model = { name: 'Test', email: 'test@mycompany.tld', phone: '9876543210' };

    const formGroup = component.form as FormGroup;
    const phoneControl = formGroup.controls['phone'];

    phoneControl.setValue('9876543210');

    phoneControl.updateValueAndValidity();
    fixture.detectChanges();

    expect(phoneControl.value).toBe('+919876543210');
  });
});