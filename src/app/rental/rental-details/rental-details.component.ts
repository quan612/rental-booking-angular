import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../services/rental.service';
import { Rental } from '../models/rental.model';
import { UserService } from 'src/app/auth/shared/user.service';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.scss'],
})
export class RentalDetailsComponent implements OnInit {
  rental: Rental;

  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.rentalService.getRentalById(params.rentalId).subscribe((rental) => {
        this.rental = rental;
      });
    });
  }

  get rentalLocation(): string {
    return `${this.rental.city}, ${this.rental.street}`;
  }
}
