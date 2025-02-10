import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'b2b-revise-reorder-table',
  templateUrl: './revise-reorder-table.component.html',
  styleUrls: ['./revise-reorder-table.component.css']
})
export class ReviseReorderTableComponent implements OnInit {
  dropdownvalues:any=[]
  @Output() cancelpopup = new EventEmitter();
  @Output() refreshdata = new EventEmitter();

  @Input() revise:any={}
  @Input() type:any=''
  new_vendor_id:any=''
  vendorname:any=''
  required_date:any=''
  tableData = [
    { 
      id:'1',
      column1: 'Required Quantity',
      column2: ''
      
    },
    { 
      id:'2',
      column1: 'Required Date',
      column2: ''
     
    },
    { 
      id:'3',
      column1: 'Price/Box',
      column2: ''
     
    },
    { 
      id:'4',
      column1: 'Current Vendor',
      column2: ''
     
    },
    { 
      id:'5',
      column1: 'New Vendor',
      
     
    },
    { 
      id:'6',
      column1: 'Reason for Revising the PO',
      
     
    },
  ];
  sendorder:any={}
  remarks:any = ''
  constructor( private AppserviceService: AppserviceService,private HotelService:HotelService,private toast:NgToastService) {}

  ngOnInit(): void {
        console.log(this.type)
        console.log(this.revise)
    this.AppserviceService.serviceVendor$.subscribe((data:any) =>{
      console.log(data)
      data.forEach((vendorname:any)=>{
        if(this.type == 'service' && vendorname.service_access > 0){
          if(vendorname.vendor_id != this.revise.vender_id){
            this.dropdownvalues.push(vendorname)
          }

        }else{
          if(vendorname.vendor_id != this.revise.vendor_id){
            this.dropdownvalues.push(vendorname)
          }
        }
       
      })
      
      console.log(this.dropdownvalues)
      if(this.type == 'service'){
      this.tableData.forEach((values:any)=> {
    
      if (values.id == '4'){
          values.column2 =this.revise.vendor_name
         }
        
      })
    }else{
      this.tableData.forEach((values:any)=> {
      
        if (values.column1 == 'Required Quantity' && this.type=='descerpancy'){
            values.column2 =this.revise.total_req_qty
       }
         else{
             if(values.column1 == 'Required Quantity'){
              values.column2 =this.revise.required_quantity
             }
         }
      //  if (values.column1 == 'Required Date'){
      //   values.column2 =this.revise.before_required_date
      //    }
       if (values.column1 == 'Price/Box'){
          values.column2 =this.revise.vendor_coating_price
         }
      if (values.column1 == 'Current Vendor'&& this.type=='descerpancy'){
          values.column2 =this.revise.companyName
         }
         else{
          if(values.column1 == 'Current Vendor'){
            values.column2 =this.revise.vednor
          }
         }
      })

    }
      
    })
  }
  getInput(data:any){
   this.new_vendor_id =data.vendor_id
   this.vendorname =data.companyName
   console.log(this.new_vendor_id )
   console.log(this.revise)
  }
  submit(){
    this.sendorder={
      product_id : this.revise.product_id,
      mv_id:this.revise.mv_id,
      Hotel_Name_id:this.revise.Hotel_Name_id,
      id:this.revise.id,
      new_vendor_id :this.new_vendor_id,
      old_vendor_id:this.revise.vendor_id,
      rejected_reason:this.remarks,
      new_date:this.required_date
    }
    console.log(this.sendorder)
    switch(this.type){
      case 'descerpancy':
        this.HotelService.rejected_reorder(this.sendorder).subscribe( {
          next: (d) => {
          console.log(d)
          this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
          this.cancelpopup.emit(false);

          },
          error: (error) => {
                
            this.toast.error({detail:"Error",summary:'Fill All The Fields',duration:5000});
          },
        })
        break;
      case 'reject' :
        this.HotelService.reorder(this.sendorder).subscribe( {
          next: (d) => {
          console.log(d)
          this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
          this.cancelpopup.emit(false);
          },
          error: (error) => {
                
            this.toast.error({detail:"Error",summary:'Fill All The Fields',duration:5000});
          },
        })
        break;
      case 'service':
        const obj ={
          Hotel_Name_id:this.revise.Hotel_Name_id,
          id : this.revise.id,
          new_vendor_id: this.new_vendor_id,
          rejected_reason:this.remarks,
          new_date:this.required_date

        }
        this.HotelService.service_rejected_reorder(obj).subscribe( {
          next: (d) => {
          console.log(d)
          this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
          this.cancelpopup.emit(false);
          this.refreshdata.emit('refresh');

          },
          error: (error) => {
                
            this.toast.error({detail:"Error",summary:'Fill All The Fields',duration:5000});
          },
        })
        break;   
    }
   
     
   

  }
  clocecancelpopup(){
    this.cancelpopup.emit(false);
  }
}
