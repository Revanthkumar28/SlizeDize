import { Component, OnInit,Input } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';

@Component({
  selector: 'b2b-process-card-two',
  templateUrl: './process-card-two.component.html',
  styleUrls: ['./process-card-two.component.css']
})
export class ProcessCardTwoComponent implements OnInit {
  tableHeading: string[] = ["Item", "Req Date", "Delivery", "Lead Time", "Dept.", "Qty", "Price", "Tax", "Shipment Cost", "Total Amount", "Price Comparision", "Shipment Status", "PO Stage", "Supplier"];
  tableColumnSpacing = "14*minmax(150px,1fr)";

  cardDataList: {id: string,title: string, createtedON: string,name:string, data: Record<string, string>[]}[] = [
    {id: '1',title: "Order Initiated", createtedON: "2 days ago",name:"Pending", data: [
      {"key": "Name", "value": "Rama Swamy, Purchase Manager"},
      {"key": "Released", "value": "27 April 2022 11AM"}
    ]},
    {id: '2',title: "Vendor Accepted", createtedON: "2 days ago",name:"Pending", data: [
      {"key": "Name", "value": "Welcome International"},
      {"key": "Created On", "value": "27 April 2022 11AM"}
    ]},
    {id: '3',title: "Received", createtedON: "2 days ago",name:"Pending", data: [
      {"key": "Received by", "value": "Eric Danny - GRT Chennai"},
      {"key": "Desg", "value": "House keeping Asst"}
    ]},
    {id: '4',title: "Payment Done", createtedON: "2 days ago",name:"Pending", data: [
      {"key": "Payment", "value": "Delta Labs"},
      {"key": "Date", "value": "27 April 2022 11AM"}
    ]},
    
  ];

  @Input() process_person:any = ''
  @Input() screen =''
  @Input() servicedata:any={}
  @Input() servicehistory:any=[]
  trackingPoint :number = 0
  currentGroupIndex: number = 0;
  constructor(private HotelService:HotelService) { }
  selectedButton:any='Current Order'
  button_name: Record<string, string>[] = [
     {"name": "History"},
     {"name": "Current Order"},
  ];

  ngOnInit(): void {
   
    // const process_person = {
    //   Hotel_Name_id : ''
    // }
    if(this.screen == 'service'){
      console.log(this.screen)
      console.log(this.servicedata)
      console.log(this.servicehistory)
      if(this.servicehistory.length == 0){
        this.button_name = [{"name": "Current Order"}]
      }
      this.servicerequest('current')



    }else{
      this.HotelService.order_status(this.process_person).subscribe((res:any) => {
        console.log(res)
        this.cardDataList.forEach((element:any) => {
          const hotel = res.hotel
          const vendor_Initiated = res.order_initiated
          const Vendor_Accepted = res.Vendor_Accepted
          const recieved = res.Received
          const payment_done = res.Payment_Done
  
          if(element.id == 1){
            element.name = vendor_Initiated != undefined || vendor_Initiated != null ? vendor_Initiated.companyName : 'Pending'
            element.createtedON = res.vendor_send ? res.vendor_send[0].updated_at : ''
            this.traking_green_button('Pending',vendor_Initiated)
          }
          if(element.id == 2){
            element.name = Vendor_Accepted == 'yes' ? 'Accepted' : 'Pending'
            element.createtedON = res.vendor_accept_time ? res.vendor_accept_time : ''
            this.traking_green_button('Accept',Vendor_Accepted)
          }
          if(element.id == 3 ){
            element.name = recieved == 'yes' ? 'Received' : 'Pending'
            element.createtedON = res.Received_time ? res.Received_time : ''
            this.traking_green_button('Received',recieved)
          }
  
          if(element.id == 4){
            element.name = payment_done == 'yes' ? 'Done' : 'Pending'
            element.createtedON = res.Payment_time ? res.Payment_time : ''
            this.traking_green_button('Done',payment_done)
          }
        });
      })

    }
   
   
  }

