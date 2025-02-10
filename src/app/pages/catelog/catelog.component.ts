import { Component, OnInit, Input } from '@angular/core';
import { RegisterFormService } from 'src/app/service/registerDetails/register-form.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { HttpErrorResponse  } from '@angular/common/http';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';


@Component({
  selector: 'b2b-catelog',
  templateUrl: './catelog.component.html',
  styleUrls: ['./catelog.component.css']
})
export class CatelogComponent implements OnInit {
  @Input() vendartable: any = [

  ]
  now: any = ""
  selectedTable: any = ''
  Dropdown: any = 'DropDown'
  catelogColumnSpacing = "5*0.3fr ";
  tableColumnSpacing = "0.6fr 15*1fr"
  pichartpopUp: boolean = false
  fliterpopUp: boolean = false
  open_chat:boolean = false
  grouping: boolean = false
  payment: boolean = false
  filerproduct: boolean = false

  search: any = ''
  iconFilter: any = ''
  scheduletime: boolean = false
  selectedTime: any = ''
  budgetType: any = {
    button: ''
  }
  isSearch: boolean = false
  hotel_id: any = '+917358911973'
  checkedStyle: boolean = false
  menu_option:boolean = false
  budget: boolean = false
  tabledata: any = [
    {
      "checkedStyle": true,
      "id": " Current catelog",
      "inputOne": "Search",
      "inputTwo": "Vendar",
      "input": "",
      "Two": "",

    },
    {
      "id": "Current catelog",
      "inputOne": "Search",
      "inputTwo": "Product",
      "input": "",
      "Two": "",

    },

  ]
  scheduledOrder: any = [
    {
      full: "Product Image",
      one: 'Product',
      two: 'Image'
    },
    {
      full: "Product Name",
      one: 'Product',
      two: 'Name'
    },
    {
      full: "Purchase Request Number",
      one: 'Purchase Request',
      two: 'Number'
    },
    {
      full: "Requested Person & Department",
      one: 'Requested Person',
      two: '& Department'
    },

    {
      full: "Purchase Order Number",
      one: 'Purchase Order',
      two: 'Number'
    },
    {
      full: "Required Quantity",
      one: 'Required',
      two: 'Quantity'
    },
    {
      full: "Required Date",
      one: 'Required',
      two: 'Date'
    },
    {
      full: "Specified Vendor",
      one: 'Specified',
      two: 'Vendor'
    },
    {
      full: "Hotel Remarks",
      one: 'Hotel',
      two: 'Remarks'
    },
    {
      full: "Payment Terms",
      one: 'Payment',
      two: 'Terms'
    },

  ]
  tableHeading_two: any[] = [
    {

      full: "PR Selected",
      one: 'PR Selected',
      two: ''
    },
    {

      full: "DO Number",
      one: 'DO',
      two: 'Number'
    },
    {

      full: "Requested Person & Department",
      one: 'Requested',
      two: 'Person & Department',

    },
    {

      full: "Last Ordered Price Per Pcs/Box(Case)/Dozen",
      one: 'Last Ordered',
      two: 'Price Per Pcs/Box(Case)/Dozen'
    },
    {

      full: "Required Quantity",
      one: 'Required',
      two: 'Quantity'
    },
    {

      full: "Box(Case) Quantity",
      one: 'Box(Case)',
      two: 'Quantity'
    },
    {

      full: "Last Ordered Price(Total)",
      one: 'Last Ordered',
      two: 'Price(Total)'
    },
    {

      full: "Approx. Shipping cost",
      one: 'Approx.',
      two: 'Shipping cost'
    },

    {

      full: "Total Cost",
      one: 'Total Cost',
      two: ''
    },
    {

      full: "Required Date",
      one: 'Required',
      two: 'Date'
    },
    {

      full: "Specified Vendor",
      one: 'Specified',
      two: 'Vendor'
    },
    {

      full: "Remarks",
      one: 'Remarks',
      two: ''
    },
    {

      full: "Payment Terms",
      one: 'Payment',
      two: 'Terms'
    },
    {

      full: "Reason for Rejecting the Request",
      one: 'Reason for',
      two: 'Rejecting the Request'
    },
    {

      full: "Push DO to RFQ",
      one: 'Push',
      two: 'DO to RFQ'
    },
    {

      full: "Select Vendor",
      one: 'Select',
      two: 'Vendor'
    },

  ];
  specialEvents = []
  test: any = ''
  hotel: any = ''
  isAllCheck: boolean = false
  openmaintenance: boolean = false
  isNewProduct: any = ''
  newProductsData: any = []
  isProcurementStage: boolean = false
  Hotel_Name_id: any = ''
  scheduleOrder: any = []
  directOrderValues: any = []

