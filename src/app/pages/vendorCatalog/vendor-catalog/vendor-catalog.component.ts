import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { MyFilterPipe } from 'src/app/pipe/myFilter/my-filter.pipe'
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'b2b-vendor-catalog',
  templateUrl: './vendor-catalog.component.html',
  styleUrls: ['./vendor-catalog.component.css']
})
export class VendorCatalogComponent implements OnInit {
  catelogTable: string[] = ["Product Image", "Product Name", "Category", "Sub-Category", "View In Ezeebi"];
  rfqTable: string[] = ["Brand Product Image", "Product Name", "Items", "Catagory", " Sub Catagory"];

  filterHeading: string[] = ["Product Name", "Description", "RFQ/PO/SO Number", "Hotel Name", "State", "City", "Street", "Received On", "Received By"];

  catelogTable_two: string[] = ["Request ID", "Product Name/SKU", "Description", "Required Qty", "Required by", "Your Quotation Number", "Vendor Item Number", "Box Quantity", "Price/Pcs", "Shipping Date", "Submit"];
  catelogColumnSpacing = "4*1fr 0fr";
  catelogColumnSpacing_count = "4*1fr 1fr";

  catelogColumnSpacing_vendor = "4*1fr 1fr";
  filterRfq = "9*1fr 0fr";

  catelogColumnSpacing_two = "11*1fr 0fr";
  catalogButton: any[] = ['Product to be Ordered', 'Specification Warrenty', 'Marketplace Comparison']
  open_chat:boolean = false
  bottomCardList: any[] = [
    {
      id: '1',
      type: "RFQ -  ",
      centerText: 'Received',
      urlId: 'RFQ Received',
      color: '--color-white',
      endText: '(4/20)',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '2',
      type: "RFQ - ",
      urlId: 'RFQ pending',
      centerText: 'Submitted',
      color: '--color-white',
      endText: '(6/100)',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '3',
      urlId: 'RFQ Renegotiate',
      type: "RFQ -  ",
      centerText: 'Renegotiate',
      endText: '(3/70)',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '4',
      type: "RFQ -  ",
      urlId: 'RFQ Denied',
      centerText: 'Rejected',
      color: '--color-white',

      endText: '(3/30)',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '5',
      urlId: 'pur_Order',
      type: "Purchase ",
      centerText: 'Order',
      endText: '(16/170)',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '6',
      urlId: 'Renegotiate',
      type: "",
      centerText: 'Renegotiate - Purchase Order',
      endText: '(16/170)',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '7',
      urlId: 'Reject_pur_Order',
      type: "",
      centerText: 'Rejected - Purchase Order',
      endText: '(16/170)',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '8',
      urlId: 'salesOrder',
      type: "Sales Order - ",
      // centerText :'Order',
      centerText: 'Received',
      color: '--color-white',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '9',
      urlId: 'Pick&Pack',
      type: "Pick & Pack",
      centerText: '',
      color: '',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '10',
      urlId: 'Ready_Dispatch',
      type: "Ready for Dispatch",
      centerText: '',
      color: '',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '11',
      urlId: 'Dispatch',
      type: "Dispatched",
      centerText: '',
      color: '',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '12',
      urlId: 'Discrepancy',
      type: "Discrepancy",
      centerText: '',
      color: '',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '13',
      urlId: 'Payment',
      type: "Orders for Payment",
      centerText: '',
      color: '',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '14',
      urlId: 'Reconciled',
      type: "Reconciled",
      centerText: '',
      color: '',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '15',
      urlId: 'Completed Orders',
      type: "Completed Orders",
      centerText: '',
      color: '',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '16',
      urlId: 'Cancelled_orders',
      type: "Cancelled Orders",
      centerText: '',
      color: '',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '17',
      urlId: 'Service_Request',
      type: "Service Request",
      centerText: '',
      color: '',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    },
    {
      id: '18',
      urlId: 'Service_Request_History',
      type: "Service Request History",
      centerText: '',
      color: '',
      count: 0,
      orderTypeTraccking: [],
      arr: []
    }
  ];

  catelogTableData: Record<string, string>[] = [
    {
      "id": "#S34",
      "depricated": "No",
      "area": "Restaurant",
      "product": "https://st.depositphotos.com/1001311/1312/i/600/depositphotos_13128795-stock-photo-vintage-table-lamp-isolated-on.jpg",
      "description": "Loream Ipsum dolor sit amet",
      "total": "56",
      "leadTime": "3 Weeks",
      "prefVendor": "GRT",
      "orderFreq": "1 Week",
      "lastOrder": "8 QTY",
      "price": "$24",
      "quantity": "10",
      "compare": "Lowest $24 Highest $34",
      "ESG": "https://www.shutterstock.com/image-vector/go-green-icon-ecofriendly-slogan-600w-1736254829.jpg",
      "Manufactured": "Locally",
      "savings": "35%"
    },

    {
      "id": "#S38",
      "depricated": "Yes",
      "area": "Restaurant",
      "product": "https://img-cdn.hotelfurniture.com/gen/200x200/jpg/products/original/db/eg3o3kqs2udanw2/CT-001.PNG",
      "description": "Loream Ipsum dolor sit amet",
      "total": "56",
      "leadTime": "3 Weeks",
      "prefVendor": "GRT",
      "orderFreq": "1 Week",
      "lastOrder": "8 QTY",
      "price": "$24",
      "compare": "Lowest $24 Highest $34",
      "savings": "35%"
    }
  ];
  catelogTableData_two: Record<string, string>[] = [
    {
      "Request ID": "PR-20112012_1",
      "Product Name/SKU": "https://st.depositphotos.com/1001311/1312/i/600/depositphotos_13128795-stock-photo-vintage-table-lamp-isolated-on.jpg",
      "Description": "Mesh Chair With Blue Cushion",
      "Required Qty": "30",
      "Required by": "20-Nov-22",

      "Your Quotation Number": "GENQ222",
      "Vendor Item Number": "Vensors SKU",
      "Box Quantity": "100",
      "Price/Pcs": "24",
      "Shipping Date": "Please check and date",
      "Submit": "Submit"

    },

    // {
    //   "id": "#S38",
    //   "depricated": "Yes",
    //   "area": "Restaurant",
    //   "product": "https://img-cdn.hotelfurniture.com/gen/200x200/jpg/products/original/db/eg3o3kqs2udanw2/CT-001.PNG",
    //   "description": "Loream Ipsum dolor sit amet",
    //   "total": "56",
    //   "leadTime": "3 Weeks",
    //   "prefVendor": "GRT",
    //   "orderFreq": "1 Week",
    //   "lastOrder": "8 QTY",
    //   "price": "$24",
    //   "compare": "Lowest $24 Highest $34",
    //   "savings": "35%"
    // }
  ];

  activeIndex: number = 0
  isRfq: boolean = false
  vendorProducts: any = ''

  selectedTable: any = '';
  vendorName: any = '';
  vendorProductsArr: any = []
  rfqArray: any = []
  directOrderArray: any = []

  delete_productid: any = ''
  alertpopup: boolean = false

  navBarSelected: string = ''
  VendorProfileName: String = ''

