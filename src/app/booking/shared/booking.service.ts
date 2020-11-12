import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Booking } from './booking.model';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  creatBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>('/api/v1/bookings', booking).pipe(
      catchError((httpErr: HttpErrorResponse) => {
        return throwError([...[], httpErr?.error]);
      })
    );
  }

  getBookings(rentalId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`/api/v1/bookings?rental=${rentalId}`);
  }

  getUserBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`/api/v1/bookings/me`);
  }

  getReceivedBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`/api/v1/bookings/received`);
  }

  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete<any>(`/api/v1/bookings/${bookingId}`).pipe(
      catchError((httpErr: HttpErrorResponse) => {
        return throwError([httpErr.error]);
      })
    );
  }
}
