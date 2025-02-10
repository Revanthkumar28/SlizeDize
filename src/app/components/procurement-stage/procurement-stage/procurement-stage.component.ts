import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/service/hotel/hotel.service'
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';

@Component({
  selector: 'b2b-procurement-stage',
  templateUrl: './procurement-stage.component.html',
  styleUrls: ['./procurement-stage.component.css']
})
export class ProcurementStageComponent implements OnInit {
  ischecked: boolean = false
  vendorcheck: any = []
  ismodified: boolean = false
  pipeline: boolean = true
  rfqcompare: boolean = true
  scheduleorder: boolean = true
  underprocess: boolean = true
  renego: boolean = true
  decrepancy: boolean = true

  filterData: any = '';
  buttons: Record<string, any>[] = [
    {
      id: 1,
      "name": "ITEM",
      // dropdown:["RFQ","Compare"],
    },
    {
      id: 2,
      "name": "PURCHASE ORDER",
      dropdown: []
    },
    {
      id: 3,
      "name": "DEPARTMENT",
      dropdown: []
    },
    {
      id: 5,
      "name": "VENDOR",
      dropdown: []
    }
  ];
  selectedButton = "ITEM";
  groupby: boolean = false
  grouporders: any = {}
  @Input() hotelid: any = ''
  buttonType: any = ''
  @Output() onPressed = new EventEmitter();


  Schedule_order_data: any = []
  Underprocessmerge: any = []
  sales_order_data: any = []
  pick_and_pack_data: any = []
  dispatched_data: any = []
  // underprocess_order_data:any=[]

  renego_reject_data: any = []
  sendproductid: any = []
  purchuse_order: any = []

  selected_items: any = {
    pruchase_order : [],
    department : [],
    vendor : []
  }

  count: any = {
    direct_order: '',
    Do_waiting: '',
    Do_approved: '',
    Rfq_order_count: '',
    Rfq_waiting: '',
    Rfq_approved: '',
    dispatched: '',
    pick_and_pack: '',
    ready_for_dispatch: '',
    rfq_compare: '',
    rfq_received: '',
    rfq_submitted: '',
    rfq_negotiate: '',
    schedule_order: '',
    schedule_po: '',
    schedule_rfq_count: '',
    schedule_do_count: '',
    underprocess: '',
    underprocess_po: '',
    Direct_order_sent: '',
    sales_order: '',
    renegotiation_po: '',
    reject_po: '',
    renogo_reject: '',
    renogo_reject_po: '',
    descrepancy: '',
    descrepency_items: '',
    descrepancy_po: '',
    service_request:''

  }
  Values: any = {
    direct_order_data: [],
    Do_waiting_data: [],
    Do_approved_data: [],
    Rfq_order_data: [],
    Rfq_approved_data: [],
    Rfq_waiting_data: [],
    Rfq_compare_data: [],
    Rfq_received_data: [],
    Rfq_submitted_data: [],
    Rfq_negotiate_data: [],
    Schedule_order_data: [],
    Schedule_rfq_data: [],
    Schedule_do_data: [],
    Under_Process_data: [],
    sales_order_data: [],
    pick_and_pack_data: [],
    dispatched_data: [],
    renegotiation_data: [],
    reject_data: [],
    renego_reject_data: [],

    descrepancy_data: [],
    under_process_powise: [],
    renego_reject_powise: [],
    descrepancy_powise: [],
    servicerequest:[]
  }
  isLoading: boolean = false

  constructor(private router: Router, private route: ActivatedRoute, private HotelService: HotelService, private AppserviceService: AppserviceService,private authService: AuthServiceService) { }
  isLoggedIn:boolean=false

