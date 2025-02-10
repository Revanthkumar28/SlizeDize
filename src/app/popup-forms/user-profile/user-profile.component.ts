import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { CountryStateCityService } from 'src/app/service/country-state-city/country-state-city.service';
import { RegistrationDetails, Country, State, City } from 'src/app/models/interfaces';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'b2b-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Output() cancelpopup = new EventEmitter();
  @Input() vendorProfile:any=''
  @Input() type_user:any={}
  hotel_country:any=''
  usertype:any=''
   country: any = ''
    cityData: any = ''
    stateFilter: any = '';
  screen:any=''
  isAllRequireData: boolean = false

  addvendor:boolean=false
  constructor(private HotelService:HotelService,private AppserviceService:AppserviceService,private CountryStateCityService: CountryStateCityService,private toast: NgToastService) { }
  edit_vendor_data:any={}
  vendorid:any=''
  emptyprofile='https://th.bing.com/th?id=OIP.LftRMxkISZ37h5xsxfDCWQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
  user = {
    profilePicture: '',
    name: '',
    email: '',
    vendor_address: '',
    user_address:'',
    mobileNumber: '',
    landline:'',
    companyname:'',
      zipcode:'',
      department:'',
      designation:'',
      industrytype:'',
      contactPersonName:'',
      products:'',
      SP:'',
      PP:'',
      productUrl:''
    // Add more fields as needed
  };
  add_product_table: any = {
    product_Name: '',
    SKU_id: '',
    description: '',
    vendor: '',
    vendor_name: "",
    hotel_id: '0',
    hotel_wide_usage: '',
    lead_time: '',
    order_frequency: '',
    box_quantity: '',
    price: '',
    manufactured: '',
    product_image: '',
    ESG: '-',
    placement: '',
    Email: '',
    newVendor: "0",
    fullName: "Alex",
    mobileNumber: "",
    typeOfIndustry: "",
    companyName: "",
    street1: "",
    street2: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    headoffice: "aa",
    contactPersonName: "",
    products: "",
    position: "",
    website: "",
    productUrl: "",
    SupplierType: 2,
    land_line: '000',
    hotel_name_id: '',
    product_id: '0'

  }
  listcountry: any[] = []
  username: any = ''
  listState!: State[]
  listCity!: City[]
    state: any = ''
     po_access : any = '1'
  so_access: any = '0'
  filterData: any = '';
  uploadImage: any = 'https://arthurmillerfoundation.org/wp-content/uploads/2018/06/default-placeholder.png'
  imageFile: File | null = null;
  cityFilter: any = '';
   vendor_profile: any = ''
  typeOfIndustry:any=[]
  position_type:any=[]
  ngOnInit(): void {
    console.log(this.type_user.user_type)
    this.userprofile()
    this.filterData = ''
    this.AppserviceService.refreshprofile$.subscribe((refresh:any)=>{
        console.log(refresh)
        if(refresh == 'reload'){
          this.userprofile()
        }
    })
    if (this.type_user.user_type == 'he'){
    this.AppserviceService.userdepartment$.subscribe((data:any)=>{
          console.log(data)
          this.user.department = data.deparment
          this.user.designation = data.designation
          console.log(this.user.designation)

    })
    }
    if (this.type_user.user_type == 'vu'){
    this.HotelService.drop_down_values_for_vendor().subscribe(datas => {
      console.log(datas)
      this.typeOfIndustry = datas.TypeOfIndustry
      console.log(this.typeOfIndustry)
      this.position_type = datas.Position
    })
    }
    this.AppserviceService.Hotel_country$.subscribe((country:any)=>{
      console.log(country)
      this.hotel_country = country
      this.add_product_table.country = country
      if(country){
        // this.fetchCountry();
        this.listcountry.find((coutry_code:any) =>{
          if(coutry_code.name == country){
            this.onCountrySelected(coutry_code.iso2,country)
          }
        })
      }
    })    // f
  }
 userprofile(){
  this.HotelService.user_name().subscribe((data :any) =>{    
      
    this.edit_vendor_data = data[0]
    console.log(this.edit_vendor_data.profile_photo_path)
    
    
    this.user.name = this.edit_vendor_data.name
    this.user.email=this.edit_vendor_data.email
    this.user.mobileNumber=this.edit_vendor_data.mobileNumber
    this.user.landline=this.edit_vendor_data.land_line
    this.user.vendor_address =this.edit_vendor_data.street1+', '+this.edit_vendor_data.street2+', ' + this.edit_vendor_data.city+ ', '+this.edit_vendor_data.state+', '+this.edit_vendor_data.country
    this.user.user_address = this.edit_vendor_data.city+ ', '+this.edit_vendor_data.state+', '+this.edit_vendor_data.country

    this.user.zipcode = this.edit_vendor_data.zipCode
    this.user.profilePicture= this.edit_vendor_data.profile_photo_path != null ? this.edit_vendor_data.profile_photo_path:this.emptyprofile
    // this.user.designation =this.edit_vendor_data.position
    this.user.industrytype=this.edit_vendor_data.typeOfIndustry
    this.user.companyname = this.edit_vendor_data.companyName
    this.user.contactPersonName =this.edit_vendor_data.contactPersonName
    this.user.products=this.edit_vendor_data.products
    this.user.productUrl = this.edit_vendor_data.productUrl
    this.usertype = this.edit_vendor_data.user_type
    this.vendorid = this.edit_vendor_data.vender_id
    this.user.SP = this.edit_vendor_data.service_access
    this.user.PP = this.edit_vendor_data.po_access

    console.log(this.vendorid)
    
    // Storing data in local storage
     localStorage.setItem('vendorId',this.vendorid);



  })
 }
  close_window(){
    this.cancelpopup.emit(false);
  }
  //  VENDOR PROFILE EDIT
  profileEdit(screen:any,type:any){
    this.screen = screen
    this.usertype= type
    console.log(this.screen,this.usertype)
    // this.AppserviceService.cancelProducForm('editOpen')

    // localStorage.setItem('editVendorDetails', JSON.stringify(this.edit_vendor_data));

   this.addvendor=true
   this.assigneditvalues()
  }
  fetchCountry() {
    this.CountryStateCityService.getCountry().subscribe(data => {
      this.listcountry = data

      this.listcountry.find((coutry_code:any) =>{
        if(coutry_code.name == this.hotel_country){
          this.onCountrySelected(coutry_code.iso2,this.hotel_country)
        }
      })

    
    })

  }

  onCountrySelected(countryIso: any, countryName: any) {
    this.add_product_table.country = countryName;
    this.country = countryIso;
    this.CountryStateCityService.getStateOfSelectedCountry(countryIso).subscribe(data => {
      this.listState = data;
      console.log(this.listcountry)

      // only when edit vendor details
   

    })

  }

  onStateSelected(stateIso: any, stateName: any) {
    this.add_product_table.state = stateName;
    this.state = stateIso;
    this.CountryStateCityService.getCitiesOfSelectedState(this.country, this.state).subscribe(data => {
      console.log(data)
      this.listCity = data
    })

    


  }

  onStateCity(city: any) {
    this.cityFilter = '';
    this.cityData = city
  }
  numericPattern = /^[0-9]*$/;
  numericOnly(event: any) {
    return this.numericPattern.test(event.key);
  }
  handleFileInput(event: any) {
    if (event.target.files) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      console.log(reader)
      reader.onload = (event: any) => {
        this.uploadImage = event.target.result
        this.vendor_profile = event.target.result
        console.log(this.uploadImage)
      }
    }
    this.imageFile = event.target.files[0];
  }
  getchoice(name: any, value: any) {
    if (name == 'PR') {
      this.po_access = value
    }
    if (name == 'SR') {
      this.so_access = value
    }

  }
  assigneditvalues(){
    this.add_product_table.typeOfIndustry = this.user.industrytype
    this.username =  this.user.name
    this.add_product_table.street1 = this.edit_vendor_data.street1
    this.add_product_table.country = this.edit_vendor_data.country
    this.add_product_table.street2 = this.edit_vendor_data.street2
    this.add_product_table.state = this.edit_vendor_data.state
    this.add_product_table.zipCode = this.user.zipcode
    this.add_product_table.city = this.edit_vendor_data.city
    this.add_product_table.products = this.user.products
    this.add_product_table.contactPersonName = this.user.contactPersonName
    this.add_product_table.position = this.edit_vendor_data.position
    this.add_product_table.land_line = this.user.landline
    this.add_product_table.Email = this.user.email
    this.add_product_table.website = this.edit_vendor_data.website
    this.add_product_table.productUrl = this.user.productUrl
    this.vendor_profile = this.user.profilePicture

  }
  Submit(){
    const form = new FormData();
    // form.append('mobileNumber', this.add_product_table.mobileNumber);
    form.append('companyName', this.user.companyname);

    form.append('country', this.add_product_table.country);
    form.append('state', this.add_product_table.state);
    form.append('city', this.add_product_table.city);
    form.append('typeOfIndustry', this.add_product_table.typeOfIndustry);
    // form.append('headoffice', this.add_product_table.headoffice);
    form.append('contactPersonName', this.add_product_table.contactPersonName);
    form.append('products', this.add_product_table.products);
    form.append('position', this.add_product_table.position);
    form.append('website', this.add_product_table.website);
    form.append('productUrl', this.add_product_table.productUrl);
    form.append('land_line', this.add_product_table.land_line);
    form.append('street1', this.add_product_table.street1);
    form.append('street2', this.add_product_table.street2);
    form.append('vender_id', this.edit_vendor_data.vender_id)
    form.append('zipCode', this.add_product_table.zipCode);
    form.append('products', this.add_product_table.products);
    form.append('email', this.add_product_table.Email);
    form.append('name', this.add_product_table.contactPersonName);
    form.append('po_access', this.po_access);
    form.append('service_access', this.so_access);
    form.append('id',this.edit_vendor_data.id);


    if (this.imageFile !== null) {
      form.append('profile_photo_path', this.imageFile, this.imageFile.name);
    } else {
      form.append('profile_photo_path', this.vendor_profile);
    }

    if (this.usertype == 'vu') {
      this.HotelService.vendor_profile_update(form).subscribe(
        (response) => {
          this.toast.success({ detail: "SUCCESS", summary: 'successfully', duration: 3000 });
          // window.location.reload()
        this.addvendor =false
        this.userprofile()
          // this.AppserviceService.refreshprofile('reload')


        },
        (error) => {
          this.toast.error({ detail: "ERROR", summary: 'Error', duration: 3000 });

        }
      );
    }
    if (this.usertype == 'ho' || this.usertype == 'he') {
   
      form.append('name', this.username);

      this.HotelService.user_profile_update(form).subscribe(
        (response) => {
          this.toast.success({ detail: "SUCCESS", summary: 'successfully', duration: 3000 });
          // window.location.reload()
          this.addvendor =false
          this.userprofile()

          // this.AppserviceService.refreshprofile('reload')


        },
        (error) => {
          this.toast.error({ detail: "ERROR", summary: 'Error', duration: 3000 });

        }
      );
    }


  }
}
