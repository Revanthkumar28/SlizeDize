import { Injectable ,OnInit,NgZone } from '@angular/core';
import { Observable, Subject,BehaviorSubject } from 'rxjs';
import { RegistrationDetails } from 'src/app/models/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import Pusher, { Channel } from 'pusher-js';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { EventSourcePlus } from "event-source-plus";

@Injectable(
  {
    providedIn: 'root'
  }
)

export class AppserviceService implements OnInit {
  //  sub : Subject<any>;
  userSource$ = new BehaviorSubject<any>(null);
  userSourc$ = new BehaviorSubject<any>(null);
  userSour$ = new BehaviorSubject<any>(null);
  login$ = new BehaviorSubject<any>(null);
  expandProduct$ = new BehaviorSubject<any>(null);
  // user = this.userSource$.asObservable();
  count$ = new BehaviorSubject<any>(null);
  notifi$ = new BehaviorSubject<any>(null);
  searchFilter$=new BehaviorSubject<any>(null);
  filterTable$=new BehaviorSubject<any>(null);
  poupSubsribe$=new BehaviorSubject<any>(null);
  rfqdataSubscribe$=new BehaviorSubject<any>(null);
  quotationSubscribe$=new BehaviorSubject<any>(null);
  vendortotalSubscribe$=new BehaviorSubject<any>(null);
  user_details$=new BehaviorSubject<any>(null);

  hotel_id$=new BehaviorSubject<any>(null);
  vendor_based$ = new BehaviorSubject<any>(null);
  hotel_product$ = new BehaviorSubject<any>(null);
  route_change$ = new BehaviorSubject<any>(null);
  updatedata$ = new BehaviorSubject<any>(null);
  updatefalse$ = new BehaviorSubject<any>(null);
  toggle_directOrder$ = new BehaviorSubject<any>(null);
  toggle_rfq$ = new BehaviorSubject<any>(null);

  hotelLogoImage$ = new BehaviorSubject<any>(null);


  //  temporary Product
  temporaryProducts$ = new BehaviorSubject<any>(null);

  //  new changes may month for catalog page

  
  cancelProducForm$ = new BehaviorSubject<any>(null);

  // add-products component & dashboard-drawer component
  temporaryProductVendor$ = new BehaviorSubject<any>(null);

  filtered_vendors$ = new BehaviorSubject<any>(null);

  serviceVendor$ = new BehaviorSubject<any>(null);


  editTemporaryProduct$ = new BehaviorSubject<any>(null);

 // rfq-orders
  directFalseRequest$ = new BehaviorSubject<any>(null)

  vendorBrandProducts$ = new BehaviorSubject<any>(null)

  brandPrimaryVendor$ = new BehaviorSubject<any>(null)

  // rfq-order component
  rfqSelectedAllData$ = new BehaviorSubject<any>(null)

  topHotelName$ = new BehaviorSubject<any>(null)


  // temorary product add service without reload
  temProductReload$ = new BehaviorSubject<any>(null)

  //al-vendor-details , addProductVendor component
  reloadVendor$ = new BehaviorSubject<any>(null)

//catalog-table , dashboard appar component
  notifyExpandProduct$ = new BehaviorSubject<any>(null)

  //dashboard drawer component 
  userDetails$ = new BehaviorSubject<any>(null)

  // rfq-order , rfq-order-table ,rfq-order-tableTwo 
  rfqRequestReload$ = new BehaviorSubject<any>(null)

  requestProcess$ = new BehaviorSubject<any>(null)

  // vendor table
  realoadVendorData$ = new BehaviorSubject<any>(null)

  //hide vendor
  hidevendorData$ = new BehaviorSubject<any>(null)
 //hide scroll
 hidescrollbar$ = new BehaviorSubject<any>(null)

//change hotel
changehotel$ = new BehaviorSubject<any>(null)

//  catalog-table component,rfq-order,rfq-table,rfq-table-two components , status-order-table components
country_price_symbol$ = new BehaviorSubject<any>(null)

Hotel_country$ = new BehaviorSubject<any>(null)

vendor_country$ = new BehaviorSubject<any>(null)

//  NEGOTIATE_TABLE , vendor-table , vendor-catalog COMPONENTS
ven_purchaseOrder_negotiate$ = new BehaviorSubject<any>(null)

open_close_sidebar$ = new BehaviorSubject<any>(null)

demoVendors$ = new BehaviorSubject<any>(null)

share_demo_orders$ = new BehaviorSubject<any>(null)

