import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';
import { DatePipe } from "@angular/common";
import { allproduct } from 'src/app/models/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';

@Component({
  selector: 'b2b-rfq-order-table-two',
  templateUrl: './rfq-order-table-two.component.html',
  styleUrls: ['./rfq-order-table-two.component.css']
})
export class RfqOrderTableTwoComponent implements OnInit {

  @Input() tableHeading: any[] = [];
  @Input() height: string = "";
  @Input() checked: boolean = true;
  @Input() tableColumnSpacing: string = "101fr .5fr";
  @Input() vendartable: any = [

  ]

  selectedTable: any = ''
  now: any = ""
  deatails: any = ''
  remarks:any =''
  deleteorder:boolean=false
  deletedata :any = {}
  deletetype:any= ''
  continueButton: boolean = false
  isUploadDocument :boolean = false
  Dropdown:any=''
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
  button_name: any[] = [{ "name": "Approval process" },
  { "name": "Order process" },
  { "name": "Chat" },
  { "name": "Email" }]
  selectedButton: any = ''

  purchaserequestRandom: any = {
    purchase_request_random: ''
  }

  rfqSelectorHeading: any[] = [{
    "Select-All": "Select All",
    "Select-Vendors": "Select Vendors",
    "image": "https://banner2.cleanpng.com/20180421/qtq/kisspng-vendor-supplier-diversity-organization-business-ma-manufacture-5adb62d2931869.5891363615243271226025.jpg"
  }]

  // rfqColumnSpacing = "3*minmax(126px,1.6fr)"
  rfqColumnSpacing = "14*1fr"

  allSelected = 0
  approxiPrice = 0
  itemCost = 0
  totalCost = 0
  isShowSelectVenderButton : boolean = false
  isApproveLoader :boolean = false
  // new
  @Output() dataEvent = new EventEmitter();
  @Output() reloadRfq = new EventEmitter();
  @Output() ifDO = new EventEmitter();
  price_symbol:any = ''

  // @Output() toggleRFQ_DRCount = new EventEmitter();
  user_Role:any = ''
  selectedData :any = []
  
  isAllCheck :any = false
  trackingType :any = {
    type :'',
    order:''
  }  
  isTraking :boolean = false
  constructor(private router: Router, private toast: NgToastService, private HotelService: HotelService, private route: ActivatedRoute, private AppserviceService: AppserviceService,private authService: AuthServiceService) {
    if (this.selectedButton) {
      this.selectedButton
    }
    else {
      this.selectedButton = this.button_name[0]['name']
    }
  }

