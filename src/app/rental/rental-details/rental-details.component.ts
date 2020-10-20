import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.scss'],
})
export class RentalDetailsComponent implements OnInit {
  rental: Rental;

  //dependency injection
  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.rentalService.getRentalById(params.rentalId).subscribe((rental) => {
        this.rental = rental;
      });
    });
  }

  get rentalLocation() {
    return `${this.rental.city}, ${this.rental.street}`;
  }
}
