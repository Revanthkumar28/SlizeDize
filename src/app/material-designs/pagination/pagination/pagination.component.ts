import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'b2b-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 0;
  @Input() currentPage: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() position: string = '0';
  @Input() position_right: string = '0';
  @Input() position_bottom: string = '0';
  
  pagination:any = ''

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  onPageChange(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  constructor() { }

  ngOnInit(): void {
    if(this.position) {
      this.pagination += "position: " + this.position + ";";
    }
    if(this.position_right) {
      this.pagination += "right: " + this.position_right + ";";
    }
    if(this.position_bottom) {
      this.pagination += "bottom: " + this.position_bottom + ";";
    }
  }

}
