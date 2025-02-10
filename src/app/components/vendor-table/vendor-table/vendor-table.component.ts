import { Component, OnInit,Input } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'b2b-vendor-table',
  templateUrl: './vendor-table.component.html',
  styleUrls: ['./vendor-table.component.css']
})
export class VendorTableComponent implements OnInit {
  // catelogTable_two: string[] = ["Req. ID","Hotel Name","Location","Req. Qty","Received On","Req. by","Shipping Date","Your Ref Number","Vendor SKU","Req. Quantity","Box Quantity","Price/Pc","Total","More",'History',"Submit"];

  vendortableHeading: string[]=["Hotel Wide Usage","Order Frequency","Last Quoted Price","Last Requested Qty","Last Requested Date","Last Ordered Status","Last Executed Order Date","Last Executed Order Quantity","Market Price Comparison"]
  vendortable:boolean=false
  move_negotiate:boolean=false
  show_add_products:boolean=false
  Hoteldetails:boolean=false
  uploaddocument_type=''
  dir_payment_terms_nego:any=''
  dir_quantity_nego:any=''
  Payment_terms_field:any =['Net 0','Net 30','Net 60','Net 90','Net 120','Net 150']
  selectedTable:any = ''
  items_box:any=''
  items_box_rfq:any=''
  items_box_rfq2:any=''

  address:any='location'
  add_po_type :any =''
  catelogColumnSpacing_two = "16*1fr";
  vendorColumnSpacing_two = "14*0.6fr 0fr";
  catalogButton:any[]=['Hotel DATA','Last Quoted','Last Executed']
  startDate: string = ''; // Store the start date
  numberOfDays: number = 0; // Store the number of days
  endDate: string = ''; // Store the calculated end date
  firstValue: number = 0; // Store the first value
  secondValue: number = 0; // Store the second value
  result: number = 0; // Store the calculated result
  isNegotiate :boolean = false
  add_vendor_product :boolean = false
  purchaseTableId :any = ''
  dublicateArrayStored :any = []
  box :any=''
  Item:any=''
  upload_image:any = 'assets/upload_image.jpg'
  work_status_value:any=''
  // default variable RFQ listed
  // new
  // rfqHeading: string[] = ["Hotel Ref. Number","Purchase Order Num","Hotel Name","Location","Vendor Product","Vendor Reference Num","Vendor SKU Num","Recieved On","Initial Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Pieces/Box)","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA",'Price/ Piece',"Product Total","GST(%)","Total + GST","Shipping (%)","Shipping Cost","Shipping Gst","Total Cost","Purchase Intelligence","Push to Sales Order",""];
  // interface BoxQuantity {
  //   wholeNumber: number;
  //   decimalPart: number;
  // }

  catelogTable_two: string[] = ["RFQ Number","Hotel Name","Location",'Vendor Product',"Vendor Reference Number","Vendor SKU Number","Recieved On","Initial Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Pieces/Box)","No of Box","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA",'Price Per Piece',"Product Total"," Sales Tax/GST(%)","Total + Sales Tax/GST(%)","Shipping (%)","Shipping Cost","Shipping Sales Tax/GST(%)","Shipping Sales Tax/GST","Total Cost","Payment Terms","Vendor Remarks","Submit"," "];
  dataKeys :any = ['mv_id','Hotel_Name_short','Country','vendor_product','textInput_vendRefNum','vendor_sku','updated_at','product_count_mv','numInput_vendotQty','numInput_BoxQty','No_box','requested_on','date','numInput_transit','etaDate','numInput_price','totalPrice','sales_tax_Percentage','gstAount','numInput_shippingCost','shippingAmount','shipping_sales_percentage','ShippingGstAmt','totalCost','payment_terms','textInput_vendorRemarks','order_submit','icon']

  rfqSubmitted :any = ["RFQ Number","Hotel Name","Location","Vendor Product Image","Vendor Reference Number","Vendor SKU Number","Recieved On","Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Peices/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA","Price Per Piece","Product Total","Sales Tax/GST (%)","Total + Sales Tax/GST(%)","Shipping (%)","Shipping Cost","Shipping Sales Tax/GST(%)","Shipping - Sales Tax/GST (GST)","Total Cost","Payment Terms","Vendor Remarks"]
  submittedDataValues :any = ['rfq_id','Hotel_Name','Country','image_vendor','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','new_payment_terms','Vendor_remarks']


  // RFQ Reject
  rfqreject :any = ["RFQ Number","Hotel Name","Location","Vendor Product Image","Vendor Reference Number","Vendor SKU Number","Recieved On","Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Peices/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA","Price Per Piece","Product Total","Sales Tax/GST (%)","Total + Sales Tax/GST(%)","Shipping (%)","Shipping Cost","Shipping Sales Tax/GST(%)","Shipping - Sales Tax/GST (GST)","Total Cost","Payment Terms","Vendor Remarks"]
  rejectedDataValues :any = ['rfq_id','Hotel_Name','Country','image_vendor','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','new_payment_terms','Vendor_remarks']

  // rfq submitted to hotel user
  submittedUserHeading :any = ["Hotel Ref. Number","Purchase Order Num","Hotel Name","Location","Vendor Reference Num","Vendor SKU Num","Recieved On","Initial Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Pieces/Box)","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA",'Price/ Piece',"Product Total","GST(%)","Total + GST","Shipping (%)","Shipping Cost","Shipping Gst","Total Cost","Purchase Intelligence"];
  submittedUserValues :any = ['-','rfq_id','Hotel_Name','Country','-','-','updated_at','total_req_qty','-','-','requested_on','vendor_shipping_date','-','vendor_quantity','vendor_coating_price','vendor_quantity','-','vendor_shipping_date','vendor_gst','-','-','-','-']
  
  //READY_FOR_DISPATCH   HEADING 1
  Ready_For_dispatchHeading_level1 :any =["Hotel Name","Hotel Location","Purchase Order","Items","Upload Documents","Push to Dispatch"]
  Ready_for_dispatchValue_level1 :any =['Hotel_Name','location','rfq_id','count','Upload','toggle']

  //Service Request 
   service_heading:any= [ "Service Request Number","Hotel Name" , "Picture/Video","Room Number/Area","Required Date", "Current Condition", "Issue/Remarks","Payment Terms","Status","Service Cost","Upload Documents","Submit",""]
   service_order:any =["service_request_random",'Hotel_Name','service_img','room_area','required_by','current_condition','remarks','payment_terms','service_status','t_price','S_Upload','S_submit','s_icon']
   service_History_heading:any= [ "Service Request Number","Hotel Name" , "Picture/Video","Room Number/Area","Required Date", "Current Condition", "Issue/Remarks","Payment Terms","Status","Payment"]
   service_history_order:any =["service_request_random",'Hotel_Name','service_img','room_area','required_by','current_condition','remarks','payment_terms','working_status','payment']

   //DISPATCH   HEADING 1
  dispatchHeading_level1 :any =["Hotel Name","Hotel Location","Purchase Order","Items","Payment Terms"]
  dispatchValue_level1 :any =['Hotel_Name','location','rfq_id','count','new_payment_terms']


  Ready_For_dispatch : any = ["Push to Dispatch","Upload All Documents","Brand Product Image","Brand Spec", "Vendor Product Image","Purchase Order Num","Hotel Name","Location","Vendor Reference Num","Vendor SKU Num","Recieved On","Initial Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Pieces/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA",'Price/ Piece',"Product Total","GST(%)","Total + GST","Shipping (%)","Shipping Cost","Shipping Gst(%)","Shipping Tax Cost","Total Cost","Payment Terms(Hotel)"," "];
  ready_dispatch : any = ['toggle','Upload','image_product','brand_spec','image_vendor','rfq_id','Hotel_Name','location','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','new_payment_terms','revoke']

  dispatch : any = ["Brand Product Image","Vendor Product Image","Purchase Order Num","Hotel Name","Location","Vendor Reference Num","Vendor SKU Num","Recieved On","Initial Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Pieces/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA",'Price/ Piece',"Product Total","GST(%)","Total + GST","Shipping (%)","Shipping Cost","Shipping Gst(%)","Shipping Tax Cost","Total Cost","Payment Terms(Hotel)"," "];
  dispatch_data : any = ['image_product','image_vendor','rfq_id','Hotel_Name','location','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','new_payment_terms','revoke']
 //cancelledorder

  cancelledorder : any = ["Vendor Product Image","Purchase Order Num","Hotel Name","Location","Vendor Reference Num","Vendor SKU Num","Recieved On","Initial Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Pieces/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA",'Price/ Piece',"Product Total","GST(%)","Total + GST","Shipping (%)","Shipping Cost","Shipping Gst(%)","Shipping Tax Cost","Total Cost","Payment Terms(Hotel)","Reason"," "];
  cancelledorder_data : any = ['image_vendor','rfq_id','Hotel_Name','location','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','new_payment_terms','rejected_reason','revoke']
 
  //discrepancy
  discrepancy : any = ["Vendor Product Image","Purchase Order Num","Hotel Name","Location","Vendor Reference Num","Vendor SKU Num","Recieved On","Initial Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Pieces/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA",'Price/ Piece',"Product Total","GST(%)","Total + GST","Shipping (%)","Shipping Cost","Shipping Gst(%)","Shipping Tax Cost","Total Cost","Payment Terms(Hotel)","Reason"," "];
  discrepancy_data : any = ['image_vendor','rfq_id','Hotel_Name','location','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','new_payment_terms','command_by_user','revoke']

  //order for payments
  orderpay : any = ["Vendor Product Image","Purchase Order Num","Hotel Name","Location","Vendor Reference Num","Vendor SKU Num","Recieved On","Initial Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Pieces/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA",'Price/ Piece',"Product Total","GST(%)","Total + GST","Shipping (%)","Shipping Cost","Shipping Gst(%)","Shipping Tax Cost","Total Cost","Payment Terms(Hotel)","Payment Due"," "];
  orderpay_data : any = ['image_vendor','rfq_id','Hotel_Name','location','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','new_payment_terms','last_day_for_payment','revoke']

   //complete orders
   complete_order : any = ["Vendor Product Image","Purchase Order Num","Hotel Name","Location","Vendor Reference Num","Vendor SKU Num","Recieved On","Initial Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Pieces/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA",'Price/ Piece',"Product Total","GST(%)","Total + GST","Shipping (%)","Shipping Cost","Shipping Gst(%)","Shipping Tax Cost","Total Cost","Payment Terms(Hotel)"," "];
   complete_order_data : any = ['image_vendor','rfq_id','Hotel_Name','location','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','new_payment_terms','revoke']
 
  //confirm payment
   confirmpay : any = ["Push to completed orders","Vendor Product Image","Purchase Order Num","Hotel Name","Location","Vendor Reference Num","Vendor SKU Num","Recieved On","Initial Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Pieces/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA",'Price/ Piece',"Product Total","GST(%)","Total + GST","Shipping (%)","Shipping Cost","Shipping Gst(%)","Shipping Tax Cost","Total Cost","Payment Terms(Hotel)"," "];
   confirmpay_data : any = ['toggle','image_vendor','rfq_id','Hotel_Name','location','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','new_payment_terms','revoke']
 
  
  // Pick & pack heading and values
  pick_packHeading : any = ["Push to Ready for Dispatch","Vendor Product Image","Purchase Order Num","Hotel Name","Location","Vendor Reference Num","Vendor SKU Num","Recieved On","Initial Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Pieces/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA",'Price/ Piece',"Product Total","GST(%)","Total + GST","Shipping (%)","Shipping Cost","Shipping Gst(%)","Shipping Tax Cost","Total Cost","Payment Terms(Hotel)"," "];
  pick_pack : any = ['toggle','image_vendor','rfq_id','Hotel_Name','location','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','new_payment_terms','revoke']

  // Salse Order
  salesOrderHeading :any = ["Push to Pick & Pack","Vendor Product Image","Purchase Order Num","Hotel Name","Location","Vendor Reference Num","Vendor SKU Num","Recieved On","Initial Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Pieces/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA",'Price/ Piece',"Product Total","GST(%)","Total + GST","Shipping (%)","Shipping Cost","Shipping Gst","Shipping Tax Cost","Total Cost","Payment Terms(Hotel)"];
  salesOrderValue :any = ['toggle','image_vendor','rfq_id','Hotel_Name','Country','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','new_payment_terms']

