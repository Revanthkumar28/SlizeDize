import { Component, OnInit, Output ,Input,EventEmitter} from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';


@Component({
  selector: 'b2b-group-by',
  templateUrl: './group-by.component.html',
  styleUrls: ['./group-by.component.css']
})
export class GroupByComponent implements OnInit {
  grouping:boolean = false
  Hotel_Name_id :any = ''
  isNewProduct :any = []
    group_order:any={}
  underprocess_name:any=''
  orderstatus:any=''
  UnderProcess:boolean=false
  scheduleOrder :any = []
  tableColumnSpacing = "0.6fr 15*1fr"
  multipleDirectorder:any=[]
  directOrderValues:any = []
  selectedTime :any = ''
  scheduletime:boolean = false
  direct_order_data:any =[]
  Rfq_order_data:any =[]
  Rfq_compare_date:any = []
  Rfq_received_data:any=[]
  Rfq_submitted_data:any =[]
  Rfq_negotiate_data:any =[]
  Schedule_order_data:any=[]
  Schedule_rfq_data:any=[]
  Schedule_do_data:any=[]
  Under_Process_data:any=[]
  sales_order_data:any=[]
  pick_and_pack_data:any=[]
  dispatched_data:any=[]
  underprocess_order_data:any=[]
  renegotiation_data:any=[]
  reject_data:any=[]
  renego_reject_data:any=[]
  descrepancy_data:any=[]
  items:boolean = false
  selectedButton:any='Items'
  button_name: Record<string, string>[] = [
    {"name": "Items"},
    {"name": "Purchase Order"}
  ];

  under_process_heading: any[] = [
   
    {
      sort : "PR NO",
      full : "Purchase Request Number",
      one:'Purchase Request',
      two:'Number'
    },
    {
      sort : "Req Person & Dep",
      full : "Requested Person & Department",
      one:'Requested Person',
      two:'& Department'
    },
    {
      sort : "Vendor SKU Number",
      full : "Vendor SKU Number",
      one:'Vendor SKU',
      two:'Number'
    },
    {
      sort : "P.O. Number",
      full : "Purchase Order Number",
      one:'Purchase Order',
      two:'Number'
    },
    {
      sort : "Req Qty",
      full : "Required Quantity",
      one:'Required',
      two:'Quantity'
    },
    {
      sort : "P. Pcs/Box",
      full : "Vendor - Price per Pcs / Box(case) / Dozen",
      one:'Vendor - Price per Pcs /',
      two:'Box(case) / Dozen'
    },
    {
      full :"Total Cost",
      one :'Total',
      two :'Cost'
    },
    {
      sort : "Req. Date",
      full : "Required Date",
      one:'Required',
      two:'Date'
    },
    {
      sort : "Spec. Vendor",
      full : "Specified Vendor",
      one:'Specified',
      two:'Vendor'
    },
    {
      sort : "Hotel Remarks",
      full : "Hotel Remarks",
      one:'Hotel',
      two:'Remarks'
    },
    {
      sort : "Payment Terms",
      full : "Payment Terms",
      one:'Payment',
      two:'Terms'
    },
    {
      sort : "V. Apprvl",
      full : "Vendor Approval",
      one:'Vendor',
      two:'Approval'
    },
    {
      sort : "ETA",
      full : "Estimated Time of Arrival",
      one:'Estimated Time',
      two:'of Arrival'
    },
    {
      sort : "VDS",
      full : "Vendor Delivery Status",
      one:'Vendor Delivery',
      two:'Status'
    },
    
    {
      sort : "V. Remarks",
      full : "Vendor Remarks",
      one:'Vendor',
      two:'Remarks'
    },
   
  ];
  
