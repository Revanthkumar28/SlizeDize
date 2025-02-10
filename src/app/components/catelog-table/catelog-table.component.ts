import { Component, Input, OnInit ,Output,EventEmitter,ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { DatePipe } from "@angular/common";
import { NgToastService } from 'ng-angular-popup';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateTime } from 'luxon';
import { concat } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';
import { DemohotelService } from 'src/app/service/demohotel.service';


@Component({
  selector: 'b2b-catelog-table',
  templateUrl: './catelog-table.component.html',
  styleUrls: ['./catelog-table.component.css'],
})
export class CatelogTableComponent implements OnInit {
  catelogTable: string[] = ["Product Image","Product Name","Category","Sub Category" , "Placement","Hotel wide Usage","Order Frequency","Vendor","Vendor Lead Time",   "Last Ordered Quantity", "Box (Case) Quantity", "Last Ordered Price","Sales Tax / GST(%)" ,"ESG","Manufactured", "Price Comparision",  "Potential Savings"];
  catelogColumnSpacing = "17*1fr 0.2fr";
  catelogColumnSpacing2 = ".5fr .2fr  1fr .2fr 1fr .2fr 1fr .2fr 1fr .2fr 1fr  .2fr 1fr .2fr 1fr .2fr 1fr .2fr 1fr .2fr 1fr  .2fr 1fr .2fr 1fr .2fr 1fr  .2fr 1fr  .2fr 1fr .2fr 1fr .2fr .5fr";
  catalogheadings ="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr .1fr 1fr 1fr 1fr .7fr";
  searchColumnSpacing = "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.6fr"
  productclick: boolean = false
  now: any | null = null;
  base_id: any = 'PR-1-2011201-'
  // puchase_id: any = ''                            clean---
  product_id: any = ''
  // id: any = ''      
  sr_vendor:any=[]
  demo_status:any = 0
  @Output() cancelfilter = new EventEmitter();    
  vendor_company: any = []
  why_this_vendor:any = []
  // brand_by: any = []                              clean---
  // brandBy_item: any = []                          clean---
  // t: any = []
  // t1: any = []
  // t2: any = []
  // t3: any = []
  // t4: any = []
  // t5: any = []
  // t6: any = []
  // t7: any = []
  // t8: any = []
  // t9: any = []
  // t10: any = []
  // t11: any = []                                   clean---


  // e1: any = []
  // e2: any = []
  // e3: any = []
  // e4: any = []                                    clean---

  // line_item_image: any = ''                       clean---
  // line_item_name: any = ''                        clean---
  // line_item_price: any = ''                       clean---
  // line_item_sku: any = ''                         clean---

  user_name: any = ''
  // productBy_brand: any = []                       clean---
  // brand_name_id: any = ''                         clean---
  // short_description: any = ''                     clean---
  // box_quantity: any = ''                          clean---
  // manufactured: any = ''                          clean---
  // lead_time: any = ''                             clean---


  p_requestArr: any = []
  // p_request: any = {
  //   purchase_id: '',
  //   product_id: '',
  //   required_qty: '',
  //   required_by: '',
  //   vendor: '',
  //   case_qty: '',
  //   approx_price: '',
  //   approx_shipping_cost: '',
  //   remarks: '',
  //   price_request_prefference: ''

  // }                                              clean---

  // hotel_id: any = 'loki'                         clean---
  test: any = ''
  // test_2: any = ''                               clean---
  // test_3: any = ''                               clean---
  test_5: any = ''
  test_6: any = ''
  // search: any = ''                               clean---

  // Filter All product value

  fields: any = {
    brand_products_name: '',
  };

  filter_fields: any = ['brand_products_name','categories_name']
  placementData: any = {
    placement: "",
    Hotel_Name_id: "",
    Product_id: "",
  }
 
  purChaseRequest: any = {
    vendor_id: "0",
    product_id: "0",
    Hotel_Name_id : '1700222719920',
    purchase_request_random: 1000,
    required_quantity: "22",
    requested_on: "22-nov-2023",
    vednor: "",
    why_this_vendor: "no",
    case_quantity: '1',
    approximate_price: "2",
    approximate_shipping_cost: "2",
    remarks: "no",
    vp:'0',
    price_request_preference: "RFQ-Request",
    department_id : ""
  }

  serviceRequest_form: any = {
    type_of_users :"1",
    product_id: "1",
    Hotel_Name_id : '',
    service_request_random: "1",
    current_condition: "",
    required_by: "",
    remarks: "",
    // requested_by: "4",
    image : "",
    vp:'',
    vendor :"",
    vendorname:'',
    Rooms:'',

  }
product_vp:any=''
  currentUser: any = ''
  selectedTable: any = '';
  servicerequset: boolean = false
  puechaserequest: boolean = false
  filterTable: any = ''
  dateString: any = ''
  send_date:any =''
  vendor_brand_name: any = ['Welco', 'Stainer']
  request_type: any = ['Direct Order', 'RFQ-Request']

  prefered_vendor: any = []
  esg: any = []
  current_condition_Array: any = ["Not Usable", "Maintenance"]

  hotelWideUsage: any = {
    hotel_wild_usage: '1222',
    Hotel_Name_id: '11',
    Product_id: '11'
  }
  orderFrquency: any = {
    order_frequency: '',
    Hotel_Name_id: '',
    Product_id: ''
  }
  hotelwidedata: any = ""
  orderFrequencyData: any = ""

  all_products:any=[]
  all_temp:any =[]
  catagory: any = []
  maxValue: any = []
  minValue: any = []
  price: any = []
  seat: any = []
  placementdata: any = ""
  order_frequncy_data: any = ["1 week", " 2 Week", "One Month", "Two Month", "Six Month", "One Year","More than a Year"]

  placement_value: any = ""
  hotelwide_value: any = ""
  order_frequency_value: any = ""
  demo_vendors:any =[]

  isClone_product: boolean = false

  get_added_product: any = []

  // delete_product:any = {
  //   Hotel_Name_id : '',
  //   Product_id: '',
  //   City :''
  // }
  addProductLocalData: any = []
  myarray: any = []

  delete_hotel_product: any = {
    Hotel_Name_id: '',
    id: '',
  }

  delete_temporary_product: any = {
    hotel_id: '',
    id: '',
  }

  // Amaz cart changes

  hotel_uniqid: any = {
    hotelNameId: ''
  }

  // Amaz cart changes


  roomdatas: any = ""
  products: any = []

  max_value: any = ""
  min_value: any = ""
  psavings: any = ""


  product: any = []

  
  imageFile: File | null = null;
  serviceImageFile: File | null = null;

  temp:any =[]

  hotelnameid:any=""
  objectKeys = Object.keys
  
  hotelId:any = ''
  isAllRequireData :boolean = false
  isSRrequiredData:boolean = false

  isPlacement:boolean = false

