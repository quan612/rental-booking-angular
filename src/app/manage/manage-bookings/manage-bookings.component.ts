import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/booking/shared/booking.service';

@Component({
  selector: 'app-manage-bookings',
  templateUrl: './manage-bookings.component.html',
  styleUrls: ['./manage-bookings.component.scss'],
})
export class ManageBookingsComponent implements OnInit {
  bookingType: string;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.bookingType = params['type'] || 'all';
    });
  }

  getUserBookings = () => this.bookingService.getUserBookings();
  getReceivedBookings = () => this.bookingService.getReceivedBookings();
}
