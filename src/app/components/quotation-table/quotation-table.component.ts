import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';

@Component({
  selector: 'b2b-quotation-table',
  templateUrl: './quotation-table.component.html',
  styleUrls: ['./quotation-table.component.css']
})
export class QuotationTableComponent implements OnInit {
 
  buttons: Record<string, string>[] = [
  {"name": "VENDORS","active": "false"}, 
  {"name": "NAME","active": "true"}, 
  {"name": "RATING","active": "true"}, 
  {"name": "STATUS","active": "true"}, 
  {"name": "REMARKS","active": "true"}];
  next:any=''
  catalog: any = [
    {
      "name": "Welco",
      "depricated": "No",
      "area": "Restaurant",
      },
      {"name": "Welco",
      "depricated": "No",
      "area": "Restaurant",
      },
      {"name": "Welco",
      "depricated": "No",
      "area": "Restaurant",
      },
    ]
  tableHeading: string[] = ["Preffered Vendars","Name", "Rating", "Status","Vendar Remarks"];
  tableColumnSpacing = "1*0.1fr 4*0.1fr";
  // tableColumnSpacing ="1*minmax(84px,0.2fr)"
  columnSpacing='4*2fr 1*1fr'
  deatails:any=''
  request:any=''
  delivery_date:any=''
  continueButton:boolean=true


  statusOrderTable:boolean=false
  rfqOrder:boolean=false
  approvalProcess:boolean=false
  orderProcess:boolean=false
  orderList:boolean=false
  quoationScreen:boolean=false

  selectedButton:any=''
  expandedId:any=''
  constructor(private router: Router, private route: ActivatedRoute,private authService: AuthServiceService) {
    
  }
  isLoggedIn:boolean=false

  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();

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
  
  contuneButton(){
 if(this.continueButton=false){

 }
 else{
  this.statusOrderTable=true
 }
  
} 
rfqQuation(){
  this.continueButton=true
  this.statusOrderTable=false
  this.rfqOrder=false
  this.approvalProcess=false
  this.orderProcess=false
  this.orderList=false

}

rfqCompare(){
  this.continueButton=false
  this.statusOrderTable=true
  this.rfqOrder=false
  this.approvalProcess=false
  this.orderProcess=false
  this.orderList=false


}
pipelineOrderList(){
 
  this.continueButton=false
  this.statusOrderTable=false
  this.rfqOrder=true
  this.approvalProcess=false
  this.orderProcess=false
  this.orderList=false

}
approvalProcss(){
  this.continueButton=false
  this.statusOrderTable=false
  this.rfqOrder=false
  this.approvalProcess=true
  this.orderProcess=false
  this.orderList=false

}
orderProces(){
  this.continueButton=false
  this.statusOrderTable=false
  this.rfqOrder=false
  this.approvalProcess=false
  this.orderProcess=true
  this.orderList=false
}
orderLists(){
  this.continueButton=false
  this.statusOrderTable=false
  this.rfqOrder=false
  this.approvalProcess=false
  this.orderProcess=false
  this.orderList=true

}

}