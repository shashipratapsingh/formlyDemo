import { TestBed } from '@angular/core/testing';
 
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { PaymentDetailsComponent } from './payment-details.component';
 
describe('PaymentDetailsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PaymentDetailsComponent,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });
 
  it('should create the component', () => {
    const fixture = TestBed.createComponent(PaymentDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
 
   it('should component initialized', () => {
      expect(Component).toBeTruthy();
    });
    it('should create the form with default values', () => {
      expect(Component.name).toBeTruthy();
     
    });
});
 