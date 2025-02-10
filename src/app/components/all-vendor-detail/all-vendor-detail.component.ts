import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';

@Component({
  selector: 'b2b-all-vendor-detail',
  templateUrl: './all-vendor-detail.component.html',
  styleUrls: ['./all-vendor-detail.component.css']
})
export class AllVendorDetailComponent implements OnInit {
  vendor: any = []
  arr: any = []
  vendorDetails: any = []
  teporaryVendorId: any = ''

  buttons: Record<string, string>[] = [
    { "name": "VENDORS", "active": "false" },
    { "name": "NAME", "active": "true" },
    { "name": "RATING", "active": "true" },
    { "name": "STATUS", "active": "true" },
    { "name": "REMARKS", "active": "true" }];
  @Input() clickPlus: boolean = true
  @Input() padding: any = ''
  @Input() submitButon: boolean = false
  @Input() continueButton: boolean = true
  @Input() ISDO :any = ''
  
  isOpen: boolean = false
  checked: boolean = false
  quationtable: boolean = true
  producrPlus: boolean = false
  total: any = 0;
  selectedItemId: number | null = null; // You can use any type for your id
   
  @Input() quationTable: any = [

    {
      id: 1,
      badge: 'border:3px solid var(--color-toggle-background);border-radius:40px;margin:0 10px 0 0',
      peffered_Supplier:
        [
          {
            heading: 'background:var(--color-green)',
            "name": "Preferred Supplier By Brand"
          },
        ],
      count1: 0,
      tp: 0,
      list1: []

    },
    {
      id: 2,
      vendorColumn : [],
      badge: 'border:3px solid var(--color-primary);border-radius:40px;margin:0 10px 0 0',
      peffered_Supplier:
        [
          {
            heading: 'background:var(--color-primary)',
            badge: 'border:2px solid var(--color-primary);border-radius:40px;margin:0 10px 0 0',
            "name": "Primary Supplier",
          },
        ],
      count1: 0,
      tp: 0,

      list1: [

      ]

    },
    {
      id: 3,
      vendorColumn : [],
      badge: 'border:3px solid var( --color-marketplace-accent);border-radius:40px;margin:0 10px 0 0',
      peffered_Supplier:
        [
          {
            heading: 'background:var( --color-marketplace-accent)',
            "name": "Low Maintanence Supplier",
          },
        ],
      count1: 0,
      tp: 0,

      list1: []

    },
    {
      id: 4,
      vendorColumn : [],
      badge: 'border:3px solid var(--color-dark-grey);border-radius:40px;margin:0 10px 0 0',
      peffered_Supplier:
        [
          {
            heading: 'background:var( --color-dark-grey)',
            "name": "Secondary Supplier"
          },
        ],
      count1: 0,
      tp: 0,

      list1: []

    },



  ]
  tableHeading: string[] = ["Preferred Vendars", "Name", "Rating", "Status", "Vendar Remarks"];
  tableColumnSpacing = "1*0.1fr 4*0.1fr";
  // tableColumnSpacing ="1*minmax(84px,0.2fr)"
  columnSpacing = '4*2fr 1*1fr'
  deatails: any = ''
  request: any = ''
  delivery_date: any = ''
  rfq: any = "2012"
  selectedButton: any = ''
  expandedId: any = ''
  vendarTable: any = ''
  next: any = ''
  badge: any = ''
  heading: any = ''
  WelcoInternational: any = 'Welco International'

  productId: any = ''
  productType :any = ''

  @Output() dataEvent = new EventEmitter();
  RequstGetId :any = {
    hotelNameId : '',
    product_id :''
  }

  @Input() catlog_creations_id :any = ''
  typeBasedVendor :any = []
  low_maintanence_suppller:any = []
  secondary_suppller :any = []
  checkvp:any=''
  vendorFilter:any = {
    companyName : ''
  }
  constructor(private router: Router, private route: ActivatedRoute, private AppserviceService: AppserviceService, private HotelService: HotelService,private toast: NgToastService,private authService: AuthServiceService) {

  }
  isLoggedIn:boolean=false
  filtered_vendor_id:any=''
  navbar:any=''
  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();

