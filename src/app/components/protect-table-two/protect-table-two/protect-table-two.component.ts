import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { DatePipe } from "@angular/common";
import { allproducts } from 'src/app/models/interfaces';
@Component({
  selector: 'b2b-protect-table-two',
  templateUrl: './protect-table-two.component.html',
  styleUrls: ['./protect-table-two.component.css']
})
export class ProtectTableTwoComponent implements OnInit {
  @Input() tableHeading: string[] = [];
  @Input() tableColumnSpacing: string = "";
 
  productTable_2:any=''
  product_image :any=''
  product_name:any=''
  @Input() dropdownVisible: boolean = true;
  

  now:any=""
  deatails:any=''
  continueButton:boolean=false
  // productTable_2:any=''
  // product_name:any=''
  request:any=''
  delivery_date:any=''
  lead_time:any=''
  dept:any=''
  qty:any=''
  price:any=''
  tax:any=''
  shipping_cost:any=''
  total_amount:any=''
  price_comparison:any=''
  shipment_status:any=''
  po_stage:any=''
  supplier:any=''

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
  constructor(private router: Router, private route: ActivatedRoute,private AppserviceService:AppserviceService) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params) => {
    //   let id = params.get("image");
    //   if(id) this.productTable_2 = id;
    
    // })

    this.productTable_2  =JSON.parse(localStorage.getItem('expand_data')!)
    this.product_image = this.productTable_2.product
    this.product_name = this.productTable_2.productName


    // this.AppserviceService.expandProduct$.subscribe(x=>{
    //   this.productTable_2=x.product;
    //   // this.signupDetails = x; 
    // })
    this.continueButton=true
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
    // this.productTable_2  =JSON.parse(localStorage.getItem('expand_data')!)
    // console.log(this.productTable_2.product_image)
    // this.product_name = this.productTable_2.productName


    this.deatails = JSON.parse( sessionStorage.getItem('registration')!);
    console.log(this.deatails.lead_time)
    this.request=this.deatails.req_date
    this.delivery_date=this.deatails.delivery
    this.lead_time=this.deatails.lead_time
    this.dept=this.deatails.dept
    this.qty=this.deatails.qty
    this.price=this.deatails.price
    this.tax=this.deatails.tax
    this.shipping_cost=this.deatails.shipping_cost
    this.total_amount=this.deatails.total_amount
    this.price_comparison=this.deatails.price_comparison
    this.shipment_status=this.deatails.shipment_status
    this.po_stage=this.deatails.po_stage
    this.supplier=this.deatails.supplier
  
  }

  clickHandler(event: string) {
    if(event != '' && this.dropdownVisible == true) {
      this.router.navigate([{next: event}], {relativeTo: this.route});
    }
  }
  continute(){
    console.log(this.productDetails)
   
  }
  ngOnChang(i:any){
   
    sessionStorage.setItem('registration', JSON.stringify(this.productDetails));
  }
}
