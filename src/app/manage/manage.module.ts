import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ManageRentalsComponent } from './manage-rentals/manage-rentals.component';
import { ManageBookingsComponent } from './manage-bookings/manage-bookings.component';
import { ManageComponent } from './manage.component';

import { AuthGuard } from '../auth/shared/auth.guard';
import { BookingListingsComponent } from './components/booking-listings/booking-listings.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
      {
        path: 'bookings',
        component: ManageBookingsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'rentals',
        component: ManageRentalsComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    ManageRentalsComponent,
    ManageBookingsComponent,
    ManageComponent,
    BookingListingsComponent,
  ],
  imports: [RouterModule.forChild(routes), CommonModule, SharedModule],
})
export class ManageModule {}
