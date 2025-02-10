import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { DatePipe } from '@angular/common';
import { DateTime } from 'luxon';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';
import { DemohotelService } from 'src/app/service/demohotel.service';


@Component({
  selector: 'b2b-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  serviceimg:boolean=false
  openchat:boolean= false
  upload_image:any = 'assets/upload_image.jpg'

  orders:any={}
  openlink = this.HotelService.projecturl()
  orderTable: any[] = [
    {
      sort: "PR NO",
      full: "Purchase Request Number",
      one: 'Purchase Request',
      two: 'Number'
    },
    {
      sort: "Req Person & Dep",
      full: "Requested Person & Department",
      one: 'Requested Person',
      two: '& Department'
    },
    {
      sort: "Vendor SKU Number",
      full: "Vendor SKU Number",
      one: 'Vendor SKU',
      two: 'Number'
    },
    {
      sort: "P.O. Number",
      full: "Purchase Order Number",
      one: 'Purchase Order',
      two: 'Number'
    },
    {
      sort: "Req Qty",
      full: "Required Quantity",
      one: 'Required Quantity',
      two: '(Hotel)'
    },
    {
      sort: "Req Qty",
      full: "Required Quantity",
      one: 'Required Quantity',
      two: '(Vendor)'
    },
    {
      sort: "P. Pcs/Box",
      full: "Vendor - Price per Pcs / Box(case) / Dozen",
      one: 'Vendor - Price per Pcs /',
      two: 'Box(case) / Dozen'
    },
    {
      full: "Total Cost",
      one: 'Total',
      two: 'Cost'
    },
    {
      sort: "Req. Date",
      full: "Required Date",
      one: 'Required',
      two: 'Date'
    },
    {
      sort: "Spec. Vendor",
      full: "Specified Vendor",
      one: 'Specified',
      two: 'Vendor'
    },
    {
      sort: "Hotel Remarks",
      full: "Hotel Remarks",
      one: 'Hotel',
      two: 'Remarks'
    },
    {
      sort: "Payment Terms",
      full: "Payment Terms",
      one: 'Payment',
      two: 'Terms'
    },
    {
      sort: "V. Apprvl",
      full: "Vendor Approval",
      one: 'Vendor',
      two: 'Approval'
    },
    {
      sort: "ETA",
      full: "Estimated Time of Arrival",
      one: 'Estimated Time',
      two: 'of Arrival'
    },
    {
      sort: "VDS",
      full: "Vendor Delivery Status",
      one: 'Vendor Delivery',
      two: 'Status'
    },
    {
      sort: "A/D Days",
      full: "Advance/Delay Days",
      one: 'Advance/Delay',
      two: 'Days'
    },
    {
      sort: "Material Received on",
      full: "Material Received on",
      one: 'Material',
      two: 'Received on'
    },
    {
      sort: "Rcvd Qty",
      full: "Received Quantity",
      one: 'Received',
      two: 'Quantity'
    },
    {
      sort: "QSW",
      full: "Quality Size & Weight",
      one: 'Quality Size &',
      two: 'Weight'
    },
    {
      sort: "Price /Pcs",
      full: "Price /Pcs",
      one: 'Price - per Pcs /',
      two: 'Box(case)/ Dozen'
    },
    {
      sort: "Purchase manager Remarks",
      full: "Purchase Manager Remarks",
      one: 'Purchase Manager',
      two: 'Remarks'
    },
    {
      sort: "V. Remarks",
      full: "Vendor Remarks",
      one: 'Vendor',
      two: 'Remarks'
    },
    {
      sort: "Upload Docs",
      full: "Upload All Documents",
      one: 'Upload ALL',
      two: 'Documents'
    },
    {
      sort: "PFD",
      full: "Push for Discrepancies",
      one: 'Push for',
      two: 'Discrepancies'
    },
    {
      sort: "Apv. for Pmt.",
      full: "Approve for Payment",
      one: 'Approve for',
      two: 'Payment'
    },
    {
      payment: 'yes',
      sort: "Payment Date",
      full: "Payment Date",
      one: 'Payment',
      two: 'Date'
    },
    {
      payment: 'yes',
      sort: "Cheque/Check Copy",
      full: "Cheque/Check Copy",
      one: 'Cheque/',
      two: 'Check Copy'
    },
    {
      payment: 'yes-all',
      sort: "View all Documents",
      full: "View all Documents",
      one: 'View all',
      two: 'Documents'
    },
    {
      payment: 'yes',
      sort: "Complete the order",
      full: "Complete the order",
      one: 'Complete',
      two: 'order'
    }
    // "PR NO", "Req Person & Dep","P.O. Number", "Req Qty","Price Pcs/Box", "Req. Date", "Spec. Vendor", "VSC", "Hotel Remarks", "V. Apprvl", "ETA", "VDS", "A/D Days", "Order Received on","Rcvd Qty","QSW","Price /Pcs","Purch.Mgr. Remarks","Vend. Remarks","Upload Docs.","PFD","Apv. for Pmt"
  ];
  togglechange: any = 'test'
  readforpay_service:any=[]
  orderprocess:boolean =false
  screen:any=''
  servicedata:any={}
  scheduledOrder: any = [
    {
      full: "Purchase Request Number",
      one: 'Purchase Request',
      two: 'Number'
    },
    {
      full: "Purchase Order Number",
      one: 'Purchase Order',
      two: 'Number'
    },
    {
      full: "Requested Person ",
      one: 'Requested ',
      two: 'Person'
    },
    {
      full: "Department ",
      one: 'Department',
      two: ''
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

    {
      full: "SEND NOW",
      one: 'SEND',
      two: 'NOW'
    }
  ]

  Direct_order: any = [
    {
      full: "Purchase Request Number",
      one: 'Purchase Request',
      two: 'Number'
    },
    {
      full: "Purchase Order Number",
      one: 'Purchase Order',
      two: 'Number'
    },
    {
      full: "Requested Person",
      one: 'Requested',
      two: 'Person'
    },
    {
      full: "Department",
      one: 'Department',
      two: ''
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

  renegotiate: any = [
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
      full: "Vendor SKU Number",
      one: 'Vendor SKU ',
      two: 'Number'
    },
    {
      full: "Purchase Order Number",
      one: 'Purchase Order',
      two: 'Number'
    },
    {
      sort: "Req Qty",
      full: "Required Quantity",
      one: 'Required Quantity',
      two: '(Hotel)'
    },
    {
      sort: "Req Qty",
      full: "Required Quantity",
      one: 'Required Quantity',
      two: '(Vendor)'
    },
    {
      full: "Price-Pcs/Box",
      one: 'Price',
      two: 'Pcs/Box'
    },
    {
      full: "Payment Terms",
      one: 'Payment',
      two: 'Terms'
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
      full: "Vendor Selection Criteria",
      one: 'Vendor Selection',
      two: 'Criteria'
    },
    {
      full: "Hotel Remarks",
      one: 'Hotel',
      two: 'Remarks'
    },
    {
      full: "Estimated Time of Arrival",
      one: 'Estimated Time',
      two: 'of Arrival'
    },
    {
      full: "Vendor Delivery Satus",
      one: 'Vendor',
      two: 'Delivery Satus'
    },

    {
      full: "Vendor Remarks",
      one: 'Vendor',
      two: 'Remarks'
    },

    {
      full: "Renegotiate Purchase Order",
      one: 'Renegotiate',
      two: 'Purchase Order'
    }

  ]

  descerpancy: any = [
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
      full: "Vendor SKU Number",
      one: 'Vendor SKU ',
      two: 'Number'
    },
    {
      full: "Purchase Order Number",
      one: 'Purchase Order',
      two: 'Number'
    },
    {
      sort: "Req Qty",
      full: "Required Quantity(h)",
      one: 'Required Quantity',
      two: '(Hotel)'
    },
    {
      sort: "Req Qty",
      full: "Required Quantity",
      one: 'Required Quantity',
      two: '(Vendor)'
    },
    {

      full: "Vendor - Price per Pcs / Box(case) / Dozen",
      one: 'Vendor - Price per Pcs /',
      two: 'Box(case) / Dozen'
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
      full: "Vendor Selection Criteria",
      one: 'Vendor Selection',
      two: 'Criteria'
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
    {
      full: "Vendor Approval",
      one: 'Vendor',
      two: 'Approval'
    },
    {
      full: "Estimated Time of Arrival",
      one: 'Estimated Time',
      two: 'of Arrival'
    },
    {
      full: "Vendor Delivery Status",
      one: 'Vendor',
      two: 'Delivery Status'
    },

    {
      sort: "Material Received on",
      full: "Material Received on",
      one: 'Material',
      two: 'Received on'
    },
    {
      sort: "Rcvd Qty",
      full: "Received Quantity",
      one: 'Received',
      two: 'Quantity'
    },
    {
      sort: "QSW",
      full: "Quality Size & Weight",
      one: 'Quality Size &',
      two: 'Weight'
    },
    {
      sort: "Price /Pcs",
      full: "Price /Pcs",
      one: 'Price - per Pcs /',
      two: 'Box(case)/ Dozen'
    },
    {
      sort: "Purchase manager Remarks",
      full: "Purchase Manager Remarks",
      one: 'Purchase Manager',
      two: 'Remarks'
    },
    {
      sort: "V. Remarks",
      full: "Vendor Remarks",
      one: 'Vendor',
      two: 'Remarks'
    },
    {
      sort: "Upload Docs",
      full: "Upload All Documents",
      one: 'Upload ALL',
      two: 'Documents'
    },
    {
      sort: "Approve for Payment",
      full: "Approve for Payment",
      one: 'Approve for',
      two: 'Payment'
    }
  ]

  Readypayement: any = [
    {
      full: "Purchase Request Number",
      one: 'Purchase  ',
      two: 'Request Number'
    },
    {
      full: "Requested Person & Department",
      one: 'Requested Person',
      two: '& Department'
    },
   
    {
      full: "Vendor SKU Number",
      one: 'Vendor SKU ',
      two: 'Number'
    },
    {
      full: "Purchase Order Number",
      one: 'Purchase Order',
      two: 'Number'
    },
    {
      sort: "Req Qty",
      full: "Required Quantity",
      one: 'Required Quantity',
      two: '(Hotel)'
    },
    {
      sort: "Req Qty",
      full: "Required Quantity",
      one: 'Required Quantity',
      two: '(Vendor)'
    },
    {
      full: "Price-Pcs/Box",
      one: 'Price',
      two: 'Pcs/Box'
    },
    {
      full: "Total Cost",
      one: 'Total',
      two: 'Cost'
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
      sort: "Order Received on",
      full: "Order Received on",
      one: 'Order',
      two: 'Received on'
    },
    {
      sort: "Rcvd Qty",
      full: "Received Quantity",
      one: 'Received',
      two: 'Quantity'
    },
    {
      sort: "QSW",
      full: "Quality Size & Weight",
      one: 'Quality Size &',
      two: 'Weight'
    },
    {
      sort: "Price /Pcs",
      full: "Price /Pcs",
      one: 'Price - per Pcs /',
      two: 'Box(case)/ Dozen'
    },
    {
      sort: "Purchase manager Remarks",
      full: "Purchase Manager Remarks",
      one: 'Purchase Manager',
      two: 'Remarks'
    },
    {
      sort: "V. Remarks",
      full: "Vendor Remarks",
      one: 'Vendor',
      two: 'Remarks'
    },
    {
      sort: "Upload Docs",
      full: "Upload All Documents",
      one: 'Upload ALL',
      two: 'Documents'
    },
    {
      full: "Payment Terms",
      one: 'Payment',
      two: 'Terms'
    },
    {
      full: "payment Due",
      one: 'Payment',
      two: 'Due'
    },
    {
      full: "Complete the order",
      one: 'Complete',
      two: 'the order'
    }
  ]

  serviceRequestHeading: any[] = [ "Service Request Number", "Requested Person","Vendor", "Picture/Video","Room Number/Area","Required Date", "Current Condition", "Issue/Remarks","Payment Terms","Payment Due","Service Cost","Upload Documents","Complete Order"] 

  revoke_orders: any = ''
  revokereason: any = ''
  revokepopup: boolean = false
  directorder_cancel: boolean = false
  directorder_cancel_place: any = ''
  send_date: any = ''
  remarks: any = ''
  directorder_data: any = {}
  orderColumnSpacing = "22*1fr";
  rfqOrder: boolean = false
  pichartpopUp: boolean = false
  details:boolean = false
  advanced_days: any = ''
  documentsarray: any = []
  uploaddocument_type: any = ''
  releaseOrderHeading: string[] = ["Order ", "Order Date", "Vendor Name", "Vendor-Ordered Items", "QTY Ordered", "Price", "UOM", "Total Pro Cost", "Discount", "Total Pro Cost After Discount", "Shipping", "TAXE", "Final Cost"]
  relesedCloumn = "13*0.4fr";
  button_name: any[] = [ { "name": "Order process" }]
 
  selectedButton: any = ''
  relesed_data: any[] = [
    {
      "Order": "857",
      "Date": "10-Dec-22",
      "Name": "Welco",
      "Items": "Single Item",
      "QTY": "70",
      "Price": "Rs.7",
      "UOM": "Piece",
      "Discount": "Rs.4900",
      "Total": "3%",
      "After-discount": "Rs.4753",
      "Shipping": "Rs.470",
      "TAXE": "Rs.570",
      "Cost": "573",
    },
  ];
  
  empprice: any = ''
  vprice: any = '20'
  quality: any = 'DropDown'
  selectedProduct: any = ''
  Reviseorder: boolean = false
  history: boolean = false
  HotelId: string = ''
  releasedOrder: any = []
  isUploadDocument: boolean = false
  isVendorDetails: boolean = false
  negotiate: boolean = false
  underProcess: any = []
  direct_order_send: any = []
  scheduletime: boolean = false
  empCheckRecievedQty: any = {
    Qty: '',
    price: ''
  }

  trackingType: any = {
    type: '',
    order: ''
  }

  revise_data: any = {}
  revise_type: any = ''
  savesession: any = {
    id: '',
    qutreceived: '',
    reciePrice: '',
    managerRemarks: '',
    discrepancy_qty: ''

  }
  showvendor_name: any = ''
  showvendor_id: any = ''
  showvendor_mobilenumber: any = ''
  showvendor_email: any = ''
  showvendor_address: any = ''
  showvendor_zipcode: any = ''

  scheduleOrder: any = []
  purchaseNegotiate: any = []
  negotiateId: any = {}
  selectedTime: any = ''
  discrepancy: any = []
  readyForPayment: any = []
  waiting_for_confirmation: any = []
  refresh: boolean = false
  constructor(private router: Router, private route: ActivatedRoute, private AppserviceService: AppserviceService, private HotelService: HotelService, private toast: NgToastService, private datePipe: DatePipe,private authService: AuthServiceService,private DemohotelService :DemohotelService) {
    if (this.selectedButton) {
      this.selectedButton
    }
    else {
      this.selectedButton = this.button_name[0]['name']
    }
  }

  isTraking: boolean = false
  catelogColumnSpacing = "9*1fr 0.2fr";
  departmentBudget :any = []
  price_symbol:any = ''
  isLoggedIn:boolean=false

  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();

    this.dateTime()
    this.route.paramMap.subscribe((params) => {
      let id = params.get("expanded");
      if (id) this.selectedProduct = id;
    })

    this.route.paramMap.subscribe((params) => {
      let i = params.get("ids");
      if (i) this.HotelId = i
    })

    const payload = {
      Hotel_Name_id: this.HotelId
    }
    this.AppserviceService.country_price_symbol$.subscribe((symbol:any) =>{
      if(symbol){
        this.price_symbol = symbol

      }
      console.log(this.price_symbol)
    })
    if(!this.isLoggedIn){
      this.DemohotelService.Show_Demo_Orders(this.selectedProduct)
      this.AppserviceService.share_demo_orders$.subscribe((d: any) => {
            
        if(d){ 
         
            this.direct_order_send = d.filter((ork:any)=> ork.status == 4)
            this.underProcess = d.filter((ork:any)=> ork.status == 5)
            this.purchaseNegotiate = d.filter((ork:any)=> ork.status == 6)
            this.discrepancy = d.filter((ork:any)=> ork.status == 7)
            this.readyForPayment = d.filter((ork:any)=> ork.status == 8)

       }
       if (this.direct_order_send.length > 0) {
        this.direct_order_send.forEach((org: any) => {
          setTimeout(() => {
            const obj = {
              status: 5,
              id: org.id,
              product_id: org.product_id
            };
             this.DemohotelService.update_demo_hotel(obj);
          }, 20000); // Delays each update by 2 seconds
        });
      }
      if(this.underProcess.length > 0){
        this.underProcess.forEach((orb:any)=>{
          orb.order_status ="Dispatch"
         
        })
        

      }
      if(this.discrepancy.length > 0){
        this.discrepancy.forEach((orb:any)=>{
         
          orb.order_completes_receive ={
            qty_received:orb.vendor_quantity,
            price_received:orb.vendor_coating_price,
            date_received:orb.ETA

          }
        
        })
         }
         if(this.readyForPayment.length > 0){
          this.readyForPayment.forEach((orb:any)=>{
           
              orb.dis_qty_received=orb.vendor_quantity,
              orb.price_received = orb.vendor_coating_price,
              orb.dis_date_received = orb.ETA,
              orb.quality = 'All Good'
              orb.Vendor_remarks = 'Good'
            
          
          })
           }
      })
     


    }else{
 // REFRESH DATA
 this.AppserviceService.notification_reload_data$.subscribe((notify:any) =>{
  if(notify && (notify.status == '14' || notify.status == '15' || notify.status == '17' || notify.status == '18' || notify.status == '19' || notify.status == '7'|| notify.status == '8')){
    this.underProcessOrder()
    this.negotiateprocess()
  }
  if( notify && (notify.status == '7'|| notify.status == '8')){
    this.negotiateprocess()
  }
})

this.HotelService.hotel_budget_view(payload).subscribe((res) => {
  this.departmentBudget = res.budgets
})

this.scheduledOrderData()
this.underProcessOrder()
this.negotiateprocess()

this.savesession = JSON.parse(sessionStorage.getItem('inputs') || "{}")
console.log(this.savesession)
//currency price

    }
   
  }

  negotiateprocess(){
    const orderedProducts: any = {
      Hotel_id: this.HotelId,
      product_id: this.selectedProduct
    }
  
    this.HotelService.connectAPI('POST', '/user_to_vendor_negotiation_pr', orderedProducts).subscribe((res: any) => {
      this.purchaseNegotiate = []
      const renegotiate_purchase_order = this.removeDuplicatesByProperty(res.renegotiate_purchase_order, 'id')
      const rejected_order = this.removeDuplicatesByProperty(res.DO_cancelled, 'id')
      this.purchaseNegotiate = this.purchaseNegotiate.concat(renegotiate_purchase_order, rejected_order);
      console.log(this.purchaseNegotiate)
    }, err =>{
      this.toast.error({ detail: "Error " + err.status, summary: err.error.message, duration: 3000 });
    })
  }
  parseInt2(value: string): number {
    // Check if the string represents a number with a zero decimal part
    if (/^\d+\.\d*0$/.test(value)) {
      // If the decimal part is zero, parse the string to an integer
      return parseInt(value, 10);
    } else {
      // If the decimal part is non-zero or doesn't exist, return the value as is
      return parseFloat(value); // Alternatively, you can return NaN or throw an error
    }
  }

  secheduletime:any=''
  scheduledOrderData() {
    const scheduledOrder: any = {
      Hotel_Name_id: this.HotelId
    }

    this.HotelService.connectAPI('POST', '/schedule_oder', scheduledOrder).subscribe((res: any) => {
      this.scheduleOrder = []
      // this.scheduleOrder.push(res.schedule_oder) 
      // this.scheduleOrder.push(res.schedule_rfq) 
      const removeDublicate = this.removeDuplicatesByProperty(res.schedule_oder, 'mv_id')
      this.scheduleOrder = this.scheduleOrder.concat(removeDublicate, res.schedule_rfq);
      const sch = res.schedule_time[0].hotel_time
      console.log(sch)
      this.secheduletime = this.convertTo12HourFormat(sch)
      console.log(sch)
    },err =>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })
  }

  // UNDER PROCESS
  underProcessOrder() {
    
    const orderedProducts: any = {
      Hotel_id: this.HotelId,
      product_id: this.selectedProduct
    }

       console.log(orderedProducts)
    this.HotelService.connectAPI('POST', '/order_tracking_by_user',orderedProducts).subscribe((res:any) => {
      // UNDER PROCESS
      this.underProcess = []
      const resPonse = this.removeDuplicatesByProperty(res.order, 'id')
      res.diroct_order_send.forEach((re:any) =>{
        re.total_req_qty = re.required_quantity
        re.vendor_coating_price = re.approximate_price
        re.finance_ = this.budget_Calculation(re,re.required_quantity)
      })
      console.log(res.diroct_order_send)

      this.direct_order_send = this.removeDuplicatesByProperty(res.diroct_order_send, 'id')
      console.log(this.direct_order_send)
      this.refresh = false

      const underProcess: any = []
      resPonse.forEach((element: any) => {
        element.isToggle = false
        element.order_status_id = element.order_status
        element.order_status = this.requestOrderStatus(element.order_status)
        element.recieqty = element.rfq_id == this.savesession.id ? this.savesession.qutreceived : ' '
        element.reciePrice = element.rfq_id == this.savesession.id ? this.savesession.reciePrice : ' '
        element.reqDate = element.before_required_date
        element.discrepancy_qty = element.rfq_id == this.savesession.id ? this.savesession.discrepancy_qty : ' '
        element.managerRemarks = element.rfq_id == this.savesession.id ? this.savesession.managerRemarks : ' '
        element.advanced_delayed_days = this.calculateDateDifference(element.ETA, this.send_date)
        
        // DEparment Budget
        const department_id = this.departmentBudget.find((fina: any) => fina.department_name == element.department_name)
        element.departments_id = department_id != null || department_id != undefined ? department_id.department : '0'
        element.finance_ = this.budget_Calculation(element,element.required_quantity)
        underProcess.push(element)
        element.invoices = []
        element.lorryrecepts = []
        element.deliverychalans = []
        element.warrentys =[]
        res.underprocess_documents.forEach((org:any)=>{
          if(org.rfq_from_id == element.id){
            if(org.document_status =='1'){
              element.invoices.push(org.document)
            }
            if(org.document_status =='2'){
              element.lorryrecepts.push(org.document)
            }
            if(org.document_status =='3'){
              element.deliverychalans.push(org.document)
            }
            if(org.document_status =='4'){
              element.warrentys.push(org.document)
            }
          }

        })
      });
           console.log(resPonse)
      this.underProcess = underProcess.sort((a: any, b: any) => {
        if (a.order_status_id == "6" && b.order_status_id != "6") {
          return -1;
        } else if (a.order_status_id != "6" && b.order_status_id == "6") {
          return 1;
        } else {
          return 0;
        }
      });

      // DISCREPANCY
      res.discrepancy.forEach((disc: any) => {
        disc.isToggle = false
        if(disc.order_completes.length >0 || disc.old_datas.length > 0){
        if (Array.isArray(disc.order_completes)) {
          disc.finance_ = this.budget_Calculation(disc,disc.required_quantity)
          disc.order_completes_receive = disc.order_completes.length >0 ? disc.order_completes[0] : disc.old_datas[0]
        } else {
          disc.order_completes_receive = disc.order_completes.length >0 ? disc.order_completes: disc.old_datas

        }
      }else{
        disc.order_completes_receive =[]
      }
        console.log
        disc.invoices = []
        disc.lorryrecepts = []
        disc.deliverychalans = []
        disc.warrentys =[]
        disc.Grns =[]
        res.discrepancy_documents.forEach((org:any)=>{
          if(org.rfq_from_id == disc.id){
            if(org.document_status =='1'){
              disc.invoices.push(org.document)
            }
            if(org.document_status =='2'){
              disc.lorryrecepts.push(org.document)
            }
            if(org.document_status =='3'){
              disc.deliverychalans.push(org.document)
            }
            if(org.document_status =='4'){
              disc.warrentys.push(org.document)
            }
            if(org.document_status =='5'){
              disc.Grns.push(org.document)
            }
          }

        })
      });
     
      this.discrepancy = res.discrepancy

      // READY FOR PAYMENT 
      // res.ready_to_pay.forEach((payment:any) => {
      //   if (Array.isArray(payment.order_completes)) {
      //     payment.order_completes_receive = payment.order_completes[0]
      //   } else {
      //     payment.order_completes_receive = payment.order_completes
      //   }
      // });
    
      this.readyForPayment =[]
      res.service_request.forEach((elem:any)=>{
        elem.imagearray = elem.product_images.split(','); 
         elem.image = elem.imagearray[0]
         elem.payment_due = this.calculatePaymentDueDate(elem.updated_at, elem.payment_terms)
         elem.vendordoc =[]
         elem.hoteldoc =[]
         res.service_request_documents.forEach((org:any)=>{
          if(elem.id == org.service_requests_id){
            if(org.active == '1'){
              elem.vendordoc = org.document.split(',');

            }
            if(org.active == '2'){
              elem.hoteldoc = org.document.split(',');
            }
          }
         })


      })
      console.log(res.service_request)

      this.readyForPayment = res.ready_to_pay
      this.readforpay_service = res.service_request
      console.log(this.readyForPayment)
      this.readyForPayment.forEach((element: any) => {
        element.finance_ = this.budget_Calculation(element,element.required_quantity)
        element.payment_due = this.calculatePaymentDueDate(element.updated_at, element.payment_terms)
        element.total_cost = parseFloat(element.total_cost).toFixed(2)
        element.total_shipping_sales_tax_cost = parseFloat(element.total_shipping_sales_tax_cost).toFixed(2)
        element.Total_sales_gst = parseFloat(element.Total_sales_gst).toFixed(2)
        element.vendor_shipping_cost = parseFloat(element.vendor_shipping_cost).toFixed(2) 
        element.product_total = parseFloat(element.product_total).toFixed(2)
        element.isToggle = false
        element.invoices = []
        element.lorryrecepts = []
        element.deliverychalans = []
        element.warrentys =[]
        element.Grns =[]
        res.ready_to_pay_documents.forEach((org:any)=>{
          if(org.rfq_from_id == element.id){
            if(org.document_status =='1'){
              element.invoices.push(org.document)
            }
            if(org.document_status =='2'){
              element.lorryrecepts.push(org.document)
            }
            if(org.document_status =='3'){
              element.deliverychalans.push(org.document)
            }
            if(org.document_status =='4'){
              element.warrentys.push(org.document)
            }
            if(org.document_status =='5'){
              element.Grns.push(org.document)
            }
          }

        })
        return element
      })
      console.log(this.underProcess)
      //waiting for confirmation
      res.vendor_to_compleate.forEach((payment: any) => {
        if (Array.isArray(payment.order_completes)) {
          payment.order_completes_receive = payment.order_completes[0]
        } else {
          payment.order_completes_receive = payment.order_completes
        }
      });
      this.waiting_for_confirmation = res.vendor_to_compleate
    },err =>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })

  }

  rfqCloseButton() {
    this.rfqOrder = false
  }

  budget_Calculation(order_price:any,quanty:any) {
    // DEPARMENT BUDGET
    const budget = this.departmentBudget.find((fina: any) => fina.department == order_price.departments_id)
    const dep_budget = budget != undefined ? budget.budget_remaining : 0
    const price = parseFloat(order_price.vendor_coating_price) * parseFloat(order_price.total_req_qty)
    const calculate_percentage = (price / parseFloat(dep_budget)) * 100
    return calculate_percentage
  }

  // Send Now option
  sendNowScheduledOrder(data: any) {
    const directOrder = {
      'Hotel_Name_id': this.HotelId,
      'rfq_id': data.mv_id || data.rfq_id,
    }

    this.HotelService.schedule_send_now(directOrder).subscribe((data: any) => {
      console.log(data)
      this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
      this.scheduledOrderData()
      this.underProcessOrder()
    },err =>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })
  }

  popup() {
    this.pichartpopUp = !this.pichartpopUp
  }
  closeButton() {
    // this.pichartpopUp = false
    this.orderprocess = false
  }
  buttonclicked(e: any) {
    this.selectedButton = e
  }
  rfqOrderPopupUp() {
    this.rfqOrder = !this.rfqOrder
  }
  uploadDocument(type: any, document: any) {
    this.uploaddocument_type = type
    this.documentsarray = document
    this.isUploadDocument = true
  }

  trackingPopup(type: any, order: any, screen:any ,column ='Sheduled_') {
    // this.pichartpopUp=true
    this.isTraking = true

    this.trackingType.type = type
    this.trackingType.order = 'Purchase Order Number:'
    this.trackingType.screen = screen
    this.trackingType.Hotel_Name_id = this.HotelId
    this.trackingType.order_id = order.p_id || (order.purchase_requests_id || order.id)
    this.trackingType.finance_price_percent = order.finance_  //New
  }

  ReviseOrder(value: any, type: any) {
    this.revise_data = value
    this.revise_type = type
    this.Reviseorder = true
  }

  vendorDetailsPopup(orders: any, vendorname: any,tab:any) {
    this.isVendorDetails = true
    this.showvendor_name = vendorname
    if(tab == 'SR'){
      this.showvendor_id = orders.vender_id

    }else{
      this.showvendor_id = orders.vendor_id
    }
    this.showvendor_mobilenumber = orders.mobileNumber
    this.showvendor_email = orders.email
    this.showvendor_address = orders.city + ',' + orders.state + ',' + orders.country
    this.showvendor_zipcode = orders.zipCode
  }

  requestOrderStatus(status_id: any) {
    switch (status_id) {

      case '2':
        return 'Purchase Order'

      case '3':
        return 'Sales Order'

      case '4':
        return 'Pick & Pack'

      case '5':
        return 'Ready For Dispatch'

      case '6':
        return 'Dispatch'

      case '7':
        return 'Discrepancy'


      case '8':
        return 'Order for Payment'

      case '9':
        return 'Completed Order'

      case '10':
        return 'Cancelled Order'

      case '11':
        return 'Renegotiate Purchase Order'

      case '12':
        return 'Rejected Purchase Order'

      default:
        // Test
        return '';

        break;
    }
  }

  // Usage: Remove duplicates based on "product_id"
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

  // DropDown
  image_mark(event: any) {
    const image_marker = document.getElementById("image-element");
    const marker = document.getElementById("marker-element");
    if (image_marker && marker) {
      image_marker.style.display = "block"
      let clickX = event.clientX;
      let clickY = event.clientY;
      let imageWidth = image_marker.offsetWidth;
      let imageHeight = image_marker.offsetHeight;

      marker.style.left = clickX + "px";
      marker.style.top = clickY + "px";
      console.log("X" + clickX + '----- Y' + clickY);
    } else {
      console.error("Image or marker element not found.");
    }
  }

  Quality(value: any, data: any, screen: any) {
    if (screen == 'up') {
      data.discrepancy_qty = value;
      this.savedata(value, data.rfq_id, 'quality')

    }
    if (screen == 'des') {
      data.order_completes_receive.quality = value

    }
  }

  Renegotiate(id: any) {
    this.negotiateId = {
      id: id,
      type: 'hotel',
    }
    this.negotiate = true
  }
  schedule_time() {
    this.scheduletime = !this.scheduletime

  }

  onTimeSelected() {
    console.log('Selected Time:', this.selectedTime);
  }
  calculateDateDifference(date1: any, date2: any) {

    console.log(date1, date2)
    const date1Obj = new Date(date1);
    const date2Obj = new Date(date2);

    const differenceInTime = date2Obj.getTime() - date1Obj.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
    // this.advanced_days = differenceInDays
    // return Math.abs(differenceInDays); // Absolute value in case date2 is before date1
  }

  // SELECTED DATE
  selecteDate: any = ''
  receivedDate(date: any, requiredDate: any, reqDate: any) {
    console.log(date)
    console.log(requiredDate)
    this.selecteDate = date
    reqDate.reqDate = date
    reqDate.advanced_delayed_days = this.calculateDateDifference(reqDate.ETA, date)
    console.log(this.calculateDateDifference)
    if (requiredDate == date) {
      console.log('success')
    }
  }
  
  submitScheduledTime() {
    const payload = {
      'Hotel_id': this.HotelId,
      'scheduled_time': '5:30:00',
      'hotel_time': this.selectedTime + ':00'
    }

    this.HotelService.hotel_time(payload).subscribe((res) => {
      console.log(res)
      this.toast.success({ detail: "Submitted", summary: 'Schedule Time Updated', duration: 5000 });
      this.scheduletime = false
      // this.scheduledOrderData()
    },err=>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })
  }

  GNR: any = []
  check: any = []
  extra_document: any = []
  invoiceDocument(event: any) {
    if (event.type == 'GNR') {
      this.GNR = event.file
    }
    if (event.type == 'check') {
      this.check = event.file
    }

    if (event.type == 'extra_document') {
      this.extra_document = event.file
    }
    console.log(event)
  }

  sendPyment(id: any, qty: any, price: any, reqDate: any, managerRemarks: any, quality: any, type: any, screen: any,index:any,allObj:any) {
    console.log(allObj)
   if(this.isLoggedIn){
    let form = new FormData();
    form.append('Hotel_Name_id', this.HotelId);
    form.append('rfq_form_id', id);
    form.append('qty_received', qty);
    form.append('quality', quality);

    form.append('price_received', price);
    form.append('date_received', this.send_date);
    form.append('command_by_user', managerRemarks);
    form.append('order_for_payment', type);

    for (let i = 0; i < this.GNR.length; i++) {
      const file = this.GNR[i];
      form.append('Gnr_document[]', file, file.name);
    }
    for (let i = 0; i < this.extra_document.length; i++) {
      const file = this.extra_document[i];
      form.append('Other_document[]', file, file.name);
    }

    const payload = {
      'Hotel_Name_id': this.HotelId,
      'rfq_form_id': id,
      'qty_received': qty,
      'price_received': price,
      'date_received': reqDate,
      'command_by_user': managerRemarks,
      'order_for_payment': type,
    }
    console.log(payload)
    if(screen == 'discrepancy') {
      this.HotelService.order_from_discrepancy_ready_to_pay(form).subscribe({
        next: (res) => {
          console.log(res)
          this.underProcessOrder()
          // this.toggle_On_Off(this.descerpancy,this.toggleIndex)
          this.AppserviceService.reloadData('reload_readyforpay')

          this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
          this.GNR = []
          this.extra_document = []
        },
        error: (error) => {
          this.toast.error({ detail: "Error", summary: 'Upload GRN Documents', duration: 3000 });
          // this.toggle_On_Off(this.descerpancy,this.toggleIndex)
        }
      })
    } else {
      console.log(form)
      this.HotelService.order_received(form).subscribe({
        next: (res) => {
          console.log(res)
          sessionStorage.clear();

          this.underProcessOrder()
          if (type == '1') {
            this.AppserviceService.reloadData('reload_readyforpay')
            console.log('done')
          }
          this.GNR = []
          this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
          this.extra_document = []
        },
        error: (error) => {
          this.togglechange = 'test'
          this.toast.error({ detail: "Error", summary: 'Upload GRN Documents', duration: 3000 });
        }
      })
    }
   }else{
    const obj = {
      status: type == 0 ? 7 : 8,
      id: allObj.id,
      product_id: allObj.product_id
    };
    this.DemohotelService.update_demo_hotel(obj);
   }
   

  }

  reloadOrderStatus() {
    this.refresh = true
    this.underProcessOrder()
  }
  downloadpdf(id: any) {
    const quation_id = { id: id };
    this.HotelService.invoice_Pdf(quation_id).subscribe(
      (data: any) => {
        this.saveFile(data, 'PO_Invoice.pdf');
      },
      err => {
        console.error('Error fetching PDF:', err);
        this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
      }
    );
  }


  saveFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    this.toast.success({ detail: " Sucessfully PDF Downloaded", summary: 'Success', duration: 5000 });
    console.log("file downloaded")
  }

  // toggle_On_Off(arr:any,index: number) {
  //   if (index >= 0 && index < arr.length) {
  //     this.discrepancy[index].isToggle = !this.discrepancy[index].isToggle;
  //   }
  // }


  calculatePaymentDueDate(updatedAt: string, paymentTerms: string): string {
    // Extract the payment terms (assuming it's always a number)
    const paymentTermsMatch = paymentTerms.match(/\d+/);
    const parsedPaymentTerms = paymentTermsMatch ? parseInt(paymentTermsMatch[0]) : 0;

    // Parse the updated_at date string into a Date object
    const updatedAtDate = new Date(updatedAt);

    // Calculate the payment due date by adding payment terms (days) to the updated_at date
    const paymentDueDate = new Date(updatedAtDate.getTime() + parsedPaymentTerms * 24 * 60 * 60 * 1000);
    console.log(paymentDueDate)
    // Format the payment due date using DatePipe
    const formattedDueDate = this.datePipe.transform(paymentDueDate, 'dd-MMM-yyyy') || '';
    console.log(formattedDueDate)
    return formattedDueDate;
  }

  Ready_upload(orders: any,screen:any,index:any) {
    if(!this.isLoggedIn){
      const obj = {
        status: 9,
        id: orders.id,
        product_id: orders.product_id
      };
      this.DemohotelService.update_demo_hotel(obj);

    }else{
      let form = new FormData();
      form.append('product_id', orders.product_id);
      form.append('Hotel_Name_id', orders.Hotel_Name_id);
  
      for (let i = 0; i < this.check.length; i++) {
        const file = this.check[i];
        form.append('check_receipt[]', file, file.name);
      }
      for (let i = 0; i < this.extra_document.length; i++) {
        const file = this.extra_document[i];
        form.append('Other_document[]', file, file.name);
      }
       if(screen == '1'){
        form.append('mv_id', orders.rfq_id);
  
        this.HotelService.completed_order_hotel(form).subscribe({
          next: (res) => {
            console.log(res)
            this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
            this.underProcessOrder()
          },
          error: (error) => {
            this.toast.error({ detail: "Error", summary: 'Required Documents', duration: 3000 });
          }
        })
    
       }else{
        form.append('service_request_random', orders.service_request_random);
  
        this.HotelService.service_request_complete(form).subscribe({
          next: (res) => {
            console.log(res)
            this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
            this.underProcessOrder()
          },
          error: (error) => {
            this.toast.error({ detail: "Error", summary: 'Required Documents', duration: 3000 });
          }
        })
    
       }
    }
   
    

  }


  view_history() {
    this.history = true
  }
  Directorder_delete(order: any, place: any) {
    this.directorder_cancel = true
    this.directorder_cancel_place = place
    this.directorder_data = order
  }
  Directorder_delete_close() {
    this.directorder_cancel = false

  }
  Reject(data: any, place: any) {
    switch (place) {
      case 'directorder_sent':
        const orders = {
          product_id: data.product_id,
          mv_id: data.mv_id,
          Hotel_Name_id: data.Hotel_Name_id,
          rejected_reason: this.remarks,
          vp:data.vp
        }
        this.HotelService.hotel_diractorder_cancelled(orders).subscribe((data: any) => {
          console.log(data)
          this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
          this.directorder_cancel = false

        },err =>{
          this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
        })
        break
      case 'underprocess':
        const orders2 = {
          id: data.id,
          rejected_reason: this.remarks,
          vp:data.vp
        }
        this.HotelService.underprocess_cancel(orders2).subscribe((data: any) => {
          console.log(data)
          this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
          this.directorder_cancel = false
        },err =>{
          this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
        }
        )
        break
      case 'renegotiate':
        const orders3 = {
          id: data.id,
          rejected_reason: this.remarks
        }
        this.HotelService.renegotiate_rejected(orders3).subscribe((data: any) => {
          console.log(data)
          this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
          this.directorder_cancel = false
        },err =>{
          this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
        })
        break

    }
  }
  dateTime() {
    // Get current date and time using Luxon
    const currentDate = DateTime.local();
    // Get the month abbreviation
    const monthAbbreviation = currentDate.toFormat('LLL'); // 'LLL' gives the abbreviated month name
    // Format date in 'dd-MMM-yyyy' format
    const sendtodaydate = currentDate.toFormat('dd') + '-' + monthAbbreviation + '-' + currentDate.toFormat('yyyy');
    // Assign the formatted date to dateString
    this.send_date = sendtodaydate;
  }

  RevokePO(data: any) {
    this.revoke_orders = data
    this.revokereason = ''
    this.revokepopup = true

  }
  revokeclose() {
    this.revokepopup = false

  }
  Revokeorder(data: any) {

    const order = {
      id: data,
      reason: this.revokereason
    }
    this.HotelService.hotel_rework(order).subscribe((response)=>{
        this.revokepopup = false
        this.underProcessOrder()
        this.toast.success({ detail: "Submitted", summary: 'Success', duration: 5000 });
      },err => {
        this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
      }
    )
  }
  savedata(data: any, id: any, type: any) {
    this.savesession.id = id
    switch (type) {
      case 'qty':
        this.savesession.qutreceived = data
        this.underProcess.forEach((element: any) => {
          if (element.rfq_id == id) {
            element.recieqty = data

          }
        })
        break;
      case 'price':
        this.savesession.reciePrice = data
        this.underProcess.forEach((element: any) => {
          if (element.rfq_id == id) {
            element.reciePrice = data

          }
        })
        break;
      case 'coment':
        this.savesession.managerRemarks = data
        this.underProcess.forEach((element: any) => {
          if (element.rfq_id == id) {
            element.managerRemarks = data

          }
        })
        break;
      case 'quality':


        this.underProcess.forEach((element: any) => {
          if (element.rfq_id == id) {
            element.discrepancy_qty = data
            this.savesession.discrepancy_qty = data
          }
        })
        break;

    }

    console.log(this.savesession)
    sessionStorage.setItem('inputs', JSON.stringify(this.savesession));


  }
  viewdocuments(){
    console.log(this.selectedProduct)
    console.log(this.HotelId)
    this.router.navigate([{ids: this.HotelId, expanded: this.selectedProduct  ,nav:"All Documents"}], { relativeTo: this.route });

  }
  loopprice:any=[]
  Viewreport(orders:any){
    console.log(orders)
    this.details = true
    this.loopprice = [
      {'key':'Purchase order number','value': orders.mv_id|| orders.rfq_id},
      {'key':'Price Per Pic','value':this.price_symbol + orders.vendor_coating_price},
      {'key':'Required Quantity','value':orders.dis_qty_received ? orders.dis_qty_received: orders.vendor_quantity},
      {'key':'Product Total','value':this.price_symbol +orders.product_total },
      {'key':'Sales Tax Percentage','value':orders.vendor_gst+ '%'},
      {'key':'Sales Tax Amount','value': this.price_symbol +orders.Total_sales_gst},
      {'key':'Shipping Percentage','value': orders.shipping_percent+ '%'},
      {'key':'Shipping Amount','value':this.price_symbol +orders.vendor_shipping_cost},
      {'key':'Shipping Sales-Tax percentage','value':orders.Shiping_sales_tax+ '%'},
      {'key':'Shipping Sales-Tax Amount','value':this.price_symbol + orders.total_shipping_sales_tax_cost},
      {'key':'Total Cost','value':this.price_symbol +orders.total_cost}

    ]

  }
  convertTo12HourFormat(time24: string): string {
    // Split the time into hours, minutes, and seconds
    if(time24){
      const [hour, minute, second] = time24.split(':').map(Number);

      // Determine AM or PM
      const period = hour >= 12 ? 'PM' : 'AM';
  
      // Convert hour from 24-hour to 12-hour format
      const hour12 = hour % 12 || 12;
  
      // Format the time string in 12-hour format
      const time12 = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')} ${period}`;
      
      return time12;
    }
    return ''
}
closeimg(){
  this.serviceimg=false
}
ServiceIMG(images:any) {
  this.serviceImages = images
  this.serviceimg=true
  this.currentImageIndex = 0;
 
}
serviceImages: any[] = [
 
];

