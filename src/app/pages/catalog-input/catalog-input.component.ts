import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vendorDetails, vendorDetailValidation, Country, State, City } from 'src/app/models/interfaces';
import { NgToastService } from 'ng-angular-popup';
import { CountryStateCityService } from 'src/app/service/country-state-city/country-state-city.service';
import { RegisterFormService } from 'src/app/service/registerDetails/register-form.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { Location } from '@angular/common';

@Component({
  selector: 'b2b-catalog-input',
  templateUrl: './catalog-input.component.html',
  styleUrls: ['./catalog-input.component.css']
})
export class CatalogInputComponent implements OnInit {
  hotelName: string[] = ['Full Service Hotel', ' Restaurent', 'Bars']
  groupName: string[] = ['Ambassador Group of Hotels.', 'Casino Group of Hotels.', 'Fortune Park Group of Hotels.']
  hotels: string[] = ['Hilton', ' Marriott', 'Hyatt Hotels']

  alphanumeric: boolean = false;
  numeric: boolean = true;
  errorText: boolean = false;
  sessionValue: any = '';
  steper: boolean = false;
  Back: boolean = false

  filterData: string = '';
  stateData: string = '';
  cityData: string = '';
  industrySeach: string = '';
  user: any = ''
  errorText_rooms: any = ''
  addressError: boolean = false;

  restoreData: any = {}


  vendorDetail: any = {
    Hotel_Name_id: "",
    Hotel_Name: "",
    Hotel_Brand: "",
    user_id: "",
    Industry_Type: "",
    Group_Name: "",
    Number_Of_Rooms_Keys: "",
    Street_1: "",
    Street_2: "",
    Country: "",
    State: "",
    state_full_name: '',
    City: "",
    Zip_Code: "",
    PAN: "",
    GST: "",
    custom_brand: "",
    room_Name: "",
    room_count: "1",
    room_type: "1"
  }
  vendorDetailVadidation: any = {
    user_id: true,
    Industry_Type: true,
    Group_Name: true,
    Hotel_Name: true,
    Number_Of_Rooms_Keys: true,
    Street_1: true,
    Street_2: true,
    Country: true,
    City: true,
    State: true,
    Zip_Code: true,
  }


  viewProductHotelCustom: any = ''




  constructor(private location: Location, private router: Router, private route: ActivatedRoute, private toast: NgToastService, private CountryStateCityService: CountryStateCityService, private RegisterFormService: RegisterFormService, private HotelService: HotelService, private AppserviceService: AppserviceService) { }

  zipCodes: (string)[] = [];

  listcountry!: Country[]
  countrySelected!: string
  listState!: State[]
  selectedState!: string
  listCity!: City[]

  typeOfIndustry: any = []

  country: any = ''
  state: any = ''

  updatebutton: boolean = false
  continuebutton: boolean = true

  edit_hotel_details: any = {
    Hotel_Name_id: '',
    custom_brand: ''
  }

  viewHotelDetailes: any = {
    Hotel_Name_id: ''
  }

