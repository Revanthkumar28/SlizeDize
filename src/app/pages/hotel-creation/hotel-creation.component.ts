import { Component, Input, OnInit, ViewChildren, ViewEncapsulation, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { hotelRegistrationDetails, hotelvalidationResults, brandHotel } from 'src/app/models/interfaces';
import { NgToastService } from 'ng-angular-popup';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { RegisterFormService } from 'src/app/service/registerDetails/register-form.service';
// import { timeStamp } from 'console';
import { HostListener } from "@angular/core";
import { ApiServiceService } from 'src/app/service/api-service/api-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'b2b-hotel-creation',
  templateUrl: './hotel-creation.component.html',
  styleUrls: ['./hotel-creation.component.css'],
})
export class HotelCreationComponent implements OnInit {
  
  showBg: boolean = false;
  brandItem: boolean = true;
  steper: boolean = false;
  count: number = 0;
  // totalPriceSel = 0; clean---

  // countSeating = 0 clean---
  // childOpenSeating: boolean = false; clean---
  summary:number = 0
  dropdown: boolean = false;
  // Leftimage: boolean = false; clean---
  imageTwo: boolean = false
  changeImages: boolean = true;
  // borderImage: boolean = false; clean---
  // holeProduct: any = ''; clean---
  // allDatas: any = ''  clean---
  childOpen: boolean = false;
  // items: any = '' ; clean---
  // listItems: any = '';                 clean---
  // productCount: any = '';              clean---
  // moreImage: any = '';                 clean---
  isImage: boolean = true;
  // isSlider: boolean = false;           clean---
  // isLobby: boolean = false;            clean---
  isOpen: boolean = false;
  cloneCatalog: boolean = false;
  uniqeData: any = '';
  req: any = '*';
  // rowBorder: boolean = false           clean---
  // changeColor_1: boolean = true        clean---
  // changeColor_2: boolean = false;      clean---
  // icon: any = ''                       clean---
  showCompare: boolean = false;
  // compareProduct: any = '';            clean---
  // viewProductList: any = '';           clean---
  // viewList: boolean = false            clean---

  // test_3: any = ''                     clean---
  // test_4: any = ''                     clean---
  // test_5: any = ''                     clean---

  // hotelServic: any = ''                clean---
  roomType: string = 'Hotel Rooms';
  lable_button: boolean = true;
  room_type: boolean = false;
   
  // test_8: any = ''                     clean---
   loading:any =false
  checked_id: any = ''
  checked_boolean: any = ''
  color_diff: any = ''
  // color_id: any = ''                   clean---
  brand_image: any = 'https://images.adsttc.com/media/images/5c5d/6521/284d/d18d/d600/0527/large_jpg/ARIA_Hotel_and_Casino.jpg?1549624591'

  objectKeys = Object.keys

  brand_hotel_number:any = '0' 
  // custom_brand_number:any = '1'        clean---

  // activeIndex = 1;                     clean---                   
  rowClicked = 0;
  // hotelBrands: any = []                clean---
  // hotelImage: any = ''                 clean---

  allItems: any = [];
  select_brand_room_type: any = []
  brand_sample_images: any = []

  // Seating: any = [];                   clean ---

  // changed() {
  //   this.count = 0;

  // }                                    clean ---

  // image: string = '/assets/login-brand-2.jpg';     clean ---
  // hotelName: string[] = [];                        clean---
  hotel: any = []
  // shcema: string[] = []                            clean---

  @ViewChildren('changeImage') changeImage: any;
  // test: brandHotel = {
  //   user_id: "1",
  //   carporate_brand: "",
  //   hotel: "",
  //   style_scheme: "",
  // }                                                clean---


  signupDetails: any = {
    "corporateBrand": "",
    "hotel": "",
    "styleScheme": "",
  }

  validationResult: hotelvalidationResults = {
    corporateBrand: true,
    hotel: true,
    styleScheme: true

  }
  // logo: any = ''                                   clean---
  // recaptchaVerifier: any;                          clean---

  // 2nd base################################################
  hotel_registeration: any = ''
  hotelrooms: any = ''
  // t: any = ''
  // t1: any = ''
  // t2: any = ''
  // t3: any = ''
  // t4: any = ''
  // t5: any = ''
  // t6: any = ''
  // t7: any = ''
  // t8: any = ''                                     clean---

  // compare_t: any = ''
  // compare_t1: any = ''
  // compare_t2: any = ''
  // compare_t3: any = ''
  // compare_t4: any = ''                             clean---

  catalog_creation: any = []

  productBy_brand: any = []
  brand_by: any = {
    BrandId: ''
  }
  select_brand: any = []

  // brandBy_item: any = []                          clean---    

  // commpare_products: any = []                     clean---
  // conpare_product_api: any = []                   clean---
  // compare_convert_array: any = []                 clean---
  // conpare_main_product: any = []                  clean---

  // seleted_Product: any = []                       clean---
  // specification: any = []                         clean---

  // catagry_items: any = []                         clean---
  // seating_upholtery: any = []                     clean---
  lighting: any = []
  // furniture: any = []                             clean---
  // flooring: any = []                              clean---
  // window: any = []                                clean---
  // painting: any = []                              clean---
  // wall: any = []                                  clean---

  // seating_count: any = []                         clean---
  // light_count: any = []                           clean---
  // furniture_count: any = []                       clean---
  // flooring_count: any = 0                         clean---
  // window_count: any = 0                           clean---
  // painting_count: any = 0                         clean---
  // wall_count: any = 0                             clean---

  // selected_brand_product: any = []                clean---
  count_1: any = 0
  count_2: any = 0
  count_3: any = 0
  count_4: any = 0
  count_5: any = 0
  count_6: any = 0
  count_7: any = 0
  count_8: any = 0
  count_9: any = 0
  count_10: any = 0
  count_11: any = 0
  count_12: any = 0
  count_13: any = 0
  count_14: any = 0
  count_15: any = 0
  count_16: any = 0
  count_17: any = 0
  count_18: any = 0
  count_19: any = 0
  count_20: any = 0
  count_21: any = 0
  count_22: any = 0
  count_23: any = 0
  count_24: any = 0


  // similar_brand_product: any = []                         clean---
  // similar_product: any = []                               clean---
  // similar_brand_id: any = { 
  //   brand_id: ''
  // }                                                       clean---

  // test_11: any = []                                       clean---
  // test_12: any = []                                       clean---
  // test_13: any = []                                       clean---

  // image_mark_mapping: any = []                            clean---
  // product_mark_location: any = []                         clean---

  //  clone_hotel:any = []
  select_cloned_hotel: any = {
    Hotel_Name_id  : ''
  }

  // compare_parent_image: any = ''                         clean---
  // compare_parent_name: any = ''                          clean---
  // compare_parent_price: any = ''                         clean---

  clone_hotel: any = ['empty']

  // screenHeight: any = null                              clean---
  // screenWidth: any = null                               clean---

  // base_id: any = null                                   clean---
  master_catalog_id: any = null

  // clone_items: any = []                                 clean---
  // clone_line_item_image: any = []                       clean---
  // clone_line_item_price: any = []                       clean---
  // show_clone_product: any = []                          clean---
  // clone_product_ezeebi: any = []                        clean---
  clone_hotel_name_input: any = ''
  // isClone: boolean = true                               clean---

  style_sheme: any = []
  sheme_data: any = []

  X_axis: any = '200px'
  Y_axis: any = '200px'
  isTrue_: boolean = false

  image_marker: any = ''
  marker: any = ''
  admin_choose_product: any = []
  admin_select_product: boolean = false
  defualt_boolean: boolean = false
  selected_mark_products: any = []
  // filter_product: any = []                                   clean---

  // objectKeyss = Object.keys;                                 clean---

  data: any = ''

  // select_mark_image: any = ''                                clean---
  // select_mark_price: any = ''                                clean---
  // select_mark_name: any = ''                                 clean---
  // select_specification : any = ''                            clean---
  reload_mark :any= ''

  location_product: boolean = false
  image_mark_location: any = []

  // admin_megento_image:any = ''                               clean---
  // admin_megento_name:any = ''                                clean---
  // admin_megento_price:any = ''                               clean---

  image_mark_show :boolean = false
  edit_lable_name :any = ''
  edit_lable_name_p :any =''
  isEdit_lable_name: boolean = false

  select_item_text :any = 'Once the group and the brand is selected, all brand approved products and vendors will be added to your Master Catalog.'

  // isCreate_custom_brand: boolean = false                    clean---

  isCheck_box : boolean = true
  isCustomBrand:boolean = false

  // amazeCart to change ....................................................................
    brandSelectBox :boolean = true
    amazeCart:any = []
    variantColor :any  = ''
    roomProduct :any = ''
    click_mark_product :any = {
      product : []
    }

    subBrand:any = {
      subBrandId : ''
    }

    hotel_brand_style_sheme :any ={
      styleSchemeId : ''
    }

    hotel_room :any = {
      hotel_brand_id:''
    }