  // rejected purchuse Order
  rejected_purchaseOrderHeading :any = ["Purchase Order Num","Hotel Name","Location","Recieved On","Initial Qty Requested (Hotel)","Required By (Hotel)","Payment Terms(Hotel)","Reason"];
  rejected_purchaseOrderValue :any = ['rfq_id','Hotel_Name','location','updated_at','total_req_qty','before_required_date','new_payment_terms','rejected_reason']


  // Purchase Order
  purchaseOrderHeading_level1 :any =["Hotel Name","Hotel Location","Purchase Order","Items","Required Date(Hotel)","Payment Terms(Hotel)"]
  purchaseOrderValue_level1 :any =['Hotel_Name','Country','rfq_id','count','vendor_shipping_date','new_payment_terms']
  purchaseDirectOrderValue_level1 :any =['Hotel_Name','Country','mv_id','count','required_date','new_payment_terms']


  purchaseOrderHeading :any =  ["Brand Product Image","Product Name","Category","Vendor Product","Brand Specification","Vendor SKU Number","Vendor Reference Number","Recieved On","Quantity Requested (Hotel)","Hotel Last Ordered Price","Price Per Pics/Box(Case)/Dozen","Payment Terms(Hotel)", "Shipping Date","Transit Time (days)","ETA",'Box Quantity (No.Of Pieces/Box)','No Of Box' ,"Product Total","Sales Tax/GST(%)","Sales Tax/GST","Shipping (%)","Shipping Cost","Shipping-Sales Tax/GST(%)","Shipping-Sales Tax/GST","Total Cost","Vendor Remarks","Renegotiate","Submit"," "];
  rfQpurchaseOrderValue :any = ['image_product2','brand_products_name','category_name','vendor_product','brand_spec','vendor_sku','vendor_reference_number','received_on','vendor_quantity','vendor_coating_price','vendor_coating_price','new_payment_terms','vendor_shipping_date','Transit_Time_days','ETA','Box_Quantity','No_box2','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','Vendor_remarks','-','toggle','icon']
  directOrderpurchaseValue :any = ['image_product','brand_products_name','category_name','vendor_product','brand_spec','vendor_sku','textInput_vendRefNum','received_on','hotel_required_qty','last_ordered_price','price','Payment_terms','date','numInput_transit','etaDate','numInput_BoxQty','No_box','total_product_cost','sales_tax_Percentage','product_sales_tax_cost','numInput_shipping_percentage','shippingCost','shipping_sales_tax_percentage','shipping_sales_tax_cost','totalCost','textInput_vendorRemarks','toggle1','order_submit','icon']
  
  // directLastOrderPrice :any = ['image_product','brand_products_name','category_name','vendor_product','brand_spec','vendor_sku','numInput_vendRefNum','received_on','hotel_required_qty','last_ordered_price','price','Payment_terms','date','numInput_transit','etaDate','numInput_BoxQty','No_box','total_product_cost','sales_tax_Percentage','product_sales_tax_cost','numInput_shipping_percentage','shippingCost','shipping_sales_tax_percentage','shipping_sales_tax_cost','totalCost','textInput_vendorRemarks','toggle','order_submit','icon']

  // RFQ ORDER IN PURCHESE REQUEST COLUMN
  // rfQOrderpurchaseValue :any = ['hotelProductImage','productName','category_name','vendor_product','brand_spec','vendor_sku','vendor_reference_number','updated_at','vendor_quantity','vendor_coating_price','payment_terms','vendor_shipping_date','Transit_Time_days','ETA','numInput_BoxQty','Box_Quantity','total_cost','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','Vendor_remarks','toggle','order_submit','icon']


  // Renegotiate table heading
  rfq_renegotiateHeading :any = ["Vendor Product Image","RFQ Number","Hotel Name","Location","Vendor Reference Number","Vendor SKU Number","Recieved On","Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Peices/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA","Price Per Piece","Product Total","Sales Tax/GST (%)","Total + Sales Tax/GST(%)","Shipping (%)","Shipping Cost","Shipping - Sales Tax/GST (%)","Shipping - Sales Tax/GST (GST)","Total Cost","Vendor Remarks","Payment Terms","Negotiate"];
  rfq_renegotiateValues :any = ['image_vendor','rfq_id','Hotel_Name','Country','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','Vendor_remarks','new_payment_terms','user_negotiate_img']

  // PO-Purchase Order table heading
  PO_renegotiateHeading :any = ["Vendor Product Image","Purchase order Number","Hotel Name","Location","Vendor Reference Number","Vendor SKU Number","Recieved On","Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Peices/Box)","No of Boxes","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA","Price Per Piece","Product Total","Sales Tax/GST (%)","Total + Sales Tax/GST(%)","Shipping (%)","Shipping Cost","Shipping - Sales Tax/GST (GST) %","Shipping - Sales Tax/GST (GST)","Total Cost","Vendor Remarks","Payment Terms","Negotiate"];
  PO_renegotiateValues :any = ['image_vendor','rfq_id','Hotel_Name','Country','vendor_reference_number','vendor_sku','updated_at','total_req_qty','vendor_quantity','Box_Quantity','No_box2','before_required_date','vendor_shipping_date','Transit_Time_days','ETA','vendor_coating_price','product_total','vendor_gst','Total_sales_gst','shipping_percent','vendor_shipping_cost','Shiping_sales_tax','total_shipping_sales_tax_cost','total_cost','Vendor_remarks','new_payment_terms','user_negotiate_img']

  requestedProduct :any = []
  vendorQuotedObj:any = {
    'user' :'',
    'rfq_id' : '',
    'product_id': '',
    'vendor_coating_price': '',
    'vendor_shipping_date': '',
    'vendor_shipping_cost': '10',
    'vendor_quantity': '',
    'vendor_gst': '',
    'before_required_date': '',
    'total_req_qty'  : '',
    'vendor_ref_num':'',
    'vendor_sku_no':'',
    'vendor_ETA':'',
    'transit_days':'',
  }

  directOrder_PO_VendorQuotedObj:any = {
    'user' :'',
    'rfq_id' : '',
    'product_id': '',
    'vendor_coating_price': '',
    'vendor_shipping_date': '',
    'shipping_percent' :'',
    'vendor_shipping_cost': '10',
    'vendor_quantity': '',
    'vendor_gst': '',
    'before_required_date': '',
    'total_req_qty'  : '',
    'box_qty': '',
    'vendor_ref_num':'',
    'vendor_sku_no':'',
    'vendor_ETA':'',
    'Transit_Time_days':'',

    'product_Tax' :'',
    'product_Price' :'',
    'product_total' :'',
    'Shiping_sales_tax':'',
    'Total_sales_gst':'',
    'total_shipping_sales_tax_cost':'',
    'total_cost' : '',
    'Vendor_remarks' :''
  }

  rfqMoreDEtailsHeading : any = ["GST","Total Cost","Shipping %","Shipping cost","GST (Shipping)","Total Amount","Chat","Purchase Intelligence"]
  
  @Input() rfqRequrest:any = []
  @Input() vendorAllProductsArr:any = []
  @Input() directOrderArray:any = {
    directOrder : []
  }
  // @Input() directOrderArrayDublicate:any = []

  editPendingRequest :any ={
    id :'' ,
    vendor_coating_price : '',
    vendor_shipping_date : '',
    vendor_shipping_cost : '' ,
    vendor_quantity : ''
  }
  send_date:any=''
  navBarSelected :string = ''
  revokepopup:boolean= false
  revokereason:any=''
  revoke_orders:any={}
  serviceimg:boolean=false
  // pendingRequestEditable : boolean = false
  pendingRqtId :any = ''
  vendorSelectedImage :any = 'https://th.bing.com/th/id/OIP.xaADddZHWRoU3TbjEVGssQHaFj?w=234&h=180&c=7&r=0&o=5&pid=1.7'
  negotiate:boolean =false
  tracking :boolean = false
  isTraking :boolean = false
  isUploadDocument:boolean=false
  reloadtext:any= 'no load'
  trackingType :any = {
    type  : '',
    order : ''
  }

  orderTrackingLoading :any = {
    'product_id' : '',
    'mv_id' : '',
    'Hotel_Name_id' : '',
  }

  // Total Quantity
  qtyCount :any = {
    vendor_product_id:'',
    requestQty : '',
    boxQty : '',
    price_pc :'',
    total : 0 ,
    gst : 0,
    totalCost : 0,
    vendorShippingDate : '',
    shipping :'',
    shippingCost :'' ,
    gstShipping :'',
    totalAmount : '',
    ven_gst:'',
    shiping_sales_tax:'',
    Box_qty:'',
    vendor_remarks:'',
    Total_gst:'',
    product_total:'',
    ven_shiping_per:''

  }

  mvId:any = ''
  Servicestatus:any='Not Started'
  inuptValidation :boolean = false
  disableoggle :boolean = false
  directOrderSubscription :any = ''

