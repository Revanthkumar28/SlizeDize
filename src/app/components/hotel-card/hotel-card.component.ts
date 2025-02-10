import { Component, OnInit,Input } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.dev';

@Component({
  selector: 'b2b-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.css']
})
export class HotelCardComponent implements OnInit {
  @Input() allhoteldata:any= []
  updateClick:boolean=false
  defultImage :any = 'assets/hotel1.jpeg'
  deletehotel:boolean =false

  constructor(private router:Router,private route:ActivatedRoute,private http: HttpClient,private NgToastService:NgToastService,private AppserviceService:AppserviceService,private HotelService:HotelService) { }

  @Input() width :String = ''
  edit_hotel_details:any = {
    Hotel_Name_id :''
  }

  delete_hotel:any = {
    Hotel_Name_id : '',
    Hotel_Name : '',
    City : '',
  }

  test_4:any = ''

  apiUrl:any = environment.apiUrl;
  s3Bucket:any = environment.s3Bucket;

  isNewProduct:any =''
  hotelId :any = ''
  ngOnInit(): void {
    console.log(this.allhoteldata)

    // New Products
    this.route.paramMap.subscribe((params) => {
      let i = params.get("new_products");
      if (i) this.isNewProduct = i
    })

    this.route.paramMap.subscribe((params) => {
      let i = params.get("ids");
      if (i) this.hotelId = i
    })

    if(this.isNewProduct == 'new_products'){
      this.defultImage = this.allhoteldata.thumbnail_image_source
    }

  }

  editHotelDetails(id:any,custom:any){
    console.log(id)
    this.edit_hotel_details.Hotel_Name_id = id
   
    this.router.navigate(["/catalog" ,{ids:this.hotelId,customBrand:0}]);
  }
  
  deletepopup(){
    this.deletehotel =true
  }

  delete_hotel_details(){
    this.delete_hotel.Hotel_Name_id = this.allhoteldata.Hotel_Name_id
    this.delete_hotel.Hotel_Name = this.allhoteldata.hotelName
    this.delete_hotel.City = this.allhoteldata.city
    
    console.log(this.delete_hotel.Hotel_Name_id)
    const payload = {
      Hotel_Name_id: this.delete_hotel.Hotel_Name_id
    }
    if(this.delete_hotel.Hotel_Name_id != ''){
      this.HotelService.hotel_delete(payload).subscribe({
        next: (response) => {
          console.log(response)
          this.deletehotel =false

          this.NgToastService.success({detail:"SUCCESS",summary:'delete successfully',duration:3000});
        window.location.reload()
        },
        error: (error) => {
        
          console.log(error);
        },
      }
      )
    }
    
  }

  viewHotelDetails(id:any,custom:any){
    console.log(id)
    this.edit_hotel_details.Hotel_Name_id = id
   
    this.HotelService.edit_hotel(this.edit_hotel_details).subscribe((data :any) =>{
      console.log(data)

      this.router.navigate(["/catalog" ,{viewId:id,customBrand:custom}]);
    })
  }


  onFileSelecteddd(event:any): void {
    let selectedImage:any = ''
    const file: File = event.target.files[0];
    if (file) {
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        selectedImage = reader.result;
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('hotel_image', file, file.name);
      formData.append('id' , this.allhoteldata.id);

      this.HotelService.hotelImage(formData).subscribe(data => {
        console.log(data);
        this.test_4 = data;
        this.allhoteldata.hotelImage = selectedImage
        this.NgToastService.success({detail:"SUCCESS",summary:'Logo Updated Successfully',duration:2000});
      }, error => {
        this.NgToastService.error({detail: error.status + ' ' + error.statusText,summary: error.error.message,duration:2000});
      });
    }
  }

}
