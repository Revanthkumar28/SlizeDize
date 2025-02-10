import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { vendorDetails,infromationDetails,RegistrationDetails } from 'src/app/models/interfaces';
import { BehaviorSubject} from 'rxjs';

import { environment } from 'src/environments/environment.dev';

const apiUrl = environment.apiUrl;
const linkurl = environment.linkUrl
const s3Bucket = environment.s3Bucket;

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  sub : Subject<any>;
  ezeebiapi:any = ""
  projectdemo:any = apiUrl

  constructor(private httpclient: HttpClient) {
    this.sub = new Subject<any>();
  }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Accept': 'text/event-stream'
    })
  };

    sendData(data:any){
      this.sub.next(data);
    }
    //Project URL
    projecturl(){
       return linkurl; 
    }
    
   postFile(data:any){
    return this.httpclient.post(this.projectdemo + "/uplode_logo", data, {headers: new HttpHeaders({
      'Content-type': 'multipart/form-data',
    })});
  }

  uplode_logo(data:any){
    return this.httpclient.post(this.projectdemo + "/uplode_logo", data);
  }
  
  getImage(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/logo", {headers: this.httpOptions.headers})
  }

  notification_SSE() {
    return this.projectdemo + '/sse-updates-s'
  }

  getDetails(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/user_catlog_creation", {headers: this.httpOptions.headers})
  }

  register(hotelRegister:any): any{
    return hotelRegister;
  }
  // CHANGES -----------

  s3Images(): any{
    return s3Bucket;
  }

  // NOTIFICATION ...............
  notification(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/notification", {headers: this.httpOptions.headers})
  }

  delete_notification(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/delete_notification", data)
  }
  // NOTIFICATION ...............

  corporate_brand(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/corporate_brand", {headers: this.httpOptions.headers})
  }

  hotel_brand(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotel_brand",data, {headers: this.httpOptions.headers})
  }

  hotelImage(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotelImage",data)
  }

  style_sheme(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/style_scheme" ,data)
  }

  hotel_room(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotel_room", data)
  }

  user_name(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/name", {headers: this.httpOptions.headers})
  }
  
  // setIntervalUpdates(): Observable<any>{
  //   const headers = new HttpHeaders({
  //     'Accept': 'text/event-stream',
  //     'Connection': 'keep-alive'
  //   });
  //   return this.httpclient.get<any>(this.projectdemo + "/ssse-updates", {headers})
  // }
  
  brandBy_data(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/api_data",data)
  }

  get_product_data(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/get_productes")
  }

  brand_product(hotelRegister:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/compare_hotel_brand",hotelRegister)
  }

  hotelRegisteration(hotelRegister:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotelRegisteration",hotelRegister)
  }
  bussinessDetails(bussinessDetails:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/bussinessDetails",bussinessDetails)
  }

  businessCatalogAndHotelDetails(bussinessDetails:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/businessCatalogAndHotelDetails",bussinessDetails)
  }

  catalogCreation(catalog:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/catalogCreation",catalog)
  }

  hotel_delete(catalog:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotel_delete",catalog)
  }
  
  edit_data(catalog:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/edit_data",catalog)
  }

  hotel_room_image_mapping(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/hotel_room_image_mapping" ,{headers: this.httpOptions.headers})
  }

  image_mapping_data(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/image_mapping_data", data)
  }

  image_mapping_pass(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/image_mapping_pass",data)
  }
  vendor_details(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/find_Vendor" , {headers: this.httpOptions.headers})
  }
  vendor_register(vendorregister:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/vendor_register",vendorregister)
  }

  edit_temporary_vendor(vendorregister:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/edit_temporary_vendor",vendorregister)
  }

  PurchaseRequestSwitch_rfq_view(req:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/PurchaseRequest_user_to_switch_rfq_view",req)
  }
  PurchaseRequestSwitch_diractorder_view(req:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/PurchaseRequest_user_to_switch_diractorder_view",req)
  }
  PurchaseRequestSwitch_diractorder(PurchaseRequest:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/PurchaseRequest_user_to_switch_diractorder",PurchaseRequest)
  }
  PurchaseRequesSwitch_rfq(PurchaseRequest:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/PurchaseRequest_user_to_switch_rfq",PurchaseRequest)
  }
  PurchaseRequest_form(PurchaseRequest:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/PurchaseRequest_form",PurchaseRequest)
  }
  serviceRequest(servicerequest:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/serviceRequest",servicerequest)
  }

  service(servicerequest:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/service",servicerequest)
  }


  send_vendor(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/PurchaseRequest_form_update" ,data)
  }
  schedule_send_now(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/schedule_send_now" ,data)
  }

  placement_send(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/placement" ,data)
  }

  clone(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/clone" ,data)
  }

  // Get ...............................

  clone_product(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/clone_product_data" ,{headers: this.httpOptions.headers})
  }

  catalogCreation_product(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/catalogCreation_product" ,data)
  }

  ESG(): Observable<any>{
    return this.httpclient.get<any>(this.ezeebiapi + "/esg" ,{headers: this.httpOptions.headers})
  }
  hotel_wide_usage(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotel_wild_usage" ,data)
   }

   order_frequency(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/order_frequency" ,data)
   }

  //  temporary product

   add_temporary_product(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/add_temporary_product" ,data)
   }

   delete_temporary_product(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/delete_temporary_product" ,data)
   }

   edit_temporary_product(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/edit_temporary_product" ,data)
   }

   user_adding_custom_hotel(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/user_adding_custom_hotel" ,data)
   }

   view_temporary_product(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/view_temporary_product" ,{headers: this.httpOptions.headers})
  }

  // catalogdelete(data:any): Observable<any>{
  //   return this.httpclient.post<any>(this.projectdemo + "/catalogdelete" ,data)
  //  }

   edit_hotel(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotel_data" ,data)
   }

   catalogCreationUnselectedProducts(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/catalogCreationUnselectedProducts" ,data)
   }

   update_hotel(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/update_hotel" ,data)
   }

   delete_hotel(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/delete_hotel" ,data)
   }

   hotelProductDeleteAndAdd(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotelProductDeleteAndAdd" ,data)
   }

   hotelProductRemove(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotelProductRemove" ,data)
   }

   add_edit_products(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/add_edit_products" ,data)
   }

   user_catlog_creation_brand(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/user_catlog_creation_brand" ,data)
  }

  user_catlog_creation_custom_brand(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/user_catlog_creation_custom_brand" ,{headers: this.httpOptions.headers})
  }

  // for products
  
  style_scheme_custom_brand(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/style_scheme_custom_brand" ,{headers: this.httpOptions.headers})
  }

  upload_custom_brand_image(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/upload_custom_brand_image" ,data)
   }


   drop_down_values(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/drop_down_values" ,{headers: this.httpOptions.headers})
  }

  drop_down_values_for_vendor(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/drop_down_values_for_vendor" ,{headers: this.httpOptions.headers})
  }

  // payment terms

  payment_terms(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/payment_terms" ,data)
   }

  // schedule_oder api
  schedule_oder(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/schedule_oder" ,data)
  }

  // user to send vendor rfq .........
  
  user_to_vendor_order(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/user_to_vendor_order" ,data)
   }
  // user to send vendor rfq ...........
  negotiation_accept_by_user(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/negotiation_accept_by_user" ,data)
   }

   negotiation_accept_by_vendor(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/negotiation_accept_by_vendor" ,data)
   }

  // delete 

  delete_products(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/delete_products" ,data)
   }



  //  vendor API 

  vendor_rfq(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/vendor_rfq" ,{headers: this.httpOptions.headers})
  }

  vendor_catlog(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/vendor_catlog" ,{headers: this.httpOptions.headers})
  }

  PurchaseRequest_form_for_vendor(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/PurchaseRequest_form_for_vendor" ,data)
   }

   rfq_from_vendor(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/rfq_from_vendor" ,data)
   }
   check_vendor(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/check_vendor" ,data)
   }

   vendor_to_hotel(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/vendor_to_hotel" ,data)
   }

  //  vendor quoted price -- is used in  --- status-order-table.component
  vendor_to_user(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/vendor_to_user" ,data)
   }
   brand_vendor_data(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/brand_vendor_data" ,data)
   }

  PurchaseRequest_form_for_vendor_muilty(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/PurchaseRequest_form_for_vendor_muilty" ,data)
   }

  direct_order_form_for_vendor_muilty(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/direct_order_form_for_vendor_muilty" ,data)
  }

  diractorder_from_vendor(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/diractorder_from_vendor" ,data)
  }
  //  vendor screen 

  vendor_pending_order_edit(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/vendor_pending_order_edit" ,data)
   } 

   purchase_intelligent(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/purchase_intelligent" ,data)
   } 

  //  SMS for temporary vendor
  temp_vendor_message(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/temp_vendor_message" ,data)
  }

  diractorder(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/diractorder" ,data)
  }

  user_and_vendor_negotiation(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/user_and_vendor_negotiation" ,data)
  }


  //  Negotiation ..........

  user_to_vendor_negotiation(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/user_to_vendor_negotiation" ,data)
  }
  vendor_to_user_negotiation(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/vendor_to_user_negotiation" ,data)
  }

  vendor_to_user_negotiation_view(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/vendor_to_user_negotiation_view" ,data)
  }
  user_to_vendor_negotiation_view(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/user_to_vendor_negotiation_view" ,data)
  }
  diractorder_cancelled(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/diractorder_cancelled" ,data)
  }

  user_to_vendor_negotiation_pr(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/user_to_vendor_negotiation_pr" ,data)
  }

  // Hote Scheduled Time 
  hotel_time(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotel_time" ,data)
  }
  //dropdown values for add_vendor_product
  product_data(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/product_data", {headers: this.httpOptions.headers})
  }
  //add_product_vendor
  add_new_vendor_product(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/add_new_vendor_product" ,data)
  }
  //direct_order_grpby
  PurchaseRequest_user_to_switch_diractorder_muilty_view(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/PurchaseRequest_user_to_switch_diractorder_muilty_view" ,data)
  }

  // SHOW VENDOR DATA FOR EDIT
  show_vendor_date(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/show_vendor_date" ,data)
  }

  edit_vendor_product(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/edit_vendor_product" ,data)
  }
  //schedule_order for RFQ
  user_to_vendor_schedule_order(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/user_to_vendor_schedule_order" ,data)
  }
  //add profile vendor
  vendor_profile_update(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/vendor_profile_update" ,data)
  }

  user_profile_update(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/user_profile_update" ,data)
  }
  //rfq quotation
  generatepdf(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/generatepdf", data, { responseType: 'arraybuffer' });
  }
  //invoice
  invoice_Pdf(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/invoice_Pdf", data, { responseType: 'arraybuffer' });
  }

  order_received(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/order_received", data);
  }
  
  order_from_discrepancy_ready_to_pay(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/order_from_discrepancy_ready_to_pay", data);
  }

  diractorder_vendor_negotiation(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/diractorder_vendor_negotiation", data);
  }
  pipeline_reject(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/pipeline_reject", data);
  }
  
  vendor_logo(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/vendor_logo", {headers: this.httpOptions.headers})
  }
  rejected_reorder(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/rejected_reorder", data);
  }
  reorder(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/reorder", data);
  }
  Other_document_view(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/Other_document_view", data);
  }
  Other_document_upload(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/Other_document_upload", data);
  }