    hotel_roomSheme :any = {
      style_scheme_id:''
    }

    admin_edit_mark: boolean = false
    admin_access_redMark :boolean = false
    admin_access_redMarkContainer :boolean = false

    // spec_red: boolean = false                                         clean---
    errorText :boolean = false
    submitSelectedProduc :boolean = false

    image_map_mark: any = {
      brand_room_code: '',
      product_id: '',
      lable: '',
      hotel_room_image_id: '',
      brand_id: '230',
      product_location_x: '',
      product_location_y :''
    }

    brand_room_id:any ={
      hotel_room_id :''
    }

    markProduct:any = {
      productsId :''
    }

    variantProduct :any = {
      product_id :'',
      category :''
    }

    // clone key

    hotel_uniqid :any = {
      hotelCloneId:''
    }

    admin_mapped_products:any = []
    admin_unMapped_products:any = []

    style_sheme_id :any = {
      hotel_brand_id :''
    }

    edit_hotel_details :any = {
      Hotel_Name_id :'',
      custom_brand :'1'
    }

    unSelectedProduct :any = {
      Hotel_Name_id :'' ,
      custom_brand :'0'

    }

    productAddDelete:any ={
      product_id : '2',
      Hotel_Name_id : '',
    }

    selectedEditProduct:any = []

    selectedEditProductUpdate:any = {
      Product_id : [],
      Hotel_Name_id :''
    }

    // selectedEditData:any = []                                        clean---

    editProductRemove:any = {
      product_id : [],
      Hotel_Name_id : '',
    }

    viewProductHotel:any = {
      Hotel_Name_id : '',
      custom_brand :''
    }

    // editSelectedProducts:any = []                                   clean---
    shemeId_register:any =''

    amazecartForCompare :any = []
    customAddRoom :any = false

    custom_brand_updataImage : any = {
      custom_brand_id : '',
      hotel_room_image : '',
      hotel_room_id : ''
    }

    custom_brandId :any = ''
    roomImageId :any = ''
    ismitubleImage :any = true
    hotelUniqImage :any = ''

    s3ImageUrl :any =''
    customImage:any =''
    temporaryProducts :any = []

    amazCart_product_list :any = [
      {
        catagory_id: 9,
        icon:'chair',
        type:'Seating , Upholstery & Case goods',
        count : 0,
        allCount :0,
        list :[]
      },
      {
        catagory_id: 12,
        icon:'light',
        type:'Lighting Fixtures',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id:13,
        icon:'shower',
        type:'Bathroom Fixtures',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 5,
        icon:'soup_kitchen',
        type:'Kitchen Equipments',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 7,
        icon:'play_circle',
        type:'Audiovisual Equipments',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 18,
        icon:'hvac',
        type:'HVAC Systems',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 8,
        icon:'foundation',
        type:'Building Automation (0)',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 15,
        icon:'window',
        type:'Window Treatment',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 16,
        icon:'wallet',
        type:'Flooring Carpets',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 14,
        icon:'brush',
        type:'Paintings Murals & Mirrors',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 11,
        icon:'cable',
        type:'Room Electronics',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 1,
        icon:'meeting_room',
        type:'Room Amenities',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 22,
        icon:'window',
        type:'Wall Covering',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 19,
        icon:'security',
        type:'Safety & Security Equipments',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 4,
        icon:'bedroom_child',
        type:'Bed Linens and Bath Linen',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 6,
        icon:'cleaning_services',
        type:'Cleaning and Maintenance',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 2,
        icon:'local_dining',
        type:'Food & Beverage',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 3,
        icon:'cleaning_services',
        type:'Guest Toiletries',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id:'258',
        icon:'pest_control',
        type:'Pest Control Services',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 21,
        icon:'electric_bolt',
        type:'Energy & Water',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id:'260',
        icon:'watch',
        type:'Workwear',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 10,
        icon:'smart_toy',
        type:'Decorative Accessories',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 23,
        icon:'construction',
        type:'Maintenance & Repair',
        count : 0,
        allCount :0 ,
        list :[]
      },
      {
        catagory_id: 24,
        icon:'description',
        type:'Others',
        count : 0,
        allCount :0 ,
        list :[]
      }
      
    ]

    corporateBrandId :any = ''
    subBrandId :any =''
    submitButtonDisabled:boolean = false

    localStorageValue :any = {
        brandButton : '',
        cloneButton : '',
        corporateBrand : '',
        HotelBrand : '',
        style_scheme :'',
        clone_Hotel_obj : '',
        hotel_Rooms:'',
        products : [] ,

      }
      cacheStorage :any = {}
      isRadioButtonBranded :boolean = false
      isRadioButtonCustom :boolean = false
      currency_symbol:String = ''
      isCreateBrandRooms:boolean = false
    // amazeCart to change ..............................................................

    createBrandRooms :any = {
      hotel_room_name :'',
      hotel_room_image :'',
      Hotel_Name_id :''
    }
  constructor(private router: Router,private ApiServiceService:ApiServiceService, private route: ActivatedRoute, private toast: NgToastService, private AppserviceService: AppserviceService, private HotelService: HotelService, private RegisterFormService: RegisterFormService,private location:Location) {

  }

  ngOnInit(): void {
    // change Amaz cart .................................................................viewId

    this.hotel_registeration = JSON.parse(localStorage.getItem('step-1') || "[]")
    this.hotelrooms = JSON.parse(localStorage.getItem('hotels_room') || "[]")
    this.cacheStorage = JSON.parse(localStorage.getItem('cache_store') || "[]")

    this.route.paramMap.subscribe((params) => {
      let id = params.get("viewId");
      let customBrand = params.get("customBrand");

      if (id) {
        this.viewProductHotel.Hotel_Name_id = id
      }

      if (customBrand) {
        this.viewProductHotel.custom_brand = customBrand
      }
    })

    this.route.paramMap.subscribe((params) => {
      let id = params.get("ids");
      let customBrand = params.get("customBrand");
      if (id) {
        this.edit_hotel_details.Hotel_Name_id = id
        this.unSelectedProduct.Hotel_Name_id = id
        this.productAddDelete.Hotel_Name_id = id
        this.editProductRemove.Hotel_Name_id = id
      }

      if (customBrand) {
        this.unSelectedProduct.custom_brand = customBrand
      }
    })

    this.allItems.sort()
    // this.hotelName.sort()  clean---

    if(this.viewProductHotel.Hotel_Name_id == '' && this.edit_hotel_details.Hotel_Name_id == ''){
      this.HotelService.corporate_brand().subscribe((d: any) => {
        this.select_brand = d
      })
    }

    this.s3ImageUrl = this.HotelService.s3Images()

    if(this.viewProductHotel.Hotel_Name_id != '' ){
      this.HotelService.catalogCreationUnselectedProducts(this.viewProductHotel).subscribe((data :any) =>{
        this.signupDetails.corporateBrand = data.brand_data[0].brand_name
        this.signupDetails.hotel = data.brand_data[0].hotel_name

        this.select_brand_room_type = data.rooms
        this.sheme_data = ['null']
        this.signupDetails.styleScheme = data.brand_data[0].hotel_style_name 
        // this.select_brand_room_type = data.room_data ? data.room_data : []

        this.mapAPItoLocalCategories('',data.selected_product)
        // this.count_catagory(this.amazeCart)  ###
        const brandDetails = data.brand_data
        this.currency_symbol = brandDetails[0].currency_symbol
        this.brand_image = brandDetails[0].sub_brand_logo ? brandDetails[0].sub_brand_logo : 'https://images.adsttc.com/media/images/5c5d/6521/284d/d18d/d600/0527/large_jpg/ARIA_Hotel_and_Casino.jpg?1549624591' ;
        this.hotelUniqImage = brandDetails[0].sub_brand_logo
        this.room_type = true

        // HOTEL ROOMS
        data.hotel_room.forEach((element:any) => {
          this.select_brand_room_type.push(
            {
              room_name : element.hotel_room_name,
              images : element.hotel_room_image,
              room_image : element.hotel_room_image[0].image_url,
              type : 'Own Hotel Room',
              image_id : element.image_id,
              room_id : element.room_id
            }
          )
        });

      })
    }

    if(this.edit_hotel_details.Hotel_Name_id != ''){
      this.brandSelectBox = false
      this.editHotelDetails()
      // this.HotelService.catalogCreationUnselectedProducts(this.unSelectedProduct).subscribe((data :any) =>{
      //   // console.log(data.unselectedProductsData)
      //   console.log(data)
      //   this.select_brand_room_type = data.rooms
      //   const brandDetails = data.brand_data
      //   this.currency_symbol = brandDetails[0].currency_symbol
      //   this.brand_image = brandDetails[0].sub_brand_logo ? brandDetails[0].sub_brand_logo : 'alex.jpg' ;
      //   this.hotelUniqImage = brandDetails[0].sub_brand_logo ? brandDetails[0].sub_brand_logo : 'alex.jpg' ;

      //   this.signupDetails.corporateBrand = data.brand_data[0].brand_name
      //   this.signupDetails.hotel = data.brand_data[0].hotel_name

      //   this.sheme_data = ['null']
      //   if(data.brand_data[0].hotel_style_name == null ){
      //     this.sheme_data = []
      //   }
      //   this.signupDetails.styleScheme = data.brand_data[0].hotel_style_name != null ? data.brand_data[0].hotel_style_name : ''
      //   // this.select_brand_room_type = data.room_data ? data.room_data : []

      //   // MERGE DATA SELECTED & UNSLECTED PRODUCTS
      //   const select_unslect:any = []
      //   data.selected_product.forEach((selected:any) => {
      //     selected.isChecked = true
      //     select_unslect.push(selected)
      //   });

      //   // UNSELECTED PRODUCTS
      //   data.unselected_product.forEach((selected:any) => {
      //     selected.isChecked = false
      //     select_unslect.push(selected)
      //   });

      //   this.mapAPItoLocalCategories('',select_unslect,'edit')
      //   this.room_type = true

      //   const ownRooms:any = []
      //   data.hotel_room.forEach((element:any) => {
      //     this.select_brand_room_type.push(
      //       {
      //         room_name : element.hotel_room_name,
      //         images : element.hotel_room_image,
      //         room_image : element.hotel_room_image[0].image_url,
      //         type : 'Own Hotel Room'
      //       }
      //     )
      //   });
        
      // })
    // change Amaz cart ..................................................................
    }

    // Cache storage Start
    if(this.cacheStorage.brandButton == 'Custom_Hotel'){
      this.isRadioButtonBranded = false
      this.isRadioButtonCustom = true
      this.brandItem = false
      this.customBrand()

      if(this.cacheStorage.cloneButton == 'clone_Hotel'){
        this.cloneCatalog = true
        this.clonecatalog()
        this.clone_hotel_product(this.cacheStorage.clone_Hotel_obj)
      }
    }else{
      this.isRadioButtonBranded = true
      this.isRadioButtonCustom = false
      this.brandItem = true

      if(this.cacheStorage.cloneButton == 'clone_Hotel'){
        this.cloneCatalog = true
        this.clonecatalog()
        this.clone_hotel_product(this.cacheStorage.clone_Hotel_obj)
      }else{

        if(this.cacheStorage != '' && this.edit_hotel_details.Hotel_Name_id == ''){
          this.brand_select(this.cacheStorage.corporateBrand)
          this.brand_items(this.cacheStorage.HotelBrand.brand_id,this.cacheStorage.HotelBrand)
  
          if(this.cacheStorage.style_scheme != ''){
            this.scheme(this.cacheStorage.style_scheme)
          }
          if(this.cacheStorage.hotel_Rooms != ''){
            this.select_room(this.cacheStorage.hotel_Rooms.hotel_room_id,this.cacheStorage.hotel_Rooms.id,this.cacheStorage.hotel_Rooms,'')
          }
        }
        
      }
    }
    // Cache storage END
  }

