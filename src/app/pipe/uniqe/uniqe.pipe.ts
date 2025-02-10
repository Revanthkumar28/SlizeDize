import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqe'
})
export class UniqePipe implements PipeTransform {

  transform(value: any[]): any[] {
    if(!Array.isArray(value)) {
      return value;
    }

    const uniqueSet = new Set(value);
    return Array.from(uniqueSet);
  }

}
