import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';

@Component({
  selector: 'b2b-expanded-view',
  templateUrl: './expanded-view.component.html',
  styleUrls: ['./expanded-view.component.css']
})
export class ExpandedViewComponent implements OnInit {
  buttons: Record<string, string>[] = [{"name": "Order Cycle"}, {"name": "All Documents"}, {"name": "Specification & Warranty"}, {"name": "Lifecycle / Usage Management"}, {"name": "Copilot - Comparison Marketplace"}, {"name": "All Vendors"}];
  selectedButton = "";
  expandedId: string = "";
  HotelId :string = ''
  productType : any = ''

  @Input() specifcationAndWarrenty :any = []
  
  constructor(private router: Router, private route: ActivatedRoute,private AppserviceService:AppserviceService) { 
    this.route.paramMap.subscribe((params) => {
      let id = params.get("expanded");
      let buttonNav = params.get("nav");
      this.productType = params.get("productType");
      if(id) this.expandedId = id;

      if(buttonNav) {
        this.selectedButton = buttonNav;
      } else {
        this.selectedButton = this.buttons[0]['name'];
      }
    });


    this.route.paramMap.subscribe((params) => {
      let id1 = params.get("ids");
      if (id1) this.HotelId = id1
    })
    // buttons: Record<string, string>[] = [{"name": "Order Cycle"}, {"name": "All Documents"}, {"name": "Specification & Warranty"}, {"name": "Lifecycle / Usage Management"}, {"name": "Copilot - Comparison Marketplace"}, {"name": "All Vendors"}];

    this.AppserviceService.role$.subscribe((role_prvilage:any) =>{
      this.buttons = this.buttons.filter((item:any) => {
        if ((role_prvilage.includes(162) || role_prvilage.includes(163) || role_prvilage.includes(271) || role_prvilage.includes(272)) && item.name === 'Order Cycle') return true;
        // if (role_prvilage.includes(163) && item.name === 'Order Cycle') return true;
        if (role_prvilage.includes(166) && item.name === 'All Documents') return true;
        if (role_prvilage.includes(161) && item.name === 'Specification & Warranty') return true;
        if (role_prvilage.includes(160) && item.name === 'Lifecycle / Usage Management') return true;
        if (role_prvilage.includes(167) && item.name === 'Copilot - Comparison Marketplace') return true;
        if (role_prvilage.includes(159) && item.name === 'All Vendors') return true;
        if (role_prvilage.includes(1)) return true;

        return false;
      });
    })


  }

  ngOnInit(): void {
    // this.router.navigate([{next: this.count}], {relativeTo: this.route});
  }

  buttonClicked(buttonName: string) {
    this.selectedButton = buttonName;
    this.router.navigate([{ids : this.HotelId,productType :this.productType,expanded: this.expandedId, nav: buttonName}], {relativeTo: this.route});
  }

  clickHandler(event: string) {
    if(event != '') {
      this.router.navigate([{next: event}], {relativeTo: this.route});
    }
  }
}