  editHotelDetails(){
    this.HotelService.catalogCreationUnselectedProducts(this.unSelectedProduct).subscribe((data :any) =>{
      // console.log(data.unselectedProductsData)
      console.log(data)
      this.select_brand_room_type = data.rooms
      const brandDetails = data.brand_data
      this.currency_symbol = brandDetails[0].currency_symbol
      this.brand_image = brandDetails[0].sub_brand_logo ? brandDetails[0].sub_brand_logo : 'alex.jpg' ;
      this.hotelUniqImage = brandDetails[0].sub_brand_logo ? brandDetails[0].sub_brand_logo : 'alex.jpg' ;
      this.temporaryProducts = data.temp_product

      this.signupDetails.corporateBrand = data.brand_data[0].brand_name
      this.signupDetails.hotel = data.brand_data[0].Hotel_Name

      this.sheme_data = ['null']
      if(data.brand_data[0].hotel_style_name == null ){
        this.sheme_data = []
      }
      this.signupDetails.styleScheme = data.brand_data[0].hotel_style_name != null ? data.brand_data[0].hotel_style_name : ''
      // this.select_brand_room_type = data.room_data ? data.room_data : []

      // MERGE DATA SELECTED & UNSLECTED PRODUCTS
      const select_unslect:any = []
      data.selected_product.forEach((selected:any) => {
        selected.isChecked = true
        select_unslect.push(selected)
      });

      // UNSELECTED PRODUCTS
      data.unselected_product.forEach((selected:any) => {
        selected.isChecked = false
        select_unslect.push(selected)
      });

      this.mapAPItoLocalCategories('',select_unslect,'edit')
      this.room_type = true

      // HOTEL OWN ROOMS ADD
      const ownRooms:any = []
      data.hotel_room.forEach((element:any) => {
        // element.hotel_room_image = element.hotel_room_image.map((ty: any) => ({
        //   ...ty,
        //   type: 'Own Hotel Room',
        //   room_image: ty.image_url
        // }));
        
        this.select_brand_room_type.push(
          {
            room_name : element.hotel_room_name,
            images : element.hotel_room_image,
            room_image : element.hotel_room_image[0].image_url,
            type : 'Own Hotel Room',
            image_id : element.image_id,
            room_id : element.room_id
          }
        )
      });
      
    })
  }

  insertCheck(list:any){
    list.forEach((listItem:any) => {
      listItem.isChecked = true; // You can set it to true if needed
    });
  }

  brand_select(selected_all:any) {
    this.summary = 0
    this.room_type = false
    this.isCheck_box = true
    this.hotel = []
    this.signupDetails.corporateBrand = selected_all.brand_name
    // this.brand_image = selected_all.brand_logo
    this.brand_banner_image(selected_all.brand_logo)

    this.hotel_registeration.Hotel_Brand = this.signupDetails.corporateBrand ? this.signupDetails.corporateBrand : '0'
    this.image_mark_location = []
    this.brand_sample_images = []
    this.productBy_brand = []

    // ...........
    this.corporateBrandId = selected_all.id

    // this.amazeCart = []
    this.empty()

    this.select_cloned_hotel.Hotel_Name_id == ''
    

    // this.count_catagory(this.amazeCart) ##3

    // amaz cart changes

    this.admin_edit_mark = false
    this.admin_access_redMark = false
    // this.lable_button = false 

    this.image_mark_show = false

    this.sheme_data = []
    this.roomProduct = []

    // Amaz cart changes
    this.signupDetails.hotel = ''
    this.signupDetails.styleScheme = ''

    const payload = {
      subBrandId : selected_all.id,
      countrie_name : this.hotel_registeration.Country
    }
    // this.subBrand.subBrandId = selected_all.id

    this.HotelService.hotel_brand(payload).subscribe((d: any) => {
      console.log(d)
      this.hotel = d
    })

    this.hotelrooms.forEach((element: any) => {
      element.Hotel_Brand = this.signupDetails.corporateBrand
    });

    // Cache
    this.localStorageValue.brandButton = 'Branded_Hotel'
    this.localStorageValue.hotel_Rooms = ''
    this.localStorageValue.HotelBrand = ''
    this.localStorageValue.style_scheme = ''
    this.localStorageValue.corporateBrand = selected_all
    localStorage.setItem('cache_store', JSON.stringify(this.localStorageValue))
    
  }

  clone_customebrand:any=''
  clone_customhotelbrand:any=''
  brand_items(brandId: any,selected_obj:any) {
    this.summary = 0
    this.currency_symbol = selected_obj.currency_symbol
    this.signupDetails.hotel = selected_obj.hotel_name
    this.signupDetails.styleScheme = ''
    this.productBy_brand = []
    this.allItems = []
    // this.brand_image = selected_obj.hotel_logo
    this.brand_banner_image(selected_obj.hotel_logo)

    this.hotelUniqImage = selected_obj.hotel_logo
    this.sheme_data = []
    this.image_mark_location = []
    this.roomType = 'Hotel Rooms'

    console.log(this.brand_image)
//  samble image section
    this.brand_sample_images = []
    // .......
    this.subBrandId = selected_obj.id

    // change to amaz cart ......................................................
    this.select_cloned_hotel.Hotel_Name_id == ''

    this.brand_by.BrandId = brandId
    this.admin_edit_mark = false
    // this.lable_button = false
    this.roomProduct = []
    this.image_mark_show = false
    this.admin_access_redMark = false

    // this.amazeCart = [] ###
    this.empty()
    console.log(this.brand_by)

    this.style_sheme_id.hotel_brand_id =selected_obj.id
    // change to amaz cart ..................................................
    this.hotel_room.hotel_brand_id = brandId

    // change to amaz cart new ......................................................
    this.hotel_brand_style_sheme.styleSchemeId = selected_obj.id

    if(this.isCustomBrand == false){
      this.ApiServiceService.hotel_brand_style_scheme(this.hotel_brand_style_sheme).subscribe((d: any) => {
        console.log(d)
        if(d.style_scheme == "1"){
          this.sheme_data = d.style_scheme_data
        }

        if(d.style_scheme == "0"){
          this.room_type = true
        }

        // Recreate apis ....
        if(d.style_scheme){
          this.sheme_data = d.style_scheme
        }else{
          this.mapAPItoLocalCategories('',d.hotel_products)
          this.brandHotelrooms(d.hotel_rooms)
        }
      })
    }
      

      if(this.isCustomBrand == true){
        this.clone_customebrand=''
        this.clone_customhotelbrand=''
        this.HotelService.style_scheme_custom_brand().subscribe((data: any) => {
          // this.clone_hotel = data.hotel_registrations
          this.brand_banner_image(data.custom_brand.brand_logo)
          this.hotelUniqImage = data.custom_brand.brand_logo
          this.clone_customebrand = data.custom_brand.id
          this.clone_customhotelbrand = data.custom_brand_hotel.id
          this.room_type = true
          this.select_brand_room_type = data.hotel_rooms ? data.hotel_rooms : []
          // this.noStyleSheme(data.response,data.style_scheme_id)
          console.log(data)
          ,(error: any) => {
              console.log(error)
            }
        })

      }

      // Cache
    this.localStorageValue.HotelBrand = selected_obj
    this.localStorageValue.style_scheme = ''
    this.localStorageValue.hotel_Rooms = ''
    localStorage.setItem('cache_store', JSON.stringify(this.localStorageValue))
      
    // change to amaz cart new .....................................................
  }

