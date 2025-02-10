import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/compat/app';
import {infromationDetails } from 'src/app/models/interfaces';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { Location } from '@angular/common';

interface value{
  product:string;
  countePro:string
}
@Component({
  selector: 'b2b-hotel-information',
  templateUrl: './hotel-information.component.html',
  styleUrls: ['./hotel-information.component.css']
})
export class HotelInformationComponent implements OnInit {
 
  inputValue:string='';
  lableText:string='';
  stepper_2:boolean = false;
  t:any=''
  t1:any=''
  t2:any=''
  arr:any =[]

  hotelrooms:any =''

  productBy_brand :any= []
  brand_by:any={
    brand_id:''
  }
  brand:any=[]

  brandBy_item:any=[]
 
  steper:any='--color-dark-dim-white';
  data1:any=[
    {
      type:'Guest Rooms',
      icon:'meeting_room',
      roomType: 'Bed',
      room:[
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'guest room',
          room_Name:'Single Beds',
          room_count: ''
        },
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss', 
          room_type:'guest room',
          room_Name:'Double Beds',
          room_count: ''
        },
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'guest room',
          room_Name:'Queen Beds',
          room_count: ''
        },
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'guest room',
          room_Name:'King Beds',
          room_count: ''
        },
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'guest room',
          room_Name:'California King Beds',
          room_count: ''
        },
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'guest room',
          room_Name:'Rollaway Beds',
          room_count: ''
        }
      ]
    },
    {
      type:'Kitchen',
      icon:'kitchen',
      roomType: 'Kitchen',

      room:[
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'kitchen',
          room_Name:'No of Kitchen',
          room_count:''
        },
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'kitchen',
          room_Name:'PAX Food Preparation',
          room_count:''
        },
       
      ]
    },
    {
      type:'Restaurant',
      icon:'restaurant',
      roomType: 'Restaurant',

      room:[
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'Restaurant',
          room_Name:'Chinese',
          room_count:''
        },
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'Restaurant',
          room_Name:'Indian',
          room_count:''
        },
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'Restaurant',
          room_Name:'Italian',
          room_count:''
        },
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'Restaurant',
          room_Name:'Coffee Shop',
          room_count:''
        },
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'Restaurant',
          room_Name:'QSR/Fast Food List',
          room_count:''
        },
       ]
    },
    {
      type:'SPA',
      icon:'spa',
      roomType:'SPA',
      room:[
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'SPA',
          room_Name:'SPA',
          room_count:''
        },
        
       ]
    },
    {
      type:'Wet Bar',
      icon:'wine_bar',
      roomType:'Wet Bar',

      room:[
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'Wet Bar',
          room_Name:'BAR',
          room_count:''
        },
        
       ]
    },
    {
      type:'Salon',
      icon:'content_cut',
      roomType:'Salon',

      room:[
        {
          Hotel_Name_id:'1',
          City : 'IN',
          Hotel_Name:'ss',
          Hotel_Brand:'ss',
          room_type:'Salon',
          room_Name:'Salon',
          room_count:''
        },
        
       ]
    }
  ]


  edit_hotel_details:any = {
    Hotel_Name_id :'',
    custom_brand :''
  }

  viewHotelDetailes:any = {
    Hotel_Name_id :''
  }

  viewProductHotelCustom :any = ''

  guestRoom :any = 0
  editTest :any =''
 
constructor(private router: Router,private toast: NgToastService, private route: ActivatedRoute, private auth: AngularFireAuth,private HotelService:HotelService, private AppserviceService:AppserviceService,private location: Location) {
}

ngOnInit(): void {
  // this.HotelService.brand_name().subscribe((d:any)=>{
  //   this.brand = d

  // })

  this.route.paramMap.subscribe((params) => {
    let id = params.get("viewId");
    let customBrand = params.get("customBrand");
    let editTest = params.get("editTest");

    if (id) this.viewHotelDetailes.Hotel_Name_id = id;

    if (customBrand) {
      this.viewProductHotelCustom = customBrand
    }

    if (editTest) {
      this.editTest = editTest
    }
  })


  this.route.paramMap.subscribe((params) => {
    let id = params.get("ids");
    let customBrand = params.get("customBrand");

    if (id) this.edit_hotel_details.Hotel_Name_id = id;

    if (customBrand) {
      this.edit_hotel_details.custom_brand = customBrand
    }
  })


  this.hotelrooms = JSON.parse(localStorage.getItem('hotels_room') || "[]")

  this.hotelrooms.forEach((room_count:any) => {
    this.data1.forEach((defualt_room:any) => {

      defualt_room.room.forEach((roomType:any) => {

        if(roomType.room_Name == room_count.room_Name){
          roomType.room_count = room_count.room_count
        }

      });

    });
  });

  if(this.viewHotelDetailes.Hotel_Name_id != ''){
    this.HotelService.edit_hotel(this.viewHotelDetailes).subscribe((data :any) =>{
      console.log(data)
      // data.roomCount.forEach((d:any) =>{
      //   if(d.room_type == 'guest room'){
      //     this.data1.forEach((a:any) => {
  
      //       if(a.room_type == 'guest room'){
      //         a.room.forEach((b:any) => {
      //           if(b.room_Name == 'Double Beds'){
      //             b.room_count = d.room_count 
      //           }
      //         }); 
      //       }
  
      //     });
      //   }
      // })
  
      data.roomCount.forEach((room_count:any) => {
        this.data1.forEach((defualt_room:any) => {
    
          defualt_room.room.forEach((roomType:any) => {
    
            if(roomType.room_Name == room_count.room_Name){
              roomType.room_count = room_count.room_count
            }
    
          });
    
        });
      });
    })
  }


  if(this.edit_hotel_details != '' && this.editTest != '0'){
    this.HotelService.edit_hotel(this.edit_hotel_details).subscribe((data :any) =>{
      console.log(data)
 
      data.roomCount.forEach((room_count:any) => {
        this.data1.forEach((defualt_room:any) => {
    
          defualt_room.room.forEach((roomType:any) => {
    
            if(roomType.room_Name == room_count.room_Name){
              roomType.room_count = room_count.room_count
            }
    
          });
    
        });
      });
    })

  }
  
   
}



