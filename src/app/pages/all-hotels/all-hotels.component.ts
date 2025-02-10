import { Component, OnInit,Input } from '@angular/core';
import { MagentoProductService } from 'src/app/service/magento-product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { Location } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'b2b-all-hotels',
  templateUrl: './all-hotels.component.html',
  styleUrls: ['./all-hotels.component.css']
})
export class AllHotelsComponent implements OnInit {
  @Input() allhotel:any=""
  allHotelCount:any=""
  detailinformation:any=""
  kingBeds:any=""
  
  objectKeys = Object.keys
  producArray:any[]=[]
  filterCountryArr:any= []
  filterStateArr:any= []
  filterBrandArr:any= []


  filterCountryValue:any = ''
  filterStateValue:any = ''
  filterBrandValue:any = ''

  delete_hotel:any = {
    Hotel_Name_id : 'x',
   
  }

  test1: any = []

  feilds: any ={
    country :''
  }

  constructor(private router:Router,private route: ActivatedRoute,private HotelService:HotelService, private location: Location, private toast: NgToastService) { }

  ngOnInit(): void {
    this.filterCountryArr = []
     this.HotelService.getDetails().subscribe((data :any) =>{
      console.log(data)
      this.allhotel = data.hotel_registrations
      this.detailinformation=data.detail_informations

      // data.detail_informations.forEach((detail_id:any)=>{
      
        data.hotel_registrations.forEach((hotel_id:any)=>{
        this.filterCountryArr.push(hotel_id.Country)
         this.producArray.push({
          id : hotel_id.id,
          Hotel_Name_id : hotel_id.Hotel_Name_id,
          hotelName: hotel_id.Hotel_Name,
          roomCount: '',
          roomName:'',
          hotelImage :hotel_id.hotel_image,
          State: hotel_id.State,
          roomType: this.kingBeds,
          country:hotel_id.Country,
          city:hotel_id.City,
          custom_brand : hotel_id.custom_brand
        })
     
      })

      data.detail_informations.forEach((detail_id:any)=>{
        this.producArray.forEach((room:any) =>{
          if(room.Hotel_Name_id == detail_id.Hotel_Name_id){
            room.roomCount = detail_id.room_count
            room.roomName = detail_id.room_Name
          }
        })
      })

      this.filterCountryArr = Array.from(new Set(this.filterCountryArr));
      this.allHotelCount = this.objectKeys(this.allhotel).length
      console.log(this.producArray)
        
      })
  }
  goBack() {
    this.location.back();
  }
  
  test(){
    localStorage.removeItem("step-1");
    localStorage.removeItem('hotels_room');
    this.router.navigate(["/registration"], {relativeTo: this.route});
  }

  filterHotel(country:any){
    this.filterStateArr = []
    this.filterBrandArr = [] 
    this.filterCountryValue = country
    this.producArray = []
    console.log(country)

    this.allhotel.forEach((hotel_id:any)=>{
      this.detailinformation.forEach((detail_id:any)=>{
      if(detail_id.Hotel_Name_id==hotel_id.Hotel_Name_id){
        console.log(detail_id)
        this.kingBeds=detail_id.room_type
        if(hotel_id.Country == country){
          this.filterStateArr.push(hotel_id.state_full_name)
          this.filterBrandArr.push(hotel_id.hotel_brand_name )
          console.log(this.filterBrandArr)

          this.producArray.push({
            hotelName:hotel_id.Hotel_Name,
            roomCount:detail_id.room_count,
            roomName:detail_id.room_Name,
            State:hotel_id.state_full_name,
            roomType:this.kingBeds,
            country:hotel_id.Country,
          })
        }
        
        }
        })
    })
    this.filterStateArr = this.filterStateArr.filter((value:any, index:any, self:any) => self.indexOf(value) === index);
    this.filterBrandArr = this.filterBrandArr.filter((value:any, index:any, self:any) => self.indexOf(value) === index);

  console.log(this.filterStateArr)

  // this.HotelService.getDetails().subscribe((data :any) =>{

  //   data.hotel_registrations.forEach((hotel_id:any)=>{
  //     // this.filterCountryArr.push(hotel_id.Country)
  //     if(hotel_id.Country == country){
  //       this.producArray.push({
  //         id: hotel_id.id,
  //         Hotel_Name_id : hotel_id.Hotel_Name_id,
  //         hotelName: hotel_id.Hotel_Name,
  //         roomCount: '',
  //         roomName:'',
  //         hotelImage :hotel_id.hotel_image,
  //         State: hotel_id.State,
  //         roomType: this.kingBeds,
  //         country:hotel_id.Country,
  //         city:hotel_id.City
  //       })
  //     }
      
  //   })

  // })


  

  // this.detailinformation.forEach((detail_id:any)=>{
  //   this.producArray.forEach((room:any) =>{
  //     if(room.Hotel_Name_id == detail_id.Hotel_Name_id){

  //       room.roomCount = detail_id.room_count
  //       room.roomName = detail_id.room_Name
  //     }
  //   })
  // })

  // this.filterStateArr = Array.from(new Set(this.filterStateArr));

  }

  All(){
    this.filterCountryValue = '';
    this.filterStateValue = '';
    this.filterBrandValue = '';

    this.producArray =[]
    this.ngOnInit()

    console.log(this.producArray)
  }

  filterState(state:any){
    this.filterStateValue = state

    this.producArray = []
    console.log(state)
    this.allhotel.forEach((hotel_id:any)=>{

      this.detailinformation.forEach((detail_id:any)=>{
      if(detail_id.Hotel_Name_id==hotel_id.Hotel_Name_id){
        console.log(detail_id)
        this.kingBeds=detail_id.room_type
        if(hotel_id.state_full_name == state){
          this.producArray.push({
            hotelName:hotel_id.Hotel_Name,
            roomCount:detail_id.room_count,
            roomName:detail_id.room_Name,
            State:hotel_id.state_full_name,
            roomType:this.kingBeds,
            country:hotel_id.Country,
          })
        }
        
        }
        })
  })
  }

  filterBrand(brand:any){
    this.filterBrandValue = brand

    this.producArray = []
    console.log(brand)
    this.allhotel.forEach((hotel_id:any)=>{

      this.detailinformation.forEach((detail_id:any)=>{
      if(detail_id.Hotel_Name_id==hotel_id.Hotel_Name_id){
        console.log(detail_id)
        this.kingBeds=detail_id.room_type
        if(hotel_id.hotel_brand_name == brand){
          this.producArray.push({
            hotelName:hotel_id.Hotel_Name,
            roomCount:detail_id.room_count,
            roomName:detail_id.room_Name,
            State:hotel_id.State,
            roomType:this.kingBeds,
            country:hotel_id.Country,
          })
        }
        
        }
        })
  })
  }

  delete_hotel_details(){
    this.HotelService.hotel_delete(this.delete_hotel).subscribe((data :any) =>{
      console.log(data)
    })
  }

}