  empty(){
    this.amazCart_product_list.forEach((element:any) => {
      element.count = 0
      element.allCount = 0
      element.list = []
    });
  }

  // Amaz cart changes ..................................................................................
  scheme(selected_obj:any) {
    this.select_brand_room_type = []

    this.signupDetails.styleScheme = selected_obj.hotel_style_name;
    // this.brand_image = selected_obj.hotel_style_logo
    this.brand_banner_image(selected_obj.hotel_style_logo)

    this.hotelUniqImage = selected_obj.hotel_style_logo
    // this.lable_button = false
    this.room_type = true
    this.hotel_registeration.Style_Schemes = selected_obj.id

    this.brand_by.BrandId = selected_obj.id
    this.hotel_roomSheme.style_scheme_id = selected_obj.id
    this.HotelService.hotel_room(this.hotel_roomSheme).subscribe((d: any) => {
      this.select_brand_room_type = d
    })

    this.product_api(selected_obj.id)

    // Chache data store Local Storage
    this.localStorageValue.style_scheme = selected_obj
    localStorage.setItem('cache_store', JSON.stringify(this.localStorageValue))
  }

  // All products filter
  noStyleSheme(data:any,style_scheme_id:any){
    const newArray = Object.values(data.reduce((accumulator:any, current:any) => {
      if (!accumulator[current.productsId]) {
        accumulator[current.productsId] = current;
      }
      return accumulator;
    }, {}));
    
    console.log(newArray);
    // this.mapAPItoLocalCategories(style_scheme_id,newArray)   recreate apis
    console.log(this.amazCart_product_list)
    newArray.forEach((data:any)=>{
      console.log(data.productsId)
    })

    // this.count_catagory(this.amazeCart)    ###           
  }

// All products filter    
// Recreate functions and apis .........................
  mapAPItoLocalCategories(style_scheme_id:any,apiData:any,type='create') {

    for (const apiItem of apiData) {
      for (const localItem of this.amazCart_product_list) {
        if (apiItem.category === localItem.catagory_id) {
          localItem.list.push(apiItem)
          localItem.allCount = localItem.list.length;
          localItem.isCheckInsert = type == 'edit' ? '' : this.insertCheck(localItem.list)
          localItem.count = this.all_checked_product(localItem.list);
        }
      }
    }
    
    this.summary  = this.summaryCount()
    const sortProduct = this.amazCart_product_list.sort((a:any, b:any) => b.count - a.count);
  }

  summaryCount(){
    let count1 = 0

    this.amazCart_product_list.forEach((count:any)=>{
      count.list.forEach((d:any)=>{
        if(d.isChecked){
          count1++
        }
      })
    })
    console.log(count1);
    this.summary = count1
    return count1
    
  }

  brandHotelrooms(apiData:any){
    this.room_type = true
    this.select_brand_room_type = apiData
  }

  // This is for count checked product ......................................
  getCheckedCount(event:any,category:any,pId:any) {
    category.list.forEach((e:any) =>{
      if(e.id == pId){
        e.isChecked = event.target.checked
      }
    })

    let a = this.all_checked_product(category.list)
    category.count = a

    console.log(this.amazCart_product_list)
    this.summaryCount();
    return category;
    
  }

  all_checked_product(product_list:any){
    let c = 0
    product_list.forEach((e:any) =>{
      if(e.isChecked == true){
        c++
      }
    })

    console.log(c)
    return c;
  }

// This is for count checked product ......................................

  product_api(styleSchemeId:any){

    // this.amazeCart = []  ###
    this.empty()
    this.hotel_brand_style_sheme.styleSchemeId = styleSchemeId

    this.ApiServiceService.hotel_style_scheme(this.hotel_brand_style_sheme).subscribe((d: any) => {
        console.log(d)
        this.mapAPItoLocalCategories('',d.hotel_products)
        this.brandHotelrooms(d.hotel_rooms)
    })

    console.log(this.amazCart_product_list)
  }

  select_room(room_code: any,hotel_room_image_id: any,all:any,selectType:any) {
    console.log(all)
    this.reload_mark = all
    // this.image_map_mark.hotel_room_image_id = hotel_room_image_id
    // this.roomImageId = hotel_room_image_id

    this.image_map_mark.brand_room_code = all.hotel_room_id
    this.image_map_mark.brand_id = all.brand_id

    this.location_product = false
    this.defualt_boolean = true
    this.ismitubleImage = true
    // change amaz cart ...............................................................

    if(this.viewProductHotel.Hotel_Name_id == ''){
      this.admin_edit_mark = true
    }
    this.brand_room_id.hotel_room_id = all.hotel_room_id

    
    if(this.edit_hotel_details.Hotel_Name_id != ''){
      this.customAddRoom = true
    }

    if(this.unSelectedProduct.custom_brand == '1'){
      this.custom_brand_updataImage.custom_brand_id = all.custom_brand_id
      this.custom_brand_updataImage.hotel_room_id = all.hotel_room_id
    }
    

    console.log(this.brand_room_id)
    this.roomProduct = []
    this.admin_mapped_products = []
    this.admin_unMapped_products = []

    if(this.brand_room_id.hotel_room_id != ''){
      // this.brand_sample_images = []
      if(all.type == 'Own Hotel Room' || all.image_url){
        if(all.image_url){
          this.brand_image = all.image_url
        }else{
          this.brand_sample_images = all.images
          this.brand_banner_image(all.room_image)
          this.roomType = all.room_name
          this.roomProduct = this.temporaryProducts
          this.roomImageId = all.image_id

          // this.temporaryProducts.forEach((temp:any) => {
          //   temp.product_image = temp.product_image,
          //   temp.brand_products_name = temp.product_Name,
          //   temp.Approximate_price = temp.price
          // })
          
          // this.admin_unMapped_products = this.temporaryProducts

          // MAPDED TEMP PRODUCT DETAILS
          this.tempProductMapped(all.image_id)
          
        }
      }else{
        this.brand_banner_image(all.room_image)
        this.HotelService.image_mapping_data(this.brand_room_id).subscribe((d: any) => {
          // this.lable_button = true
          this.roomProduct = d
  
          this.brand_sample_images = []
          
          if(selectType == 'image-select'){
            this.roomImageId = hotel_room_image_id
            this.image_map_mark.hotel_room_image_id = hotel_room_image_id
          }else{
            this.roomImageId = d.hotel_rooms_image[0].id
            this.image_map_mark.hotel_room_image_id = d.hotel_rooms_image[0].id
          }
  
          d.hotel_rooms_image.forEach((multi_room: any) => {
            // if (multi_room.brand_id == brand_id && multi_room.hotel_room_id == room_code && multi_room.hotel_brand_id == hotel_brand_id) {
              this.brand_sample_images.push(multi_room)
            // }
          });
  
            d.selected_product.forEach((forMapData:any) =>{
              this.admin_mapped_products.push(forMapData)
            })
      
            d.unselected_product.forEach((forMapData:any) =>{
              this.admin_unMapped_products.push(forMapData)
            })
        })
        this.roomType = all.room_name
      }
      
    }
    // change amaz cart .................................................................

    
    // this.brand_image = all.room_image

    // this.brandBy_item = []                       clean---
    // this.product_mark_location = []              clean---
    this.admin_choose_product = []
    // this.brand_sample_images = []
    this.image_mark_location = []
    // this.isLobby = true                          clean---
        
    // cache data
    this.localStorageValue.hotel_Rooms = all
    localStorage.setItem('cache_store', JSON.stringify(this.localStorageValue))
  }

