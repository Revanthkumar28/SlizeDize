import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(value: string): string {
    // Parse the input string to a Luxon DateTime object
    const date = DateTime.fromFormat(value, 'yyyy-MM-dd HH:mm:ss');

    // Format the date as 'dd-MMM-yyyy'
    const formattedDate = date.toFormat('dd-LLL-yyyy');

    return formattedDate;
  }

}