    console.log(this.ISDO)
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get("expanded");
      this.productType = params.get("productType");
      let expanded = params.get("expanded");
      let ids = params.get("ids");
     this.navbar = params.get("nav");

      if (expanded) {
        this.RequstGetId.product_id = expanded
      }
    
      if (ids) {
        this.RequstGetId.hotelNameId = ids
      }
    })
    if(this.navbar != 'All Vendors'){
      this.AppserviceService.rfqdataSubscribe$.subscribe((d:any)=> {
        if(d){
          this.filtered_vendor_id =''
          console.log(d.vendor_id)
          this.filtered_vendor_id =d.vendor_id
  
        }
        
      })    
    }
   
    // this.hotelVendorList()
    this.AppserviceService.reloadVendor$.subscribe((d:any)=> {
         this.isLoggedIn ?  this.hotelVendorList() : this.hotelVendorList2()
    })    

   
    
    // FIND VENDOR DETAILS ...
    // this.teporaryVendorId = JSON.parse(localStorage.getItem('teporaryVendorId') || "[]")
    // this.HotelService.vendor_details().subscribe((d: any) => {
    //   this.vendor = d
    //   console.log(this.vendor)
    //     ,
    //     (error: any) => {
    //       console.log(error)
    //     }
    // })

    //VENDOR DETAILS , CATALOAG TABLE COPONENTS
    this.AppserviceService.vendorBrandProducts$.subscribe((vendor: any) => {
      this.catlog_creations_id = vendor.catlog_creations_id
    })

    console.log(this.quationTable)

    // rfq-order component
    this.AppserviceService.VendorTotal(0)
  }

  empty_vendors_all_column(){
    this.quationTable.forEach((primary: any) => {
      // if (primary.id != 1) {
        primary.list1 = []
      // }
    });
  }

  vendorDropDownEmpty(){
    this.quationTable.forEach((primary: any) => {
        primary.vendorColumn = []
    });
  }

  tempVendor:any = []
  hotelVendorList(){
    this.HotelService.brand_vendor_data(this.RequstGetId).subscribe((d: any) => {
      console.log(d)
      this.empty_vendors_all_column()
      this.vendorDropDownEmpty()
      if(d.temp_vendors){
        this.quationTable.forEach((org:any)=>{
          org.tp = 1
        })
      }
    if (d.vendors.length > 0){
        this.vendorDetails = d.vendors
      }
      const uniqueIds = new Set();
      let newvendor:any =[]
      // Check for duplicates and filter out unique vendors
      if(d.hotel_vendors.length >0 ){
        const filteredArr1 = d.hotel_vendors.filter((obj1:any) => 
          !this.vendorDetails.some((obj2:any) => 
            obj1.id === obj2.id 
          )
        );
        filteredArr1.forEach((data:any)=>{
        if(data.po_access > 0){
          newvendor.push(data)
        }
      })
     }
      console.log(newvendor)
      const ven:any = newvendor
      this.tempVendor = d.hotel_vendors.filter((vendor:any) => {
      if (uniqueIds.has(vendor.id)) {
        // Duplicate id found
        return false;
      }
      // Add the id to the set to keep track of it
      uniqueIds.add(vendor.id);
      // Not a duplicate, keep this vendor
      return true;
    });
    
    // const tempVendor = d.hotel_vendors
    this.typeBasedVendor = d.primary_suppller != 'null' ? d.primary_suppller.map((item:any) => item.vendor_id) : []
    this.low_maintanence_suppller = d.low_maintanence_suppller != 'null' ? d.low_maintanence_suppller.map((item:any) => item.vendor_id) : []
    this.secondary_suppller = d.secondary_suppller != 'null' ? d.secondary_suppller.map((item:any) => item.vendor_id) : []
    console.log(this.typeBasedVendor)

    this.vendorDetails.forEach((element: any) => {
        this.quationTable.forEach((primary: any) => {
          if (primary.id == 1) {
            primary.list1.push(element)
          }
        });
      });

      // VENDOR COLUMNS PRIMARY, SCOUNDARY,LOW MAINTANENCE
      this.quationTable.forEach((primary: any) => {
        // PRIMARY SUBLIEAR
        if (primary.id == 2) {
          let bind:any = {}
          ven.forEach((element:any) => {
            element.columnId = 2
            // bind = this.vendorDetails.find((res:any) => res.vendor_id == element.vendor_id)
            // console.log(element.vendor_id)
            // PRODUCT PRIMARY VENDOR ID 
            this.typeBasedVendor.forEach((ids:any) => {
              if(ids == element.vendor_id){
                element.ischecked = true
              }
            });

            element.companyName = element.companyName != null ? element.companyName : '0',
            primary.vendorColumn.push(element)
          });

          primary.list1 = this.mergeVondor_Catagories(this.tempVendor,this.typeBasedVendor,2)
        }

        // LOW MAINTANENCE SUPLIER
        if(primary.id == 3) {
          ven.forEach((element:any) => {
            element.columnId = 2
            // PRODUCT LOWMAINTANENCE VENDOR ID 
              primary.vendorColumn.push(
                {
                  companyName: element.companyName != null ? element.companyName : '0',
                  vendor_id: element.vendor_id,
                  ischecked : this.low_maintanence_suppller.some((vendID: any) => vendID === element.vendor_id)
                }
              )          
          });

          primary.list1 = this.mergeVondor_Catagories(this.tempVendor,this.low_maintanence_suppller,3)
        }

        // SCONDARY SUBLIER .......
        if(primary.id == 4) {
          ven.forEach((element:any) => {
            element.columnId = 3
            // PRODUCT LOWMAINTANENCE VENDOR ID 
              primary.vendorColumn.push(
                {
                  companyName: element.companyName != null ? element.companyName : '0',
                  vendor_id: element.vendor_id,
                  ischecked : this.secondary_suppller.some((vendID: any) => vendID === element.vendor_id)
                }
              )                      
          });

          primary.list1 = this.mergeVondor_Catagories(this.tempVendor,this.secondary_suppller,4)
        }
      });
      console.log(this.quationTable)
    })
   
  }
  hotelVendorList2(){
    this.AppserviceService.demoVendors$.subscribe(d => {
      console.log(d)
      if(this.filtered_vendor_id != ''){
        this.vendorDetails = d.vendor.filter((org:any)=>this.filtered_vendor_id == org.vendor_id)
      }else{
        this.vendorDetails = d.vendor

      }
      this.empty_vendors_all_column()
      this.vendorDropDownEmpty()
      this.quationTable.forEach((org:any)=>{
           if(org.id == 1){
            this.vendorDetails.forEach((data:any)=>{
                data.companyName = data.vendor_company
                org.list1.push(data)
              
             
            })
           }
      })
      console.log(this.quationTable)
      this.filtered_vendor_id = ''

    })
  }
  // MERGED VENDOR DETAILS
  mergeVondor_Catagories(vendorDetails:any,productVendor_id:any,columnId:any){
    const vendors:any = []
    productVendor_id.forEach((vendorId:any) => {
      vendorDetails.forEach((details:any) => {
        if(vendorId == details.vendor_id){
          vendors.push(details) 
        }
      });
    });

    return vendors
  }

  // CHECKED VENDOR COUMN TRUE VENDORS
  columnWiseVendChecked(cloumnId:any,exist_vendor:any){
    console.log(this.typeBasedVendor)
    console.log(exist_vendor)

    if(cloumnId == 2 && this.typeBasedVendor.length > 0){
      this.typeBasedVendor.forEach((vendor_id:any) => {
        let vendor = exist_vendor.find((ven:any) => ven.vendor_id == vendor_id)
        vendor.ischecked = true
      });
      // exist_vendor.forEach((element:any) => {
      //   if(this.typeBasedVendor.length > 0){
      //     this.typeBasedVendor.forEach((vendor_id:any) => {
      //       if(vendor_id == element.vendor_id){
      //         element.ischecked = true
      //       }else{
      //         element.ischecked = false
      //       }
      //     });
      //   }else{
      //     element.ischecked = false
      //   }
        
      // });
    }

    if(cloumnId == 3 && this.low_maintanence_suppller.length > 0){
      this.low_maintanence_suppller.forEach((vendor_id:any) => {
        let vendor = exist_vendor.find((ven:any) => ven.vendor_id == vendor_id)
        vendor.ischecked = true
      });

      // exist_vendor.forEach((element:any) => {
      //   if(this.low_maintanence_suppller.length > 0){
      //     this.low_maintanence_suppller.forEach((vendor_id:any) => {
      //       if(vendor_id == element.vendor_id){
      //         element.ischecked = true
      //       }else{
      //         element.ischecked = false
      //       }
      //     });
      //   }else{
      //     element.ischecked = false
      //   }
        
      // });
    }

    // SCOUNDARY SUBBLIER
    if(cloumnId == 4 && this.secondary_suppller.length > 0){
      this.secondary_suppller.forEach((vendor_id:any) => {
        let vendor = exist_vendor.find((ven:any) => ven.vendor_id == vendor_id)
        vendor.ischecked = true
      });

      // exist_vendor.forEach((element:any) => {
      //   if(this.secondary_suppller.length > 0){
      //     this.secondary_suppller.forEach((vendor_id:any) => {
      //       if(vendor_id == element.vendor_id){
      //         element.ischecked = true
      //       }else{
      //         element.ischecked = false
      //       }
      //     });
      //   }else{
      //     element.ischecked = false
      //   }
        
      // });
    }
  }

  // SUBMIT SELECT VENDORS IN PRIMARY<SECOUNDARY COLUMN
  selectedVendor(supplierId:any,orders:any){
    console.log(orders)
    console.log(this.quationTable)
    console.log(supplierId)
   
    // const primary: any[] = this.quationTable.filter((is:any) => is.id == 2).map((element:any) => element.vendor_id);
    let primary: any[] = this.quationTable.find((item:any) => item.id === 2).vendorColumn.filter((item:any) => item.ischecked === true).map((re:any) => re.vendor_id);
    let lowMaintanence: any[] = this.quationTable.find((item:any) => item.id === 3).vendorColumn.filter((item:any) => item.ischecked === true).map((re:any) => re.vendor_id);
    let scoundary: any[] = this.quationTable.find((item:any) => item.id === 4).vendorColumn.filter((item:any) => item.ischecked === true).map((re:any) => re.vendor_id);

    if (supplierId == 2) {
      lowMaintanence = lowMaintanence.filter(item => !primary.includes(item) && !scoundary.includes(item));
      scoundary = scoundary.filter(item => !lowMaintanence.includes(item) && !primary.includes(item));

      this.low_maintanence_suppller = lowMaintanence
    }
    
    if (supplierId == 3) {
      primary = primary.filter(item => !lowMaintanence.includes(item) && !scoundary.includes(item));
      scoundary = scoundary.filter(item => !lowMaintanence.includes(item) && !primary.includes(item));
      this.typeBasedVendor = primary
    }
    
    if (supplierId == 4) {
      // scoundary = scoundary.filter(item => !lowMaintanence.includes(item) && !primary.includes(item));
      lowMaintanence = lowMaintanence.filter(item => !primary.includes(item) && !scoundary.includes(item));
      primary = primary.filter(item => !lowMaintanence.includes(item) && !scoundary.includes(item));

      this.secondary_suppller = scoundary
    }

    console.log(primary)
    const payload = {
      primary_suppller : primary,
      secondary_suppller : scoundary ,
      low_maintanence_suppller : lowMaintanence,
      id :orders.tp == 1 ?  this.productId :this.catlog_creations_id

    }
    if(orders.tp == 1){
      this.HotelService.suppller_add_tempery(payload).subscribe((res:any) =>{
        //  WANT TO CHANGE API RELOAD < NOW ITS WORK LOCAL FILE
        let filter:any = []
        this.quationTable.forEach((primary:any) => {
          if(supplierId == primary.id){
            filter = primary.vendorColumn.filter((res:any) => res.ischecked == true)
            primary.list1 = filter
          }
        });
  
        this.quationTable.forEach((primary_:any) => {
          if(supplierId != primary_.id){
            primary_.list1 = primary_.list1.filter((item:any) => !filter.some((item1:any) => item1.vendor_id == item.vendor_id));
          } 
          if(supplierId == primary_.id){
            filter = primary_.vendorColumn.filter((res:any) => res.ischecked == true)
            primary_.list1 = filter
          }
        });
        
      })
    }else{
      this.HotelService.suppller_add(payload).subscribe((res:any) =>{
        //  WANT TO CHANGE API RELOAD < NOW ITS WORK LOCAL FILE
        let filter:any = []
        this.quationTable.forEach((primary:any) => {
          if(supplierId == primary.id){
            filter = primary.vendorColumn.filter((res:any) => res.ischecked == true)
            primary.list1 = filter
          }
        });
  
        this.quationTable.forEach((primary_:any) => {
          if(supplierId != primary_.id){
            primary_.list1 = primary_.list1.filter((item:any) => !filter.some((item1:any) => item1.vendor_id == item.vendor_id));
          } 
          if(supplierId == primary_.id){
            filter = primary_.vendorColumn.filter((res:any) => res.ischecked == true)
            primary_.list1 = filter
          }
        });
        
      })
    }
   
    this.AppserviceService.reloadData('reload_readyforpay')
    console.log('done')
  }

  // CHECKBOX VALUE GET VENDOR SELECT
  vendorSelected:any = []
  selectVendor(event:any,vendorDetails:any,columnId:any){

    this.quationTable.forEach((primary:any) => {
      if(primary.id === columnId){
        primary.vendorColumn.forEach((vend:any) => {
          if(vend.vendor_id == vendorDetails.vendor_id){
            vend.ischecked = event.target.checked
          }
        });
      }
    });

    console.log(this.quationTable)
  }

  buttonClicked(buttonName: string) {
    if (buttonName) {
      for (let i of this.buttons) {
        if (i["name"] == buttonName) {
          i["active"] = "true";
        }
        else {
          i["active"] = "true";
        }
      }
    }
  }

  remove_1(event: any) {
    this.isOpen = event

  }

  add() {
    this.producrPlus = !this.producrPlus
  }

  check(id: any, event: any, data: any,columnId:any) {
    event.stopPropagation();
    this.arr = []
    if (this.selectedItemId === id) {
      this.selectedItemId = null; // Uncheck the checkbox if it was already checked
    } else {
      this.selectedItemId = id; // Check the clicked checkbox
    } 
    this.AppserviceService.vendortotalSubscribe$.subscribe((a: any) => {
      if(a == 0){
        this.quationTable.forEach((element: any) => {
          element.list1.forEach((a: any) => {
              a.ischecked = false
          });
        })
      }

    })

    this.quationTable.forEach((element: any) => {
      element.list1.forEach((a: any) => {
        if (columnId == element.id) {
          if (id == a.id) {
            return a.ischecked = event.target.checked
          }
        }
      });
    })
    this.total = 0;

    this.quationTable.forEach((element: any) => {
      element.list1.forEach((b: any) => {
        if (b.ischecked == true) {
          this.total++
          this.arr.push(b)
        }
      });
    })
    
    this.dataEvent.emit(this.arr);
    
    // rfq-order component
    this.AppserviceService.VendorTotal(this.total)

    this.vendor.forEach((element: any) => {
      console.log(element)
    })

    console.log(this.arr)
    console.log(this.quationTable)

  }

  edit(data: any) {
    this.AppserviceService.cancelProducForm('editOpen')
    localStorage.setItem('editVendorDetails', JSON.stringify(data));
  }
  copyNumberToClipboard(number: number): void {
    const str = number.toString();
    navigator.clipboard.writeText(str)
        .then(() => {
            console.log('Number copied to clipboard successfully!');
            this.toast.success({ detail: "SUCCESS", summary: 'Number copied to clipboard successfully', duration: 3000 });

        })
        .catch(err => {
            console.error('Failed to copy the number to clipboard: ', err);
            this.toast.error({ detail: "Error", summary: 'Failed to copy the number to clipboard', duration: 3000 });

        });
}


}