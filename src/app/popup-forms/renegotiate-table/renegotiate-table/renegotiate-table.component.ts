import { Component,Input, OnInit,Output,EventEmitter } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'b2b-renegotiate-table',
  templateUrl: './renegotiate-table.component.html',
  styleUrls: ['./renegotiate-table.component.css']
})
export class RenegotiateTableComponent implements OnInit {
  
  @Output() cancelpopup = new EventEmitter();
  @Output() fixedData = new EventEmitter();
  @Output() submitData = new EventEmitter();

  @Input() negotiateValue:any =''
  @Input() mvId:any =''
  isEditLastValue :boolean = false
  isEditableAllBotttons :boolean = true
  isEditLastValueIcon :boolean = false
  isNegotiationCompleted : boolean = false
  Udata :any=''
  Vdata :any=''
  tableData:any = [
    { 
      id:10,
      requestId :'',
      column1: 'User Type',
      defaultData :'',
      isUserOrVendor :false,
      column2: []
    },
    { 
      id:1,
      requestId :'',
      column1: 'Required Quantity',
      defaultData :'',
      isUserOrVendor :false,
      column2: []
    },
    { 
      id:2,
      requestId :'',
      column1: 'Price Per Pic/Box(case)/Dozen',
      defaultData :'',
      isUserOrVendor :false,
      column2: []
    },
    { 
      id:3,
      requestId :'',
      column1: 'Required Date',
      defaultData :'',
      isUserOrVendor :false,
      column2: []
    },
   
    { 
      id:4,
      requestId :'',
      column1: 'Payment Terms',
      isUserOrVendor :false,
      defaultData :'',
      column2: ['Payment']
     
    },
    { 
      id:5,
      requestId :'',
      column1: 'Order Received On',
      isUserOrVendor :false,
      defaultData :'',
      column2: []
    },
    { 
      id:6,
      requestId :'',
      column1: 'Reason for Revising the PO',
      isUserOrVendor :false,
      defaultData :'',
      column2: []
    },
    { 
      id:7,
      requestId :'',
      column1: 'Submit',
      defaultData :'',
      column2: []
     },
    
  ];

  apiRequire = {
    'rfq_form_id': '',
    'vendor_coating_price': '0',
    'ETA': '12-jan-2024',
    'vendor_quantity': '1',
    'reason': '',
    'payment_Terms' : '-',
    'vp':''
  }
  remarks:any = ''
  paymentTerms :any = ''
  PO_negotiate :any = ''
  releasedOrder_Hotel_screen:any = ''
  vendor_PO_Screen_Nego :any = ''

  @Input() poNegotiate:any = []
  negotiateLoader :boolean = false
  @Output() loader = new EventEmitter();
  first_Last_negotiation :any = ''
  negotiate_Vendor:any = ''
  first_paymentTerms :any = ''
  isNogoSubmitLoader:boolean = false
  negotiationHistory :any = []
  constructor(private HotelService:HotelService,private toast: NgToastService,private AppserviceService:AppserviceService, private router: Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    // this.isVedorEdit(true)
    console.log(this.negotiateValue)
    console.log(this.poNegotiate)
    this.route.paramMap.subscribe((params) => {
      let id = params.get("expanded");
      this.PO_negotiate = params.get("process");
      this.releasedOrder_Hotel_screen = params.get("pipeLine");
      this.vendor_PO_Screen_Nego = params.get("process");
    })

    if(this.negotiateValue.type == 'hotel'){
      this.poNegotiate = []
    }

    // NO API for PURCHASE ORDER (DO) start
    this.AppserviceService.ven_purchaseOrder_negotiate$.subscribe((res) =>{
      if(res){
        this.negotiateLoader = true 
        // this.tableValue([],[],this.poNegotiate[0])
        console.log(this.poNegotiate)
        this.poNegotiate = res
        // this.tableData.forEach((element:any) => {
        //   element.column2 = []
        // })
        console.log()
        // this.typeNegotiate()
        this.negotiation_process(this.poNegotiate[0],[],this.poNegotiate[0].vendor_coating_price,this.negotiateValue.type == 'hotel' ? 'ho' :'vu')
        this.isVedorEdit(true)
      }else{
        this.typeNegotiate()
      }
    })

    // NOTIFICATION RELOAD >>>>>>
    this.AppserviceService.notification_reload_data$.subscribe((reload:any) =>{
      if((reload.status == '5' || reload.status == '6' || reload.status == '7' || reload.status == '8') && this.negotiateLoader){
        this.negotiateValue.type = 'hotel'
        this.typeNegotiate()
      }
    })

    // if(this.poNegotiate.length > 0){
      
    // }else{
    // }

    // this.AppserviceService.notifyExpandProduct$.subscribe(expand =>{
    //   if(expand.status == "7"){
    //     this.typeNegotiate()
    //   }
    // })
  }