register():any {
  this.arr =[]
  this.guestRoom = 0
  this.data1.map((t:any)=> {

    t.room.map((d:any)=> {
       if(d.room_count != 0){
        this.arr.push(d)
        // this.toast.success({detail:"SUCCESS",summary:'Sucessfully register Hotel Rooms',duration:3000});
       }
    })

  })
  console.log(this.arr)

  // this.router.navigate(["/catalog"], {relativeTo: this.route});
  if(Object.keys(this.arr).length == 0 ){
    this.toast.error({detail:"ERROR",summary:'Please enter your guest room details',duration:2000});
  }else{
    console.log(this.arr)

    localStorage.setItem('hotels_room', JSON.stringify(this.arr));

    this.arr.forEach((room:any) => {

      if(room.room_type == 'guest room'){
        this.guestRoom++
      }

    });

    if(this.guestRoom > 0){
      this.toast.success({detail:"SUCCESS",summary:'Successfully Registered Hotel Rooms',duration:3000});
      // this.router.navigate(["/catalog"], {relativeTo: this.route});

      // test
      if(this.viewHotelDetailes.Hotel_Name_id != '' || this.edit_hotel_details.Hotel_Name_id != ''){
        const payload = {
          Hotel_Name_id : this.edit_hotel_details.Hotel_Name_id,
          rooms : this.arr
        }
        console.log(this.arr)
        this.HotelService.edit_hotel_screen(payload).subscribe((res)=>{
          console.log(res)
        })
        this.router.navigate(['/catalog',{ids:this.edit_hotel_details.Hotel_Name_id,customBrand:this.edit_hotel_details.custom_brand,editest:'0'}])
      }else{
        this.router.navigate(["/catalog"], {relativeTo: this.route});
      }
    }else{
      this.toast.error({detail:"ERROR",summary:'Please Enter Your Guest Room Details',duration:2000});
    }
    
  }
  
  if(this.stepper_2 == false){
    this.stepper_2 = true;
  }

  // console.log(this.data1) 
 }

 update(){
  this.router.navigate(['/catalog',{ids:this.edit_hotel_details.Hotel_Name_id,customBrand:this.edit_hotel_details.custom_brand}])

 }


 view(){
    if(this.viewHotelDetailes.Hotel_Name_id != ''){
      this.router.navigate(['/catalog',{viewId:this.viewHotelDetailes.Hotel_Name_id,customBrand:this.viewProductHotelCustom}])
    }

    // if(this.edit_hotel_details.Hotel_Name_id != ''){
    //   this.router.navigate(['/catalog',{ids:this.edit_hotel_details.Hotel_Name_id}])
    // }

    // if(this.edit_hotel_details.Hotel_Name_id == '' && this.viewHotelDetailes.Hotel_Name_id == ''){
    //   this.router.navigate(['/catalog'])
    // }
 }
 test(){
  this.stepper_2 = true;
 }

 brand_items(datas:any){
  this.productBy_brand = []
  this.brandBy_item = []
  console.log(this.brand_by)
  this.brand_by.brand_id = datas
 }

 numericPattern = /^[0-9]*$/;
 numericOnly(event :any){
   return this.numericPattern.test(event.key);
 }

 updateI(){

  if(this.viewHotelDetailes.Hotel_Name_id != ''){
    this.router.navigate(['/registration',{viewId:this.viewHotelDetailes.Hotel_Name_id,customBrand:this.viewProductHotelCustom}])
  }

  if(this.edit_hotel_details.Hotel_Name_id != ''){
    this.router.navigate(['/registration',{ids:this.edit_hotel_details.Hotel_Name_id,customBrand:this.viewProductHotelCustom}])
  }

  if(this.edit_hotel_details.Hotel_Name_id == '' && this.viewHotelDetailes.Hotel_Name_id == ''){
    this.router.navigate(['/registration'])
  }

  // if(this.viewHotelDetailes.Hotel_Name_id == ''){
  //   this.location.back();
  // }else{
  //   this.router.navigate(['/registration',{viewId:this.viewHotelDetailes.Hotel_Name_id,customBrand:this.viewProductHotelCustom}])
  // }

 }
  
}



 