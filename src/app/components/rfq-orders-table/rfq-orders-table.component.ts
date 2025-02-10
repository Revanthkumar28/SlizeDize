import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DatePipe } from "@angular/common";
import { allproduct } from 'src/app/models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';

import { DemohotelService } from 'src/app/service/demohotel.service';

@Component({
  selector: 'b2b-rfq-orders-table',
  templateUrl: './rfq-orders-table.component.html',
  styleUrls: ['./rfq-orders-table.component.css']
})
export class RfqOrdersTableComponent implements OnInit {

  @Input() tableHeading: any = [];
  @Input() height: string = "";
  @Input() checked: boolean = true;
  @Input() tableColumnSpacing: string = "";
  test: any = '0.5fr 17*1fr'
  @Input() vendartable: any = []
  selectedTable: any = ''
  now: any = ""
  deatails: any = ''
  continueButton: boolean = false
  Dropdown: any = null
  productDetails: allproduct = {
    // item:'',
    // req_date:'date',
    // delivery:'date',
    lead_time: '',
    dept: '',
    qty: '',
    price: '',
    tax: '',
    shipping_cost: '',
    total_amount: '',
    price_comparison: '',
    shipment_status: '',
    po_stage: '',
    supplier: ''
  }
  popupdata: any = ''
  pichartpopUp: boolean = false
  popupquoatation: boolean = true
  isShowSelectVenderButton: boolean = false
  button_name: any[] = [{ "name": "Approval process" },
  { "name": "Order process" },
  { "name": "Chat" },
  { "name": "Email" }]
  selectedButton: any = ''
  rfqToDirectOrderCount: any = []
  isApproveLoader :boolean = false
  
  @Output() rfqData = new EventEmitter();
  @Output() toggleCount = new EventEmitter();
  @Output() ifRFQ = new EventEmitter();

  constructor(private router: Router, private toast: NgToastService, private route: ActivatedRoute, private HotelService: HotelService, private AppserviceService: AppserviceService,private DemohotelService :DemohotelService,private authService: AuthServiceService) {
    if (this.selectedButton) {
      this.selectedButton
    }
    else {
      this.selectedButton = this.button_name[0]['name']
    }
  }
  purchaserequestRandom: any = {
    purchase_request_random: ''
  }

  countArr: any = []

  directOrderCalculation: any = {
    "Direct Order": "RFQ Order",
    "totalQuantitySelected": "Total Quantity Selected",
    "quantity": "205",
    "ApproxItemCost": "Approx.item cost",
    "Rupees": "Rs.25",
    "ApproxTotalCost": "Approx.Total Cost",
    "total": "Rs.125 (+Tax+Shipping)",
    "tax": "",
    "tax-amount": "",
    "tax-shipping": ""
  }

  rfqSelectorHeading: any[] = [{
    "Select-All": "Select All",
    "Select-Vendors": "Select Vendors",
    "image": "https://banner2.cleanpng.com/20180421/qtq/kisspng-vendor-supplier-diversity-organization-business-ma-manufacture-5adb62d2931869.5891363615243271226025.jpg"
  }
  ]
  rfqColumnSpacing = "16*1fr 0.3fr"

  allSelected: boolean = false
  checkboxArray: any = []
  remarks: any = ''
  deleteorder: boolean = false
  deletedata: any = {}
  deletetype: any = ''

  isDisabled = false
  selectedData: any = []
  isAllCheck: any = false
  vendartable_DRCount: any = []
  isUploadDocument: boolean = false

  @Output() dataEvent = new EventEmitter();
  @Output() reloadRfq = new EventEmitter();
  price_symbol:any = ''
  // @Output() toggleRFQ_DRCount = new EventEmitter();

  url: any = {
    expanded: '',
    hotelId: '',
    productType: '',
    nav: ''
  }
  isTraking: boolean = false
  trackingType: any = {
    type: '',
    order: ''
  }
  isLoggedIn: boolean = false;
  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();

    this.route.paramMap.subscribe((params) => {
      let id = params.get("expanded");
      if (id) this.selectedTable = id;
    })

    this.route.paramMap.subscribe((params) => {
      let id = params.get("ids");
      if (id) this.url.hotelId = id;
    })

    this.route.paramMap.subscribe((params) => {
      let id = params.get("productType");
      if (id) this.url.productType = id;
    })