  multipleDirectorder: any = []
  grouping_order: any = {}
  selectedData: any = []
  hidescroll: boolean = true

  // MULTIBLE SEARCH
  multipleSearch :any = [
    {
      id: 1,
      type : 'Products',
      data : [
        {
          name : 'Alex'
        }
      ]
    },
    {
      id: 2,
      type : 'Product Catagory',
      data : [
        {
          name : 'santh'
        }
      ]
    }
  ]

  searchText:any = ''
  private chat_Email :any
  private subscription: any;
  private budget_subscription: any;
  constructor(private AppserviceService: AppserviceService, private HotelService: HotelService, private _router: Router, private route: ActivatedRoute, private toast: NgToastService,private authService: AuthServiceService) { }
  isLoggedIn:boolean=false

  ngOnInit(): void {
    // console.log(this.filerproduct)
    this.isLoggedIn = this.authService.login();

    this.filerproduct = false
    this.hidescroll = true
    console.log(this.hidescroll)
    this.route.paramMap.subscribe((params) => {
      let i = params.get("new_products");
      this.Hotel_Name_id = params.get("ids");
      if (i) this.isNewProduct = i
    })

    // INITIAL ACTIVE HOTEL DATA LOADING
    // this.AppserviceService.hotel_id_initial_load(this.Hotel_Name_id)

    // New Products Notify
    this.AppserviceService.newProductNotify$.subscribe((res) => {
      console.log(res)
      this.newProductsData = res
    })
    if(this.isLoggedIn){
      this.HotelService.getDetails().subscribe((res: any) => {
        this.specialEvents = res,
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                this._router.navigate(['/login'])
              }
            }
          }
      })
    }
   
    if(this.isLoggedIn){
    this.AppserviceService.topHotelName$.subscribe((d: any) => {
      console.log(d)
      this.hotel = d
    })
  }else{
    this.hotel ={'Hotel_Name' : 'Demo Hotel','State':'' ,'Country':''}
  }
    this.test = JSON.parse(localStorage.getItem('alldetailes') || "[]")
    if(this.isLoggedIn){
      this.secheduledOrder()
      this.multidirectorder()

    }
    this.AppserviceService.hidescrollbar$.subscribe((res) => {
      console.log(res)
      if (res == false) {
        this.hidescroll = false

      } else {
        this.hidescroll = true

      }
    })
    this.AppserviceService.changehotel$.subscribe((hotel: any) => {
      console.log(hotel)
      if (hotel == 'hotelchanged') {
        this.closeallpopup()
      }
    })

    // VENDOR BUDGET FROM DASHBOARD DRAWER
    this.budget_subscription = this.AppserviceService.vendor_budget$.subscribe((res: any) => {
      if (res == true) {
        this.budget = true;
      }
    })
   if(this.isLoggedIn){
    this.subscription = this.AppserviceService.multibleSearch$.subscribe((res:any) =>{
      console.log(res)
      this.multipleSearch[0].data = []
      this.multipleSearch[1].data = []

      res.forEach((v_product:any) => {
        const product = v_product
        this.multipleSearch[0].data.push(
          {
            product_id : product ? product.id : '',
            img : product ? product.product_image : '',
            productName : `${product ? product.brand_products_name : ''}`,
            name : `${product ? product.brand_products_name : ''} -- #${product ? product.keyword : ''}`
          }
        )
        this.multipleSearch[1].data.push(
          {
            product_id : product ? product.id : '',
            img : product ? product.product_image : '',
            catagorytName : `${product ? product.categories_name ?product.categories_name : product.categories:''}`,
            name : `${product ? product.categories_name ?product.categories_name : product.categories:''} -- #${product ? product.keyword : ''}`,
            // keyword : `${product ? product.categories_name : ''}`
// `${product ? product.brand_products_name : ''} -- #${b_order ? b_order.Hotel_Name : ''} -- ${b_order.mv_id ? b_order.mv_id : b_order.rfq_id} -- ${requied_date} -- ${b_order.requested_on} -- ${order_Status ? order_Status.urlId : ''}`
          }
        )
        
      });
    })
  }
    // MULTIBLE SEARCH
    // d.product.forEach((v_product:any) => {
    //   const product = v_product
    //   this.multipleSearch[0].data.push(
    //     {
    //       img : product ? product.product_image : '',
    //       name : `${product ? product.name : ''}`
    //     }
    //   )
    // });
  
    this.chat_Email = this.AppserviceService.notifyExpand_ChatEmail$.subscribe((chat:any) =>{
      if(chat){
        this.open_chat = true
      }
    })
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.budget_subscription.unsubscribe();
    this.chat_Email.unsubscribe();
  }

  closeallpopup() {
    this.isProcurementStage = false
    this.fliterpopUp = false
    this.pichartpopUp = false
    this.budget = false;
    this.payment = false
    this.openmaintenance = false
    this.grouping = false
    this.filerproduct = false

  }
  multidirectorder() {
    const multiDirectorder: any = {
      Hotel_Name_id: this.Hotel_Name_id
    }
    this.HotelService.PurchaseRequest_user_to_switch_diractorder_muilty_view(multiDirectorder).subscribe((res: any) => {
      console.log(res)
      if (res.approximate_price != null) {
        res.approximate_price = parseInt(res.approximate_price, 10);
      }

      if (res.approximate_shipping_cost != null) {
        res.approximate_shipping_cost = parseInt(res.approximate_shipping_cost, 10);
      }
      this.multipleDirectorder = res
    })
  }
  schedule_time() {
    this.scheduletime = !this.scheduletime
  }
  onTimeSelected() {
    console.log('Selected Time:', this.selectedTime);
  }
  submitScheduledTime() {
    const payload = {
      'Hotel_id': this.Hotel_Name_id,
      'scheduled_time': '5:30:00',
      'hotel_time': this.selectedTime + ':00'
    }

    this.HotelService.hotel_time(payload).subscribe((res) => {
      console.log(res)
      this.toast.success({ detail: "Submitted", summary: 'Schedule Time Updated', duration: 5000 });
      this.scheduletime = false
    })
  }
  secheduledOrder() {
    // Scheduled Order
    const scheduledOrder: any = {
      Hotel_Name_id: this.Hotel_Name_id
    }
    this.HotelService.connectAPI('POST', '/schedule_oder', scheduledOrder).subscribe((res: any) => {
      this.scheduleOrder = res.schedule_oder
    })
  }

  directOrder() {
    const directOrder = {
      Hotel_Name_id: "1706261217551",
      product_id: "14"
    }
    this.HotelService.PurchaseRequestSwitch_diractorder_view(directOrder).subscribe((data: any) => {
      console.log()
      this.directOrderValues = data
    })

  }
  procurementStage() {
    this.isProcurementStage = !this.isProcurementStage
    this.pichartpopUp = false
    this.budget = false
    this.payment = false
  }

  popup() {
    this.pichartpopUp = !this.pichartpopUp
    this.budget = false
    this.payment = false
    this.isProcurementStage = false
  }
  closeButton() {
    this.pichartpopUp = !this.pichartpopUp
  }
  fliter() {
    this.fliterpopUp = !this.fliterpopUp
    this.AppserviceService.filterTable(this.fliterpopUp)
  }
  searchOnchange(event: any) {
    this.search = event
    this.searchText = event
    if (this.search !== '') {
      this.isSearch = true
    }
    if (this.search == '') {
      this.isSearch = false
    }

  }
  onClickIcon(data: any) {
    this.isSearch = false
    this.search = data
  }

  searchData(i: any) {
    this.AppserviceService.search(i)
    this.search = i
  }
  vendor_budget(button = 'saw') {
    this.budget = true;
    this.budgetType.button = button;
    this.payment = false
    this.isProcurementStage = false
    this.pichartpopUp = false

  }
  close_rightside_popups(){
    this.payment = false
    this.isProcurementStage = false
    this.pichartpopUp = false
    this.budget = false;


  }
  pending_payment() {
    this.payment = !this.payment;
    this.budget = false
    this.isProcurementStage = false
    this.pichartpopUp = false


  }
  grouping_orders() {
    this.menu_option = false
    this.grouping = true
    this.close_rightside_popups()
  }
  calculateTotal(event: any, randomId: any) {

    this.isAllCheck = false

    this.selectedData = []

    this.vendartable.forEach((element: any) => {
      if (element.purchase_request_random == randomId) {
        element.ischecked = event.target.checked
      }

    });

    this.vendartable.forEach((element: any) => {
      if (element.product_id == this.selectedTable && element.ischecked == true) {
        this.selectedData.push(element)
      }
    });

    const selectType = {
      type: 'DO',
      data: this.selectedData
    }

    console.log(selectType)

    this.AppserviceService.rfqSelectedAllData(selectType);

    // this.selectedData.forEach((element:any) => {
    //   if(element.ischecked != false){
    //     this.isAllCheck = true
    //   }
    // });

    if (this.selectedData.length == 0) {
      this.isAllCheck = false
    }

    if (this.selectedData.length == this.vendartable.length) {
      this.isAllCheck = true
    }

    if (this.selectedData.length > 0 && this.isAllCheck == true) {
      this.isAllCheck = true
    }
  }
  DropDown(value: any, productId: any, random_number: any) {
    this.Dropdown = value;

    const obj = {
      product_id: productId,
      purchase_request_random: random_number,
      payment_terms: value,
    }

    this.vendartable.forEach((element: any) => {
      if (element.purchase_request_random == random_number) {
        element.payment_terms = value
      }

      return element
    });

    this.HotelService.payment_terms(obj).subscribe((res) => {
      console.log(res)
    })
  }

  closefilter() {
    console.log("working")
    this.AppserviceService.procurementStage_orders('refresh')
  }
  
  openmain() {
    this.menu_option = false
    this.openmaintenance = true
    this.close_rightside_popups()
  }

  transformPlacementData(brandProductsName: string): string {
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
  Menu(){
    this.menu_option = !this.menu_option
  }
  openchat(){
    this.menu_option = false
    this.open_chat = true
    this.close_rightside_popups()
  }

  outsideElementClicked(){
    this.menu_option = false
  }
  // MULTIBLE SEARCH PRODUCT SELECT
  open_multiSelectProduct(obj:any){
    const val = {
      Hotel_Name_id : this.Hotel_Name_id,
      status : '3',
      action_id : [obj.product_id]
    }
    this.AppserviceService.notifyExpandProduct(val)
    this.isSearch = false
  }

  // FILTER PRODUCTS ..
  filterProducts(key:any,event:any){
    const value = event
    // this.textLength = event
    const criteria = this.searchText.split(';').filter(Boolean).reduce((acc:any, crit:any) => {
      const [k, v] = crit.split(':');
      acc[k] = v;
      return acc;
    }, {});
 
    criteria[key] = value;
    this.searchText = Object.entries(criteria).map(([k, v]) => `${k}:${v}`).join(';');
   //  this.cdr.markForCheck();
   }
}