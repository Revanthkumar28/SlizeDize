import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'multisearchFilter'
})
export class MultisearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) return items;
    searchText = searchText.toLowerCase();
    
    return items.filter(item => {
      // Add null or undefined checks before accessing properties
      return (
        (item.vednor && item.vednor.toLowerCase().includes(searchText)) ||
        (item.rfq_id && item.rfq_id.toLowerCase().includes(searchText)) ||
        (item.department_name && item.department_name.toLowerCase().includes(searchText))
      );
    });
  }
}
