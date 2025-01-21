import { NgModule } from '@angular/core';
 import { BrowserModule } from '@angular/platform-browser';
 import { AppComponent } from './app.component';
 import { AppRoutingModule } from './app-routing.module';
 import { ReactiveFormsModule } from '@angular/forms'; 
 import { FormlyModule } from '@ngx-formly/core';
 import { FormlyMaterialModule } from '@ngx-formly/material';
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
 import { HttpClientModule } from '@angular/common/http'; import { MatButtonModule } from '@angular/material/button'; 
 import { MatFormFieldModule } from '@angular/material/form-field';
 import { MatInputModule } from '@angular/material/input'; 
 import { SessionBookingComponent } from './session-booking/session-booking.component'; 
 import { UserDetailsComponent } from './user-details/user-details.component';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, // ONLY in AppModule
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SessionBookingComponent, // Directly import Standalone Components here
    UserDetailsComponent, // Directly import Standalone Components here
    FormlyMaterialModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
