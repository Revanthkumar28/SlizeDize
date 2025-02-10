import { Component, OnInit,Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { AcountService } from 'src/app/service/acount/acount.service';
import { RegisterFormService } from 'src/app/service/registerDetails/register-form.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
// import { HttpClient } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.dev';
import { Location } from '@angular/common';
import { EventSourcePlus } from "event-source-plus";
import {TourGuideService} from 'src/app/service/tour-guide/tour-guide.service'
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';


@Component({
  selector: 'b2b-dashboard-appbar',
  templateUrl: './dashboard-appbar.component.html',
  styleUrls: ['./dashboard-appbar.component.css'],
})

export class DashboardAppbarComponent implements OnInit {
  newnotification:boolean = false
  side_bar:boolean = true
  notificationmsg:any=''
  fromSub :any='' 
  hotel_id:any='Muthu'
  test:any= ''
  upload:any=''
  profile_logo:any=''
  notifyCount:any= 0
  test_5:any =''
  fileToUpload:any=''
  caption:any=''
  admin=false
  usertype :any=''
  user_role:any=''
  vendor_profile :any=''

  getLogo:any = ''
  defaultImageLogo = 'https://th.bing.com/th/id/OIP.xaADddZHWRoU3TbjEVGssQHaFj?w=234&h=180&c=7&r=0&o=5&pid=1.7'

  @Input() currentUser:any=''
  @Input() vendorProfile:any=''
  
  hotelBasedImage :any = null

  test_4:any ={
    logo:'https://1000logos.net/wp-content/uploads/2020/01/Radisson-Logo.png',
  }

  apiUrl:any = environment.apiUrl;
  s3Bucket:any = environment.s3Bucket;
  profileview:boolean=false

  selectedFile:any =''
  nofifyPerson :any = []

  selectedTable :string = ''
  HotelId : any = ''
  newProductNotifycount :number = 0
  newProductsData : any = []
  firstLetterUppercase: string = '';
  vendorId :any = '20240202121440_2_991'
  request_type_details:any = ''
  sseSubscription :any = ''
  isConnected:boolean = false
  isLoggedIn: boolean = false;
  joblogin:boolean = false
  constructor(private auth: AngularFireAuth, private http: HttpClient, private router: Router, private route: ActivatedRoute,private AppserviceService:AppserviceService,private AcountService:AcountService ,private RegisterFormService:RegisterFormService ,private HotelService:HotelService,private location: Location,private toast: NgToastService,private TourGuideService:TourGuideService,private authService: AuthServiceService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();
    console.log(this.isLoggedIn)
    this.joblogin = this.authService.JobLogin();


    const currentUrl = this.location.path();
    // // Extract vendor_id from the URL using a simple string manipulation or regex
    // const vendorIdMatch = currentUrl.match(/vendor_id=(\d+)/);
    // this.vendorId = vendorIdMatch ? vendorIdMatch[1] : null;

    // console.log('Vendor ID:', this.vendorId);
    localStorage.removeItem("step-1");
    // localStorage.removeItem('hotels_room');

    // this.route.paramMap.subscribe((params) => {
    //   let id = params.get("expanded");
    //   if (id) this.selectedTable = id;
    // })
    
    this.route.paramMap.subscribe((params) => {
      let i = params.get("ids");
      if (i) this.HotelId = i
    })

    this.HotelId = JSON.parse(localStorage.getItem('hotelNameId') || "[]")

    this.usertype = JSON.parse(localStorage.getItem('currentUser') || '[]')
    console.log(this.usertype.user_type)
    if(this.isLoggedIn){
      this.get_notified_data()

    }

    const token = localStorage.getItem("tokenn"); // Replace with your actual token
    // SERVER
    // const sseUrl = 'https://qa.ezeebi.com/api/sse-updates';

    // LOCALHOST :
    const sseUrl = this.HotelService.notification_SSE();

    const headers = new HttpHeaders().set('Authorization', `Basic ${token}`);
    // this.AppserviceService.getEventSource(sseUrl);

    // NOTIFICATION MAIN
    if(this.isLoggedIn){
      this.sseSubscription = this.AppserviceService.getServerSentEvent(sseUrl, token)
      .subscribe(
        (notify) => {
          console.log(notify)
          this.notificationmsg = notify.notifications_text
          this.newnotification = true
          setTimeout(() => {
            this.newnotification = false;
          }, 2000);
          notify.action_id = notify.action_id.split(',')
          this.nofifyPerson.push(notify);
          this.notifyCount++;
          this.playNotification()
          if(notify.status == '29' && this.isLoggedIn){
            this.get_notified_data()
          }
          if(this.usertype.user_type == 'vu'){
            this.AppserviceService.realoadVendorData('notify')
          }else{
            // NEGOTIATION
            this.AppserviceService.notification_reload_data(notify)
          }
        },
        (error) => console.error('SSE Error:', error)
      );

    }
   

    this.isConnected = true;
    // NOTIFICATION WEBSOCKET END

    // this.displayAdmin()
   
    this.AppserviceService.hotelLogoImage$.subscribe(x => {
      if(x){
        this.hotelBasedImage = x.hotel_image
      }
      if(x=='group-brand'){
        this.hotelBasedImage = this.getLogo
      }
    })
    if(this.isLoggedIn){
      this.HotelService.user_name().subscribe((datas:any)=>{
        const profile = datas
        profile.forEach((element:any) => {
          this.currentUser = element.name
          this.profile_logo = element.profile_photo_path
          this.AppserviceService.UseriD(element.id)
          if(element.user_type == 'vu'){
          this.AppserviceService.user_id(element.new_id)
          }else{
            this.AppserviceService.user_id(element.id)
          }
  
          if(element.user_type == 'vu'){
            if(element.po_access == '1' && element.service_access == '1'){
              this.AppserviceService.hidevendorData('product_service')
            }
            if(element.po_access == '1' && element.service_access == '0'){
              this.AppserviceService.hidevendorData('product')
  
            }
            if(element.po_access == '0' && element.service_access == '1'){
              this.AppserviceService.hidevendorData('service')
            }
  
          }
  
          this.vendor_profile = element.profile_photo_path
        });
  
        // GUIDE TOUR
        if(profile && profile[0].tour_guides != '1' && profile[0].user_type != 'vu'){
          this.TourGuideService.startTour();
        }
        // console.log(this.currentUser.fullName)
      })

    }
   
    // this.firstLetterUppercase = this.currentUser.charAt(0).toUpperCase();
    if(this.isLoggedIn){
      this.HotelService.getImage().subscribe((d:any) =>{
        this.test_4.logo = d
        console.log(d)
        this.getLogo = d[0].logo
        d.forEach((logo:any) => {
          console.log(logo.logo)
          this.getLogo = logo.logo
        })
      ,
     (error:any) => {
     console.log(error)
    } 
    })

    }
   
  if(this.usertype.user_type != 'vu'){
    this.admin = true
  }
  if(this.usertype.user_type == 'he'){
  this.AppserviceService.userdepartment$.subscribe((data:any)=>{
    console.log(data)
    this.user_role = data.designation
   })
   }

  }

  ngOnDestroy(): void {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
      // this.isConnected = false;
    }
  }

  get_notified_data(){
    this.HotelService.notification().subscribe((res:any) =>{
      console.log(res)
      res.forEach((element:any) => {
        if(element.action_id){
          element.action_id = element.action_id.split(',')
        }
      });
      this.nofifyPerson = res
      this.notifyCount = res.length
    },err=>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })
  }

  profile(){
    this.profileview=true
  }

  acceptNotification(req:any,index:any){
    console.log(req)  
    const accept = {
      'active' : '1',
      'id' : req.action_id.toString(),
      'notifications_id' : req.id
    }  
    this.HotelService.new_user(accept).subscribe((d:any) =>{
      // const index = this.nofifyPerson.findIndex((r:any) => r.id == req.id)
      // this.nofifyPerson.splice(index,1)
      this.remove_notify(req)
      this.notifyCount = this.nofifyPerson.length -1
      this.toast.success({ detail: "SUCCESS", summary: 'Accepted', duration: 3000 });
    },err =>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });    })
  
  }

  ignoreNotification(req:any,index:any,type:any){
    const ignore = {
      'active' : '0',
      'id' : req.id,
    }  
    console.log(req)

    if(req){
      // SUBSCRIPE VENDOR CATALOG-TABLE COMPONENT
      // this.AppserviceService.hotel_id_initial_load(req.Hotel_Name_id)
      if(req.status == '61' || req.status == '62' || req.status == '63'){
        this.AppserviceService.notifyExpand_ChatEmail(req)
      }else{
        this.AppserviceService.notifyExpandProduct(req)
      }
    }
    console.log(req)

    if(type == 'remove'){
      this.remove_notify(req)
    }else{
      this.HotelService.new_user(ignore).subscribe((d:any) =>{
        // const index = this.nofifyPerson.findIndex((r:any) => r.id == req.id)
        // this.nofifyPerson.splice(index,1)
        this.remove_notify(req)
        this.notifyCount = this.nofifyPerson.length -1
        this.toast.success({ detail: "Ignore", summary: 'Ignore', duration: 3000 });
      })
    }
  }

  igNore(req:any){
    this.remove_notify(req)
  }

    onFileSelectedd(event:any) {
      const file: File = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file, file.name);
        console.log(formData)
      }
    }

    remove_notify(req:any){
      console.log(req)
      const ignore = {
        'active' : '0',
        'id' : req.id,
      } 

      this.HotelService.delete_notification(ignore).subscribe((d:any) =>{
        this.notifyCount = this.notifyCount - 1
        const index = this.nofifyPerson.findIndex((r:any) => r.id == req.id)
        this.nofifyPerson.splice(index,1)
      })
    }

    playNotification() {
      const audio = document.getElementById('notificationSound') as HTMLAudioElement;
      audio.play();
    }

    navigateProductExpand(product_id:any,hotelId:any,obj:any){
      const product_idd = product_id.split(',')
      const expand = {
        product_id : product_idd[0],
        hotel_id : hotelId
      }
      // this.AppserviceService.notifyExpandProduct(expand)
    }

    onFileSelecteddd(event:any): void {
      const file: File = event.target.files[0];
      if (file) {
        console.log(this.usertype.user_type)
        if(this.usertype.user_type == 'vu'){
          const formData = new FormData();
          formData.append('vender_id', this.vendorId);
          formData.append('profile_photo_path', file, file.name);
          console.log(formData)
          this.HotelService.vendor_profile_update(formData).subscribe(data => {
            console.log("vendor photo success")
            console.log(data);
            this.test_4.logo = file.name;
            this.getLogo = ''
  
            if(event.target.files){
              var reader=new FileReader()
              reader.readAsDataURL(event.target.files[0])
              console.log(reader)
              reader.onload=(event:any)=>{
                this.hotelBasedImage = event.target.result
                this.defaultImageLogo = event.target.result
                this.getLogo = event.target.result
                console.log( this.uploadImage)
              }
            }
          }, err => {
            this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
            console.error("error",err);
          });
         
      }else{
        const formData = new FormData();
        formData.append('logo', file, file.name);
        this.HotelService.uplode_logo(formData).subscribe(data => {
          this.test_4.logo = file.name;
          this.getLogo = ''

          if(event.target.files){
            var reader=new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload=(event:any)=>{
              this.hotelBasedImage = event.target.result
              this.defaultImageLogo = event.target.result
              this.getLogo = event.target.result
              console.log(this.uploadImage)
            }
          }
        }, error => {
          this.toast.error({ detail: "Error", summary: error.error.message.logo[0], duration: 3000 });
          console.error(error);
        });
      }

      }
    }

  logout() {
    this.RegisterFormService.logout()  
    this.auth.signOut();
    this.authService.logout();
    this.router.navigate(['/login', {type: 'sign-in'}]);
  }
  login(){
    
    this.router.navigate(['/login', {type: 'sign-in'}]);

  }
  // displayAdmin(){
  //   this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '[]')
  // }

  // test

  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile);
  
    console.log(this.selectedFile.name)
    this.test_4.logo = this.selectedFile.name

    this.HotelService.postFile(this.test_4).subscribe((data:any)=>{
      console.log(data)
    },err =>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })

    console.log(this.test_4)

  }

  // New products
  newProducts(){
    this.router.navigate([`/console/catalog` , { ids: this.HotelId.hatelNameId,new_products:'new_products' }]);
  } 
  notifyassign:any=[]
  clearnofification(){
    this.HotelService.delete_all_notification().subscribe(datas => {
      console.log(this.nofifyPerson)
      this.notifyassign =[]

      this.nofifyPerson.forEach((org:any)=>{
        if(org.status == '29'){
        this.notifyassign.push(org)
        }
      })

       this.nofifyPerson=[];
       this.nofifyPerson = this.notifyassign
      this.notifyCount= this.notifyassign.length
      this.toast.success({ detail: "Success", summary: 'Cleared All Notification', duration: 3000 });
    },err =>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })
  }
  sidebar(){
    this.side_bar = !this.side_bar
    this.AppserviceService.open_close_sidebar(this.side_bar)
  }
 

  
}