  tempProductMapped(imageId:any){
    let temporary = []
    const payload = {
      Hotel_Name_id : this.edit_hotel_details.Hotel_Name_id,
      id : imageId
    }
    this.HotelService.temporary_product_maping_view(payload).subscribe((d: any) => {
      this.roomProduct.mapping = d.hotel_temporary_product_map

      // TEMPORARY PRODUCT DETAILS
      d.temp_product_details.forEach((temp:any) => {
        temp.product_image = temp.product_image,
        temp.brand_products_name = temp.product_Name,
        temp.Approximate_price = temp.price
      })

      this.admin_unMapped_products = d.temp_product_details.filter((unMapProduct:any) => unMapProduct.selected != 1)
      this.admin_mapped_products = d.temp_product_details.filter((unMapProduct:any) => unMapProduct.selected == 1)

      // BRAND PRODUCT DETAILS
      const unSelectBran = d.brand_product_details.filter((unMapProduct:any) => unMapProduct.selected != 1)
      const selectedBrand = d.brand_product_details.filter((unMapProduct:any) => unMapProduct.selected == 1)

      unSelectBran.forEach((element:any) => {
        element.id = element.Product_id
        this.admin_unMapped_products.push(element)
      });

      selectedBrand.forEach((selected:any) => {
        selected.id = selected.Product_id
        this.admin_mapped_products.push(selected)
      });
    })
  }

  navigate(id: string) {
    this.router.navigate([{ type: id }], { relativeTo: this.route });
  }

  register() {
    this.submitButtonDisabled = true
    
    this.catalog_creation = []
    // this.seleted_Product = []                   clean---
    // Amaz cart changes
    if(this.signupDetails.corporateBrand == ''){
      this.errorText = true
    }

    if(this.isCustomBrand == true){
      this.hotel_registeration.custom_brand = '1'
      this.hotel_registeration.Hotel_Brand = this.clone_customhotelbrand
      this.hotel_registeration.Corporate_Brand = this.clone_customebrand

    }else{
      this.hotel_registeration.custom_brand = '0'
      this.hotel_registeration.Hotel_Brand = this.subBrandId ? this.subBrandId : '0'
      console.log(this.subBrandId)
      this.hotel_registeration.Corporate_Brand = this.corporateBrandId
    }

    // change for demo jaffer
    // this.hotel_registeration.Corporate_Brand = this.corporateBrandId
    // this.hotel_registeration.Hotel_Brand = this.subBrandId

    // Amaz cart changes
    this.master_catalog_id = new Date().getTime()   

    // if(this.select_cloned_hotel.Hotel_Name_id == ''){
      this.amazCart_product_list.forEach((amaz:any) => {
        amaz.list.forEach((element:any) => {
          // console.log(element.brand_products_name)
          // console.log()
           if(element.isChecked == true){
            console.log(element.brand_products_name)
            this.catalog_creation.push({
              placement: this.master_catalog_id,
              Product_id : element.id,
              Type_of_Product : element.category,
              Hotel_Name_id: this.master_catalog_id,
            })
           }              
        });
      });
      
    // }
    console.log(this.catalog_creation)

    if(this.catalog_creation.length > 0) {
      this.loading=true
      console.log('test----222')
      this.hotelrooms.forEach((element: any) => {
        element.Hotel_Name_id = this.master_catalog_id
        element.City = this.hotel_registeration.City
        // element.Hotel_Name = this.hotel_registeration.Hotel_Name
      });

      this.hotel_registeration.Hotel_Name_id = this.master_catalog_id

      // 3 STEPS IN ONE API
      const businessRoom_Name = this.hotelrooms.map((data:any) => data.room_Name)
      const businessroom_count = this.hotelrooms.map((data:any) => data.room_count)
      const businessroom_type = this.hotelrooms.map((data:any) => data.room_type)

      const brandProducts:any = {
        ...this.hotel_registeration,
        "Hotel_Name_id": this.master_catalog_id,
        "Product_id": this.catalog_creation.map((data:any) => data.Product_id),
        "Type_of_Product": this.catalog_creation.map((data:any) => data.Type_of_Product),
        "room_Name" : businessRoom_Name,
        "room_count": businessroom_count,
        "room_type" : businessroom_type,
      }

      this.HotelService.businessCatalogAndHotelDetails(brandProducts).subscribe((res:any) =>{
        this.router.navigate([`/console/catalog`,{ids:this.hotel_registeration.Hotel_Name_id}]) 
      },err =>{
        this.submitButtonDisabled = false
        this.loading=false
        this.toast.error({detail:"ERROR",summary:"Enter correct hotel data",duration:2000});
      })

      // this.HotelService.hotelRegisteration(this.hotel_registeration).subscribe({
      //     next: (response) => {
      //       const payload = {
      //         "Hotel_Name_id": this.master_catalog_id,
      //         "Product_id": this.catalog_creation.map((data:any) => data.Product_id),
      //         "Type_of_Product": this.catalog_creation.map((data:any) => data.Type_of_Product)
      //       }

      //       this.HotelService.catalogCreation_product(payload).subscribe((d: any) => {    
      //         console.log(d)
      //         this.router.navigate([`/console/catalog`,{ids:this.hotel_registeration.Hotel_Name_id}]) 
      //           ,
      //           (error: any) => {
      //             console.log(error)
      //             this.toast.error({detail:"ERROR",summary:'Select Products',duration:2000});
      //           }
      //       })

      //       // CTEARE PRODUCTS FOR HOTELS

      //       // this.catalog_creation.forEach((element: any) => {
      //       //   this.HotelService.catalogCreation(element).subscribe((d: any) => {    
      //       //     console.log(d)
      //       //     this.router.navigate([`/console/catalog`,{ids:this.hotel_registeration.Hotel_Name_id}]) 
      //       //       ,
      //       //       (error: any) => {
      //       //         console.log(error)
      //       //         this.toast.error({detail:"ERROR",summary:'Select Products',duration:2000});
      //       //       }
      //       //   })
  
      //       // })

      //       // 2nd Step HOTEL ROOMS
      //       this.hotelrooms.forEach((element: any) => {
      //         this.HotelService.bussinessDetails(element).subscribe((d: any) => {
      //           console.log(d),
      //             (error: any) => {
      //               this.toast.error({detail:"ERROR",summary:'Enter Hotel details',duration:2000});
      //             }
      //         })
      //       })
      //     },
      //     error: (error) => {
      //       // Error block      
      //       this.submitButtonDisabled = false
      //       this.loading=false
      //       this.toast.error({detail:"ERROR",summary:"Enter correct hotel data",duration:2000});
      //     },
      //   })  
        
        // INITIAL HOTEL DATA LOADING
        this.AppserviceService.hotel_id_initial_load(this.master_catalog_id)
        localStorage.setItem('hotelName', JSON.stringify({hatelName:this.hotel_registeration.Hotel_Name}))
        localStorage.setItem('hotelNameId', JSON.stringify({hatelNameId:this.master_catalog_id}))

    }else{
      if(this.select_cloned_hotel.Hotel_Name_id == ''){
        this.toast.error({detail:"ERROR",summary:'Please select product',duration:2000});
        this.submitButtonDisabled = false
      }else{
        this.toast.error({detail:"ERROR",summary:'Please fill Hotel details',duration:2000});
        this.submitButtonDisabled = false
      }
    }
    
    

    this.hotel_registeration.Hotel_Name_id = this.master_catalog_id

    // temporary
    this.select_cloned_hotel.Hotel_Name_id = this.master_catalog_id
    console.log(this.catalog_creation)
  }


  editHotelProducts(){
    this.selectedEditProduct = []
    // this.editSelectedProducts = []                                       clean---
    
    this.amazCart_product_list.forEach((amaz:any) => {
      amaz.list.forEach((element:any) => {
        if(element.isChecked == true){
          this.selectedEditProduct.push(element.id)
        }
      })
    })
    // this.amazeCart.forEach((b:any)=>{
    //     if(b.isChecked == true){
    //       this.selectedEditProduct.push(b.skuId)
    //     }            
    // })


    this.selectedEditProductUpdate.Product_id = this.selectedEditProduct
    this.selectedEditProductUpdate.Hotel_Name_id = this.edit_hotel_details.Hotel_Name_id

    console.log(this.selectedEditProductUpdate)

    this.HotelService.add_edit_products(this.selectedEditProductUpdate).subscribe((data :any) =>{
      console.log(data)
      this.router.navigate([`/console/catalog`,{ids:this.edit_hotel_details.Hotel_Name_id}])
      setTimeout(() => {
        
          this.toast.success({detail:"Success",summary:data.message,duration:2000});
  
        
      }, 1000); // 500 seconds in milliseconds
    
     

      
    },(error) => {
      console.log(error.error.message)
      this.toast.error({detail:"ERROR",summary:'Products with Orders can not be Removed',duration:2000});
    })

  }

