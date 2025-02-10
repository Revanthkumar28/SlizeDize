import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any, searchText?: string): any[] {
    if(!items) return [];
    if(!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter( (item:any) => {
      return item['name'].toLowerCase().includes(searchText);
    });
  }
 
  // transform(array: any[], ...args:any): any {
  //   if (array == null) {
  //     return null;
  //   }

  //   return array.filter(function(obj) {
  //     if (args[1]) {
  //       return obj.status === args[0];
  //     }
  //     return array;
  //   });

  // }

}
