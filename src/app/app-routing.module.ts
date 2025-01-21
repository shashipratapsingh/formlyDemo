import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { SessionBookingComponent } from './session-booking/session-booking.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', redirectTo: '/user-details', pathMatch: 'full' },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'session-booking', component: SessionBookingComponent },
  { path: 'payment-details', component: PaymentDetailsComponent },
  { path: '**', redirectTo: '/user-details' },
];
@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
