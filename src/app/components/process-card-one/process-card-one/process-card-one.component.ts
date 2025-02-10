import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'b2b-process-card-one',
  templateUrl: './process-card-one.component.html',
  styleUrls: ['./process-card-one.component.css']
})
export class ProcessCardOneComponent implements OnInit {
  tableHeading: string[] = ["Item", "Req Date", "Delivery", "Lead Time", "Dept.", "Qty", "Price", "Tax", "Shipment Cost", "Total Amount", "Price Comparision", "Shipment Status", "PO Stage", "Supplier"];
  tableColumnSpacing = "14*minmax(86px,0.4fr)";
  stepperLen: number = 0;
  
  cardDataList:any = [
    {id: 1,title: "Request Raised", time: "----", 
    name : '----', companyName : '----', DepartmentPosition : '----',
    createtedON :'----',
  },
    {id: 2,title: "Grant - Approval by F&B Manager", time: "----", 
    name : '----', companyName : '----', DepartmentPosition : '----',
    createtedON :'----',
   },
    {id: 3,title: "Grant - Approval by Finance Manager", time: "----",
    name : '----', companyName : '----', DepartmentPosition : '----',
    createtedON :'----',
    },
    {id: 4,title: "RFQ Pushed - Ramu purchase Manager", time: "----",
    name : '----', companyName : '----', DepartmentPosition : '----',
    createtedON :'----',
    }
  ];
  dublicateCardList:any = []
  deatails:any=''
  special:any=''
  cardata:any=''

  url :any = {
    selectedTable : '',
    hotelId: '',
    rfq_id : ''
  }

  nofifyPerson:any = []
  trackingPoint :number = 1
  isLoading:boolean = true
  @Input() process_person :any = {}
  constructor(private router: Router, private route: ActivatedRoute,private HotelService:HotelService,private toast:NgToastService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get("expanded");
      if(id) this.url.selectedTable = id;
    })

    this.route.paramMap.subscribe((params) => {
      let id = params.get("ids");
      if(id) this.url.hotelId = id;
    })

    this.route.paramMap.subscribe((params) => {
      let id = params.get("rfq_Id");
      if(id) this.url.rfq_Id = id;
      console.log(id)
    })
    this.dublicateCardList = this.cardDataList
    console.log(this.process_person)

    // if(this.process_person.finance_price_percent < 10 || this.process_person.finance_price_percent == null){
    //   this.cardDataList = this.cardDataList.filter((finan:any) => finan.id != 3)   
    // }
    this.cardDataList = []
    this.HotelService.order_status(this.process_person).subscribe((res:any) => {
      console.log(res)
      this.isLoading = false

      const order_history_Finance = res.order_history_data.some((data:any) => data.order_status == 'Approve by- FM')
      if(!order_history_Finance){
        this.stepperLen = 3
        this.cardDataList = this.dublicateCardList.filter((finan:any) => finan.id != 3)   
      }else{
        this.stepperLen = 4
        this.cardDataList = this.dublicateCardList
      }

      this.nofifyPerson = res
      this.cardDataList.forEach((element:any) => {
        const hotel = res.hotel
        const req_rasied = res.user_request_order
        const waiting_approval = res.user_approved_order
        const finance = res.order_approved_by_finance_manager
        const sent_vendor = res.order_send_to_vendor
        const Order_Initiated = res.order_initiated
        let created_On = res.order_history_data
        let approval_financeDate:any = ''

        if(element.id == 1){
          element.name = req_rasied.name != undefined || req_rasied.name != null ? req_rasied.name : 'Admin'
          element.companyName = hotel.Hotel_Name
          element.title = req_rasied.designations_name != undefined ? 'Request Raised by ' + req_rasied.designations_name : 'Request Raised by Admin'
          element.DepartmentPosition = req_rasied != undefined ? req_rasied.department_name : ''
          element.createtedON = res.order_create ? res.order_create.updated_at : ''
        }
        if(element.id == 2){
          element.name = waiting_approval == undefined || waiting_approval == null ? '' : waiting_approval.name
          element.companyName = hotel.Hotel_Name
          element.title = waiting_approval != null ? 'Grant Approval by ' + waiting_approval.designations_name : 'Waiting for Approval'
          element.DepartmentPosition = waiting_approval != undefined || waiting_approval != null ? waiting_approval.department_name : ''
          approval_financeDate = created_On.find((date:any) => date.order_status == 'Approve')
          element.createtedON = approval_financeDate ? approval_financeDate.updated_at : ''
          // this.trackingPoint = waiting_approval == undefined || waiting_approval == null ? 1 : 2
          this.traking_green_button('Department_manager',res.user_approved_order)
        }
        if(element.id == 3 && order_history_Finance){
          element.name = finance != null ? finance.name : ''
          element.companyName = hotel.Hotel_Name
          element.title = finance != null ? 'Finance Approved by ' + finance.designations_name : 'Waiting for Finance'
          element.DepartmentPosition = finance != null ? finance.designations_name : ''
          const updateAt = created_On.find((date:any) => date.order_status == 'Approve by- FM')
          const Approval = created_On.find((date:any) => date.order_status == 'Approve')
          element.createtedON = updateAt ? updateAt.updated_at : Approval ? Approval.updated_at : ''
          this.traking_green_button('Finance_manager',finance)
        }

        if(element.id == 4){
          element.name = sent_vendor != null && sent_vendor != 'admin' ? sent_vendor.name : sent_vendor
          element.companyName = ''
          element.DepartmentPosition = ''
          // element.title = finance == null || finance == undefined ? 'Pending Order to vendor' : 'Ordered'
          element.title = sent_vendor == null || sent_vendor == undefined ? 'Pending Order to vendor' : 'Ordered by ' + sent_vendor.designations_name
          const updateAt = res.vendor_send.find((date:any) => date.order_status == 'dr')
          element.createtedON =  updateAt ? updateAt.updated_at : ''
          this.traking_green_button('Purchase_manager',sent_vendor)
        }
      });
    },err =>{
      this.isLoading = false
      this.toast.error({ detail: "Error " + err.status, summary: err.error.message, duration: 3000 });
    })

    this.deatails = JSON.parse( sessionStorage.getItem('registration')!);

    // this.nofifyPerson = JSON.parse(localStorage.getItem('notify') || '[]')
    console.log(this.process_person.finance)
    console.log(this.cardDataList)

  }

  traking_green_button(type:any,user:any){
    if (user != null) {
      switch (type) {
        case 'Department_manager':
          this.trackingPoint = 2
          return 2;
        case 'Finance_manager':
          this.trackingPoint = 3
          return 3;
        case 'Purchase_manager':
          this.trackingPoint = 4
          return 4;
      }
    }
    return 1;
  
  }

  

}
