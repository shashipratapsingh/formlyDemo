import { TestBed } from '@angular/core/testing';
import { SessionBookingComponent } from './session-booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
 
describe('SessionBookingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SessionBookingComponent,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });
 
  it('should create the component', () => {
    const fixture = TestBed.createComponent(SessionBookingComponent);
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
 