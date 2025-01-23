
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PaymentDetailsComponent } from './payment-details.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PaymentDetailsComponent', () => {
  let component: PaymentDetailsComponent;
  let fixture: ComponentFixture<PaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormlyModule.forRoot({
          validators: [
            {
              name: 'ccExpValidator',
              validation: (control) => {
                const value = control.value || '';
                const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; 
                if (!regex.test(value)) {
                  return { ccExpInvalid: true }; 
                }
                const currentDate = new Date();
                const [month, year] = value.split('/');
                const expDate = new Date(2000 + parseInt(year, 10), parseInt(month, 10) - 1);
                return expDate < currentDate ? { ccExpExpired: true } : null; // Expired case
              },
            },
          ],
        }),
        FormlyBootstrapModule,
        FormlyMaterialModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        PaymentDetailsComponent
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept a valid expiration date in the future', () => {
    const expControl = component.paymentForm.get('ccExp');
    expControl?.setValue('12/25'); 
    expect(expControl?.valid).toBeTruthy();
    expect(expControl?.errors).toBeNull();
  });

  it('should validate the credit card expiration date', () => {
    const expControl = component.paymentForm.get('ccExp');
    expControl?.setValue('12/25');
    expect(expControl?.valid).toBeTruthy();

    expControl?.setValue('13/25'); 
    expect(expControl?.hasError('ccExpInvalid')).toBeTruthy();

    expControl?.setValue('01/20'); 
    expect(expControl?.hasError('ccExpExpired')).toBeTruthy();
  });

  it('should reject an invalid format for the expiration date', () => {
    const expControl = component.paymentForm.get('ccExp');

    expControl?.setValue('1/24'); 
    expect(expControl?.hasError('ccExpInvalid')).toBeTruthy();

    expControl?.setValue('00/25'); 
    expect(expControl?.hasError('ccExpInvalid')).toBeTruthy();
  });

  it('should reject an expired expiration date', () => {
    const expControl = component.paymentForm.get('ccExp');
    expControl?.setValue('01/20'); 
    expect(expControl?.hasError('ccExpExpired')).toBeTruthy();
  });

  it('should handle edge cases for expiration dates', () => {
    const expControl = component.paymentForm.get('ccExp');
    const currentMonth = new Date().getMonth() + 1; 
    const currentYear = new Date().getFullYear() % 100; 

    const edgeCaseValidDate = `${currentMonth < 10 ? '0' : ''}${currentMonth}/${currentYear}`; 
    expControl?.setValue(edgeCaseValidDate);
    expect(expControl?.valid).toBeFalsy();

    const edgeCaseExpiredDate = `${currentMonth < 10 ? '0' : ''}${currentMonth - 1}/${currentYear}`;
    expControl?.setValue(edgeCaseExpiredDate);
    expect(expControl?.hasError('ccExpExpired')).toBeFalsy(); 
  });

  it('should not allow submission when the expiration date is invalid', () => {
    component.paymentForm.get('ccExp')?.setValue('01/20'); 
    component.onSubmit();
    expect(component.paymentForm.valid).toBeFalsy();
  });

  it('should accept a valid CVV (3 digits)', () => {
    const cvvControl = component.paymentForm.get('ccCVV');
    cvvControl?.setValue('123'); 
    expect(cvvControl?.hasError('ccCVV')).toBeFalse();
    expect(cvvControl?.errors).toBeNull();
  });


  it('should accept a valid credit card number (16 digits)', () => {
    const ccNumberControl = component.paymentForm.get('ccNumber');
    ccNumberControl?.setValue('4111111111119999'); 
    expect(ccNumberControl?.valid).toBeTruthy();
    expect(ccNumberControl?.errors).toBeNull();
  });

  it('should accept a valid credit card number and mask correctly', () => {
    const ccNumberControl = component.paymentForm.get('ccNumber');
  
    ccNumberControl?.setValue('4111111111119999');
    expect(ccNumberControl?.valid).toBeTruthy(); 
    expect(ccNumberControl?.errors).toBeNull();
  
   
    ccNumberControl?.valueChanges.subscribe(() => {
      const maskedValue = ccNumberControl?.value;
      expect(maskedValue).toEqual('XXXX XXXX XXXX 9999'); 
    });
  });


  it('should mask credit card numbers correctly', () => {
    const ccNumberControl = component.paymentForm.get('ccNumber');
  
    ccNumberControl?.setValue('4111111111119999');
    fixture.detectChanges();
  
    expect(component.ccNumberState).toEqual('4111111111119999'); 
    expect(ccNumberControl?.value).toEqual('XXXX XXXX XXXX 9999'); 
  });


  it('should accept a valid US zip code (5 digits)', () => {
    const zipCodeControl = component.paymentForm.get('ccZipCode');
    zipCodeControl?.setValue('12345'); 
    expect(zipCodeControl?.valid).toBeTruthy();
    expect(zipCodeControl?.errors).toBeNull();
  
    zipCodeControl?.setValue('12345-6789'); 
    expect(zipCodeControl?.hasError('ccZipCode')).toBeFalse();
  });

});
