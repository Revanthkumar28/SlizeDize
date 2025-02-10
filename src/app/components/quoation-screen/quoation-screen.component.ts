import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'b2b-quoation-screen',
  templateUrl: './quoation-screen.component.html',
  styleUrls: ['./quoation-screen.component.css']
})
export class QuoationScreenComponent implements OnInit {
  tableHeading: string[] = ["Item", "Req Date", "Delivery", "Lead Time", "Dept.", "Qty", "Price", "Tax", "Shipment Cost", "Total Amount", "Price Comparision", "Shipment Status", "PO Stage", "Supplier"];
  tableColumnSpacing = "14*minmax(87px,0.3fr)";
  
  buttons: Record<string, string>[] = [
    {"name": "VENDORS","active": "false"}, 
    {"name": "NAME","active": "true"}, 
    {"name": "RATING","active": "true"}, 
    {"name": "STATUS","active": "true"}, 
    {"name": "REMARKS","active": "true"}];
    catalog: any = [
      {
        "name": "Lamp",
        "depricated": "No",
        "area": "Restaurant",
        },
        {"name": "Lamp",
        "depricated": "No",
        "area": "Restaurant",
        },
        {"name": "Lamp",
        "depricated": "No",
        "area": "Restaurant",
        },
        
        
      ]
    // tableHeading: string[] = ["Preffered Vendars","Name", "Rating", "Status","Vendar Remarks"];
   
    columnSpacing='4*2fr 1*1fr'
    deatails:any=''
    request:any=''
    delivery_date:any=''
    productTable_2:any=''
    product_image:any=''
    product_name:any=''

   
   
    buttonaname:any=''
    link:any=''
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.productTable_2  =JSON.parse(localStorage.getItem('expand_data')!)
    // this.product_image = this.productTable_2.product
    // this.product_name = this.productTable_2.productName


    // this.deatails = JSON.parse( sessionStorage.getItem('registration')!);
    // console.log(this.deatails.lead_time)
    // this.request=this.deatails.req_date
    // this.delivery_date=this.deatails.delivery
  }
  buttonClicked(buttonName: string) {
    if(buttonName) {
      for(let i of this.buttons) {
        if(i["name"] == buttonName) {
          i["active"] = "true";
        }
        else {
          i["active"] = "true";
        }
      }
    }
}
productTableDetail(e:any){
  // this.productTable=true
  // this.quoationscreen=false
 
  // this.link=e
  // if(this.productTable=e)

  // this.router.navigate([{expanded: this.buttonaname, nav:this.buttons[0]}], {relativeTo: this.route});
}
}

  
