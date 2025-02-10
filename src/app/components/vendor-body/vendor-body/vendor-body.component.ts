import { Component, OnInit,Input ,EventEmitter,Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'b2b-vendor-body',
  templateUrl: './vendor-body.component.html',
  styleUrls: ['./vendor-body.component.css']
})
export class VendorBodyComponent implements OnInit {

  @Input() backgroundTheme: string = "";
  @Input() vendorAllProductsArr:any = []
  @Input() directOrderArray :any = []
  @Input() vendor_id:any = ''
  bgColor: string = "";
  buttons: Record<string, string>[] = [{"name": "Purchase Order"}, {"name": "All Documents"},{"name": "Copilot-Comparision Marketplace"},{"name": "All Vendors"}];
  selectedButton = "";
  expandedId: string = "";

  @Input() rfqRequrest:any = []
  process_nav :any = ''
  
  constructor(private router: Router, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe((params) => {
      let id = params.get("expanded");
      let process = params.get("process");
      if(process) this.process_nav = process

      let buttonNav = params.get("nav");
      if(id) this.expandedId = id;
      if(buttonNav) {
        this.selectedButton = buttonNav;
      } else {
        this.selectedButton = this.buttons[0]['name'];
      }
    });
  }
  ngOnInit(): void {
    if(this.backgroundTheme) {
      this.bgColor += "var(" + this.backgroundTheme + ")";
    }
  }
  buttonClicked(buttonName: string) {
    this.selectedButton = buttonName;
    this.router.navigate([{expanded: this.expandedId,process :this.process_nav, nav: buttonName}], {relativeTo: this.route});
  }

  clickHandler(event: string) {
    if(event != '') {
      this.router.navigate([{next: event}], {relativeTo: this.route});
    }
  }
}
