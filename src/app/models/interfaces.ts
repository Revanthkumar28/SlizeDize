
//  Container Components
export interface ContainerStyles {
    minWidth?: string,
    maxWidth?: string,
    width?: string,
    width1?: string,
    height?: string,
    rootHeight?: string,
    backgroundTheme?: string,
    background?: string,
    padding?: string,
    borderRadius?: string,
    flex?: number,
    margin?: string,
    border?: string,
    overflowY?: string,
    alignItem?: string,
    justifyContent?: string,
    overflowX?: string,
    position?:string,
    positionBottom?:string,
    borderLeft?:string,
    borderRight?:string,
    borderTop?:string,
    right?:string,
    left?:string,
    boxShadow?:string,
    maxHeight? : string,
    positionTop? :string,
    positionLeft? :string,
    positionRight?:string,
    zIndex?:string
}

export interface RegistrationDetails {
  name: string,
    mobileNumber: string,
    typeOfIndustry: string,
    companyName: string,
    country: string,
    state: string,
    city: string,
    zipCode: string,
    department: string,
    designation: string
}

export interface validationResults {
    fullName: boolean,
    mobileNumber: boolean,
    typeOfIndustry: boolean,
    companyName: boolean,
    country: boolean,
    state: boolean,
    city: boolean,
    zipCode: boolean,
    department: boolean,
    designation: boolean
}
export interface RegistrationDetails {
  name: string,
  mobileNumber: string,
  typeOfIndustry: string,
  companyName: string,
  country: string,
  state: string,
  city: string,
  zipCode: string,
  department: string,
  designation: string
}
export interface signInDetails {
    mobileNumber: any,
    // otp: string
}
export interface postIndustri {
  typeOfIndustry: any,
  // otp: string
}
export interface signInResults {
    mobileNumber: boolean,
    otp: boolean
}   

export interface OTPDetails {
    otp: string
}


export interface vendorDetails{
  user_id:string,
  industry_type:string,
  group_name:string,
  hotels_name:string,
  number_of_room_key:any,
  address:string,
  street:string,
  country:string,
  city:string,
  state:string,
  zip_postal_code:string,
  }
  export interface vendorDetailValidation{
  user_id:boolean,
  industry_type:boolean,
  group_name:boolean,
  hotels_name:boolean,
  number_of_room_key:boolean,
  country:boolean,
  city:boolean,
  state:boolean,
  Zip_Code:boolean,
  }

  export interface hotelRegistrationDetails  {
    corporateBrand: any,
    hotel: any,
    styleScheme:any
  }

  export interface hotelvalidationResults  {
    corporateBrand: boolean,
    hotel: boolean,
    styleScheme: boolean
   
  }
    export interface Country {
      id: number,
      name: string,
      iso2: string
  }
   
  export interface State {
    id: number,
    name: string,
    iso2: string
}
export interface City {
  id: number,
  name: string
}

export interface infromationDetails{
  hotel_name:string,
  user_id:string,
  guest_room:string,
  single_bed:string,
  queen_bed:string,
  king_bed:string,
  touble_bed:string,
  California_King_bed:string,
  Rollaway_bed:string,
  kitchen:string,
  no_of_kitchen:string,
  pax_food_preparation:string,
  restaurant:string,
  chinese:string,
  indian:string,
  italian:string,
  coffee_shop:string,
  qsr_fast_food_list:string,
  spa:string,
  spa_count:string,
  wet_bar:string,
  bar_count:string,
  salon:string,
  salon_count:string,
}

export interface brandHotel {
    user_id : string,
    carporate_brand: string,
    hotel: string,
    style_scheme: string,
}
export interface allproduct{
  // item:string,
  // req_date:string,
  // delivery:string, 
  lead_time:string,
  dept:string,
  qty:string,
  price:string,
  tax:string,
  shipping_cost:string,
  total_amount:string,
  price_comparison:string,
  shipment_status:string,
  po_stage:string,
  supplier:string
}
export interface allproducts{
  item:string,
  req_date:string,
  delivery:string, 
  lead_time:string,
  dept:string,
  qty:string,
  price:string,
  tax:string,
  shipping_cost:string,
  total_amount:string,
  price_comparison:string,
  shipment_status:string,
  po_stage:string,
  supplier:string
}


// Vendor screen vendor give RFQ details

export interface acceptRfqQoute {
  rfq_id : string,
  product_id : string,
  vendor_coating_price : string,
  vendor_shipping_date : string,
  vendor_shipping_cost : string,
  vendor_quantity : string,
  vendor_gst : string,
  user : string,
  before_required_date : string,
  total_req_qty : string,
  vendor_sku : string,
  shipping_gst : string,
}

// VENDOR REGISTERATION FORM
export interface VendorRegistrationForm {
  contactPersonName: string,
  mobileNumber: string,
  typeOfIndustry: string,
  companyName: string,
  country: string,
  state: string,
  city: string,
  zipcode: string,
  position: string,
  email: string,
  service_access : string,
  po_access : string
}
