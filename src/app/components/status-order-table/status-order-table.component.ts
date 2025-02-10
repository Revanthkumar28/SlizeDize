import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ChangeDetectorRef } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';
import { DemohotelService } from 'src/app/service/demohotel.service';
@Component({
  selector: 'b2b-status-order-table',
  templateUrl: './status-order-table.component.html',
  styleUrls: ['./status-order-table.component.css']
})
export class StatusOrderTableComponent implements OnInit {
  catelogTable3: any[] = ["PR Selected", "Req Person & Department", " Approx Price /Pcs", "Required Qty", "Case qty", 'Approx.price', "Approx.shipping cost", "Approx.Total cost", "Req DATE", "Specified Vendor", "Reason", "Remarks"]
  catelogTable2: any[] = ["PR Selected", "Req Person & Department", " Approx Price /Pcs", "Required Qty", "Case qty", 'Approx.price', "Approx.shipping cost", "Approx.Total cost", "Req DATE", "Specified Vendor", "Reason", "Move order"]
  catelogTable:any=[]
  catelogColumnSpacing = "12*1fr 0fr"
  tablevalueSpacing = ""
  isNegotiate: boolean = false
  product_compare: boolean = false;

  // count selected vendor req 
  totalValue: any[] = [{
    "id": '1',
    "TOTAL": "Vendor :",
    "Total_Quantity": '0',
    "width": '15%'
  },
  {
    "id": '2',
    "TOTAL": "Quantity Quoted :",
    "Total_Quantity": '0',
    "width": '18%'
  },
  {
    "id": '3',
    "TOTAL": "Price/Pc :",
    "Total_Quantity": '0',
    "width": '15%'

  },
  {
    "id": '4',
    "TOTAL": "ETA :",
    "Total_Quantity": 0,
    "width": '15%'

  },
  {
    "id": '5',
    "TOTAL": "Product Total :",
    "Total_Quantity": 0,
    "width": '15%'

  },
  {
    "id": '6',
    "TOTAL": "Shipping Cost :",
    "Total_Quantity": 0,
    "width": '18%'

  },
  {
    "id": '7',
    "TOTAL": "Total Cost :",
    "Total_Quantity": 0,
    "width": '15%'

  }
  ]
  expandTable: any = []

  tableData: any = [
    { column1: 'Executive Office Budget', column2: '1,00,000', column3: '50 Thousand', column4: '50 Thousand' },
    { column1: 'Front Office Budget', column2: '2,00,000', column3: '2 Lakhs', column4: '0' },
    { column1: 'House Keeping Budget', column2: '3,00,000', column3: '3 Lakhs', column4: '0' },
    { column1: 'Maintanance Budget', column2: '1,00,000', column3: '0', column4: '1 Lakh' },
    { column1: 'Hotel-Wide Budget(Total)', column2: '78777', column3: '5.5 Lakhs', column4: '1.5 Lakhs' }
  ];

  value: any = 'background-color:green'
  statustable: any = [
    {
      id: "1",
      "value": 'background-color:green',
      "name": "Welco International",
      "heading": "Preferred Supplier by Brand",
      "items": []
    }
  ]
  specificationData: { title: string, items: Record<string, string>[] } = {
    title: "Read A Barton RB 1180 Spec",
    items: [
      { "key": "100Pcs", "value": "40" },
      { "key": "80Pcs", "value": "7 inch" },
      { "key": "Rs.6.00", "value": "Silver" },
      { "key": "Rs.600.00", "value": "Stainless Steel" },
      { "key": "Rs.6.00", "value": "8/10" },
      { "key": "Rs.180.00", "value": "Solid" },
      { "key": "Rs.780", "value": "Salad Fork" },
      { "key": "786/100===Rs.7.80", "value": "Extra heavy" },
      { "key": "(786-681.76=Rs.104.24)", "value": "Salad Fork" },
      { "key": "104.24/20===Rs.5.21", "value": "Extra heavy" },
      { "key": "5-Dec-22", "value": "40" },
      { "key": "3 Days..", "value": "40" },
      { "key": "8-Dec-22", "value": "40" },
      { "key": "We have limited Quantity Please confirm ASAP", "value": "40" },
      { "key": "YES", "value": "40" },
    ]
  };

