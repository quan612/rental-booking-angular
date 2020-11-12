import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingListingsComponent } from './booking-listings.component';

describe('BookingListingsComponent', () => {
  let component: BookingListingsComponent;
  let fixture: ComponentFixture<BookingListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
