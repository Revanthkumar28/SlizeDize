import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';
import { DemohotelService } from 'src/app/service/demohotel.service';
@Component({
  selector: 'b2b-rfq-orders',
  templateUrl: './rfq-orders.component.html',
  styleUrls: ['./rfq-orders.component.css']
})
export class RfqOrdersComponent implements OnInit, OnDestroy {
  p_request: any = ''
  selectedTable: any = ''
  selectedHotel: any = ''
  openchat:boolean= false
  upload_image:any = 'assets/upload_image.jpg'


  select_product: any = []
  rforder: boolean = true
  serviceimg: boolean = false
  documentsarray: any = []


  selectedImages: string[] = []; // Array to store selected images for a service_request_random
  // currentImageIndex: number = 0; // Index of the currently displayed image
  orderprocess: boolean = false
  uploaddocument_type = ''
  Reviseorder: boolean = false
  revise_data: any = {}
  revise_type: any = ''
  screen: any = ''
  servicedata: any = []
  servicehistory: any = []
  servicereorder: any = []
  orders:any=[]
   demo_do_id:any=''
  directOrderCalculation: any = {
    "Direct Order": "Direct Order",
    "totalQuantitySelected": "Total Qty Selected",
    "quantity": 0,
    "ApproxItemCost": "Approx.item Cost",
    "Rupees": 0,
    "ApproxShippingCost": "",
    "Taxes": '',
    "ApproxTotalCost": 0,
    "total": "Rs.125 (+Tax+Shipping)",
    "tax": "",
    "tax-amount": "",
    "tax-shipping": ""
  }
  tableHeading: any[] = [
    {

      full: "PR Selected",
      one: 'PR Selected',
      two: ''
    },
    {

      full: "RFQ Number",
      one: 'RFQ',
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

      full: "Push RFQ to DO",
      one: 'Push',
      two: 'RFQ to DO'
    },
    {

      full: "Select Vendor",
      one: 'Select',
      two: 'Vendor'
    },

  ];

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

  rfqSelectorHeading: any[] = [{
    "Select-All": "Select All",
    "Select-Vendors": "Select Vendors",
    "image": "https://banner2.cleanpng.com/20180421/qtq/kisspng-vendor-supplier-diversity-organization-business-ma-manufacture-5adb62d2931869.5891363615243271226025.jpg"
  }
  ]
  rfqSelectorHeading_two: any[] = [{
    "Select-All": "Select All",
    "Select-Vendors": "Select Vendors",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBQwjbXycbtuLSEUkWeQp5y1RW-ViNqKCrrdO-YDRuKb3XZ5q4K0_PLZEbJQK53_zoHPI&usqp=CAU"
  }
  ]
  rerviceRequest_3: any[] = [{
    "Select-All": "Select All",
    "Select-Vendors": "Select Vendors",
    "image": "data:image/png;base64,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"
  }
  ]

  serviceRequestHeading: any[] = ["Service Request Number", "Requested Person & Department", "Vendor", "Picture/Video", "Room Number/Area", "Required Date", "Current Condition", "Issue/Remarks", "Payment Terms", "Service Cost", "Status", "Upload Documents", "Move to Payment", ""]
  // tableHeading: any[] = ["PR Selected", "RFQ Number", "Requested Person & Department","Last Ordered Price Per Pcs/Box(Case)/Dozen", "Required Quantity"," Box(Case) Quantity",'Last Ordered Price(Total)',"Approx. Shipping cost","Total Cost","Required Date", "Specified Vendor","Remarks","Payment Terms","Reason for Rejecting the Request","Push RFQ to DO", "Select Vendor"];
  // tableHeading_two: any[] = ["PR Selected", "Direct Number", "Requested Person & Department","Last Ordered Price Per Pcs/Box(Case)/Dozen", "Required Quantity"," Box(Case) Quantity",'Last Ordered Price(Total)',"Approx. Shipping cost","Total Cost","Required Date", "Specified Vendor","Remarks","Payment Terms","Reason for Rejecting the Request","Push DO to RFQ", "Select Vendor"];
  tableColumnSpacing = "0.6fr 15*1fr"
  serviceRequestSpacing = "13*1fr 0.5fr"
  rfqColumnSpacing = "0.5fr 11*1fr 0.2fr"
  directOrderSpaccing = "13*1fr"
  product_id: any = ''

  openconfirmpopup: boolean = false
  screentype: any = ''
  nameofsend: any = ''

  serviceRequesData: any[] = []
  vendartable: any = []
  vendartable_2: any = [
  ]
  pichartpopUp: boolean = false
  button_name: any[] = [{ "name": "Order process" }]

