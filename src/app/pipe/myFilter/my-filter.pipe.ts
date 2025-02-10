import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter',
  pure:true
})
export class MyFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, keys: string[]): any[] {
    console.log('Pipe-filter', searchText);
    if (!items || !searchText || !keys) {
      return items;
    }

    // Parse the searchText into a filter object
    const filter = searchText.split(';').filter(Boolean).reduce((acc:any, crit) => {
      const [key, value] = crit.split(':');
      acc[key] = value;
      return acc;
    }, {});

    return items.filter(item => {
      return keys.every(key => {
        if (!filter[key]) {
          return true;
        }
        if (!item.hasOwnProperty(key)) {
          return false;
        }
        const value = item[key].toString().toLowerCase();
        return value.includes(filter[key].toString().toLowerCase());
      });
    });
  }
  
}
