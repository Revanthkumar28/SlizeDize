import { Component, Input, OnInit, Renderer2, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { Location } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';

import {TourGuideService} from 'src/app/service/tour-guide/tour-guide.service'
@Component({
  selector: 'b2b-dashboard-drawer',
  templateUrl: './dashboard-drawer.component.html',
  styleUrls: ['./dashboard-drawer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class DashboardDrawerComponent implements OnInit {
  bottomCardList: string[] = ["All Hotels", "Share Experience/Jobs", "Job Opportunity", "My Connections", "Innovative Design", "Investment Opportunity", "Web Clipper SD", "Settings"];
  bottomCardList2: string[] = ["Job Opportunity","Investment Opportunity"];

  @Input() activeIndex: number = 0;
  @Input() sidenav: number = 1;
  img: any = 'https://play-lh.googleusercontent.com/f3osiUEYDq9u9jvb8MspRIndXX30ni99Zqdvcas5yO0v9_wO02ms9pZVjWZcVftHm0Bf'
  menu: any = 'menu'
  test: any = ''
  test_1: any = ''
  test_2: any = ''
  hotel_id: any = '+917358911973'
  childOpen: boolean = false
  backround = '--color-primary'
  childOpen_two: boolean = false
  up_slide:boolean = false
  add_vendor: boolean = false
  drawerList: boolean = true
  // activeColor:boolean=false;

  hotelId: any = ''
  deletehotel: boolean = false
  HotelName_id: any = ''
  objectKeys = Object.keys

  edit_hotel_details: any = {
    Hotel_Name_id: ''
  }
  userdetails: any = {
    deparment: '',
    designation: ''
  }
  // test

  products: any = []
  hotel_uniqid: any = {
    hotelNameId: ''
  }

  HotelNameId: any = ''
  userType_role: any = ''
  isEmployees: boolean = false
  bottom_screen: any = []
  routerEventsSubscription: any = ''
  isLoggedIn: boolean = false;
  joblogin: boolean = false;

  hide_arrow:boolean = false

  guideTour:boolean = false
  constructor(private TourGuideService:TourGuideService,private router: Router, private route: ActivatedRoute, private HotelService: HotelService, private AppserviceService: AppserviceService, private location: Location, private toast: NgToastService, private cd: ChangeDetectorRef, private renderer: Renderer2,private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();
    this.joblogin = this.authService.JobLogin();

     if(! this.isLoggedIn)  {
      this.bottom_screen = this.bottomCardList2
      if(this.bottom_screen.length > 1){
        this.hide_arrow = true
      }
       this.test = [{'Hotel_Name':'Demo Hotel','Hotel_Name_id':'0o0',}]

       //this.router.navigate([`/dashboard/job`]);

     }else{
     this.test = []

     }
    localStorage.removeItem("cache_store");
    localStorage.removeItem("hotels_room");
    this.hotelId = JSON.parse(localStorage.getItem('hotelNameId') || "[]")
    this.userType_role = JSON.parse(localStorage.getItem('currentUser') || "[]")
    this.AppserviceService.setUserRole([1])

    this.route.paramMap.subscribe((params) => {
      let i = params.get('ids');
      console.log(i)
      if (i) this.HotelNameId = i
      // TOUR_GUIDE FOR ALL COMPONENTS - START HERE
      // this.AppserviceService.guideTour$.subscribe((res:any) =>{
        // if(res != 'Complete-Tour'){
          // this.TourGuideService.startTour();
        // }
      // })

      // INITIAL LOAD
      const fullUrl = this.location.path();
      console.log(fullUrl)
      const hotel_id = fullUrl.split(';')
      console.log(hotel_id)
      const currect = hotel_id.includes('console/catalog')
      const isHotel_id = hotel_id.length > 1 ? hotel_id[1].replace('ids=', '') : this.hotelId.hatelNameId
      const Hotel_id_2 = currect ? isHotel_id : '';
      console.log(isHotel_id)

      console.log(Hotel_id_2)

      this.route.data.subscribe((datas: any) => {
          if(this.userType_role.user_type == "ho"){
            this.test = datas.data.hotel_registrations
          }else if(this.userType_role.user_type == "us"){

          }else{
            if(this.isLoggedIn){

            
            this.employees(Hotel_id_2,datas.emp)
            this.bottom_screen = []
            const privileges = datas.emp.user_privilege
            console.log(privileges[0].privileges)
              this.block_Drawer_Screeen(privileges[0].privileges)
  
            }
           
          }
  
        
        
        // else{
        //   this.test = [{'Hotel_Name':'Demo Hotel','Hotel_Name_id':'0o0'}]

        // }
       
        if(currect){
          if (this.userType_role.user_type == "ho"){
            this.bottom_screen = this.bottomCardList
            if (this.objectKeys(this.test).length == 0) {
              this.router.navigate(['/registration']);
            }

            if (this.objectKeys(this.test).length >= 6) {
              // this.drawerList = false
            }

            this.admin_user(Hotel_id_2)
          }else{
            console.log(datas.emp)
            const emp = datas.emp
            emp.user_privilege.forEach((element: any) => {
              this.userdetails.deparment = element.departments
              this.userdetails.designation = element.designations
            })
            this.employees(Hotel_id_2,emp)
          }
        }else{
          this.activeIndex = 0
          if (this.userType_role.user_type == "ho"){
            this.bottom_screen = this.bottomCardList
          }
          console.log('vrvrtvrv')
          this.active_screen('')
        }
      })
    
      console.log(Hotel_id_2)
    })
    
    console.log(this.sidenav)
    // BACK Navigation initial
    
    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const urll: any = event.url
        console.log(urll)
        console.log('Navigating to:', event.url);
        const currect = urll.includes('console/catalog')
        // Assuming you have an element with id 'drawerButton' to highlight
        if (currect == false) {
          this.cd.detectChanges();
        } else {
          console.log('not need')
          this.activeIndex = 0

          // TOUR GUIDE .......
          this.AppserviceService.guideTour$.subscribe((res:any) =>{
            if(res == '.tour-hotel-menu'){
              this.active_screen('')
            }
          })
          // this.active_screen('') //test for tour-guide ............

          const hotel_id = event.url.split(';')
          const hotel = hotel_id && hotel_id != undefined ? hotel_id[1].replace('ids=', '') : '';
          const Hotel_id_2 = hotel ? hotel : this.test[0].Hotel_Name_id ;
          const findIndex = this.test.findIndex((item: any) => item.Hotel_Name_id == Hotel_id_2) + 1
          this.sidenav = findIndex ? findIndex : 1
          this.cd.detectChanges();
        }
      }
    })

    this.AppserviceService.guideTour$.subscribe((res:any) =>{
      if(res == '.tour-hotel-menu'){
        this.guideTour = true
      }
    })
    if(this.bottom_screen.length > 1){
      this.hide_arrow = true
   }
  }

  admin_user(hotel:any) {
    if (hotel && this.userType_role.user_type == "ho") {
      this.sidenav = this.test.findIndex((item: any) => item.Hotel_Name_id == hotel) + 1
      console.log(hotel)
      const full_auth: any = [1]
      this.AppserviceService.setUserRole(full_auth);
      console.log(this.sidenav)
      const findHotel = this.test.find((item: any) => item.Hotel_Name_id == hotel)
      localStorage.setItem('hotelNameId', JSON.stringify({ hatelNameId: hotel }))
      this.AppserviceService.temporaryProductVendor(findHotel)
       this.brand_id(findHotel, 'owner')
      console.log(findHotel)

      // this.active_screen(this.test[0].Hotel_Name_id)
    } else {
      if (this.hotelId) {
        this.active_screen(this.test[0].Hotel_Name_id)
      } else {
        this.active_screen(hotel)
      }
      const full_auth: any = [1]
      this.AppserviceService.setUserRole(full_auth);
    }
    this.cd.detectChanges();
  }

  // HOTEL EMPLOYESS
  employees(hotel:any,emp:any){
    console.log(emp)
    const findHotel = this.test.find((item: any) => item.Hotel_Name_id == hotel)
    localStorage.setItem('hotelNameId', JSON.stringify({ hatelNameId: hotel }))

    this.AppserviceService.userdepartment(this.userdetails);
    this.isEmployees = true
    this.test = emp.user_privilege
    if (this.hotelId == undefined || this.hotelId == null) {
      this.active_screen(this.test[0].Hotel_Name_id)
    } else {
      this.active_screen(this.hotelId.hatelNameId)
    }
  }

  ngOnDestroy(): void {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }

  handeler(a: any) {
    this.sidenav = a
    this.activeIndex = 0
  }

  drawerlist() {
    this.drawerList = !this.drawerList
  }

  active_screen(hotel_name_id: any) {
    this.drawerList = true
    console.log('hotel_id 1')
    // this.sidenav = this.test.findIndex((item: any) => item.Hotel_Name_id == hotel_name_id) + 1
    this.sidenav = 0
    this.activeIndex = 0
    const fullUrl = this.location.path();
    const fullUrl2 = this.location.path().split(';');

    console.log(fullUrl)
    console.log(fullUrl2)
    if(fullUrl2[0] == '/console/jopopportunity'){
      console.log('vfvfvvf')
      if(this.isLoggedIn){
        this.activeIndex = 3;

      }else{
        this.activeIndex = 1;

      }
      this.up_slide = true
    }else if(fullUrl2[0] == '/console/InvestmentOpportunity'){
      if(this.isLoggedIn){
        this.activeIndex = 6;

      }else{
        this.activeIndex = 2;

      }
      this.up_slide = true

    }
    else{
      switch (fullUrl) {
        case '/console/Settings':
          this.activeIndex = 8;
          break;
        case '/console/InvestmentOpportunity':
          this.activeIndex = 6;
          break;
        case '/console/innovativeDesign':
          this.activeIndex = 5;
          break;
        case '/console/MyConnections':
          this.activeIndex = 4;
          break;
        case '/console/jopopportunity':
          this.activeIndex = 3;
          break;
        case '/console/sharemyexperience':
          this.activeIndex = 2;
          break;
        case '/console/all-hotels':
          this.activeIndex = 1;
          break;
        default:
          let nav_index = this.test.findIndex((item: any) => item.Hotel_Name_id == this.hotelId.hatelNameId)
          console.log(this.hotelId.hatelNameId)
          console.log(nav_index)
          nav_index = nav_index < 0 ? 0 : nav_index
          this.sidenav = nav_index ? nav_index + 1 : 1
           this.brand_id(this.test[this.sidenav - 1], 'owner')
        // this.cd.detectChanges();
        // Return false if the URL does not match any of the cases
      }
    }
   

  }

  drawerClickHandler(name: any, index: any) {
    localStorage.removeItem("hotelNameId");
    this.AppserviceService.hotelLogoImage('group-brand')

    this.sidenav = 0;
    this.activeIndex = index;
    const arr = this.bottomCardList.find((ind: any) => ind == name);
    console.log(arr);

    switch (name) {
      case 'All Hotels':
        this.router.navigate(['/console/all-hotels']);
        break;
      case 'Share Experience/Jobs':
        this.router.navigate(['/console/sharemyexperience']);
        break;
      case 'Job Opportunity':
        this.router.navigate(['/console/jopopportunity']);
        break;

      case 'My Connections':
        this.router.navigate(['/console/MyConnections']);
        break;
      case 'Innovative Design':
        this.router.navigate(['/console/innovativeDesign']);
        break;
      case 'Investment Opportunity':
        this.router.navigate(['/console/InvestmentOpportunity']);
        break;
      case 'Settings':
        this.router.navigate(['/console/Settings']);
        break;
      default:
        console.log('No matching route for arr');
      // return 'Hotel'
    }


    this.AppserviceService.route_change(false);
  }


  brand_id(id: any, role: any) {
    console.log('hotel_id 1')
    console.log(id)
    // console.log(role)
    if (this.isEmployees == true) {
      this.test.forEach((element: any) => {
        if (element.Hotel_Name_id == id.Hotel_Name_id) {
          const privileges = element.privileges
          if(this.isLoggedIn || this.joblogin){
            this.block_Drawer_Screeen(privileges)
          }
        }
      });
    }

    console.log(this.bottomCardList)
    this.AppserviceService.changehotel('hotelchanged')
    this.AppserviceService.vendor_budget(false)

    const address:any = {
      Hotel_Name: id.Hotel_Name,
      State : id.state_full_name,
      Country: id.Country
    }
    this.AppserviceService.topHotelName(id ? address : '')
    const full_url = this.location.path();
    this.id(id ? id.Hotel_Name_id : '')
    this.AppserviceService.temporaryProductVendor(id)

    this.products = []
    localStorage.setItem('hotelName', JSON.stringify({ hatelName: id ? id.Hotel_Name : '' }))
    localStorage.setItem('hotelNameId', JSON.stringify({ hatelNameId: id ? id.Hotel_Name_id : '' }))
    // this.cd.detectChanges();  // Force change detection
  }

  block_Drawer_Screeen(privileges:any){
    const selected_role: any = []
          privileges.forEach((role2: any) => {
            selected_role.push(role2.id)
          });

          console.log(selected_role)
          this.AppserviceService.setUserRole(selected_role);
          // *appRoleBasedButton="[168,1]"
          this.bottom_screen = this.bottomCardList.filter(item => {
            if ((selected_role.includes(168) || selected_role.includes(152)) && item === 'All Hotels') return true;
            if (selected_role.includes(169) && item === 'Share Experience/Jobs') return true;
            if (selected_role.includes(170) && item === 'Job Opportunity') return true;
            if (selected_role.includes(171) && item === 'My Connections') return true;
            if (selected_role.includes(172) && item === 'Innovative Design') return true;
            if (selected_role.includes(173) && item === 'Investment Opportunity') return true;
            if (selected_role.includes(174) && item === 'Web Clipper SD') return true;
            if (selected_role.includes(175) && item === 'Settings') return true;
            // if (selected_role.includes(1)) return true;
            return false;
          });
  }

  id(hotelId: any) {
     this.router.navigate([`/console/catalog`, { ids: hotelId, new_products: 'Hotel_products', nav_hotel: 'yes' }]);

  }

  // Hotel edit user details
  editHotelDetails(id: any, customBrand: any) {
    console.log(id)
    this.edit_hotel_details.Hotel_Name_id = id

    this.HotelService.edit_hotel(this.edit_hotel_details).subscribe((data: any) => {
      console.log(data)
      this.router.navigate(["/registration", { ids: id, customBrand: customBrand }]);
    },err =>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })
  }
  deletepopup(hotel_id: any) {
    this.HotelName_id = hotel_id
    this.deletehotel = true

  }
  closedeletepopup() {
    this.HotelName_id = ''
    this.deletehotel = false

  }
  delete_hotel(hotel_id: any) {
    const payload = {
      Hotel_Name_id: hotel_id
    }

    this.HotelService.hotel_delete(payload).subscribe((res: any) => {
      console.log(res)
      this.toast.success({ detail: "SUCCESS", summary: 'Success', duration: 3000 });
      this.HotelName_id = ''
      this.deletehotel = false

    },
      (error: any) => {
        console.log(error)
        this.toast.error({ detail: "ERROR", summary: error.error.message, duration: 3000 });
      })
  }

  // view hotel details
  viewHotelDetails(id: any, customBrand: any) {
    console.log(id)
    this.edit_hotel_details.Hotel_Name_id = id

    this.HotelService.edit_hotel(this.edit_hotel_details).subscribe((data: any) => {
      console.log(data)
      this.router.navigate([`/catalog`, { viewId: id, customBrand: customBrand }]);
    },err =>{
      this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
    })
  }

  vendor_budget(button = 'saw') {
    this.AppserviceService.vendor_budget(true)
  }
  add_new_vendor() {
    //  this.add_vendor=true
    // used in catalog table component 
    this.AppserviceService.cancelProducForm('brandProductVendor')
    localStorage.removeItem("editVendorDetails");

    // subscriped in addProductVendorComponent and catalogTable component
    this.AppserviceService.brandPrimaryVendor("")
  }
  transformPlacementData(brandProductsName: string): string {
    if (brandProductsName) {
      const words = brandProductsName.split(' ');
      if (words.length > 2) {
        return words.slice(0, 2).join(' ') + '..';
      } else {
        return brandProductsName;
      }
    }
    return ' ';
  }
  drawerClick(){
    this.up_slide = !this.up_slide
  }
}