  editHotelData(i:any){
    console.log(i)
    // if(i.isChecked == false)(
    //   this.selectedEditData.push(i)
    // )                                                                            clean---

    if(i.isChecked == true){
      this.editProductRemove.product_id.push(i.productId)
    }
    // console.log(this.selectedEditData)                                           clean---
  }

  validateInput(): boolean {
    let status: boolean = true;
    this.validationResult = {
      corporateBrand: true,
      hotel: true,
      styleScheme: true
    };

    if (this.signupDetails.corporateBrand.length == 0) {
      this.validationResult.corporateBrand = false;
      status = false;
    }

    if (this.signupDetails.hotel.length == 0) {
      this.validationResult.hotel = false;
      status = false;
    }

    else {
      this.toast.success({ detail: "SUCCESS", summary: 'Registered Your Account', duration: 8000 });
      setTimeout(() => {
      }, 3000);
    }

    return status;
  }

  corborate(data: any) {
    this.room_type = false;
    this.signupDetails.hotel = '';
    this.signupDetails.styleScheme = '';
    this.signupDetails.corporateBrand = data;
  }
  hotels(data: any) {
    this.hotel.sort()
    this.signupDetails.styleScheme = '';
    this.signupDetails.hotel = data;

    if (this.signupDetails.hotel != '') {
      this.room_type = true;
    }
  }

  // sofa() {
  //   this.childOpenSeating = !this.childOpenSeating;
  //   this.childOpen = false;
  // }; clean---

  // productTest(i: any) {
  //   const datas = i
  //   if (datas) {
  //     this.childOpenSeating = true;
  //   } else {
  //     this.childOpenSeating = false;
  //   }
  // } clean---

  customBrand() {
    this.isRadioButtonBranded = false;
     this.isRadioButtonCustom = true;
    this.isCustomBrand = true
    this.summary = 0
    this.signupDetails.corporateBrand = ''
    this.signupDetails.hotel = ''
    this.signupDetails.styleScheme = ''
    this.clone_hotel_name_input = ''

    this.room_type = false
    this.cloneCatalog = false

    this.brandItem = false
    this.productBy_brand = []
    this.hotel_registeration.Hotel_Brand = 'none'
    // Cache custom data
    this.localStorageValue.brandButton = 'Custom_Hotel'
    localStorage.setItem('cache_store', JSON.stringify(this.localStorageValue))

    // this.brand_image = this.customImage
    this.HotelService.style_scheme_custom_brand().subscribe((data: any) => {
      // this.brand_image = data.custom_brand_hotel.hotel_logo
      this.brand_banner_image(data.custom_brand_hotel.hotel_logo)

      this.mapAPItoLocalCategories('',data.products)

      , (error: any) => {
        console.log(error)
      }
    })
    
    // this.count_catagory(this.amazeCart) ###
    this.empty()

    this.select_item_text = 'Default products will be loaded for the first time and you may add/edit/remove items once your Master Catalog is created.'
    this.brand_hotel_number = '1'
  }


  brand() {
    this.select_item_text = 'Once the group and the brand is selected, all brand approved products and vendors will be added to your Master Catalog.'
    this.isCustomBrand = false
     this.isRadioButtonBranded = true;
     this.isRadioButtonCustom = false;
     this.summary = 0

    this.brandItem = true;
    this.room_type = false
    this.brand_hotel_number = '0'
    this.clone_hotel_name_input = ''

    this.signupDetails.corporateBrand = ''
    this.signupDetails.hotel = ''
    this.signupDetails.styleScheme = ''
    this.productBy_brand = []

    // Amaz cart changes .................................................................
    // this.amazeCart = []    ###
    this.cloneCatalog = false
    // this.brand_image = 'https://images.adsttc.com/media/images/5c5d/6521/284d/d18d/d600/0527/large_jpg/ARIA_Hotel_and_Casino.jpg?1549624591'
    this.brand_banner_image('https://images.adsttc.com/media/images/5c5d/6521/284d/d18d/d600/0527/large_jpg/ARIA_Hotel_and_Casino.jpg?1549624591')
    this.admin_access()
    // this.count_catagory(this.amazeCart)   ###
    this.empty()

    this.localStorageValue.brandButton = 'Branded_Hotel'
    localStorage.setItem('cache_store', JSON.stringify(this.localStorageValue))
    // Amaz car changes ..................................................................
  }

  admin_access(){
    this.admin_edit_mark = false
    // this.lable_button = false
    this.roomProduct = []
    this.image_mark_show = false
    this.admin_access_redMark = false

  }

  totalPrice() {
    this.showBg = !this.showBg;
  }
  selectBox(i: any) {
    this.count = 0;
    // this.totalPriceSel = 0; clean---
    i.checkbox = !i.checkbox;

    // this.selectedTotalPrice = '$' + this.totalPriceSel.toFixed(2) + ' USD';  clean---
  }

  checkBox(i: any, productBy_brand: any) {
    this.checked_id = i.target.value
    this.checked_boolean = i.target.checked

    // this.selected_brand_product = []                                          clean---

    // this.seating_count = []                                                   clean---
    // this.furniture_count = []                                                 clean---
    // this.light_count = []                                                     clean---
    

    // Amaz cart changes ........................................................

    console.log(this.checked_id)

    this.amazeCart.map((z: any) => {
      if (z.productId == this.checked_id) {
        z.isChecked = this.checked_boolean
      }
      return z
    })

    // console.log(this.amazeCart)
    
    // this.count_catagory(this.amazeCart) ###

    

    // Amaz cart changes ...........................................................

    // console.log(this.amazeCartProduct)                                                  clean---y

  }



  rotate() {
    this.dropdown = !this.dropdown;
  }

  tileclickImage() {
  }
  roomTypes(i: any, room_code: any) {
    this.roomType = i;
    // this.brand_image = i
    this.brand_banner_image(i)

    if (this.signupDetails.hotel != '') {
      this.lable_button = true;
    }
  }

  imageClick(i: any) {
    const test = i
  }
  imageTwoClick() {
    // this.imageTwo = true  clean---
    // this.Leftimage = false; clean---
    // this.hotelImage = 'https://img-cdn.hotelfurniture.com/gen/1920x1080/jpg/roomTemplates/original/uploads/bc309724-8ae0-4c42-a7b4-0d75ed6b656a.png'
  }

  imgagehangeClick() {
  }

  imgagehange() {
  }

  isClocneHotelExsit :string = ''
  clonecatalog() {
    this.cloneCatalog = true;
    this.brandItem = false;
    this.summary = 0
    // this.brand_image = this.hotelUniqImage
    this.room_type = false
    this.image_mark_location =[]

    this.productBy_brand = []
    // this.brand_image = 'https://images.adsttc.com/media/images/5c5d/6521/284d/d18d/d600/0527/large_jpg/ARIA_Hotel_and_Casino.jpg?1549624591'
    // this.brand_banner_image('https://images.adsttc.com/media/images/5c5d/6521/284d/d18d/d600/0527/large_jpg/ARIA_Hotel_and_Casino.jpg?1549624591')

    this.signupDetails.corporateBrand = ''
    this.signupDetails.hotel = ''
    this.signupDetails.styleScheme = ''
    this.ismitubleImage = false
    // this.amazeCart = []   ###
    this.empty()

    // this.count_catagory(this.amazeCart)   ###
    this.admin_access()

    // Amaz cart changes ......................................................................

    this.admin_edit_mark = false
    
    // this.lable_button = false
    this.clone_hotel = []

    if(this.isCustomBrand == false){
      const payload = {
        countrie_name : this.hotel_registeration.Country
      }
      this.HotelService.user_catlog_creation_brand(payload).subscribe((data: any) => {
        this.clone_hotel = data.hotel_registrations
        if(data.hotel_registrations.length > 0){
          this.isClocneHotelExsit = ''
        }else{
          this.isClocneHotelExsit = 'Hotel not found'
        }
        console.log(data)
      }, (error: any) => {
        this.isClocneHotelExsit = ''
        console.log(error)
      })

    }else{
      
      this.HotelService.user_catlog_creation_custom_brand().subscribe((data: any) => {
        this.clone_hotel = data.hotel_registrations
        if(data.hotel_registrations.length > 0){
          this.isClocneHotelExsit = ''
        }else{
          this.isClocneHotelExsit = 'Hotel not found'
        }
        console.log(data)
          , (error: any) => {
            console.log(error)
          }
      })

    }

    // Chache data store Local Storage
    this.localStorageValue.cloneButton = 'clone_Hotel'
    localStorage.setItem('cache_store', JSON.stringify(this.localStorageValue))
    

    // Amaz cart changes ......................................................................
  }