currentImageIndex = 0; // Keep track of the current image index

// Function to display the next image
nextImage(): void {
  if (this.currentImageIndex < this.serviceImages.length - 1) {
    this.currentImageIndex++;
  } else {
    // If at the end, loop back to the first image
    this.currentImageIndex = 0;
  }
}

// Function to display the previous image
previousImage(): void {
  if (this.currentImageIndex > 0) {
    this.currentImageIndex--;
  } else {
    // If at the beginning, loop to the last image
    this.currentImageIndex = this.serviceImages.length - 1;
  }
}
defaultVideoThumbnail: string = 'assets/video.png'; // Update this path

 isImage2(fileUrl: string): boolean {
  if (!fileUrl) {
    return false;
  }
  
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
  return fileExtension ? imageExtensions.includes(fileExtension) : false;

 }
 isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  isVideo(url: string): boolean {
    return url.match(/\.(mp4|webm|ogg)$/) != null;
  }
  openorderprocess(data:any){
    this.orderprocess = true
    this.screen = 'service'
    this.servicedata=data
    console.log(this.servicedata)
  }

  missing_qty(value1: any, value2: any): number {
    return parseFloat((value1 - value2).toFixed(2));
  }
  chat_and_email(orders:any){
    this.openchat = true
    this.orders = orders

  }
}