  traking_green_button(type:any,user:any){
    if (user != null) {
      switch (type) {
        case 'Pending':
          this.trackingPoint = 1
          return 2;
        case 'Accept':
          this.trackingPoint = 2
          return 2;
        case 'Received':
          this.trackingPoint = 3
          return 3;
        case 'Done':
          this.trackingPoint = 4
          return 4;
      }
    }
    return 1;
  
  }
  servicerequest(plain:any){
   let createdat:''
    let underprocesstime= ''
    let completedtime = ''
    let cancelledtime=''
    let reorderedtime=''
    let vendorname =''
    let serviceoders:any =[]
   switch(plain){
    case 'current':
      this.servicedata.forEach((org:any)=>{
      
        switch(org.status){
          case"0":
          createdat = org.created_at
          vendorname =org.vendor_name
          break;
          case"1":
          underprocesstime = org.updated_at
          vendorname =org.vendor_name

          break;
          case"2":
          completedtime = org.updated_at
          vendorname =org.vendor_name

          break;
          case"3":
          cancelledtime = org.updated_at
          vendorname =org.vendor_name

          break;
          case"4":
          reorderedtime = org.updated_at
          vendorname =org.vendor_name

          break;
          
  
        }
      })
      this.cardDataList.forEach((element:any) => {
        if(element.id == 1){
          element.title = 'created'
          element.name = 'Yes' +', '+ vendorname
          element.createtedON = createdat != '' ?createdat : 'Pending'
          this.trackingPoint = 1
          
        }
        if(element.id == 2){
          element.title = 'Under Process'
          element.name = underprocesstime != '' ? 'Yes' +', '+ vendorname: 'No'
          element.createtedON = underprocesstime 
          this.trackingPoint = underprocesstime != '' ? 2 : 1
  
        }
        if(element.id == 3 ){
          element.title = 'Completed/Cancelled'
          element.name = cancelledtime == '' && completedtime == ''? 'No':cancelledtime != '' && completedtime == ''? 'cancelled - Yes ' +', '+ vendorname :'Completed - Yes' +', '+ vendorname
          element.createtedON = cancelledtime == '' && completedtime == ''? ' ':cancelledtime != '' && completedtime == ''? cancelledtime: completedtime
          this.trackingPoint = cancelledtime != '' || completedtime!= ''  ? 3 : underprocesstime != '' ? 2 : 1
  
  
        }
  
        if(element.id == 4){
          element.title = 'Reordered'
          element.name = reorderedtime != '' ? 'Yes' +', '+ vendorname : 'No'
          element.createtedON = reorderedtime
           this.trackingPoint = reorderedtime != '' ? 4 : cancelledtime != '' || completedtime!= ''  ? 3:underprocesstime != '' ? 2 : 1
  
  
        }
       
      })
      break;
      case 'reorder':
        const currentGroup = this.servicehistory[this.currentGroupIndex];
        this.cardDataList = [];
    
        for (const key in currentGroup) {
          if (currentGroup.hasOwnProperty(key)) {
            const serviceOrders = currentGroup[key];
            let createdat = '', underprocesstime = '', completedtime = '', cancelledtime = '', reorderedtime = '' , vendorname = '' ,vendorname2=''; 
            this.trackingPoint = 4
            serviceOrders.forEach((org: any) => {
              switch (org.status) {
                case '0':
                  createdat = org.created_at;
                  vendorname = org.vendor_name
                  break;
                case '1':
                  underprocesstime = org.updated_at;
                  vendorname = org.vendor_name

                  break;
                case '2':
                  completedtime = org.updated_at;
                  vendorname = org.vendor_name

                  break;
                case '3':
                  cancelledtime = org.updated_at;
                  vendorname = org.vendor_name

                  break;
                case '4':
                  reorderedtime = org.updated_at;
                  vendorname2 = org.vendor_name

                  break;
              }
            });
            console.log(serviceOrders)
    
            this.cardDataList.push(
              {
                id: '1', title: 'Created', name: createdat != '' ? 'Yes' +', '+ vendorname : 'No', createtedON: createdat != '' ? createdat : 'Pending',
                data: []
              },
              { id: '2', title: 'Under Process', name: underprocesstime != '' ? 'Yes' +', '+ vendorname : 'No', createtedON: underprocesstime , data: []},
              { id: '3', title: 'Cancelled', name: cancelledtime != '' ? 'Yes' +', '+ vendorname:'No' ,createtedON:cancelledtime, data: []},
              { id: '4', title: 'Reordered', name: reorderedtime != '' ? 'Yes' +', '+ vendorname2 : 'No', createtedON: reorderedtime , data: []}
            );
          }
        }


    
     
      break;

   }
   
    
   
    
    
  }
  nextGroup(): void {
    if (this.currentGroupIndex < this.servicehistory.length - 1) {
      this.currentGroupIndex++;
      this.servicerequest('reorder');

    }
  }

  previousGroup(): void {
    if (this.currentGroupIndex > 0) {
      this.currentGroupIndex--;
      this.servicerequest('reorder');
    }
  }
  buttonclicked(buttonName:any){
    this.selectedButton = buttonName;
    if(this.selectedButton == 'Current Order'){
      this.servicerequest('current')
    }
    if(this.selectedButton == 'History'){
      this.servicerequest('reorder')
    }
    console.log(buttonName)
  }
}
