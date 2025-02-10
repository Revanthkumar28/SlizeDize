import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router ,NavigationEnd} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'b2b-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.css']
})
export class SteperComponent implements OnInit {
  @Input() stepperStyle: string = "";
  @Input() stepperStyle1: string = "";
  @Input() stepperStyle2: string = "";

  @Input() stepperStyle3: string = "";

  @Input() height: string = "";
  @Input() width: string = "";

  @Input() backgroundTheme: string = "";
  @Input() step_1_backgroundTheme: string = "";
  @Input() step_2_backgroundTheme: string = "--color-green";
  @Input() step_3_backgroundTheme: string = "--color-orange";
  currentUrl :any = ''
  viewHotelDetailes :any = ''
  edit_hotel_details : any = ''
  constructor(private router: Router, private route: ActivatedRoute,private location:Location) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      let id = params.get("viewId");
      let customBrand = params.get("customBrand");

      if (id) this.viewHotelDetailes = id;

      
    })

    this.route.paramMap.subscribe((params) => {
      let id = params.get("ids");
      let customBrand = params.get("customBrand");
      if (id) this.edit_hotel_details = id;
    })
    
    this.currentUrl = this.location.path();

    console.log(this.currentUrl)
    if(this.width) {
      this.stepperStyle += "width: " + this.width + ";";
    }
    if(this.height) {
      this.stepperStyle += "height: " + this.height + ";";
    }
    if(this.backgroundTheme) {
      this.stepperStyle += "background-color: var(" + this.backgroundTheme + ");";
    }
    if(this.step_1_backgroundTheme) {
      this.stepperStyle1 += "background-color: var(" + this.step_1_backgroundTheme + ");";
    }
    if(this.step_2_backgroundTheme) {
      this.stepperStyle2 += "background-color: var(" + this.step_2_backgroundTheme + ");";
    }
    if(this.step_3_backgroundTheme) {
      this.stepperStyle3 += "background-color: var(" + this.step_3_backgroundTheme + ");";
    }

    if (this.currentUrl === '/registration') {
      this.stepperStyle2 = "background-color: var(--color-dark-dim-white);";
      this.stepperStyle3 = "background-color: var(--color-dark-dim-white);";
    } else if (this.currentUrl === '/detail-information') {
        this.stepperStyle2 = "background-color: var(--color-orange);";
        this.stepperStyle3 = "background-color: var(--color-dark-dim-white);";
    } else if (this.currentUrl === '/catalog') {
        this.stepperStyle2 = "background-color: var(--color-orange);";
        this.stepperStyle3 = "background-color: var(--color-orange);";
    } else {
        this.stepperStyle2 = "background-color: var(--color-dark-dim-white);";
        this.stepperStyle3 = "background-color: var(--color-dark-dim-white);";
    }
    
  }

  redirectHotelRegister(){

    if(this.viewHotelDetailes == '' && this.edit_hotel_details == ''){
      // this.router.navigate(["/registration"]);
    }
  }

  redirectHotelRoom(){
    if(this.viewHotelDetailes == '' && this.edit_hotel_details == ''){
      // this.router.navigate(["/detail-information"]);
    }
  }

  redirectHotelCatalog(){
    if(this.viewHotelDetailes == '' && this.edit_hotel_details == ''){
      // this.router.navigate(["/catalog"]);
    }
  }

}