  ngOnInit(): void {
    this.filterData = '';
    this.isLoading = true

    this.isLoggedIn = this.authService.login();
   if(!this.isLoggedIn){

   const obj ={
    id_user : localStorage.getItem('u_id'),
   }
    this.HotelService.demo_product_all(obj).subscribe((res) => {
      this.grouporders.purchase_requests_approved = res.product.filter((org:any)=> org.status == 1)
      this.grouporders.Rfq_orders_count = this.grouporders.purchase_requests_approved.length
      this.grouporders.Rfq_orders_data = this.grouporders.purchase_requests_approved
      this.grouporders.Direct_orders_data = res.product.filter((org:any)=> org.status == 2)
      this.grouporders.Do_purchase_requests_approved = this.grouporders.Direct_orders_data
      this.grouporders.Direct_orders_count = this.grouporders.Direct_orders_data.length
      this.grouporders.Rfq_compare = res.product.filter((org:any)=> org.status == 3)
      this.grouporders.vendor_rfq_submited = this.grouporders.Rfq_compare
      this.grouporders.rfq_compare_count = this.grouporders.Rfq_compare.length
      this.grouporders.rfq_submited_count = this.grouporders.Rfq_compare.length
      this.Underprocessmerge = res.product.filter((org:any)=> org.status == 5)
      this.dispatched_data = this.Underprocessmerge
      this.grouporders.discrepancy = res.product.filter((org:any)=> org.status == 7)
      this.grouporders.discrepancy_count = this.grouporders.discrepancy.length
      console.log(this.grouporders.Rfq_orders_data)
      const ho_order = res.product.filter((org:any)=> org.status != 8 && org.status != 9 )
      let ho_vendor:any =[]
      let ho_rfq:any =[]

      ho_order.forEach((org:any)=>{
        if(org.vendor_company !=null){
          ho_vendor.push({
            vednor:org.vendor_company,
            vendor_id:org.vendor_id
          } )
        }
        if(org.rfq_id !=null){
          ho_rfq.push({
            rfq_id:org.rfq_id
          } )
        }
      
      })
      console.log(ho_vendor)
      this.isLoading = false
      this.buttonClicked("ITEM");
      this.buttons.forEach((element: any) => {
        if (element.id == 5) {
          element.dropdown = this.removeDuplicatesByProperty(ho_vendor,'vendor_id')
         element.dropdown.forEach((order: any) => {
            order.ischecked = false
          })

        }
        //pofilter
        if (element.id == 2) {
          element.dropdown = ho_rfq
          element.dropdown.forEach((order: any) => {
            order.ischecked = false
          })
        }
      })

    })

     
   }else{

   
    this.filterData = '';
    const obj = {
      Hotel_Name_id: this.hotelid
    }
    this.isLoading = true

    console.log(obj)
    this.HotelService.procurement_stage(obj).subscribe((res) => {
      this.grouporders = res
      this.purchuse_order = res.hotel_po

      this.Schedule_order_data = this.Schedule_order_data.concat(this.grouporders.schedule_rfq, this.grouporders.schedule)
      this.renego_reject_data = this.renego_reject_data.concat(this.grouporders.renegotiate_purchase_order, this.grouporders.DO_cancelled)
      this.grouporders.DO_cancelled.forEach((id: any) => {
        id.rfq_id = id.mv_id
      })
      this.grouporders.Rfq_compare.forEach((id: any) => {
        id.rfq_id = id.mv_id
      })
      this.grouporders.Under_DO.forEach((id: any) => {
        id.rfq_id = id.mv_id
      })
      this.Underprocessmerge = this.Underprocessmerge.concat(this.grouporders.under_process, this.grouporders.Under_DO)
      // this.Underprocessmerge.forEach((order: any) => {
      //   order.order_status = "3"

      // })
      console.log(this.Underprocessmerge)
      this.Underprocessmerge.forEach((element: any) => {
        switch (element.order_status) {
          case '2':
            this.sales_order_data.push(element)
            console.log("working")
            break;
          case '3':
            this.sales_order_data.push(element)
            console.log("working")
            break;
          case '4':
            this.pick_and_pack_data.push(element)
            break;
          case '5':
            this.pick_and_pack_data.push(element)
            break;
          case '6':
            this.dispatched_data.push(element)
            break;
        }

      })
      this.sales_order_data = this.sales_order_data.concat(this.sales_order_data,this.grouporders.Under_DO)
      console.log(this.sales_order_data)
      this.selectedButton = JSON.parse(localStorage.getItem('selectedbutton') || "[]")

      this.buttonClicked("ITEM")
      //vendorfilter

      this.buttons.forEach((element: any) => {
        if (element.id == 5) {
          element.dropdown = res.hotel_vendor
          element.dropdown.forEach((order: any) => {
            order.ischecked = false
          })

        }
        //pofilter
        if (element.id == 2) {
          element.dropdown = res.hotel_po
          element.dropdown.forEach((order: any) => {
            order.ischecked = false
          })
        }
        //dept filter
        if (element.id == 3) {
          element.dropdown = res.hotel_departments
          element.dropdown.forEach((order: any) => {
            order.ischecked = false
          })
        }

      })
    })
  }
  }