  TempORbrand:string = ''
  purchaseRequestVendorID:any = ''
  productUnSubscripe :any = ''
  
  HotelId :any = ''
  caseQtyCount :number = 0
  approxPrice  :number = 0

  unsubscrip_Products :any = ''
  oneProductPrice : any = ''
  formetDate:any = ''
  PRButtonDisabled:boolean = false
  // serviceImageFiles:any = []
  baseBoxQuntity :any = ''
  isLoading :boolean = false 
  isDropdown :boolean = false
  department_details:any = []
  userType_role:any = ''

  // PAGINATION
  items: any[] = [];
  paginatedItems: any[] = [];
  currentPage: number = 1;
  pageSize: number = 7;
  totalItems: number = 0;
  isTemporaryProduct:boolean = true
  @ViewChild('signinForm') signinForm!: ElementRef;
  constructor(private HttpClient : HttpClient , private router: Router, private toast: NgToastService, private route: ActivatedRoute, private AppserviceService: AppserviceService, private HotelService: HotelService,private authService: AuthServiceService,private DemohotelService :DemohotelService) {
  }
  isLoggedIn:boolean=false
  demo_product_id:any=0
  demo_product:any=[]
  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();
  if(!this.isLoggedIn){
    this.HotelService.demo_hotel().subscribe((data: any) => {
      console.log(data)
      this.show_demo_products(data.products) 
      this.products = this.demo_product
      this.route.paramMap.subscribe((params) => {
        this.demo_product_id = params.get("expanded");
      })
      
    },err =>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })
    this.HotelService.demo_vendor().subscribe((d: any) => {
      this.vendor_company =[]
         this.demo_vendors = d.vendor
         console.log(this.demo_vendors)
         this.AppserviceService.demoVendors(d)
         this.demo_vendors.forEach((org:any)=>{
             org.companyName = org.vendor_company
             org.vendor_id = org.id
             this.vendor_company.push(org)

         })
         console.log(this.vendor_company)

    })
    this.AppserviceService.country_price_symbol('$')

  }
    this.AppserviceService.reload_data$.subscribe(d => {
      if(d == 'reload_readyforpay'){
        if(this.isLoggedIn){
          this.Products(this.HotelId,'')

        }
      }
    })
    this.cancelfilter.emit(false)
    const datePipe = new DatePipe('UTC');
    // this.now = new Date();
    this.AppserviceService.filterTable$.subscribe((data) => {
      this.filterTable = data
    })

    const today = new Date();
    this.now = today.toISOString().split('T')[0];
    
    this.route.paramMap.subscribe((params) => {
      let id = params.get("expanded");
      this.selectedTable = id;
    })
    
    this.route.paramMap.subscribe((params) => {
      let i = params.get("ids");
      let navHotel = params.get("nav_hotel");
      if (i) this.HotelId = i
      this.serviceRequest_form.Hotel_Name_id = i

      if(navHotel == 'yes'){
        this.selectedTable = ''
        this.products = []
        this.temp = []
        this.paginatedItems = []
        if(this.isLoggedIn){

        this.Products(this.HotelId,'')
        }
        // ADMIN DEPARTMENT DETAILS
        this.userType_role = JSON.parse(localStorage.getItem('currentUser') || "[]")
        if(this.userType_role != null && this.userType_role.user_type == "ho"){
          const payload = {
            Hotel_Name_id : this.HotelId
          }

          this.HotelService.hotel_budget_view(payload).subscribe((res) =>{
            this.department_details = this.removeDuplicatesByProperty(res.budgets,'department')
          })
        }
      }
    })
    if(this.isLoggedIn){
      this.HotelService.user_name().subscribe(datas => {
        this.user_name = datas
      })

      this.HotelService.drop_down_values().subscribe(datas => {
        this.why_this_vendor = datas.whyThisVendor
        // let  vendorsr:any = []
        //      vendorsr = datas.SR_vendor
        //      vendorsr.forEach((element:any)=>{
  
        //      })
        // this.sr_vendor =datas.SR_vendor
      })
    }
  

  
    
    // aad-product-vendor , add-vendar
    this.AppserviceService.cancelProducForm$.subscribe(datas => {
      if(datas == 'exit'){
        this.isClone_product = false
      }
      if(datas == 'editOpen'){
        this.isClone_product = true
      }
      if(datas == 'brandProductVendor'){
        this.isClone_product = true
      }
    })
    if(this.isLoggedIn){
      this.HotelService.getDetails().subscribe((data :any) =>{
        this.test = data 
        this.hotelId = JSON.parse(localStorage.getItem('hotelNameId') || "[]")
        
        // this.AppserviceService.hotel_id(this.test.hotel_registrations[0])
        if(this.hotelId != ''){
          this.test.hotel_registrations.forEach((datas:any) =>{
            if(datas.Hotel_Name == this.hotelId.hatelName){
              // this.AppserviceService.hotel_id(datas)
            }
          })
        }
        else{
          // this.AppserviceService.hotel_id(this.test.hotel_registrations[0])
        }
      })
    }
  

    this.get_added_product = []
    this.temp = []
    this.hotel_uniqid.hotelNameId = ''

    // DASHBOARD APPAR 
    this.AppserviceService.notifyExpandProduct$.subscribe(expand =>{
      console.log(expand)
      if(expand){
        this.products = []
        this.selectedTable = ''
        if(this.isLoggedIn){

        this.Products(expand.Hotel_Name_id,expand)
        }
        // const expanpDetails = this.products.find((prod:any) => prod.id == expand.action_id[0])
        // if(expanpDetails){
        //   this.testtt(expanpDetails,expanpDetails.vendorId,expanpDetails.vendors)
        // }
        // if(expand.status == '7'){
        //   this.router.navigate([{ids: expand.Hotel_Name_id, expanded: expand.action_id[0],pipeLine:'RFQ-Compare'}], { relativeTo: this.route });
        // }else{
        //   this.router.navigate([{ids: expand.Hotel_Name_id, expanded: expand.action_id[0]}], { relativeTo: this.route });
        // }
      }
    })
  // product Vendor list
  this.dateTime()  
    this.AppserviceService.procurement_data$.subscribe(d => {
      console.log(d)
      this.products=[]
      this.temp =[]
      if(d == 'refresh'){
        this.isTemporaryProduct = true
        if(this.isLoggedIn){
          this.products = this.all_products

        }else{
          this.products = this.demo_product
        }
        this.temp = this.all_temp
        this.cancelfilter.emit(false)
      }else{
        console.log(d)
        const normal_product = d.filter((org:any)=> !org.startsWith('t'));
        const temp_products = d.filter((org:any)=> org.startsWith('t'));
        console.log(normal_product)
        console.log(temp_products)
        if(this.isLoggedIn){
          if(normal_product != null && normal_product.length != 0){
            this.selectedTable = ''
            this.isTemporaryProduct = temp_products.length == 0 ? false : true
            normal_product.forEach((element:any) => {
              this.cancelfilter.emit(true)
               this.products.push(this.filterProducs(element,'np')) 
            });
          }
          
           if(temp_products != null && temp_products.length != 0){
            this.selectedTable = ''
           
            // this.isTemporaryProduct = true
            temp_products.forEach((element:any) => {
              this.cancelfilter.emit(true)
               this.temp.push(this.filterProducs(element,'tp')) 
            });
          }
  
        }else{
          if(normal_product != null && normal_product.length != 0){
            this.selectedTable = ''
            normal_product.forEach((element:any) => {
              this.cancelfilter.emit(true)
               this.products.push(this.filterProducs(element,'dp')) 
            });
          }
        }
       
        // }else{
        //   this.products = this.all_products
        // }
       
      }
      
      // PAGINATION
      this.getItems()
    })
    this.AppserviceService.changehotel$.subscribe((hotel:any) =>{
      if(hotel == 'hotelchanged'){
        this.serviecrequestcancel()
        this.exit()
      }
    })

    // TOUR-GUIDE
    this.AppserviceService.guideTour$.subscribe((res:any) =>{
      if(res == '.tour-purchase-request'){
        this.selectedTable = this.products[0].id
        this.router.navigate([{ids: this.HotelId, expanded: this.selectedTable}], { relativeTo: this.route });
      }
    })
  }

  selectvendor(vendorID:any , vendorname:any){
    this.serviceRequest_form.vendorname = vendorname
    this.serviceRequest_form.vendor = vendorID      
  }
  filterProducs(productId:any, type:any){
    if(type == 'np'){
      const arr = this.all_products.find((product:any) => product.id == productId)
      return arr
    }else if(type == 'dp'){
      const arr = this.demo_product.find((product:any) => product.id == productId)
      return arr

    }else{
      const arr = this.all_temp.find((product:any) => product.id == productId)
      return arr
    
      
    }
   
  }
  PuchaseRqtdateFormet(event:any){
    this.purChaseRequest.requested_on = event
    this.formetDate = this.formatDate(this.purChaseRequest.requested_on)
  }
  serviceRqtdateFormet(event:any){
    this.serviceRequest_form.required_by = event
    this.formetDate = this.formatDate(this.serviceRequest_form.required_by)
  }

  dateTime() {
    // Get current date and time using Luxon
    const currentDate = DateTime.local();
    // Get the month abbreviation
    const monthAbbreviation = currentDate.toFormat('LLL'); // 'LLL' gives the abbreviated month name
    // Format date in 'dd-MMM-yyyy' format
    const formattedDate = currentDate.toFormat('dd') + '-' + monthAbbreviation + '-' + currentDate.toFormat('yyyy hh:mm:ss a');
   const sendtodaydate =currentDate.toFormat('dd') + '-' + monthAbbreviation + '-' + currentDate.toFormat('yyyy');
    // Assign the formatted date to dateString
    this.dateString = formattedDate;
    this.send_date = sendtodaydate;

  }

  isAllDrop(){
    this.isDropdown = !this.isDropdown
  }

  currency_symbol:any = ''
  Products(hotelId:any,negotiation:any){
    this.isLoading = true
    this.hotel_uniqid.hotelNameId = hotelId
    
    this.HotelService.brandBy_data(this.hotel_uniqid).subscribe((datas: any) => {
      this.products = []
      this.paginatedItems = []
      this.sr_vendor = datas.SR_vendor
      console.log(this.sr_vendor)
      this.AppserviceService.serviceVendor(datas.vendors)
      console.log(datas.hotel.Country)
      this.AppserviceService.Hotel_country(datas.hotel.Country)
      this.currency_symbol =  datas.hotel_countery.currency_symbol
      this.AppserviceService.country_price_symbol(datas.hotel_countery.currency_symbol)
      // addProductVendor Components
      this.AppserviceService.temporaryProductVendor(datas.vendors)
      // New Products 
      // this.AppserviceService.newProductNotify(datas.new_products)
      // vendor by brand
      this.AppserviceService.hotelLogoImage(datas.hotel)
      const vendorBrandArr:any = []
      let split_values:any = []

      // this.products = datas.products
      if(datas.products.length == 0){
        this.isLoading = false
      }
      if(datas.products.length > 0){
        this.isLoading = false
        let coproducts:any = []
        coproducts = coproducts.concat(datas.products,datas.v_products)
         for (const outerArray of coproducts) {
          for (let innerObject of outerArray) {
            // Access properties of innerObject here
            // innerObject.brand_product_specs = innerObject.brand_product_specs
            // innerObject.vendor_product_specs = innerObject.vendor_product_specs
            innerObject.product_pdf = innerObject.brand_product_pdf ? innerObject.brand_product_pdf : innerObject.product_pdf

            innerObject.product_image = innerObject.vendor_product_images ? innerObject.vendor_product_images[0].key:innerObject.product_image[0].key
            innerObject.last_ordered_price_1 = innerObject.last_ordered_price != null ? parseFloat(innerObject.last_ordered_price) : 0
            innerObject.TAX_1 = innerObject.TAX != null && innerObject.TAX != "null" ? innerObject.TAX : 0 
            innerObject.last_ordered_quantity_1 = innerObject.last_ordered_quantity != null ? innerObject.last_ordered_quantity : '0'
            innerObject.vendor_lead_time_1 = innerObject.vendor_lead_time != null && innerObject.vendor_lead_time != 'null' ? innerObject.vendor_lead_time : '0'
            innerObject.last_box_quantity_1 = innerObject.last_box_quantity != null && innerObject.last_box_quantity != "null" ? innerObject.last_box_quantity : '0'
            // innerObject.vendors = this.get_vendor_categories(innerObject.category,datas.vendors)
            innerObject.vendors = datas.vendors
            innerObject.sort_brand_prod_name = this.transformPlacementData(innerObject.brand_products_name)
            innerObject.sort_categories_name  = this.transformPlacementData(innerObject.categories_name)
            innerObject.sort_sub_categories_name = this.transformPlacementData(innerObject.sub_categories_name)
            innerObject.brand_or_last_vendor_name = innerObject.vendor_name == null ? '-' : this.transformPlacementData(innerObject.vendor_name)
            innerObject.specification = this.specificationWarranty(innerObject)

            this.products.push(innerObject)
            // Add more properties as needed
            }
          }
        }
       
      // ADD MAXIMUM , MINIMUM VALUE COMPARE USE CATAGORY ID
      this.products.forEach((element:any) => {

        element.minValue =element.lowest_price ? parseInt(element.lowest_price.price): 0
        element.maxValue = element.highest_price ? parseInt(element.highest_price.price):0
        if(element.last_ordered_price_1 > 0){
          const potential =  this.calculateSavingsPercentage(parseInt(element.last_ordered_price_1),parseInt(element.minValue)) 
          element.potencialSaving = parseInt(potential.toString())
        }else{
          element.potencialSaving = 0;
        }
        // element.potencialSaving = parseInt(((element.maxValue-element.minValue)/100).toString())
       
      });
      
      this.temp = this.temporary_products(datas.temporary_product)
      this.all_temp = this.temp
      this.all_products = this.products,
      this.totalItems = this.products.length;
      this.getItems()

      // NEGOTIATION VIA EXPANDED PRODUCTS ........................
      console.log(negotiation)
      if(negotiation && this.products.length > 0){
        this.selectedTable = negotiation.action_id[0]
        const expanpDetails = this.products.find((prod:any) => prod.id == negotiation.action_id[0])
        if(expanpDetails){
          this.testtt(expanpDetails,expanpDetails.vendorId,expanpDetails.vendors)
        }
        if(negotiation.status == '5' || negotiation.status == '6' || negotiation.status == '7' || negotiation.status == '8'){
          this.router.navigate([{ids: negotiation.Hotel_Name_id, expanded: negotiation.action_id[0],pipeLine:'RFQ-Compare'}], { relativeTo: this.route });
        }else if(negotiation.status == '3' || negotiation.status == '1d' || negotiation.status == '1r' || negotiation.status == '4' || negotiation.status == '31'){
          this.router.navigate([{ids: negotiation.Hotel_Name_id, expanded: negotiation.action_id[0]}], { relativeTo: this.route });
        }else{
          this.router.navigate([{ids: negotiation.Hotel_Name_id, expanded: negotiation.action_id[0],pipeLine:'Released Orders'}], { relativeTo: this.route });
        }
      }
      // this.vendor_company = datas.products
  
      // catalog component
      const all_products = this.products.concat(this.temp)
      
       console.log(all_products)
      this.AppserviceService.multibleSearch(all_products)

    },err =>{
      // this.toast.error({ detail: "ERROR", summary: err, duration: 3000 });
      this.isLoading = false
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 8000 });
    });
  }

  temporary_products(temp_product:any){
    temp_product.forEach((temp:any) => {
      temp.last_ordered_price_1 = temp.last_ordered_price != null ? parseFloat(temp.last_ordered_price) : 0
      temp.TAX_1 = '0'
      temp.vp ='2'
      temp.last_ordered_quantity_1 = temp.last_ordered_quantity ? temp.last_ordered_quantity : '0'
      temp.vendor_lead_time_1 = temp.vendor_lead_time && temp.vendor_lead_time != 'null' ? temp.vendor_lead_time : temp.lead_time
      temp.last_box_quantity_1 = temp.last_box_quantity && temp.last_box_quantity != "null" ? temp.last_box_quantity : temp.box_quantity
            // temp.vendors = this.get_vendor_categories(temp.category,datas.vendors)
            // temp.vendors = datas.vendors
      temp.brand_products_name = temp.product_Name
      temp.sort_categories_name = ''
      temp.sort_tem_prod_name = this.transformPlacementData(temp.brand_products_name)
      temp.sort_categories_name  = this.transformPlacementData(temp.categories_name)
      temp.sort_sub_categories_name = this.transformPlacementData(temp.sub_categories_name)
      temp.brand_or_last_vendor_name = temp.vendor_name == null ? '-' : this.transformPlacementData(temp.vendor_name)
      temp.specification = this.specificationWarranty(temp)
    });

    return temp_product
  }

  calculateSavingsPercentage(price1: number, minPrice: number): number {
    // Calculate percentage savings
    let percentage = ((price1 - minPrice) / price1) * 100;
    // Ensure the percentage is within the range of 0 to 100
    percentage = Math.min(100, Math.max(0, percentage));
    // Return percentage
    return percentage;
  }
  
  //FILTER_VENDOR_CATEGORIES
   get_vendor_categories(product_category:any,vendor_details:any){
    let vendor:any = []
    vendor_details.forEach((element:any) => {
     const vendor_categories_filter = element.category_ids.split(',')
     vendor_categories_filter.forEach ((id:any) => {
      if(product_category == id){
        vendor.push(element)
      }
     })
    });

    return vendor
   }

  //  SPECIFICATION AND WARRENTY
   specificationWarranty(specification:any){
    console.log(specification)
    // PRODUCT SPECIFICATION AND VENDOR SPECIFICATION
    if(specification.vp == '2'){
      const vendorSpec = {
        vendor_product_sku : specification.SKU_id,
        product_image :specification.product_image,
        ProdId : specification.id,
        spec :specification.vendor_product_specs,
        image :specification.product_image ,
        vendor_product_warranty : specification.vendor_product_warranty,
        pdf : specification.product_pdf[0].product_pdf,
         pdfName : specification.product_pdf_name[0].product_pdf_name,
        pdfImage : specification.pdf_image[0].pdf_image
      }
      const spec = {
        productSpec : [],
        vendorSpec : vendorSpec,
        tp :true
      }
  
      return spec

    }else{

    
    const brandPdf = []
       
      for(let i = 0 ; i < specification.product_pdf_image.length ; i++){
        const pdf = specification.product_pdf[ i >= specification.product_pdf.length ? 0 : i].key
        brandPdf.push({
          pdfImage : specification.product_pdf_image[i >= specification.product_pdf_image.length ? 0 : i].product_pdf_image,
          pdf : pdf != undefined ? pdf : specification.brand_product_pdf,
          pdfName : specification.vp == '1' ? specification.vendor_product_pdf_name[i >= specification.vendor_product_pdf_name.length ? 0 : i].vendor_product_pdf_name : specification.product_pdf_name[i >= specification.product_pdf_name.length ? 0 : i].product_pdf_name
        })
      }
    

    const productSpec = {
      ProdId : specification.id,
      spec : specification.vp == '1'?specification.vendor_product_specs: specification.brand_product_specs,
      image :specification.product_image,
      pdf : brandPdf,
    }

    // VENDOR PRODUCT SPECIFICATION
    const vendorPdf = []
    if(specification.vp == '1'){
      for(let i = 0 ; i < specification.deliver_product_pdf.length ; i++){
      
        vendorPdf.push({
          pdfImage :  specification.deliver_product_pdf_image[i >= specification.deliver_product_pdf_image.length ? 0 : i].product_pdf_image,
          pdf : specification.deliver_product_pdf[i >= specification.deliver_product_pdf.length ? 0 : i].deliver_product_pdf,
          pdfName : specification.deliver_product_pdf_name[i >= specification.deliver_product_pdf_name.length ? 0 : i].deliver_product_pdf_name
        })
      }
  
    }else{
      for(let i = 0 ; i < specification.vendor_product_pdf.length ; i++){
      
        vendorPdf.push({
          pdfImage :  specification.vendor_pdf_image[i >= specification.vendor_pdf_image.length ? 0 : i].pdf_image,
          pdf : specification.vendor_product_pdf[i >= specification.vendor_product_pdf.length ? 0 : i].product_pdf,
          pdfName : specification.vendor_pdf_name[i >= specification.vendor_pdf_name.length ? 0 : i].pdf_name
        })
      }
    
    }
    const vendorSpec = {
      vendor_product_sku : specification.vendor_product_sku,
      product_image :specification.vp =='1'? specification.deliver_product_images: specification.vendor_product_img,
      ProdId : specification.vendor_Product_id,
      spec :specification.vp =='1'? specification.deliver_product_specs :specification.vendor_product_specs,
      image :specification.vp =='1'? specification.deliver_product_pdf_image: specification.vendor_pdf_image,
      vendor_product_warranty : specification.vendor_product_warranty,
      pdf : vendorPdf,
      // pdfName : specification.vendor_pdf_name,
      // pdfImage : specification.vendor_pdf_image
    }

    const spec = {
      productSpec : productSpec,
      vendorSpec : vendorSpec,
       tp :false
    }
    
    return spec
    }
   }
  // MINIMUM VALUE FIND
  findMinPriceForCategory(category: any) {
    // Filter data for the specified category
    const categoryItems = this.products.filter((item:any) => item.category == category && typeof parseFloat(item.last_ordered_price_1) == 'number');
    console.log()
    // Find minimum price among the items for the specified category
    const minPrice = Math.min(
      ...categoryItems
        .filter((item: any) => parseFloat(item.last_ordered_price_1) > 0) // Filter items with price > 0
        .map((item: any) => parseFloat(item.last_ordered_price_1)) // Extract and parse the prices
    );
    const maxPrice = Math.max(...categoryItems.map((item:any) => parseFloat(item.last_ordered_price_1)));

    return minPrice ;
  }

  // MAXIMUM VALUE FIND
  findMaxPriceForCategory(category: any) {
    // Filter data for the specified category
    const categoryItems = this.products.filter((item:any) => item.category == category && typeof parseFloat(item.last_ordered_price_1) === 'number');

    // Find maximum price among the items for the specified category
    const maxPrice = Math.max(...categoryItems.map((item:any) => parseFloat(item.last_ordered_price_1)));
    return maxPrice;
  }

  Placement(placement: any, product_id: any, type: any) {
    this.isPlacement = false
    this.placementData.placement = placement
    this.placementData.Product_id = product_id
    this.placementData.Hotel_Name_id = this.HotelId

    this.HotelService.placement_send(this.placementData).subscribe(datas => {
      // this.ngOnInit()
      this.placement_value = placement
      if(type =='BP'){
        this.products.forEach((palcemen:any) => {
          if(product_id == palcemen.id){
            palcemen.placement = placement
          }
        });
      }else{
        this.temp.forEach((palcemen:any) => {
          if(product_id == palcemen.id){
            palcemen.placement = placement
          }
        });
      }
     
      this.toast.success({ detail: "SUCCESS", summary: 'Successfully Updated', duration: 3000 });
    },err=>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })
  }

  // HTELWIDE USAGE PRODUCT
  hotel_wide_Usage(hotel: any, product_id: any, Hotel_Name_id: any) {
    this.hotelWideUsage.hotel_wild_usage = hotel
    this.hotelWideUsage.Product_id = product_id
    this.hotelWideUsage.Hotel_Name_id = Hotel_Name_id

    this.HotelService.hotel_wide_usage(this.hotelWideUsage).subscribe(datas => {
      // this.ngOnInit()
      this.products.forEach((hotelWide:any) => {
        if(product_id == hotelWide.product_id){
          hotelWide.hotel_wild_usage = hotel
        }
      });

    },err=>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })
  }

  // ORDER FREQUENCY DROPDOWN
  orderFrequency(order: any, product_id: any, type: any) {
    this.orderFrquency.order_frequency = order
    this.orderFrquency.Hotel_Name_id = this.HotelId
    this.orderFrquency.Product_id = product_id
    this.HotelService.order_frequency(this.orderFrquency).subscribe(datas => {
      // this.ngOnInit()
      if(type=='BP'){
        this.products.forEach((orderFrequency:any) => {
          if(product_id == orderFrequency.id){
            orderFrequency.order_frequency = order
          }
        });
  
      }else{
        this.temp.forEach((orderFrequency:any) => {
          if(product_id == orderFrequency.id){
            orderFrequency.order_frequency = order
          }
        });
  
      }
      this.toast.success({ detail: "SUCCESS", summary: 'Successfully Updated', duration: 3000 });

      
    },err=>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })
  }

  // PLACEMENT UPDATE
  placement_input(data: any) {
    this.placement_value = data
  }
  hotelwide_input(hotel: any) {
    this.hotelwide_value = hotel
  }
  orderfrequency_input(data: any) {
    this.order_frequency_value = data
  }
  
  randomId :any = ''
  requestType(type:any){
    if(type == 'Direct Order'){
      this.purChaseRequest.price_request_preference = type
      this.randomId = 'DO-' + this.base_id
      this.demo_status = 2
    }
    if(type == 'RFQ-Request'){
      this.purChaseRequest.price_request_preference = type
      this.randomId = 'RFQ-' + this.base_id
      this.demo_status = 1

    }
  }

  // SELECTED PRODUCT ROW EXPANDED 
  tableExpand(event: any,productType:any,allObj:any) {
    this.AppserviceService.filtered_vendors(allObj.vendors)
    console.log(event)
    this.selectedTable = event != '' ? event : '';
    // this.test =data
    // if (event) {
      this.router.navigate([{ids: this.HotelId, expanded: this.selectedTable ,productType:productType}], { relativeTo: this.route });
    // } else {
    //   this.router.navigate([], { relativeTo: this.route });
    // }
  }

  // SELECTED PRODUCT ROW EXPANDED VALUES
  test_(i: any) {
    for (let index = 0; index < i.length; index++) {
      this.test_5 = i[index];
      this.test_6 = this.test_5.price
    }
  }
  handleFileInput(event: any) {
    this.imageFile = event.target.files[0];
  }

  // SERVICE REQUEST IMAGE UPLOAD
  // uploadImage:any = []
  uploadImage: Array<{ type: string, src: string }> = [];
  serviceImageFiles!: FileList;
  defaultVideoThumbnail: string = 'assets/video.png';

  serviceRequestImage(event: any) {
    this.uploadImage = []
    if (event.target.files) {
      const files = event.target.files;
      this.serviceImageFiles = files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image')) {
          const reader = new FileReader();
          reader.onload = ((fileIndex, fileType) => (event: any) => {
            this.uploadImage.push({ type: fileType, src: event.target.result });
          })(i, file.type);
          reader.readAsDataURL(file);
        } else if (file.type.startsWith('video')) {
          this.uploadImage.push({ type: file.type, src: this.defaultVideoThumbnail });
        }
      }
    }
  }

  specifcationAndWarrenty :any = []
  testtt(i: any,vendorId:any,vendors:any) {
    console.log(i)
    localStorage.setItem('expand_data', JSON.stringify(i));
    localStorage.setItem('teporaryVendorId', JSON.stringify(vendorId));
    this.AppserviceService.popupData(false)
    this.specifcationAndWarrenty = i.specification

    // VENDORS DETAILS SEND TO ALL COMPONENTS, EX- ALL-VENDOR DETAILS COMPONENT
    const vendors2 = {
      catlog_creations_id : i.catlog_creations_id,
      brandVendor : vendors,
      hotelVendorId : i.primary_suppller,
      low_maintanence_suppller : i.low_maintanence_suppller,
      secondary_suppller :i.secondary_suppller,
    }

    this.AppserviceService.vendorBrandProducts(vendors2)
  }

  productClick() {
    this.productclick = !this.productclick
  }
  cancel() {
    this.productclick = !this.productclick
  }

  // 
  serviceRequest(id: any,vp:any) {
    this.serviceRequest_form.service_request_random = "",
    this.serviceRequest_form.current_condition = "",
    this.serviceRequest_form.required_by = "",
    this.serviceRequest_form.remarks = "",
    // this.serviceRequest_form.requested_by = "",
    this.serviceRequest_form.image  = ""
    this.serviceRequest_form.vp  = vp

    this.product_id = id
    this.serviceRequest_form.product_id = id
    this.puechaserequest = false
    this.servicerequset = true

    let uniqueId = new Date().getTime();
    this.base_id = uniqueId.toString().slice(-4);
    this.dateTime()
  }

  selectedVendor(vendorName:any,vendorId:any){
    this.purChaseRequest.vednor = vendorName
    this.purChaseRequest.vendor_id = vendorId
  }

  typevp:any=[]
  price_symbol :any =''
  selected_product_details :any = ''
  purchaseRequest(id: any, i: any,price:any,productType:any,vendorId:any,chooseMultiVendor:any,allVendorData:any,boxQuantity:any,product_vendors:any,all:any,vp:any) {
    this.selected_product_details = all
    this.purchaseRequestVendorID = vendorId
    this.typevp = vp 
    this.price_symbol = all.currency_symbol
    this.isAllRequireData = false
    this.baseBoxQuntity = boxQuantity
    this.TempORbrand = productType
    this.product_id = id
    this.vendor_company = []
    // this.puchase_id = i                                         clean---
    this.puechaserequest = true
    this.servicerequset = false
    
    let uniqueId = new Date().getTime();
    this.base_id = uniqueId.toString().slice(-4);
    this.dateTime()
    price = price ? price : 0
    this.oneProductPrice = price
    this.approxPrice = parseFloat(price)
    this.purChaseRequest.approximate_price = parseFloat(price)
    this.purChaseRequest.approximate_shipping_cost = price / 10

    // this.purChaseRequest.vendor_id = ''
    this.purChaseRequest.product_id = ''
    // this.purChaseRequest.vednor = ''
    this.purChaseRequest.purchase_request_random = ''
    this.purChaseRequest.required_quantity = ''
    this.purChaseRequest.requested_on = this.send_date
    this.purChaseRequest.vednor = ''
    this.purChaseRequest.why_this_vendor = ''
    this.caseQtyCount = boxQuantity == null ? 0 : parseInt(boxQuantity)
    this.purChaseRequest.case_quantity = parseInt(boxQuantity)
    // this.purChaseRequest.approximate_price = ''
    // this.purChaseRequest.approximate_shipping_cost = ''
    this.purChaseRequest.remarks = ''
    this.purChaseRequest.price_request_preference = ''

    // this.vendor_company = [] ###

    // PRODUCT VENDOR ID
    const primary_vendor = all.primary_suppller != null ? JSON.parse(all.primary_suppller || "[]") : []
    const low_maintanence = all.low_maintanence_suppller != null ? JSON.parse(all.low_maintanence_suppller || "[]") : []
    const secoundary_vendors = all.secondary_suppller != null ? JSON.parse(all.secondary_suppller || "[]") : []

    const mergedVendor_id:any = primary_vendor.concat(low_maintanence, secoundary_vendors,);

    const uniqueVendor_id:any = []
    mergedVendor_id.forEach((vendor_id:any) => {
      const vendor = product_vendors.find((vendorDetails:any) => vendor_id == vendorDetails.vendor_id)
      vendor != undefined ? uniqueVendor_id.push(vendor) : ''
    });
    let vendors2:any=[]
     const allvendors = this.removeDuplicatesByProperty(uniqueVendor_id,'vendor_id')
    console.log(this.vendor_company)
    all.vendor.forEach((vendor:any) => {
      if(vendor.vendor != null){
        vendor.companyName = vendor.vendor
        vendor.vendor_id = vendor.vendor_id
        vendors2.push(vendor)
      }
    });
    if(this.isLoggedIn){
      const vendorfilter = this.vendor_company.concat(allvendors,vendors2)
      this.vendor_company = this.removeDuplicatesByProperty(vendorfilter,'vendor_id')
       // this.vendor_company = product_vendors;
       console.log(this.vendor_company)
    }else{
         this.vendor_company =this.demo_vendors
    }

    
  

  }

  // REMOVE DUBLICATE VALUES
  removeDuplicatesByProperty(arr: any[], prop: string): any[] {
    const uniqueValues = new Set();
    return arr.filter(item => {
      const value = item[prop];
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        return true;
      }
      return false;
    });
  }

  requiredQuantity(event: any) {
    this.purChaseRequest.required_quantity = parseInt(event);
    const count: number = this.purChaseRequest.required_quantity / this.purChaseRequest.case_quantity;
    this.caseQtyCount = this.purChaseRequest.case_quantity != 0 ? this.purChaseRequest.case_quantity * Math.ceil(count) : 0
    this.approxPrice = this.purChaseRequest.approximate_price != 0 ? this.purChaseRequest.approximate_price.toFixed(2) * Math.ceil(count) : 0
    this.purChaseRequest.approximate_shipping_cost = this.approxPrice / 10
  }

  // PURCHASE REQUEST SUBMIT FORM
  submit(rfq:any) {
    this.PRButtonDisabled = true
    this.purChaseRequest.purchase_request_random = this.randomId
    this.purChaseRequest.product_id = this.product_id
    // this.purChaseRequest.vendor_id = this.product_id ###
    this.purChaseRequest.Hotel_Name_id = this.HotelId
    this.purChaseRequest.approximate_price = this.approxPrice
    this.purChaseRequest.case_quantity = this.caseQtyCount
    this.purChaseRequest.vp = this.typevp
    this.p_requestArr.push(this.purChaseRequest)
    this.isAllRequireData = true
    if(this.purChaseRequest.vednor == '' || this.purChaseRequest.vednor == 'None'){
      this.purChaseRequest.vednor = 'None'
      this.purChaseRequest.why_this_vendor = 'None'
      // this.purChaseRequest.remarks = '-'
    }
   if(this.isLoggedIn){
    if(this.purChaseRequest.requested_on != '' && this.purChaseRequest.vednor != ''  && this.purChaseRequest.remarks != '' && this.purChaseRequest.price_request_preference != '' ){
      this.HotelService.PurchaseRequest_form(this.purChaseRequest).subscribe({
        next: (response) => {
          this.PRButtonDisabled = false
          this.toast.success({ detail: "SUCCESS", summary: 'Success - ' + this.purChaseRequest.price_request_preference + ' Submitted', duration: 3000 });
          // window.location.reload()
          const notifyDaata = {
            hotelname : '',
            randomId : this.purChaseRequest.purchase_request_random,
            department: '',
            userName :'',
            request : 'request Raised',
            rqType : this.purChaseRequest.price_request_preference,
            product_id : this.product_id,
            hotelId : this.HotelId
          }
          this.AppserviceService.notification(notifyDaata)

          // /Exit form
          this.exit()
          this.tableExpand(this.purChaseRequest.product_id,this.TempORbrand,'')
          this.testtt(this.selected_product_details,this.selected_product_details.vendorId,this.selected_product_details.vendors)
          this.AppserviceService.rfqRequestReload('reloadPR')
        },
        error: (error) => {
          // alert('PurchaseRequest Entered Falied')
          console.log(error)
          this.toast.error({ detail: "Error", summary: error.error.message, duration: 3000 });

          this.PRButtonDisabled = false
        },
      })
  }else{
    this.PRButtonDisabled = false
  }
   }else{
    const obj={
      id_user:localStorage.getItem('u_id'),
      product_id:this.purChaseRequest.product_id,
      status:this.demo_status,
      vendor_id: this.purChaseRequest.vendor_id,
      rfq_id:this.purChaseRequest.purchase_request_random,
      qty :this.purChaseRequest.required_quantity
    }
    this.HotelService.demo_product_create(obj).subscribe({
      next: (response) => {
        console.log(response)
        this.toast.success({ detail: "SUCCESS", summary: 'Success - ' + ' Submitted', duration: 3000 });
        this.puechaserequest = false
        this.PRButtonDisabled = false
        this.DemohotelService.Show_Demo_Orders(this.demo_product_id)


      }

    })


   }
    
  
  // if(this.typevp == '1'){
  //   if(this.purChaseRequest.requested_on != ''   && this.purChaseRequest.remarks != '' && this.purChaseRequest.price_request_preference != '' ){
  //       this.HotelService.PurchaseRequest_form_vendor_product(this.purChaseRequest).subscribe({
  //         next: (response) => {
  //           this.PRButtonDisabled = false
  //           this.toast.success({ detail: "SUCCESS", summary: 'Success - ' + this.purChaseRequest.price_request_preference + ' Submitted', duration: 3000 });
  //           // window.location.reload()
  //           const notifyDaata = {
  //             hotelname : '',
  //             randomId : this.purChaseRequest.purchase_request_random,
  //             department: '',
  //             userName :'',
  //             request : 'request Raised',
  //             rqType : this.purChaseRequest.price_request_preference,
  //             product_id : this.product_id,
  //             hotelId : this.HotelId
  //           }
  //           this.AppserviceService.notification(notifyDaata)

  //           // /Exit form
  //           this.exit()
  //           this.tableExpand(this.purChaseRequest.product_id,this.TempORbrand,'')
  //           // this.user_name.forEach((element:any) => {
  //           //   notifyDaata.department = element.department
  //           //   notifyDaata.userName = element.fullName
  //           // });

  //           // rfq-order , rfq-order-table ,rfq-order-tableTwo 
  //           this.AppserviceService.rfqRequestReload('reloadPR')
  //         },
  //         error: (error) => {
  //           alert('PurchaseRequest Entered Falied')
  //           this.PRButtonDisabled = false
  //         },
  //       })
  //   }else{
  //     this.PRButtonDisabled = false
  //   }
  // }
    
    this.AppserviceService.rfqSdata(this.p_requestArr)
  }

  // PURCHASE REQUEST EXIT 
  exit() {
    this.department_name = ''
    this.puechaserequest = false
  }

  // SERVICE REQUEST EXIT
  serviecrequestcancel() {
    this.serviceRequest_form.required_by =''
    this.serviceRequest_form.Rooms =''
    this.serviceRequest_form.vendorname =''
    this.uploadImage = []
    this.servicerequset = false
    this.isClone_product = false
  }
  currentCondition(data: any) {
    this.serviceRequest_form.current_condition = data
  }
  
  // SERVICE REQUEST API SUBMIT
  submitTwo(name: any,productType:any) {
    this.TempORbrand = productType
    this.isSRrequiredData = true
    // this.serviceRequest_form.Hotel_Name_id = this.HotelId
    // this.serviceRequest_form.requested_by = name
    this.serviceRequest_form.service_request_random = 'SR-' + this.base_id
    const form = new FormData();
    form.append('type_of_users', this.serviceRequest_form.type_of_users);
    form.append('product_id', this.serviceRequest_form.product_id);
    form.append('service_request_random', this.serviceRequest_form.service_request_random);
    form.append('current_condition', this.serviceRequest_form.current_condition);
    form.append('required_by', this.serviceRequest_form.required_by);
    form.append('remarks', this.serviceRequest_form.remarks);
    // form.append('requested_by', this.serviceRequest_form.requested_by);
    form.append('Hotel_Name_id', this.serviceRequest_form.Hotel_Name_id);
    form.append('vender_id', this.serviceRequest_form.vendor);
    form.append('room_area', this.serviceRequest_form.Rooms);
    form.append('vp', this.serviceRequest_form.vp);


    for (let i = 0; i < this.serviceImageFiles.length; i++) {
      const file = this.serviceImageFiles[i];
      form.append('images[]', file, file.name);
    }

    if(this.serviceRequest_form.current_condition != '' && this.serviceRequest_form.required_by != '' && this.serviceRequest_form.remarks != '' && this.uploadImage.length >0){
      this.HotelService.serviceRequest(form).subscribe({
        next: (response) => {
          this.servicerequset = false
          this.uploadImage=[]
          this.isSRrequiredData = false
          this.serviceRequest_form.Rooms =''
          this.serviceRequest_form.vendorname = ''
          this.toast.success({ detail: "SUCCESS", summary: 'success', duration: 3000 });
          // this.AppserviceService.rfqRequestReload(this.serviceRequest_form.product_id)
          this.AppserviceService.rfqRequestReload('reloadPR')
          this.tableExpand(this.serviceRequest_form.product_id,this.TempORbrand,'')
        },
        error: (err) => {
          this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
          // this.submitButtonDisabled = false
        },
      })
    }else{
      // this.submitButtonDisabled = false
    } 
  }

  add_new_product() {
    this.isClone_product = true
    this.AppserviceService.editTemporaryProduct('')
    this.AppserviceService.brandPrimaryVendor('temp') 
  }

  // DELETE PRODUCT
  delete_product_(pro_id: any) {
    const data = {
      Hotel_Name_id:this.HotelId,
      id: pro_id
    }

    this.HotelService.delete_products(data).subscribe({
      next: (response) => {
        window.location.reload()
        this.toast.success({ detail: "SUCCESS", summary: 'Delete Successfully', duration: 3000 });
      },
      error: (err) => {
        this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
        console.log(err);
      },

    })

  }

  delete_temporaryProduct(id:any,hotelId:any){
    this.delete_temporary_product.hotel_id = hotelId
    this.delete_temporary_product.id       = id
    this.HotelService.delete_temporary_product(this.delete_temporary_product).subscribe({
      next: (response) => {
        window.location.reload()
        this.toast.success({ detail: "SUCCESS", summary: 'delete successfully', duration: 3000 });
      },
      error: (err) => {
        this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
        console.log(err);
      },
    })
    
  }

  editTemporaryProduct(editProduct:any){
    this.AppserviceService.editTemporaryProduct(editProduct)
    this.isClone_product = true
    this.router.navigate([{ids: this.HotelId, expanded: this.selectedTable,nav_hotel :'temp_edit'}], { relativeTo: this.route });
  }

  department_name:any = ''
  admin_department(department:any) {
    this.department_name= department.department_name
    this.purChaseRequest.department_id = department.department
  }

  esgDropDown(value:any){
    if(value == 'yes'){
      this.fields.ESG = '1'
    }
    if(value == 'no'){
      this.fields.ESG = '0'
    }
    if(value == 'all'){
      this.fields.ESG = ''
    }
  }

  numericPattern = /^[0-9]*$/;
  numericOnly(event: any) {
    return this.numericPattern.test(event.key);
  }
  // placement elipsise 
  // transformPlacementData(placementData: string): string {
  //   if (placementData) {
  //     // Split the string by comma and get the first part (Kitchen)
  //     const parts = placementData.split(',');
  //     if (parts.length > 0) {
  //       return parts[0].trim() + ' ...';
  //     }
  //   }
  //   return '-'; // Return a default value if data.placement_data is null or empty
  // }

  formatDate(date:any) {
    // Parse the input date in 'dd-MM-yyyy' format
    let formattedDate = ''
    const parts = date.split('-');
    if (parts.length === 3) {
      const day = parts[2];
      const month = parts[1];
      const year = parts[0];
      
      // Convert the month numeric value to a three-letter abbreviation
      const monthAbbreviation = new Date(`${year}-${month}-01`)
        .toLocaleString('en-us', { month: 'short' });
      
      // Format the date as 'dd-MMM-yyyy'
       formattedDate = `${day}-${monthAbbreviation}-${year}`;

    } 

    return formattedDate
  }


  image_mark(event: any) {
    const image_marker = document.getElementById("image-element");
    const marker = document.getElementById("marker-element");

    if (image_marker && marker) {
        let clickX = event.clientX;
        let clickY = event.clientY;
        let imageWidth = image_marker.offsetWidth;
        let imageHeight = image_marker.offsetHeight;
        
        marker.style.left = clickX + "px";
        marker.style.top = clickY + "px";
    } else {
        console.error("Image or marker element not found.");
    }
  }


 transformPlacementData (brandProductsName: string): string {
    if (brandProductsName != null) {
      const words = brandProductsName.split(' ');
      if (words.length > 2) {
        return words.slice(0, 2).join(' ') + '...';
      } else {
        return brandProductsName;
      }
    }
    return '-';
  }
  
  // PAGINATION
  getItems() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedItems = this.products.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getItems();
  }


  searchText:any = ''
  filterProducts(key:any,event:any,type='noEsg'){
   const value = type == 'esg' ? event : event.target.value
   console.log(this.searchText)
   const criteria = this.searchText.split(';').filter(Boolean).reduce((acc:any, crit:any) => {
     const [k, v] = crit.split(':');
     acc[k] = v;
     return acc;
   }, {});

   criteria[key] = value;
   this.searchText = Object.entries(criteria).map(([k, v]) => `${k}:${v}`).join(';');
  //  this.cdr.markForCheck();
  }

  ezeebi_link(link:any){
    if(link !='' && link != undefined){
      const openlink = this.HotelService.projecturl() + link
      window.open(openlink)
  
    }else{
      this.toast.error({ detail: "Error ", summary:'link is not available', duration: 3000 });
    }
   


  }
  show_demo_products(coproducts:any){
     for (const outerArray of coproducts) {
      for (let innerObject of outerArray) {
        // Access properties of innerObject here
        // innerObject.brand_product_specs = innerObject.brand_product_specs
        // innerObject.vendor_product_specs = innerObject.vendor_product_specs
        innerObject.product_pdf = innerObject.brand_product_pdf ? innerObject.brand_product_pdf : innerObject.product_pdf

        innerObject.product_image = innerObject.vendor_product_images ? innerObject.vendor_product_images[0].key:innerObject.product_image[0].key
        innerObject.last_ordered_price_1 = innerObject.last_ordered_price != null ? parseFloat(innerObject.last_ordered_price) : 0
        innerObject.TAX_1 = innerObject.TAX != null && innerObject.TAX != "null" ? innerObject.TAX : 0 
        innerObject.last_ordered_quantity_1 = innerObject.last_ordered_quantity != null ? innerObject.last_ordered_quantity : '0'
        innerObject.vendor_lead_time_1 = innerObject.vendor_lead_time != null && innerObject.vendor_lead_time != 'null' ? innerObject.vendor_lead_time : '0'
        innerObject.last_box_quantity_1 = innerObject.last_box_quantity != null && innerObject.last_box_quantity != "null" ? innerObject.last_box_quantity : '0'
        // innerObject.vendors = this.get_vendor_categories(innerObject.category,datas.vendors)
        // innerObject.vendors = datas.vendors
        innerObject.sort_brand_prod_name = this.transformPlacementData(innerObject.brand_products_name)
        innerObject.sort_categories_name  = this.transformPlacementData(innerObject.categories_name)
        innerObject.sort_sub_categories_name = this.transformPlacementData(innerObject.sub_categories_name)
        innerObject.brand_or_last_vendor_name = innerObject.vendor_name == null ? '-' : this.transformPlacementData(innerObject.vendor_name)
        innerObject.specification = this.specificationWarranty(innerObject)

        this.demo_product.push(innerObject)
        // Add more properties as needed
        }
      }
  }
}