import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { allproducts } from 'src/app/models/interfaces';
@Component({
  selector: 'b2b-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  @Input() tableHeading: string[] = [];
  @Input() tableColumnSpacing: string = "";
  now:any=""
  deatails:any=''
  continueButton:boolean=false
  productTable_2:any=''
  product_name:any=''
  reqDate:any=''
  deliveryDate:any=''


 productDetails:allproducts={
  item:'',
  req_date:'date',
  delivery:'date', 
    lead_time:'',
    dept:'',
    qty:'',
    price:'',
    tax:'',
    shipping_cost:'',
    total_amount:'',
    price_comparison:'',
    shipment_status:'',
    po_stage:'',
    supplier:''
  }
  constructor() {
   
   }

  ngOnInit(): void {
    this.continueButton=true
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.productTable_2  =JSON.parse(localStorage.getItem('expand_data')!)
   console.log(this.productTable_2.product_image)
    this.product_name = this.productTable_2.productName


    this.deatails = JSON.parse( sessionStorage.getItem('registration')!);
    // this.productDetails.req_date=this.deatails.req_date
    // this.productDetails.delivery=this.deatails.delivery
    // console.log(this.deatails)

  }
  continute(){
    console.log(this.productDetails)
   
  }
  ngOnChang(i:any){
   
    sessionStorage.setItem('registration', JSON.stringify(this.productDetails));
  }
  
}
