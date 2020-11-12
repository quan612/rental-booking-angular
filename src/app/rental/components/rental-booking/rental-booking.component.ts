import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { NgxSmartModalService, NgxSmartModalComponent } from 'ngx-smart-modal';

import { UserService } from 'src/app/auth/shared/user.service';
import { Booking } from 'src/app/booking/shared/booking.model';
import { BookingService } from 'src/app/booking/shared/booking.service';
import { TimeService } from 'src/app/shared/service/time.service';
import { Rental } from '../../models/rental.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rental-booking',
  templateUrl: './rental-booking.component.html',
  styleUrls: ['./rental-booking.component.scss'],
})
export class RentalBookingComponent implements OnInit {
  @Input('rental') rental: Rental;

  newBooking: Booking;
  calendar: { startDate: Moment; endDate: Moment };
  locale = {
    format: 'YYYY/MM/DD',
  };

  bookedDates: string[] = [];
  errors: any[] = [];

  constructor(
    private router: Router,
    public userService: UserService,
    public timeService: TimeService,
    public modalService: NgxSmartModalService,
    private bookingService: BookingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initBooking();
    this.bookingService.getBookings(this.rental._id).subscribe((bookings) => {
      bookings.forEach((booking) => {
        this.handleBlockBookedDates(booking.startDate, booking.endDate);
      });
    });
  }

  handleLogin = () => {
    this.router.navigate(['/login'], {
      queryParams: {
        redirect: this.router.url,
      },
    });
  };

  handleBooking = () => {
    this.newBooking.rental = { ...this.rental };
    this.errors = [];

    this.bookingService.creatBooking(this.newBooking).subscribe(
      (savedBooking) => {
        this.handleBlockBookedDates(
          savedBooking.startDate,
          savedBooking.endDate
        );
        this.calendar = null;
        this.initBooking();
        this.modal.close();
        this.toastr.success(`Success`, 'Rental Booked', {
          timeOut: 2000,
          closeButton: true,
        });
      },
      (err) => {
        console.log(err);
        this.errors = err;
      }
    );
  };

  getBookingDates = ({ startDate, endDate }: { [key: string]: Moment }) => {
    if (!startDate || !endDate) {
      return;
    }

    if (startDate.isSame(endDate, 'days')) {
      this.calendar = null;
    }

    this.newBooking.startDate = startDate.format();
    this.newBooking.endDate = endDate.format();
    this.newBooking.totalNights = endDate.diff(startDate, 'days');
    this.newBooking.price =
      this.newBooking.totalNights * this.rental.dailyPrice;
  };

  checkIfDatesValid = (date: Moment) => {
    return (
      this.timeService.checkIfDatesValid(date) ||
      this.bookedDates.includes(date.format())
    );
  };

  initBooking(): void {
    this.newBooking = new Booking();
    this.newBooking.guests = 1;
  }

  private handleBlockBookedDates = (startDate: string, endDate: string) => {
    const dateRanges = this.timeService.getDateRanges(startDate, endDate);
    this.bookedDates.push(...dateRanges);
  };

  get modal(): NgxSmartModalComponent {
    return this.modalService.getModal('confirmationModal');
  }

  get isBookingValid(): boolean {
    return (
      this.newBooking.startDate &&
      this.newBooking.endDate &&
      this.newBooking.guests &&
      this.newBooking.guests > 0
    );
  }
}