  selectedButton: any = ''
  @Input() checked: boolean = false;
  @Input() checkedDirectOrder: boolean = true
  @Input() checkedServiceRequest: boolean = true
  @Input() popupThree: boolean = true
  padding: any = '0 0 10px 0'
  submitButon: boolean = true
  productClick: boolean = false
  iconpopup: boolean = false

  clickPlus: boolean = true
  vendarTable: any = []
  orderTable: any = ""
  rfq: any = 'RFQ-Request for Quotation'
  selectRfq: any = ""
  rfqData: any = ''
  total: any = 0
  statusOrder: boolean = false
  isTraking: boolean = false
  trackingType: any = {
    type: '',
    order: ''
  }
  isUploadDocument: boolean = false
  appPrice: any = "0"
  totalCost: any = "0"
  itemCost: any = "0"
  receivedChildData: any = []
  receivedVendorDetails: any = ''

  vendorSelectmultiRq: any = {}

  // new

  //images array
  imageArray: any = [];

  requestDataId: any = []
  selectedData: any = []
  hoverColor: any = '--color-green'

  toggleCountZero: any = 0
  toggleCountZeroDirectOrder: any = 0

  isAllCheck: any = false
  isLoader: boolean = true
  private unsubscrip: Subscription | null = null;

  url: any = {
    productTypeTemp_brand: ''
  }

  RequstGetId: any = {
    Hotel_Name_id: '',
    product_id: ''
  }
  departmentBudget: any = []

  constructor(private router: Router, private route: ActivatedRoute, private toast: NgToastService, private AppserviceService: AppserviceService, private HotelService: HotelService, private location: Location,private authService: AuthServiceService,private DemohotelService :DemohotelService) {
    if (this.selectedButton) {
      this.selectedButton
    } else {
      this.selectedButton = this.button_name[0]['name'];
    }


  }

  HotelId:any=''
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    // navigara router urls
    this.isLoggedIn = this.authService.login();
  

    this.route.paramMap.subscribe((params) => {
      this.product_id = params.get("expanded");
      let expanded = params.get("expanded");
      let ids = params.get("ids");
      this.HotelId = ids
      let productType = params.get("productType");
      this.AppserviceService.popupData(false)
      this.selectedTable = expanded;

      if (expanded) {
        this.RequstGetId.product_id = expanded

      }

      if (ids) {
        this.selectedHotel = ids;
        this.RequstGetId.Hotel_Name_id = ids
      }

      if (productType) {
        this.url.productTypeTemp_brand = productType;
      }
    });

    if(!this.isLoggedIn){
     this.DemohotelService.Show_Demo_Orders(this.RequstGetId.product_id)
     setTimeout(() => {

      this.AppserviceService.share_demo_orders$.subscribe((d: any) => {
        if(d){
          d.forEach((org:any)=>{
            org.purchase_request_random = org.rfq_id
            org.required_quantity = org.qty
             org.approve = 'YES'

           
          })
          this.vendartable = d.filter((ork:any)=> ork.status == 1)
          this.vendartable_2 = d.filter((ork:any)=> ork.status == 2)
          this.toggleCountZero = d.length
          this.isLoader = false
          this.toggleCountZeroDirectOrder = this.vendartable_2.length
  
        }
       
      })
    },2000)

     
    }


    this.AppserviceService.rfqSelectedAllData([])
    // DEPARTMENT PRICE
    const payload = {
      Hotel_Name_id: this.selectedHotel
    }
    if(this.isLoggedIn){
      this.HotelService.hotel_budget_view(payload).subscribe((res) => {
        this.departmentBudget = res.budgets
      })
    }
   


    // all-vendor-details component , name used = VendorTotal
    this.AppserviceService.vendortotalSubscribe$.subscribe((a: any) => {
      this.total = a
    })

    this.AppserviceService.poupSubsribe$.subscribe((data: any) => {
      this.iconpopup = data
    })

    console.log(this.vendarTable)
    this.AppserviceService.quotationSubscribe$.subscribe((data: any) => {
      this.selectRfq = data
    })

    this.AppserviceService.rfqdataSubscribe$.subscribe((data: any) => {
      this.p_request = data
    })

    this.p_request = JSON.parse(localStorage.getItem('p_request') || "[]")
    console.log(this.p_request)

    this.p_request.forEach((element: any) => {
      if (element.product_id == this.selectedTable) {
        this.select_product.push(element)
      }
    });

    // new