  groupOrder_heading:any = []
  groupOrder_data:any = []
  mergeRFQ_DO:any = []
  details:boolean =false
  filterProducts:any = ''
  rfq_filterProducts :any = ''
  constructor(private HotelService:HotelService,private AppserviceService:AppserviceService,private toast: NgToastService, private router: Router, private route: ActivatedRoute) { }
   vendorID:any=''
  ngOnInit(): void {
    this.dateTime()
   
    this.route.paramMap.subscribe((params) => {
      let id = params.get("expanded");
      let purchase_Table = params.get("purchase_tableID");
      // this.vendorID =  params.get("vendor_id");

      if(purchase_Table) this.purchaseTableId = purchase_Table
      if (id) this.selectedTable = id;
    }) 

    // this.rfqRequrest = this.rfqRequrest.reverse()
   
    this.route.paramMap.subscribe((params) => {
      let i = params.get("process");
      if (i) this.navBarSelected = i;
      if(i == 'RFQ Received'){
        this.show_add_products = true
      }
      if(i == 'RFQ pending'){
        this.catelogTable_two = this.rfqSubmitted
        this.dataKeys = this.submittedDataValues
      }

      if(i == 'RFQ Renegotiate'){
        this.catelogTable_two = this.rfq_renegotiateHeading
        this.dataKeys = this.rfq_renegotiateValues
      }

      if(i == 'RFQ Denied'){
        this.catelogTable_two = this.rfqreject
        this.dataKeys = this.rejectedDataValues
      }

      if(i == 'pur_Order'){
        this.show_add_products =true

        this.catelogTable_two = this.purchaseOrderHeading
        this.dataKeys = this.rfQpurchaseOrderValue       
        this.groupOrder_heading = this.purchaseOrderHeading_level1
        this.groupOrder_data = this.purchaseOrderValue_level1
      }

      if(i == 'Renegotiate'){
        this.catelogTable_two = this.PO_renegotiateHeading
        this.dataKeys = this.PO_renegotiateValues
      }

      if(i == 'salesOrder'){
        this.catelogTable_two = this.salesOrderHeading
        this.dataKeys = this.salesOrderValue
      }

      if(i == 'Pick&Pack'){
        this.catelogTable_two = this.pick_packHeading
        this.dataKeys = this.pick_pack
      }
      if(i == 'Ready_Dispatch'){
        this.catelogTable_two = this.Ready_For_dispatch
        this.dataKeys = this.ready_dispatch
        
        this.groupOrder_heading = this.Ready_For_dispatchHeading_level1
        this.groupOrder_data = this.Ready_for_dispatchValue_level1
        // this.purchaseOrderHeading_level1 = this.Ready_For_dispatchHeading_level1
        // this.purchaseOrderValue_level1 = this.Ready_for_dispatchValue_level1        
      }
      if(i == 'Dispatch'){
        this.catelogTable_two = this.dispatch
        this.dataKeys = this.dispatch_data

        this.groupOrder_heading = this.dispatchHeading_level1
        this.groupOrder_data = this.dispatchValue_level1
      }
      if(i == 'Discrepancy'){
        this.catelogTable_two = this.discrepancy
        this.dataKeys = this.discrepancy_data
      }

      if(i == 'Payment'){
        this.catelogTable_two = this.orderpay
        this.dataKeys = this.orderpay_data
      }
      if(i == 'Reconciled'){
        this.catelogTable_two = this.confirmpay
        this.dataKeys = this.confirmpay_data
      }

      if(i == 'Completed Orders'){
        this.catelogTable_two = this.complete_order
        this.dataKeys = this.complete_order_data
      }
      if(i == 'Cancelled_orders'){
        this.catelogTable_two = this.cancelledorder
        this.dataKeys = this.cancelledorder_data
      }
      if(i == 'Reject_pur_Order'){
        this.catelogTable_two = this.rejected_purchaseOrderHeading
        this.dataKeys = this.rejected_purchaseOrderValue
      }
      if(i == 'Service_Request'){
        this.catelogTable_two = this.service_heading
        this.dataKeys = this.service_order
      }
      if(i == 'Service_Request_History'){
        this.catelogTable_two = this.service_History_heading
        this.dataKeys = this.service_history_order
      }

    }) 
        //  this.vendorID = JSON.parse(localStorage.getItem('vendorId') || " ")

    const pruductId:any = {
      product_id  : this.selectedTable
    }
    // this.HotelService.connectAPI('POST' ,'/purchase_intelligent',pruductId).subscribe((d: any) => {
    //   console.log(d)
    // })

    if(this.navBarSelected == 'pur_Order'){
      this.router.navigate([{ process: this.navBarSelected}], { relativeTo: this.route });
    }

    this.AppserviceService.deletePurchaseOrder$.subscribe((res) =>{
      if(res != ''){
        const index = this.requestedProduct.findIndex((item:any) => item.product_id == res);
        this.isTraking = false
        if (index !== -1) {
          this.requestedProduct.splice(index, 1);
        }
      }
    })
    
    // this.AppserviceService.realoadVendorData('reload')

    this.directOrderSubscription = this.AppserviceService.direct_order$.subscribe((res:any) =>{
      this.purchaseTableId = ''
      if(res != undefined && res.type == 'pur_Order'){
        this.mergeRFQ_DO = []
        this.PO_directOrder(this.selectedTable,res.fiveColumnData.directOrder,res.fiveColumnData.rfqOrders)
        this.rfq_DirectOrder_merge(this.selectedTable,res.fiveColumnData.directOrder,res.fiveColumnData.rfqOrders)
        this.rfqRequrest = res.orders

        this.purchaseTableId = ''
        this.vendor_rfq()

      }else{
        // READY FOR DISPATCH COLUMN 
        // GROUP ORDER CHECK HERE
        this.mergeRFQ_DO = []
        if(res != undefined && res.fiveColumnData){
          res.fiveColumnData.forEach((element:any) => {
            element.mv_id = element.rfq_id
            element.isToggle = false
            element.count =  this.ready_dis_group_count(element.rfq_id,res.fiveColumnData) + '/' + element.group_order_count
            element.image = element.products ? element.products[0].product_image : ''
          });

          this.mergeRFQ_DO = this.removeDuplicatesByProperty(res.fiveColumnData,'mv_id')
        }

        if(res != undefined){
          this.rfqRequrest = res.orders
          this.vendor_rfq()
        }
      }
    })    
    this.vendor_rfq()
    
  }

  ready_dis_group_count(mv_id:any,all_order:any){
    let count = 0
    all_order.forEach((element:any) => {
      if(element.rfq_id == mv_id){
         count++
      }
    });

    return count
  }

  ngOnDestroy(): void {
    if (this.directOrderSubscription) {
      this.directOrderSubscription.unsubscribe();
    }
  }

  getReversedSortedData() {
    console.log(this.mergeRFQ_DO);
    this.mergeRFQ_DO = this.mergeRFQ_DO.slice().sort((a: any, b: any) => {
        return new Date(`${b.updated_at}`).getTime() - new Date(`${a.updated_at}`).getTime();
    });
  }

  rfq_DirectOrder_merge(selectedTable:any,directOrderInitial:any,rfqOrders:any){
    this.mergeRFQ_DO = []
    let rfqOrder:any = []
    let directOrder:any = []
    let countOrders = 0

    // if(this.directOrderArray != undefined){   //BUG FIX
    if(directOrderInitial){
      if(rfqOrders){
        rfqOrder = this.removeDuplicatesByProperty(rfqOrders,'rfq_id')
      }
  
      if(directOrderInitial){
        directOrder = this.removeDuplicatesByProperty(directOrderInitial,'mv_id')
      }
  
      directOrder.forEach((doo:any) =>{
        const exist_count = this.countOrder(doo.mv_id,directOrderInitial,rfqOrders)
        doo.count = exist_count > '1' ? exist_count + '/' + doo.group_order_count : exist_count
        doo.trigger_color = doo.trigger == '1' ? '--color-white' : '--color-light-red'
        this.mergeRFQ_DO.push(doo)
      })
   
      rfqOrder.forEach((rfq:any) =>{
        rfq.mv_id = rfq.rfq_id
        rfq.source = 'rfq'
        rfq.trigger_color = rfq.trigger == '1' ? '--color-white' : '--color-light-red'
        // rfq.received_on = rfq.updated_at
        rfq.count = this.countOrder(rfq.rfq_id,directOrderInitial,rfqOrders) 
        this.mergeRFQ_DO.push(rfq)
      })
  
      this.mergeRFQ_DO = this.removeDuplicatesByProperty(this.mergeRFQ_DO,'mv_id')
      this.getReversedSortedData()
    }

    
    // COUNT ALL ALL ORDER USE MV_ID
  }

  countOrder(mv_id:any,directOrderInitial:any,rfqOrders:any){
    // if(this.directOrderArray != undefined && this.directOrderArray.rfqOrders != undefined){
      const countDO = directOrderInitial.filter((data:any) => data.mv_id == mv_id)
      const count = rfqOrders.filter((data:any) => data.rfq_id == mv_id)

      return countDO.length > 0 ? parseInt(countDO[0].product_count) + count.length : count.length
    // } 
  }

  vendor_rfq(){
    this.requestedProduct = []
    // const reverse = this.rfqRequrest.reverse()
    this.rfqRequrest.forEach((element:any) => {
      if(element.product_id == this.selectedTable){
        element.Hotel_Name = element.Hotel_Name
        element.Hotel_Name_short = this.transformPlacementData(element.Hotel_Name)
        element.isToggle = false
        // element.requested_on = this.formatDate(element.requested_on)
        element.mv_id = element.rfq_id ? element.rfq_id : element.mv_id
        this.requestedProduct.push(element)
        this.dublicateArrayStored.push(element)
      }
    });
  }

  fiveColumnTable(type:any){
    if(this.navBarSelected == 'Ready_Dispatch' || this.navBarSelected == 'Dispatch'){
      return this.groupOrder_data
    }else{
      if(type == 'diractorder'){
        return this.purchaseDirectOrderValue_level1
      }else{
        return this.purchaseOrderValue_level1
      }
    }
    // groupOrder_data
  }

  purchase_tableExpand(event:any,allObj:any){
    this.purchaseTableId = event

    this.requestedProduct = []
    if(this.navBarSelected == 'pur_Order'){
      this.PO_directOrder(event,this.directOrderArray.directOrder,this.directOrderArray.rfqOrders)
      this.router.navigate([{ expanded: event,purchase_tableID:event,process: this.navBarSelected}], { relativeTo: this.route });
    }else if(this.navBarSelected == 'Ready_Dispatch' || this.navBarSelected == 'Dispatch'){
      this.requestedProduct = []
      this.rfqRequrest.forEach((element:any) => {
        if(event == element.mv_id){
          this.requestedProduct.push(element)
        }
      });

      // READY FOR DISPATCh DOCUMENT
      if(this.requestedProduct.length <= 1){
        if(this.catelogTable_two[0] == 'Push to Dispatch'){
          this.catelogTable_two.splice(0,2)
          this.dataKeys.splice(0,2)
        }
        
      }
      // this.requestedProduct = this.rfqRequrest
      this.router.navigate([{ expanded: event,purchase_tableID:event,process: this.navBarSelected}], { relativeTo: this.route });
    }else{
      if (event) {
        this.router.navigate([{ expanded: this.selectedTable,purchase_tableID:event,process: this.navBarSelected}], { relativeTo: this.route });
      } else {
        this.router.navigate([], { relativeTo: this.route });
      }
    }

    // ORDER VIEWES (or) NOT
    this.mergeRFQ_DO.forEach((data:any) => {
      if(data.mv_id == allObj.mv_id){
        data.trigger_color = '--color-white'
      }
      return data
    })

    if(allObj.trigger == "0" || allObj.trigger == null){
      const payload = {
        rfq_id : allObj.mv_id
      }
      this.HotelService.vendor_trigger(payload).subscribe((res:any) =>{
        allObj.trigger = '3'
        // allObj.trigger_color = '--color-white'
      })
    }
    
    // this.getReversedSortedData()
  }

