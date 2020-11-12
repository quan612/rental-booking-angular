import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/shared/auth.guard';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapModule } from '../shared/modules/map/map.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { SharedModule } from '../shared/shared.module';

import { RentalAddComponent } from './rental-add/rental-add.component';
import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { RentalBookingComponent } from './components/rental-booking/rental-booking.component';
import { RentalComponent } from './rental.component';

import { RentalService } from './services/rental.service';
import { RentalGuard } from '../auth/shared/rental.guard';
import { ImageUploadModule } from '../shared/modules/image-upload/image-upload.module';

const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListingComponent },
      { path: 'add', component: RentalAddComponent, canActivate: [AuthGuard] },
      { path: ':rentalId', component: RentalDetailsComponent },
      {
        path: ':rentalId/edit',
        component: RentalAddComponent,
        canActivate: [AuthGuard, RentalGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [
    RentalDetailsComponent,
    RentalListingComponent,
    RentalComponent,
    RentalAddComponent,
    RentalBookingComponent,
  ],
  providers: [RentalService],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MapModule,
    SharedModule,
    ImageUploadModule,

    NgxDaterangepickerMd.forRoot(),
    NgxSmartModalModule.forChild(),
  ],
})
export class RentalModule {}