    this.AppserviceService.rfqSelectedAllData$.subscribe((d: any) => {
      console.log(d)
      if (d != '') {
        this.orderTable = d.type
        this.requestDataId = d.data
        this.directOrderCalculation.quantity = 0;
        this.directOrderCalculation.Rupees = 0
        this.directOrderCalculation.ApproxShippingCost = 0
        this.directOrderCalculation.Taxes = 0
        this.directOrderCalculation.ApproxTotalCost = 0

        d.data.forEach((item: any) => {
          this.directOrderCalculation.quantity += parseInt(item.case_quantity);
          this.directOrderCalculation.Rupees += parseInt(item.approximate_price);
          this.directOrderCalculation.ApproxShippingCost = this.directOrderCalculation.Rupees / 10
          this.directOrderCalculation.Taxes = this.directOrderCalculation.Rupees / 8
          this.directOrderCalculation.ApproxTotalCost = this.directOrderCalculation.Rupees + this.directOrderCalculation.ApproxShippingCost + this.directOrderCalculation.Taxes

        });
        // this.directOrderCalculation.ApproxTotalCost = this.directOrderCalculation.quantity * this.directOrderCalculation.Rupees

        if (d.type == 'DO' || d.type == 'RFQ') {
          this.selectedData = []
          this.isAllCheck = false
        }

      } else {
        this.directOrderCalculation.quantity = 0
        this.directOrderCalculation.Rupees = 0
        this.directOrderCalculation.ApproxTotalCost = 0
        this.orderTable = ''
        this.selectedData = []
        this.requestDataId = []
      }

    })

    // REFRESH DATA
    if(this.isLoggedIn){
      this.AppserviceService.notification_reload_data$.subscribe((notify: any) => {
        if (notify && this.selectedTable != '') {
          if (notify.status == '1d' || notify.status == "4") {
            this.directOrderRequest()
          }
          if (notify.status == '1r' || notify.status == "4") {
            this.rfqRequest()
          }
          if (notify.status == '31') {
            this.serviceReques()
          }
        }
  
      })
    }
   

    console.log(this.serviceRequesData)
    if(this.isLoggedIn){

    this.AppserviceService.rfqRequestReload('')
    this.unsubscrip = this.AppserviceService.rfqRequestReload$.subscribe((d) => {
      if (d == 'RFQ') {
        this.rfqRequest()
      } else if (d == 'DO') {
        this.directOrderRequest()
      } else if(this.selectedTable != ''){
        this.rfqRequest()
        this.directOrderRequest()
        this.serviceReques()
      }
    })
    }
    console.log('Rfq-order-1')
    // this.reloadRequest('reload')

