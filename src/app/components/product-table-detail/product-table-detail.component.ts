import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
@Component({
  selector: 'b2b-product-table-detail',
  templateUrl: './product-table-detail.component.html',
  styleUrls: ['./product-table-detail.component.css']
})
export class ProductTableDetailComponent implements OnInit {
  tableHeading: string[] = ["Item", "Req Date", "Delivery", "Lead Time", "Dept.", "Qty", "Price", "Tax", "Shipment Cost", "Total Amount", "Price Comparision", "Shipment Status", "PO Stage", "Supplier",''];
  tableColumnSpacing = "14*minmax(87px,0.5fr)";  
  // tableColumnSpacing = "14*1fr 0fr"

  productTable_2:any=''
  product_image :any=''
  product_name:any=''
  @Input() dropdownVisible: boolean = true;
  constructor(private router: Router, private route: ActivatedRoute,private AppserviceService:AppserviceService) { }

  ngOnInit(): void {
    
    this.productTable_2  =JSON.parse(localStorage.getItem('expand_data')!)
    this.product_image = this.productTable_2.product
    this.product_name = this.productTable_2.productName

  }

  clickHandler(event: string) {
    if(event != '' && this.dropdownVisible == true) {
      this.router.navigate([{next: event}], {relativeTo: this.route});
    }
  }
}