  rfq_form_id :any = ''
  typeNegotiate(){
    const mvId = {
      rfq_form_id : this.negotiateValue.id
    }
    console.log(mvId)

    if(this.negotiateValue.type == 'vendor'){
      this.HotelService.vendor_to_user_negotiation_view(mvId).subscribe(res =>{
        this.poNegotiate = []
        this.negotiateLoader = true
        this.loader.emit(this.negotiateLoader)
        this.first_Last_negotiation = res.step_first_and_last
        this.first_paymentTerms = res.payment_terms_first
        this.negotiationHistory = res.nagotiation_history
        this.tableData.forEach((element:any) => {
          element.column2 = []
        })
        // ....................new .................................
        if(this.PO_negotiate == 'Renegotiate'){
          res.nagotiation_history = res.nagotiation_history.length > 0 ? res.nagotiation_history.splice(1) : []
        }
        const first = res.step_first_and_last
        if((first.user == 'he' || first.user == 'ho') && first.negotiations != '2'){
          this.isEditableAllBotttons = true
          this.isVedorEdit(true)
        }
        this.negotiation_process(res.step_first_and_last,res.nagotiation_history,res.last_ordered_product_price,'vu')

        // COMPLETED
        if(first.negotiations == '2'){
          this.isNegotiationCompleted = true
        }
      },error => {
        this.loader.emit(false)
      })
    }
    if(this.negotiateValue.type == 'hotel'){
      this.HotelService.user_to_vendor_negotiation_view(mvId).subscribe(res =>{
        // console.log(res)
        this.poNegotiate = []
        this.negotiateLoader = true
        this.loader.emit(this.negotiateLoader)
        this.tableData.forEach((element:any) => {
          element.column2 = []
        })
        // ....................new .................................
        if(this.releasedOrder_Hotel_screen == 'Released Orders'){
          res.nagotiation_history = res.nagotiation_history.length > 0 ? res.nagotiation_history.splice(1) : []
        }
        this.first_Last_negotiation = res.step_first_and_last
        this.first_paymentTerms = res.payment_terms_first
        this.negotiate_Vendor = res.vendor.vendor_name
        this.negotiationHistory = res.nagotiation_history
        const first = res.step_first_and_last
        const nego_count = res.nagotiation_history != null ? res.nagotiation_history.length : 0
        if((nego_count == 0 || first.user == 'vu') && first.negotiations != 2){
          this.isEditableAllBotttons = true
          this.isVedorEdit(true)
        }
        this.negotiation_process(res.step_first_and_last,res.nagotiation_history,res.last_ordered_product_price,'ho')

        // COMPLETED
        if(first.negotiations == '2'){
          this.isNegotiationCompleted = true
        }

      })
    }
  }
// TEST - git pull origin main
  negotiation_process(first_:any,nego_process:any,last_ordered_product_price:any,user_type:any){
    this.tableData.forEach((element:any) => {
      // NEGOTIATION INITIAL AND LAST UPDATE START ..............................
      if(element.id == 1){
        element.firstPrice = first_.total_req_qty
        element.defaultData = first_.vendor_quantity
        element.color = first_.total_req_qty == first_.vendor_quantity ? 0 : 1

        if(nego_process.length == 0){
          this.apiRequire.vendor_quantity = first_.vendor_quantity
        }
      }

      if(element.id == 2){
        element.firstPrice = last_ordered_product_price ? last_ordered_product_price : '0'
        element.defaultData = first_.vendor_coating_price
        element.color = last_ordered_product_price == first_.vendor_coating_price ? 0 : 1

        if(nego_process.length == 0){
          this.apiRequire.vendor_coating_price = last_ordered_product_price ? last_ordered_product_price : first_.vendor_coating_price
        }
      }
      if(element.id == 3){
        element.firstPrice = first_.before_required_date
        element.defaultData = first_.ETA
        element.color = first_.before_required_date == first_.ETA ? 0 : 1

        if(nego_process.length == 0){
          this.apiRequire.ETA = first_.before_required_date
        }
      }
      if(element.id == 4){
        element.firstPrice = this.first_paymentTerms
        element.defaultData = first_.payment_terms
        element.color = this.first_paymentTerms == first_.payment_terms ? 0 : 1

        if(nego_process.length == 0){
          this.apiRequire.payment_Terms = first_.payment_terms

          if(this.poNegotiate.length > 0){
            this.paymentTermsSelection(first_.payment_terms)
          }else{
            this.paymentTermsSelection(first_.payment_terms)
          }
        }
      }
      if(element.id == 5){
        element.firstPrice = first_.created_at
        element.defaultData = first_.updated_at

        if(nego_process.length == 0){
          // this.apiRequire.vendor_quantity = defaultOrder.vendor_shipping_date
        }
      }
      if(element.id == 6){
        element.firstPrice = '-'
        element.defaultData = first_.order_reason
      }
      if(element.id == 10){
        element.firstPrice = 'Hotel'
        element.defaultData = first_.user == 'he' || first_.user == 'ho' ? 'Hotel' : 'Vendor'
      }
      // NEGOTIATION INITIAL AND LAST UPDATE END ##############################

      // NEGOTIATION HISTORY START.......................................
      if(nego_process.length > 0){
        nego_process.forEach((value:any) => {
          if(element.id == 1){
            element.firstPrice = first_.total_req_qty
            element.defaultData = first_.vendor_quantity

            element.requestId = value.rfq_form_id
            element.column2.push(value.vendor_quantity) 
          }
          if(element.id == 2){
            element.firstPrice = last_ordered_product_price ? last_ordered_product_price : '0'
            element.defaultData = first_.vendor_coating_price
  
            element.requestId = value.rfq_form_id
            element.column2.push(value.vendor_coating_price) 
          }
          if(element.id == 3){
            element.firstPrice = first_.before_required_date
            element.defaultData = first_.ETA
  
            element.requestId = value.rfq_form_id
            element.column2.push(value.ETA)
          }
  
          if(element.id == 4){
            element.firstPrice = this.first_paymentTerms
            element.defaultData = first_.payment_terms
  
            element.requestId = value.rfq_form_id
            element.column2.push(value.payment_Terms)
          }
          if(element.id == 5){
            element.firstPrice = first_.created_at
            element.defaultData = first_.updated_at
  
            element.requestId = value.rfq_form_id
            element.column2.push(value.created_at)
          }
          if(element.id == 6){
            element.firstPrice = first_.text_box
            element.defaultData = first_.order_reason
  
            element.requestId = value.rfq_form_id
            element.column2.push(value.text_box)
          }
  
          if(element.id == 7){
            element.requestId = value.rfq_form_id
            element.defaultData = '-'
          }
  
          if(element.id == 10){
            element.firstPrice = 'Hotel'
            element.defaultData = first_.user == 'he' || first_.user == 'ho' ? 'Hotel' : 'Vendor'
  
            if(value.user_type == 'vu'){
              value.user_type = 'Vendor'
              element.column2.push(value.user_type)
            }
            if(value.user_type == 'he' || value.user_type == 'ho'){
              value.user_type = 'Hotel'
              element.column2.push(value.user_type)
            }
          }
        })
      }
      // NEGOTIATION HISTORY START ##############################
    })

    // LEATEST NEGOTIATE
    const last_nego = nego_process.length
    this.paymentTerms = first_.payment_terms
    this.apiRequire.vendor_quantity = first_.vendor_quantity
    this.apiRequire.vendor_coating_price = first_.vendor_coating_price
    this.apiRequire.ETA = first_.ETA ? first_.ETA : first_.before_required_date
    this.apiRequire.payment_Terms = first_.payment_terms
  }