  url :any = {
    expanded : '',
    hotelId : '',
    productType :'',
    nav  :''
  }
  isLoggedIn: boolean = false;

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      let id = params.get("expanded");
      if(id) this.selectedTable = id;
    })

    this.route.paramMap.subscribe((params) => {
      let id = params.get("ids");
      if(id) this.url.hotelId = id;
    })

    this.route.paramMap.subscribe((params) => {
      let id = params.get("productType");
      if(id) this.url.productType = id;
    })

    this.route.paramMap.subscribe((params) => {
      let id = params.get("nav");
      if(id) this.url.nav = id;
    })

    this.route.paramMap.subscribe((params) => {
      let id = params.get("expanded");
      if (id) this.selectedTable = id;
    })
    this.AppserviceService.country_price_symbol$.subscribe((symbol:any) =>{
      if(symbol){
        this.price_symbol = symbol

      }
    })
    if(!this.isLoggedIn){
      console.log(this.vendartable)
    }else{
      this.vendartable = this.removeDuplicatesByProperty(this.vendartable,'purchase_request_random')

      this.continueButton = true
      const datePipe = new DatePipe('en-Us');
      this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
      // console.log(this.vendartable)
      console.log(this.vendartable)
  
      
  
      console.log(this.vendartable)
  
    }
   
  }
  

  // Switch Toggle
  toggleClick(number: any) {
    this.purchaserequestRandom.purchase_request_random = number
    this.AppserviceService.rfqSelectedAllData([])

    this.HotelService.PurchaseRequesSwitch_rfq(this.purchaserequestRandom).subscribe({
      next: (response) => {
        console.log(response)
        this.toast.success({ detail: "SUCCESS", summary: 'Success -Switched To RFQ Order', duration: 3000 });

        // rfq-order , rfq-order-table component
        // this.AppserviceService.rfqRequestReload('reloadPR')
        this.reloadRfq.emit('DO');

      },
      error: (error) => {
        this.toast.error({ detail: "ERROR", summary: 'failed', duration: 3000 });
        console.log(error);
      },
    })
  }


  continute() {
    console.log(this.productDetails)
  }

  ngOnChanges(i: any) {
    sessionStorage.setItem('registration', JSON.stringify(this.productDetails));
    // this.isApproveLoader = false
  }
  closeButton() {
    this.pichartpopUp = false
  }
  
  poupQuotation(i: any,data:any) {
    this.AppserviceService.popupData(true)
    this.AppserviceService.rfqSdata(data)

    console.log(data)

    const arr = []
    arr.push(data)
    
    this.dataEvent.emit(arr);
    this.ifDO.emit('DO')
  }

  popup(randomId :any , type:any,allDetails:any,order='DO Number:'){
    // this.pichartpopUp=true
    this.isTraking = true
    this.router.navigate([{ids:this.url.hotelId, expanded: this.selectedTable ,productType:this.url.productType , rfq_Id : randomId}], { relativeTo: this.route });
    this.trackingType.type = type
    this.trackingType.order = order
    this.trackingType.screen='PO'
    this.trackingType.Hotel_Name_id = this.url.hotelId
    this.trackingType.order_id = allDetails.id
    this.trackingType.finance_price_percent = allDetails.finance_  //New
    this.trackingType.finance = allDetails.approve
  }
  uploadDocument(){
    this.isUploadDocument = !this.isUploadDocument
  }
  buttonclicked(event: any) {
    this.selectedButton = event
  }

  isSlectVendor:boolean = false
  calculateTotal(event: any,randomId:any,allDetails:any) {
    console.log(allDetails)
    this.isAllCheck = false
    this.user_Role = allDetails.approve
    if(allDetails.approve == 'YES'){
      this.isSlectVendor = true
    }else{
      this.isSlectVendor = false
    }

    this.selectedData = []

    this.vendartable.forEach((element:any) => {
      if(element.purchase_request_random == randomId){
        element.ischecked = event.target.checked
      }
      
    });

    this.vendartable.forEach((element:any) => {
      if(element.product_id == this.selectedTable && element.ischecked == true){
        this.selectedData.push(element)
      }
    });

    const selectType = {
      type : 'DO',
      data :this.selectedData
    }

    console.log(selectType)

    this.AppserviceService.rfqSelectedAllData(selectType);
    
    // this.selectedData.forEach((element:any) => {
    //   if(element.ischecked != false){
    //     this.isAllCheck = true
    //   }
    // });

    if(this.selectedData.length == this.vendartable.length){
      this.isAllCheck = true
    }

    if(this.selectedData.length > 0 && this.isAllCheck == true){
      this.isAllCheck = true
    }

    // this.isAllCheck = false
  }


  selectAll(event:any) {

    // console.log(this.vendartable)
    this.isAllCheck = !this.isAllCheck

      for (let i = 0; i < this.vendartable.length; i++) {
        this.vendartable[i]['ischecked'] = event.target.checked; // Set the initial value of 'ischecked' to false
      }

      this.selectedData = []

      this.vendartable.forEach((element:any) => {
      //  <mychange>
        // this.selectedData.push(element)

        if(element.ischecked == true){
          this.selectedData.push(element)
        }
      });

      console.log(this.selectedData)
      const selectType = {
        type : 'DO',
        data :this.selectedData
      }

      if(event.target.checked == true){
        this.AppserviceService.rfqSelectedAllData(selectType);
      }else{
        this.AppserviceService.rfqSelectedAllData({});
      }

  }


  selectDataForQutation(){

    if(this.selectedData.length > 0){
      this.AppserviceService.popupData(true)
      this.AppserviceService.rfqSdata(this.selectedData)
  
      this.dataEvent.emit(this.selectedData);
      this.ifDO.emit('DO')

    }
    
  }

  DropDown(value:any,productId:any,random_number:any){
    this.Dropdown=value;

    const obj = {
      product_id : productId,
      purchase_request_random : random_number ,
      payment_terms : value,
    }
    
    this.vendartable.forEach((element:any) => {
      if(element.purchase_request_random == random_number){
        element.payment_terms = obj.payment_terms.length > 0 ? value : 'Net 0'
        console.log(element.payment_terms)
      }

      return element
    });

    this.HotelService.payment_terms(obj).subscribe((res)=>{
      console.log(res)
    })

    
  }
  canceldelete(){
    this.deleteorder = false
  }
  
  delete(rejectdata:any, type:any){
    this.deletedata = rejectdata
    this.deletetype = type
    this.deleteorder = true
  }
  rejectpopup:boolean = false
  reject1reason:any =''
