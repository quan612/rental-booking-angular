import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/rental/models/rental.model';
import { RentalService } from 'src/app/rental/services/rental.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-rentals',
  templateUrl: './manage-rentals.component.html',
  styleUrls: ['./manage-rentals.component.scss'],
})
export class ManageRentalsComponent implements OnInit {
  ownerRentals: Rental[] = [];
  isLoading = false;

  constructor(
    private rentalService: RentalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.rentalService.getUserRentals().subscribe((rentals: Rental[]) => {
      this.ownerRentals = rentals;
      this.isLoading = false;
    });
  }

  deleteRental = (rentalId: string) => {
    const confirm = this.askConfirmation();
    if (!confirm) {
      return;
    }

    this.rentalService.deleteRental(rentalId).subscribe(
      (_) => {
        const index = this.ownerRentals.findIndex((r) => r._id === rentalId);
        this.ownerRentals.splice(index, 1);

        this.toastr.success(`Success`, 'Rental Deleted.', {
          timeOut: 1500,
          closeButton: true,
        });
      },
      (errors) => {
        errors.forEach((error) => {
          this.toastr.error(`Error`, `${error.error}`, {
            timeOut: 2500,
            closeButton: true,
          });
        });
      }
    );
  };

  private askConfirmation(): boolean {
    return window.confirm('Are you sure you want to delete this rental?');
  }
}
