import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { RegistrationDetails, Country, State, City } from 'src/app/models/interfaces';
import { CountryStateCityService } from 'src/app/service/country-state-city/country-state-city.service';
import { CountryFlagService } from 'src/app/service/country-flag/country-flag.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';

@Component({
  selector: 'b2b-add-product-vendor',
  templateUrl: './add-product-vendor.component.html',
  styleUrls: ['./add-product-vendor.component.css']
})
export class AddProductVendorComponent implements OnInit {
  @Output() cancelpopup = new EventEmitter();
  @Input() type: any = ''
  @Input() screen: any = ''


  hotelnameid: any = ''
  nowDate: any = ''
  esgChecked: any = ''
  isEdit: any = ''
  order_frequncy_data: any = ["1 week", " 2 Week", "One Month", "Two Month", "Six Month", "One Year","More than a Year"]

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
    product_id: '0',
    category_id:'',
    subcategorie_leavel_1_id:'',
    subcategorie_leavel_2_id:'',
    vendor_id:'',
    


  }
  edit_vendor_id: any = ''
  vendor_profile: any = ''
  usertype: any = ''
  userid: any = ''
  username: any = ''

  imageFile: File | null = null;
  serviceImageFile: File | null = null;

 po_access : any = ''
  so_access: any = ''

  CountryFlag: boolean = true;
  flagArr: any = '';
  registerData: any = '';
  test: boolean = false;
  tests: any = '+91';
  accountErrorMessage: boolean = false;
  searchText: any = '';
  mobileNumber: any = '';
  flag: any = '';



  addvendar: boolean = true
  prefferedSupplier: boolean = true
  vendor_checking:boolean = false

  listcountry: any[] = []
  arr: any = []

  listState!: State[]
  selectedState!: string
  listCity!: City[]

  country: any = ''
  state: any = ''
  countries: any = []
  filterData: any = '';
  stateFilter: any = '';
  cityFilter: any = '';
  flagFilter: any = '';
  cityData: any = ''
  countryIndiaFlag: any = [
    { "name": "India", "dial_code": "+91", "code": "IN", "flag": "🇮🇳" }
  ];
  alphanumeric: boolean = false;
  numeric: boolean = true;


  productForm: boolean = true
  vendorForm: boolean = false
  isAllRequireData: boolean = false

  vendorName: any = ''
  vendorDetails: any = []
  editTepId: any = ''

  hotel_uniqid: any = {
    hotelNameId: ''
  }
  dropdownvalues:any ={
    manufacture:[],
    category:[],
    sub_catagory:[],
    sub_catagory_test:[],
    delete_image:''
  }
  dropwown_slected_values:any={
    catagory_name:'',
    sub_catagory_name_1:'',
    sub_catagory_name_2:'',
  }
  isEsg: any = ''
  editVendor: any = ''
  findeditVendor: any = 'normal'
  allVendorPageUrl: any = ''
  checkVendor: any = {
    mobileNumber: ''
  }
  existVendor_id: any = ''
  uploadImage: any = 'https://arthurmillerfoundation.org/wp-content/uploads/2018/06/default-placeholder.png'
  objectKeys = Object.keys
  closeForm: boolean = true
  // typeOfIndustry :any = ['SME','Dealer','Importer','Service Provider','Distributor']
  typeOfIndustry: any = []
  position_type: any = []
  hotel_country:any=''
  isExistVendor: boolean = false
  isTemporayProduct: any = 'Not open'
  currency_symbole:any = ''
  constructor(private toast: NgToastService, private router: Router, private route: ActivatedRoute, private HotelService: HotelService, private CountryStateCityService: CountryStateCityService, private CountryFlagService: CountryFlagService, private AppserviceService: AppserviceService) { }

  ngOnInit(): void {
    console.log(this.type)
    console.log(this.screen)

    this.nowDate = new Date();
    this.route.paramMap.subscribe((params) => {
      this.hotel_uniqid.hotelNameId = params.get("ids");
    })

    this.route.paramMap.subscribe((params) => {
      this.allVendorPageUrl = params.get("nav");
    })

    this.filterData = ''
    this.fetchCountry();
    this.flag = this.CountryFlagService.countryFlag
    this.prefferedSupplier = false

    this.HotelService.drop_down_values().subscribe(datas => {
      console.log(datas)
      this.typeOfIndustry = datas.TypeOfIndustry
      this.position_type = datas.Position
      this.dropdownvalues.manufacture = datas.currencies
    })
    this.HotelService.all_categorie().subscribe(datas => {
      console.log(datas)
      this.dropdownvalues.category = datas.category

    })

    // CATALOG TABLE COMPONENTS
    this.AppserviceService.temporaryProductVendor$.subscribe((vendor:any)=>{
      this.vendorDetails = vendor
    })    // for temporary product reload

    //country for hotel
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
    })    // for temporary product reload

    this.vendor_list()

    this.AppserviceService.editTemporaryProduct$.subscribe((d: any) => {
      console.log(d)
      this.isTemporayProduct = 'open'
      if (d != null || d != '') {
        if (d != null && d.ESG == '1') {
          this.isEsg = 'Yes'
        } else {
          this.isEsg = 'NO'
        }
        this.isEdit = d

        if (d != null) {
          this.isExistVendor = true
          this.vendorName =  d.vendor_name
          this.editTepId = d.id
          this.add_product_table.product_Name = d.product_Name
          this.add_product_table.SKU_id = d.SKU_id
          this.add_product_table.description = d.description
          this.add_product_table.vendor = d.vendor_name
          this.add_product_table.hotel_id = d.hotel_id
          this.add_product_table.hotel_wide_usage = d.hotel_wide_usage
          this.add_product_table.lead_time = d.lead_time
          this.add_product_table.order_frequency = d.order_frequency
          this.add_product_table.box_quantity = d.box_quantity
          this.add_product_table.price = d.price
          this.add_product_table.manufactured = d.manufactured
          this.add_product_table.ESG = d.ESG
          this.add_product_table.placement = d.placement
          this.dropwown_slected_values.catagory_name = d.categories
          this.dropwown_slected_values.sub_catagory_name_1 = d.subcategorie_leavel_1
          this.dropwown_slected_values.sub_catagory_name_2 = d.subcategorie_leavel_2
          this.add_product_table.category_id = d.category_id
          this.add_product_table.subcategorie_leavel_1_id = d.subcategorie_leavel_1_id
          this.add_product_table.subcategorie_leavel_2_id = d.subcategorie_leavel_2_id
          this.dropdownvalues.delete_image = d.image_id
          this.add_product_table.vendor_id = d.vendor

          this.add_product_table.product_image = d.product_image
          this.uploadImage = d.product_image
        }

        this.vendorDetails.forEach((element: any) => {
          if (element.vendor_id == d.vendorId) {
            this.vendorName = element.companyName
            console.log(this.vendorName)
          }
        });

      }

    })
    
    this.AppserviceService.cancelProducForm$.subscribe(datas => {
      console.log('test-1')

      if (datas == 'editOpen') {
        this.isExistVendor = true
        console.log('test-1')
        this.vendorForm = true
        this.productForm = false
        this.findeditVendor = 'editOpen'

        this.editVendor = JSON.parse(localStorage.getItem('editVendorDetails') || "[]")

        this.add_product_table.SupplierType = this.editVendor.SupplierType
        this.add_product_table.companyName = this.editVendor.companyName
        this.add_product_table.typeOfIndustry = this.editVendor.typeOfIndustry
        this.add_product_table.street1 = this.editVendor.street1
        this.add_product_table.street2 = this.editVendor.street2

        this.add_product_table.country = this.editVendor.country
        this.add_product_table.state = this.editVendor.state
        this.add_product_table.city = this.editVendor.city
        this.add_product_table.zipCode = this.editVendor.zipCode
        this.add_product_table.products = this.editVendor.products
        this.add_product_table.contactPersonName = this.editVendor.contactPersonName
        this.add_product_table.mobileNumber = this.editVendor.mobileNumber
        this.add_product_table.land_line = this.editVendor.land_line
        this.add_product_table.website = this.editVendor.website
        this.add_product_table.productUrl = this.editVendor.productUrl
        this.add_product_table.position = this.editVendor.position
        this.add_product_table.hotel_name_id = this.hotel_uniqid.hotelNameId
        this.add_product_table.id = this.editVendor.id
        this.add_product_table.product_id = this.editVendor.product_id
        this.add_product_table.Email = this.editVendor.email

        this.edit_vendor_id = this.editVendor.vendor_id
        this.vendor_profile = this.editVendor.profile_photo_path
        this.usertype = this.editVendor.user_type
        this.userid = this.editVendor.id
        this.username = this.editVendor.name
      } else if (datas == 'brandProductVendor') {
        this.vendorForm = true
        this.productForm = false
        this.findeditVendor = 'brandProductVendor'

        // test
      }
    })
    // used in add vendor component
    this.AppserviceService.brandPrimaryVendor$.subscribe((product_id: any) => {
      this.add_product_table.product_id = product_id
    })

    this.AppserviceService.country_price_symbol$.subscribe((res:any) =>{
      this.currency_symbole = res
    })
  }

  vendor_list() {
    this.HotelService.brand_vendor_data(this.hotel_uniqid).subscribe((d: any) => {
      this.vendorDetails = d.vendors
    })
  }

  getInput(data:any,type:any){
    switch(type){
      case 'order_frq':
        this.add_product_table.order_frequency = data
      break;  
      case 'manufacture':
        this.add_product_table.manufactured = data
      break;  
      case 'category':
        this.add_product_table.category_id = data.id
        this.dropwown_slected_values.catagory_name = data.name
        this.getsub_cat_1('1')
        this.dropwown_slected_values.sub_catagory_name_1 =''
        this.dropwown_slected_values.sub_catagory_name_2 =''
      break;
      case 'sub_category_1':
        this.add_product_table.subcategorie_leavel_1_id = data.id
        this.dropwown_slected_values.sub_catagory_name_1 = data.name
        this.getsub_cat_1('2')
        this.dropwown_slected_values.sub_catagory_name_2 =''

      break;    
      case 'sub_category_2':
        this.add_product_table.subcategorie_leavel_2_id = data.id
        this.dropwown_slected_values.sub_catagory_name_2 = data.name

      break;    

    }
  }
  getsub_cat_1(type:any){
    if(type == '1'){
      const obj={
        category_id: this.add_product_table.category_id
      }
      this.HotelService.subcategorie_leavel_1(obj).subscribe((res: any) => {
        console.log(res)
        this.dropdownvalues.sub_catagory = res.subcategorie_leavel_1
      })
    }
    if(type == '2'){
      const obj={
        category_id: this.add_product_table.category_id,
        subcategorie_leavel_1_id: this.add_product_table.subcategorie_leavel_1_id
      }
      this.HotelService.subcategorie_leavel_2(obj).subscribe((res: any) => {
        console.log(res)
        this.dropdownvalues.sub_catagory_test = res.subcategorie_leavel_2
      })
    }    
  }
  add_product_submit(find: any) {
    // this.add_product_table.hotel_id='id'\
    this.isAllRequireData = true
    if (this.add_product_table.productUrl == '') {
      this.add_product_table.productUrl = 'null'
    }

    if (this.add_product_table.SKU_id == '') {
      this.add_product_table.SKU_id = '0'
    }

    const is_vendor_Registered = {
      'hotel_name_id': this.hotel_uniqid.hotelNameId,
      'vendor_id': this.existVendor_id,
    }

    const form = new FormData();


    // Add the image file to the FormData object
    console.log(this.add_product_table)
    if (find == 'normal' || find == 'brandProductVendor') {
      form.append('zipCode', this.add_product_table.zipCode);
      form.append('product_id', this.add_product_table.product_id);
      form.append('newVendor', this.add_product_table.newVendor);
      form.append('fullName', this.add_product_table.fullName);
      form.append('mobileNumber', this.tests + this.add_product_table.mobileNumber);
      form.append('typeOfIndustry', this.add_product_table.typeOfIndustry);
      form.append('companyName', this.add_product_table.companyName);
      form.append('street1', this.add_product_table.street1);
      form.append('street2', this.add_product_table.street2);

      form.append('country', this.add_product_table.country);
      form.append('state', this.add_product_table.state);
      form.append('city', this.add_product_table.city);

      form.append('headoffice', this.add_product_table.headoffice);
      form.append('contactPersonName', this.add_product_table.contactPersonName);
      form.append('products', this.add_product_table.products);
      form.append('position', this.add_product_table.position);
      form.append('website', this.add_product_table.website);
      form.append('productUrl', this.add_product_table.productUrl);
      form.append('SupplierType', this.add_product_table.SupplierType);
      form.append('land_line', this.add_product_table.land_line);
      form.append('hotel_name_id', this.hotel_uniqid.hotelNameId);
      form.append('zipCode', this.add_product_table.zipCode);
      form.append('product_id', this.add_product_table.product_id);
      form.append('vender_id', this.edit_vendor_id)
      form.append('email', this.add_product_table.Email);
      form.append('po_access', '1');


      if (this.add_product_table.mobileNumber.length >= 10) {
        if (this.vendor_checking == true) {
          this.HotelService.vendor_to_hotel(is_vendor_Registered).subscribe((res: any) => {
            console.log(res)
            this.vendor_checking = false
            this.toast.success({ detail: "SUCCESS", summary: 'Added Vendor for this Hotel', duration: 3000 });
            this.AppserviceService.reloadVendor('reload')
            this.cancelForm()
            // this.vendorForm = false
          })
          // this.toast.error({ detail: "ERROR", summary: 'Vendor Is Not Uploaded, Please Try Another Mobile Number', duration: 3000 });
        }else{
          this.HotelService.vendor_register(form).subscribe(
            (response) => {
              // this.addRegister()
              if (this.isTemporayProduct != 'open') {
                this.cancelForm()
              }
              this.toast.success({ detail: "SUCCESS", summary: 'Added New Vendor Successfully', duration: 3000 });
              this.cancelpopup.emit(false);
              if (this.allVendorPageUrl == 'All Vendors') {
                this.AppserviceService.reloadVendor('reload')
                this.cancelForm()
              }
              if (this.allVendorPageUrl == 'All Vendor Details') {
                this.reload_data()
              }
              if (this.findeditVendor == 'brandProductVendor') {
                this.productForm = false
                this.isAllRequireData = false
                this.cancelForm()
              } else {
                this.vendorForm = false
                this.productForm = true
                this.isAllRequireData = false
                this.vendor_list()
              }
            },
            (error) => {
              console.log('upload failed:', error);
              if (error.status == 400) {
  
                // If this mobile number already exist 
                
              } else {
                this.toast.error({ detail: "Bad Request", summary: '400 Error', duration: 3000 });
              }
  
            }
          );
        }
       

      }
    } else if (find == 'editOpen') {
      console.log('edittest')
      // form.append('id', this.add_product_table.id);
      // form.append('zipCode', this.add_product_table.zipCode);
      form.append('mobileNumber', this.add_product_table.mobileNumber);
      form.append('companyName', this.add_product_table.companyName);

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
      form.append('vender_id', this.edit_vendor_id)
      form.append('zipCode', this.add_product_table.zipCode);
      form.append('products', this.add_product_table.products);
      form.append('email', this.add_product_table.Email);
      form.append('name', this.add_product_table.contactPersonName);
      form.append('po_access', this.po_access);
      form.append('service_access', this.so_access);
      form.append('id',this.userid);


      if (this.imageFile !== null) {
        form.append('profile_photo_path', this.imageFile, this.imageFile.name);
      } else {
        form.append('profile_photo_path', this.add_product_table.product_image);
      }

      // EDIT VENDOR DETAILS
      this.HotelService.edit_temporary_vendor(form).subscribe(
        (response) => {
          this.toast.success({ detail: "SUCCESS", summary: 'successfully', duration: 3000 });
          // window.location.reload()
          this.reload_data()
          this.cancelForm()

        },
        (error) => {
          this.toast.error({ detail: "ERROR", summary: 'Error', duration: 3000 });

        }
      );
     

    }

    // this.ngOnInit()
  }

  isSendOtp: boolean = false
  findVendor(mob: any) {
    this.add_product_table.mobileNumber = mob.mobile_number

    this.checkVendor.mobileNumber = mob.mobile_number
    const payload = {
      mobileNumber: mob.dial_code + mob.mobile_number,
      Hotel_Name_id: this.hotel_uniqid.hotelNameId
    }
    if (this.add_product_table.mobileNumber.length == 10) {
      this.HotelService.check_vendor(payload).subscribe({
        next: (a) => {
          this.findVendorDetails(a)
          this.isExistVendor = true
          this.vendor_checking = true
          this.isSendOtp = false
        
      },
      error: (error) => {
        console.log(error.status)
        if(error.status == 400){
          this.findVendorDetails('')
          this.toast.error({ detail: "ERROR", summary: error.error.message, duration: 3000 });
          this.isSendOtp = true
        }
        if(error.status == 401){
          this.findVendorDetails('')
          this.toast.error({ detail: "ERROR", summary: error.error.message, duration: 3000 });
          this.isSendOtp = false
        }

        // this.toast.error({ detail: "500 ERROR", summary: "", duration: 3000 });

      }
    })
     
    } else {
      this.findVendorDetails('')
    }
  }

  findVendorDetails(a: any) {

    if (a != '') {
      this.existVendor_id = a.user.vender_id
      this.add_product_table.companyName = a.user.companyName
      this.add_product_table.typeOfIndustry = a.user.typeOfIndustry
      // this.add_product_table.street1 = a.user.companyName
      // this.add_product_table.street2 = a.user.companyName
      this.add_product_table.country = a.user.country
      this.add_product_table.state = a.user.state
      this.add_product_table.zipCode = a.user.zipCode
      this.add_product_table.city = a.user.city
      this.add_product_table.products = a.user.products
      this.add_product_table.contactPersonName = a.user.contactPersonName
      this.add_product_table.position = a.user.position
      // this.add_product_table.land_line = a.user.companyName
      this.add_product_table.website = a.user.website
      this.add_product_table.productUrl = a.user.productUrl
      this.add_product_table.SupplierType = a.user.SupplierType
      this.add_product_table.land_line = a.user.land_line
      this.add_product_table.street1 = a.user.street1
      this.add_product_table.street2 = a.user.street2
      this.add_product_table.Email = a.user.email

    } else {
      this.add_product_table.companyName = ''
      this.add_product_table.typeOfIndustry = ''
      this.add_product_table.street1 = ''
      this.add_product_table.street2 = ''
      this.add_product_table.country = ''
      this.add_product_table.state = ''
      this.add_product_table.zipCode = ''
      this.add_product_table.city = ''
      this.add_product_table.products = ''
      this.add_product_table.contactPersonName = ''
      this.add_product_table.position = ''
      this.add_product_table.land_line = ''
      // this.add_product_table.website = ''
      // this.add_product_table.productUrl = ''
      this.add_product_table.SupplierType = ''

    }

  }

  add_Product() {
    if (this.add_product_table.SKU_id == '') {
      this.add_product_table.SKU_id = '0'
    }

    const form = new FormData();
    form.append('newVendor', this.add_product_table.newVendor);
    form.append('product_Name', this.add_product_table.product_Name);
    form.append('SKU_id', this.add_product_table.SKU_id);
    form.append('description', this.add_product_table.description);
    form.append('vendor', this.add_product_table.vendor);
    form.append('hotel_id', this.hotel_uniqid.hotelNameId);
    form.append('hotel_wide_usage', this.add_product_table.hotel_wide_usage);
    form.append('lead_time', this.add_product_table.lead_time);
    form.append('order_frequency', this.add_product_table.order_frequency);
    form.append('box_quantity', this.add_product_table.box_quantity);
    form.append('price', this.add_product_table.price);
    form.append('manufactured', this.add_product_table.manufactured);
    form.append('ESG', this.add_product_table.ESG);
    form.append('placement', this.add_product_table.placement);
    form.append('category_id', this.add_product_table.category_id);
    form.append('subcategorie_leavel_1_id', this.add_product_table.subcategorie_leavel_1_id);
    form.append('subcategorie_leavel_2_id', this.add_product_table.subcategorie_leavel_2_id);

    if (this.imageFile !== null) {
      form.append('product_image[]', this.imageFile, this.imageFile.name);

    } else {
      form.append('product_image[]', this.add_product_table.product_image);
    }

    this.HotelService.add_temporary_product(form).subscribe({
      next: (response) => {
        console.log('Temporary');
        this.router.navigate(['/console/catalog', { ids: this.hotel_uniqid.hotelNameId, nav_hotel: 'yes' }]);
        this.toast.success({ detail: "SUCCESS", summary: 'Successfully Added Temporary Product', duration: 3000 });
        this.cancelForm();
      },
      error: (error) => {
        this.toast.error({ detail: "ERROR", summary: error.error.message, duration: 3000 });
      }
    });

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


  typeofIndustry(event: any) {
    this.add_product_table.typeOfIndustry = event
  }

  // addRegister(){
  //   this.isAllRequireData = true

  //   this.AppserviceService.vendor_based$.subscribe((data:any)=>{
  //     this.HotelService.send_vendor(data).subscribe((d:any) =>{

  //       console.log(d)
  //       window.location.reload()
  //       ,
  //       (error:any) => {
  //       console.log(error)
  //   } 
  //   })
  //   })  
  // }

  cancel() {
    this.prefferedSupplier = false
  }
  addVendar() {
    this.addvendar = true
    this.prefferedSupplier = !this.prefferedSupplier
  }
  getflag(data: any) {
    this.flagArr = data;
    this.CountryFlag = false;
    this.tests = this.flagArr.dial_code
    this.mobileNumber = '';
    this.accountErrorMessage = false;

    // console.log(this.flagArr)
  }

  fetchCountry() {
    this.CountryStateCityService.getCountry().subscribe(data => {
      this.listcountry = data

      this.listcountry.find((coutry_code:any) =>{
        if(coutry_code.name == this.hotel_country){
          this.onCountrySelected(coutry_code.iso2,this.hotel_country)
        }
      })

      // only when edit vendor details
      if (this.findeditVendor == 'editOpen') {
        data.forEach(element => {
          if (element.name == this.add_product_table.country) {
            this.onCountrySelected(element.iso2, element.name)
            this.country = element.iso2
          }
        });
      }
    })
  }

  onCountrySelected(countryIso: any, countryName: any) {
    this.add_product_table.country = countryName;
    this.country = countryIso;
    this.CountryStateCityService.getStateOfSelectedCountry(countryIso).subscribe(data => {
      this.listState = data;
      console.log(this.listcountry)

      // Only when edit vendor details
      if (this.findeditVendor == 'editOpen') {
        data.forEach((state: any) => {
          if (state.name == this.add_product_table.state) {
            this.onStateSelected(state.iso2, state.name)
          }
        })
      }

    })

  }

  onStateSelected(stateIso: any, stateName: any) {
    this.add_product_table.state = stateName;
    this.state = stateIso;
    this.CountryStateCityService.getCitiesOfSelectedState(this.country, this.state).subscribe(data => {
      console.log(data)
      this.listCity = data
    })

    if (this.findeditVendor != 'editOpen') {
      this.add_product_table.city = ''
      this.stateFilter = '';
    }


  }

  onStateCity(city: any) {
    this.cityFilter = '';
    this.cityData = city
  }
  numericPattern = /^[0-9]*$/;
  numericOnly(event: any) {
    return this.numericPattern.test(event.key);
  }


  addProductVendor(formType: any) {
    console.log(formType)
    if (formType == 'Product') {
      this.productForm = true
      this.vendorForm = false
    }

    if (formType == 'Vendor') {
      this.vendorForm = true
      this.productForm = false

    }
  }

  cancelForm() {
    this.cancelpopup.emit(false);
    this.AppserviceService.cancelProducForm('exit')
    this.isTemporayProduct = 'close'
  }

  esgCheck(event: any) {
    this.esgChecked = event.target.checked
    console.log(this.esgChecked)
    if (event.target.checked == true) {
      this.add_product_table.ESG = '1'
    } else {
      this.add_product_table.ESG = '0'
    }
  }


  vendorIdProductForm(id: any, companyName: any) {
    this.add_product_table.vendor = id
    this.vendorName = companyName

    // test for emty values
  }

  esg(value: any) {
    this.isEsg = value

    if (value == 'Yes') {
      this.add_product_table.ESG = '1'
    } else {
      this.add_product_table.ESG = '0'
    }
  }

  productValidation() {
    console.log('no validation')
    if (this.add_product_table.product_Name.length < 1 ||
      // this.add_product_table.description.length < 1 ||
      this.add_product_table.vendor.length < 1 
      // this.add_product_table.hotel_id  < 1 ||
      // this.add_product_table.hotel_wide_usage.length < 1 ||
      // this.add_product_table.lead_time.length < 1 ||
      // this.add_product_table.order_frequency.length < 1 ||
      // this.add_product_table.box_quantity.length < 1 ||
      // this.add_product_table.price.length < 1 ||
      // this.add_product_table.manufactured.length < 1
      // this.add_product_table.product_image == '' 

    ) {
      this.isAllRequireData = true
      console.log(this.add_product_table)
    } else {
      console.log(this.add_product_table)
      if (this.isEdit != '') {
        const form = new FormData();
        form.append('id', this.editTepId);

        form.append('product_Name', this.add_product_table.product_Name);
        form.append('SKU_id', this.add_product_table.SKU_id);
        form.append('description', this.add_product_table.description);
        form.append('vendor', this.add_product_table.vendor_id);
        form.append('hotel_id', this.add_product_table.hotel_id);
        form.append('hotel_wide_usage', this.add_product_table.hotel_wide_usage);
        form.append('lead_time', this.add_product_table.lead_time);
        form.append('order_frequency', this.add_product_table.order_frequency);
        form.append('box_quantity', this.add_product_table.box_quantity);
        form.append('price', this.add_product_table.price);
        form.append('manufactured', this.add_product_table.manufactured);
        form.append('ESG', this.add_product_table.ESG);
        form.append('placement', this.add_product_table.placement);
        form.append('category_id', this.add_product_table.category_id);
        form.append('subcategorie_leavel_1_id',this.add_product_table.subcategorie_leavel_1_id);
        form.append('subcategorie_leavel_2_id', this.add_product_table.subcategorie_leavel_2_id);
        form.append('delete_image[]',this.dropdownvalues.delete_image)

        if (this.imageFile !== null) {
          form.append('product_image[]', this.imageFile, this.imageFile.name);
        } else {
          // form.append('product_image', this.add_product_table.product_image);
        }

        this.HotelService.edit_temporary_product(form).subscribe((res: any) => {
          console.log(res)
          // window.location.reload()
          // this.reload_data()

          this.router.navigate(['/console/catalog', { ids: this.hotel_uniqid.hotelNameId, nav_hotel: 'yes', new_products: 'Hotel_products' }]);
          this.toast.success({ detail: "SUCCESS", summary: 'Updated Successfully', duration: 3000 });
          this.cancelForm()
        })
      } else {
        // this.vendorForm = true
        // this.productForm = false

        this.add_Product()

      }


    }
  }

  addVendor() {
    this.vendorForm = true
    this.productForm = false
    this.isExistVendor = false
  }

  openFileDialog() {
    const inputElement: HTMLElement = document.getElementById('fileInput') as HTMLElement;
    inputElement.click();
  }


  reload_data() {
    this.HotelService.brandBy_data(this.hotel_uniqid).subscribe((datas: any) => {

      this.AppserviceService.hotelLogoImage(datas.hotelImages)
      this.AppserviceService.reloadVendor(datas.vendor)

      console.log(datas.vendor)
      const temProduct: any = []
      datas.temporaryProducts.forEach((element: any) => {
        datas.vendor.forEach((vendorId: any) => {
          if (element.vendor == vendorId.id) {
            temProduct.push({
              product_id: element.id,
              vendorId: vendorId.vendor_id,

              sku: element.SKU_id == null ? '' : element.SKU_id,
              image: element.product_image,
              name: element.product_Name == null ? 0 : element.product_Name,
              price: element.price == null ? 0 : element.price,
              desciption: element.description == null ? '' : element.description,
              desciptionHoverData: element.description == null ? '' : element.description,
              prefferedVendor: element.vendor_name == null ? '' : element.vendor_name,
              boxQuantity: element.box_quantity == null ? 0 : element.box_quantity,
              leadTime: element.lead_time == null ? 0 : element.lead_time,
              lastOrderQty: 0,
              ESG: element.ESG == null ? 0 : element.ESG,
              manufactured: element.manufactured == null ? '' : element.manufactured,
              Hotel_Name_id: element.hotel_id,
              hotel_wild_usage: element.hotel_wide_usage,
              order_frequency: element.order_frequency,
              placement_data: element.placement == "undefind" ? '' : element.placement,
              Product_id: element.Product_id,
              Product_id_: element.id,

              minvalue: element.price,
              maxivalue: element.price,
              psavings: (((element.price - element.price) / element.price) * 100 | 0) + '%',
              Type_of_Product: vendorId.Type_of_Product,
              vendor_id: element.vendor
            })
          }
        });

      });


      if (this.objectKeys(datas.temporaryProducts).length > 0) {
        this.AppserviceService.temporaryProducts(temProduct)
      } else {
        this.AppserviceService.temporaryProducts([])
      }

    });
  }
  getchoice(name: any, value: any) {
    if (name == 'PR') {
      this.po_access = value
    }
    if (name == 'SR') {
      this.so_access = value
    }

  }
}