  // DYNAMIC API VALUES
  // update_table_values(first_:any,element:any,value:any){
  //   if(element.id == 1){
  //     element.requestId = value.rfq_form_id
  //     element.column2.push(value.vendor_quantity) 
  //   }
  //   if(element.id == 2){
  //     element.firstPrice = first_.vendor_coating_price ? first_.vendor_coating_price : '-'
  //     element.defaultData = first_.vendor_coating_price

  //     element.requestId = value.rfq_form_id
  //     element.column2.push(value.vendor_coating_price) 
  //   }
  //   if(element.id == 3){
  //     element.firstPrice = first_.before_required_date
  //     element.defaultData = first_.ETA

  //     element.requestId = value.rfq_form_id
  //     element.column2.push(value.ETA)
  //   }

  //   if(element.id == 4){
  //     element.firstPrice = first_.payment_terms
  //     element.defaultData = first_.payment_terms

  //     element.requestId = value.rfq_form_id
  //     element.column2.push(value.payment_Terms)
  //   }
  //   if(element.id == 5){
  //     element.firstPrice = first_.created_at
  //     element.defaultData = first_.updated_at

  //     element.requestId = value.rfq_form_id
  //     element.column2.push(value.created_at)
  //   }
  //   if(element.id == 6){
  //     element.firstPrice = first_.text_box
  //     element.defaultData = first_.text_box