  buttonClicked(buttonName: string) {
    this.selectedButton = buttonName;
    console.log(this.selectedButton)
    localStorage.setItem('selectedbutton', JSON.stringify(this.selectedButton));

    switch (buttonName) {
      case 'ITEM':
        this.MakeItZero()
        this.countOfItems()
        break;
      case 'VENDOR':
        console.log('vendor')
        break;


    }
    // this.router.navigate([{ids : this.HotelId,productType :this.productType,expanded: this.expandedId, nav: buttonName}], {relativeTo: this.route});
  }
  checkvendor(event: any, vendorid: any, rfqid: any, deptID: any,dropDownType:any) {
    switch (this.selectedButton) {
      case 'PURCHASE ORDER':
        this.MakeItZero()
        // this.selected_items=[]
        this.selected_items.pruchase_order = []
        console.log(rfqid)
        this.buttons.forEach((element:any)=>{
          if(element.id == 2){
            element.dropdown.forEach((order:any)=>{
              if(order.mv_id == rfqid || order.rfq_id == rfqid){
                order.ischecked = event.target.checked
              }
              if (order.ischecked == true) {
                this.selected_items.pruchase_order.push(order.rfq_id)
              }

            })

          }
        })

        // if(this.selected_items.pruchase_order.length == 0){
        //   this.countOfItems()
        // }
        break;
      case 'VENDOR':
        console.log(vendorid)
        this.MakeItZero()
        // this.countOfItems()
        this.selected_items.vendor = []
        this.buttons.forEach((element: any) => {
          if (element.id == 5) {
            element.dropdown.forEach((order: any) => {
              if (order.vendor_id == vendorid) {
                order.ischecked = event.target.checked
              }
              if (order.ischecked == true) {
                this.selected_items.vendor.push(order.vendor_id)
              }

            })

          }
        })

        // if(this.selected_items.vendor.length == 0){
        //   this.countOfItems()
        // }


        break;
      case 'DEPARTMENT':
        console.log(deptID)
        this.MakeItZero()
        this.selected_items.department = []
        this.buttons.forEach((element: any) => {
          if (element.id == 3) {
            element.dropdown.forEach((order: any) => {
              if (order.departments_id == deptID) {
                order.ischecked = event.target.checked
              }
              if (order.ischecked == true) {
                this.selected_items.department.push(order.departments_id)
              }

            })
          }
         })

        //  if(this.selected_items.department.length == 0){
        //   this.countOfItems()
        // }
       
      break;   
    }

    this.selected_items.pruchase_order.forEach((pur:any) => {
      this.countOfVendors(pur,'po')
    });

    this.selected_items.department.forEach((dep:any) => {
      this.countOfVendors(dep,'Dep')
    });

    this.selected_items.vendor.forEach((ven:any) => {
      this.countOfVendors(ven,'Vendor')
    });
    console.log(this.selected_items)

    if(this.selected_items.pruchase_order.length == 0 && this.selected_items.department.length == 0 &&  this.selected_items.vendor.length == 0){
      this.countOfItems()
    }
    
  }

  isProcurementStage() {
    this.onPressed.emit(false);
  }

