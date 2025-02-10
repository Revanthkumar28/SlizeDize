import { Component, OnInit ,Input} from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';
import { data } from 'jquery';



@Component({
  selector: 'b2b-all-documents',
  templateUrl: './all-documents.component.html',
  styleUrls: ['./all-documents.component.css']
})
export class AllDocumentsComponent implements OnInit {
  hotel_name_id:any=''
  user_type :any=''
  selectedButton:any = 'Purchase Request'
  button_name: any = [];
  @Input() vendor_id :any=''
  vendordetails:boolean = false
  view_other_doc:boolean = false
  
  documents_values: any = []
  other_documents:any = []
  invoicedoc:any =[]
  vendordata:any={}
  servisedata:any=[]
  headers:any =[]
  headcolumn:any=''
  headers1: any[] = ['Purachase Order', 'Items in this po ', 'Invoice', 'Delivery Challan', 'Lorry Receipt', 'Warranty','Payment Terms','Vendor Details'];
  headers2: any[] = ['Purachase Order', 'Items in this po ', 'Invoice', 'Delivery Challan', 'Lorry Receipt', 'Warranty','Payment Terms','Hotel Name','Hotel Details'];

  rows: any[][] = [['1006 PO', '10 items', '45987,45988', '1234,1235', '5489 24', '54 GRN 20', '137', '369', 'Welco ABC', '10$', '100', '21-Oct-23','-']];
  serviceheading :any =['Service Request Number','Product Image','Product Name','Vendor Document','Hotel Document','Check','Extra Documents','Total Cost','Payment Terms','Vendor Details']
  expandedTable :any = ['Product Image','Product Name','Purachase Order', 'GRN-Good Received', 'Check copy','Other Doument','Required Quantiy','price per-piece','Received On' ]

  groupOrder_id :any = ''

  tableValues :any = []
  constructor(private HotelService:HotelService,private route: ActivatedRoute,private authService: AuthServiceService, private toast: NgToastService) { }
  isLoggedIn:boolean=false

  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();
    
