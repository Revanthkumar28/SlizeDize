import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';
import { DemohotelService } from 'src/app/service/demohotel.service';


@Component({
  selector: 'b2b-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  @Output() cancelpopup = new EventEmitter();
Hotel_id:any=''
product_id:any=''
showhistory:boolean = false
historydata:any={}
completedorder:any=[]
deleted_Order_data:any =[]

  completedOrders:any= [
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
      full :"Price-Pcs/Box",
      one :'Price',
      two :'Pcs/Box'
    },
    {
      full :"Total Cost",
      one :'Total',
      two :'Cost'
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
      sort : "QSW",
      full : "Quality Size & Weight",
      one:'Quality Size &',
      two:'Weight'
    },
   
  
    {
      sort : "V. Remarks",
      full : "Vendor Remarks",
      one:'Vendor',
      two:'Remarks'
    },
   
    {
      full : "Payment Terms",
      one:'Payment',
      two:'Terms'
    },
    {
      full : "Reconciled",
      one:'Reconciled',
      two:''
    },
    ]
    serviceRequestCompleted_Heading: any[] = [ "Service Request Number", "Requested Person & Department","Created At","Vendor", "Picture/Video","Room Number/Area","Required Date", "Current Condition", "Issue/Remarks","Total Cost","Payment Terms","Status"] 

    DeletedOrders:any= [
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
        full :"Price-Pcs/Box",
        one :'Price',
        two :'Pcs/Box'
      },
      {
        full :"Total Cost",
        one :'Total',
        two :'Cost'
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
        sort : "V. Remarks",
        full : "Vendor Remarks",
        one:'Vendor',
        two:'Remarks'
      },
     
      {
        full : "Payment Terms",
        one:'Payment',
        two:'Terms'
      },
      {
        full : "Deleted Place",
        one:'Deleted',
        two:'Place'
      },
      {
        full : " Rejected Reason",
        one:'Rejected',
        two:'Reason'
      }, 
    ]
    imagearray :any=[]
    servicehistory:any=[]
    serviceimg:boolean = false
    openchat:boolean = false
    price_symbol:any=''
  constructor(private router: Router, private route: ActivatedRoute,private HotelService:HotelService,private AppserviceService:AppserviceService,private authService: AuthServiceService,private DemohotelService :DemohotelService) { }
  isLoggedIn:boolean=false

  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();

    this.route.paramMap.subscribe((params) => {
      let i = params.get("ids");
      this.Hotel_id= i

      let x = params.get("expanded");
      this.product_id =x
    });
//currency price
this.AppserviceService.country_price_symbol$.subscribe((symbol:any) =>{
  if(symbol){
    this.price_symbol = symbol

  }
  console.log(this.price_symbol)
})
    if(!this.isLoggedIn){
      this.DemohotelService.Show_Demo_Orders(this.product_id)
      this.AppserviceService.share_demo_orders$.subscribe((d: any) => {
            
        if(d){ 
            this.completedorder = d.filter((org:any)=>org.status == 9)
            this.completedorder.forEach((obj:any)=>{
              obj.reconciled = '1'
            })
        }
      })
    }else{
      this.AppserviceService.notification_reload_data$.subscribe((notify:any) =>{
        console.log(notify)
        if(notify != null){
          if(notify.status == '28'){
            this.completed_order()
          }
        }
       
      })
      this.completed_order()
       
      
    }
  
  }

  completed_order(){
    const view_history= {
      Hotel_id : this.Hotel_id,
      product_id: this.product_id
    }

    this.HotelService.complte_order_hotel_data(view_history).subscribe({
      next: (response) => {
        this.completedorder = response.complete_order
        // this.deleted_Order_data = response.reject_order
         this.servicehistory  = response.service_request_history
         this.servicehistory.forEach((elem:any)=>{
          elem.imagearray = elem.product_images.split(','); 
          elem.image = elem.imagearray[0]
        
         switch(elem.work_status){
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
        response.reject_order.forEach((d:any)=>{
          d.deleted_place = 'Pipline'
        })
        response.under_process_reject.forEach((d:any)=>{
          d.deleted_place = 'Under_Process'
        })
        response.renenotiate_reject.forEach((d:any)=>{
          d.deleted_place = 'Renegotiate'
        })
        response.direct_order_reject.forEach((d:any)=>{
          d.deleted_place = 'Direct_Order_Sent'
        })
        this.deleted_Order_data = this.deleted_Order_data.concat(response.reject_order, response.under_process_reject,response.renenotiate_reject,response.direct_order_reject);

        // this.toast.success({detail:"Submitted",summary:'Success',duration:5000});
         console.log(this.completedorder)
        
      },
      error: (error) => {
        // Error block
        console.log('test error');  // Log to console for debugging
        // this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
      },
    })
  }

  close_window(){
    this.cancelpopup.emit(false);
  }
  closeimg(){
    this.serviceimg=false
  }
  isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  isVideo(url: string): boolean {
    return url.match(/\.(mp4|webm|ogg)$/) != null;
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
formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options = { day: '2-digit', month: 'short', year: 'numeric' } as const;
  return date.toLocaleDateString('en-GB', options).replace(' ', '-').replace(',', '');
}
fullhistory(id:any){
  const obk ={
    Hotel_Name_id :this.Hotel_id,
    id:id
  } 
  this.HotelService.hotel_full_process(obk).subscribe({
    next: (response) => {
      console.log(response)
      this.historydata = response
      this.showhistory = true
    },
    error: (error) => {
      // Error block
      console.log('test error');  // Log to console for debugging
      // this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
    },
  })

}
orders:any={}
Chat(data:any){
  this.orders = data
  this.openchat = true
}
}