  renegotiate_heading :any = [
   
    {
      full :"Purchase Request Number" ,
      one :'Purchase Request',
      two :'Number'
    },
    {
      full :"Requested Person & Department" ,
      one :'Requested Person',
      two :'& Department'
    },
    {
      full :"Vendor SKU Number" ,
      one :'Vendor SKU ',
      two :'Number'
    },
    {
      full :"Purchase Order Number",
      one :'Purchase Order',
      two :'Number'
    },
    {
      full :"Required Quantity",
      one :'Required',
      two :'Quantity'
    },
    {
      full :"Price-Pcs/Box",
      one :'Price',
      two :'Pcs/Box'
    },
    {
      full :"Payment Terms" ,
      one :'Payment',
      two :'Terms'
    },
    {
      full :"Required Date",
      one :'Required',
      two :'Date'
    },
    {
      full :"Specified Vendor",
      one :'Specified',
      two :'Vendor'
    },
   
    {
      full :"Hotel Remarks",
      one :'Hotel',
      two :'Remarks'
    },
    {
      full :"Estimated Time of Arrival",
      one :'Estimated Time',
      two :'of Arrival'
    },
    {
      full :"Vendor Delivery Satus",
      one :'Vendor',
      two :'Delivery Satus'
    },
  
    {
      full :"Vendor Remarks",
      one :'Vendor',
      two :'Remarks'
    },
   
   

    ]

  
  descerpancy_heading:any=[
   
    {
      full :"Purchase Request Number" ,
      one :'Purchase Request',
      two :'Number'
    },
    {
      full :"Requested Person & Department" ,
      one :'Requested Person',
      two :'& Department'
    },
    {
      full :"Purchase Order Number",
      one :'Purchase Order',
      two :'Number'
    },
    {
      full :"Required Quantity",
      one :'Required',
      two :'Quantity'
    },
    {
      
      full : "Vendor - Price per Pcs / Box(case) / Dozen",
      one:'Vendor - Price per Pcs /',
      two:'Box(case) / Dozen'
    },
    {
      full :"Required Date",
      one :'Required',
      two :'Date'
    },
    {
      full :"Specified Vendor",
      one :'Specified',
      two :'Vendor'
    },
   
    {
      full :"Hotel Remarks",
      one :'Hotel',
      two :'Remarks'
    },
    {
      full :"Payment Terms" ,
      one :'Payment',
      two :'Terms'
    },
    {
      full :"Vendor Approval",
      one :'Vendor',
      two :'Approval'
    },
    {
      full :"Estimated Time of Arrival",
      one :'Estimated Time',
      two :'of Arrival'
    },
    {
      full :"Vendor Delivery Status",
      one :'Vendor',
      two :'Delivery Status'
    },
   
   
    {
      sort : "V. Remarks",
      full : "Vendor Remarks",
      one:'Vendor',
      two:'Remarks'
    },
   
    ]
  scheduledOrder :any = [
   
    {
      full :"Purchase Request Number" ,
      one :'Purchase Request',
      two :'Number'
    },
    {
      full :"Purchase Order Number" ,
      one :'Purchase Order',
      two :'Number'
    },
    {
      full : "Product Image",
      one:'Product',
      two:'Image'
      
    },
    {
      full :"Requested Person & Department" ,
      one :'Requested Person',
      two :'& Department'
    },
    
 
    {
      full :"Required Quantity" ,
      one :'Required',
      two :'Quantity'
    },
    {
      full :"Required Date" ,
      one :'Required',
      two :'Date'
    },
    {
      full :"Specified Vendor" ,
      one :'Specified',
      two :'Vendor'
    },
    {
      full :"Hotel Remarks" ,
      one :'Hotel',
      two :'Remarks'
    },
    {
      full :"Payment Terms" ,
      one :'Payment',
      two :'Terms'
    },
  
    ]  