  // applicattion urls for navigation

  urlsNavigationId :any = {
    hotelId : '',
    productId : '',
    productType : '' ,
    nav : '' ,
    pipeLine : ''
  }

  // roles use -- dashboard-appar
  role$ = new BehaviorSubject<string>('employee');
  
 // new product notification , appar , dasboard appar , catalog-table component
  newProductNotify$ = new BehaviorSubject<any>(null)

  // new pro renegotiaton component , stutus order table component
  negotiationReload$ = new BehaviorSubject<any>(null)

  // catalog-component - 
  // reloadGroupByScheduledOrder$ = new BehaviorSubject<any>(null)

  // Purchase order data direct order reload -- vendor table component
  direct_order$ = new BehaviorSubject<any>(null)

  // EDIT VENDOR DETAILS , PROFILE
  editVendorProfile$ = new BehaviorSubject<any>(null)

  // new pro renegotiaton component , stutus order table component
  deletePurchaseOrder$ = new BehaviorSubject<any>(null)

  // b2b-dashboard-drawer components , b2b-catalog components , b2b-catalog-creation components
  hotel_id_initial_load$ = new BehaviorSubject<any>(null)

  //procurement Stages
  procurement_data$ = new BehaviorSubject<any>(null)
//reload apidata
  reload_data$ = new BehaviorSubject<any>(null)
//today date using luxon 
  today_date$ = new BehaviorSubject<any>(null)

  user_ID$ = new BehaviorSubject<any>(null)

  refreshprofile$ = new BehaviorSubject<any>(null)

  userdepartment$ = new BehaviorSubject<any>(null)

  // vendor_buget compponent, catalog component , dashboard drawer component
  vendor_budget$ = new BehaviorSubject<any>(null)

  // NOTIFICATION , dashboard-appar,rfq-order-table,order-list  components
  notification_reload_data$ = new BehaviorSubject<any>(null)

  // toggle components error handle
  error_Toggle$ = new BehaviorSubject<any>(null)
  user_id$ = new BehaviorSubject<any>(null)

  // GIUDE-TOUR
  guideTour$ = new BehaviorSubject<any>(null)

  // MULTIBLE SEARCH
  multibleSearch$ = new BehaviorSubject<any>(null)

  // CHAT AND EMAIL
  notifyExpand_ChatEmail$ = new BehaviorSubject<any>(null)

  // CHAT AND EMAIL
  buttonDisabled$ = new BehaviorSubject<any>(null)
  intervalId:any = ''


  private currentUserRole: string = '';

   //  WEBSOCKET START ..................................
  //  private pusher: Pusher;
  //  private channel!: Channel;
  //  private channel_private!: Channel; 
   constructor(private httpclient: HttpClient,private router: Router, private route: ActivatedRoute,private HotelService:HotelService,private toast: NgToastService,private zone: NgZone) {
    //  this.pusher = new Pusher('3896fb16896a2c4d7e01', {
    //    cluster: 'mt1',
    //    wsHost: '192.168.29.248',
    //    wsPort: 6001,
    //    forceTLS: false,
    //    disableStats: true,
    //    enabledTransports: ['ws', 'wss'],
    //   //  authEndpoint: 'http://192.168.29.248/qa_ezeebi/broadcasting/auth',
    //   //  auth: {
    //   //    headers: {
    //   //      Authorization: `Bearer ${localStorage.getItem("tokenn")}`
    //   //    }
    //   //  }
    //  });
 
    //  const user_log_id = JSON.parse(localStorage.getItem('currentUser') || '[]')

    //  this.channel = this.pusher.subscribe(`testing.${user_log_id.user_id}`);
    //  this.pusher.connection.bind('connected', () => {
    //    console.log('Pusher connected');
    //  });
 
    //  this.pusher.connection.bind('error', (err: any) => {
    //    console.error('Pusher connection error:', err);
    //  });
 
    //  PUBLIC CHANNEL START............
    // let user_id = 1
    // this.HotelService.user().subscribe((user:any) =>{
    //   user_id = user.id
    //   console.log(user)
    //   this.channel = this.pusher.subscribe(`testing.${user_id}`);
    // },(err) =>{
    //   this.toast.error({ detail: "Error", summary: 'Websocket not Connected', duration: 3000 });
    // })
    // this.channel = this.pusher.subscribe(`testing.6`);


    //  PRIVATE CHANNEL START............
    // this.channel_private = this.pusher.subscribe(`private-myPrivateChannel.user.${user_id}`);

    // this.channel_private.bind('pusher:subscription_succeeded', () => {
    //   console.log('Successfully subscribed to private channel');
    // });
    
    // this.channel_private.bind('pusher:subscription_error', (status:any) => {
    //     console.error('Subscription error:', status);
    // });
    //  PRIVATE CHANNEL END............
     console.log('Subscribed to public-channel');
    }

