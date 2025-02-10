import { Component, OnInit,Input} from '@angular/core';
import {HotelService} from 'src/app/service/hotel/hotel.service'
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';

@Component({
  selector: 'b2b-specification-warranty',
  templateUrl: './specification-warranty.component.html',
  styleUrls: ['./specification-warranty.component.css']
})
export class SpecificationWarrantyComponent implements OnInit {
  @Input() specifcationAndWarrenty:any = []

  specificationData: {title: string, items: any} = {
    title: "Specification", 
    items: []
  };

  specification:any = [
    {
      key : 'test 1',
      value : 'test 1'
    },
    {
      key : 'test 2',
      value : 'test 2'
    }
  ]

  // temporary product spec
  temp:any ={
    Hotel_id : "",
    product_id :""
  }

  productSpecification :any = {}
  brandProductSpec:any = []
  brandproductimage:any=''
  vendorproductimage:any=''
  VendorProductSpec:any = []
  constructor(private HotelService:HotelService, private router: Router, private route: ActivatedRoute,private AppserviceService:AppserviceService,private authService: AuthServiceService) { }
  product:any=''
  brandproductlink =''
  openlink:any=''
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();

    
      this.openlink = this.HotelService.projecturl()
      this.route.paramMap.subscribe((params) => {
        console.log(params)
        let id = params.get("expanded");
        console.log(id)
        this.product = this.logMessage(id)
        console.log(this.product)
        if (id) this.temp.product_id = id;
        if(this.product == 'Brand'){
          this.brandproductlink = this.HotelService.projecturl()+'/brand_view_products/'+this.temp.product_id
        }else{
         this.brandproductlink = this.HotelService.projecturl()+'/vendor_view_products/'+this.temp.product_id
   
        }
   
      })
  
      this.route.paramMap.subscribe((params) => {
        let id = params.get("ids");
        if (id) this.temp.Hotel_id = id;
      })
      console.log(this.specifcationAndWarrenty)
  
          this.brandProductSpec = this.specifcationAndWarrenty.productSpec ? this.specifcationAndWarrenty.productSpec : []
      this.brandproductimage =  this.brandProductSpec.image
      if(this.isLoggedIn){

      this.VendorProductSpec = this.specifcationAndWarrenty ?  this.specifcationAndWarrenty.vendorSpec :[]
      this.vendorproductimage =   this.VendorProductSpec.product_image[0].vendor_product_img || this.VendorProductSpec.product_image
      console.log(this.vendorproductimage)
      }else{
        const newarry = {
          ProdId:'2343434',
          image:[],
          pdf:[],
          product_image:[],
          spec:[{vendor_key:'Good',vendor_value:'1'}],
          vendor_product_sku:'2345',
          vendor_product_warranty:'1'
        }
        this.VendorProductSpec = newarry
        this.vendorproductimage = 'assets/chair.jpg'
      }
    
      console.log(this.specifcationAndWarrenty)
  
   
    
    // this.HotelService.connectAPI("POST","/temporary_product_tracking_by_user",this.temp).subscribe((res) => {
    //   console.log(res)
    //   this.productSpecification = res 
    //   const spec = this.transformApiResponse(res.temporaryProduct)
    //   this.specificationData.items = spec.items
    //   console.log(spec)
    // })

    
  }


  transformApiResponse(apiResponse: any) {
    const items = [];

    // Assuming the API response is stored in apiResponse variable
    for (let i = 1; i <= 6; i++) {
      const key = apiResponse['key' + i];
      const value = apiResponse['value' + i];
      
      if (key && value) {
        items.push({ key, value });
      }
    }

    const specificationData = {
      title: 'Read A Barton RB 1180 Spec',
      items: items
    };

    return specificationData;
  }
  logMessage(id:any) {
    let result:any=''
    if (/^\d+$/.test(id)) {
      result= 'Brand'
      return result
    } else if (/^v\d+$/.test(id)) {
      result= 'Vendor'
      return result
    } else {
      result= 'Unknown'
      return result
     
    }
  }
}