  PO_directOrder(event: any, directOrderData: any, rfqOrder: any) {
    if (directOrderData) {
      directOrderData.forEach((element: any) => {
        // element.updated_at = element.received_on
        if (event == element.mv_id) {
          if (typeof element.hotel_required_qty === 'string') {
            const hotelQtyArray = element.hotel_required_qty.split(',')
            // const category = element.category_id.split(',')

            const productId = element.product_id.split(',')
            let vendorProductId: any = {}
            let vendorProductId2: any = {}
            let joinproduct: any = []
            if (element.products.length > 0) {
              element.products.forEach((org: any) => {
                org.vp = '0'
              })
            }
            if (element.vendor_products.length > 0) {
              element.vendor_products.forEach((org: any) => {
                org.vp = '1'
              })
            }
            if (element.temporary_products.length > 0) {
              element.temporary_products.forEach((org: any) => {
                org.vp = '2'
              })
            }

            joinproduct = joinproduct.concat(element.vendor_products, element.products,element.temporary_products)
            if (element.vp == '1' && element.product_last_order.length == 0) {
              vendorProductId2 = element.vendor_products.find((prod: any) => {
                return prod.product_id
              })
            }
            const vendorProduct = []
            vendorProduct.push()
            for (let i = 0; i < hotelQtyArray.length; i++) {
              let catogory_id: any = ''

              // if(element.vp == '1'){
              if (element.product_last_order.length > 0) {
                vendorProductId = element.product_last_order.find((prod: any) => {
                  return element.product_id.includes(String(prod.Product_id)) ? element.product_id.includes(String(prod.Product_id)) : undefined; // Convert Product_id to string for comparison
                });
                console.log(vendorProductId)
                joinproduct.forEach((brand_pro: any) => {
                  element.product_last_order.forEach((last_order: any) => {
                    brand_pro.last_ordered_product = 0
                    if (brand_pro.product_id == last_order.Product_id) {
                      brand_pro.last_ordered_product = last_order
                    }
                  });
                });
              }

              catogory_id = joinproduct.find((res: any) => res.product_id == productId[i])

              // }else{
              //    catogory_id = element.products.find((res:any) => res.product_id == productId[i])

              // }
              // const last_ordered_products:any = element.product_last_order
              const lastOrderedPrice = element.product_last_order.length > 0 ? this.previous_ordered_details(productId[i], element.product_last_order).last_ordered_price : element.products.length > 0 ? '0' : this.previous_ordered_roduct(productId[i], element.product_last_order).price
              const ordered_products: any = this.brand_vendor_merge_products(joinproduct, productId[i])
              const qty = hotelQtyArray[i].trim();
              this.requestedProduct.push({
                mv_id: element.mv_id,
                Hotel_Name_id: element.Hotel_Name_id,
                isToggle: false,
                product_id: productId[i],
                vp: ordered_products.vp,
                negotiateId: element.id,
                id: element.products.length > 0 ? ordered_products.product_id : element.vendor_products.length > 0 ? element.vendor_products[0].product_id : element.temporary_products[0].product_id,
                Hotel_Name_full: element.Hotel_Name,
                Hotel_Name: this.transformPlacementData(element.Hotel_Name),
                vendor_reference_number: element.vendor_reference_number,
                category_name: element.products.length > 0 ? this.transformPlacementData(joinproduct[i].category_name) : element.vendor_products.length > 0 ? this.transformPlacementData(element.vendor_products[0].category_name) : this.transformPlacementData(element.temporary_products[0].category_name),
                Country: element.Country,
                hotel_required_qty: qty,
                category_id: catogory_id ? catogory_id.category_id : '',
                price: element.products.length > 0 ? '0' : element.product_last_order.length > 0 ? this.vendorPrducts(vendorProductId.vendor_Product_id).price : 0,
                total_product_cost: parseInt(qty) * lastOrderedPrice,// hotel_required_qty * price
                // sales_tax_Percentage : '18',
                product_sales_tax_cost: ((parseInt(qty) * lastOrderedPrice) * 100 / 18).toFixed(2),
                required_date: element.required_date,
                Payment_terms: element.new_payment_terms,
                image: element.products.length > 0 ? ordered_products.product_image : element.vendor_products.length > 0 ? element.vendor_products[0].product_image : element.temporary_products[0].product_image, // Change index here
                brand_products_name: element.products.length > 0 ? this.transformPlacementData(joinproduct[i].name) : element.vendor_products.length > 0 ? this.transformPlacementData(element.vendor_products[0].name) : element.temporary_products[0].name,
                brand_products_Fullname: element.products.length > 0 ? ordered_products.name : element.vendor_products.length > 0 ? element.vendor_products[0].name : element.temporary_products[0].name,
                source: 'diractorder',
                received_on: element.received_on,
                // last_ordered_price : catogory_id. ? element.product_last_order[0].last_ordered_price : element.vp !='1' ? '0':this.vendorPrducts(vendorProductId2.product_id).price,

                last_ordered_price: element.product_last_order.length > 0 ? this.previous_ordered_details(productId[i], element.product_last_order).last_ordered_price : element.products.length > 0 ? '0' : this.previous_ordered_roduct(productId[i], element.product_last_order).price,
                // vendorProductImage : this.vendorPrducts(element.products[i].last_ordered_product != 0 ? element.products[i].last_ordered_product.vendor_Product_id : ''),
                vendor_sku: element.product_last_order.length > 0 && vendorProductId != undefined ? this.previous_ordered_roduct(productId[i], element.product_last_order).sku : element.products.length > 0 ? '' : this.previous_ordered_roduct(productId[i], element.product_last_order).sku,
                vendor_product_id: element.product_last_order.length > 0 && vendorProductId != undefined ? this.previous_ordered_roduct(productId[i], element.product_last_order).vendor_products_id : element.products.length > 0 ? [] : this.previous_ordered_roduct(productId[i], element.product_last_order).vendor_products_id,
                shipping_sales_tax_percentage: element.product_last_order.length > 0 && vendorProductId != undefined ? this.previous_ordered_roduct(productId[i], element.product_last_order).shipping_tax_percentage : element.products.length > 0 ? 0 : this.previous_ordered_roduct(productId[i], element.product_last_order).shipping_tax_percentage,
                sales_tax_Percentage: element.product_last_order.length > 0 && vendorProductId != undefined ? this.previous_ordered_roduct(productId[i], element.product_last_order).tax_percentage : element.products.length > 0 ? '0' : this.previous_ordered_roduct(productId[i], element.product_last_order).tax_percentage,
              });

              // SECOUND TIME SAME PRODUCT ORDER GOT TAX, PRICE FILLD AUTOMATICALLY
              if (element.product_last_order.length > 0) {
                // FOR API 
                const vendorProduct: any = this.previous_ordered_roduct(productId[i], element.product_last_order)
                let reOrderVendProduct_image = vendorProduct ? vendorProduct.product_image : ''
                let reOrderVendProduct_Id = vendorProduct != 0 ? vendorProduct.vendor_products_id : ''
                let reOrderVendProduct_sku = vendorProduct != 0 ? vendorProduct.sku : ''
                let reOrderVendProduct_allDetails = vendorProduct != 0 ? vendorProduct : ''

                const id = element.vp == 0 ? ordered_products.product_id : element.vp == 1 ? element.vendor_products[0].product_id : element.temporary_products[0].product_id
                this.vendorProductSelect(reOrderVendProduct_image, reOrderVendProduct_Id, id, reOrderVendProduct_sku, element, reOrderVendProduct_allDetails, 'directOrder')                // this.requestedProduct.forEach((order:any) => {
                //   // order.vendorProductImage = reOrderVendProduct_image
                //   this.vendorProductSelect(reOrderVendProduct_image,reOrderVendProduct_Id,order.id,reOrderVendProduct_sku,order,reOrderVendProduct_allDetails,'directOrder')
                // });
              } else {
                console.log('no order')
                // this.vendorProductSelect('', '', '', '', '', '', 'directOrder')
              }
              // if(element.vp == '1' && element.product_last_order.length == 0   ){
              //   // FOR API 
              //   const vendorProduct = this.vendorPrducts(vendorProductId2.product_id)
              //   let reOrderVendProduct_image = vendorProduct.product_image
              //   let reOrderVendProduct_Id =  vendorProduct.vendor_products_id
              //   let reOrderVendProduct_sku =  vendorProduct.sku
              //   let reOrderVendProduct_allDetails = vendorProduct

              //   this.requestedProduct.forEach((order:any) => {
              //     this.vendorProductSelect(reOrderVendProduct_image,reOrderVendProduct_Id,order.id,reOrderVendProduct_sku,order,reOrderVendProduct_allDetails,'directOrder')
              //   });
              // }

            };

            // SAME PRODUCT ORDER SCOUND TIME
            // this.vendorProductSelect(element.vendorProductImage,element.vendor_product_id,element.products[i].product_id,)
          } else {
            // Handle the case where hotel_required_qty is not a string
            // For example, you might choose to ignore this element or handle it differently
            console.error("hotel_required_qty is not a string:", element.hotel_required_qty);
          }
        }
      });
    }

    // RFQ ORDER MERGE DO SINGLE ORDER
    if (rfqOrder != undefined) {
      console.log(rfqOrder)
      rfqOrder.forEach((element: any) => {
        // this.dataKeys = this.rfQOrderpurchaseValue

        if (event == element.rfq_id) {
          element.image = element.vp == 0 ? element.products[0].product_image : element.vendor_products[0].product_image
          element.brand_products_name = element.vp == 0 ? this.transformPlacementData(element.products[0].name) : this.transformPlacementData(element.vendor_products[0].name),
          element.category_name = element.vp == 0 ? element.products[0].category_name : element.vendor_products[0].Category
          // element.product_id = this.rfq_Hotel_BrandProduct_VendorProduct(element.hotel_vendor_products,element.products,element.product_id).product_id
          element.brand_image = this.rfq_Hotel_BrandProduct_VendorProduct(element.hotel_vendor_products,element.products,element.temporary_products,element.product_id).product_image
          // element.last_day_for_payment= this.convertDate(element.last_day_for_payment),

          element.vendorProductImage = element.vendor_products ? element.vendor_products[0].product_image : ''
          element.vendor_sku = element.vendor_products ? element.vendor_products[0].sku : ''
          element.vendor_products_id = element.vendor_products ? element.vendor_products[0].vendor_products_id : ''
          // element.last_ordered_price = element.product_last_order[0].last_ordered_price

          this.requestedProduct.push(element)
          console.log(this.requestedProduct)
        }
      });
    }
  }

  previous_ordered_details(product_id: any, ordered_details: any){
    const prod = ordered_details.find((res: any) => res.Product_id == product_id)
    return prod ? prod : {}
  }

  previous_ordered_roduct(product_id: any, ordered_details: any) {
    const prod = ordered_details.find((res: any) => res.Product_id == product_id)
    return prod ? this.vendorPrducts(prod.vendor_Product_id) : {}
  }

  brand_vendor_merge_products(all_products:any,product_id:any){
    const ordered_product = all_products.find((pro:any) => pro.product_id == product_id)
    return ordered_product ? ordered_product : ''
  }

  // RFQ PRODUCTS MERGE
  rfq_Hotel_BrandProduct_VendorProduct(hotelVendorProduct:any,brandProduct:any,temporary_products:any,product_id:any){
    // HOTEL ASKED PRODUCT
    hotelVendorProduct = hotelVendorProduct.map((element: any) => ({
      ...element,
      product_id: element.vendor_products_id
    }));

    let allProduct:any = []
    const arrProduct = allProduct.concat(hotelVendorProduct,brandProduct,temporary_products)
    console.log(hotelVendorProduct)
    console.log(brandProduct)
    console.log(arrProduct)
    const findProduct = arrProduct.find((prod:any) => prod.product_id == product_id)
    console.log(findProduct)
    return findProduct ? findProduct : {}
  }

  // VENDOR PRODUCTS FILTER
  vendorPrducts(vendorProductId: any) {
    console.log(vendorProductId)
    if(vendorProductId){
      console.log(this.vendorAllProductsArr)
      const vendProduct = this.vendorAllProductsArr.find((find: any) => {
        return find.vendor_products_id == vendorProductId;
    });

    return vendProduct
    }else{
    return '0'
    }
   }

