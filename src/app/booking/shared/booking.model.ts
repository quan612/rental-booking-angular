import { Rental } from 'src/app/rental/models/rental.model';

export class Booking {
  _id: string;
  startDate: string;
  endDate: string;
  price: number;
  totalNights: number;
  guests: number;
  user: string;
  rental: Rental;
}