    this.route.paramMap.subscribe((params) => {
      let id = params.get("nav");
      if (id) this.url.nav = id;
    })
    this.AppserviceService.country_price_symbol$.subscribe((symbol:any) =>{
      console.log(symbol)
      if(symbol){
        this.price_symbol = symbol

      }
    })
    if(!this.isLoggedIn){
      // this.AppserviceService.share_demo_orders$.subscribe((d: any) => {
      //   if(d){
      //     console.log(d)
      //     d.forEach((org:any)=>{
      //       if(org.status == 1){
      //         org.approve = 'YES'
      //       }
      //     })
      //     this.vendartable = d
      //     console.log(this.vendartable)

      //   }

      // })
      console.log(this.vendartable)

    }else{
      this.AppserviceService.directFalseRequest$.subscribe((d: any) => {
        console.log(d)
        if (d === true) {
          this.isDisabled = true
        }
        if (d === false) {
          this.isDisabled = false
        }
  
      })
  
      this.vendartable = this.removeDuplicatesByProperty(this.vendartable,'purchase_request_random')
  
      this.continueButton = true
      const datePipe = new DatePipe('en-Us');
      this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
      // console.log(this.vendartable)
  
      console.log(this.vendartable)
      this.vendartable.forEach((element: any) => {
        element.approximate_price = parseInt(element.approximate_price);
        element.approximate_shipping_cost = parseInt(element.approximate_shipping_cost);
      });
      // rfq-order-table-2
      this.AppserviceService.toggle_directOrder$.subscribe((data: any) => {
        if (data) {
          this.vendartable = []
  
          data.forEach((element: any) => {
            if (this.selectedTable == element.product_id && element.rfq_send == 'yes') {
              this.vendartable.push(element)
            }
          });
  
          this.toggleCount.emit(this.vendartable.length);
          console.log(this.vendartable.length)
        }
  
      })
  
      // new
      this.AppserviceService.rfqSelectedAllData$.subscribe((d: any) => {
        if (d != null) {
          if (d.type == 'DO' || d.type == 'SR') {
            this.selectedData = []
            this.isAllCheck = false
            this.isShowSelectVenderButton = true
          } else {
            this.isShowSelectVenderButton = false
          }
        }
  
      })
  
    
    }
   
  }

  togglePost(number: any) {
    console.log(number)
    console.log('test double time')
    // this.vendartable = []
    this.vendartable_DRCount = []

    this.purchaserequestRandom.purchase_request_random = number
    this.HotelService.PurchaseRequestSwitch_diractorder(this.purchaserequestRandom).subscribe(response => {
      console.log(response)
      this.toast.success({ detail: "SUCCESS", summary: 'Success -Switched To Direct Order', duration: 3000 });
      // rfq-order , rfq-order-table , rfq-order-tableTwo component
      // this.AppserviceService.rfqRequestReload('')
      this.reloadRfq.emit('rfq');
    })
    console.log(this.vendartable)
  }

  continute() {
    console.log(this.productDetails)
  }

  ngOnChange(i: any) {
    sessionStorage.setItem('registration', JSON.stringify(this.productDetails));
    // this.isApproveLoader = false
  }

  poupQuotation(i: any, data: any) {
    this.AppserviceService.popupData(true)
    data.purchase_request_random = `${data.purchase_request_random}`
    this.AppserviceService.rfqSdata(data)

    console.log(data)
    const arr = []
    arr.push(data)

    this.dataEvent.emit(arr);
    this.ifRFQ.emit('RFQ')
  }

  popup(randomId: any, type: any, allDetails: any, screen = 'PO', order = 'RFQ Number:') {
    // this.pichartpopUp=true
    this.isTraking = true
    this.router.navigate([{ ids: this.url.hotelId, expanded: this.selectedTable, productType: this.url.productType, rfq_Id: randomId }], { relativeTo: this.route });
    this.trackingType.type = type
    this.trackingType.finance = allDetails.approve
    this.trackingType.finance_price_percent = allDetails.finance_  //New
    this.trackingType.order = order
    this.trackingType.screen = screen
    this.trackingType.Hotel_Name_id = this.url.hotelId
    this.trackingType.order_id = allDetails.id
    console.log(allDetails)
  }

  user_Role :any = ''
  approveOrder() {
    console.log(this.selectedData)
    this.isApproveLoader = true
    const order_id: any = []
    this.selectedData.forEach((element: any) => {
      order_id.push(element.id)
    });

    const payload = {
      'Hotel_Name_id': this.url.hotelId,
      'id': order_id,
      'approved': '1',
    }

    if(this.user_Role == 'Finance'){
      this.HotelService.approve_order_by_finance_manager(payload).subscribe((res: any) => {
        console.log(res)
        this.isApproveLoader = false
        this.toast.success({ detail: "Approved by Finance Manager", summary: 'Approved', duration: 3000 });
        this.AppserviceService.rfqRequestReload('RFQ')
      },err => this.isApproveLoader = false)
    }else{
      this.HotelService.approve_order(payload).subscribe((res: any) => {
        this.isApproveLoader = false
        this.toast.success({ detail: "APPROVED", summary: 'Approved', duration: 3000 });
        this.AppserviceService.rfqRequestReload('RFQ')
      },(error) => {
        console.log(error)
        this.isApproveLoader = false
        this.toast.error({ detail: "ERROR", summary: error.status, duration: 3000 });
      })
    }

    
  }

  buttonclicked(event: any) {
    this.selectedButton = event
  }
  uploadDocument() {
    this.isUploadDocument = !this.isUploadDocument
  }

  isSlectVendor :boolean = false
  calculateTotal(event: any, randomId: any,allDetails:any) {
    console.log(allDetails)
    this.isAllCheck = false
    this.user_Role = allDetails.approve
    if(allDetails.approve == 'YES'){
      this.isSlectVendor = true
    }else{
      this.isSlectVendor = false
    }
    this.vendartable.forEach((element: any) => {
      if (element.purchase_request_random == randomId) {
        element.ischecked = event.target.checked
      }
    });

    console.log(this.vendartable)
    this.selectedData = []

    this.vendartable.forEach((element: any) => {
      if (element.product_id == this.selectedTable && element.ischecked == true) {
        this.selectedData.push(element)
      }
    });

    const selectType = {
      type: 'RFQ',
      data: this.selectedData
    }

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

  selectAll(event: any) {
    this.isAllCheck = !this.isAllCheck
    // console.log(this.vendartable)
    
    for (let i = 0; i < this.vendartable.length; i++) {
      this.vendartable[i]['ischecked'] = event.target.checked; // Set the initial value of 'ischecked' to false
    }

    this.selectedData = []
    this.vendartable.forEach((element: any) => {
      if (element.product_id == this.selectedTable && element.ischecked == true) {
        this.selectedData.push(element)
      }
    });

    const selectType = {
      type: 'RFQ',
      data: this.selectedData
    }

    if (event.target.checked == true) {
      this.AppserviceService.rfqSelectedAllData(selectType);
    } else {
      this.AppserviceService.rfqSelectedAllData({});
    }
    // this.calculateTotal('');

  }


  selectDataForQutation() {
    if (this.selectedData.length > 0) {
      this.AppserviceService.popupData(true)
      this.AppserviceService.rfqSdata(this.selectedData)
      this.dataEvent.emit(this.selectedData);
      this.ifRFQ.emit('RFQ')
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
  canceldelete() {
    this.deleteorder = false
  }

  delete(rejectdata: any, type: any) {
    this.deletedata = rejectdata
    this.deletetype = type
    this.deleteorder = true
  }
  rejectpopup:boolean = false
  reject1reason:any =''
approve_reject(){
  this.rejectpopup = true

}
  Reject(rejectdata: any, type: any) {

   

    if (type == 'order_reject_multi') {
      const order_id: any = []
      this.selectedData.forEach((element: any) => {
        order_id.push(element.id)
      });

      const payload = {
        'Hotel_Name_id': this.url.hotelId,
        'id': order_id,
        'approved': '0',
        'reject_reason': this.reject1reason
      }

      this.HotelService.approve_order(payload).subscribe((res: any) => {
        this.toast.success({ detail: "REJECTED", summary: 'REJECTED', duration: 3000 });
        this.AppserviceService.rfqRequestReload('RFQ')
        this.rejectpopup = false
      }, (error) => {
        console.log(error)
        this.toast.error({ detail: "ERROR", summary: error.status, duration: 3000 });
      })
    }

    if (type == 'select') {
      const data = {
        id: [rejectdata.id],
        reject_reason: this.remarks
      }
      console.log(data)


      this.HotelService.pipeline_reject(data).subscribe(response => {
        console.log(response)
        this.toast.success({ detail: "SUCCESS", summary: 'Success -Order Deleted', duration: 3000 });
        this.deleteorder = false

      })
    }
  }

  selectedApprove(type:any){

  }

  transformPlacementData1 (brandProductsName: string): string {
    if (brandProductsName != null) {
      const words = brandProductsName.split(' ');
      if (words.length > 1) {
        return words.slice(0, 1).join(' ') + '...';
      } else {
        return brandProductsName;
      }
    }
    return '-';
  }

  transformPlacementData2 (brandProductsName: string): string {
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

  // REMOVE DUBLICATES
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
}


