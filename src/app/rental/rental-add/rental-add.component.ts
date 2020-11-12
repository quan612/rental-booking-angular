import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalService } from '../services/rental.service';

import { Rental } from '../models/rental.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './rental-add.component.html',
})
export class RentalAddComponent implements OnInit, OnDestroy {
  isAddMode: boolean;
  isLoading = false;

  rentalId: string;
  currentRental: Rental;

  rentalCategories = Rental.Categories;
  form: FormGroup;
  formErrors: object[] = [];
  message: string;
  timeoutEvent: any;

  constructor(
    private fb: FormBuilder,
    private rentalService: RentalService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.rentalId = this.route.snapshot.params['rentalId'];
    this.isAddMode = !this.rentalId;
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.timeoutEvent) {
      clearTimeout(this.timeoutEvent);
    }
  }

  initForm = () => {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(128)]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.minLength(4)]],
      category: [Rental.Categories[0], [Validators.required]],
      image: [null, [Validators.required]],
      numOfRooms: [1, [Validators.required]],
      description: ['', [Validators.required]],
      dailyPrice: [1, [Validators.required]],
      shared: [false, [Validators.required]],
    });

    if (!this.isAddMode) {
      this.rentalService.getRentalById(this.rentalId).subscribe((rental) => {
        this.currentRental = rental;
        this.form.patchValue(rental);
      });
    }
  };

  onSubmit(): void {
    // this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.isAddMode) {
      this.createRental();
    } else {
      this.updateRental();
    }
  }

  private createRental = (): Subscription => {
    return this.rentalService.addRental(this.form).subscribe(
      (newRental) => {
        this.toastr.success(`Success`, 'Rental Added', {
          timeOut: 1500,
          closeButton: true,
        });

        this.timeoutEvent = setTimeout(() => {
          this.router.navigate([`/rentals/${newRental._id}`]);
        }, 3000);
      },
      (errors) => {
        this.formErrors = errors;
        this.isLoading = false;
      }
    );
  };

  private updateRental = () => {
    return this.rentalService.updateRental(this.rentalId, this.form).subscribe(
      (_) => {
        this.toastr.success(`Success`, 'Rental Updated', {
          timeOut: 1500,
          closeButton: true,
        });

        this.timeoutEvent = setTimeout(() => {
          this.router.navigate([`/rentals/${this.rentalId}`]);
        }, 3000);
      },
      (errors) => {
        this.formErrors = errors;
        this.isLoading = false;
      }
    );
  };

  attachImage = (imageId: string) => {
    if (imageId !== null) {
      this.form.controls.image.setValue({ _id: imageId });
    }
    // reset the image to be null
    else {
      this.form.controls.image.setValue(null);
    }
  };

  hasImage = (): boolean => {
    return this.form.controls.image.value !== null ? true : false;
  };
}