  specificationDatas: { title: string, items: Record<string, string>[] } = {
    title: "Read A Barton RB 1180 Spec", items: [
      { "key": "RFQ Number", "value": "40" },
      { "key": "Hotel Name", "value": "40" },
      { "key": "Location", "value": "40" },
      { "key": "Your Reference Number", "value": "Extra heavy" },
      { "key": "Brand Specification", "value": "40" },
      { "key": "Vendor SKU Number", "value": "40" },
      { "key": "Initial Qty Requested", "value": "Silver" },
      { "key": "Quantity Quoted", "value": "Extra heavy" },
      { "key": "Box Quantity", "value": "Extra heavy" },
      { "key": "No Of Boxes", "value": "Extra heavy" },
      { "key": "Required By", "value": "Extra heavy" },
      { "key": "Shipping Date", "value": "Extra heavy" },
      { "key": "Transit Time (days)", "value": "Stainless Steel" },
      { "key": "ETA", "value": "8/10" },
      { "key": "Price Per Piece", "value": "Solid" },
      { "key": "Product Total", "value": "Salad Fork" },
      { "key": "Sales Tax/GST(%)", "value": "Extra heavy" },
      { "key": "Total + Sales Tax/GST", "value": "Extra heavy" },
      { "key": "Shipping (%)", "value": "Extra heavy" },
      { "key": "Shipping Cost", "value": "Extra heavy" },
      { "key": "Shipping Sales Tax/GST(%)", "value": "Extra heavy" },
      { "key": "Shipping Sales Tax/GST", "value": "Extra heavy" },
      { "key": "Total Cost", "value": "Extra heavy" },
      { "key": "Payment Terms", "value": "Extra heavy" },
      { "key": "Vendor Remarks", "value": "Extra heavy" },
    ]
  };

  arr: any = ["alec", "ale"]
  item: boolean = false
  selectedTable: any = ''
  vendorQuoted: any = {
    countAble: 2,
    negotiation: '',
    vendorArray: [],
    data: []
  }
  selectedProductId: any = null

  hotelId: any = {
    hotelNameId: ''
  }

  multiVedorId: any = []
  vendorArray: any = []
  isLoader: boolean = true
  selectVedorIdForOrder: any = null

  user_to_vendor: any = {
    Hotel_Name_id: '',
    vendor_id: '',
    product_id: '',
    mv_id: '',
  }

  orderReason: any = [
    {
      reasonType: 'Awarded',
      reasonArr: [
        {
          id: '1',
          IsChecked: false,
          reason: 'Low Price'
        },
        {
          id: '2',
          IsChecked: false,
          reason: 'Preferred Supplier'
        },
        {
          id: '3',
          IsChecked: false,
          reason: 'Delivery Time'
        },
        {
          id: '4',
          IsChecked: false,
          reason: 'Preferred Supplier'
        }
      ]
    },
    {
      reasonType: 'notAwarded',
      reasonArr: [
        {
          id: '1',
          IsChecked: false,
          reason: 'High Price'
        },
        {
          id: '2',
          IsChecked: false,
          reason: 'New Supplier'
        },
        {
          id: '3',
          IsChecked: false,
          reason: 'Delivery Time'
        },
        {
          id: '4',
          IsChecked: false,
          reason: 'New Supplier'
        }
      ]
    },
  ]

  navigateUrlToOrderReleased: any = {
    hotelId: '',
    productType: '',
  }

  allowOrder: boolean = false

  negotiate: any = {
    rfq_form_id: '',
    vendor_coating_price: '',
    vendor_shipping_date: '',
    vendor_shipping_cost: '',
    vendor_quantity: '',
    vendor_gst: '',
    text_box: '',
  }
  Roleexpand: boolean = false
  vendor_image_arr: any = []
  isNogoLoader: boolean = false
  price_symbol: any = ''
  expand_screen: any = ''
  expanded_Rfq: any = {}
  toggleIndex: any = 500
  constructor(private AppserviceService: AppserviceService, private router: Router, private route: ActivatedRoute, private toast: NgToastService, private HotelService: HotelService, private changeDetector: ChangeDetectorRef,private authService: AuthServiceService,private DemohotelService :DemohotelService) { }
  openlink2:any='' 
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();
    this.route.paramMap.subscribe((params) => {
      const expandedId = params.get("expanded");
      const idsId = params.get("ids");
      const productTypeId = params.get("productType");
      this.expand_screen = params.get("pipeLine");


      if (expandedId) {
        this.selectedProductId = expandedId;
      }

      if (idsId) {
        this.navigateUrlToOrderReleased.hotelId = idsId;
        this.hotelId.hotelNameId = idsId

      }

      if (productTypeId) {
        this.navigateUrlToOrderReleased.productType = productTypeId;
      }
    });