  openorders(button_type: any) {
    this.buttonType = button_type
    let orderdata = []
    this.sendproductid = []
    switch (button_type) {
      case 'rfq_order':
        console.log('vfvf')
        orderdata = this.removeDuplicatesByProperty(this.Values.Rfq_order_data, 'product_id')

        break;
      case 'rfq_approved':
        orderdata = this.removeDuplicatesByProperty(this.Values.Rfq_approved_data, 'product_id')

        break;
      case 'rfq_waiting':
        orderdata = this.removeDuplicatesByProperty(this.Values.Rfq_waiting_data, 'product_id')

        break;

      case 'direct_order':
        orderdata = this.removeDuplicatesByProperty(this.Values.direct_order_data, 'product_id')

        break;
      case 'do_approved':
        orderdata = this.removeDuplicatesByProperty(this.Values.Do_approved_data, 'product_id')

        break;
      case 'do_waiting':
        orderdata = this.removeDuplicatesByProperty(this.Values.Do_waiting_data, 'product_id')

        break;
      case 'rfq_compare':
        orderdata = this.removeDuplicatesByProperty(this.Values.Rfq_compare_data, 'product_id')

        break;
      case 'rfq_submited':
        orderdata = this.removeDuplicatesByProperty(this.Values.Rfq_submitted_data, 'product_id')

        break;
      case 'rfq_received':
        orderdata = this.removeDuplicatesByProperty(this.Values.Rfq_received_data, 'product_id')

        break;
      case 'rfq_negotiate':
        orderdata = this.removeDuplicatesByProperty(this.Values.Rfq_negotiate_data, 'product_id')

        break;
      case 'schedule':

        orderdata = this.removeDuplicatesByProperty(this.Values.Schedule_order_data, 'product_id')

        break;
      case 'rfq_schedule':
        orderdata = this.removeDuplicatesByProperty(this.Values.Schedule_rfq_data, 'product_id')

        break;
      case 'do_schedule':
        orderdata = this.removeDuplicatesByProperty(this.Values.Schedule_do_data, 'product_id')

        break;
      case 'under_process':
        orderdata = this.removeDuplicatesByProperty(this.Values.Under_Process_data, 'product_id')

        break;
      case 'sales_order':

        orderdata = this.removeDuplicatesByProperty(this.Values.sales_order_data, 'product_id')

        break;
      case 'pick_and_pack':

        orderdata = this.removeDuplicatesByProperty(this.Values.pick_and_pack_data, 'product_id')

        break;
      case 'dispatched':

        orderdata = this.removeDuplicatesByProperty(this.Values.dispatched_data, 'product_id')

        break;

      case 'reject_reno':
        orderdata = this.removeDuplicatesByProperty(this.Values.renego_reject_data,'product_id')
      break;
      case 'negotiate':
        orderdata = this.removeDuplicatesByProperty(this.Values.renegotiation_data, 'product_id')

        break;
      case 'reject':
        orderdata = this.removeDuplicatesByProperty(this.Values.reject_data, 'product_id')

        break;
      case 'descrepancy':
        orderdata = this.removeDuplicatesByProperty(this.Values.descrepancy_data, 'product_id')

        break;
        case 'service':
          orderdata = this.removeDuplicatesByProperty(this.Values.servicerequest, 'product_id')
  
          break;
      default:
        this.sendproductid = 'refresh'
        break;


    }
   
    orderdata.forEach((element: any) => {
      this.sendproductid.push(element.product_id)
    })

    console.log(this.sendproductid)
    this.AppserviceService.procurementStage_orders(this.sendproductid)
    this.showmodified()
    // this.onPressed.emit(false);
  }
  close(screen: any) {
    console.log(screen)
    if (screen == false) {
      this.groupby = false
    } else {
      this.groupby = false
      this.onPressed.emit(false);
    }
  }

