import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from '../models/rental.model';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-rental-listing',
  templateUrl: './rental-listing.component.html',
  styleUrls: ['./rental-listing.component.scss'],
})
export class RentalListingComponent implements OnInit {
  rentals: Rental[] = [];
  query = '';
  isLoading = false;

  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.queryParams.subscribe((params) => {
      this.query = params['city'] ?? '';
      this.rentalService
        .getRentals(this.query)
        .subscribe((rentals: Rental[]) => {
          this.rentals = rentals;
          this.isLoading = false;
        });
    });
  }
}