    if(this.isLoggedIn){
      this.catelogTable = this.catelogTable3

      this.openlink2 = this.HotelService.projecturl()

      // const hotelId = JSON.parse(localStorage.getItem('hotelNameId') || "[]")
  
  
      // rfq-orders,rfq-orders-table,rfq-orders-table-2 ,component
      this.AppserviceService.popupData(false)
  
      // NEGOTIATION RELOAD
      this.AppserviceService.negotiationReload$.subscribe((res) => {
        if (res == 'reload_negotiation') {
          this.vendorQUated('Negotiate-update')
          this.toggleIndex = 500
        }else{
          this.vendorQUated()
        }
      })
      // this.vendorQUated()
  
      this.AppserviceService.notification_reload_data$.subscribe((reload: any) => {
        if ((reload && (reload.status == '5' || reload.status == '6' || reload.status == '7' || reload.status == '8') && this.expand_screen == 'RFQ-Compare')) {
          this.vendorQUated('Negotiate-update')
        }
      })
  
      // this.AppserviceService.notifyExpandProduct$.subscribe(expand =>{
      //   if((expand.status == '6' || expand.status == '7') && this.expand_screen == 'RFQ-Compare'){
      //     this.vendorQUated()
      //   }
      // })
  
      this.AppserviceService.role$.subscribe((res) => {
        console.log(res)
        let rolebased: any = []
        rolebased = res
        if (res.length > 0) {
          rolebased.forEach((element: any) => {
            if (element == 189 || element == 1 || element == 190 || element == 191 || element == 193 || element == 194 ) {
              this.Roleexpand = true
            }
  
          })
        }
  
      })
  
      this.AppserviceService.country_price_symbol$.subscribe((symbol: any) => {
        this.price_symbol = symbol
      })
    }else{
      this.catelogTable = this.catelogTable2

      this.DemohotelService.Show_Demo_Orders(this.selectedProductId)

      this.AppserviceService.share_demo_orders$.subscribe((d: any) => {
        if(d){
            this.expandTable = d.filter((org:any)=>org.status == 3)
            console.log(this.expandTable)
            this.isLoader =this.expandTable > 0 ? true : false

        }
        console.log(this.selectedTable)
      })

    }
    
   
  }

  vendorQUated(type = 'normal') {
    this.HotelService.vendor_to_user(this.hotelId).subscribe((d: any) => {
      console.log(d)
      this.vendorQuoted.data = []

      this.expandTable = []
      const prId: any = []
      const requestHistory: any = []
      const mergeData: any = {
        PR_id: [],
        mv_id: '',
        deparment: '',
        riquredQty: '',
        reqiredDate: '',
        reason: '',
        remarks: '',
        product_id: ''
      }

      this.vendor_image_arr = d.quotation

      // rfq select vendor count
      for (let i = 0; i < d.rfq_compare.length; i++) {
        const mv_id = d.rfq_compare[i].mv_id;
        const matchingCount = d.total_count.find((item: any) => item.rfq_id === mv_id);
        const mergedData = [];
        // Loop through the vendor_id array
        if (matchingCount) {
          d.rfq_compare[i].count = matchingCount.count;

          for (let i = 0; i < matchingCount.count; i++) {
            // Create an object with the vendor_id and companyName
            const item = {
              vendor_id: matchingCount.vendor_id[i],
              companyName: matchingCount.companyName[i],
              vendor_response: d.quotation.some((re: any) => re.vendor_id == matchingCount.vendor_id[i]),
              awarded: 'No Response',
              rfq_id: matchingCount.rfq_id,
              negotiations: '1',
              awarded_reasons: [
                {
                  id: '1',
                  IsChecked: false,
                  reason: 'Low Price'
                },
                {
                  id: '2',
                  IsChecked: false,
                  reason: 'Preferred Supplier'
                },
                {
                  id: '3',
                  IsChecked: false,
                  reason: 'Delivery Time'
                },
                {
                  id: '4',
                  IsChecked: false,
                  reason: 'Preferred Supplier'
                }
              ]
            };

            // Push the object to the merged array
            mergedData.push(item);
          }

          d.rfq_compare[i].vendorArry = mergedData;
        } else {
          // If there is no matching count, you can set a default value, like 0
          d.rfq_compare[i].count = 0;
        }
      }

      d.rfq_compare.forEach((a: any) => {
        if (this.selectedProductId == a.product_id) {
          requestHistory.push(
            {
              PR_id: a.purchase_request_random,
              riquredQty: a.product_count_mv,
              mv_id: a.mv_id,
              isResponse: d.quotation.find((quotation: any) => quotation.rfq_id === a.mv_id) !== undefined ? 1 : 0,
              user_name: a.user_name,
              department_name: a.department_name,
              reqiredDate: a.requested_on,
              reason: a.why_this_vendor,
              remarks: a.remarks,
              product_id: a.product_id,
              vendorCount: a.count,
              vendorArray: a.vendorArry,
              case_quantity: a.case_quantity,
              approximate_price: a.approximate_price,
              approximate_shipping_cost: a.approximate_shipping_cost,
              requested_on: a.requested_on,
              vednor: a.vednor,
              vendorResponse: d.quotation,
            }
          )
        }
      });

      this.expandTable = requestHistory.filter((item: any, index: any, array: any) => {
        return array.findIndex((obj: any) => obj.mv_id === item.mv_id) === index;
      });
      console.log(this.expandTable)
      console.log(this.expanded_Rfq)
      if (type == 'Negotiate-update') {
        const expanded_order = this.expandTable.find((ord: any) => ord.mv_id == this.expanded_Rfq.mv_id)
        this.mvId(expanded_order)
      }

      if (this.expandTable.length === 0) {
        this.isLoader = false
      }
      return true
    })
  }

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

  // emmty container waiting for vendor response
  getRepeatedNamesOrDefault(count: number, item: any[], defaultValue: string) {
    if (count <= item.length) {
      return item.slice(0, count);
    } else {
      const result = [...item];
      for (let i = result.length; i < count; i++) {
        result.push({
          vendorId: result[0].vendorId,
          initialQuatity: defaultValue,
          qtyQuoted: defaultValue,
          costPiece: defaultValue,
          mv_id: defaultValue
        });
      }
      return result;
    }
  }

  // expand table with id
  tableExpand(event: any) {
    this.selectedTable = event
  }

  mvId(allObj: any) {
    this.multiVedorId = allObj.mv_id
    this.vendorQuoted.countAble = allObj.vendorCount
    this.vendorQuoted.vendorArray = allObj.vendorArray
    this.vendorQuoted.data = []
    this.expanded_Rfq = allObj
    this.selectVedorIdForOrder = null
    this.user_to_vendor.Hotel_Name_id = ''
    this.vendorQuotation(allObj.vendorResponse, allObj.mv_id)
    // this.vendorQUated()
    console.log(allObj)
  }

  totalbox: any = {}
  vendorQuotation(responseVendor: any, mv_id: any) {
    // VENDOR QOUTATION
    console.log(responseVendor)
    const arr = responseVendor ? responseVendor.filter((item: any) => item.rfq_id == mv_id) : [];
    const removeDublicate = this.removeDuplicatesByProperty(arr, 'vendor_id')

    // Comparition price , Transit Time , Shipping date
    const minPrice = Math.min(...removeDublicate
      .filter((item: any) => item.rfq_id === this.selectedTable)
      .map((item: any) => parseInt(item.vendor_coating_price, 10))
    );

    // const maxSalary = Math.max(...d.quotation.map((item:any) => parseInt(item.vendor_coating_price)));
    const minTransit = Math.min(...removeDublicate
      .filter((item: any) => item.rfq_id === this.selectedTable)
      .map((item: any) => parseInt(item.Transit_Time_days, 10))
    );

    const minEtaDate = new Date(Math.min(...responseVendor
      .filter((item: any) => item.rfq_id === this.selectedTable)
      .map((item: any) => new Date(item.ETA))
    ));

    console.log(removeDublicate)
    removeDublicate.forEach((element: any) => {
      if (this.multiVedorId == element.rfq_id) {
        const totalCost = parseInt(element.vendor_coating_price) * parseInt(element.vendor_quantity)
        const gstAmount = totalCost / 10;
        const totalAmount = totalCost + parseInt(element.vendor_shipping_cost) + gstAmount
        const piecePerCost = totalAmount / parseInt(element.vendor_quantity)

        // trasit time
        const currentDate = new Date(element.vendor_shipping_date);
        const transitTime = 1; // Transit time in days

        // Add the transit time to the current date
        currentDate.setDate(currentDate.getDate() + transitTime);

        const outputDate = currentDate.toLocaleDateString();

        // NEGOTIATION
        this.vendorQuoted.vendorArray.forEach((nego: any) => {
          if (nego.vendor_id == element.vendor_id) {
            nego.negotiations = element.negotiations
            nego.id = element.id
          }
          return nego
        })

        this.vendorQuoted.negotiation = element.negotiations
        // vendor responsed details
        this.totalbox = this.calculateTotalBoxesQuantity(element.vendor_quantity, element.Box_Quantity),

          this.vendorQuoted.data.push(
            {
              // type : 'RFQ',
              product_id: element.product_id,
              mv_id: element.rfq_id,
              vendorId: element.vendor_id,
              vendorArray: this.vendorArray,
              vendor_image: element.vendor_product_images[0],
              negotiation: element.negotiations,
              item: [
                {
                  products_id: element.product_id,
                  id: element.id,
                  RFQ_Number: element.rfq_id,
                  vendorId: element.vendor_id,
                  Hotel_Name: element.Hotel_Name,
                  location: element.Country,
                  vender_ref_num: element.vendor_reference_number,
                  vendor_sku: element.vendor_sku,
                  initialQuatity: element.total_req_qty + 'Pcs',
                  qtyQuoted: element.vendor_quantity + 'Pcs',
                  box_quantity: element.Box_Quantity,
                  before_required_date: element.before_required_date,
                  vendor_shipping_date: element.vendor_shipping_date,
                  trasitTime: element.Transit_Time_days + 'days',
                  ETA: element.ETA,
                  costPiece: parseInt(element.vendor_coating_price),
                  checkETA: this.compareDates(element.before_required_date, element.ETA) ? '--color-red' : '',
                  color: minPrice >= parseInt(element.vendor_coating_price) ? '--color-green' : '--color-redd',
                  transitColor: minTransit >= parseInt(element.Transit_Time_days) ? '--color-green' : '--color-redd',
                  ETA_color: new Date(minEtaDate) > new Date(element.ETA) ? '--color-green' : '--color-redd',
                  product_total: this.price_symbol + element.product_total,
                  sales_tax_gst_per: element.vendor_gst + '%',
                  total_sales_gst: this.price_symbol + element.Total_sales_gst,
                  shipping_per: element.shipping_percent + '%',
                  shippingCost: this.price_symbol + element.vendor_shipping_cost,
                  Shiping_Sales_Tax_per: element.Shiping_sales_tax + '%',
                  Shiping_Sales_Tax: this.price_symbol + element.total_shipping_sales_tax_cost,
                  totalAmount: this.price_symbol + element.total_cost,
                  remarksVendor: element.Vendor_remarks,
                  vendor_product_id: element.vendor_product_id,
                  payment_terms: element.payment_terms,

                  mv_id: element.rfq_id,
                  totalCost: this.price_symbol + totalCost,
                  gst: this.price_symbol + gstAmount,
                  piecePerCost: this.price_symbol + piecePerCost,
                  additionalInves: '2',
                  additionalQtyPricing: '2',
                  ifOrderVendor: 'Yes',
                  box_items1: (this.totalbox.wholeNumber > 1 ? this.totalbox.wholeNumber + ' Boxes' : this.totalbox.wholeNumber + ' Box') + " " + (element.Box_Quantity > 1 ? element.Box_Quantity + ' Items' : element.Box_Quantity + ' Item') + " " + (this.totalbox.decimalPart > 0 ? '+1 Box ' + this.totalbox.decimalPart + ' Items' : ''),
                  box_items2: '+1 Box ' + this.totalbox.decimalPart + ' Items',
                  box_items3: this.totalbox.decimalPart
                }
              ]
            }

          )
      }
    });
    console.log(this.vendorQuoted.data)
    this.changeDetector.detectChanges();
  }

  negotiateId: any = []
  selected_vendor_reson: any = []
  selectVedorForOrder(selectVedorId: any, product_id: any, mvid: any, vendorId: any, all: any, all_vendor_Obj: any) {
    this.selectVedorIdForOrder = selectVedorId
    this.selected_vendor_reson = all_vendor_Obj.awarded_reasons
    console.log(this.selected_vendor_reson)
    const reasons = all_vendor_Obj.awarded_reasons.filter((re: any) => re.IsChecked == true)
    const reason_1 = reasons.map((a: any) => a.reason)

    this.user_to_vendor = {
      Hotel_Name_id: this.hotelId.hotelNameId,
      vendor_id: vendorId,
      product_id: product_id,
      mv_id: mvid,
      why_this_vendor: JSON.stringify(reason_1)
    }

    this.totalValue.forEach((d: any) => {
      if (d.id == '2') {
        d.Total_Quantity = all.qtyQuoted
      }

      if (d.id == '3') {
        const p = all.piecePerCost
        const result = p.replace(this.price_symbol, '')
        const res = parseFloat(parseFloat(result).toFixed(2))
        d.Total_Quantity = res
      }

      if (d.id == '6') {
        const p = all.shippingCost
        const result = p.replace(this.price_symbol, '')
        const res = parseFloat(parseFloat(result).toFixed(2))
        d.Total_Quantity = res
      }

      if (d.id == '7') {
        const p = all.totalCost
        const result = p.replace(this.price_symbol, '')
        const res = parseFloat(parseFloat(result).toFixed(2))
        d.Total_Quantity = res
      }

      return d
    })

    this.negotiateId = {
      id: all.id,
      type: 'hotel',
    }

    console.log(this.totalValue)
  }
  
  compareDates(dateStr1: string, dateStr2: string): boolean {
    const date1 = this.parseDate(dateStr1);
    const date2 = this.parseDate(dateStr2);
    return date1 < date2;
  }

  parseDate(dateString: string): Date {
    type Month = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';

    const [day, month, year] = dateString.split('-');
    const months: { [key in Month]: number } = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };

    // Assert month as Month type
    const monthIndex = months[month as Month];
    return new Date(parseInt(year), monthIndex, parseInt(day));
  }

  submitOrder() {
    console.log(this.selected_vendor_reson)
    const reason = this.selected_vendor_reson.filter((reas: any) => reas.IsChecked == true)
    const rea = reason.map((rea: any) => rea.reason)
    this.user_to_vendor.why_this_vendor = rea.length > 0 ? JSON.stringify(rea) : null

    console.log(this.user_to_vendor)
    if (this.user_to_vendor.why_this_vendor) {
      this.HotelService.user_to_vendor_order(this.user_to_vendor).subscribe((d) => {
        console.log(d)
        this.toast.success({ detail: "Order Submitted to Vendor", summary: 'Success', duration: 5000 });
        this.router.navigate([{ ids: this.navigateUrlToOrderReleased.hotelId, expanded: this.selectedProductId, productType: this.navigateUrlToOrderReleased.hotelId, pipeLine: 'Released Orders' }], { relativeTo: this.route });
      },
        (error) => {
          console.log('test error');  // Log to console for debugging
          this.toast.error({ detail: "Error", summary: 'Negotiations are still ongoing', duration: 3000 });
        },
      )
    } else {
      this.toast.error({ detail: "You want give Reason for Order", summary: 'You want give Reason for Order', duration: 5000 });
    }

  }
  //scheduld rfq
  Schedule_rfq() {
    const RFQ_schedule = {
      'vendor_id': this.user_to_vendor.vendor_id,
      'product_id': this.user_to_vendor.product_id,
      'mv_id': this.user_to_vendor.mv_id,
      'Hotel_Name_id': this.hotelId.hotelNameId,
      'why_this_vendor': 'Preferred Supplier'
    }

    this.HotelService.user_to_vendor_schedule_order(RFQ_schedule).subscribe({
      next: (data) => {

        console.log(data)
        this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
        this.vendorQUated()
        this.selectedTable = ''

        // this.router.navigate([{ids:this.selectedHotel ,expanded : this.selectedTable,productType : this.url.productTypeTemp_brand ,pipeLine:'Released Orders' }], { relativeTo: this.route });
      },
      error: (error) => {
        console.log('test error');  // Log to console for debugging
        this.toast.error({ detail: "Error", summary: 'Negotiations are still ongoing', duration: 3000 });
      },
    })
    console.log(RFQ_schedule)

  }
  // Awarded Reason
  awardedCheckBox(event: any, isReason: any, awarded: any) {
    isReason.IsChecked = event.target.checked
    // for (let index = 0; index < this.orderReason.length; index++) {
    //   const element = this.orderReason[index];
    //   for (let i = 0; i < element.reasonArr.length; i++) {
    //     const data = element.reasonArr[i];
    //     if(data.id == id && element.reasonType == "Awarded") {
    //       data.IsChecked = event.target.checked
    //     }

    //     if(data.IsChecked == true && element.reasonType == "Awarded") {
    //       this.allowOrder = true
    //     }
    //   }
    // }
    this.selected_vendor_reson = awarded
  }

  // Negotiation .....
  negotiateIds: any = []
  negotiateData(all_vendorIdObj: any, data: any, index: any) {
    this.isNogoLoader = true
    this.toggleIndex = index
    console.log(all_vendorIdObj.vendor_id)
    console.log(all_vendorIdObj)

    console.log(data)
    this.selectVedorIdForOrder = index
    if (this.selectVedorIdForOrder == null) {
      this.toggleIndex = 500
      this.toast.error({ detail: "Select Any Request", summary: 'You have not selected any Request', duration: 5000 });
    } else {
      this.isNegotiate = true
      this.negotiateId = {
        id: all_vendorIdObj.id,
        type: 'hotel',
      }
      data.forEach((element: any) => {
        element.item.forEach((nego: any) => {
          if(nego.vendorId == all_vendorIdObj.vendor_id) {
            this.negotiate.rfq_form_id = nego.id
            this.negotiate.vendor_coating_price = nego.costPiece
            this.negotiate.vendor_shipping_date = nego.vendor_shipping_date
            this.negotiate.vendor_shipping_cost = nego.shippingCost
            this.negotiate.vendor_quantity = nego.qtyQuoted
            this.negotiate.vendor_gst = nego.gst
            this.negotiate.text_box = 'Negotiate'
          }
        });
      });
    }  
    console.log(data)
  }
  submitNegotiate() {
    this.HotelService.user_to_vendor_negotiation(this.negotiate).subscribe(res => {
      console.log(res)
      this.toast.success({ detail: "Send Negotiated Details", summary: 'Success', duration: 5000 });
    })
  }

  // openLink(vendor_products_id:any) {
  //    const link = 'https://qa.ezeebi.com/vendor_view_products/' + vendor_products_id ; // Adjust the URL structure
  //     window.open(link)
  //     console.log(link)
  // }
  clocecancelpopup() {
    this.product_compare = false;
  }
  compare() {
    this.product_compare = true;
  }
  openLink_brand(products_id: any) {
    const validateproduct = this.logMessage(products_id)
    if (validateproduct == 'Brand') {
      const link = this.openlink2+'/brand_view_products/' + products_id; // Adjust the URL structure
      window.open(link)
    } else {
      const link = this.openlink2+'/vendor_view_products/' + products_id; // Adjust the URL structure
      window.open(link)
    }

    console.log(this.navigateUrlToOrderReleased.hotelId)
  }

  downloadpdf(id: any) {
    const quation_id = { id: id };
    this.HotelService.generatepdf(quation_id).subscribe(
      (data: any) => {
        this.saveFile(data, 'RFQ_recept.pdf');
      },
      error => {
        console.error('Error fetching PDF:', error);
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

  reloadRfq() {
    this.vendorQUated()
  }
  logMessage(id: any) {
    let result: any = ''
    if (/^\d+$/.test(id)) {
      result = 'Brand'
      return result
    } else if (/^v\d+$/.test(id)) {
      result = 'Vendor'
      return result
    } else {
      result = 'Unknown'
      return result

    }
  }
  calculateTotalBoxesQuantity(total_qty: number, perBoxQty: number) {
    const totalBoxes = total_qty / perBoxQty;
    const wholeNumber = Math.floor(totalBoxes);
    const decimalPart = Math.round((totalBoxes - wholeNumber) * perBoxQty);

    return { wholeNumber, decimalPart };


  }
  toggleClick(data:any){
    const obj ={
      status:5,
      id:data.id,
      product_id: data.product_id

  }
  this.DemohotelService.update_demo_hotel(obj)
  this.toast.success({ detail: "Order Submitted to Vendor", summary: 'Success', duration: 5000 });
  this.router.navigate([{ ids: this.navigateUrlToOrderReleased.hotelId, expanded: this.selectedProductId, productType: this.navigateUrlToOrderReleased.hotelId, pipeLine: 'Released Orders' }], { relativeTo: this.route });
     

  }
}