  removeDuplicatesByProperty(arr: any[], prop: string): any[] {
    if(arr){
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
    return []
   
  }

  countOfItems() {
    this.count.Rfq_order_count = this.grouporders.Rfq_orders_count
    this.count.Rfq_approved = this.grouporders.purchase_requests_approved != undefined ? this.grouporders.purchase_requests_approved.length : 0
    this.count.Rfq_waiting = this.grouporders.purchase_requests_approved_waiting != undefined ? this.grouporders.purchase_requests_approved_waiting.length : 0
    this.count.direct_order = this.grouporders.Direct_orders_count
    this.count.Do_approved = this.grouporders.Do_purchase_requests_approved != undefined ? this.grouporders.Do_purchase_requests_approved.length : 0
    this.count.Do_waiting = this.grouporders.DO_waiting != undefined ? this.grouporders.DO_waiting.length : 0
    this.count.rfq_compare = this.grouporders.rfq_compare_count
    this.count.rfq_received = this.grouporders.rfq_received_count
    this.count.rfq_submitted = this.grouporders.rfq_submited_count
    this.count.rfq_negotiate = this.grouporders.negotiation_count
    this.count.schedule_rfq_count = this.grouporders.schedule_rfq_count
    this.count.schedule_do_count = this.grouporders.schedule_count
    this.count.schedule_order = this.removeDuplicatesByProperty(this.Schedule_order_data, 'product_id').length
    this.count.schedule_po = this.removeDuplicatesByProperty(this.Schedule_order_data, 'rfq_id').length
    this.count.underprocess = this.removeDuplicatesByProperty(this.Underprocessmerge, 'product_id').length
    this.count.underprocess_po = this.removeDuplicatesByProperty(this.Underprocessmerge, 'rfq_id').length
    this.count.sales_order =  this.removeDuplicatesByProperty(this.sales_order_data,'rfq_id').length
    this.count.pick_and_pack = this.grouporders.pick_pack_count + this.grouporders.ready_for_dispatch_count
    this.count.ready_for_dispatch = this.grouporders.ready_for_dispatch_count
    this.count.dispatched = this.dispatched_data.length
    this.count.renegotiation_po = this.grouporders.renegotiate_purchase_order_count
    this.count.reject_po = this.grouporders.DO_cancelled_order_count

    this.count.renogo_reject = this.removeDuplicatesByProperty(this.renego_reject_data, 'product_id').length
    this.count.renogo_reject_po = this.removeDuplicatesByProperty(this.renego_reject_data, 'rfq_id').length
    this.count.descrepency_items = this.grouporders.discrepancy_count
    this.count.descrepancy = this.removeDuplicatesByProperty(this.grouporders.discrepancy, 'product_id').length
    this.count.descrepancy_po = this.removeDuplicatesByProperty(this.grouporders.discrepancy, 'rfq_id').length
    this.count.service_request = this.grouporders.service_request ? this.grouporders.service_request.length : 0
    //assign orders for button action
    this.Values.Rfq_order_data = this.removeDuplicatesByProperty(this.grouporders.Rfq_orders_data, 'product_id')
    this.Values.Rfq_approved_data = this.grouporders.purchase_requests_approved
    this.Values.Rfq_waiting_data = this.grouporders.purchase_requests_approved_waiting
    this.Values.direct_order_data = this.removeDuplicatesByProperty(this.grouporders.Direct_orders_data, 'product_id')
    this.Values.Do_approved_data = this.grouporders.Do_purchase_requests_approved
    this.Values.Do_waiting_data = this.grouporders.DO_waiting
    this.Values.Rfq_compare_data = this.removeDuplicatesByProperty(this.grouporders.Rfq_compare, 'product_id')
    this.Values.Rfq_received_data = this.removeDuplicatesByProperty(this.grouporders.vendor_rfq_recived, 'product_id')
    this.Values.Rfq_submitted_data = this.removeDuplicatesByProperty(this.grouporders.vendor_rfq_submited, 'product_id')
    this.Values.Rfq_negotiate_data = this.removeDuplicatesByProperty(this.grouporders.negotiation, 'product_id')
    this.Values.Schedule_order_data = this.removeDuplicatesByProperty(this.Schedule_order_data, 'product_id')
    this.Values.Schedule_rfq_data = this.removeDuplicatesByProperty(this.grouporders.schedule_rfq, 'product_id')
    this.Values.Schedule_do_data = this.removeDuplicatesByProperty(this.grouporders.schedule, 'product_id')
    this.Values.Under_Process_data = this.removeDuplicatesByProperty(this.Underprocessmerge, 'product_id')
    this.Values.sales_order_data = this.removeDuplicatesByProperty(this.sales_order_data, 'product_id')
    this.Values.pick_and_pack_data = this.removeDuplicatesByProperty(this.pick_and_pack_data, 'product_id')
    this.Values.dispatched_data = this.removeDuplicatesByProperty(this.dispatched_data, 'product_id')
    this.Values.renegotiation_data = this.removeDuplicatesByProperty(this.grouporders.renegotiate_purchase_order, 'product_id')
    this.Values.reject_data = this.removeDuplicatesByProperty(this.grouporders.DO_cancelled, 'product_id')
    this.Values.renego_reject_data = this.removeDuplicatesByProperty(this.renego_reject_data, 'product_id')
    this.Values.descrepancy_data = this.removeDuplicatesByProperty(this.grouporders.discrepancy, 'product_id')
    this.Values.servicerequest = this.removeDuplicatesByProperty(this.grouporders.service_request, 'product_id')

    this.isLoading = false

    // this.showhide()
  }

  countOfVendors(vendorID: any,dropDown_type:any) {
    const counts = [
      { data: this.grouporders.Rfq_orders_data, targetArray: this.Values.Rfq_order_data },
      { data: this.grouporders.purchase_requests_approved, targetArray: this.Values.Rfq_approved_data },
      { data: this.grouporders.purchase_requests_approved_waiting, targetArray: this.Values.Rfq_waiting_data },
      { data: this.grouporders.Direct_orders_data, targetArray: this.Values.direct_order_data },
      { data: this.grouporders.Do_purchase_requests_approved, targetArray: this.Values.Do_approved_data },
      { data: this.grouporders.DO_purchase_requests_approved_waiting, targetArray: this.Values.Do_waiting_data },
      { data: this.grouporders.Rfq_compare, targetArray: this.Values.Rfq_compare_data },
      { data: this.grouporders.vendor_rfq_recived, targetArray: this.Values.Rfq_received_data },
      { data: this.grouporders.vendor_rfq_submited, targetArray: this.Values.Rfq_submitted_data },
      { data: this.grouporders.negotiation, targetArray: this.Values.Rfq_negotiate_data },
      { data: this.grouporders.schedule_rfq, targetArray: this.Values.Schedule_rfq_data },
      { data: this.grouporders.schedule, targetArray: this.Values.Schedule_do_data },
      { data: this.Schedule_order_data, targetArray: this.Values.Schedule_order_data },
      { data: this.Underprocessmerge, targetArray: this.Values.Under_Process_data },
      { data: this.sales_order_data, targetArray: this.Values.sales_order_data },
      { data: this.pick_and_pack_data, targetArray: this.Values.pick_and_pack_data },
      { data: this.dispatched_data, targetArray: this.Values.dispatched_data },
      { data: this.renego_reject_data, targetArray: this.Values.renego_reject_data },
      { data: this.grouporders.renegotiate_purchase_order, targetArray: this.Values.renegotiation_data },
      { data: this.grouporders.DO_cancelled, targetArray: this.Values.reject_data },
      { data: this.grouporders.discrepancy, targetArray: this.Values.descrepancy_data }
    ];

    console.log(counts)
    switch (dropDown_type) {
      case 'po':
        console.log(this.grouporders.under_process)
        counts.forEach(count => {
          if (count.data != undefined) {
            count.data.forEach((element: any) => {
              if (element.rfq_id == vendorID) {
                count.targetArray.push(element);
              }
            });
          }

        });
        break;
      case 'Vendor':

        counts.forEach(count => {
          if (count.data != undefined) {
            count.data.forEach((element: any) => {
              if (element.vendor_id == vendorID) {
                count.targetArray.push(element);
              }
            });
          }
        });


        break;
      case 'Dep':

        counts.forEach(count => {
          if (count.data != undefined) {
            count.data.forEach((element: any) => {
              if (element.departments_id == vendorID) {
                count.targetArray.push(element);
              }
            });
          }
        });


        break;
    }
    // count 
    console.log(this.Values)
    const keysValues = {
      mv_id: this.selected_items.pruchase_order,
      vendor_id: this.selected_items.vendor,
      departments_id: this.selected_items.department
    };
    // console.log(this.filterObjectsWithKeysAndValues(this.Values,keysValues))
    console.log(this.Values)
    this.count.Rfq_order_count = this.Values.Rfq_order_data.length
    this.count.Rfq_approved = this.Values.Rfq_approved_data ? this.Values.Rfq_approved_data.length : 0
    this.count.Rfq_waiting = this.Values.Rfq_waiting_data ? this.Values.Rfq_waiting_data.length : 0
    this.count.direct_order = this.Values.direct_order_data.length
    this.count.Do_approved = this.Values.Do_approved_data != undefined ? this.Values.Do_approved_data.length : 0
    this.count.Do_waiting = this.Values.Do_waiting_data != undefined ? this.Values.Do_waiting_data.length : 0
    this.count.rfq_compare = this.Values.Rfq_compare_data.length
    this.count.rfq_received = this.Values.Rfq_received_data.length
    this.count.rfq_submitted = this.Values.Rfq_submitted_data.length

    this.count.rfq_negotiate = this.Values.Rfq_negotiate_data.length
    this.count.schedule_rfq_count = this.Values.Schedule_rfq_data.length
    this.count.schedule_do_count = this.Values.Schedule_do_data.length
    this.count.schedule_order = this.removeDuplicatesByProperty(this.Values.Schedule_order_data, 'product_id').length
    this.count.schedule_po = this.removeDuplicatesByProperty(this.Values.Schedule_order_data, 'rfq_id').length
    this.count.underprocess = this.removeDuplicatesByProperty(this.Values.Under_Process_data, 'product_id').length
    this.count.underprocess_po = this.removeDuplicatesByProperty(this.Values.Under_Process_data, 'rfq_id').length
    this.count.sales_order = this.Values.sales_order_data.length
    this.count.pick_and_pack = this.Values.pick_and_pack_data.length
    this.count.dispatched = this.Values.dispatched_data.length
    this.count.renegotiation_po = this.Values.renegotiation_data.length
    this.count.reject_po = this.Values.reject_data.length

    this.count.renogo_reject = this.removeDuplicatesByProperty(this.Values.renego_reject_data, 'product_id').length
    this.count.renogo_reject_po = this.removeDuplicatesByProperty(this.Values.renego_reject_data, 'rfq_id').length
    this.count.descrepency_items = this.Values.descrepancy_data.length
    this.count.descrepancy = this.removeDuplicatesByProperty(this.Values.descrepancy_data, 'product_id').length
    this.count.descrepancy_po = this.removeDuplicatesByProperty(this.Values.descrepancy_data, 'rfq_id').length
    console.log(this.count)
  }

  filterObjectsWithKeysAndValues(data: any, keysValues: { [key: string]: string[] }): any {
    const result:any = {};
  
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        result[key] = value.filter(item => {
          return Object.entries(keysValues).some(([k, v]) => v.includes(item[k]));
        });
      } else {
        result[key] = value;
      }
    }
  