  //     element.requestId = value.rfq_form_id
  //     element.column2.push(value.text_box)
  //   }

  //   if(element.id == 7){
  //     element.requestId = value.rfq_form_id
  //     element.defaultData = ''
  //   }

  //   if(element.id == 10){
  //     element.firstPrice = 'Hotel'
  //     element.defaultData = first_.user == 'he' || first_.user == 'ho' ? 'Hotel' : 'Vendor'

  //     if(value.user_type == 'vu'){
  //       value.user_type = 'Vendor'
  //       element.column2.push(value.user_type)
  //     }
  //     if(value.user_type == 'he' || value.user_type == 'ho'){
  //       value.user_type = 'Hotel'
  //       element.column2.push(value.user_type)
  //     }
  //   }
  // }

//   tableValue(d:any,defaultOrder:any,firstPrice:any){
//     console.log(this.poNegotiate)
//     this.tableData.forEach((element:any) => {
//       // default values
//       if(element.id == 10){
//         element.firstPrice = 'Hotel'
//         element.defaultData = 'Vendor'

//         const nego = d[d.length - 1]

//         if(d.length > 0){
//           if(nego.user_type == "vu"){
//             element.defaultData = 'Vendor'
//           }else{
//             element.defaultData = 'Hotel'
//           }
//         }
//       }
//       if(element.id == 1){
//         element.firstPrice = firstPrice.required_quantity
//         element.defaultData = defaultOrder.vendor_quantity

//         if(d.length == 0){
//           this.apiRequire.vendor_quantity = defaultOrder.vendor_quantity
//         }
//       }
//       if(element.id == 2){
//         element.firstPrice = firstPrice.vendor_coating_price ? firstPrice.vendor_coating_price : '-'
//         element.defaultData = defaultOrder.vendor_coating_price

//         if(d.length == 0){
//           this.apiRequire.vendor_coating_price = defaultOrder.vendor_coating_price
//         }
//       }
//       if(element.id == 3){
//         element.firstPrice = firstPrice.requested_on
//         element.defaultData = defaultOrder.ETA

//         if(d.length == 0){
//           this.apiRequire.ETA = defaultOrder.before_required_date
//         }
//       }
//       if(element.id == 4){
//         element.firstPrice = firstPrice.payment_terms
//         element.defaultData = defaultOrder.payment_terms

//         if(d.length == 0){
//           this.apiRequire.payment_Terms = defaultOrder.payment_terms

//           if(this.poNegotiate.length > 0){
//             this.paymentTermsSelection(firstPrice.payment_terms)
//           }else{
//             this.paymentTermsSelection(defaultOrder.payment_terms)
//           }
//         }
//       }
//       if(element.id == 5){
//         element.firstPrice = this.Udata
//         element.defaultData = this.Vdata

//         if(d.length == 0){
//           // this.apiRequire.vendor_quantity = defaultOrder.vendor_shipping_date
//         }
//       }
//       if(element.id == 6){
//         element.firstPrice = '-'
//         element.defaultData = '-'
//       }
      
//       if(this.poNegotiate.length == 0){
//         const createdUDate = new Date(firstPrice.created_at);
//         const createdVDate = new Date(defaultOrder.created_at);
  
//         // Extract the date part (YYYY-MM-DD)
//         const dateUPart = createdUDate.toISOString().split('T')[0];
//         const dateVPart = createdVDate.toISOString().split('T')[0];
  
//         // Now datePart will contain the date in the format "YYYY-MM-DD"
//         console.log("date :" + dateUPart);
//         this.Udata =dateUPart;
//         this.Vdata =dateVPart;
//       }
      
//       // negotiated values
//       d.forEach((value:any) => {
//         if(element.id == 10){
//           element.requestId = value.rfq_form_id
//           if(value.user_type == 'vu'){
//             value.user_type = 'Hotel'
//             element.column2.push(value.user_type) 
//           }
//           if(value.user_type == 'ho'){
//             value.user_type = 'Vendor'
//             element.column2.push(value.user_type) 
//           }
//         }
//         if(element.id == 1){
//           element.requestId = value.rfq_form_id
//           element.column2.push(value.vendor_quantity) 
//         }
//         if(element.id == 2){
//           element.requestId = value.rfq_form_id
//           element.column2.push(value.vendor_coating_price) 
//         }
//         if(element.id == 3){
//           element.requestId = value.rfq_form_id
//           element.column2.push(value.ETA) 
//         }
//         if(element.id == 4){
//           element.requestId = value.rfq_form_id
//           element.column2.push(value.payment_Terms) 

//           this.paymentTerms = value.payment_Terms
//           // this.paymentTermsSelection(element.column2[element.column2 - 1])
//         }
//         if(element.id == 5){
//           element.column2.push(value.created_at) 
//         }
//         if(element.id == 6){
//           element.requestId = value.rfq_form_id
//           element.defaultData = ''
//           element.column2.push(value.text_box) 
//           console.log(value.text_box)
//         }
//         if(element.id == 7){
//           element.requestId = value.rfq_form_id
//           element.defaultData = ''
//         }
//       });
//     });

// // Vedor or hotel can edit condition
//     const userType:any = JSON.parse(localStorage.getItem('currentUser') || "[]")
//     this.tableData.forEach((element:any) => {

//       if(element.id == 10){
//         if(userType.user_type == 'vu'){
//           if(element.column2[element.column2.length - 1] == 'Vendor'){
//             this.isVedorEdit(true)
//           }else{
//             this.isVedorEdit(false)
//           }
//         }

//         if(userType.user_type == 'ho'){
//           if(element.column2[element.column2.length - 1] == 'Hotel'){
//             this.isVedorEdit(true)
//           }
//           else{
//             this.isVedorEdit(false)
//           }
//         }
//       }
//       return element
//     })

//     if(d.length == 0){
//       this.isVedorEdit(true)
//       this.isEditLastValue = false
//       // this.isEditLastValueIcon = true
//     }

//     console.log(this.tableData)
//     // if(this.PO_negotiate == 'Renegotiate'){
//     //   this.isVedorEdit(true)
//     // }
//   }