//profile
  user(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/user", {headers: this.httpOptions.headers})
  }
  //Move_to_completeOrder
  completed_order_hotel(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/completed_order_hotel", data);
  }
  //show_to_completeOrder
  complte_order_hotel_data(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/complte_order_hotel_data", data);
  }
  //direct order send
  hotel_diractorder_cancelled(data: any): Observable<any> {
      return this.httpclient.post(this.projectdemo + "/hotel_diractorder_cancelled", data);
    }
  //view all documents vendor
  vendor_other_document_view(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/vendor_other_document_view", data);
  }
  //under process reject
  underprocess_cancel(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/underprocess_cancel", data);
  }
  // renegotiate reject
  renegotiate_rejected(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/renegotiate_rejected", data);
  }

  // budget
  // budgets_for_hotel(data: any): Observable<any> {
  //   return this.httpclient.post(this.projectdemo + "/budgets_for_hotel", data);
  // }


  add_departments(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/add_departments", data);
  }

  list_departments(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/list_departments", data);
  }

  hotel_budget_view(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/hotel_budget_view", data);
  }
  hotel_budget_edit(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/hotel_budget_edit", data);
  }

  next_year_budget_creation(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/next_year_budget_creation", data);
  }


  // budget
  budgets_for_hotel(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/budgets_for_hotel", data);
  }
  //pending payment
  all_due_date(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/all_due_date", data);
  }
  //vendor approval for payment
  completed_order_approved_by_vendor(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/completed_order_approved_by_vendor", data);
  }
  //revoke option for vendor
  vendor_rework(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/vendor_rework", data);
  }
   //revoke option for Hotel
   hotel_rework(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/hotel_rework", data);
  }
  //delete vendor product
  delete_vondor_product(id:any): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/delete_vondor_product" + "/" + id , {headers: this.httpOptions.headers})
  }
  //procurement life cycle
  procurement_stage(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/procurement_stage", data);
  }

  all_hotel_department_designation(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/all_hotel_department_designation", {headers: this.httpOptions.headers})
  }

  edit_hotel_screen(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/edit_hotel_screen", data);
  }