approve_reject(){
  this.rejectpopup = true

}
  Reject(rejectdata:any, type:any){
  
   
    if(type =='select'){
      const select_multi = [rejectdata.id]
      this.selectedData.forEach((element:any) => {
        select_multi.push(element.id)
      })

      const data={
         id : select_multi,
         reject_reason : this.remarks
       }
       console.log(data)
      this.HotelService.pipeline_reject(data).subscribe(response => {
        console.log(response)
        this.toast.success({detail:"SUCCESS",summary:'Success -Order Deleted',duration:3000});
        this.deleteorder = false
        this.vendartable = this.vendartable.filter((item:any) => !select_multi.includes(item.id));
      })
    }

    if(type == 'order_reject_multi'){
      const order_id:any = []
      this.selectedData.forEach((element:any) => {
        order_id.push(element.id)
      });

      const payload = {
        'Hotel_Name_id' : this.url.hotelId,
        'id': order_id,
        'approved' : '0',
        'reject_reason': this.reject1reason

      }

      this.HotelService.approve_order(payload).subscribe((res:any) =>{
        this.toast.success({detail:"REJECTED",summary:'REJECTED',duration:3000});
        this.AppserviceService.rfqRequestReload('DO')
        this.deleteorder = false
        this.rejectpopup = false
      },(error) =>{
        console.log(error)
        this.toast.error({detail:"ERROR",summary:error.status,duration:3000});
      })
    }
  }

  approveOrder(){
    console.log(this.selectedData)
    this.isApproveLoader = true
    const order_id:any = []
    this.selectedData.forEach((element:any) => {
      order_id.push(element.id)
    });

    const payload = {
      'Hotel_Name_id' : this.url.hotelId,
      'id': order_id,
      'approved' : '1',
    }

    if(this.user_Role == 'Finance'){
      this.HotelService.approve_order_by_finance_manager(payload).subscribe((res: any) => {
        console.log(res)
        this.isApproveLoader = false
        this.toast.success({ detail: "Approved by Finance Manager", summary: 'Approved', duration: 3000 });
        this.AppserviceService.rfqRequestReload('DO')
      },err => this.isApproveLoader = false)
    }else{
      this.HotelService.approve_order(payload).subscribe((res: any) => {
        this.isApproveLoader = false
        this.toast.success({ detail: "APPROVED", summary: 'Approved', duration: 3000 });
        this.AppserviceService.rfqRequestReload('DO')
      },(error) => {
        console.log(error)
        this.isApproveLoader = false
        this.toast.error({ detail: "ERROR", summary: error.status, duration: 3000 });
      })
    }
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