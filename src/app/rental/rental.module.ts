import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MapModule } from '../shared/modules/map/map.module';

import { RentalDetailsComponent } from './rental-details/rental-details.component';
import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { RentalCardComponent } from '../shared/rental-card/rental-card.component';
import { RentalComponent } from './rental.component';

import { RentalService } from './shared/rental.service';
import { UpperLetterPipe } from '../shared/pipe/uppercase';

const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
      { path: '', component: RentalListingComponent },
      { path: ':rentalId', component: RentalDetailsComponent },
    ],
  },
];

@NgModule({
  declarations: [
    RentalDetailsComponent,
    RentalListingComponent,
    RentalComponent,
    RentalCardComponent,
    UpperLetterPipe,
  ],
  providers: [RentalService],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    MapModule,
  ],
})
export class RentalModule {}
