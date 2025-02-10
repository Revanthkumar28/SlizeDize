import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { allproduct } from 'src/app/models/interfaces';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';

@Component({
  selector: 'b2b-ordered-products',
  templateUrl: './ordered-products.component.html',
  styleUrls: ['./ordered-products.component.css']
})
export class OrderedProductsComponent implements OnInit {
  nextNav: string = "";
  quoatationScreen:boolean=true
  productTable:boolean=false

  orderlist:boolean=false
  continueRow:boolean=true
  rfq='height:200px'
  count:any=0
  deatails:any= null
  constructor(private route: ActivatedRoute, private router: Router,private AppserviceService:AppserviceService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('next');
      if(id) {
        this.nextNav = id;
      } else {
        this.nextNav = "";
      }
    });

    // this.AppserviceService.notifi$.subscribe((x)=>{
    //   this.count = x
    //       // localStorage.setItem('count', JSON.stringify(this.count));
    //       if(this.count == 'Request For Quotation'){
           
    //       this.router.navigate([{next: this.count}], {relativeTo: this.route});
    //         } 
    //  console.log(x)
    // })
    
   
  }
  continute(){
    // this.quoatationScreen=true
    // this.orderlist=false
    // this.productTable=false
    // this.continueRow=false
    this.deatails = JSON.parse( sessionStorage.getItem('registration')!);
    // this.deatails= sessionStorage.getItem("registration")
    // console.log(this.deatails)
    //  this.deatails= sessionStorage.getItem("registration");

    this.count++
    localStorage.setItem('count', JSON.stringify(this.count));
    this.AppserviceService.count(this.count)
   }
  pushOrder(){
    this.quoatationScreen=false
    this.orderlist=true
    this.productTable=false
    this.continueRow=false
  }
 

}