  vendor_product(product_id:any,all_ven_product:any){
    const pro = all_ven_product.find((p:any)=> p.Product_id == product_id)
    return pro != undefined ? pro : 0
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  vendorCloseButton(){
    this.vendortable=false
  }

  // historyAnd_MoreRfqHeading(req:any,data:any){
  //   if(req == "history"){
  //     this.vendortable=!this.vendortable
  //   }
    
  //   if(req == "moreHeading"){
  //     this.vendortable=!this.vendortable
  //     this.vendortableHeading = this.rfqMoreDEtailsHeading
  //   }

  //   // for other process tracking ..............................
  //   if(this.navBarSelected != 'RFQ Received'){
  //     this.qtyCount.shippingCost =  data.vendor_shipping_cost
  //     this.qtyCount.shipping = data.vendor_gst
  
  //     this.qtyCount.gst = ((data.vendor_quantity * data.vendor_coating_price) * 18) / 100
  //     this.qtyCount.totalAmount = this.qtyCount.shippingCost + this.qtyCount.totalCost
  //   }
  //   // for other process tracking ..............................

    
  //   this.qtyCount.totalCost = this.qtyCount.total + this.qtyCount.gst
  // }

  vendorQuoted(id:any ,Hotel_Name_id:any,userId:any,rfq_id:any,product_id:any,approximate_price:any,approximate_shipping_cost:any,product_count_mv:any,userRequiredDate:any,allReq:any){
    this.vendorQuotedObj.mpr = '1'
    // this.vendorQuotedObj.rfq_id = rfq_id
    // this.vendorQuotedObj.product_id = product_id

    this.vendorQuotedObj.vendor_gst = userRequiredDate
    this.vendorQuotedObj.before_required_date = '2-7-2023'
    this.vendorQuotedObj.user = userId
    this.vendorQuotedObj.total_req_qty = product_count_mv
    // this.qtyCount.vendorShippingDate =this.send_date
    // vendor details added
    const rfqQuoted = {
      Hotel_Name_id : Hotel_Name_id,
      rfq_id : rfq_id,
      product_id : product_id,
      vendor_product_id: allReq.vendor_product_id ? allReq.vendor_product_id : '0',
      vendor_coating_price : allReq.numInput_price,
      vendor_shipping_date : allReq.vendorShippingDate_2 ? allReq.vendorShippingDate_2 :this.send_date,
      vendor_shipping_cost : allReq.shippingCost_2,
      vendor_quantity : allReq.numInput_vendotQty ,
      vendor_gst : allReq.sales_tax_Percentage_2,
      user : 'None',
      vp : allReq.vp,
      before_required_date : allReq.requested_on,
      total_req_qty : allReq.required_quantity,
      vendor_sku:  allReq.vendor_sku_no ? allReq.vendor_sku_no : '0000',
      total_shipping_sales_tax_cost : allReq.shiping_sales_tax_2,
      vendor_reference_number : allReq.vendor_ref_num,
      Transit_Time_days : allReq.transit_days,
      ETA : allReq.vendor_ETA,
      total_cost : allReq.totalCost,
      Box_Quantity : allReq.vendor_Box_qty,
      shipping_percent: allReq.gstShipping,
      Total_sales_gst : allReq.Total_gst,
      product_total : allReq.totalPrice,
      Vendor_remarks: allReq.vendor_remarks,
      Shiping_sales_tax: allReq.shipping_sales_percentage ,
      payment_terms : allReq.payment_terms == null ? '-':allReq.payment_terms,
    }
    
    if(this.navBarSelected == 'RFQ Received'){
        this.HotelService.rfq_from_vendor(rfqQuoted).subscribe({
          next: (response) => {
            this.vendor_rfq()
            this.toast.success({detail:"Submitted",summary:'Success',duration:5000});
  
            this.deleteItem(rfq_id)
            this.AppserviceService.realoadVendorData('reload')
          },
          error: (error) => {
            // Error block
            this.toast.error({ detail: "Error", summary: 'Required all input feilds', duration: 3000 });
          },
        })
        
    }else{
      this.editPendingRequest.id = id
        this.editPendingRequest.vendor_shipping_date = allReq.vendor_shipping_date
        this.editPendingRequest.vendor_shipping_cost = allReq.vendor_shipping_cost
        this.editPendingRequest.vendor_quantity = allReq.vendor_quantity

        this.editPendingRequest.vendor_coating_price = this.vendorQuotedObj.vendor_coating_price == '' ? allReq.vendor_coating_price : this.vendorQuotedObj.vendor_coating_price
        this.editPendingRequest.id = id
        this.editPendingRequest.vendor_shipping_date = this.vendorQuotedObj.vendor_shipping_date == '' ? allReq.vendor_shipping_date : this.vendorQuotedObj.vendor_shipping_date
        this.editPendingRequest.vendor_shipping_cost = allReq.vendor_shipping_cost ? allReq.vendor_shipping_cost : this.vendorQuotedObj.vendor_shipping_date
        this.editPendingRequest.vendor_quantity = this.vendorQuotedObj.vendor_quantity == '' ? allReq.vendor_quantity : this.vendorQuotedObj.vendor_quantity

      this.HotelService.vendor_pending_order_edit(this.editPendingRequest).subscribe((d: any) => {
        window.location.reload();
        })
    }
  }

  PO_directOrderSubmit(type:any,id:any ,Hotel_Name_id:any,userId:any,rfq_id:any,Hotel_product_id:any,approximate_price:any,approximate_shipping_cost:any,product_count_mv:any,userRequiredDate:any,allReq:any){
    console.log(allReq)
    const doQuoted = {
      Hotel_Name_id : Hotel_Name_id,
      rfq_id : rfq_id,
      product_id : Hotel_product_id,
      vendor_product_id: allReq.vendor_product_id,
      vendor_coating_price : allReq.selected_vendor_productPrice == '' || allReq.selected_vendor_productPrice == undefined ? allReq.last_ordered_price : allReq.selected_vendor_productPrice,
      vendor_shipping_date : allReq.vendorShippingDate_2  ?  allReq.vendorShippingDate_2 :this.send_date ,
      vendor_quantity : allReq.hotel_required_qty ? allReq.hotel_required_qty : allReq.total_req_qty , // Negotiation
      user : 'vu', 
      before_required_date : allReq.required_date,
      total_req_qty : allReq.hotel_required_qty,
      vendor_sku: allReq.vendor_sku_no ? allReq.vendor_sku_no : '1000',
      vendor_reference_num : allReq.vendor_ref_num,
      Transit_Time_days : allReq.transit_days,
      ETA : allReq.vendor_ETA ?  allReq.vendor_ETA :this.send_date  ,
      // price_per_piece: 10,..
      Box_Quantity : allReq.vendor_box_qty,
      product_total : allReq.total_product_cost,
      vendor_gst : allReq.sales_tax_Percentage ? allReq.sales_tax_Percentage : '0', // product Tax / gst
      Total_sales_gst : allReq.Total_sales_gst ? allReq.Total_sales_gst : '0',
      shipping_percent: allReq.shipping_percent,
      vendor_shipping_cost : allReq.shippingCost,
      Shiping_sales_tax : allReq.shipping_sales_tax_percentage,
      total_shipping_sales_tax_cost: allReq.shipping_sales_tax_cost,
      payment_terms : allReq.Payment_terms,
      total_cost: allReq.gst_totalCost,
      Vendor_remarks: allReq.Vendor_remarks,
      // shipping_sales_percent:'17'
      vp : allReq.vp
    }

    if(this.navBarSelected == 'pur_Order' && type == 'submit'){
      // if(allReq.vp == '1'){
      //   this.HotelService.diractorder_from_vendor_product(doQuoted).subscribe({
      //     next: (response) => {
      //       // this.vendor_rfq()
      //       this.toast.success({detail:"Submitted",summary:'Success',duration:5000});
  
      //       this.delete_PO_Product(allReq.product_id)
      //       this.AppserviceService.realoadVendorData('reload')
      //       // this.PO_directOrder(this.selectedTable,this.directOrderArray)

      //     },
      //     error: (error) => {
      //       // Error block
      //       this.toast.error({ detail: "Error", summary: 'Required all input feilds', duration: 3000 });
      //     },
      //   })
      // }else{
        this.HotelService.diractorder_from_vendor(doQuoted).subscribe({
          next: (response) => {
            // this.vendor_rfq()
            this.toast.success({detail:"Submitted",summary:'Success',duration:5000});
  
            this.delete_PO_Product(allReq.product_id)
            this.AppserviceService.realoadVendorData('reload')
          },
          error: (error) => {
            // Error block
            this.toast.error({ detail: error.status, summary: error.error.message, duration: 3000 });
          },
        })
      // }   
    }

    if(this.navBarSelected == 'pur_Order' && type == 'negotiate'){

      doQuoted.payment_terms = allReq.Payment_terms
      doQuoted.vendor_quantity = allReq.vendor_quantity
      doQuoted.before_required_date = this.doNegotiate.required_date
      doQuoted.total_req_qty = this.doNegotiate.hotel_required_qty
      console.log(doQuoted)
      // doQuoted.product_total = this.dir_quantity_nego * allReq.selected_vendor_productPrice
      doQuoted.Total_sales_gst = (allReq.sales_tax_Percentage * allReq.total_product_cost)/100
      // // doQuoted.vendor_coating_price = this.directOrder_PO_VendorQuotedObj.product_Price == '' ? allReq.last_ordered_price : this.directOrder_PO_VendorQuotedObj.product_Price,
      doQuoted.vp = allReq.vp

      // doQuoted.vendor_shipping_cost = (allReq.shipping_percent * doQuoted.product_total)/100
      // doQuoted.total_shipping_sales_tax_cost = (allReq.shipping_sales_tax_percentage * doQuoted.vendor_shipping_cost)/100
      // doQuoted.total_cost = doQuoted.product_total + doQuoted.Total_sales_gst + doQuoted.vendor_shipping_cost + doQuoted.total_shipping_sales_tax_cost
        this.HotelService.diractorder_vendor_negotiation(doQuoted).subscribe({
          next: (response) => {
            // this.vendor_rfq()
            this.toast.success({detail:"Submitted",summary:'Success',duration:5000});
  
            this.delete_PO_Product(this.doNegotiate.product_id)
            this.AppserviceService.realoadVendorData('reload')
            this.negotiate = false
            // this.toggleNegotiate(this.toggleIndex)
            // this.PO_directOrder(this.selectedTable,this.directOrderArray)
  
          },
          error: (error) => {
            // Error block
            this.toast.error({ detail: "Error", summary: 'Required all input feilds', duration: 3000 });
          },
        })
    }
  }

  caculation_negotiation(all_req:any){

  }

  pendingReqEdit(id:any,vendorQty:string){
    this.pendingRqtId = id
  }

  purchaseIntelligence(){
    this.vendortable=!this.vendortable
  }

  purchaseTracking(){
    this.tracking = true
  }

  closeTracking(){
    this.tracking = false
  }
  close_negotiate(){
    this.move_negotiate = false
  }

  negotiationData :any = [
    {
      required_quantity :'',
      payment_terms :'',
      approximate_price:'',
      requested_on:'',
      required_date:'',
      vendor_coating_price : '' ,
      vp:'',
      // id : '',
      // Hotel_Name_id : '',
      // user_id : '',
      // mv_id : '',
      // product_id : '',
      // approximate_price : '',
      // approximate_shipping_cost : '',
      // product_count_mv : '',
      // requested_on : '',
      // vendor_quantity:'',
      // hotel_required_qty :'',
      // required_date:''
    }
  ]

  doNegotiate:any = []
  move_to_negotiate(event:any,userOrder :any,index:any){
    this.doNegotiate = userOrder
    // userOrder.isToggle = true
    console.log(event)
    // this.toggleIndex = index
    // this.move_negotiate = true required_date
    this.negotiate = true
    console.log(userOrder)
    // this.negotiateId = userOrder
    // this.negotiateId.type = 'vendor'

    this.negotiationData[0].payment_terms = userOrder.Payment_terms ? userOrder.Payment_terms : 'NET 0'
    this.negotiationData[0].total_req_qty = userOrder.hotel_required_qty
    this.negotiationData[0].vendor_quantity = userOrder.hotel_required_qty
    this.negotiationData[0].before_required_date = userOrder.required_date
    this.negotiationData[0].ETA = userOrder.etaDate ? userOrder.etaDate : userOrder.required_date
    
    // this.negotiationData[0].requested_on = userOrder.required_date
    // this.negotiationData[0].required_date = userOrder.required_date
    this.negotiationData[0].vendor_coating_price = userOrder.last_ordered_price == '0' || userOrder.last_ordered_price == null ? userOrder.price : userOrder.last_ordered_price
    this.negotiationData[0].vp = userOrder.vp
    this.negotiationData[0].last_ordered_price = userOrder.last_ordered_price ? userOrder.last_ordered_price : ''
    this.AppserviceService.ven_purchaseOrder_negotiate(this.negotiationData)

    console.log(this.negotiationData)
  }

  cancelNegotiate(event:any){
    this.negotiate = event
    // this.toggleNegotiate(this.toggleIndex)
  }

  selectedProductPush :any = []
  pushOrderColumn :any = ''
  revokeorderColumn:any =''

  isMoveColumnOrder:boolean = false
  // toggleIndex:any = 0
  toggleSwitchOrder(event:any,selectedProduct:any,index:any,push_type:any){
    this.isMoveColumnOrder = true
    selectedProduct.isToggle = true
    // this.toggleIndex = index
    this.disableoggle = selectedProduct.rfq_id
    this.selectedProductPush = selectedProduct
    this.RFD_product_id = []
    // this.toggleSpecificRow(selectedProduct)

    switch(this.navBarSelected) {
      case 'pur_Order' :
        this.pushOrderColumn = 'Sales Order'
      break
      case 'salesOrder' :
        this.pushOrderColumn = 'Pick & Pack'
      break
      case 'Pick&Pack' :
        this.pushOrderColumn = 'Ready for Dispatch'
      break
      case 'Ready_Dispatch' :
        this.pushOrderColumn = 'Dispatch'
        // selectedProduct.rfq_id = selectedProduct.product_id
        this.disableoggle = selectedProduct.product_id
        if(push_type == 'group_order'){
          this.requestedProduct.forEach((element:any)=>{ 
            // if(element.mv_id == selectedProduct.rfq_id){
              this.RFD_product_id.push(element.product_id)
            // }
          })
        }else{
          this.RFD_product_id.push(selectedProduct.product_id)
        }
        
      break
      case 'Dispatch' :
        this.pushOrderColumn = 'Discrepancy'
      break
      case 'confirm_payment':
        this.pushOrderColumn = 'Completed Orders'
      break  
      case 'Discrepancy' :
        this.pushOrderColumn = 'Order for Payment'
      break
    }
  }

  // TOGGLE 
  // toggleNegotiate(index: number) {
  //   if (index >= 0 && index < this.requestedProduct.length) {
  //     // const reverse = this.requestedProduct.reverse()
  //     this.requestedProduct[index].isToggle = !this.requestedProduct[index].isToggle;
  //   }
  // }

  // toggle_pick_pack(index: number) {
  //   if (index >= 0 && index < this.requestedProduct.length) {
  //     this.requestedProduct[index].isToggle = !this.requestedProduct[index].isToggle;
  //   }
  // }

  // Function to toggle the isActive state for a specific row (2nd index row in this case)
  // toggleSpecificRow(index: number) {
  //   if (index >= 0 && index < this.mergeRFQ_DO.length) {
  //     this.mergeRFQ_DO[index].isToggle = !this.mergeRFQ_DO[index].isToggle;
  //   }
  // }

  // Approved Order to loading screen
  RFD_product_id :any = []
  isLoading :boolean = false
  approvedOrderToLoading(event:any,userOrder :any){
    console.log(userOrder)
    this.orderTrackingLoading.product_id = userOrder.product_id
    this.orderTrackingLoading.mv_id = userOrder.rfq_id
    this.orderTrackingLoading.Hotel_Name_id = userOrder.Hotel_Name_id
    this.isLoading = true
    switch (this.navBarSelected) {

      case 'pur_Order':
        this.HotelService.connectAPI('POST','/sales_order',this.orderTrackingLoading).subscribe((d: any) => {
          this.deleteReload(userOrder.rfq_id)
          this.isMoveColumnOrder = false
          this.isLoading = false
        },err =>{
          this.isMoveColumnOrder = false
          this.isLoading = false

        });

        break;

      case 'salesOrder':
        this.HotelService.connectAPI('POST','/pick_pack',this.orderTrackingLoading).subscribe((d: any) => {
          this.deleteReload(userOrder.mv_id)
          this.isMoveColumnOrder = false
          this.isLoading = false
        },err =>{
          this.isMoveColumnOrder = false
          this.isLoading = false
        });
       
        break;
    
      case 'Pick&Pack':
        this.HotelService.connectAPI('POST','/ready_for_dispatch',this.orderTrackingLoading).subscribe((d: any) => {
          this.deleteReload(userOrder.mv_id)
          this.isMoveColumnOrder = false
          this.isLoading = false
        },err =>{
          this.isMoveColumnOrder = false
          this.isLoading = false
        });
        const obj={
          id:userOrder.id
        }
        this.HotelService.ViewPdf(obj).subscribe((res: any) => {
          this.isLoading = false
        })
        break;

      case 'Ready_Dispatch':
        // const productids:any = []
        //  this.requestedProduct.forEach((element:any)=>{ 
        //    if(element.mv_id == userOrder.rfq_id){
        //     productids.push(element.product_id)
        //    }
        //  })
          let form = new FormData();
          form.append('product_id[]',this.RFD_product_id);
          form.append('mv_id', this.orderTrackingLoading.mv_id);
          form.append('Hotel_Name_id', this.orderTrackingLoading.Hotel_Name_id);

          for (let i = 0; i < this.invoice.length; i++) {
            const file = this.invoice[i];
            form.append('invoice[]', file, file.name);
          }
          for (let i = 0; i < this.lorryRecipt.length; i++) {
            const file = this.lorryRecipt[i];
            form.append('lorry_receipt[]', file, file.name);
          }
          for (let i = 0; i < this.delivery.length; i++) {
            const file = this.delivery[i];
            form.append('delivery_challan[]', file, file.name);
          }
          for (let i = 0; i < this.warrenty.length; i++) {
            const file = this.warrenty[i];
            form.append('warranty_card[]', file, file.name);
          }

          this.HotelService.dispatch(form).subscribe((d: any) => {
            this.delete_PO_Product(userOrder.product_id)
            this.isMoveColumnOrder = false
            this.isLoading = false
          },
          (error) => {
            // Handle error here
            this.disableoggle = false;
            this.isMoveColumnOrder = false
            this.isLoading = false

            // this.toggleSpecificRow(this.toggleIndex)
            if(error.error.error == 'No order data found'){
              this.toast.error({ detail: "Error", summary: 'Expand Your Order and Submit', duration: 3000 });
            }else{
              this.toast.error({ detail: "Error", summary: error.error.message, duration: 3000 });
            }
          });
          break;

      case 'Dispatch':
        this.HotelService.connectAPI('POST','/order_for_payment',this.orderTrackingLoading).subscribe((d: any) => {
          this.isMoveColumnOrder = false
          this.isLoading = false
          this.delete_PO_Product(userOrder.product_id)
        });
        break;
        

      case 'Discrepancy':
        this.HotelService.connectAPI('POST','/order_for_payment',this.orderTrackingLoading).subscribe((d: any) => {
          this.isMoveColumnOrder = false
          this.isLoading = false
          this.deleteReload(userOrder.mv_id)
        },err =>{
          this.isMoveColumnOrder = false
          this.isLoading = false
        });
        break;
        
      case 'Payment':
        this.HotelService.connectAPI('POST','/completed_order',this.orderTrackingLoading).subscribe((d: any) => {
          this.isMoveColumnOrder = false
          this.isLoading = false
          this.deleteReload(userOrder.mv_id)
        },err =>{
          this.isMoveColumnOrder = false
          this.isLoading = false
        });
        break; 

        case 'Reconciled':
        this.HotelService.connectAPI('POST','/completed_order_approved_by_vendor',this.orderTrackingLoading).subscribe((d: any) => {
          this.isMoveColumnOrder = false
          this.isLoading = false
          this.deleteReload(userOrder.mv_id)
        },err =>{
          this.isMoveColumnOrder = false
          this.isLoading = false
        });
        break; 
        
      case 'Completed Orders':
        this.HotelService.connectAPI('POST','/cancelled_order',this.orderTrackingLoading).subscribe((d: any) => {
          this.isMoveColumnOrder = false
          this.isLoading = false
          this.deleteReload(userOrder.mv_id)
        },err =>{
          this.isMoveColumnOrder = false
          this.isLoading = false
        });
        break; 
     
      default:
        // Handle a default case if needed
        break;
    }

  }

  deleteReload(rfq_id:any){
    this.deleteItem(rfq_id)
    this.AppserviceService.realoadVendorData('reload')
  }


  deleteItem(id: any) {
    const index = this.requestedProduct.findIndex((item:any) => item.mv_id == id);
    if (index !== -1) {
      this.requestedProduct.splice(index, 1);
    }
  }

  delete_PO_Product(id: any) {
    const index = this.requestedProduct.findIndex((item:any) => item.product_id == id);
    if (index !== -1) {
      this.requestedProduct.splice(index, 1);
    }
    this.AppserviceService.realoadVendorData('reload')
  }

  // groupDispatch_remove(mv_id:any){
  //   const index = this.mergeRFQ_DO.findIndex((item:any) => item.mv_id == mv_id);
  //   if (index !== -1) {
  //     this.mergeRFQ_DO.splice(index, 1);
  //   }
  // }

  // totalQtyPrice(event:any){
  //   this.qtyCount.price_pc = event
  //   this.qtyCount.total = this.qtyCount.requestQty * this.qtyCount.price_pc
  //   this.qtyCount.gst = (this.qtyCount.total * 18) / 100
  //   // this.qtyCount.gst = gst / 100
  // }


  shippingPercentage(event:any){
    // this.qtyCount.shipping = event

    // this.qtyCount.shippingCost = (this.qtyCount.shipping / 100) * this.qtyCount.totalCost

    // this.qtyCount.totalAmount = this.qtyCount.shippingCost + this.qtyCount.totalCost
  }

  reuestedId_vendorImageId:any = ''
  isEta :boolean = false
  vendorProductSelect(image:any,vendorProductId:any,requestId:any,sku:any,hotelData:any,vendorProducts:any,type:any){
    this.vendorSelectedImage = image
    this.isEta = true
    this.qtyCount.vendor_product_id = vendorProductId
    this.reuestedId_vendorImageId = requestId
    this.emptyProductTaxes(hotelData)
    // MUTIBLE ORDER INPUT
    hotelData.vendor_product_id = vendorProductId
    hotelData.vendor_sku_no = vendorProducts.sku
    // MUTIBLE ORDER INPUT

    this.requestedProduct.forEach((element:any) => {
      if(element.id == requestId){
        element.vendorProductImage = image
        element.vendor_sku = sku
        element.vendor_products_id = vendorProductId
        this.vendorQuotedObj.vendor_sku_no = element.vendor_sku
      }

      return element
    });

    if(type == 'directOrder'){
      hotelData.price = vendorProducts.price
      const productTotal = hotelData.hotel_required_qty * parseFloat(vendorProducts.price)
      hotelData.total_product_cost = productTotal.toFixed(2)
      this.directOrder_PO_VendorQuotedObj.vendor_shipping_date = ''
      this.directOrder_PO_VendorQuotedObj.vendor_ETA = ''
      // Product Salse Tax
      hotelData.sales_tax_Percentage = vendorProducts.tax_percentage
      const Tax_product = (hotelData.total_product_cost * hotelData.sales_tax_Percentage) / 100
      hotelData.product_sales_tax_cost = Tax_product.toFixed(2)
      hotelData.shipping_sales_tax_percentage = vendorProducts.shipping_tax_percentage

      // this.directOrder_PO_VendorQuotedObj.product_Price = vendorProducts.price
      hotelData.selected_vendor_productPrice = vendorProducts.price
      // this.directOrder_PO_VendorQuotedObj.product_total = hotelData.total_product_cost
      // this.directOrder_PO_VendorQuotedObj.Total_sales_gst = (hotelData.total_product_cost * hotelData.sales_tax_Percentage) / 100
      hotelData.Total_sales_gst = (hotelData.total_product_cost * hotelData.sales_tax_Percentage) / 100
      // this.directOrder_PO_VendorQuotedObj.product_Tax = hotelData.sales_tax_Percentage
      // Shipping Sales Percentage
    }
    if(type == 'RFQ'){
     

      // Product Salse Tax
      hotelData.sales_tax_Percentage = vendorProducts.tax_percentage
      hotelData.shipping_sales_percentage = vendorProducts.shipping_tax_percentage

      if(hotelData.numInput_price.length > 0){
        this.numberInputFeilds(hotelData.numInput_price,hotelData,'numInput_price','mv_id')
      }

    }
  }

  //Date Formet
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

  rejectedProducts :any = []
  trackingPopup(type:any,screen='Vendor-page'){
    // this.pichartpopUp=true
    this.isTraking = true
    
    this.trackingType.type = type
    this.trackingType.order = 'Purchase Order Number:'
    this.trackingType.screen = screen

    this.rejectedProducts =  this.requestedProduct
  }

  negotiateArr:any = []
  negotiae_id:any = ''
  Renegotiate(id:any){
    this.negotiae_id = id.id
  }

  negotiateLoaderMethod(e:any){
    let order = this.requestedProduct.find((u:any) => u.id == this.negotiateId.id);
    if (order) {
      order.loading = false
    }
  }
  
  negotiateId :any = ''
  user_Renegotiate(id:any){
    // this.isNegotiate = true
    this.negotiate=true
    // PO COLUMN ONLY USE THIS ARRAY VALUE FOR NEGOTIATE
    // this.negotiationData = []
    this.negotiateId = id.id

    // LOADER TRUE
    const order = this.requestedProduct.find((u:any) => u.id == id.id); 
    if (order) {
      order.loading = true
    }
    // LOADER TRUE

    this.mvId = {
      rfq_form_id : id
    }
    
    this.negotiateId = {
      id : id,
      type : 'vendor'
    }
    // this.HotelService.vendor_to_user_negotiation_view(this.mvId).subscribe(res =>{
    //   this.negotiateArr = res.negotiation
    // })
  }
  calculateEndDate() {
    if (this.startDate && this.numberOfDays) {
      const startDateObj = new Date(this.startDate); // Convert start date string to Date object
      const numberOfDaysToAdd = this.numberOfDays + 1; // Subtract 1 as the start date counts as one day

      startDateObj.setDate(startDateObj.getDate() + numberOfDaysToAdd); // Calculate the end date

      const day = startDateObj.getDate().toString().padStart(2, '0'); // Get day (with leading zero if necessary)
      const month = (startDateObj.getMonth() + 1).toString().padStart(2, '0'); // Get month (with leading zero if necessary)
      const year = startDateObj.getFullYear().toString(); // Get year

      this.endDate = `${day}-${month}-${year}`; // Format end date to dd-mm-yyyy
    } else {
      this.endDate = ''; // If any input is missing, reset the end date
    }
  }

  performMultiplication() {
    this.result = this.firstValue * (this.secondValue / 100); // Calculate the result
  }

  //RFQ dynamic table
  numberInputFeilds(event:any,updateValue:any,field_type:any,mv_id:any){
    switch (field_type) {
      case 'date' : 
        updateValue.vendorShippingDate_2 = event
        this.vendorQuotedObj.vendor_ETA = this.calculateArrivalDate_ETA( updateValue.transit_days,updateValue);
        updateValue.vendor_ETA = this.calculateArrivalDate_ETA( updateValue.transit_days,updateValue);
        updateValue.eta_red = this.eta_greater(updateValue.mv_id,updateValue.etaDate,updateValue.requested_on)

        break
      case 'numInput_transit':
        updateValue.transit_days = event
        this.vendorQuotedObj.vendor_ETA = this.calculateArrivalDate_ETA(event,updateValue);
        updateValue.vendor_ETA = this.calculateArrivalDate_ETA(event,updateValue);
        // updateValue.ETA = this.calculateArrivalDate_ETA(event,updateValue);
        // this.vendorQuotedObj.transit_days = event;
        updateValue.eta_red = this.eta_greater(updateValue.mv_id,updateValue.etaDate,updateValue.requested_on)
        break;
        
      case 'numInput_price':
        // this.qtyCount.ven_gst = updateValue.sales_tax_Percentage  ####
        updateValue.sales_tax_Percentage_2 = updateValue.sales_tax_Percentage
        this.qtyCount.price_pc = event
        updateValue.numInput_price = event

        updateValue.totalPrice = event * updateValue.numInput_vendotQty
        // this.qtyCount.product_total = updateValue.totalPrice

        updateValue.gstAount = (updateValue.totalPrice * updateValue.sales_tax_Percentage)  / 100
        // this.qtyCount.Total_gst = updateValue.gstAount.toFixed(2)
        updateValue.Total_gst = updateValue.gstAount.toFixed(2)
        this.numberInputFeilds(updateValue.numInput_shippingCost,updateValue,'numInput_shippingCost',mv_id)
        break;
      case 'numInput_vendotQty':
        updateValue.numInput_vendotQty = event
        this.items_box_rfq2 = this.calculateTotalBoxesQuantity(event,updateValue.vendor_Box_qty);
        this.requestedProduct.forEach((element:any) => {
          if(element.id == updateValue.id){
            element.box_items1 = (this.items_box_rfq2.wholeNumber > 1 ? this.items_box_rfq2.wholeNumber + ' Boxes' : this.items_box_rfq2.wholeNumber + ' Box') +" "+ (updateValue.vendor_Box_qty >1 ? updateValue.vendor_Box_qty +' Items' :updateValue.vendor_Box_qty +' Item') 
            element.box_items2 = '+1 Box ' + this.items_box_rfq2.decimalPart+' Items'
          }
    
          return element
        });
        // updateValue.numInput_vendotQty = event
        updateValue.totalPrice = event * this.qtyCount.price_pc
        updateValue.gstAount  = (event * this.qtyCount.price_pc) / updateValue.sales_tax_Percentage
        updateValue.shippingAmount = (event * this.qtyCount.price_pc) / updateValue.gstShipping
        updateValue.ShippingGstAmt = (updateValue.shipping_sales_percentage * updateValue.shippingAmount) / 100
        updateValue.totalCost = updateValue.ShippingGstAmt + updateValue.totalPrice + updateValue.gstAount + updateValue.shippingAmount

        // this.qtyCount.requestQty = updateValue.numInput_vendotQty 
        // requestQty
        this.numberInputFeilds(updateValue.numInput_price,updateValue,'numInput_price',mv_id)
        break;
      // case 'sales_tax_Percentage':
      //   this.qtyCount.ven_gst = event
      //   updateValue.sales_tax_Percentage = event
      //   updateValue.gstAount = (event * updateValue.totalPrice) / 100
      //   this.qtyCount.Total_gst = updateValue.gstAount.toFixed(2)
      //   break; 
      // case 'shipping_sales_percentage':
      //     this.qtyCount.ven_shiping_per = event
      //     updateValue.ShippingGstAmt = (updateValue.shippingAmount * event) / 100
      //     this.qtyCount.shiping_sales_tax = updateValue.ShippingGstAmt.toFixed(2)
      //     // Total cost include gst 
      //     updateValue.total = updateValue.ShippingGstAmt + updateValue.totalPrice + updateValue.gstAount + updateValue.shippingAmount
      //     this.qtyCount.totalCost = updateValue.total.toFixed(2)
      //     updateValue.totalCost = this.qtyCount.totalCost

      //     break;
        case 'numInput_shippingCost':
          updateValue.numInput_shippingCost = event
          updateValue.shippingAmount = (event * updateValue.totalPrice) / 100
          // this.qtyCount.shippingCost = updateValue.shippingAmount;
          updateValue.shippingCost_2 = updateValue.shippingAmount;
          // this.qtyCount.gstShipping = event;
          updateValue.gstShipping = event
          // this.qtyCount.ven_shiping_per = updateValue.shipping_sales_percentage ####
          // updateValue.ShippingGstAmt = (updateValue.shippingAmount * updateValue.shipping_sales_percentage) / 100
          // Total cost include gst 
          updateValue.ShippingGstAmt = parseFloat(((updateValue.shippingAmount * updateValue.shipping_sales_percentage) / 100).toFixed(2));

          console.log( updateValue.ShippingGstAmt )
          // this.qtyCount.shiping_sales_tax = updateValue.ShippingGstAmt.toFixed(2)
          updateValue.shiping_sales_tax_2 = updateValue.ShippingGstAmt
          updateValue.total = updateValue.ShippingGstAmt + updateValue.totalPrice + updateValue.gstAount + updateValue.shippingAmount
          // this.qtyCount.totalCost = updateValue.total.toFixed(2)
          const totalCost = updateValue.total.toFixed(2)
          console.log( totalCost )

          updateValue.totalCost = totalCost

          break;  
        case 'textInput_vendRefNum' :
        //  = event
        // this.vendorQuotedObj.vendor_ref_num = event
        updateValue.vendor_ref_num = event
          break;
        case 'numInput_vendSQUNum':
          this.directOrder_PO_VendorQuotedObj.vendor_sku_no = event
          break;
        case 'numInput_BoxQty':
          this.items_box_rfq = this.calculateTotalBoxesQuantity(updateValue.numInput_vendotQty,event);
          // this.qtyCount.Box_qty = event 
          updateValue.vendor_Box_qty = event
          this.requestedProduct.forEach((element:any) => {
            if(element.id == updateValue.id){
              element.box_items1 = (this.items_box_rfq.wholeNumber > 1 ? this.items_box_rfq.wholeNumber + ' Boxes' : this.items_box_rfq.wholeNumber + ' Box') +" "+ (updateValue.vendor_Box_qty >1 ? updateValue.vendor_Box_qty +' Items' :updateValue.vendor_Box_qty +' Item') 
              element.box_items2 = '+1 Box ' + this.items_box_rfq.decimalPart + ' Items'
            }
            return element
          });

          break;
        case 'textInput_vendorRemarks':
          updateValue.vendor_remarks = event
          // this.qtyCount.vendor_remarks = event
          break;
      // Add more cases as needed
      default:
        // Handle the default case or do nothing
        break;
    }

    if( this.vendorQuotedObj.vendor_ref_num.length >0 && this.qtyCount.requestQty.length >0 && updateValue.vendor_Box_qty.length >0 && this.vendorQuotedObj.vendor_ETA.length >0 && this.vendorQuotedObj.transit_days.length >0 && this.qtyCount.price_pc.length >0   && updateValue.gstShipping.length >0 && updateValue.vendor_remarks.length >0){
      this.inuptValidation = true
    }else{
      this.inuptValidation = false
    }
  }
  
   calculateTotalBoxesQuantity(total_qty: number, perBoxQty: number) {
    
    const totalBoxes = total_qty / perBoxQty;
    const wholeNumber = Math.floor(totalBoxes);
    const decimalPart = Math.round((totalBoxes - wholeNumber) * perBoxQty);
    
    return { wholeNumber, decimalPart };
    

  }
  
  eta_greater(mv_id:any,selectedDate1:any,mainDate1:any){
    const mainDate: Date = new Date(mainDate1);
    const selectedDate: Date = new Date(selectedDate1);
    this.requestedProduct.forEach((element:any) => {
      if(element.mv_id == mv_id){
        // element.eta_red = selectedDate > mainDate ? '--color-redd' : '--color-black'
      }
      console.log('1')
      return element
    });
    console.log('2')

    return selectedDate > mainDate;

  }

  boxQuantity:any = ''
  directOrderInput(event:any,updateValue:any,field_type:any,mv_id:any){
    switch (field_type) {
      case 'date':
        updateValue.vendorShippingDate_2 = event
        // this.qtyCount.vendorShippingDate = event
        updateValue.eta_red = this.eta_greater(updateValue.mv_id,event,updateValue.required_date) 
        // this.directOrder_PO_VendorQuotedObj.vendor_ETA = this.calculateArrivalDate_ETA(updateValue.transit_days,updateValue);
        updateValue.vendor_ETA = this.calculateArrivalDate_ETA(updateValue.transit_days,updateValue);
        break;

      case 'numInput_transit':
        updateValue.vendor_ETA = this.calculateArrivalDate_ETA(event,updateValue);
        // this.directOrder_PO_VendorQuotedObj.transit_days = event;
        updateValue.transit_days = event
        updateValue.eta_red = this.eta_greater(updateValue.mv_id,updateValue.vendor_ETA,updateValue.required_date)
      
        updateValue.numInput_transit = event
        break;

      case 'textInput_vendRefNum' :
        //  = event
        updateValue.vendor_ref_num = event
        // this.vendorQuotedObj.vendor_ref_num = event
        break;

      case 'numInput_BoxQty':
        this.items_box = this.calculateTotalBoxesQuantity(updateValue.hotel_required_qty,event);
        // this.directOrder_PO_VendorQuotedObj.box_qty = event
        updateValue.vendor_box_qty = event
        // this.boxQuantity = this.calculateTotalBoxesQuntity(updateValue.hotel_required_qty,event)
       
        this.requestedProduct.forEach((element:any) => {
          if(element.id == updateValue.id){
            element.box_items1 = (this.items_box.wholeNumber > 1 ? this.items_box.wholeNumber + ' Boxes' : this.items_box.wholeNumber + ' Box') +" "+ (updateValue.vendor_box_qty >1 ? updateValue.vendor_box_qty +' Items' : updateValue.vendor_box_qty +' Item') 
            element.box_items2 = '+1 Box ' + this.items_box.decimalPart+' Items'
          }
    
          return element
        });

        break;

      case 'numInput_shipping_percentage':
        // Shipping Cst
        const shipping = (updateValue.total_product_cost * event ) / 100
        updateValue.shippingCost = shipping.toFixed(2)
        // ShippingTax 
        const ShippingTax = (updateValue.shippingCost * updateValue.shipping_sales_tax_percentage) / 100 
        updateValue.shipping_sales_tax_cost = ShippingTax.toFixed(2)
        // Total 
        const total = parseFloat(updateValue.total_product_cost)+ parseFloat(updateValue.product_sales_tax_cost) + parseFloat(updateValue.shippingCost) + parseFloat(updateValue.shipping_sales_tax_cost)
        updateValue.totalCost = total.toFixed(2)

        // this.directOrder_PO_VendorQuotedObj.shipping_percent = event;
        updateValue.shipping_percent = event
        // this.directOrder_PO_VendorQuotedObj.vendor_shipping_cost = updateValue.shippingCost
        // this.directOrder_PO_VendorQuotedObj.Shiping_sales_tax = updateValue.shipping_sales_tax_percentage
        // this.directOrder_PO_VendorQuotedObj.total_shipping_sales_tax_cost = updateValue.shipping_sales_tax_cost
        // this.directOrder_PO_VendorQuotedObj.total_cost = updateValue.totalCost
        updateValue.gst_totalCost = updateValue.totalCost
        break;

      case 'numInput_shipping_sales_tax_percentage':
        // updateValue.shipping_sales_tax_cost = (updateValue.shippingCost * event) / 100 
        // updateValue.totalCost = updateValue.total_product_cost + updateValue.shippingCost + updateValue.shipping_sales_tax_cost
        
        // this.directOrder_PO_VendorQuotedObj.Shiping_sales_tax = event
        // this.directOrder_PO_VendorQuotedObj.total_shipping_sales_tax_cost = updateValue.shipping_sales_tax_cost
        // this.directOrder_PO_VendorQuotedObj.total_cost = updateValue.totalCost

        break;
        case 'textInput_vendorRemarks':
          updateValue.Vendor_remarks = event
          // this.directOrder_PO_VendorQuotedObj.Vendor_remarks = event
        break;
        
    }
  }

  emptyProductTaxes(data:any){
    this.directOrderInput(0,data,'numInput_transit',data.mv_id)
    this.directOrderInput(0,data,'textInput_vendRefNum',data.mv_id)
    this.directOrderInput(0,data,'numInput_BoxQty',data.mv_id)
  }

  calculateArrivalDate_ETA(eta = '0',data:any) {
    const etas = parseInt(eta, 10); // Parse the input value as an integer
    // this.directOrder_PO_VendorQuotedObj.vendor_shipping_date = this.qtyCount.vendorShippingDate
    console.log(data)
    console.log(this.send_date)
    const originalDate = new Date(data.vendorShippingDate_2 ? data.vendorShippingDate_2 : this.send_date );
    console.log(originalDate)
    const newDate = new Date(data.vendorShippingDate_2 ? data.vendorShippingDate_2 : this.send_date);
    console.log(newDate)

    newDate.setDate(originalDate.getDate() + etas);

    // Explicitly specify the type for options
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = newDate.toLocaleString('default', { month: 'short' });
    const year = newDate.getFullYear();

    const arrivalDate = `${day}-${month}-${year}`;
    if(data && arrivalDate == 'NaN-Invalid Date-NaN'){
      // data.etaDate = this.qtyCount.vendorShippingDate
      data.etaDate = ''
    }else{
      data.etaDate = arrivalDate 
      data.eta_red = this.eta_greater(data.mv_id,arrivalDate,data.required_date)
    }
    return arrivalDate;
  }

  openLink(vendor_product_id:any) {
    console.log(this.HotelService.projecturl())

    if(this.navBarSelected == 'RFQ Received'){
      const link = this.HotelService.projecturl()+'/vendor_view_products/' + this.qtyCount.vendor_product_id; // Adjust the URL structure
      window.open(link)
    }else{
      const link = this.HotelService.projecturl()+'/vendor_view_products/' + vendor_product_id; // Adjust the URL structure
      window.open(link)
    } 
  }

  openLink_brand(product_id:any){
    console.log(this.HotelService.projecturl())
     const product = this.logMessage(product_id)
     if(product == 'Brand'){
      const link =   this.HotelService.projecturl() +'/brand_view_products/' + product_id; // Adjust the URL structure
      window.open(link)
     }else{
      const link = this.HotelService.projecturl()+'/vendor_view_products/' + product_id; // Adjust the URL structure
      window.open(link)
     }
  }
  errormsg(){
    this.isMoveColumnOrder = true
  }

  error_notmsg(){
    this.isMoveColumnOrder = false
    this.AppserviceService.error_Toggle(false);
    if(this.navBarSelected == 'pur_Order' || this.navBarSelected == 'Ready_Dispatch'){
      // this.toggleSpecificRow(this.toggleIndex)
    }else{
      // this.toggle_pick_pack(this.toggleIndex)
    }

    if(this.isMoveColumnOrder == false){
      this.disableoggle = false
    }
  }

  calculateTotalBoxesQuntity(total_qty:any,perBoxQty:any): number {
    return Math.ceil(total_qty / perBoxQty);
  }

  // LONGER TEXT 
  transformPlacementData(brandProductsName: string): string {
    if (brandProductsName) {
      const words = brandProductsName.split(' ');
      if (words.length > 1) {
        return words.slice(0, 2).join(' ') + '...';
      } else {
        return brandProductsName;
      }
    }
    return ' ';
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

  add_product(type:any){
    
    this.add_vendor_product= true
    this.add_po_type = type
  }
  po_id:any=''
  documentsarray:any={}
  uploadDocument(type:any,id:any,order:any){
    console.log(id)
    this.po_id = id
    this.uploaddocument_type = type
    this.isUploadDocument =!this.isUploadDocument
    this.documentsarray = order
  }

  invoice :any = []
  lorryRecipt :any = []
  delivery :any = []
  warrenty :any = []
  vendordoc:any =[]

  invoiceDocument(event:any){
    if(event.type == 'invoice'){
      this.invoice = event.file
    }

    if(event.type == 'lorry'){
      this.lorryRecipt = event.file
    }

    if(event.type == 'delivery'){
      this.delivery = event.file
    }

    if(event.type == 'warrenty'){
      this.warrenty = event.file
    }
    if(event.type == 'vendor_doc'){
      this.vendordoc = event.file
    }
  }

  dateTime() {
    // Get current date and time using Luxon
    const currentDate = DateTime.local();
    // Get the month abbreviation
    const monthAbbreviation = currentDate.toFormat('LLL'); // 'LLL' gives the abbreviated month name
    // Format date in 'dd-MMM-yyyy' format
   const sendtodaydate =currentDate.toFormat('dd') + '-' + monthAbbreviation + '-' + currentDate.toFormat('yyyy');
    // Assign the formatted date to dateString
    this.send_date = sendtodaydate;
  }

  submitFirstNegotiate(event:any){
    // event.hotel_required_qty = event.vendor_quantity
    console.log(event)
    
    this.doNegotiate.vendor_ETA = event.ETA
    // this.doNegotiate.vendor_coating_price = event.vendor_coating_price
    // this.doNegotiate.vendor_coating_price = event.vendor_coating_price
    this.doNegotiate.vendor_quantity = event.vendor_quantity
    this.doNegotiate.Vendor_remarks = event.reason
    this.doNegotiate.Payment_terms = event.payment_Terms
    this.doNegotiate.vp = event.vp
    this.doNegotiate.selected_vendor_productPrice = event.vendor_coating_price
    this.doNegotiate.last_ordered_price   = event.vendor_coating_price

    this.PO_directOrderSubmit('negotiate',this.doNegotiate['id'],this.doNegotiate['Hotel_Name_id'],this.doNegotiate['user_id'],this.doNegotiate['mv_id'],this.doNegotiate['product_id'],this.doNegotiate['approximate_price'],this.doNegotiate['approximate_shipping_cost'],this.doNegotiate['product_count_mv'],this.doNegotiate['requested_on'],this.doNegotiate)
  }

  RevokePO(data:any){
    this.revoke_orders =data
    this.revokereason =''
    this.revokepopup = true
    switch(this.navBarSelected){
      case 'Pick&Pack' :
        this.revokeorderColumn = 'Sales Order'
      break
      case 'Ready_Dispatch' :
        this.revokeorderColumn = 'Pick & Pack'
      break
      case 'Dispatch' :
        this.revokeorderColumn = 'Ready for Dispatch'
      break
    }
  }

  revokeclose(){
    this.revokepopup = false
  }

  Revokeorder(data:any){  
    const order={
      id : data.id,
      reason :this.revokereason

    }
    this.HotelService.vendor_rework(order).subscribe({
      next: (response) => {
        this.revokepopup = false
        this.toast.success({detail:"Submitted",summary:'Success',duration:5000});
        this.AppserviceService.realoadVendorData('reload')
      },
      error(err) {}
      })
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
isImage(url: string): boolean {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

isVideo(url: string): boolean {
  return url.match(/\.(mp4|webm|ogg)$/) != null;
}
service_submit(productID:any,vendorID:any,SRR:any,value:any,servicecost:any){
 
  const form = new FormData();
  form.append('vender_id', vendorID);
  form.append('product_id', productID);
  form.append('service_request_random', SRR);
  form.append('total_cost', servicecost);

  form.append('work_status', value);
  for (let i = 0; i < this.vendordoc.length; i++) {
    const file = this.vendordoc[i];
    form.append('vender_document[]', file, file.name);
  }
  this.HotelService.service_underprocess(form).subscribe({
    next: (response) => {
      this.toast.success({detail:"Submitted",summary:'Success',duration:5000});

    },
    error:(error)=>{
      console.log(error)
      this.toast.error({detail:"Error",summary:error.error.message,duration:5000});

    }

  })

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
DropDown(value:any,allDetails:any){

  // this.work_status_value = value
  allDetails.work_status = value
    switch(value){
    
      case '0':
        allDetails.working_status = 'Not Started'
      break;
      case '1':
        allDetails.working_status = 'Under Process'
      break;
      case '2':
        allDetails.working_status = 'Completed'
      break;
      case '3':
        allDetails.working_status = 'Cancelled'
      break;
  
  
    }
  
 
  // const order ={
  //   vender_id:vendorID,
  //   product_id: productID,
  //   service_request_random:SRR,
  //   work_status: value
  // }
  // this.HotelService.service_underprocess(order).subscribe({
  //   next: (response) => {
  //     console.log('sucess')
  //   }
  // })

}
convertDate(dateString: string): string {
  // Parse the input date string
  const [datePart, timePart] = dateString.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);

  // Define an array with month names
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Convert month number to month name
  const monthName = monthNames[month - 1];

  // Format the date as DD-MMM-YYYY
  const formattedDate = `${this.padZero(day)}-${monthName}-${year}`;

  return formattedDate;
}

// Helper function to pad single digit day with leading zero
private padZero(number: number): string {
  return number < 10 ? '0' + number : number.toString();
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
Viewalldocuments(){
  this.router.navigate([{ expanded:'',process: 'pur_Order',nav:'All Documents'}], { relativeTo: this.route });

}
showhotel_name:any=''
showhotel_id:any =''
showhotel_address:any=''
showhotel_manager_name:any=''
showhotel_manager_email:any=''
ShowHotelDetails(data:any){
  console.log(data)
  this.Hoteldetails = true
  if(data.manager !=undefined){
    data.manager.forEach((org:any)=>{
      this.showhotel_manager_name = org.name
      this.showhotel_manager_email = org.email
  
    })
  }else{
    this.showhotel_manager_name = '-'
      this.showhotel_manager_email = '-'
  }
 
  this.showhotel_name = data.Hotel_Name
  this.showhotel_id = data.Hotel_Name_id
  this.showhotel_address = data.location 
}

loopprice:any=[]
descrepencdetails(orders:any){
  this.details = true
   console.log(orders)
let rec_quantity:any =''
let rec_data:any =''
let rec_quality:any =''
let rec_price:any =''
orders.order_completes.forEach((org:any)=>{
  rec_quantity = org.qty_received
  rec_data = org.date_received
  rec_quality = org.quality
  rec_price = org.price_received
})
  this.loopprice = [
    {'key':'Purchase order number','value1': orders.mv_id|| orders.rfq_id,'value2': orders.mv_id|| orders.rfq_id, isHighlighted: false},
    {'key':'Price Per Pic','value1':  orders.vendor_coating_price,'value2':orders.currency_symbol + rec_price,isHighlighted:this.convertToNumber(orders.vendor_coating_price) != rec_price?true: false},
    {'key':'Quantity','value1':orders.vendor_quantity,'value2':rec_quantity,isHighlighted:orders.vendor_quantity != rec_quantity ? true:false },
    {'key':'ETA','value1':orders.ETA ,'value2': rec_data ,isHighlighted: false},
    {'key':'Quality','value1':'-', 'value2': rec_quality,isHighlighted: false},
    
   

  ]

}
convertToNumber(value: string): number {
  const numericValue = value.replace(/[^\d.-]/g, '');
  return parseFloat(numericValue);
}
orders:any={}
openchat:boolean = false
Chat(data:any){
  this.orders = data
  this.openchat = true
}
}
