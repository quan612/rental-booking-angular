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
  //dependency injection
  constructor(
    private rentalService: RentalService,
    private route: ActivatedRoute) {}

  rental:Rental;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {      
      this.rentalService.getRentalById(params.rentalId).subscribe((rental) => {
        this.rental = rental;
      })
    });
  }
}
