import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Rental } from '../models/rental.model';

@Injectable({ providedIn: 'root' })
export class RentalService {
  constructor(private http: HttpClient) {}

  getRentals(query: string = ''): Observable<Rental[]> {
    if (query !== '') {
      return this.http.get<Rental[]>(`/api/v1/rentals/?city=${query}`);
    } else {
      return this.http.get<Rental[]>(`/api/v1/rentals/`);
    }
  }

  getUserRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(`/api/v1/rentals/me`);
  }

  getRentalById(rentalId: string): Observable<Rental> {
    return this.http.get<Rental>(`/api/v1/rentals/${rentalId}`);
  }

  addRental(formData: FormGroup): Observable<Rental> {
    return this.http.post<Rental>('/api/v1/rentals/add', formData.value).pipe(
      catchError((httpErr: HttpErrorResponse) => {
        return throwError([...httpErr.error]);
      })
    );
  }

  updateRental(rentalId: string, formData: FormGroup): Observable<Rental> {
    return this.http
      .patch<Rental>(`/api/v1/rentals/${rentalId}`, formData.value)
      .pipe(
        catchError((httpErr: HttpErrorResponse) => {
          return throwError([...httpErr.error]);
        })
      );
  }

  deleteRental(rentalId: string): Observable<any> {
    return this.http.delete(`/api/v1/rentals/${rentalId}`).pipe(
      catchError((httpErr: HttpErrorResponse) => {
        return throwError([httpErr.error]);
      })
    );
  }

  verifyRentalOwner(rentalId: string): Observable<any> {
    return this.http.get(`/api/v1/rentals/${rentalId}/verify-user`).pipe(
      catchError((httpErr: HttpErrorResponse) => {
        return throwError([httpErr.error]);
      })
    );
  }
}