  DirectOrder_Heading: any = [
 
      {
        
        full : "DO Number",
        one:'DO',
        two:'Number'
      },
      {
        full : "Product Image",
        one:'Product',
        two:'Image'
        
      },
      {
        
        full : "Requested Person & Department",
        one:'Requested',
        two:'Person & Department',
        
      },
      {
        
        full : "Last Ordered Price Per Pcs/Box(Case)/Dozen",
        one:'Last Ordered',
        two:'Price Per Pcs/Box(Case)/Dozen'
      },
      {
       
        full : "Required Quantity",
        one:'Required',
        two:'Quantity'
      },
      {
        
        full : "Box(Case) Quantity",
        one:'Box(Case)',
        two:'Quantity'
      },
      {
        
        full : "Last Ordered Price(Total)",
        one:'Last Ordered',
        two:'Price(Total)'
      },
      {
        
        full : "Approx. Shipping cost",
        one:'Approx.',
        two:'Shipping cost'
      },
      
      {
        
        full : "Total Cost",
        one:'Total Cost',
        two:''
      },
      {
        
        full : "Required Date",
        one:'Required',
        two:'Date'
      },
      {
       
        full : "Specified Vendor",
        one:'Specified',
        two:'Vendor'
      },
      {
        
        full : "Remarks",
        one:'Remarks',
        two:''
      },
     
      
  ];
  RFQOrder_Heading: any = [
  
    {
      
      full : "RFQ Number",
      one:'RFQ',
      two:'Number'
    },
    {
      full : "Product Image",
      one:'Product',
      two:'Image'
      
    },
    {
      
      full : "Requested Person & Department",
      one:'Requested',
      two:'Person & Department',
      
    },
    {
      
      full : "Last Ordered Price Per Pcs/Box(Case)/Dozen",
      one:'Last Ordered',
      two:'Price Per Pcs/Box(Case)/Dozen'
    },
    {
     
      full : "Required Quantity",
      one:'Required',
      two:'Quantity'
    },
    {
      
      full : "Box(Case) Quantity",
      one:'Box(Case)',
      two:'Quantity'
    },
    {
      
      full : "Last Ordered Price(Total)",
      one:'Last Ordered',
      two:'Price(Total)'
    },
    {
      
      full : "Approx. Shipping cost",
      one:'Approx.',
      two:'Shipping cost'
    },
    
    {
      
      full : "Total Cost",
      one:'Total Cost',
      two:''
    },
    {
      
      full : "Required Date",
      one:'Required',
      two:'Date'
    },
    {
     
      full : "Specified Vendor",
      one:'Specified',
      two:'Vendor'
    },
    {
      
      full : "Remarks",
      one:'Remarks',
      two:''
    },
   
    
];
 groupOrder_id :any = ''
grouporder:any=[]
noneed:boolean = false
 filterid:any=[]
headers:any=["Purchase Order Number", "Items","Vendor","Required Date","Payment Terms" ]
expandedTable:any=["Purchase Request Number","Images","Requested Person & Department","Purchase Order Number","Required Quantity","Vendor - Price per Pcs","Required Date","Specified Vendor","Payment Terms","Status"]
RFQcompare_Heading:any=["RFQ Number","Product Image", "Req Person & Department"," Approx Price /Pcs", "Required Qty","Case qty",'Approx.price',"Approx.shipping cost","Approx.Total cost","Req DATE", "Specified Vendor", "Reason","Remarks"]
// RFQ_negotiation_Heading :any = ["View","RFQ Number","Vendor Reference Number","Vendor SKU Number","Qty Requested (Hotel)","Quantity Quoted (Vendor)","Box Quantity (No. Of Peices/Box)","Required By (Hotel)","Shipping Date","Transit Time (days)","ETA","Price Per Piece","Product Total","Sales Tax/GST (%)","Total + Sales Tax/GST(%)","Shipping (%)","Shipping Cost","Shipping - Sales Tax/GST (%)","Shipping - Sales Tax/GST (GST)","Total Cost","Vendor Remarks","Payment Terms"];
// RFQsubmited_Heading:any=["View","PR No","RFQ Number", "Req Person & Department"," Approx Price /Pcs", "Required Qty","Case qty",'Approx.price',"Approx.shipping cost","Approx.Total cost","Req DATE", "Specified Vendor", "Reason","Remarks"]


  @Output() cancelPopup = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute,private HotelService:HotelService,private toast:NgToastService,private AppserviceService: AppserviceService) { }
  price_symbol:any=''
  openlink2:any=''
  ngOnInit(): void {
    this.openlink2 = this.HotelService.projecturl()

    this.AppserviceService.country_price_symbol$.subscribe((symbol:any) =>{
      this.price_symbol = symbol
      console.log(this.price_symbol)
    })
    this.route.paramMap.subscribe((params) => {
    
      this.Hotel_Name_id = params.get("ids");

    })
     const obj ={
    Hotel_Name_id : this.Hotel_Name_id
   }
   console.log(obj)
   this.HotelService.procurement_stage(obj).subscribe((res) => {
    console.log(res)
    this.group_order = res
    console.log(this.group_order)
    this.filterorders()

  })
      

  }
  buttonclicked(button:any){
    this.selectedButton= button

  }
  grouping_orders(){
    
    this.cancelPopup.emit(false)
  }

 
  
  