  isVedorEdit(isNegotiateAllowed:boolean){
    this.tableData.forEach((element:any) => {
      element.isUserOrVendor = isNegotiateAllowed
      return element
    })
  }
  
  clocecancelpopup(){
    this.negotiateLoader = false
    this.AppserviceService.error_Toggle(false);
    this.cancelpopup.emit(false);
  }
  
  indexBasedEdit:any = 20
  rowId :any = ''
  editNegotiate(index:any,rowId:any,isEdit:boolean){
    this.isEditLastValue = isEdit
    this.indexBasedEdit = index
    this.rowId = rowId

    this.tableData.forEach((element:any) => {
      if(element.id == 1){
        this.apiRequire.vendor_quantity = element.defaultData
      }
      if(element.id == 2){
        this.apiRequire.vendor_coating_price = element.defaultData
      }
      if(element.id == 3){
        this.apiRequire.ETA = element.defaultData
      }
      if(element.id == 4){
        this.apiRequire.payment_Terms = element.defaultData
      }
    })
  }

  submitNegotiate(data:any){
    console.log(this.tableData)
    console.log(this.poNegotiate)
    this.isNogoSubmitLoader = true 
    this.apiRequire.rfq_form_id = this.negotiateValue.id
    this.apiRequire.payment_Terms = this.paymentTerms
    this.poNegotiate.forEach((elem:any)=>{
      this.apiRequire.vp = elem.vp
    })

    if(this.apiRequire.payment_Terms == null){
      this.apiRequire.payment_Terms = '-'
    }

    this.submitData.emit(this.apiRequire) 
    
    if(this.negotiateValue.type == 'vendor'){
      this.HotelService.vendor_to_user_negotiation(this.apiRequire).subscribe({
        next: (response) => {
          console.log(response)
          // this.tableData.forEach((element:any) => {
          //   element.column2 = []
          // })
          // this.AppserviceService.negotiationReload('reload_negotiation')
          this.isEditableAllBotttons = false   
          this.isNogoSubmitLoader = false
          this.typeNegotiate()
        },
        error: (error) => {
          // Error block   
          this.isNogoSubmitLoader = false 
          this.toast.error({detail:"Error",summary:'Give reason for Negotiation',duration:5000});
        },
      })
    }
    if(this.negotiateValue.type == 'hotel'){
      this.HotelService.user_to_vendor_negotiation(this.apiRequire).subscribe({
        next: (response) => {
          console.log(response)
          // this.tableData.forEach((element:any) => {
          //   element.column2 = []
          // })
          this.AppserviceService.negotiationReload('reload_negotiation')
          this.isEditableAllBotttons = false
          this.isNogoSubmitLoader = false 
          this.typeNegotiate()
          this.toast.success({detail:"Submitted",summary:'Success',duration:5000});
        },
        error: (error) => {
          // Error block      
          this.isNogoSubmitLoader = false 
          this.toast.error({detail:"Error",summary:'Give reason for Negotiation',duration:5000});

        },
      })
    }
    
  }

