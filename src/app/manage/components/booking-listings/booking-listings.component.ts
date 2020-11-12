import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/booking/shared/booking.model';
import { BookingService } from 'src/app/booking/shared/booking.service';

@Component({
  selector: 'app-booking-listings',
  templateUrl: './booking-listings.component.html',
  styleUrls: ['./booking-listings.component.scss'],
})
export class BookingListingsComponent implements OnInit {
  @Input() title = '';
  @Input('getBookings') getBookings: () => Observable<Booking[]>;
  @Input('type') type: string;

  bookings: Booking[];

  constructor(
    private bookingService: BookingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getBookings().subscribe((bookings) => {
      this.bookings = bookings;
      console.log(bookings);
    });
  }

  deleteBooking = (bookingId: string) => {
    const confirm = this.askConfirmation();
    if (!confirm) {
      return;
    }

    this.bookingService.deleteBooking(bookingId).subscribe(
      (_) => {
        const index = this.bookings.findIndex((r) => r._id === bookingId);
        this.bookings.splice(index, 1);

        this.toastr.success(`Success`, 'Bookings Deleted.', {
          timeOut: 1500,
          closeButton: true,
        });
      },
      (error) => {
        this.toastr.error(`Error`, `${error}`, {
          timeOut: 1500,
          closeButton: true,
        });
      }
    );
  };

  private askConfirmation(): boolean {
    return window.confirm('Are you sure you want to delete this booking?');
  }
}
