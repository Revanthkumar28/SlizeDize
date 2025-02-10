import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'b2b-full-history',
  templateUrl: './full-history.component.html',
  styleUrls: ['./full-history.component.css']
})
export class FullHistoryComponent implements OnInit {

  constructor() { }
  cardDataList: {id: string,title: string, createtedON: string,name:string,companyName:string, data: Record<string, string>[]}[] = [
    {id: '1',title: "Order Initiated", createtedON: "2 days ago",name:"Pending",companyName:"" ,data: [
      {"key": "Name", "value": "Rama Swamy, Purchase Manager"},
      {"key": "Released", "value": "27 April 2022 11AM"}
    ]},
    {id: '2',title: "Vendor Accepted", createtedON: "2 days ago",name:"Pending", companyName:"",data: [
      {"key": "Name", "value": "Welcome International"},
      {"key": "Created On", "value": "27 April 2022 11AM"}
    ]},
    {id: '3',title: "Received", createtedON: "2 days ago",name:"Pending",companyName:"" ,data: [
      {"key": "Received by", "value": "Eric Danny - GRT Chennai"},
      {"key": "Desg", "value": "House keeping Asst"}
    ]},
    {id: '4',title: "Payment Done", createtedON: "2 days ago",name:"Pending",companyName:"", data: [
      {"key": "Payment", "value": "Delta Labs"},
      {"key": "Date", "value": "27 April 2022 11AM"}
    ]},
    
  ];
  allvendor_neg:any=[]
  allvendor_neg_date:any=[]
  allvendor_sub:any =[]
  allvendor_sub_date :any=[]
  allvendor_rev:any=[]
  username:any=''
@Input() historydata:any = {}
desc_data:any=[]
@Output() cancelpopup = new EventEmitter();
fullorder:any=[]
trackingPoint:any = '4'
rfq_nego_id :any =''
Po_id :any =''
  ngOnInit(): void {
    console.log(this.historydata)
    if(this.historydata.create_data.length > 0){
   this.historydata.create_data.forEach((org:any)=>{
    org.currentstatus = 'Created'
    org.trackingPoint = 1
    this.Po_id = org.mv_id
    this.username = org.user_name
   })
   }
   let vendor_received:any=[]
     if(this.historydata.data.length > 0){
   this.historydata.data.forEach((org:any)=>{
    org.old_recived_datas.forEach((npm:any)=>{
      if(npm.vendor_id == org.vendor_id){
       
      npm.rfq_form_id = org.id
       npm.currentstatus = 'Vendor Received'
       npm.trackingPoint = 2

    vendor_received.push(npm)
      }
    })
   
   })
   }
  
    if(this.historydata.rfq_submit.length > 0){
   this.historydata.rfq_submit.forEach((org:any)=>{
    org.currentstatus = 'Vendor Submit'
    org.trackingPoint = 3
    this.allvendor_sub.push(org)
     
    this.allvendor_sub_date.push(org.vendor_name+'-'+org.created_at)
    console.log(this.allvendor_sub_date)
   })
   }
   console.log(this.allvendor_sub_date)
    if(this.historydata.negotiation.length > 0){
   this.historydata.negotiation.forEach((org:any)=>{
    org.currentstatus = 'Negotiation'
    org.trackingPoint = 4
    this.rfq_nego_id = org.rfq_form_id
    this.allvendor_neg.push(
      {
        name:org.vendor_name,
        id:org.rfq_form_id
      })
   
    let nego:any =[]
            nego.push(org.vendor_name+'-'+org.created_at)
            this.allvendor_neg_date = this.removeDuplicatesByProperty(nego,'vendor_name')
            console.log(this.allvendor_neg_date)
   })
   }
   console.log(this.removeDuplicatesByProperty(this.allvendor_neg,'id'))
   if(this.historydata.rfq_po_send.length > 0){
   this.historydata.rfq_po_send.forEach((org:any)=>{
    org.currentstatus = 'PO Sent'
    org.trackingPoint = 5
   })
   }
    if(this.historydata.sales_order.length > 0){
   this.historydata.sales_order.forEach((org:any)=>{
    org.currentstatus = 'Sales Order'
    org.trackingPoint = 6
   })
   }
    if(this.historydata.po_sales.length > 0){
   this.historydata.po_sales.forEach((org:any)=>{
    org.currentstatus = 'Sales Order'
    org.trackingPoint = 6
   })
   }
    if(this.historydata.pick_pack.length > 0){
   this.historydata.pick_pack.forEach((org:any)=>{
    org.currentstatus = 'Pick & Pack'
    org.trackingPoint = 7
   })
   }
    if(this.historydata.ready_for_dispatch.length > 0){
   this.historydata.ready_for_dispatch.forEach((org:any)=>{
    org.currentstatus = 'Ready For Dispatch'
    org.trackingPoint = 8
   })
   }
    if(this.historydata.dispatch.length > 0){
   this.historydata.dispatch.forEach((org:any)=>{
    org.currentstatus = 'Dispatch'
    org.trackingPoint = 9
   })
   }
    if(this.historydata.discrepancy.length > 0){
      this.desc_data =this.historydata.discrepancy
    console.log( this.desc_data)
   this.historydata.discrepancy.forEach((org:any)=>{
    org.currentstatus = 'Discrepancy'
    org.trackingPoint = 10
   })
   }
   if(this.historydata.reorder.length > 0){
    
 this.historydata.reorder.forEach((org:any)=>{
  org.currentstatus = 'Reorder'
  org.trackingPoint = 11
 })
 }
    if(this.historydata.ready_to_pay.length > 0){
   this.historydata.ready_to_pay.forEach((org:any)=>{
    org.currentstatus = 'Ready For Pay'
    org.trackingPoint = 12
   })
   }
    if(this.historydata.reconciled.length > 0){
   this.historydata.reconciled.forEach((org:any)=>{
    org.currentstatus = 'Reconciled'
    org.trackingPoint = 13
   })
   }
    if(this.historydata.complte_order.length > 0){
   this.historydata.complte_order.forEach((org:any)=>{
    org.currentstatus = 'Completed'
    org.trackingPoint = 14
   })
   }
   let vendor_rec_curr:any =[] 
   let vendor_rec_re:any =[]

   vendor_received.forEach((org:any)=>{
       this.historydata.current_order.forEach((ang:any)=>{
        if(org.rfq_form_id == ang.id){
          this.allvendor_rev.push(org.vendor_name)
          org.multi = 1
          vendor_rec_curr.push(org)

        }
       })
       this.historydata.reorderIds.forEach((ang:any)=>{
        if(org.rfq_form_id == ang){
         
          vendor_rec_re.push(org)

        }
       })
   })
       console.log(vendor_received)
       console.log(vendor_rec_curr)
       console.log(vendor_rec_re)

       console.log(this.allvendor_rev)

   let full_sales_order:any =[]
    full_sales_order = full_sales_order.concat(this.historydata.sales_order,this.historydata.po_sales)
    this.fullorder = this.fullorder.concat(this.historydata.create_data,this.removeDuplicatesByProperty(vendor_rec_curr,'rfq_id'),vendor_rec_re,this.removeDuplicatesByProperty(this.historydata.rfq_submit,'rfq_id'),this.removeDuplicatesByProperty(this.historydata.negotiation,'rfq_id'),this.historydata.rfq_po_send,full_sales_order ,this.historydata.pick_pack,this.historydata.ready_for_dispatch,this.historydata.dispatch,this.historydata.discrepancy,this.historydata.reorder,this.historydata.ready_to_pay,this.historydata.reconciled,this.historydata.complte_order)
    console.log(this.fullorder)
    this.cardDataList =[]
    let newarray:any = []
    let newarray2:any = []

    this.trackingPoint =0
    this.historydata.reorderIds.forEach((org:any)=>{
      console.log('fff')
      this.fullorder.forEach((val:any)=>{
        console.log(org)
      if(val.rfq_form_id){
        if(org == val.rfq_form_id){
          console.log('fff3')
  
          newarray.push(val)
        }
       
      }
   
    })

     })
     this.historydata.current_order.forEach((org:any)=>{
      console.log('fff')
      this.fullorder.forEach((val:any)=>{
        console.log(org)
      if(val.rfq_form_id){
        if(org.id == val.rfq_form_id){
          console.log('fff3')
  
          newarray2.push(val)
        }
       
      }
   
    })
     })
     console.log(newarray)
     console.log(newarray2)
     let reorderarray:any = []
     reorderarray = reorderarray.concat(this.historydata.create_data,newarray,newarray2)
     console.log(reorderarray)
     reorderarray.forEach((val:any)=>{
      
      
      
      this.cardDataList.push(
        {
          id: '1', title: val.currentstatus, name: this.username, companyName:val.currentstatus !='Created'? 'VENDOR: '+ ( val.currentstatus == 'Vendor Received'? (val.multi ?  this.allvendor_rev:val.vendor_name) :(val.currentstatus == 'Negotiation' || val.currentstatus == 'Vendor Submit' ? '':val.vendor_name)) : '', createtedON: val.currentstatus == 'Vendor Submit'? this.allvendor_sub_date:val.currentstatus =='Negotiation'? this.allvendor_neg_date:val.created_at,
          data: []
        },
        );
        this.trackingPoint = this.cardDataList.length
    })
    
    console.log(this.cardDataList)
    console.log(this.trackingPoint)
  }
  closeButton(){
    console.log('ffff')
    this.cancelpopup.emit(false);

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
}
