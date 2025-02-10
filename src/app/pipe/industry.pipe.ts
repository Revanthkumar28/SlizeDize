import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class IndustryPipe implements PipeTransform {

  transform(items: any, searchText?: string,key='typeOfIndustry'): any[] {
    if(!items) return [];
    if(!searchText) return items;
    console.log('Test ' + searchText)
    searchText = searchText.toLowerCase();

    return items.filter((item:any) => {
      return item[key].toLowerCase().includes(searchText);
    });

  }
}