//view all hotel
  hotel_for_user(data: any): Observable<any> {
  return this.httpclient.post(this.projectdemo + "/hotel_for_user", data);
  }
  //myconnections
  reporting_for_hotel(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/reporting_for_hotel", data);
    }

  approve_order_by_finance_manager(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/approve_order_by_finance_manager", data);
  }

  vendor_trigger(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/vendor_trigger", data);
  }
  //  Negotiation ..........

  //  vendor screen order tracking processs in navbar
  // order_loading(data:any): Observable<any>{
  //   return this.httpclient.post<any>(this.projectdemo + "/order_loading" ,data)
  // }

  // order_Picked(data:any): Observable<any>{
  //   return this.httpclient.post<any>(this.projectdemo + "/order_Picked" ,data)
  // }
  
  // order_transit(data:any): Observable<any>{
  //   return this.httpclient.post<any>(this.projectdemo + "/order_transit" ,data)
  // }
  
  // order_reached_destination(data:any): Observable<any>{
  //   return this.httpclient.post<any>(this.projectdemo + "/order_reached_destination" ,data)
  // }
  
  // order_delivery(data:any): Observable<any>{
  //   return this.httpclient.post<any>(this.projectdemo + "/order_delivery" ,data)
  // }
  
  // order_received(data:any): Observable<any>{
  //   return this.httpclient.post<any>(this.projectdemo + "/order_received" ,data)
  // }

  // order_distributed(data:any): Observable<any>{
  //   return this.httpclient.post<any>(this.projectdemo + "/order_distributed" ,data)
  // }

  //  vendor screen order tracking processs in navbar



  // dynamic api integration

  connectAPI(type:any, methodName:any, payload=""): Observable<any>{
    let url = this.projectdemo + "" + methodName;

    if (type === "GET") {
      return this.get(url);
    } else if (type === "POST") {
      return this.post(url, payload);
    } else {
      // Return a dummy Observable or handle other cases as needed
      return new Observable<any>();
    }
  }

  get(url:any): Observable<any>{
    return this.httpclient.get<any>(url ,{headers: this.httpOptions.headers})
  }

  post(url:any,payload:any): Observable<any>{
    return this.httpclient.post<any>(url ,payload)
  }

  dispatch(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/dispatch", data);
  }

  suppller_add(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/suppller_add", data);
  }

  approve_order(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/approve_order", data);
  }

  order_status(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/order_status" ,data)
  }

  service_payment_terms(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/service_payment_terms" ,data)
  }

  service_underprocess(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/service_underprocess" ,data)
  }

  service_request_complete(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/service_request_complete" ,data)
  }
   // maintain req form
   maintenance_request(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/maintenance_request" ,data)
  }
  //maintenance view
  maintenance_request_view(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/maintenance_request_view" ,data)
  }
  //maintain dropdown
  maintenance_request_process(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/maintenance_request_process" ,data)
  }

  maintenance_requests_complete(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/maintenance_requests_complete" ,data)
  }

  maintenance_request_history(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/maintenance_request_history" ,data)
  }

  // PRIVILAGES 
  new_user(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/new_user" ,data)
  }

  user_privilege(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/user_privilege" ,{headers: this.httpOptions.headers})
  }

  add_role(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/add_role" ,data)
  }
  employee_register(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/employee_register" ,data)
  }

  list_role(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/list_role" ,data)
  }

  // ADD PRIVILAGES FOR ROLE
  list_privilege(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/list_privilege" ,{headers: this.httpOptions.headers})
  }

  list_role_to_privilege(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/list_role_to_privilege" ,data)
  }

  add_role_to_privilege(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/add_role_to_privilege" ,data)
  }

  add_designation_user(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/add_designation_user" ,data)
  }

  add_designation(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/add_designation" ,data)
  }

  add_role_user(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/add_role_user" ,data)
  }

  list_designation(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/list_designation" ,data)
  }

  add_role_designation(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/add_role_designation" ,data)
  }

  list_role_user(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/list_role_user" ,data)
  }

  list_department_designation(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/list_department_designation" ,data)
  }

  list_user(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/list_user" ,data)
  }

  list_user_get(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/list_user", {headers: this.httpOptions.headers})
  }

  // GUIDE TOUR
  tour_guides(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/tour_guides", {headers: this.httpOptions.headers})
  }

  edit_role_to_privilege(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/edit_role_to_privilege" ,data)
  }

  delete_role_to_privilege(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/delete_role_to_privilege" ,data)
  }
  ViewPdf(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/ViewPdf" ,data)
  }
  //vp purchase request
  PurchaseRequest_form_vendor_product(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/PurchaseRequest_form_vendor_product" ,data)
  }
  //vendor move to salesorder
  diractorder_from_vendor_product(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/diractorder_from_vendor_product" ,data)
  }
   //vendorproduct delete
   diractorder_cancelled_vendor_product(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/diractorder_cancelled_vendor_product" ,data)
  }
  //vendorproduct move to negotiate
  // vendor_negotiation_vendor_product(data:any): Observable<any>{
  //   return this.httpclient.post<any>(this.projectdemo + "/vendor_negotiation_vendor_product" ,data)
  // }
  //view single year budget report
  budget_total_history_rfq(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/budget_total_history_rfq" ,data)
  }
  service_rq_payment(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/service_rq_payment" ,data)
  }
  //reorder for service request
  service_rejected_reorder(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/service_rejected_reorder" ,data)
  }
  delete_all_notification(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/delete_all_notification")
  }
  hotel_countery(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/hotel_countery")
  }
 
  //purchause_order_download_vendor
 
    //purchause_order_download_vendor

  Purchase_pdf_view(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/Purchase_pdf_view", data, { responseType: 'blob' });
  }
  pdf_view(data: any): Observable<any> {
    return this.httpclient.post(this.projectdemo + "/pdf_view", data, { responseType: 'blob' });
  }
  hotel_full_process(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotel_full_process" ,data)
  }
  chat_send_by_user_vendor(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/chat_send_by_user_vendor" ,data)
  }
  chat_send_by_vendor_user(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/chat_send_by_vendor_user" ,data)
  }
  chat_for_vendor_user(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/chat_for_vendor_user" ,data)
  }
  chat_for_user_vendor(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/chat_for_user_vendor" ,data)
  }
  send_new_message(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/send_new_message" ,data)
  }
  view_new_message(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/view_new_message" ,data)
  }
  all_message(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/all_message")
  }
  User_contacts_detalis(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/User_contacts_detalis" ,data)
  }
  search_for_contacts(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/search_for_contacts" ,data)
  }
  send_new_mail(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/send_new_mail" ,data)
  }
  all_mail(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/all_mail")
  }

  vendor_industry(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/vendor_industry")
  }

  User_contacts_detalis_vendor(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/User_contacts_detalis_vendor",data)
  }
  view_mail(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/view_mail",data)
  }
  all_message_on_order(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/all_message_on_order",data)
  }
  delete_message(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/delete_message",data)
  }
  delete_mail(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/delete_mail",data)
  }
  all_mail_on_order(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/all_mail_on_order",data)
  }

  // CREATE BRAND ROOMS
  add_hotel_room_for_user(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/add_hotel_room_for_user",data)
  }
  
  //add vendors for temporary products
  suppller_add_tempery(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/suppller_add_tempery",data)
  }
  //category for temp products
  all_categorie(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/all_categorie")
  }
  
  //Subcategory level1 for temp products
  subcategorie_leavel_1(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/subcategorie_leavel_1",data)
  }
  //subcategory level2 for temp products
  subcategorie_leavel_2(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/subcategorie_leavel_2",data)
  }

  temporary_product_maping(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/temporary_product_maping",data)
  }

  temporary_product_maping_view(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/temporary_product_maping_view",data)
  }

  jobpost(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/jobpost",data)
  }
  
  post_delete(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/post_delete",data)
  }
  update_post(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/update_post",data)
  }
 
  approve_post(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/approve_post",data)
  } 
  applying_job(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/applying_job",data)
  }
 
  listing_application_onejob(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/listing_application_onejob",data)
  } 
  close_post(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/close_post",data)
  }
  all_post_view(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/all_post_view")
  }
  view_approve_post(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/view_approve_post")
  }
  listing_application(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/listing_application")
  }
  demo_hotel(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/demo_hotel")
  }
  demo_vendor(): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/demo_vendor")
  }
  demo_product_update(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/demo_product_update",data)
  }
  demo_product(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/demo_product",data)
  }
  demo_product_create(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/demo_product_create",data)
  }
  demo_product_all(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/demo_product_all",data)
  }
  listing_applly_jobs (): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/listing_applly_jobs ")
  }
  add_investment(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/add_investment",data)
  }
  view_investment (): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/view_investment ")
  }
  user_view_investment (): Observable<any>{
    return this.httpclient.get<any>(this.projectdemo + "/user_view_investment ")
  }
  delete_investment(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/delete_investment",data)
  }
  edit_investment(data:any):Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/edit_investment",data)
  }

 
}