    // rfq-process-list, rfq order components this for green color 
    // this.AppserviceService.rfqCompareGreenButton('base')
  }
  

  ngOnDestroy() {
    if (this.unsubscrip) {
      this.unsubscrip.unsubscribe();
    }  
  }
  splitExpandString(input: string): { a: number, b: number } {
    const [a, b] = input.split('-').map(Number);
    if (isNaN(a) || isNaN(b)) {
      throw new Error("Invalid input format");
    }
    return { a, b };
  }
  popup(randomId: any, type: any, screen = 'PO', order = 'Service Request Number:') {
    // this.pichartpopUp=true
    this.isTraking = true
    this.router.navigate([{ ids: this.url.hotelId, expanded: this.selectedTable, productType: this.url.productType, rfq_Id: randomId }], { relativeTo: this.route });
    this.trackingType.type = type
    this.trackingType.order = order
    this.trackingType.screen = screen
  }


  reloadRequest(reload: any) {
    // if (reload == 'reloadPR' || reload == 'rfq' || reload == 'DO') {
    this.rfqRequest()
    this.directOrderRequest()
    this.serviceReques()
    // }
  }

  //  RFQ Order
  rfqRequest() {
    this.HotelService.PurchaseRequestSwitch_rfq_view(this.RequstGetId).subscribe((data: any) => {
      this.vendartable = []
      // WAITING FOR APPROVE ORDER 
      data.purchase_requests_approved_waiting.forEach((element: any) => {
        element.approximate_price = parseInt(element.approximate_price);
        element.approximate_shipping_cost = parseInt(element.approximate_shipping_cost);
        element.requested_on = element.requested_on
        element.approve = 'NO'

        // DEPARMENT BUDGET
        const budget = this.departmentBudget.find((fina: any) => fina.department == element.departments_id)
        const dep_budget = budget != undefined ? budget.budget_remaining : 0
        const price = parseFloat(element.approximate_price) * parseFloat(element.required_quantity)
        const calculate_percentage = (price / parseFloat(dep_budget)) * 100
        element.finance_ = calculate_percentage

        if (element.product_id == this.selectedTable) {
          this.vendartable.push(element)
        }
      });

      // ROLE AND PRIVILAGES , DEPARTMENT MANAGER USER APPROVED ORDER ONLY CAN SEE
      let idsToRemove = data.purchase_requests_approved_waiting_finas.map((item: any) => item.purchase_request_random);
      let filteredArr1 = data.purchase_requests_approved.filter((item: any) => !idsToRemove.includes(item.purchase_request_random));
      if (filteredArr1) {
        // data.assan_to_vendor.forEach((element:any) => { 
        filteredArr1.forEach((element: any) => {
          element.approximate_price = parseInt(element.approximate_price);
          element.approximate_shipping_cost = parseInt(element.approximate_shipping_cost);
          element.requested_on = this.formatDate(element.requested_on)
          element.approve = 'YES'

          // DEPARMENT BUDGET
          const budget = this.departmentBudget.find((fina: any) => fina.department == element.departments_id)
          const dep_budget = budget != undefined ? budget.budget_remaining : 0
          const price = parseFloat(element.approximate_price) * parseFloat(element.required_quantity)
          const calculate_percentage = (price / parseFloat(dep_budget)) * 100
          element.finance_ = calculate_percentage

          if (element.product_id == this.selectedTable) {
            this.vendartable.push(element)
          }
        });
      }

      // WAITING FOR APPROVE FINACE MANAGER 
      // const finance_approve = data.purchase_requests_approved_waiting_finas.filter((value: any) => !data.purchase_requests_approved.includes(value.purchase_request_random));
      data.purchase_requests_approved_waiting_finas.forEach((element: any) => {
        element.approximate_price = parseInt(element.approximate_price);
        element.approximate_shipping_cost = parseInt(element.approximate_shipping_cost);
        element.requested_on = element.requested_on
        element.approve = 'Finance'

        // DEPARMENT BUDGET
        const budget = this.departmentBudget.find((fina: any) => fina.department == element.departments_id)
        const dep_budget = budget != undefined ? budget.budget_remaining : 0
        const price = parseFloat(element.approximate_price) * parseFloat(element.required_quantity)
        const calculate_percentage = (price / parseFloat(dep_budget)) * 100
        element.finance_ = calculate_percentage

        if (element.product_id == this.selectedTable) {
          this.vendartable.push(element)
        }
      });

      // APPROVED ORDER 
      data.purchase_requests_approved_finas.forEach((element: any) => {
        element.approximate_price = parseInt(element.approximate_price);
        element.approximate_shipping_cost = parseInt(element.approximate_shipping_cost);
        element.requested_on = element.requested_on
        element.approve = 'YES'

        // DEPARMENT BUDGET
        const budget = this.departmentBudget.find((fina: any) => fina.department == element.departments_id)
        const dep_budget = budget != undefined ? budget.budget_remaining : 0
        const price = parseFloat(element.approximate_price) * parseFloat(element.required_quantity)
        const calculate_percentage = (price / parseFloat(dep_budget)) * 100
        element.finance_ = calculate_percentage

        if (element.product_id == this.selectedTable) {
          this.vendartable.push(element)
        }
      });

      // REJECT PURCHASE ORDER
      data.purchase_requests_rejected.forEach((element: any) => {
        element.approximate_price = parseInt(element.approximate_price);
        element.approximate_shipping_cost = parseInt(element.approximate_shipping_cost);
        element.requested_on = element.requested_on
        element.approve = 'REJECT'

        if (element.product_id == this.selectedTable) {
          this.vendartable.push(element)
        }
      });

      // this.vendartable = this.removeDuplicatesByProperty(this.vendartable,'purchase_request_random')

      this.toggleCountZero = this.vendartable.length
      this.vendartable = this.sortedOrderStatus(this.vendartable)
      console.log(this.vendartable)

      if (this.vendartable.length == 0) {
        this.isLoader = false
      }
    })
  }

  directOrderRequest() {
    this.HotelService.PurchaseRequestSwitch_diractorder_view(this.RequstGetId).subscribe((data: any) => {
      this.vendartable_2 = []
      // WAITING FOR APPROVE ORDER 
      data.purchase_requests_approved_waiting.forEach((element: any) => {
        element.approximate_price = parseInt(element.approximate_price);
        element.approximate_shipping_cost = parseInt(element.approximate_shipping_cost);
        element.requested_on = element.requested_on
        element.approve = 'NO'

        // DEPARMENT BUDGET
        const budget = this.departmentBudget.find((fina: any) => fina.department == element.departments_id)
        const dep_budget = budget != undefined ? budget.budget_remaining : 0
        const price = parseFloat(element.approximate_price) * parseFloat(element.required_quantity)
        const calculate_percentage = (price / parseFloat(dep_budget)) * 100
        element.finance_ = calculate_percentage

        if (element.product_id == this.selectedTable) {
          this.vendartable_2.push(element)
        }
      });

      // ROLE AND PRIVILAGES , DEPARTMENT MANAGER USER APPROVED ORDER ONLY CAN SEE
      let idsToRemove = data.purchase_requests_approved_waiting_finas.map((item: any) => item.purchase_request_random);
      let filteredArr1 = data.purchase_requests_approved.filter((item: any) => !idsToRemove.includes(item.purchase_request_random));
      console.log(idsToRemove)
      console.log(filteredArr1)

      // const po_approved = data.purchase_requests_approved.filter((value: any) => !data.purchase_requests_approved_waiting_finas.includes(value.purchase_request_random));
      if (filteredArr1) {
        filteredArr1.forEach((element: any) => {
          element.approximate_price = parseInt(element.approximate_price);
          element.approximate_shipping_cost = parseInt(element.approximate_shipping_cost);
          element.requested_on = this.formatDate(element.requested_on)
          element.approve = 'YES'

          if (element.product_id == this.selectedTable) {
            this.vendartable_2.push(element)
          }

        });
      }

      // WAITING FOR APPROVE FINACE MANAGER 
      data.purchase_requests_approved_waiting_finas.forEach((element: any) => {
        element.approximate_price = parseInt(element.approximate_price);
        element.approximate_shipping_cost = parseInt(element.approximate_shipping_cost);
        element.requested_on = element.requested_on
        element.approve = 'Finance'

        // DEPARMENT BUDGET
        const budget = this.departmentBudget.find((fina: any) => fina.department == element.departments_id)
        const dep_budget = budget != undefined ? budget.budget_remaining : 0
        const price = parseFloat(element.approximate_price) * parseFloat(element.required_quantity)
        const calculate_percentage = (price / parseFloat(dep_budget)) * 100
        element.finance_ = calculate_percentage

        if (element.product_id == this.selectedTable) {
          this.vendartable_2.push(element)
        }
      });

      // APPROVED ORDER 
      data.purchase_requests_approved_finas.forEach((element: any) => {
        element.approximate_price = parseInt(element.approximate_price);
        element.approximate_shipping_cost = parseInt(element.approximate_shipping_cost);
        element.requested_on = element.requested_on
        element.approve = 'YES'

        // DEPARMENT BUDGET
        const budget = this.departmentBudget.find((fina: any) => fina.department == element.departments_id)
        const dep_budget = budget != undefined ? budget.budget_remaining : 0
        const price = parseFloat(element.approximate_price) * parseFloat(element.required_quantity)
        const calculate_percentage = (price / parseFloat(dep_budget)) * 100
        element.finance_ = calculate_percentage

        if (element.product_id == this.selectedTable) {
          this.vendartable_2.push(element)
        }
      });

      // REJECT PURCHASE ORDER
      data.purchase_requests_rejected.forEach((element: any) => {
        element.approximate_price = parseInt(element.approximate_price);
        element.approximate_shipping_cost = parseInt(element.approximate_shipping_cost);
        element.requested_on = element.requested_on
        element.approve = 'REJECT'

        if (element.product_id == this.selectedTable) {
          this.vendartable_2.push(element)
        }
      });

      // this.vendartable_2 = this.removeDuplicatesByProperty(this.vendartable_2,'purchase_request_random')
      this.toggleCountZeroDirectOrder = this.vendartable_2.length
      console.log(this.vendartable_2)

      if (this.vendartable_2.length == 0) {
        this.isLoader = false
      }

      console.log(this.vendartable_2)
      this.vendartable_2 = this.sortedOrderStatus(this.vendartable_2)

    })
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

  servicefullorder: any = []
  serviceReques() {
    this.HotelService.service(this.RequstGetId).subscribe((data: any) => {
      console.log(data)
      this.servicefullorder = data
      this.serviceRequesData = []
      this.serviceRequesData = data.service
      this.serviceRequesData.forEach((elem: any) => {
        elem.imagearray = elem.images.split(',');
        elem.image = elem.imagearray[0]
        if (elem.document != null) {
          elem.documentarray = elem.document.split(',');

        }


        switch (elem.work_status) {

          case '0':
            elem.working_status = 'Not Started'
            break;
          case '1':
            elem.working_status = 'Under Process'
            break;
          case '2':
            elem.working_status = 'Completed'
            break;
          case '3':
            elem.working_status = 'Cancelled'
            break;


        }

        if (this.serviceRequesData.length == 0) {
          this.isLoader = false
        }
        console.log(this.serviceRequesData)
      })


    })
  }


  mergeObjects(arr: any[]): any[] {
    const result: any[] = [];

    arr.forEach(obj => {
      const existing = result.find(item => item.id === obj.id);
      if (existing) {
        // If an object with the same ID exists, push the image to its image array
        if (obj.product_image) {
          existing.image.push(obj.product_image);
        }
      } else {
        // If the object doesn't exist, add it to the result array
        obj.image = obj.product_image ? [obj.product_image] : null;
        result.push(obj);
      }
    });

    return result;
  }


  receiveData(data: any) {
    console.log(data)
    this.receivedChildData = data;
    console.log(this.receivedChildData)
  }

  // all Vendor Details component

  receiveSelectVendorData(data: any) {
    this.receivedVendorDetails = data;
  }

  checkbox(event: any) {
    if (event.target.checked == true) {
      this.directOrderCalculation.quantity = 0

      this.orderTable = "RFQ"
      this.checked = true
      this.checkedDirectOrder = false
      this.vendarTable = []

      this.vendartable.map((s: any) => {
        this.vendarTable.push(s['pur.request'])
        this.directOrderCalculation.quantity += parseInt(s.required_quantity)
      })
      this.selectRfq = this.vendarTable

    }
    else {
      this.selectRfq = ""
      this.checked = false
      this.directOrderCalculation.quantity = 0
    }
  }


  directOrderChcekbox(e: any) {
    this.directOrderCalculation.quantity = 0
    if (e.target.checked == true) {
      this.checkedDirectOrder = true
      this.orderTable = "Direct Order"
      this.checked = false
      this.vendarTable = []
      this.vendartable_2.map((s: any) => {
        this.vendarTable.push(s['pur.request'])
        this.directOrderCalculation.quantity += parseInt(s.required_quantity)
      })
      this.selectRfq = this.vendarTable

    }
    else {

      this.selectRfq = ""
      this.checkedDirectOrder = !true
    }
  }

  confirmpopup(type: any) {

    this.screentype = type
    this.openconfirmpopup = true

    switch (type) {
      case 'schedule':
        this.nameofsend = 'Do you want to schedule this order?'
        break;
      case 'direct_order':
        this.nameofsend = 'Do you want to send this order Directly?'
        break;
      case 'RFQ':
        this.nameofsend = 'Do you want to send this Quatation ?'
        break
    }

  }
  submitButton(requestType: string) {

    // multi select request
    this.vendorSelectmultiRq = []
    const vendorId: any = []
    const rfq_id: any = []
    var product_id: any = ''


    // sinle select request
    let vendorId1: any = ''
    let rfq_id1: any = ''
    var product_id1: any = ''
    let scheduleID: any = []

    const vendorArr = JSON.parse(localStorage.getItem('hotelNameId') || "[]")

    this.receivedVendorDetails.forEach((element: any) => {
      vendorId.push(element.vendor_id)
      vendorId1 = element.vendor_id
    });

    this.receivedChildData.forEach((d: any) => {
      product_id = d.product_id
      product_id1 = d.product_id
       this.demo_do_id = d.id
      rfq_id.push(d.purchase_request_random)
      rfq_id1 = d.purchase_request_random
      scheduleID.push(d.id)
    });

    this.vendorSelectmultiRq = {
      Hotel_Name_id: vendorArr.hatelNameId,
      vendor_id: vendorId,
      product_id: product_id,
      rfq_id: rfq_id,


    }

    // SCHEDULE ORDER START
    const directOrderSchedue = {
      'scheduled': '1',
      // 'time'      : this.getTodayDate() + ' 5:51:00',
      'Hotel_Name_id': vendorArr.hatelNameId,
      'id': scheduleID,
      'vendor_id': vendorId[0],
    }
    console.log(directOrderSchedue)

    if (requestType == 'schedule') {
      this.HotelService.diractorder(directOrderSchedue).subscribe((data: any) => {
        console.log(data)
        this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
        this.iconpopup = false
        this.rforder = false
        this.statusOrder = true

        this.router.navigate([{ ids: this.selectedHotel, expanded: this.selectedTable, productType: this.url.productTypeTemp_brand, pipeLine: 'Released Orders' }], { relativeTo: this.route });
      })
    }
    // SCHEDULE ORDER END

    // multi Request
    const directOrder = {
      'Hotel_Name_id': vendorArr.hatelNameId,
      'product_id': [this.selectedTable],
      'rfq_id': rfq_id,
      'vendor_id': vendorId[0],

    }

    if (requestType == 'direct_order') {
      if(this.isLoggedIn){
        this.HotelService.direct_order_form_for_vendor_muilty(directOrder).subscribe({
          next: (data) => {
  
            console.log(data)
            this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
            this.iconpopup = false
            this.rforder = false
            this.statusOrder = true
  
            this.router.navigate([{ ids: this.selectedHotel, expanded: this.selectedTable, productType: this.url.productTypeTemp_brand, pipeLine: 'Released Orders' }], { relativeTo: this.route });
          },
          error: (error) => {
            this.toast.error({ detail: "ERROR", summary: 'Order Not Approved', duration: 3000 });
  
          }
        })
      }else{
        const obj ={
            status:4,
            id:this.demo_do_id,
            product_id: this.RequstGetId.product_id

        }
        this.DemohotelService.update_demo_hotel(obj)
        this.iconpopup = false
        this.rforder = false
        this.statusOrder = true
        this.router.navigate([{ ids: this.selectedHotel, expanded: this.selectedTable, productType: this.url.productTypeTemp_brand, pipeLine: 'Released Orders' }], { relativeTo: this.route });

      }
     
    }

    if (requestType == 'RFQ') {
      if(this.isLoggedIn){

      this.HotelService.PurchaseRequest_form_for_vendor_muilty(this.vendorSelectmultiRq).subscribe({
        next: (data) => {
          this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
          this.iconpopup = false
          this.rforder = false
          this.statusOrder = true

          this.router.navigate([{ ids: this.selectedHotel, expanded: this.selectedTable, productType: this.url.productTypeTemp_brand, pipeLine: 'RFQ-Compare' }], { relativeTo: this.route });
        },
        error: (error) => {
          this.toast.error({ detail: "ERROR", summary: 'Order Not Approved', duration: 3000 });

        }
      })
    }else{
      const obj ={
        status:3,
        id:this.demo_do_id,
        product_id: this.RequstGetId.product_id

    }
    this.DemohotelService.update_demo_hotel(obj)
    this.iconpopup = false
    this.rforder = false
    this.statusOrder = true
    this.router.navigate([{ ids: this.selectedHotel, expanded: this.selectedTable, productType: this.url.productTypeTemp_brand,  pipeLine: 'RFQ-Compare' }], { relativeTo: this.route });

    }
    }


    //  SMS for Temporary product vendor
    // this.HotelService.temp_vendor_message(this.vendorSelectmultiRq).subscribe((data: any) => {
    //   console.log(data)
    // })

    // this.schedueledOrder(rfq_id)

  }

  getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  schedueledOrder(mvId = '') {
    const rfq_id: any = []
    this.receivedChildData.forEach((d: any) => {
      rfq_id.push(d.purchase_request_random)
    });

    const a = {
      "product_id": this.selectedTable,
      "Hotel_Name_id": this.selectedHotel,
      "mv_id": rfq_id
    }

    // this.HotelService.schedule_oder(a).subscribe((res)=>{
    //   console.log(res)
    // })
  }


  serviceRequest(e: any) {
    if (e.target.checked == true) {
      this.checkedServiceRequest = true
      this.orderTable = "Service Request"
    }
    else {
      this.checkedServiceRequest = !true
    }
  }
  closeButton() {
    this.pichartpopUp = false
    this.orderprocess = false
  }
  closeButtonTwo() {
    this.iconpopup = false
  }

  isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  isVideo(url: string): boolean {
    return url.match(/\.(mp4|webm|ogg)$/) != null;
  }
  iconPopup() {
    this.vendarTable = []

    this.rfq = "Request for Quotation"
    this.iconpopup = true
    this.vendartable.map((s: any) =>
      this.vendarTable.push(s['pur.request'])
    )
    this.AppserviceService.rfqSdata(this.vendarTable)

    // console.log(this.vendarTable)
  }

  buttonclicked(event: any) {
    this.selectedButton = event
  }
  DropDown(value: any, productId: any, random_number: any) {

    const obj = {
      product_id: productId,
      service_request_random: random_number,
      payment_terms: value,
      Hotel_Name_id: '1715938227247'
    }

    this.serviceRequesData.forEach((element: any) => {
      if (element.service_request_random == random_number) {
        element.payment_terms = value
      }

      return element
    });

    this.HotelService.service_payment_terms(obj).subscribe((res) => {
      console.log(res)
      this.toast.success({ detail: "SUCCESS", summary: 'Payment Terms Updated', duration: 3000 });


    })
  }
  selectAll(event: any) {

    for (let i = 0; i < this.serviceRequesData.length; i++) {
      this.serviceRequesData[i]['ischecked'] = event.target.checked; // Set the initial value of 'ischecked' to false
    }

    this.selectedData = []
    this.serviceRequesData.forEach((element: any) => {
      if (element.product_id == this.selectedTable && element.ischecked == true) {
        this.selectedData.push(element)
      }
    });

    const selectType = {
      type: 'SR',
      data: this.selectedData
    }

    console.log(this.selectedData)

    this.AppserviceService.rfqSelectedAllData(selectType);
    // this.calculateTotal('');

  }

  calculateTotal(event: any, randomId: any) {

    this.isAllCheck = false

    this.serviceRequesData.forEach((element: any) => {
      if (element.service_request_random == randomId) {
        element.ischecked = event.target.checked
      }
    });

    this.selectedData = []

    this.serviceRequesData.forEach((element: any) => {
      if (element.product_id == this.selectedTable && element.ischecked == true) {
        this.selectedData.push(element)
      }
    });

    const selectType = {
      type: 'SR',
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

    if (this.selectedData.length == this.serviceRequesData.length) {
      this.isAllCheck = true
    } else {
      this.isAllCheck = false
    }

    // if(this.selectedData.length > 0 && this.isAllCheck == true){
    //   this.isAllCheck = true
    // }
  }

  poupQuotation(i: any, data: any) {
    this.AppserviceService.popupData(true)
    this.AppserviceService.rfqSdata(data)
    this.rfq = 'SR - Service Request'
  }

  // date formet like 21-sep-2023
  formatDate(date: any) {
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

  closeimg() {
    this.serviceimg = false
  }

  ServiceIMG(images: any) {
    this.serviceImages = images
    this.serviceimg = true
    this.currentImageIndex = 0;

  }

  // Check if serviceImages is defined and has a length
  // Your Angular component code

  // Assuming serviceImages contains the array of objects with image URLs
  serviceImages: any[] = [];
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

  addVendar() {
    // used in catalog table component 
    this.AppserviceService.cancelProducForm('brandProductVendor')
    localStorage.removeItem("editVendorDetails");

    // subscriped in addProductVendorComponent and catalogTable component
    this.AppserviceService.brandPrimaryVendor(this.product_id)
  }

  togglePost(hotelid: any, productid: any, SR: any) {
    const form = new FormData();
    form.append('Hotel_Name_id', hotelid);
    form.append('product_id', productid);
    form.append('service_request_random', SR);
    for (let i = 0; i < this.hoteldoc.length; i++) {
      const file = this.hoteldoc[i];
      form.append('Hotel_document[]', file, file.name);
    }
    this.HotelService.service_rq_payment(form).subscribe((response) => {
        console.log(response)
        this.toast.success({ detail: "Submitted", summary: 'Success', duration: 5000 })
        this.serviceReques()
        this.router.navigate([{ ids: this.selectedHotel, expanded: this.selectedTable, productType: this.url.productTypeTemp_brand, pipeLine: 'Released Orders' }], { relativeTo: this.route });

      },(error) => {
        console.log(error.error.message)
        this.toast.error({ detail: "Error", summary: error.error.message, duration: 5000 })
        this.AppserviceService.error_Toggle(false);
      }

    )

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

  uploadDocument(type: any, order: any) {

    this.uploaddocument_type = type
    this.documentsarray = order
    this.isUploadDocument = !this.isUploadDocument
  }

  hoteldoc: any = []
  invoiceDocument(event: any) {
    if (event.type == 'hotel_doc') {
      this.hoteldoc = event.file
    }

  }

  reload(data: any) {
    if (data == 'refresh') {
      console.log('sucessreload')
      this.serviceReques()
    }
  }
  viewdocuments(){
   
    this.router.navigate([{ids: this.HotelId, expanded: this.product_id  ,nav:"All Documents"}], { relativeTo: this.route });

  }
  openorderprocess(SRR: any) {
    this.orderprocess = true
    this.screen = 'service'
    let serviceorder = []
    let reordergrp: any = []
    this.servicedata = []
    this.servicehistory = []
    this.serviceRequesData.forEach((elem: any) => {
      if (elem.service_request_random == SRR) {
        elem.reorderarray = []
        if (elem.reorder_id != null) {
          elem.reorderarray = elem.reorder_id.split(',');
          reordergrp = elem.reorderarray
          console.log(elem.reorderarray)
        }

        if (this.servicefullorder.new_order.length > 0) {
          this.servicedata = []
          this.servicefullorder.new_order.forEach((org: any) => {
            if (elem.id == org.service_request_id) {
              this.servicedata.push(org)
            }
          })
        }
        if (this.servicefullorder.history_data.length > 0) {
          this.servicehistory = []
          this.servicefullorder.history_data.forEach((org: any) => {

            elem.reorderarray.forEach((ele: any) => {
              if (ele == org.service_request_id) {
                this.servicehistory.push(org)
              }
            })

          })
        }
      }
    })
    this.servicereorder = this.transformArrays(reordergrp, this.servicehistory)
    // this.servicedata=data
  }

  ReviseOrder(value: any, type: any) {
    this.revise_data = value
    this.revise_type = type
    this.Reviseorder = true
  }

  transformArrays(array1: string[], array2: any[]): any[] {
    const finalArray: any = [];

    array1.forEach((serviceId, index) => {
      const matchingObjects = array2.filter(obj => obj.service_request_id === serviceId);
      finalArray.push({ [`group${index + 1}`]: matchingObjects });
    });

    return finalArray;
  }

  sortedOrderStatus(orders:any){
    const sortOrder:any = {
      'YES': 1,
      'Finance': 2,
      'NO': 3,
      'REJECT': 4
    };
    
    orders.sort((a:any, b:any) => sortOrder[a.approve] - sortOrder[b.approve]);
    return orders
  }
  chat_and_email(orders:any){
    this.openchat = true
    this.orders = orders

  }
}
