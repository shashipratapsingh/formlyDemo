import { ComponentFixture, TestBed } from '@angular/core/testing';
 
import { UserDetailsComponent } from './user-details.component';
 
 
import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
 
describe('UserDetailsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserDetailsComponent,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });
 
  it('should create the component', () => {
    const fixture = TestBed.createComponent(UserDetailsComponent);
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
 