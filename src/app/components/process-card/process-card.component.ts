import { Component, Input, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import {HotelService} from 'src/app/service/hotel/hotel.service'

@Component({
  selector: 'b2b-process-card',
  templateUrl: './process-card.component.html',
  styleUrls: ['./process-card.component.css']
})
export class ProcessCardComponent implements OnInit {
  @Input() processCardData: any = {
    title: "Order Initiated", time: "2 days ago", data: [
      { "key": "Name", "value": "Welcome International" },
      { "key": "Released", "value": "27 April 2022 11AM" }
    ]
  };
  @Input() buttonname: any = 'view'
  @Input() showbutton: boolean = false
  details: boolean = false
  submited: boolean = false
  submit_orders: any = []
  @Input() nego_id: any = ''
  @Input() vendors: any = []
  @Input() orders: any = []

  open_nego: boolean = false
  negotiateId: any = []
  loopprice: any = []
  @Input() vendors_sub: any = []

  constructor(private AppserviceService: AppserviceService,private HotelService:HotelService,) { }
  price_symbol: any = ''
  openlinks:any=''
  ngOnInit(): void {
    this.openlinks= this.HotelService.projecturl()

    console.log(this.orders)
    console.log(this.vendors_sub)
    console.log(this.processCardData)

    let po_num: any = '', vendor_price: any = '', vendor_qty: any = '', ETA: any = '', des_price: any = '', des_qty: any = '', des_qua: any = '', des_date: any = ''
    this.orders.forEach((org: any) => {
      po_num = org.rfq_id
      vendor_price = org.vendor_coating_price
      vendor_qty = org.vendor_quantity
      ETA = org.ETA
      org.order_completes.forEach((dom: any) => {
        des_price = dom.price_received
        des_qty = dom.qty_received
        des_qua = dom.quality
        des_date = dom.date_received
      })

    })
    this.loopprice = [
      { 'key': 'Purchase order number', 'value1': po_num, 'value2': po_num, isHighlighted: false },
      { 'key': 'Price Per Pic', 'value1': this.price_symbol + vendor_price, 'value2': this.price_symbol + des_price, isHighlighted: this.convertToNumber(vendor_price) != des_price ? true : false },
      { 'key': 'Quantity', 'value1': vendor_qty, 'value2': des_qty, isHighlighted: vendor_qty != des_qty ? true : false },
      { 'key': 'ETA', 'value1': ETA, 'value2': des_date, isHighlighted: false },
      { 'key': 'Quality', 'value1': '-', 'value2': des_qua, isHighlighted: false },
    ]
    this.AppserviceService.country_price_symbol$.subscribe((symbol: any) => {
      this.price_symbol = symbol
    })
  }
  opentable(id: any) {
    console.log(id)

    if (this.processCardData.title == 'Negotiation') {
      this.open_nego = true
      this.negotiateId = {
        id: id,
        type: 'hotel',
      }
    } else {
      this.submited = true
      const box = this.calculateTotalBoxesQuantity(id.vendor_quantity, id.Box_Quantity)
      console.log(box)
      this.submit_orders = [
        { 'key': 'RFQ Number', 'value': id.rfq_id },
        { 'key': 'Vendor Name', 'value': id.vendor_name },
        { 'key': 'Vendor Reference Number', 'value': id.vendor_reference_number },
        { 'key': 'Brand Specification', 'value': 'view_spec', 'val': id.product_id },
        { 'key': 'Vendor SKU Number', 'value': id.vendor_sku, 'val': id.vendor_product_id },
        { 'key': 'Required Quantity(Hotel)', 'value': id.total_req_qty },
        { 'key': 'Required Quantity(Vendor)', 'value': id.vendor_quantity },
        { 'key': 'Box Quantity', 'value': id.Box_Quantity },
        { 'key': 'No Of Box', 'value': box.box_items1 + ' ' + box.box_items2 },
        { 'key': 'Required By', 'value': id.before_required_date },
        { 'key': 'Shipping Date', 'value': id.vendor_shipping_date },
        { 'key': 'Transit Time', 'value': id.Transit_Time_days },
        { 'key': 'ETA', 'value': id.ETA },
        { 'key': 'Price Per Piece', 'value': this.price_symbol + id.vendor_coating_price },
        { 'key': 'Product Total', 'value': this.price_symbol + id.product_total },
        { 'key': 'Sales Tax(%)', 'value': id.vendor_gst + '%' },
        { 'key': 'Sales Tax(AMT)', 'value': this.price_symbol + id.Total_sales_gst },
        { 'key': 'Shipping(%)', 'value': id.shipping_percent + '%' },
        { 'key': 'Shipping(AMT)', 'value': this.price_symbol + id.vendor_shipping_cost },
        { 'key': 'Shipping Sales Tax(%)', 'value': id.Shiping_sales_tax + '%' },
        { 'key': 'Shipping Sales Tax(AMT)', 'value': this.price_symbol + id.total_shipping_sales_tax_cost },
        { 'key': 'Total Cost', 'value': this.price_symbol + id.total_cost },
        { 'key': 'Payment Terms', 'value': id.payment_terms },
        { 'key': 'vendor Remarks', 'value': id.Vendor_remarks },



      ]
    }

  }
  opendesc_popup() {
    this.details = true
  }
  convertToNumber(value: string): number {
    const numericValue = value.replace(/[^\d.-]/g, '');
    return parseFloat(numericValue);
  }
  openlink(value: any, products_id: any) {
    console.log(value)
    console.log(products_id)
    if (products_id != undefined) {
      const validateproduct = this.logMessage(products_id)
      if (validateproduct == 'Brand') {
        const link = this.openlinks+'/brand_view_products/' + products_id; // Adjust the URL structure
        window.open(link)
      } else {
        const link = this.openlinks+'/vendor_view_products/' + products_id; // Adjust the URL structure
        window.open(link)
      }


    }

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

    // return { wholeNumber, decimalPart };
    // const totalbox = this.calculateTotalBoxesQuantity(org.vendor_quantity, org.Box_Quantity)
    const box_items1 = (wholeNumber > 1 ? wholeNumber + ' Boxes' : wholeNumber + ' Box') + " " + (perBoxQty > 1 ? perBoxQty + ' Items' : perBoxQty + ' Item')
    let box_items2 = ''
    if (decimalPart > 0) {
      box_items2 = '+1 Box ' + decimalPart + ' Items'

    } else {
      box_items2 = ' '

    }
    return { box_items1, box_items2 }

  }
}
