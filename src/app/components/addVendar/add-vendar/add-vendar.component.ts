import { Component, OnInit ,Input} from '@angular/core';
import { RegistrationDetails, Country, State, City } from 'src/app/models/interfaces';
import { CountryStateCityService } from 'src/app/service/country-state-city/country-state-city.service';
import { CountryFlagService } from 'src/app/service/country-flag/country-flag.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { AddProductVendorComponent } from '../../addProductVendor/add-product-vendor/add-product-vendor.component';

interface countryFlag{
  name:string;
  code:any;
  dial_code:any;
  flag:any;
}
@Component({
  selector: 'b2b-add-vendar',
  templateUrl: './add-vendar.component.html',
  styleUrls: ['./add-vendar.component.css']
})
export class AddVendarComponent implements OnInit {

  addvendar:boolean=true
  product_id :any =''
  constructor(private router: Router, private route: ActivatedRoute,private HotelService:HotelService,private CountryStateCityService:CountryStateCityService,private CountryFlagService:CountryFlagService,private AppserviceService:AppserviceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.product_id = params.get("expanded");
    })
  }

  
  
  addVendar(){

    // used in catalog table component 
    this.AppserviceService.cancelProducForm('brandProductVendor') 
    localStorage.removeItem("editVendorDetails");

    // subscriped in addProductVendorComponent and catalogTable component
    this.AppserviceService.brandPrimaryVendor(this.product_id) 

   }

}