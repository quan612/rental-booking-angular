import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RentalService } from 'src/app/rental/services/rental.service';

@Injectable({
  providedIn: 'root',
})
export class RentalGuard implements CanActivate {
  constructor(private rentalService: RentalService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const { rentalId } = route.params;
    return this.rentalService.verifyRentalOwner(rentalId).pipe(
      map((_) => true),
      catchError((_) => {
        this.router.navigate([`/rentals/${rentalId}`]);
        return of(false);
      })
    );
  }
}