  // Search filter Keys All products
  fields: any = {
    product_name: '',
    shortDiscription: '',
    price: '',
    // leadTime :'',
    boxQuantity: '',
    ESG: '',
    manufactured: ''
  };

  // Search filter Keys Rfq products
  hotelRfqFilters: any = {
    Hotel_Name: ''
  }

  isPurchaseOrder: boolean = true
  filter: boolean = false
  isRfqOrderHeading: boolean = false
  rfqOrderProductValues: any = []
  vendorAllProductsArr: any = []
  rfqHotelProducts: any = []
  purchase_tableID: any = ''
  isAdd_vendor_product: boolean = false
  vendor_id: any = ''
  hidevendor: any = ''
  currency_symbol: any = ''
  purchase_order: any = []
  ready_for_dispatch: any = []
  salesOrder: any = []
  pick_a_pack: any = []
  dispatch: any = []
  isVendorBody: boolean = true
  productExpand: any = ''

  product_Name :any = [
    {
      name : 'Spoon'
    },
    {
      name : 'Knife'
    },
    {
      name : 'Spatula'
    }
  ]

  Purchase_order :any = [
    {
      name : '12321324323'
    },
    {
      name : '54323243424'
    },
    {
      name : '887876564'
    }
  ]

  // MULTIPLE SEARCH OPTION
  multipleSearch :any = [
    {
      id: 1,
      type : 'Vendor Product',
      data : []
    },
    {
      id: 2,
      type : 'Purchase Order Number',
      data : []
    }
  ]
  constructor(
    private HotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService,
    private AppserviceService: AppserviceService) { }