  cloneNewcatalog() {
    this.cloneCatalog = false;
    this.brandItem = true;
    this.summary = 0
    this.hotel = []
    this.ismitubleImage = false
    this.clone_hotel_name_input = ''
    // this.brand_banner_image(da)
    this.productBy_brand = []
   
    // this.amazeCart = []   ###
    this.empty()
    // this.count_catagory(this.amazeCart)   ###
    if(this.isCustomBrand == true){
      this.brandItem = false
    }

    this.signupDetails.corporateBrand = ''
    this.signupDetails.hotel = ''
    this.signupDetails.styleScheme = ''


    if(this.isCustomBrand == true){
      this.HotelService.style_scheme_custom_brand().subscribe((data: any) => {
        // this.clone_hotel = data.hotel_registrations
        this.room_type = true
        this.select_brand_room_type = data.hotel_rooms ? data.hotel_rooms : []
        this.mapAPItoLocalCategories('',data.products)
        this.brand_banner_image(data.custom_brand.brand_logo)
        console.log(data)
          , (error: any) => {
            console.log(error)
          }
      })

    }

    // Chache data store Local Storage
    this.localStorageValue.cloneButton = 'new_catalog'
    localStorage.setItem('cache_store', JSON.stringify(this.localStorageValue))
  }

  brand_banner_image(imageUrl:any){
    this.brand_image = imageUrl
  }

  dropdownOpen(data: any) {
    this.showBg = true
    this.showCompare = false;
    if (this.showBg == true) {
      this.lighting.forEach((mark: any) => {
        if (data == mark.Product_id) {
          this.uniqeData = mark
        }
      })
    }
  }

  cancel() {
    this.showBg = false;
    this.showCompare = false;
    this.admin_select_product = false
    this.location_product = false
    // Amaz cart changes

    this.image_map_mark.lable = ''
    this.image_map_mark.product_id = ''

    // this.admin_access_redMark = false
    this.admin_access_redMarkContainer = false

    if(this.admin_access_redMarkContainer == false){
      this.cloneCatalog = false
    }
    // Amaz cart changes
  }

  emitOpen(childOpen: any, i: any) {
    this.isOpen = childOpen
  }

  // Amaz cart changes ...............................................................................
  showvarentproduct:boolean = false
  compareVariantProduct(product_id:any,category_num:any,sku:any){
    this.rowClicked = sku
    console.log(this.rowClicked)
    this.variantProduct.product_id = product_id
    this.variantProduct.category = category_num

    this.ApiServiceService.VariantProduct(this.variantProduct).subscribe((d: any) => {
      console.log(d)
      this.variantColor = d
      console.log(d.variantProduct.length)
      this.showvarentproduct = d.variantProduct.length > 1 ? true:false
      this.showCompare = true
    })
  }

  // Amaz cat Changes .................................................................................

  different_color_product(colordiff: any, idx: any) {
    console.log(colordiff)
    // console.log(this.amazeCart)
    this.rowClicked = colordiff.skuId
    // this.rowClicked = idx
    // this.color_id = colordiff.id  clean---
    this.color_diff = colordiff

    // console.log(this.amazeCart)
  }

  select() {
    this.showBg = false
    this.showCompare = false
    this.amazCart_product_list.forEach((varient:any) => {
      varient.list.forEach((element: any) => {
        if (element.productId == this.color_diff.productsId) {
          element.image = this.color_diff.variant_image
          element.name = this.color_diff.product_name
          element.price = this.color_diff.selling_price
          element.spec = this.color_diff.specification
          element.skuId = this.color_diff.skuId
        }
      });
    });
    
    console.log(this.amazeCart)
  }
//clone hotel products
  clone_hotel_product(selected_obj:any) {
    // this.master_catalog_id = new Date().getTime()
    this.isCheck_box = false
    this.brandItem = false
    this.hotel_registeration.Hotel_Brand = selected_obj.Hotel_Brand ? selected_obj.Hotel_Brand : '0'
    this.corporateBrandId = selected_obj.Corporate_Brand

    this.clone_hotel_name_input = selected_obj.Hotel_Name
    // this.clone_items = []                                             clean---
    // this.clone_product_ezeebi = []                                    clean---
    this.productBy_brand = []
    this.select_cloned_hotel.Hotel_Name_id = selected_obj.Hotel_Name

    this.hotel_uniqid.hotelCloneId = selected_obj.Hotel_Name_id

    // Amaz cart .................................................................................

    // this.amazeCart = []  ###
    this.empty()
    this.ApiServiceService.clone_product_data(this.hotel_uniqid).subscribe((d: any) => {
      console.log(d)
      if(d.hotelRoomProductsData != null){

        this.mapAPItoLocalCategories('',d.hotelRoomProductsData)

     }else{
        this.toast.error({detail:"ERROR",summary:'No data ',duration:2000});
      }
      
    // this.count_catagory(this.amazeCart)  ###
  })
    
    this.clone_hotel.forEach((element: any) => {
      if (selected_obj.Hotel_Name == element.Hotel_Name) {
        this.hotel_registeration.Hotel_Brand = element.Hotel_Brand ? element.Hotel_Brand : '0'
        this.hotel_registeration.Hotel_Name_id = ''

        this.hotelrooms.forEach((hotel_rooom: any) => {
          hotel_rooom.Hotel_Brand = element.Hotel_Brand
          hotel_rooom.Hotel_Name_id = ''
          hotel_rooom.City = this.hotel_registeration.City
          hotel_rooom.Hotel_Name = this.hotel_registeration.Hotel_Name

        });

        this.select_cloned_hotel = {
          Hotel_clone_id: element.Hotel_Name_id,
          Hotel_Name_id: '',
          Hotel_Name: this.hotel_registeration.Hotel_Name,
          Hotel_Brand: element.Hotel_Brand,
          City: this.hotel_registeration.City
        }
      }

    });

     // Cache
     this.localStorageValue.clone_Hotel_obj = selected_obj
     localStorage.setItem('cache_store', JSON.stringify(this.localStorageValue))

  }

  image_mark(event: any) {
    console.log(this.image_mark_show)
    if(this.image_mark_show == true){
      this.isTrue_ = true
      this.admin_select_product = true

      this.image_marker = document.getElementById("image-element");
      this.marker = document.getElementById("marker-element");
      if (this.defualt_boolean == true) {
        this.showBg = false
        this.location_product = false
        this.admin_select_product = true
      }

       // Amaz cart changes
      //  this.image_map_mark.lable = ''
      //  this.image_map_mark.product_id = ''
       this.admin_access_redMarkContainer = true

       // Amaz cart changes

      let clickX = event.clientX;
      let clickY = event.clientY;
      let imageWidth = this.image_marker.offsetWidth;
      let imageHeight = this.image_marker.offsetHeight;
      let xPercent = (clickX / imageWidth) * 100;
      let yPercent = (clickY / imageHeight) * 100;
      this.X_axis = xPercent + "%";
      this.Y_axis = yPercent - 10 + "%";
      this.marker.style.left = xPercent + "%";
      this.marker.style.top = yPercent - 10 + "%";

      // for api
      this.image_map_mark.product_location_x = xPercent + "%";
      this.image_map_mark.product_location_y = yPercent - 10 + "%";

      console.log(this.image_map_mark)

     
    }
    


  }

  location_based_product(e: any) {
    console.log(e)
    this.image_map_mark.product_id = e

  }

  label_mark(e: any) {
    this.image_map_mark.lable = e
  }

  selected_location(admin_select_reload:any) {
    console.log(admin_select_reload)
    this.image_mark_location = []
    this.admin_choose_product = []

    console.log(this.image_map_mark)
    console.log(admin_select_reload)

    admin_select_reload.forEach((reload:any) => {
      if(reload.lable == 'wall'){
         reload.order == 'DEF'
      } 
    });

    if(this.edit_hotel_details.Hotel_Name_id != ''){
      console.log(this.image_map_mark)
      console.log(this.reload_mark)

      const payload = {
        Hotel_Name_id : this.edit_hotel_details.Hotel_Name_id,
        product_location_x : this.image_map_mark.product_location_x ,
        product_location_y : this.image_map_mark.product_location_y,
        lable : this.image_map_mark.lable,
        product_id : this.image_map_mark.product_id,
        hotel_room_image_id : this.reload_mark.image_id
      }

      this.HotelService.temporary_product_maping(payload).subscribe((d: any) => {
        this.tempProductMapped(this.reload_mark.image_id)
      },err =>{
        this.toast.error({detail:"Error",summary: err.error.message,duration:3000});
      })
          
    }else if(this.image_map_mark.lable != '' && this.image_map_mark.product_id != '' && this.image_map_mark.product_location_x != ''){
      this.HotelService.image_mapping_pass(this.image_map_mark).subscribe((d: any) => {
        this.image_map_mark.lable = ''
        // this.admin_select_product = false
        this.marker.style.left = '85%'
        this.marker.style.top = '12%'
        this.admin_mapped_product_data()
        this.HotelService.image_mapping_data(this.brand_room_id).subscribe((d: any) => {
          this.toast.success({detail:"SUCCESS",summary:'Sucessfully added item',duration:3000});
          // this.image_mark_mapping = d
          this.image_map_mark.product_id = ''
          this.submitSelectedProduc = false
          this.admin_mapped_products = []
          this.admin_unMapped_products = []

          this.roomProduct = d

          d.selected_product.forEach((forMapData:any) =>{
            this.admin_mapped_products.push(forMapData)
          })
    
          d.unselected_product.forEach((forMapData:any) =>{
            this.admin_unMapped_products.push(forMapData)
          })


        })
        ,
          (error: any) => {
            console.log(error)
          }
      },(err) =>{
        this.toast.error({detail:"Error",summary:'500 Error',duration:3000});
      })
      // this.admin_select_product = false
    }else{
      this.submitSelectedProduc = true
    } 

    console.log(this.image_map_mark)

    }

