import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-details', pathMatch: 'full' },
  { path: 'user-details', component: UserDetailsComponent },
  // { path: 'session-booking', component: SessionBookingComponent },
  // { path: 'payment-details', component: PaymentDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