  ngOnInit(): void {
    // HIDE DATA
    this.AppserviceService.hidevendorData$.subscribe((res: any) => {
      console.log(res)
      this.hidevendor = res
      if (this.hidevendor == 'service') {
        this.bottomCardList = this.bottomCardList.filter((elem: any) => elem.id == '18' || elem.id == '17')
      }
      if (this.hidevendor == 'product') {
        this.bottomCardList = this.bottomCardList.filter((elem: any) => elem.id != '18' && elem.id != '17')
      }
    })

    // this.route.data.subscribe((datas: any) => {
    //   console.log(datas)
    // })

    this.route.paramMap.subscribe((params) => {
      let i = params.get("process");
      this.productExpand = params.get("expanded");
      this.purchase_tableID = params.get("purchase_tableID");
      if (i) this.navBarSelected = i;

      if (this.navBarSelected == 'pur_Order') {
        this.isPurchaseOrder = false
      } else {
        this.isPurchaseOrder = true
      }
      if (this.navBarSelected == 'Ready_Dispatch') {
        this.isPurchaseOrder = false
      }
      if (this.navBarSelected == 'Dispatch') {
        this.isPurchaseOrder = false
      }

      this.bottomCardList.find(card => card.urlId === i);
      this.activeIndex = this.bottomCardList.findIndex(card => card.urlId == i) + 1;
    })

    // vendor product Tracking order stage
    this.AppserviceService.realoadVendorData$.subscribe((res: any) => {
      this.HotelService.vendor_catlog().subscribe((d: any) => {
        this.route.paramMap.subscribe((params) => {
          let id = params.get("expanded");
          if (id) this.selectedTable = id;
        })
        this.currency_symbol = d.vendor.currency_symbol
        this.vendor_id = d.vendor.vendor_id
        this.purchase_order = d.purchase_order
        this.salesOrder = d.sales_order.sales_order
        this.pick_a_pack = d.pick_pack.pick_pack
        this.ready_for_dispatch = d.ready_for_dispatch.ready_for_dispatch
        this.dispatch = d.dispatch.dispatch

        this.vendorProductsArr = d.product
        this.vendorAllProductsArr = d.product
        this.vendorName = d.vendor
        this.bottomCardList.forEach((element: any) => {
          try {
            switch (element.id) {
              case "1":
                const orders = ''
                const count = ''
                if (d.RFQ.request_order.length > 0) {
                  d.RFQ.request_order.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }

                const count_1: any = this.removeDuplicatesByProperty(d.RFQ.request_order, 'mv_id')
                element.count = this.removeDuplicatesByProperty(d.RFQ.request_order, 'mv_id').length,
                element.orderTypeTraccking = this.removeDuplicatesByProperty(d.RFQ.request_product, 'product_id')
                element.ordercount = this.brandproductcount(element.orderTypeTraccking, count_1)
                element.requestOrder = this.removeDuplicatesByProperty(d.RFQ.request_order, 'mv_id')
                element.arr = this.removeDuplicatesByProperty(d.RFQ.request_order, 'product_id')
                break;

              case "2":
                if (d.RFQ_submitted.submited_order.length > 0) {
                  d.RFQ_submitted.submited_order.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                const orders_2: any = this.Addcurrencysymbols(d.RFQ_submitted.submited_order)
                let count_2: any = this.removeDuplicatesByProperty(d.RFQ_submitted.submited_order, 'rfq_id')
                element.count = this.removeDuplicatesByProperty(d.RFQ_submitted.submited_order, 'rfq_id').length,
                  element.orderTypeTraccking = this.removeDuplicatesByProperty(d.RFQ_submitted.submit_products, 'product_id'),
                  element.ordercount = this.brandproductcount(d.RFQ_submitted.submit_products, count_2)
                element.requestOrder = this.removeDuplicatesByProperty(orders_2, 'rfq_id')
                element.arr = this.removeDuplicatesByProperty(d.RFQ_submitted.submited_order, 'id')
                break;

              case '3':
                if (d.negotiation.negotiation.length > 0) {
                  d.negotiation.negotiation.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                const count_3: any = this.removeDuplicatesByProperty(d.negotiation.negotiation, 'rfq_id')
                element.ordercount = this.brandproductcount(d.negotiation.negotiation_produts, count_3)
                const orders_3: any = this.Addcurrencysymbols(d.negotiation.negotiation)

                element.count = d.negotiation.negotiation.length
                element.orderTypeTraccking = this.removeDuplicatesByProperty(d.negotiation.negotiation_produts, 'product_id'),
                  element.requestOrder = this.removeDuplicatesByProperty(orders_3, 'id')
                element.arr = this.removeDuplicatesByProperty(d.negotiation.negotiation, 'id')
                break

              case '4':
                if (d.RFQ_rejected.RFQ_rejected.length > 0) {
                  d.RFQ_rejected.RFQ_rejected.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                const orders_4: any = this.Addcurrencysymbols(d.RFQ_rejected.RFQ_rejected)
                const count_4: any = this.removeDuplicatesByProperty(d.RFQ_rejected.RFQ_rejected, 'rfq_id')
                element.ordercount = this.brandproductcount(d.RFQ_rejected.Reject_produts, count_4)
                element.count = d.RFQ_rejected.RFQ_rejected.length
                element.orderTypeTraccking = this.removeDuplicatesByProperty(d.RFQ_rejected.Reject_produts, 'product_id'),
                  element.requestOrder = this.removeDuplicatesByProperty(orders_4, 'rfq_id')
                element.arr = this.removeDuplicatesByProperty(d.RFQ_rejected.RFQ_rejected, 'product_id')
                break

              case '5':
                const orders_5 = this.mergeAndAddKey(d.purchase_order.diractorder, this.Addcurrencysymbols(d.purchase_order.purchase_order))

                if (orders_5.length > 0) {
                  orders_5.forEach((date: any) => {
                    date.received_on = this.formatDate2(date.received_on)
                    // date.updated_at = this.formatDate2(date.updated_at) // test
                  })
                }
                console.log(orders_5)
                element.count = d.purchase_order.purchase_order.length + d.purchase_order.diractorder.length,
                  // element.orderTypeTraccking = this.removeDuplicatesByProperty(this.directOrder_RFQ_Merge_products(d.purchase_order.diractorder_product,d.purchase_order.purchase_product),'product_id'),
                element.requestOrder = orders_5
                element.merge2 = this.mergeData(d.purchase_order.diractorder, d.purchase_order.purchase_order)

                // element.arr = this.removeDuplicatesByProperty(d.purchase_order.purchase_order , 'product_id')
                element.directOrder = {
                  directOrder: this.removeDuplicatesByProperty(d.purchase_order.diractorder, 'mv_id'),
                  rfqOrders: d.purchase_order.purchase_order
                }

                element.directOrder.directOrder.forEach((item: any) => {
                  item.status_viewed = true;
                });
                break

              case '6':
                if (d.renegotiate_purchase_order.renegotiate_purchase_order.length > 0) {
                  d.renegotiate_purchase_order.renegotiate_purchase_order.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                const orders_6: any = this.Addcurrencysymbols(d.renegotiate_purchase_order.renegotiate_purchase_order)
    
                // const count:any = this.removeDuplicatesByProperty(d.renegotiate_purchase_order.renegotiate_purchase_order ,'rfq_id')
                element.count = this.removeDuplicatesByProperty(d.renegotiate_purchase_order.renegotiate_purchase_order, 'id').length
                element.orderTypeTraccking = this.removeDuplicatesByProperty(d.renegotiate_purchase_order.renegotiate_product, 'product_id')
                element.ordercount = this.brandproductcount(element.orderTypeTraccking, d.renegotiate_purchase_order.renegotiate_purchase_order)
                element.requestOrder = this.removeDuplicatesByProperty(orders_6, 'id')
                element.arr = this.removeDuplicatesByProperty(d.renegotiate_purchase_order.renegotiate_purchase_order, 'id')

                break

              case '7':
                if (d.rejected_purchase_order.rejected_purchase_order.length > 0) {
                  d.rejected_purchase_order.rejected_purchase_order.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                element.orderTypeTraccking = this.removeDuplicatesByProperty(d.rejected_purchase_order.rejected_product, 'product_id')
                const orders_7: any = this.Addcurrencysymbols(d.rejected_purchase_order.rejected_purchase_order)
    
                element.ordercount = this.brandproductcount(element.orderTypeTraccking, d.rejected_purchase_order.rejected_purchase_order)
    
                element.count = this.removeDuplicatesByProperty(d.rejected_purchase_order.rejected_purchase_order, 'id').length
                element.requestOrder = this.removeDuplicatesByProperty(orders_7, 'id')
                element.arr = this.removeDuplicatesByProperty(d.rejected_purchase_order.rejected_purchase_order, 'id')
                break

              case '8':
                if (d.sales_order.sales_order.length > 0) {
                  d.sales_order.sales_order.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                const orders_8: any = this.Addcurrencysymbols(d.sales_order.sales_order)
    
                element.count = d.sales_order.sales_order.length
                element.orderTypeTraccking = this.removeDuplicatesByProperty(d.sales_order.sales_product, 'product_id')
                console.log(element.orderTypeTraccking)
                element.requestOrder = this.removeDuplicatesByProperty(orders_8, 'id')
                element.arr = this.removeDuplicatesByProperty(d.sales_order.sales_order, 'product_id')
                element.ordercount = this.brandproductcount(element.orderTypeTraccking, d.sales_order.sales_order)
    
                if (d.sales_order.sales_product.length == 0) {
                  this.isVendorBody = false
                  this.selectedTable = ''
                  this.isPurchaseOrder = false
                }
                break

              case '9':
                if (d.pick_pack.pick_pack.length > 0) {
                  d.pick_pack.pick_pack.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                let productarray: any = []
                productarray = d.pick_pack.pick_product[0] != null ? d.pick_pack.pick_product : [],
    
                  element.orderTypeTraccking = this.removeDuplicatesByProperty(productarray, 'product_id')
                const orders_9: any = this.Addcurrencysymbols(d.pick_pack.pick_pack)
    
                element.count = d.pick_pack.pick_pack.length
                element.requestOrder = this.removeDuplicatesByProperty(orders_9, 'id')
                element.ordercount = this.brandproductcount(element.orderTypeTraccking, element.requestOrder)
    
                element.arr = this.removeDuplicatesByProperty(d.pick_pack.pick_pack, 'product_id')
    
                if (d.pick_pack.pick_product.length == 0) {
                  this.isVendorBody = false
                  this.selectedTable = ''
                  this.isPurchaseOrder = false
                }
                break

              case '10':
                if (d.ready_for_dispatch.ready_for_dispatch.length > 0) {
                  d.ready_for_dispatch.ready_for_dispatch.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                const orders_10: any = this.Addcurrencysymbols(d.ready_for_dispatch.ready_for_dispatch)
    
                element.count = d.ready_for_dispatch.ready_for_dispatch.length
                // element.orderTypeTraccking = d.ready_for_dispatch.ready_product,
                element.requestOrder = this.removeDuplicatesByProperty(orders_10, 'id')
    
                element.directOrder = d.ready_for_dispatch.ready_for_dispatch
                // element.arr =  this.removeDuplicatesByProperty(d.ready_for_dispatch.ready_for_dispatch , 'product_id')
                break

              case '11':
                if (d.dispatch.dispatch.length > 0) {
                  d.dispatch.dispatch.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                const orders_11: any = this.Addcurrencysymbols(d.dispatch.dispatch)
    
                element.count = d.dispatch.dispatch.length
                element.orderTypeTraccking = d.dispatch.dispatch_produts,
                  element.requestOrder = orders_11,
                  element.directOrder = d.dispatch.dispatch
                element.arr = this.removeDuplicatesByProperty(d.dispatch.dispatch, 'product_id')
                break

              case '12':
                if (d.discrepancy.discrepancy.length > 0) {
                  d.discrepancy.discrepancy.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                element.count = d.discrepancy.discrepancy.length
                const orders_12: any = this.Addcurrencysymbols(d.discrepancy.discrepancy)
    
                element.orderTypeTraccking = this.removeDuplicatesByProperty(d.discrepancy.discrepancy_product, 'product_id')
    
                element.requestOrder = this.removeDuplicatesByProperty(orders_12, 'id')
                element.ordercount = this.brandproductcount(element.orderTypeTraccking, element.requestOrder)
    
                element.arr = this.removeDuplicatesByProperty(d.discrepancy.discrepancy, 'product_id')
                break

              case '13':
                if (d.order_for_payment.order_for_payment.length > 0) {
                  d.order_for_payment.order_for_payment.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at),
                    date.last_day_for_payment = this.formatDate2(date.last_day_for_payment)
                  })
                }
                const orders_13: any = this.Addcurrencysymbols(d.order_for_payment.order_for_payment)
    
                element.count = d.order_for_payment.order_for_payment.length
                element.orderTypeTraccking = this.removeDuplicatesByProperty(d.order_for_payment.payment_product, 'product_id')
    
                element.requestOrder = this.removeDuplicatesByProperty(orders_13, 'id')
                element.ordercount = this.brandproductcount(element.orderTypeTraccking, element.requestOrder)
    
                element.arr = this.removeDuplicatesByProperty(d.order_for_payment.order_for_payment, 'product_id')
                break

              case '14':
                if (d.paymet_order.paymet_order.length > 0) {
                  d.paymet_order.paymet_order.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                const orders_14: any = this.Addcurrencysymbols(d.paymet_order.paymet_order)
    
                element.count = d.paymet_order.paymet_order.length
                element.orderTypeTraccking = this.removeDuplicatesByProperty(d.paymet_order.payment_product, 'product_id')
    
                element.requestOrder = this.removeDuplicatesByProperty(orders_14, 'id')
                element.ordercount = this.brandproductcount(element.orderTypeTraccking, element.requestOrder)
    
                element.arr = this.removeDuplicatesByProperty(d.paymet_order.paymet_order, 'product_id')
                break

              case '15':
                if (d.completed_order.completed_order.length > 0) {
                  d.completed_order.completed_order.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                const orders_15: any = this.Addcurrencysymbols(d.completed_order.completed_order)
    
                element.count = d.completed_order.completed_order.length
                element.orderTypeTraccking = this.removeDuplicatesByProperty(d.completed_order.complete_product, 'product_id')
    
                element.requestOrder = this.removeDuplicatesByProperty(orders_15, 'id')
                element.ordercount = this.brandproductcount(element.orderTypeTraccking, element.requestOrder)
    
                element.arr = this.removeDuplicatesByProperty(d.completed_order.completed_order, 'product_id')
                break

              case '16':
                if (d.cancelled_order.cancelled_order.length > 0) {
                  d.cancelled_order.cancelled_order.forEach((date: any) => {
                    date.updated_at = this.formatDate2(date.updated_at)
                  })
                }
                const orders_16: any = this.Addcurrencysymbols(d.cancelled_order.cancelled_order)
    
                element.count = d.cancelled_order.cancelled_order.length
                element.orderTypeTraccking = this.removeDuplicatesByProperty(d.cancelled_order.cancelled_product, 'product_id')
                element.requestOrder = this.removeDuplicatesByProperty(orders_16, 'id')
                element.ordercount = this.brandproductcount(element.orderTypeTraccking, element.requestOrder)
                element.arr = this.removeDuplicatesByProperty(d.cancelled_order.cancelled_order, 'product_id')
                break

              case '17':
                d.service_request.service_request_order.forEach((elem: any) => {
                  elem.imagearray = elem.product_images.split(',');
                  elem.image = elem.imagearray[0]
                  elem.service_cost = elem.total_cost
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
                })
                element.count = d.service_request.service_request_order.length
                element.orderTypeTraccking = d.service_request.service_request_produts,
                  element.requestOrder = this.removeDuplicatesByProperty(d.service_request.service_request_order, 'id')
                element.ordercount = this.brandproductcount(d.service_request.service_request_produts, element.requestOrder)
    
                element.arr = this.removeDuplicatesByProperty(d.service_request.service_request_order, 'product_id')
                break

                case '18' : 
                d.service_request_history.service_request_history.forEach((elem: any) => {
                  elem.imagearray = elem.product_images.split(',');
                  elem.image = elem.imagearray[0]
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
                  switch (elem.active) {
                    case '2':
                      elem.payment = 'No'
                      break;
                    case '3':
                      elem.payment = 'Yes'
                      break;
                  }
                })
                element.count = d.service_request_history.service_request_history.length
                element.orderTypeTraccking = d.service_request_history.service_request_history_produts
                element.requestOrder = this.removeDuplicatesByProperty(d.service_request_history.service_request_history, 'id')
                element.ordercount = this.brandproductcount(d.service_request_history.service_request_history_produts, element.requestOrder)
    
                element.arr = this.removeDuplicatesByProperty(d.service_request_history.service_request_history, 'product_id')
                break
                
              default:
                console.log(`Unknown id: ${element.id}`);
                break;
            }
          } catch (error) {
            console.error(`Error processing id ${element.id}:`, error);
          }

          if (element.id == "1") {
            // if (d.RFQ.request_order.length > 0) {
            //   d.RFQ.request_order.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }

            // const count: any = this.removeDuplicatesByProperty(d.RFQ.request_order, 'mv_id')
            // element.count = this.removeDuplicatesByProperty(d.RFQ.request_order, 'mv_id').length,
            //   element.orderTypeTraccking = this.removeDuplicatesByProperty(d.RFQ.request_product, 'product_id')
            // element.ordercount = this.brandproductcount(element.orderTypeTraccking, count)
            // element.requestOrder = this.removeDuplicatesByProperty(d.RFQ.request_order, 'mv_id')
            // element.arr = this.removeDuplicatesByProperty(d.RFQ.request_order, 'product_id')
          }
          if (element.id == "2") {
            // if (d.RFQ_submitted.submited_order.length > 0) {
            //   d.RFQ_submitted.submited_order.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // const orders:any = this.Addcurrencysymbols(d.RFQ_submitted.submited_order)  
            // const count: any = this.removeDuplicatesByProperty(d.RFQ_submitted.submited_order, 'rfq_id')
            // element.count = this.removeDuplicatesByProperty(d.RFQ_submitted.submited_order, 'rfq_id').length,
            //   element.orderTypeTraccking = this.removeDuplicatesByProperty(d.RFQ_submitted.submit_products, 'product_id'),
            //   element.ordercount = this.brandproductcount(d.RFQ_submitted.submit_products, count)
            // element.requestOrder = this.removeDuplicatesByProperty(orders, 'rfq_id')
            // element.arr = this.removeDuplicatesByProperty(d.RFQ_submitted.submited_order, 'id')
          }

          if (element.id == "3") {
            // if (d.negotiation.negotiation.length > 0) {
            //   d.negotiation.negotiation.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // const count: any = this.removeDuplicatesByProperty(d.negotiation.negotiation, 'rfq_id')
            // element.ordercount = this.brandproductcount(d.negotiation.negotiation_produts, count)
            // const orders:any = this.Addcurrencysymbols(d.negotiation.negotiation)  

            // element.count = d.negotiation.negotiation.length
            // element.orderTypeTraccking = this.removeDuplicatesByProperty(d.negotiation.negotiation_produts, 'product_id'),
            //   element.requestOrder = this.removeDuplicatesByProperty(orders, 'id')
            // element.arr = this.removeDuplicatesByProperty(d.negotiation.negotiation, 'id')
          }

          if (element.id == "4") {
            // if (d.RFQ_rejected.RFQ_rejected.length > 0) {
            //   d.RFQ_rejected.RFQ_rejected.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // const orders:any = this.Addcurrencysymbols(d.RFQ_rejected.RFQ_rejected)  

            // const count: any = this.removeDuplicatesByProperty(d.RFQ_rejected.RFQ_rejected, 'rfq_id')
            // element.ordercount = this.brandproductcount(d.RFQ_rejected.Reject_produts, count)
            // element.count = d.RFQ_rejected.RFQ_rejected.length
            // element.orderTypeTraccking = this.removeDuplicatesByProperty(d.RFQ_rejected.Reject_produts, 'product_id'),
            // element.requestOrder = this.removeDuplicatesByProperty(orders, 'rfq_id')
            // element.arr = this.removeDuplicatesByProperty(d.RFQ_rejected.RFQ_rejected, 'product_id')
          }

          if (element.id == "5") {
            // const orders = this.mergeAndAddKey(d.purchase_order.diractorder, this.Addcurrencysymbols(d.purchase_order.purchase_order))

            // if (orders.length > 0) {
            //   orders.forEach((date: any) => {
            //     date.received_on = this.formatDate2(date.received_on)
            //     date.updated_at = this.formatDate2(date.updated_at)

            //   })
            // }
            // element.count = d.purchase_order.purchase_order.length + d.purchase_order.diractorder.length,
            //   // element.orderTypeTraccking = this.removeDuplicatesByProperty(this.directOrder_RFQ_Merge_products(d.purchase_order.diractorder_product,d.purchase_order.purchase_product),'product_id'),
            //   element.requestOrder = orders
            // element.merge2 = this.mergeData(d.purchase_order.diractorder, d.purchase_order.purchase_order)

            // // element.arr = this.removeDuplicatesByProperty(d.purchase_order.purchase_order , 'product_id')
            // element.directOrder = {
            //   directOrder: this.removeDuplicatesByProperty(d.purchase_order.diractorder, 'mv_id'),
            //   rfqOrders: d.purchase_order.purchase_order
            // }

            // element.directOrder.directOrder.forEach((item: any) => {
            //   item.status_viewed = true;
            // });

          }


          if (element.id == "6") {
            // if (d.renegotiate_purchase_order.renegotiate_purchase_order.length > 0) {
            //   d.renegotiate_purchase_order.renegotiate_purchase_order.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // const orders: any = this.Addcurrencysymbols(d.renegotiate_purchase_order.renegotiate_purchase_order)

            // // const count:any = this.removeDuplicatesByProperty(d.renegotiate_purchase_order.renegotiate_purchase_order ,'rfq_id')
            // element.count = this.removeDuplicatesByProperty(d.renegotiate_purchase_order.renegotiate_purchase_order, 'id').length
            // element.orderTypeTraccking = this.removeDuplicatesByProperty(d.renegotiate_purchase_order.renegotiate_product, 'product_id')
            // element.ordercount = this.brandproductcount(element.orderTypeTraccking, d.renegotiate_purchase_order.renegotiate_purchase_order)
            // element.requestOrder = this.removeDuplicatesByProperty(orders, 'id')
            // element.arr = this.removeDuplicatesByProperty(d.renegotiate_purchase_order.renegotiate_purchase_order, 'id')
          }
          if (element.id == "7") {
            // if (d.rejected_purchase_order.rejected_purchase_order.length > 0) {
            //   d.rejected_purchase_order.rejected_purchase_order.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // element.orderTypeTraccking = this.removeDuplicatesByProperty(d.rejected_purchase_order.rejected_product, 'product_id')
            // const orders: any = this.Addcurrencysymbols(d.rejected_purchase_order.rejected_purchase_order)

            // element.ordercount = this.brandproductcount(element.orderTypeTraccking, d.rejected_purchase_order.rejected_purchase_order)

            // element.count = this.removeDuplicatesByProperty(d.rejected_purchase_order.rejected_purchase_order, 'id').length
            // element.requestOrder = this.removeDuplicatesByProperty(orders, 'id')
            // element.arr = this.removeDuplicatesByProperty(d.rejected_purchase_order.rejected_purchase_order, 'id')
          }

          if (element.id == "8") {
            // if (d.sales_order.sales_order.length > 0) {
            //   d.sales_order.sales_order.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // const orders: any = this.Addcurrencysymbols(d.sales_order.sales_order)

            // element.count = d.sales_order.sales_order.length
            // element.orderTypeTraccking = this.removeDuplicatesByProperty(d.sales_order.sales_product, 'product_id')
            // console.log(element.orderTypeTraccking)
            // element.requestOrder = this.removeDuplicatesByProperty(orders, 'id')
            // element.arr = this.removeDuplicatesByProperty(d.sales_order.sales_order, 'product_id')
            // element.ordercount = this.brandproductcount(element.orderTypeTraccking, d.sales_order.sales_order)

            // if (d.sales_order.sales_product.length == 0) {
            //   this.isVendorBody = false
            //   this.selectedTable = ''
            //   this.isPurchaseOrder = false
            // }
          }

          if (element.id == "9") {
            // if (d.pick_pack.pick_pack.length > 0) {
            //   d.pick_pack.pick_pack.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // let productarray: any = []
            // productarray = d.pick_pack.pick_product[0] != null ? d.pick_pack.pick_product : [],

            //   element.orderTypeTraccking = this.removeDuplicatesByProperty(productarray, 'product_id')
            // const orders: any = this.Addcurrencysymbols(d.pick_pack.pick_pack)

            // element.count = d.pick_pack.pick_pack.length
            // element.requestOrder = this.removeDuplicatesByProperty(orders, 'id')
            // element.ordercount = this.brandproductcount(element.orderTypeTraccking, element.requestOrder)

            // element.arr = this.removeDuplicatesByProperty(d.pick_pack.pick_pack, 'product_id')

            // if (d.pick_pack.pick_product.length == 0) {
            //   this.isVendorBody = false
            //   this.selectedTable = ''
            //   this.isPurchaseOrder = false
            // }
          }

          if (element.id == "10") {
            // if (d.ready_for_dispatch.ready_for_dispatch.length > 0) {
            //   d.ready_for_dispatch.ready_for_dispatch.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // const orders: any = this.Addcurrencysymbols(d.ready_for_dispatch.ready_for_dispatch)

            // element.count = d.ready_for_dispatch.ready_for_dispatch.length
            // // element.orderTypeTraccking = d.ready_for_dispatch.ready_product,
            // element.requestOrder = this.removeDuplicatesByProperty(orders, 'id')

            // element.directOrder = d.ready_for_dispatch.ready_for_dispatch
            // // element.arr =  this.removeDuplicatesByProperty(d.ready_for_dispatch.ready_for_dispatch , 'product_id')
          }

          if (element.id == "11") {
            // if (d.dispatch.dispatch.length > 0) {
            //   d.dispatch.dispatch.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // const orders: any = this.Addcurrencysymbols(d.dispatch.dispatch)

            // element.count = d.dispatch.dispatch.length
            // element.orderTypeTraccking = d.dispatch.dispatch_produts,
            //   element.requestOrder = orders,
            //   element.directOrder = d.dispatch.dispatch
            // element.arr = this.removeDuplicatesByProperty(d.dispatch.dispatch, 'product_id')
          }

          if (element.id == "12") {
            // if (d.discrepancy.discrepancy.length > 0) {
            //   d.discrepancy.discrepancy.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // element.count = d.discrepancy.discrepancy.length
            // const orders: any = this.Addcurrencysymbols(d.discrepancy.discrepancy)

            // element.orderTypeTraccking = this.removeDuplicatesByProperty(d.discrepancy.discrepancy_product, 'product_id')

            // element.requestOrder = this.removeDuplicatesByProperty(orders, 'id')
            // element.ordercount = this.brandproductcount(element.orderTypeTraccking, element.requestOrder)

            // element.arr = this.removeDuplicatesByProperty(d.discrepancy.discrepancy, 'product_id')
          }

          if (element.id == "13") {
            // if (d.order_for_payment.order_for_payment.length > 0) {
            //   d.order_for_payment.order_for_payment.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // const orders: any = this.Addcurrencysymbols(d.order_for_payment.order_for_payment)

            // element.count = d.order_for_payment.order_for_payment.length
            // element.orderTypeTraccking = this.removeDuplicatesByProperty(d.order_for_payment.payment_product, 'product_id')

            // element.requestOrder = this.removeDuplicatesByProperty(orders, 'id')
            // element.ordercount = this.brandproductcount(element.orderTypeTraccking, element.requestOrder)

            // element.arr = this.removeDuplicatesByProperty(d.order_for_payment.order_for_payment, 'product_id')
          }
          if (element.id == "14") {
            // if (d.paymet_order.paymet_order.length > 0) {
            //   d.paymet_order.paymet_order.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // const orders: any = this.Addcurrencysymbols(d.paymet_order.paymet_order)

            // element.count = d.paymet_order.paymet_order.length
            // element.orderTypeTraccking = this.removeDuplicatesByProperty(d.paymet_order.payment_product, 'product_id')

            // element.requestOrder = this.removeDuplicatesByProperty(orders, 'id')
            // element.ordercount = this.brandproductcount(element.orderTypeTraccking, element.requestOrder)

            // element.arr = this.removeDuplicatesByProperty(d.paymet_order.paymet_order, 'product_id')
          }
          if (element.id == "15") {
            // if (d.completed_order.completed_order.length > 0) {
            //   d.completed_order.completed_order.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // const orders: any = this.Addcurrencysymbols(d.completed_order.completed_order)

            // element.count = d.completed_order.completed_order.length
            // element.orderTypeTraccking = this.removeDuplicatesByProperty(d.completed_order.complete_product, 'product_id')

            // element.requestOrder = this.removeDuplicatesByProperty(orders, 'id')
            // element.ordercount = this.brandproductcount(element.orderTypeTraccking, element.requestOrder)

            // element.arr = this.removeDuplicatesByProperty(d.completed_order.completed_order, 'product_id')
          }
          if (element.id == "16") {
            // if (d.cancelled_order.cancelled_order.length > 0) {
            //   d.cancelled_order.cancelled_order.forEach((date: any) => {
            //     date.updated_at = this.formatDate2(date.updated_at)
            //   })
            // }
            // const orders: any = this.Addcurrencysymbols(d.cancelled_order.cancelled_order)

            // element.count = d.cancelled_order.cancelled_order.length
            // element.orderTypeTraccking = this.removeDuplicatesByProperty(d.cancelled_order.cancelled_product, 'product_id')
            // element.requestOrder = this.removeDuplicatesByProperty(orders, 'id')
            // element.ordercount = this.brandproductcount(element.orderTypeTraccking, element.requestOrder)
            // element.arr = this.removeDuplicatesByProperty(d.cancelled_order.cancelled_order, 'product_id')
          }
          if (element.id == "17") {

            // d.service_request.service_request_order.forEach((elem: any) => {
            //   elem.imagearray = elem.product_images.split(',');
            //   elem.image = elem.imagearray[0]
            //   elem.service_cost = elem.total_cost
            //   switch (elem.work_status) {

            //     case '0':
            //       elem.working_status = 'Not Started'
            //       break;
            //     case '1':
            //       elem.working_status = 'Under Process'
            //       break;
            //     case '2':
            //       elem.working_status = 'Completed'
            //       break;
            //     case '3':
            //       elem.working_status = 'Cancelled'
            //       break;


            //   }
            // })
            // element.count = d.service_request.service_request_order.length
            // element.orderTypeTraccking = d.service_request.service_request_produts,
            //   element.requestOrder = this.removeDuplicatesByProperty(d.service_request.service_request_order, 'id')
            // element.ordercount = this.brandproductcount(d.service_request.service_request_produts, element.requestOrder)

            // element.arr = this.removeDuplicatesByProperty(d.service_request.service_request_order, 'product_id')
          }
          if (element.id == "18") {
            // d.service_request_history.service_request_history.forEach((elem: any) => {
            //   elem.imagearray = elem.product_images.split(',');
            //   elem.image = elem.imagearray[0]
            //   switch (elem.work_status) {

            //     case '0':
            //       elem.working_status = 'Not Started'
            //       break;
            //     case '1':
            //       elem.working_status = 'Under Process'
            //       break;
            //     case '2':
            //       elem.working_status = 'Completed'
            //       break;
            //     case '3':
            //       elem.working_status = 'Cancelled'
            //       break;
            //   }
            //   switch (elem.active) {
            //     case '2':
            //       elem.payment = 'No'
            //       break;
            //     case '3':
            //       elem.payment = 'Yes'
            //       break;
            //   }
            // })
            // element.count = d.service_request_history.service_request_history.length
            // element.orderTypeTraccking = d.service_request_history.service_request_history_produts
            // element.requestOrder = this.removeDuplicatesByProperty(d.service_request_history.service_request_history, 'id')
            // element.ordercount = this.brandproductcount(d.service_request_history.service_request_history_produts, element.requestOrder)

            // element.arr = this.removeDuplicatesByProperty(d.service_request_history.service_request_history, 'product_id')
          }

  
        });
    
        // SEARCH Filter
        // VENDOR PRODUCTS ....
        d.product.forEach((v_product:any) => {
          const product = v_product
          this.multipleSearch[0].data.push(
            {
              img : product ? product.product_image : '',
              name : `${product ? product.name : ''}`
            }
          )
        });

        this.bottomCardList.forEach((search:any) =>{
          // HOTEL ORDERED PRODUCTS & DETAILS
           search.requestOrder.forEach((b_order:any) => {
            const product = search.orderTypeTraccking.find((prod:any) => b_order.product_id == prod.product_id)
            const requied_date = b_order.requested_on ? b_order.requested_on : b_order.required_date ? b_order.required_date : b_order.before_required_date 
            const order_Status = this.bottomCardList.find((screen:any) => screen.id == search.id)
            this.multipleSearch[1].data.push(
              {
                img : product ? product.product_image : '',
                column: search.id,
                product_id : product ? product.product_id : '',
                // product_name: product ? product.brand_products_name : '',
                // order_status : order_Status ? order_Status.urlId : '',
                name : `${product ? product.brand_products_name : ''} -- #${b_order ? b_order.Hotel_Name : ''} -- ${b_order.mv_id ? b_order.mv_id : b_order.rfq_id} -- ${requied_date} -- ${b_order.requested_on} -- ${order_Status ? order_Status.urlId : ''}`
              }
            )
          });   
        })

        if (this.activeIndex == this.bottomCardList.findIndex(card => card.urlId == this.navBarSelected) + 1) {
          if (this.purchase_tableID == null || this.purchase_tableID == '') {
            this.isVendorBody = true
            this.isPurchaseOrder = true
            this.selectedTable = this.productExpand
            // this.vendorProductsArr = this.vendorAllProductsArr
            if(res != 'notify'){
              this.orderProcess(this.bottomCardList[this.activeIndex - 1].requestOrder, this.activeIndex, this.bottomCardList[this.activeIndex - 1].orderTypeTraccking, this.bottomCardList[this.activeIndex - 1].urlId, this.bottomCardList[this.activeIndex - 1].directOrder, 'Initial')
            }
          } else {
            this.isVendorBody = true
            this.selectedTable = 'null-0'
            this.isPurchaseOrder = false
          }
        }

      })
    })

    this.AppserviceService.setUserRole([])

    // NOTIFICATION RELOAD ...................
    this.AppserviceService.notifyExpandProduct$.subscribe(expand => {
      console.log(expand)
      if(expand){
        if (expand.status == '5') {
          this.reload_notify('RFQ Received', 1)
        }
        if (expand.status == '7') {
          this.reload_notify('RFQ Renegotiate', 3)
        }
  
        if(expand.status == '10' || expand.status == '11' || expand.status == '12') {
          this.reload_notify('pur_Order', 5)
        }
  
        if (expand.status == '21RP') {
          this.reload_notify('Payment', 13)
        }
        if (expand.status == '21DP') {
          this.reload_notify('Discrepancy', 12)
        }
        if (expand.status == '27') {
          this.reload_notify('Reconciled', 14)
        }
        if (expand.status == '30') {
          this.reload_notify('Service_Request', 17)
        }
      }
      
    })
    console.log(this.bottomCardList)
    
    this.AppserviceService.notifyExpand_ChatEmail$.subscribe((res:any) =>{
      if(res){
        this.open_chat = true
      }
    })
  }

  reload_notify(url: any, index: any,product_id=null) {
    this.productExpand = product_id
    this.router.navigate([{ expanded: product_id,process: url, vendor_id: this.vendor_id}], { relativeTo: this.route });
    this.orderProcess(this.bottomCardList[index - 1].requestOrder, index - 1, this.bottomCardList[index - 1].orderTypeTraccking, this.bottomCardList[index - 1].urlId, this.bottomCardList[index - 1].directOrder, 'Initial')
  }

  // startInterval() {
  //   setInterval(() => {
  //     this.AppserviceService.realoadVendorData('reload')
  //   }, 3000); // Set the interval to 1 second
  // }

  // MERGE DIRECT ORDER AND RFQ ORDER
  mergeData(directOrder: any[], rfq: any[]): any[] {
    const mergedData: any = [];

    directOrder.forEach(item1 => {
      const matchingItems = rfq.filter(item2 => item2.rfq_id === item1.mv_id);

      if (matchingItems.length > 0) {
        const rfqs: any = [];
        const directOrders: any = [];

        matchingItems.forEach(matchingItem => {
          rfqs.push(matchingItem);
          directOrders.push(item1);
        });

        mergedData.push({
          rfq: rfqs,
          do: directOrders,
          ...item1,
          ...matchingItems[0] // Assuming only one matching item is considered for merging
        });
      } else {
        mergedData.push({
          rfq: [],
          do: [],
          ...item1
        });
      }
    });

    return mergedData;
  }
  //method to count the orders in brand products
  brandproductcount(products: any, orders: any) {
    let ordercount_products: any = []
    if (products != null && products.length > 0 && orders.length > 0) {
      products.forEach((element: any) => {
        ordercount_products = []
        if (element) {
          orders.forEach((list: any) => {
            if (element && list.product_id != null) {
              if (element.product_id == list.product_id) {
                ordercount_products.push(list)
              }
            }
          })

          element.count = ordercount_products.length
          console.log(element.count)
        }

      });
    }


  }
  doubleArray(data: any) {
    const arr = []
    for (const outerArray of data) {
      for (const innerObject of outerArray) {
        // Access properties of innerObject here
        arr.push(innerObject)
        // Add more properties as needed
      }
    }

    return arr
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
  
  Addcurrencysymbols(data: any[]): any[] {
    if (data.length > 0)
      data.forEach((org: any) => {
        org.vendor_coating_price = this.currency_symbol + parseFloat(org.vendor_coating_price).toFixed(2)
        org.product_total = this.currency_symbol + parseFloat(org.product_total).toFixed(2)
        org.Total_sales_gst = this.currency_symbol + parseFloat(org.Total_sales_gst).toFixed(2)
        org.vendor_shipping_cost = this.currency_symbol + parseFloat(org.vendor_shipping_cost).toFixed(2)
        org.total_shipping_sales_tax_cost = this.currency_symbol + parseFloat(org.total_shipping_sales_tax_cost).toFixed(2)
        org.total_cost = this.currency_symbol + parseFloat(org.total_cost).toFixed(2)
        const totalbox = this.calculateTotalBoxesQuantity(org.vendor_quantity, org.Box_Quantity)
        org.box_items1 = (totalbox.wholeNumber > 1 ? totalbox.wholeNumber + ' Boxes' : totalbox.wholeNumber + ' Box') + " " + (org.Box_Quantity > 1 ? org.Box_Quantity + ' Items' : org.Box_Quantity + ' Item')
        org.box_items2 = '+1 Box ' + totalbox.decimalPart + ' Items'
        org.box_items3 = totalbox.decimalPart
        org.vendor_gst = org.vendor_gst + '%'
        org.shipping_percent = org.shipping_percent + '%'
        org.Shiping_sales_tax = org.Shiping_sales_tax + '%'
        org.currency_symbol = this.currency_symbol

      })
    return data
  }

  mergeAndAddKey(diractorder: any[], purchaseOrder: any[]): any[] {
    const mergedArray: any = [];

    // Add 'diractorder' key to diractorder objects
    diractorder.forEach(item => {
      item['source'] = 'diractorder';
      mergedArray.push(item);
    });

    // Add 'purchase_order' key to purchase_order objects
    purchaseOrder.forEach(item => {
      item['source'] = 'purchase_order';
      mergedArray.push(item);
    });

    return mergedArray;
  }

  directOrder_RFQ_Merge_products(directProduct: any, rfqProduct: any) {
    const mergedData = [...directProduct.flat(), ...rfqProduct];
    return mergedData
  }

  tableExpand(event: any) {
    this.selectedTable = event
    // if (event) {
      this.router.navigate([{ expanded: this.selectedTable, process: this.navBarSelected }], { relativeTo: this.route });
    // } 
    // else {
    //   this.router.navigate([], { relativeTo: this.route });
    // }
  }

  rfqOders: any = []
  group_order: any = []
  orderProcess(confirm_order: any, index: any, orderTypeTraccking: any, centerText: any, directOrder: any, typeInitial: any) {
    this.isVendorBody = true
    this.isPurchaseOrder = true
    this.rfqHotelProducts = orderTypeTraccking.filter((re: any) => re != null)
    // ARRANGE ORDER DATE & TIME WISE 
    this.rfqArray = confirm_order.sort((a: any, b: any) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
    this.group_order = confirm_order
    this.directOrderArray = directOrder
    this.isRfq = true
    const arra: any = []
    this.activeIndex = index;
    const uniqueProductIds = new Set();
    this.vendorProductsArr = []
    // this.tableExpand(this.selectedTable) ...
    this.AppserviceService.ven_purchaseOrder_negotiate(null)

    this.isRfqOrderHeading = true
    if (typeInitial == 'buttonNav') {
      this.selectedTable = ''
      this.router.navigate([{ process: centerText, vendor_id: this.vendor_id }], { relativeTo: this.route });
    } else {
      this.selectedTable = this.productExpand ? this.productExpand : ''
      this.router.navigate([{ process: centerText, expanded: this.selectedTable, vendor_id: this.vendor_id }], { relativeTo: this.route });
    }

    if (centerText == 'pur_Order') {
      this.purchase_order
      this.selectedTable = 'null-1'
      // this.ready_for_dispatch = d.ready_for_dispatch
      this.isPurchaseOrder = false
      console.log(directOrder)
      directOrder.directOrder.forEach((element: any) => {
        element.group_order_count = this.grouped_order_count(element.mv_id)
      });
      this.directOrderArray = directOrder
    }

    if (centerText == 'Ready_Dispatch' || centerText == 'Dispatch') {
      // this.isPurchaseOrder = false
      this.selectedTable = 'null-2'
      this.isPurchaseOrder = false
      confirm_order.forEach((element: any) => {
        element.group_order_count = this.grouped_order_count(element.rfq_id)
      });
      this.rfqArray = confirm_order
    }

    const dynamicTableOrder = {
      type: centerText,
      fiveColumnData: this.directOrderArray,
      orders: confirm_order
    }

    // Purchese Order Initiaload
    // if(directOrder != '' && this.navBarSelected == 'pur_Order'){
    this.AppserviceService.direct_order(dynamicTableOrder)
    // }

  }

  grouped_order_count(mv_id: any) {
    let PO_Do_group_count: any = 0
    const direct_order = this.purchase_order.diractorder.find((po: any) => po.mv_id == mv_id)
    if (direct_order != undefined) {
      const spliteProduct = direct_order.product_id.split(',')
      PO_Do_group_count = spliteProduct.length
    }

    const PO_RFQ_group_count = this.purchase_order.purchase_order.filter((po: any) => po.rfq_id == mv_id).length

    const salesOrder_group_count = this.salesOrder.filter((so: any) => so.rfq_id == mv_id).length
    const pick_a_pack_group_count = this.pick_a_pack.filter((pp: any) => pp.rfq_id == mv_id).length
    const RF_dispatch_group_count = this.ready_for_dispatch.filter((po: any) => po.rfq_id == mv_id).length
    const dispatch_group_count = this.dispatch.filter((po: any) => po.rfq_id == mv_id).length

    return PO_RFQ_group_count + PO_Do_group_count + salesOrder_group_count + pick_a_pack_group_count + RF_dispatch_group_count + dispatch_group_count
  }

  allProducts() {
    this.isRfq = false
    this.isPurchaseOrder = true
    this.selectedTable = ''
    this.isVendorBody = false

    this.vendorProductsArr = this.vendorAllProductsArr
    this.router.navigate(['/vendor-catalog'], { relativeTo: this.route });
  }

  fliter() {
    this.filter = !this.filter
  }


  // this for RFQ filter

  hotelNameRfq(event: any) {
    this.hotelRfqFilters.Hotel_Name = event.target.value

    this.onFilterChange(this.hotelRfqFilters.Hotel_Name)
  }

  onFilterChange(value: any) {
    let arr = this.vendorProducts.RFQ.filter((item: any) =>
      item.Hotel_Name.toLowerCase().includes(value.toLowerCase())
    )
  }


  // EDIT VENDOR PRODUCTS
  editVendorProduct(vendor_products_id: any) {
    this.isAdd_vendor_product = true
    this.router.navigate([{ vendorProductId: vendor_products_id, vendor_id: this.vendor_id }], { relativeTo: this.route });
  }

  addVendorProduct() {
    this.isAdd_vendor_product = true
    this.router.navigate([{ vendor_id: this.vendor_id }], { relativeTo: this.route });
  }
  openLink(vendor_product_id: any) {
    const link = this.HotelService.projecturl()+'/vendor_view_products/' + vendor_product_id; // Adjust the URL structure
    window.open(link)
  }
  opendeletepopup(productid: any) {
    this.delete_productid = productid
    this.alertpopup = true


  }
  deletevendorproduct(order: any) {

    console.log(order)
    this.HotelService.delete_vondor_product(order).subscribe((datas: any) => {
      this.toast.success({ detail: "Success", summary: 'Successfully Deleted', duration: 5000 });
      console.log(datas)
      this.alertpopup = false
    }
      , (error: any) => {
        this.toast.error({ detail: "Error", summary: error.error.message, duration: 3000 });
      })

  }
  Addvendorproducts(orderarray: any, brandproduct: any) {
    brandproduct.forEach((elem: any) => {
      elem.vp = '0'
    })
    let vendor_products: any = []
    orderarray.forEach((arr: any) => {
      if (arr.vp == '1') {
        vendor_products = arr.vendor_products
        console.log(vendor_products)
      }
    })

    if (vendor_products.length > 0) {
      vendor_products.forEach((elem: any) => {
        elem.vp = '1'
        elem.brand_products_name = elem.name
      })
    }
    
    let jointorders: any = []
    jointorders = jointorders.concat(brandproduct, vendor_products)
    return jointorders
  }
  formatDate2(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
  calculateTotalBoxesQuantity(total_qty: number, perBoxQty: number) {

    const totalBoxes = total_qty / perBoxQty;
    const wholeNumber = Math.floor(totalBoxes);
    const decimalPart = Math.round((totalBoxes - wholeNumber) * perBoxQty);

    return { wholeNumber, decimalPart };


  }


  // FILTER ALL COLUMN ORDERS BY HOTEL
  searchText:any = ''
  textLength :any = ''
  filterProducts(key:any,event:any){
   const value = event
   this.textLength = event
   const criteria = this.searchText.split(';').filter(Boolean).reduce((acc:any, crit:any) => {
     const [k, v] = crit.split(':');
     acc[k] = v;
     return acc;
   }, {});

   criteria[key] = value;
   this.searchText = Object.entries(criteria).map(([k, v]) => `${k}:${v}`).join(';');
  //  this.cdr.markForCheck();
  }

  searchedFuc(Obj:any){
    this.selectedTable = ''
    const order = Obj.name.split('--')
    this.reload_notify(order[5],Obj.column,Obj.product_id)
    this.textLength = ''
    this.searchText = ''
  }
  openchat(){
    this.open_chat = true
  }

}