  negotiateChanges(event:any,column:any){
    if(column.id == 1){
      // column.column2[column.column2.length - 1] = event 
      this.apiRequire.vendor_quantity = event
    }
    if(column.id == 2){
      this.apiRequire.vendor_coating_price = event
    }
    if(column.id == 3){
      this.apiRequire.ETA = event
    }
    if(column.id == 5){
      this.apiRequire.ETA = event
    }
    if(column.id == 6){
      this.apiRequire.reason = event
    }
    console.log(event)
  }

  negotiateUpdate(data:any){
    console.log('data')
    const d = {
      rfq_form_id : this.negotiateValue.id != '' ? this.negotiateValue.id : data.requestId
    }

    // Hotel negotiation accept
    if(this.negotiateValue.type == 'hotel'){
      this.HotelService.negotiation_accept_by_user(d).subscribe((res:any)=>{
        console.log(res)
        this.cancelpopup.emit(false);
        this.AppserviceService.negotiationReload('reload_negotiation')
        this.toast.success({detail:"Submitted",summary:'Success',duration:5000});
      })
    }

    // Vendor negotiation accept
    if(this.negotiateValue.type == 'vendor'){
      this.HotelService.negotiation_accept_by_vendor(d).subscribe((res:any)=>{
        console.log(res)
        this.cancelpopup.emit(false);
        this.toast.success({detail:"Submitted",summary:'Success',duration:5000});
        if(this.PO_negotiate == 'Renegotiate'){
          this.AppserviceService.realoadVendorData('reload')
        }
      })
    }
    
  }

  paymentTermsSelection(value:any){
    this.paymentTerms = value
  }
 
  
}
