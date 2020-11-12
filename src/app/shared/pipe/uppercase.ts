import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upper',
})
export class UpperLetterPipe implements PipeTransform {
  transform(value: string, mode: string): string {
    if (!value || typeof value !== 'string') {
      return '';
    }

    if (mode === 'firstLetterUpper') {
      return value
        .split(' ')
        .map((char) => char[0].toUpperCase() + char.slice(1))
        .join(' ');
    }

    return value.toUpperCase();
  }
}