filterorders(){
      this.direct_order_data = this.group_order.Direct_orders_data
      
      this.Rfq_order_data = this.group_order.Rfq_orders_data
      this.Rfq_compare_date = this.group_order.Rfq_compare
      this.Rfq_received_data = this.group_order.vendor_rfq_recived
      this.Rfq_submitted_data = this.group_order.vendor_rfq_submited
      this.Rfq_negotiate_data = this.group_order.negotiation
      this.Schedule_order_data = this.Schedule_order_data.concat(this.group_order.schedule_rfq,this.group_order.schedule)
      this.Schedule_rfq_data = this.group_order.schedule_rfq
      this.Schedule_do_data = this.group_order.schedule
      this.Under_Process_data = this.group_order.under_process
      this.renegotiation_data = this.group_order.renegotiate_purchase_order
      this.reject_data= this.group_order.DO_cancelled
      this.renego_reject_data = this.renego_reject_data.concat(this.group_order.renegotiate_purchase_order,this.group_order.DO_cancelled)
      this.descrepancy_data =this.group_order.discrepancy

      // this.Under_Process_data.forEach((element:any)=>{
      //   element.order_status = this.requestOrderStatus(element.order_status)
      //   console.log(element.order_status)
      // })
    
      this.Under_Process_data.forEach((element:any)=>{
        switch(element.order_status){
          case '2':
            element.status_order ='Purchase Order'
            
            break;
          case'3':
          element.status_order ='Sales Order'
          this.sales_order_data.push(element)
          break;
          case '4':
            element.status_order ='Pick & Pack'
            this.pick_and_pack_data.push(element)
          break;
          case '5':
            element.status_order ='Ready For Dispatch'
            this.pick_and_pack_data.push(element)
          break;
          case '6':
            element.status_order ='Dispatch'
           this.dispatched_data.push(element)   
           break;
        }
     
      })
      this.group_order.Under_DO.forEach((org:any)=>{
        org.rfq_id = org.mv_id
        org.status_order = 'Direct Order Sent'

      })
      this.descrepancy_data.forEach((org:any)=>{
        org.status_order = 'Discrepancy'
      })
       this.group_order.renegotiate_purchase_order.forEach((org:any)=>{
        org.status_order = 'Renegotiation'
      })
    

     
      let joinorders:any=[]
      joinorders = joinorders.concat(this.group_order.Under_DO,this.Under_Process_data, this.group_order.renegotiate_purchase_order,this.descrepancy_data)
      console.log(joinorders)
     
      this.filterid = this.removeDuplicatesByProperty(joinorders,'id')
      console.log(this.filterid)
      this.grouporder = this.removeDuplicatesByProperty(this.filterid,'rfq_id')
      console.log(this.grouporder)
      const count =this.brandproductcount(this.grouporder,this.filterid)
      console.log(count)



     

        

}
// linkorders(productID:any,pipeline:any){
//   this.cancelPopup.emit(true)
//   this.router.navigate([{ids: this.Hotel_Name_id, expanded: productID ,productType:"brandProduct", pipeLine:pipeline}], { relativeTo: this.route });
  

// }

// underprocessOrders(screen:any){
//   switch(screen){
//     case 'under_process':
//       this.UnderProcess = true
//       this.underprocess_order_data = this.Under_Process_data
//       this.underprocess_name = 'Under Process'
//     break;
//     case 'sales_order':
//       this.UnderProcess = true

//       this.underprocess_order_data = this.sales_order_data
//       this.underprocess_name = 'Under Process- Sales Order'
//     break;
//     case 'pick_and_pack':
//       this.UnderProcess = true

//       this.underprocess_order_data = this.pick_and_pack_data
//       this.underprocess_name = 'Under Process- Pick & Pack'
//     break;
//     case 'dispatched':
//       this.UnderProcess = true

//       this.underprocess_order_data = this.dispatched_data
//       this.underprocess_name = 'Under Process- Dispatched'
//     break;  
//   }

// }
filterproduct(product:any){
  product = [product]
  console.log(product)
  this.AppserviceService.procurementStage_orders(product)
  this.grouping_orders()

}
tableExpand(event:any){
  this.groupOrder_id = event
  console.log(this.groupOrder_id)
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
brandproductcount(products:any,orders:any){
  let ordercount_products:any =[]
  products.forEach((element:any) => {
    ordercount_products = []
    orders.forEach((list:any)=>{
      if( element.rfq_id == list.rfq_id){
         ordercount_products.push(list)
      }
      
    })

    element.count = ordercount_products.length
    console.log(element.count)
  });

 

}

}