  ngOnInit(): void {

    this.HotelService.getDetails().subscribe((data: any) => {
      if (data.hotel_registrations.length == 0) {
        this.Back = false
      } else {
        this.Back = true
      }
    })


    this.route.paramMap.subscribe((params) => {
      let id = params.get("viewId");
      let customBrand = params.get("customBrand");

      if (id) this.viewHotelDetailes.Hotel_Name_id = id;

      if (customBrand) {
        this.viewProductHotelCustom = customBrand
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

    this.restoreData = JSON.parse(localStorage.getItem('step-1') || "[]")

    if (this.restoreData != '') {

      this.vendorDetail.user_id = this.restoreData.user_id
      this.vendorDetail.Hotel_Brand = this.restoreData.Hotel_Brand
      this.vendorDetail.Hotel_Name_id = this.restoreData.Hotel_Name_id
      this.vendorDetail.Hotel_Name = this.restoreData.Hotel_Name
      this.vendorDetail.Industry_Type = this.restoreData.Industry_Type
      this.vendorDetail.Group_Name = this.restoreData.Group_Name
      this.vendorDetail.Number_Of_Rooms_Keys = this.restoreData.Number_Of_Rooms_Keys
      this.vendorDetail.Street_1 = this.restoreData.Street_1
      this.vendorDetail.Street_2 = this.restoreData.Street_2
      this.vendorDetail.Country = this.restoreData.Country
      this.vendorDetail.State = this.restoreData.State
      this.vendorDetail.state_full_name = this.restoreData.state_full_name
      this.vendorDetail.City = this.restoreData.City
      this.vendorDetail.Zip_Code = this.restoreData.Zip_Code
      this.vendorDetail.PAN = this.restoreData.PAN
      this.vendorDetail.GST = this.restoreData.GST

    }


    if (this.edit_hotel_details.Hotel_Name_id != '') {

      this.HotelService.edit_hotel(this.edit_hotel_details).subscribe((data: any) => {
        // data.forEach((d:any) =>{
        // this.vendorDetail.Hotel_Name = d.Hotel_Name
        data.hotelEdit.forEach((d: any) => {
          this.vendorDetail.user_id = d.user_id
          this.vendorDetail.Hotel_Brand = d.Hotel_Brand
          this.vendorDetail.Hotel_Name_id = this.edit_hotel_details.Hotel_Name_id
          this.vendorDetail.Hotel_Name = d.Hotel_Name
          this.vendorDetail.Industry_Type = d.Industry_Type
          this.vendorDetail.Group_Name = d.Group_Name
          this.vendorDetail.Number_Of_Rooms_Keys = d.Number_Of_Rooms_Keys
          this.vendorDetail.Street_1 = d.Street_1
          this.vendorDetail.Street_2 = d.Street_2
          this.vendorDetail.Country = d.Country
          this.vendorDetail.State = d.State
          this.vendorDetail.state_full_name = d.state_full_name
          this.vendorDetail.City = d.City
          this.vendorDetail.Zip_Code = d.Zip_Code
          this.vendorDetail.PAN = d.PAN
          this.vendorDetail.GST = d.GST

          this.fetchCountry(d.Country)
        })
        // })
      })

    }

    if (this.viewHotelDetailes.Hotel_Name_id != '') {

      this.HotelService.edit_hotel(this.viewHotelDetailes).subscribe((data: any) => {
        // data.forEach((d:any) =>{
        // this.vendorDetail.Hotel_Name = d.Hotel_Name
        data.hotelEdit.forEach((d: any) => {
          this.vendorDetail.user_id = d.user_id
          this.vendorDetail.Hotel_Brand = d.Hotel_Brand
          this.vendorDetail.Hotel_Name_id = this.edit_hotel_details.Hotel_Name_id
          this.vendorDetail.Hotel_Name = d.Hotel_Name
          this.vendorDetail.Industry_Type = d.Industry_Type
          this.vendorDetail.Group_Name = d.Group_Name
          this.vendorDetail.Number_Of_Rooms_Keys = d.Number_Of_Rooms_Keys
          this.vendorDetail.Street_1 = d.Street_1
          this.vendorDetail.Street_2 = d.Street_2
          this.vendorDetail.Country = d.Country
          this.vendorDetail.State = d.State
          this.vendorDetail.state_full_name = d.state_full_name
          this.vendorDetail.City = d.City
          this.vendorDetail.Zip_Code = d.Zip_Code


        })
        // })


      })

    }





    let reg_details = sessionStorage.getItem("business");

    if (reg_details) {
      this.vendorDetail = JSON.parse(reg_details);
    }

    this.RegisterFormService.industrysType().subscribe((data) => {

      this.typeOfIndustry = data;
    })

    this.AppserviceService.userSource$.subscribe(x => {
      this.user = x;
      // this.signupDetails = x; 
    })


    this.fetchCountry(this.vendorDetail.Country);

  }



  register() {
    // this.vendorDetail.State = this.state

    console.log(this.vendorDetail)
    this.AppserviceService.allDatas(this.vendorDetail);
    // this.toast.error({detail:"ERROR",summary:'Your Error Message',sticky:false,duration:5000});
    this.validateInput()

    if (this.vendorDetail.Industry_Type == '') {
      // this.vendorDetailVadidation.industry_type = false;
      // status = false;
      console.log('this.vendorDetailVadidation');
      this.errorText = true;

    }

  }


  update(room_name: any) {

    if (this.viewHotelDetailes.Hotel_Name_id == '') {

      this.HotelService.update_hotel(this.vendorDetail).subscribe({
        next: (response) => {
          console.log(response)
          this.toast.success({ detail: "SUCCESS", summary: 'Updated Hotel Successfully', duration: 2000 });
          localStorage.setItem('hotelName', JSON.stringify({ hatelName: this.vendorDetail.Hotel_Name }))

          this.router.navigate(["/detail-information", { ids: this.edit_hotel_details.Hotel_Name_id, customBrand: this.edit_hotel_details.custom_brand }]);

        },
        error: (error) => {
          this.toast.error({ detail: "ERROR", summary: 'Update Failed', duration: 3000 });
          console.log(error);
        },
      })

    } else {
      this.router.navigate(["/detail-information", { viewId: this.viewHotelDetailes.Hotel_Name_id, customBrand: this.viewProductHotelCustom }]);
    }

    console.log(this.vendorDetail)

  }


  validateInput(): any {
    let status: boolean = true;

    if (this.vendorDetail.Industry_Type == '') {
      // this.vendorDetailVadidation.industry_type = false;
      status = false;
      console.log('this.vendorDetailVadidation');
      this.errorText = true;

    }

    // if(this.vendorDetail.group_name.length == 0) {
    //   this.vendorDetailVadidation.group_name = false;
    status = false;
    // }


    if (this.vendorDetail.Hotel_Name == '') {
      // this.vendorDetailVadidation.hotels_name = false;
      status = false;
      this.errorText = true;

    }


    if (this.vendorDetail.Number_Of_Rooms_Keys == '' || this.vendorDetail.Number_Of_Rooms_Keys == 0 || this.vendorDetail.Number_Of_Rooms_Keys > 10000) {
      // this.vendorDetailVadidation.number_of_room_key = false;
      status = false;
      this.errorText_rooms = true;

    } else { this.errorText_rooms = false; }
    // if( this.vendorDetail.number_of_room_key == 0) {
    //   // this.vendorDetailVadidation.number_of_room_key = false;
    //   status = false;
    this.errorText = true;

    // }
    if (this.vendorDetail.Street_1 == '') {
      // this.vendorDetailVadidation.country = false;
      status = false;
      this.errorText = true;

    }
    if (this.vendorDetail.Street_2 == '') {
      // this.vendorDetailVadidation.country = false;
      status = false;
      this.errorText = true;

    }
    if (this.vendorDetail.Country == '') {
      // this.vendorDetailVadidation.country = false;
      status = false;
      this.errorText = true;
      this.addressError = true;

    }

    if (this.vendorDetail.State == '') {
      // this.vendorDetailVadidation.state = false;
      status = false;
      this.errorText = true;

    }

    if (this.vendorDetail.City == '') {
      // this.vendorDetailVadidation.city = false;
      status = false;
      this.errorText = true;

    }

    if (this.vendorDetail.Zip_Code == '') {
      // this.vendorDetailVadidation.Zip_Code = false;
      status = false;
      this.errorText = true;

    }

    // FIRST LETTER CAPITALIZE
    for (let key in this.vendorDetail) {
      if (typeof this.vendorDetail[key] === 'string') {
        this.vendorDetail[key] = this.capitalizeFirstLetter(this.vendorDetail[key]);
      }
    }

    if (this.vendorDetail.Industry_Type != '' && this.vendorDetail.Hotel_Name != '' && this.vendorDetail.Number_Of_Rooms_Keys != '' && this.vendorDetail.Number_Of_Rooms_Keys <= 10000 && this.vendorDetail.Number_Of_Rooms_Keys != 0 && this.vendorDetail.Country.length != 0 && this.vendorDetail.State != '' && this.vendorDetail.City != '' && this.vendorDetail.Zip_Code != '' && this.vendorDetail.Street_1 != '') {
      this.toast.success({ detail: "SUCCESS", summary: 'Success - You Have Entered The Hotel Details', duration: 5000 });
      localStorage.setItem('step-1', JSON.stringify(this.vendorDetail));
      this.steper = true;
      this.router.navigate(["/detail-information"], { relativeTo: this.route });
      //   this.HotelService.hotelRegisteration(this.vendorDetail).subscribe((d:any) =>{
      //     this.router.navigate(["/detail-information"], {relativeTo: this.route});
      //      console.log(d),
      //     (error:any) => {
      //     console.log(error)
      // } 
      // })

    }
  }

  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  fetchCountry(countrys: any) {
    this.CountryStateCityService.hotel_countery().subscribe(data => {
      this.listcountry = data.countries
      console.log(countrys)
      this.listcountry.forEach((country: any) => {
        if (country.name == countrys) {
          this.onCountrySelected(country)
        }
      })
      console.log(data)

      // HOTEL BRAND
      let hotel_brand:any = []
      // this.CountryStateCityService.hotel_countery().subscribe((res:any) => {
        console.log(data.countries)
        hotel_brand = data.countries.map((item: any) => item.iso2);
        this.listcountry = data.countries.filter((item: any) => hotel_brand.includes(item.iso2));
        // res.countries.forEach((country:any) => {
        //   hotel_brand = 
        // });
        if(data.countries.length == 0){
          this.toast.error({detail:"ERROR",summary:'No Hotel brand country',sticky:false,duration:5000});
        }
      // })
    },(err) =>{
      this.toast.error({detail:"ERROR",summary:'Hotel country server error',sticky:false,duration:5000});
    })

  }

  onCountrySelected(obj:any) {

    this.country = obj.iso2;
    const payload = {
      country_id : obj.id
    }

    this.CountryStateCityService.hotel_countery_start(payload).subscribe(data => {
      this.listState = data.states;
      // console.log(data)

      data.states.forEach((state: any) => {

        if (state.name == this.vendorDetail.state_full_name) {
          this.onStateSelected(state)
        }
      })

    })

    if (obj.name != this.vendorDetail.Country) {
      this.vendorDetail.Country = obj.name;

      this.vendorDetail.state_full_name = ''
      this.vendorDetail.City = ''
      this.vendorDetail.Zip_Code = ''
    }

    if (this.vendorDetail.country == 'United Kingdom' || this.vendorDetail.Country == 'Canada' || this.vendorDetail.Country == 'Ireland' || this.vendorDetail.Country == 'Brunei' || this.vendorDetail.Country == 'Netherlands' || this.vendorDetail.Country == 'KazaKhstan' || this.vendorDetail.country == 'Argentina' || this.vendorDetail.country == 'Swaziland' || this.vendorDetail.country == 'Malta' || this.vendorDetail.country == 'Peru' || this.vendorDetail.country == 'Somalia') {
      this.alphanumeric = true
      this.numeric = false
    }
    else {
      this.alphanumeric = false
      this.numeric = true
    }

    // this.vendorDetail.State =''

  }


  onStateSelected(state:any) {
    console.log(state)
    const result = state.name.split(' ') // Split the string by spaces
                  .map((word:any) => word[0]) // Get the first letter of each word
                  .join('');
    this.vendorDetail.State = result;
    // this.vendorDetail.state_full_name = stateName

    if (state.name != this.vendorDetail.state_full_name) {
      this.vendorDetail.state_full_name = state.name;

      this.vendorDetail.City = ''
      this.vendorDetail.Zip_Code = ''
    }

    const payload = {
      country_id : state.country_id,
      state_id : state.id
    }

    this.state = state.iso2;
    this.CountryStateCityService.hotel_countery_start_city(payload).subscribe(data => {
      console.log(data)
      this.listCity = data.city
      // console.log('Cities retrieved', this.listCity)
    })
    // this.vendorDetail.City =''

  }

  onStateCity(city: any) {

    if (city != this.vendorDetail.City) {
      this.vendorDetail.City = city;

      this.vendorDetail.Zip_Code = ''
    }

  }

  getHotel(hotel: string) {
    this.vendorDetail.Industry_Type = hotel;
  }
  groupNames(group: string) {
    this.vendorDetail.Group_Name = group;
  }
  gethotels(hotels: string) {
    this.vendorDetail.Hotel_Name = hotels;
  }
  addressError1() {
    this.addressError = false;
  }

  numericPattern = /^[0-9]*$/;
  numericOnly(event: any) {
    return this.numericPattern.test(event.key);
  }


  previousCatalog() {

    localStorage.setItem('hotelName', JSON.stringify({ hatelName: this.vendorDetail.Hotel_Name }))
    if (this.edit_hotel_details.Hotel_Name_id || this.viewHotelDetailes.Hotel_Name_id) {
      this.router.navigate(['/console/catalog', { ids: this.edit_hotel_details.Hotel_Name_id }])
    } else {
      this.router.navigate(['/console/all-hotels'])
    }
    // this.location.back();
  }
  back() {
    if (this.edit_hotel_details.Hotel_Name_id) {
      this.router.navigate(['/console/catalog', { ids: this.edit_hotel_details.Hotel_Name_id }])
    } else {
      this.router.navigate(['/console/all-hotels'])
    }
    // this.location.back();
  }
}

