import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';

@Component({
  selector: 'b2b-rfq-process-list',
  templateUrl: './rfq-process-list.component.html',
  styleUrls: ['./rfq-process-list.component.css']
})
export class RfqProcessListComponent implements OnInit {
  button_name: Record<string, string>[] = [
  {"name": "Pipeline Orders"},
  {"name": "RFQ-Compare"}, 
  {"name": "Released Orders"},
  {"name": "History"}
];
   expandedId:any=''
   selectedButton:any=''

   selectedTable :string = ''
   selectedHotel: string = ''
   productTypeTemp_brand :string = ''
  constructor(private router: Router, private route: ActivatedRoute,private AppserviceService:AppserviceService) {

    this.route.paramMap.subscribe((params) => {
      let id = params.get("expanded");
      if (id) this.selectedTable = id;
    })

    this.route.paramMap.subscribe((params) => {
      let id = params.get("ids");
      if (id) this.selectedHotel = id;
    })

    this.route.paramMap.subscribe((params) => {
      let productType = params.get("productType");
      if (productType) this.productTypeTemp_brand = productType;
    })

    this.route.paramMap.subscribe((params) => {
      let color = params.get("pipeLine");
      if (color) this.selectedButton = color;
    })

    this.AppserviceService.role$.subscribe((role_prvilage:any) =>{
      console.log(role_prvilage)
      this.button_name = this.button_name.filter((item:any) => {
        if ((role_prvilage.includes(271) || role_prvilage.includes(272) || role_prvilage.includes(162) || role_prvilage.includes(163)) && item.name === 'Pipeline Orders') return true;
        if ((role_prvilage.includes(271) || role_prvilage.includes(272) || role_prvilage.includes(189) || role_prvilage.includes(190) || role_prvilage.includes(193) || role_prvilage.includes(194)) && item.name === 'RFQ-Compare') return true;
        if ((role_prvilage.includes(272) || role_prvilage.includes(195)|| role_prvilage.includes(205) || role_prvilage.includes(214) || role_prvilage.includes(230) || role_prvilage.includes(233)) && item.name === 'Released Orders') return true;
        if ((role_prvilage.includes(272) || role_prvilage.includes(210) || role_prvilage.includes(211) || role_prvilage.includes(212)) && item.name === 'History') return true;
        if (role_prvilage.includes(1)) return true;

        return false;
      });
    })
    console.log(this.selectedButton)
    console.log(this.button_name)

      if( this.selectedButton ) {
        this.selectedButton 
      } else {
        this.selectedButton = this.button_name[0]['name'];
      }

      
    
   }

  ngOnInit(): void {
    
    // rfq-process-list , rfq order components
    // this.AppserviceService.rfqCompareGreenButton$.subscribe((d:any) =>{
    //   if(d == 'rfq'){
    //     this.selectedButton = 'RFQ-Compare'
    //   }else{
    //     this.selectedButton = 'Pipeline Orders'
    //   }
    // })

  }
  buttonclicked(buttonName: string) {
    this.selectedButton = buttonName;
    console.log(buttonName)

    this.router.navigate([{ids:this.selectedHotel ,expanded : this.selectedTable,productType : this.productTypeTemp_brand ,pipeLine:this.selectedButton }], { relativeTo: this.route });

  }

}