    this.route.paramMap.subscribe((params) => {
      console.log(params)
      let id = params.get("ids");
      this.hotel_name_id = id
    })
    if(!this.isLoggedIn){
      this.headers = this.headers1
      this.headcolumn = '8*1fr'
      this.button_name = [{'name':'Purchase Request'}]
      this.tableValues = this.demoDocuments()
      this.documents_values = this.demoDocuments()
      console.log(this.tableValues)

    }else{
      this.button_name = [{'name':'Purchase Request'},
                          {'name':'Service Request'}]

      const storedData = localStorage.getItem('currentUser');
      const vendorid = localStorage.getItem('vendorId');
      // this.vendor_id = vendorid
      console.log(this.vendor_id)
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        console.log(parsedData.user_type)
        this.user_type = parsedData.user_type
      }
      if(this.user_type == 'vu'){
        this.headers = this.headers2
        this.headcolumn = '9*1fr'
      }else{
        this.headers = this.headers1
        this.headcolumn = '8*1fr'
  
      }
       this.view_documents()
     
    }
   
  }
  view_documents(){
   if( this.user_type == 'ho' || this.user_type == 'he'){
    const value:any ={
      Hotel_Name_id:this.hotel_name_id
    }
    this.HotelService.Other_document_view(value).subscribe({
      next: (res) => {
      console.log(res)
      if(res.GNR.length > 0 ){
        this.toast.success({ detail: "Success", summary: 'Documents Found', duration: 3000 });

      }else{
        this.toast.error({ detail: "Error", summary: 'No Documents Found', duration: 3000 });

      }

       this.documents_values = res.GNR
       this.other_documents = res.Other_Doc
       this.invoicedoc = res.invoice
       this.documents_values.forEach((element:any)=>{
        element.otherdocuments = []
        element.GRNdocuments =[]
        element.check =[]
        element.invoices =[]
        element.lorry_recepts =[]
        element.delivery_chalans =[]
        element.warrantys =[]
        // element.GRNdocuments.push(element.Gnr_document.split(','))
        res.Gnr_document.forEach((ord:any)=>{
          if(element.id == ord.rfq_from_id){
             element.GRNdocuments.push(ord.Gnr_document.split(','))
          }
        })
        this.other_documents.forEach((ord:any)=>{
          if(element.id == ord.rfq_from_id){
             element.otherdocuments.push(ord.other_document.split(','))
          }
        })
        this.invoicedoc.forEach((ord:any)=>{
          if(element.id == ord.rfq_from_id){
             element.invoices.push(ord.invoice.split(','))
          }
        })
        res.lorry_receipt.forEach((ord:any)=>{
          if(element.id == ord.rfq_from_id){
             element.lorry_recepts.push(ord.lorry_receipt.split(','))
          }
        })
        res.delivery_challan.forEach((ord:any)=>{
          if(element.id == ord.rfq_from_id){
             element.delivery_chalans.push(ord.delivery_challan.split(','))
          }
        })
        res.check_receipt.forEach((ord:any)=>{
          if(element.id == ord.rfq_from_id){
             element.check.push(ord.warranty_card.split(','))
          }
        })
        res.warranty_card.forEach((ord:any)=>{
          if(element.id == ord.rfq_from_id){
             element.warrantys.push(ord.warranty_card.split(','))
          }
        })
         
       })
         console.log(this.documents_values)

       this.tableValues = this.removeDuplicatesByProperty(this.documents_values,'rfq_id')
       console.log(this.tableValues)
       const count = this.brandproductcount(this.tableValues,this.documents_values)
       console.log(count)
      res.service_data.forEach((elem:any)=>{
        elem.vendordocument =[]
        elem.hoteldocument =[]
        elem.check = []
        elem.extradocument =[]
        res.service_document_vendor.forEach((org:any)=>{
          if(elem.id == org.service_requests_id){
            elem.vendordocument.push(org.document.split(','))

          }
        })
        res.service_document_hotel.forEach((org:any)=>{
          if(elem.id == org.service_requests_id){
            if(org.status == '1'){
              elem.hoteldocument.push(org.document.split(','))


            }
            if(org.status == '2'){
              elem.check.push(org.document.split(','))


            }
            if(org.status == '3'){
              elem.extradocument.push(org.document.split(','))


            }
          }
        })
      })
      this.servisedata = res.service_data
      console.log(this.servisedata)

      },
      error: (error) => {
        console.log(error);
        this.toast.error({ detail: "Error", summary: 'No Documents Found', duration: 3000 });
  
      }
     })
    }
    if( this.user_type == 'vu'){
      const value:any ={
        vendor_id : this.vendor_id
      }
      this.HotelService.vendor_other_document_view(value).subscribe({
        next: (res) => {
        console.log(res)
        this.toast.success({ detail: "Success", summary: 'Documents Found', duration: 3000 });

         this.documents_values = res.GNR
         this.other_documents = res.Other_Doc
         this.invoicedoc = res.invoice
         this.documents_values.forEach((element:any)=>{
          element.otherdocuments = []
          element.GRNdocuments =[]
          element.invoices =[]
          element.check = []
          element.lorry_recepts =[]
          element.delivery_chalans =[]
          element.warrantys =[]
          // element.GRNdocuments.push(element.GNR_document.split(','))
          res.Gnr_documet.forEach((ord:any)=>{
            if(element.id == ord.rfq_from_id){
               element.GRNdocuments.push(ord.Gnr_document.split(','))
            }
          })
          this.other_documents.forEach((ord:any)=>{
            if(element.id == ord.rfq_from_id){
               element.otherdocuments.push(ord.other_document.split(','))
            }
          })
          this.invoicedoc.forEach((ord:any)=>{
            if(element.id == ord.rfq_from_id){
               element.invoices.push(ord.invoice.split(','))
            }
          })
          res.lorry_receipt.forEach((ord:any)=>{
            if(element.id == ord.rfq_from_id){
               element.lorry_recepts.push(ord.lorry_receipt.split(','))
            }
          })
          res.check_receipt.forEach((ord:any)=>{
            if(element.id == ord.rfq_from_id){
               element.check.push(ord.warranty_card.split(','))
            }
          })
          res.delivery_challan.forEach((ord:any)=>{
            if(element.id == ord.rfq_from_id){
               element.delivery_chalans.push(ord.delivery_challan.split(','))
            }
          })
          res.warranty_card.forEach((ord:any)=>{
            if(element.id == ord.rfq_from_id){
               element.warrantys.push(ord.warranty_card.split(','))
            }
          })
           
         })
           console.log(this.documents_values)
         this.tableValues = this.removeDuplicatesByProperty(this.documents_values,'rfq_id')
         console.log(this.tableValues)
  
         const count = this.brandproductcount(this.tableValues,this.documents_values)
         res.service_data.forEach((elem:any)=>{
          elem.vendordocument =[]
          elem.hoteldocument =[]
          elem.check = []
          elem.extradocument =[]
          res.service_document_vendor.forEach((org:any)=>{
            if(elem.id == org.service_requests_id){
              elem.vendordocument.push(org.document.split(','))
  
            }
          })
          res.service_document_hotel.forEach((org:any)=>{
            if(elem.id == org.service_requests_id){
              if(org.status == '1'){
                elem.hoteldocument.push(org.document.split(','))
  
  
              }
              if(org.status == '2'){
                elem.check.push(org.document.split(','))
  
  
              }
              if(org.status == '3'){
                elem.extradocument.push(org.document.split(','))
  
  
              }
            }
          })
        })
        this.servisedata = res.service_data
        console.log(this.servisedata)
        },
        error: (error) => {
          console.log(error);
          this.toast.error({ detail: "Error", summary: 'No Documents Found', duration: 3000 });
    
        }
       })
      }
  }
   tableExpand(event:any){
    this.groupOrder_id = event
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

    vendor_details(data:any, tab:any){
     
      console.log(data)
      this.vendordata =data
      this.vendordetails = true
    }
    close(){
      this.vendordetails = false
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
    buttonclicked(buttonName:any){
      this.selectedButton = buttonName;
      console.log(buttonName)
    }

    showError(){
      this.toast.error({ detail: "Error", summary: 'No Documents Found', duration: 3000 });

    }
    demoDocuments(){
      const demoarray:any=[{
        rfq_id:"64737dget7736",
        count:"1",
        payment_terms:"Net 0",
        invoices:[],
        delivery_chalans:[],
        lorry_recepts:[],
        GRNdocuments:[],
        check:[],
        warrantys:[],
        products:[],
        otherdocuments:[],
        vendor_quantity:"11",
        vendor_coating_price:"123",
        ETA:"27-Sep-2024",
        vendor_products:[{
          product_image: "assets/chair.jpg",
          name:'chair'
        }],
        vp :'1'

        

      }]
      return demoarray 
    }
}