    ngOnInit(){
      // this.route.data.subscribe((datas: any) => {console.log(datas)})

    }

    // NOTIFICATION START.............................
    // getServerSentEvent(url: string, token: string): Observable<any> {
    //   return new Observable<any>(observer => {
    //     const eventSource = new EventSourcePlus(url, {
    //       method: "get",
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       },
    //     });
  
    //     eventSource.listen({
    //       onMessage(message: any) {
    //         const notify = JSON.parse(message.data || '[]');
    //         observer.next(notify);
    //       },
    //       // onError(error: any) {
    //       //   observer.error(error);
    //       // },
    //     });
  
    //     // Cleanup when unsubscribed
    //     return () => {
    //       // eventSource.close();
    //     };
    //   });
    // }

    getServerSentEvent(url: string, token: any): Observable<any> {
      return new Observable<any>(observer => {
        const eventSource:any = new EventSourcePlus(url, {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
  
        eventSource.listen({
          onMessage(message: any) {
            const notify = JSON.parse(message.data || '[]');
            observer.next(notify);
          },
          onError(error: any) {
            observer.error(error);
          },
        });
  
        // Cleanup when unsubscribed
        return () => {
          // eventSource.close();
        };
      });
    }
    // NOTIFICATION END.............................
 
   public bind(eventName: string, callback: (data: any) => void): boolean {
     try {
      //  this.channel.bind(eventName, callback);
      //  this.channel_private.bind(eventName, callback);
 
       return true;
     } catch (error) {
       console.error(`Error binding to event ${eventName}:`, error);
       return false;
     }
     
   }
 
   //  WEBSOCKET END ..................................
 

  services(type:any,data:any){
    if(type == 'editVendorProfile'){
      this.editVendorProfile$.next(data)
    }
  }

   userDetails(data: any) {
    this.userDetails$.next(data)
  }

   directFalseRequest(data: any) {
    this.directFalseRequest$.next(data)
  }
  
   updateData(data:any){
    this.updatedata$.next(data)
   }
   updateFalse(data:any){
    this.updatefalse$.next(data)
   }
   
  sendData(data:any){
    this.userSource$.next(data)
   }
  allDatas(data:any){
    this.userSourc$.next(data)
   }

   hotelDatas(data:any){
    this.userSour$.next(data)
   }

   login(data:any){
    this.login$.next(data)
   }
   expand(data:any){
    this.expandProduct$.next(data)
   }

   count(data:any){
    this.count$.next(data)
   }

   notification(data:any){
    this.notifi$.next(data)
   }
   search(data:any){
    this.searchFilter$.next(data)
   }
   filterTable(data:any){
    this.filterTable$.next(data)
   }
   popupData(data:any){
    this.poupSubsribe$.next(data)
   }
   rfqSdata(data:any){
    this.rfqdataSubscribe$.next(data)
   }
   poupQuatation(data:any){
    this.quotationSubscribe$.next(data)
   }
   VendorTotal(data:any){
    this.vendortotalSubscribe$.next(data)
   }
      
   hotel_id(data:any){
    this.hotel_id$.next(data)
   }

   user_details(data:any){
    this.user_details$.next(data)
   }

   vendor_(data:any){
    this.vendor_based$.next(data)

   }

   hotel_product(data:any){
    this.hotel_product$.next(data)

   }

   route_change(data:any){
    this.route_change$.next(data)

   }

   width$ = fromEvent(window, 'resize').pipe(
    map(() => window.innerWidth)
  );

  toggle_rfq(data:any){
    this.toggle_rfq$.next(data)
  }
  toggle_directOrder(data:any){
    this.toggle_directOrder$.next(data)
  }

  hotelLogoImage(data:any){
    this.hotelLogoImage$.next(data)
  }

  cancelProducForm(data:any){
    this.cancelProducForm$.next(data)
  }

  temporaryProducts(data:any){
    this.temporaryProducts$.next(data)
  }

  temporaryProductVendor(data:any){
    this.temporaryProductVendor$.next(data)
  }

  filtered_vendors(data:any){
    this.filtered_vendors$.next(data)
  }
  //servicerequest vendors
  serviceVendor(data:any){
    this.serviceVendor$.next(data)
  }
  
  // RFQcountCheckBox(data:any){
  //   this.RFQcountCheckBox$.next(data)
  // }

  editTemporaryProduct(data:any){
    this.editTemporaryProduct$.next(data)
  }

  vendorBrandProducts(data:any){
    this.vendorBrandProducts$.next(data)
  }

  brandPrimaryVendor(data:any){
    this.brandPrimaryVendor$.next(data)
  }

  rfqSelectedAllData(data:any){
    this.rfqSelectedAllData$.next(data)
  }

  topHotelName(data:any){
    this.topHotelName$.next(data)
  }

  temProductReload(data:any){
    this.temProductReload$.next(data)
  }

  rfqRequestReload(data:any){
    this.rfqRequestReload$.next(data)
  }

  // rfq-order , rfq-order-table ,rfq-order-tableTwo 
  reloadVendor(data:any){
    this.reloadVendor$.next(data)
  }

  notifyExpandProduct(data:any){
    this.notifyExpandProduct$.next(data)
  }

  requestProcess(data:any){
    this.requestProcess$.next(data)
  }

  negotiationReload(data:any){
    this.negotiationReload$.next(data)
  }

  realoadVendorData(data:any){
    this.realoadVendorData$.next(data)
  }

  newProductNotify(data:any){
    this.newProductNotify$.next(data)
  }

  hotel_id_initial_load(data:any){
    this.hotel_id_initial_load$.next(data)
  }

  deletePurchaseOrder(data:any){
    this.deletePurchaseOrder$.next(data)
  }
  direct_order(data:any){
    this.direct_order$.next(data)
  }

  // Role based service
  setUserRole(role: any) {
    this.currentUserRole = role;
    this.role$.next(role)
  }

  getUserRole() {
    return this.currentUserRole;
  }   
  
  procurementStage_orders(data:any){
    this.procurement_data$.next(data)
  }

  reloadData(data:any){
    this.reload_data$.next(data)
  }

  Todaydate(data:any){
    this.today_date$.next(data)
  }

  UseriD(data:any){
    this.user_ID$.next(data)
  }

  refreshprofile(data:any){
    this.refreshprofile$.next(data)
  }

  userdepartment(data:any){
    this.userdepartment$.next(data)
  }

  hidevendorData(data:any){
    this.hidevendorData$.next(data)
  }

  hidescrollbar(data:any){
    this.hidescrollbar$.next(data)
  }

  changehotel(data:any){
    this.changehotel$.next(data)
  }

  vendor_budget(data:any){
    this.vendor_budget$.next(data)
  }

  country_price_symbol(data:any){
    this.country_price_symbol$.next(data)
  }

  Hotel_country(data:any){
    this.Hotel_country$.next(data)
  }

  vendor_country(data:any){
    this.vendor_country$.next(data)
  }

  ven_purchaseOrder_negotiate(data:any){
    this.ven_purchaseOrder_negotiate$.next(data)
  }

  notification_reload_data(data:any){
    this.notification_reload_data$.next(data)
  }

  notifyExpand_ChatEmail(data:any){
    this.notifyExpand_ChatEmail$.next(data)
  }

  error_Toggle(data:any){
    this.error_Toggle$.next(data)
  }
  user_id(data:any){
    this.user_id$.next(data)
  }

  guideTour(data:any){
    this.guideTour$.next(data)
  }

  multibleSearch(data:any){
    this.multibleSearch$.next(data)
  }

  buttonDisabled(data:any){
    this.buttonDisabled$.next(data)
  }
  open_close_sidebar(data:any){
    this.open_close_sidebar$.next(data)
  }

  demoVendors(data:any){
    this.demoVendors$.next(data)
  }
  share_demo_orders(data:any){
    this.share_demo_orders$.next(data)
  }
  
}
