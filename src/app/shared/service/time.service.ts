import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  checkIfDatesValid = (date: moment.Moment) => {
    return date.diff(moment(), 'days') < 0;
  };

  format(date: string, dateFormat = 'YYYY/MM/DD'): string {
    if (!date) {
      return '';
    }
    return moment(date).format(dateFormat);
  }

  getDateRanges(startDate: string, endDate: string): any[] {
    const dates = [];
    let lStartDate = moment(new Date(startDate));
    const lEndDate = moment(new Date(endDate));

    while (lStartDate < lEndDate) {
      dates.push(lStartDate.format());
      lStartDate = lStartDate.add(1, 'day');
    }

    return dates;
  }
}