    return result;
  }
  

  MakeItZero() {
    this.count.Rfq_order_count = 0
    this.count.Rfq_approved = 0
    this.count.Rfq_waiting = 0
    this.count.direct_order = 0
    this.count.Do_approved = 0
    this.count.Do_waiting = 0
    this.count.rfq_compare = 0
    this.count.rfq_received = 0
    this.count.rfq_submitted = 0
    this.count.rfq_negotiate = 0
    this.count.schedule_rfq_count = 0
    this.count.schedule_do_count = 0
    this.count.schedule_order = 0
    this.count.schedule_po = 0
    this.count.underprocess = 0
    this.count.underprocess_po = 0
    this.count.sales_order = 0
    this.count.pick_and_pack = 0
    this.count.dispatched = 0
    this.count.renegotiation_po = 0
    this.count.reject_po = 0
    this.count.renogo_reject = 0
    this.count.renogo_reject_po = 0
    this.count.descrepency_items = 0
    this.count.descrepancy = 0
    this.count.descrepancy_po = 0

    this.Values.Rfq_order_data = []
    this.Values.Rfq_approved_data = []
    this.Values.Rfq_waiting_data = []
    this.Values.direct_order_data = []
    this.Values.Do_approved_data = []
    this.Values.Do_waiting_data = []
    this.Values.Rfq_compare_data = []
    this.Values.Rfq_received_data = []
    this.Values.Rfq_submitted_data = []
    this.Values.Rfq_negotiate_data = []
    this.Values.Schedule_order_data = []
    this.Values.Schedule_rfq_data = []
    this.Values.Schedule_do_data = []
    this.Values.Under_Process_data = []
    this.Values.sales_order_data = []
    this.Values.pick_and_pack_data = []
    this.Values.dispatched_data = []
    this.Values.renegotiation_data = []
    this.Values.reject_data = []
    this.Values.renego_reject_data = []
    this.Values.descrepancy_data = []
    this.Values.under_process_powise = []
    this.Values.renego_reject_powise = []
    this.Values.descrepancy_powise = []
  }

  showmodified() {
    //  this.ismodified = true
  }
  showhide() {
    console.log(this.count)
    if (this.count.Rfq_order_count == 0 && this.count.Rfq_approved == 0 && this.count.Rfq_waiting == 0 && this.count.direct_order == 0 && this.count.Do_approved == 0 && this.count.Do_waiting == 0) {
      this.pipeline = false
    } else {
      this.pipeline = true
    }
  }


  filter_Orders_status(purchase_orederArr:any,departmentArr:any,vendorArr:any){

  }
}