  click_mark(p_id: any,i:any) {
    this.isEdit_lable_name = false
    this.edit_lable_name_p = i
    this.selected_mark_products = []
    // this.filter_product = []                                     clean---
    this.showBg = false
    this.admin_select_product = false
    this.location_product = true

    this.selected_mark_products.push(this.data)
    console.log(this.selected_mark_products)
    // Amaz cart changes .......................................................................

    this.markProduct.productsId = p_id

    if(this.edit_hotel_details.Hotel_Name_id != ''){
      this.click_mark_product.product = []

      this.temporaryProducts.forEach((element:any) => {
        element.product_image = element.product_image
        element.brand_products_name = element.product_Name
        element.Approximate_price = element.price
      });

      const product = this.temporaryProducts.filter((markPro:any) => markPro.id == p_id) 
      this.click_mark_product.product = product ? product : [] 
    }else{
      this.ApiServiceService.singleProductsById(this.markProduct).subscribe((d: any) => {
        console.log(d)
        this.click_mark_product = d
      })
    }
    
    // Amaz cart changes .......................................................................
    // this.isEdit_lable_name = !this.isEdit_lable_name
  }

  edit_image_mark(event:any){
    this.image_mark_show = !this.image_mark_show

    this.admin_choose_product = []
    // this.admin_mapped_products = []
    // Amaz cart changes ....................................................................
    if(this.image_mark_show == true){
      this.admin_access_redMark = true
      this.admin_access_redMarkContainer = true

      this.admin_select_product = true

      // this.admin_mapped_product_data()
    }

    if(this.image_mark_show == false){
      this.admin_access_redMark = false
      this.admin_access_redMarkContainer = false

      this.admin_select_product = false
    }
    
    // test night
    this.image_map_mark.lable = ''
    //  Amaz cart changes ....................................................................

   }

   admin_mapped_product_data(){

    this.admin_mapped_products = []
    this.admin_unMapped_products = []

    this.HotelService.image_mapping_data(this.brand_room_id).subscribe((d: any) => {
      console.log(d)
      this.roomProduct = d
      
      d.selected_product.forEach((forMapData:any) =>{
        this.admin_mapped_products.push(forMapData)
      })

      d.unselected_product.forEach((forMapData:any) =>{
        this.admin_unMapped_products.push(forMapData)
      })

    })

   }

   edit_lable(){

    this.isEdit_lable_name = !this.isEdit_lable_name
    this.edit_lable_name = this.edit_lable_name_p.lable
    this.image_map_mark.hotel_room_image_id = this.edit_lable_name_p.hotel_room_image_id
    this.image_map_mark.brand_id = this.edit_lable_name_p.brand_id
    this.image_map_mark.product_id = this.edit_lable_name_p.product_id,
    this.image_map_mark.brand_room_code = this.edit_lable_name_p.brand_room_code

   }

   chenge_lable_name(){
    this.image_map_mark.lable = this.edit_lable_name
    console.log(this.image_map_mark)
    this.edit_lable_name_p.lable = this.edit_lable_name

    this.image_mark_location = []
    console.log(this.image_map_mark)

    if(this.image_map_mark.lable != ''){
      this.ApiServiceService.image_mapping_lable(this.image_map_mark).subscribe((d: any) => {
        console.log(d)
        // this.image_map_mark.product_id = ''

        this.HotelService.image_mapping_data(this.brand_room_id).subscribe((d: any) => {
          console.log(d)
          this.roomProduct = d
          this.toast.success({detail:"SUCCESS",summary:'Updated successfully',duration:3000});

        })
      })
      // this.admin_select_product = false
    } 
    console.log(this.reload_mark)
   }

   delete_mark(){
    // this.image_map_mark.lable = 'null'
    this.image_map_mark.lable = ''

    //  Amaz cart changes ....................................................................

    this.ApiServiceService.image_mapping_delete(this.image_map_mark).subscribe((d: any) => {
      console.log(d)
      this.image_map_mark.product_id = ''
      this.location_product = false
      // this.admin_access_redMark = true
      this.admin_access_redMarkContainer = true

      this.toast.success({detail:"SUCCESS",summary:'Lable deleted successfully',duration:3000});

      this.admin_mapped_product_data()
      // this.HotelService.image_mapping_data(this.brand_room_id).subscribe((d: any) => {
      //   console.log(d)
      //   this.roomProduct = d
      // })
    })

     //  Amaz cart changes .....................................................................

    this.image_mark_location = []
    console.log(this.image_map_mark)

    if(this.image_map_mark.lable != ''){

      this.HotelService.image_mapping_pass(this.image_map_mark).subscribe((d: any) => {
        console.log(d)
        this.image_map_mark.lable = ''
       
        ,
          (error: any) => {
            console.log(error)
          }
      })
      
      // this.admin_select_product = false
    } 
    console.log(this.reload_mark)
   }


  //  spec_red_color(){
  //   this.spec_red = !this.spec_red
  //  }                                                                                  clean---


   previous(){

    if(this.viewProductHotel.Hotel_Name_id != ''){
      this.router.navigate(["/detail-information" ,{viewId:this.viewProductHotel.Hotel_Name_id,customBrand:this.viewProductHotel.custom_brand}]);
    }

    if(this.edit_hotel_details.Hotel_Name_id != ''){
      this.router.navigate(["/detail-information" ,{ids:this.edit_hotel_details.Hotel_Name_id,customBrand:this.viewProductHotel.custom_brand,editTest:'0'}]);
    }

    if(this.viewProductHotel.Hotel_Name_id == '' && this.edit_hotel_details.Hotel_Name_id == ''){
      this.router.navigate(["/detail-information" ])
    }


    // test

   }


   catalogAfterView(){
    this.router.navigate([`/console/catalog`,{ids:this.viewProductHotel.Hotel_Name_id}])
   }


  onFileSelecteddd(event:any): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('hotel_room_image', file, file.name);
      formData.append('custom_brand_id' , this.custom_brand_updataImage.custom_brand_id);
      formData.append('hotel_room_id' , this.custom_brand_updataImage.hotel_room_id);
      this.custom_brandId = formData
    }
  }

  createRoom:any ={}
  onFileSelecteRooms(event:any): void {
    const file: any = event.target.files;
    if (file) {
      const formData = new FormData();
      formData.append('hotel_room_name' , this.createBrandRooms.hotel_room_name);
      formData.append('Hotel_Name_id' , this.edit_hotel_details.Hotel_Name_id);

      for (let key in file) {
        if (file.hasOwnProperty(key)) {
            const imageFile = file[key];
            formData.append('hotel_room_image[]', imageFile, imageFile.name);
        }
      }
      this.createRoom = formData
    }
  }

  submitRoomData(){
    this.HotelService.add_hotel_room_for_user(this.createRoom).subscribe((res:any)=>{
      this.isCreateBrandRooms = false
      this.toast.success({ detail: "Success", summary: 'Rooms Created Successfully', duration: 8000 });
      this.editHotelDetails()
    },err =>{
      this.toast.error({ detail: "Error", summary: err.error.message, duration: 8000 });
    })
  }

  custom_imageUpload(){
    console.log(this.custom_brand_updataImage.hotel_room_id)
    this.HotelService.upload_custom_brand_image(this.custom_brandId).subscribe((d: any) =>{
      console.log(d)

      this.HotelService.catalogCreationUnselectedProducts(this.unSelectedProduct).subscribe((data :any) =>{
        this.select_brand_room_type = data.room_data
        this.custom_brandId = ''
        
        data.room_data.forEach((cutomBrand:any) => {
          if(cutomBrand.hotel_room_id == this.custom_brand_updataImage.hotel_room_id){
            console.log(this.brand_image)
            this.brand_image = cutomBrand.hotel_room_image
            // this.custom_brand_updataImage.hotel_room_image = ''
            this.toast.success({ detail: "SUCCESS", summary: 'Uploaded Successfully', duration: 8000 });
          }
        });
      })

    })
  }

  ismitubleImageCancel(){
    this.ismitubleImage = false
  }

  hotelUniqImg(){
    this.brand_image = this.hotelUniqImage
    this.admin_edit_mark = false
    this.ismitubleImage = false
    this.roomType = 'Hotel'
    this.roomProduct = []
    this.admin_access_redMark = false
    this.admin_access_redMarkContainer = false
    this.image_mark_show = false
  }

  showHideProductMark(event:any){
    console.log(event)
    this.lable_button = !this.lable_button
  }


}