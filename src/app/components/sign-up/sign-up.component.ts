import { Component, OnInit,Input,HostListener ,ViewChild,ElementRef} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationDetails, validationResults, Country, State, City ,postIndustri } from 'src/app/models/interfaces';
import { OTPDetails } from 'src/app/models/interfaces';
import * as firebase from 'firebase/compat/app';
import { NgToastService } from 'ng-angular-popup';
import { CountryStateCityService } from 'src/app/service/country-state-city/country-state-city.service';
import { RegisterFormService } from 'src/app/service/registerDetails/register-form.service';
// import { OtpVerifyComponent } from 'src/app/components/otp-verify/otp-verify.component';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { AcountService } from 'src/app/service/acount/acount.service';
import { CountryFlagService } from 'src/app/service/country-flag/country-flag.service';

interface countryFlag{
  name:string;
  code:any;
  dial_code:any;
  flag:any;
}
@Component({
  selector: 'b2b-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  CountryFlag:boolean=true;
  flagArr :any='';
  registerData:any='';
  test:boolean=false;
  searchText:any='' ;
  addindustry:boolean=false ;
  tests :any='+91' ;
  loading:boolean = false;
 
  filterData:any='';
  stateFilter:any='';
  cityFilter:any='';
  flagFilter:any='';

  hotel_user:boolean = false
  alphanumeric:boolean=false;
  numeric:boolean=true;
  errorText:boolean=false
  existsUser:any='';
  popup:boolean=false
  mobileNumber:any='';
  signupDetail:any=[];
  add:any=[];
  filter: boolean=true;
  isRegister:boolean=false;
  allowUser:boolean=false;
  accountErrorMessage :boolean=false;
  cityData:any='';
   login_userType:any=['ho','us']
  keypressed:any='';
  addIndustrys:boolean=false;
  typeOfIndustry:any='' ;
  postIndustrys: any='' ;
  instantValue:string='';
  @Input() otpSent:boolean=false

  title:string='';
  flag:any='';
  

  zipCodes:(string)[]=[];

  listcountry!: Country[]
  countrySelected!: string
  listState!: State[]
  selectedState!: string
  listCity!: City[]

  country:any=''
  state:any=''
  countries:any=[]

  postIndustri: postIndustri = {typeOfIndustry: ""}; 

  industrys :string[]=['Full Service Hotel',' Restaurent','Bars']
  countryIndiaFlag:any=[
    { "name": "India", "dial_code": "+91", "code": "IN", "flag": "🇮🇳" }
  ];

  signupDetails: RegistrationDetails = {
    name: "",
    mobileNumber: "",
    typeOfIndustry: "",
    companyName: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    department: "",
    designation: ""
  };
  

  validationResult: validationResults = {
    fullName: true,
    mobileNumber: true,
    typeOfIndustry: true,
    companyName: true,
    country: true,
    state: true,
    city: true,
    zipCode: true,
    department: true,
    designation: true
  }

  recaptchaVerifier: any;
  user:any;
  AlphanumericCountry :any=['Argentina', 'Brunei','Canada','ireland','KazaKhstan','Malta','Netherlands','Peru','Somalia','United Kingdom','Swaziland']

  // TOGGLE
  selectedOption: string = 'Hotelier';
  constructor(private router: Router, private route: ActivatedRoute, private auth: AngularFireAuth,private toast: NgToastService,private CountryStateCityService: CountryStateCityService,private RegisterFormService: RegisterFormService,private HotelService:HotelService,private AppserviceService:AppserviceService,private AcountService:AcountService ,private CountryFlagService:CountryFlagService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let i = params.get("type");
      if (i) {
        console.log(i)
        if(i == 'sign-up'){
          this.hotel_user = true
        }else{
          this.hotel_user = false

        }
      }
       
    })
    this.filterData=''
    this.fetchCountry();
    this.RegisterFormService.industrysType().subscribe((data)=>{
      console.log(data)
      this.typeOfIndustry =data;
    })   
  let reg_details = sessionStorage.getItem("registration-details");
  console.log(reg_details)
  if(reg_details) {
    // this.signupDetails = JSON.parse(reg_details);
  }
    // this.route.paramMap.subscribe((params) => {
    //   let nav = params.get("fill");
    //   if(nav) {
    //     let reg_details = localStorage.getItem("registration-details");
    //     if(reg_details) {
    //       this.signupDetails = JSON.parse(reg_details);
    //     }
    //   }
    // });

    this.flag = this.CountryFlagService.countryFlag

  }

  navigate(id: string) {
    this.router.navigate([{type: id}], {relativeTo: this.route});
  }

  // @HostListener('window:keydown.enter',['$event'])

  register() {
    // temporary tested dont use here this is for testing purpose
    // if(this.signupDetails.mobileNumber.length == 10) {

    // this.RegisterFormService.getUserValue(this.signupDetails).subscribe((res:any)=>{
    //   console.log(res)
     
    //   this.popup=true

    //   localStorage.setItem('tokenn', res.token)
    //   // this.router.navigate(['registration']);
    // })
    // }else{
    //   this.errorText=true;
    //   this.accountErrorMessage=false;
    // }
    // this.keypressed = event.keyCode;
    this.registerData =this.signupDetails;
    this.signupDetails.mobileNumber = this.tests + this.mobileNumber;
    // this.router.navigate(['otp-verify'],{});
    this.AppserviceService.sendData(this.registerData);
    console.log(this.registerData)

    if(this.validateInput()) {
      this.loading = true;
      this.RegisterFormService.verifyUser(this.signupDetails).subscribe((data)=>{
        console.log(data)
        if(data.message =='User exists'){
              console.log(data.message)
              // this.loginTrue =true
              this.isRegister =true;
              this.allowUser=false;
              this.loading = false;
             
            }
            if(data.message =='User does not exists'){
              this.loading = true;
              console.log(data.message)
              this.isRegister =false;
              this.allowUser=true;

              // register data testing , its register working only after enter otp........
              if(this.hotel_user){
                this.RegisterFormService.getUserValue(this.signupDetails).subscribe((res:any)=>{
                  console.log(res)
                  this.popup = true
                  this.loading = false;
                  this.empty_all_feilds()
                  localStorage.setItem('tokenn', res.token)
                  this.empty_all_feilds()
                  // this.router.navigate(['registration']);
                },(err:any) =>{
                  this.loading = false;
                  this.toast.error({detail:"ERROR",summary: err.error.message,sticky:false,duration:3000});
                })
              }else{
                this.RegisterFormService.user_register(this.signupDetails).subscribe((res:any)=>{
                  console.log(res)
                  this.popup = true
                  this.loading = false;
                  this.empty_all_feilds()
                  localStorage.setItem('tokenn', res.token)
                  this.empty_all_feilds()
                  // this.router.navigate(['registration']);
                },(err:any) =>{
                  this.loading = false;
                  this.toast.error({detail:"ERROR",summary: err.error.message,sticky:false,duration:3000});
                })
              }
             
              // register data testing .........

            //  OTP Not send testing start , if remove this below comment OTP will send mobile number-------------
            
            //   if(!this.recaptchaVerifier && this.mobileNumber.length == 10) {
            //     this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier("recaptcha-container", {size: 'invisible'});
            //   }

            //   this.auth.signInWithPhoneNumber(this.signupDetails.mobileNumber, this.recaptchaVerifier).then((confirmationResult) => {
            //     this.AppserviceService.sendData(this.registerData);
                
            //     if(confirmationResult.verificationId) {
            //       localStorage.setItem('verification-id', JSON.stringify(confirmationResult.verificationId));
            //       sessionStorage.setItem('registration-details', JSON.stringify(this.signupDetails));
            //       this.test===true;
            //       // this.router.navigate(['otp-verify'],{});
                  
            //       // this.toast.error({detail:"ERROR",summary:'Enter Your Valid OTP',sticky:false,duration:4000});
            //       this.AppserviceService.sendData(this.registerData);
            //     }
            //   }).catch((error) => {
            //     if(error){
            //       this.accountErrorMessage = true;
            //       this.loading = false ;
            //     }
            // });
            //  OTP Not send testing end -------------

            // firebase Otp end .....................................

      }
    },(err:any) =>{
      this.loading = false;
      this.toast.error({detail:"ERROR",summary: err.statusText,sticky:false,duration:3000});
    })
     
      // if(!this.recaptchaVerifier && this.allowUser == true && this.mobileNumber.length == 10) {
      //   this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier("recaptcha-container", {size: 'invisible'});
      //   // this.router.navigate(['otp-verify'],{});
      // }
    }
  }

  empty_all_feilds(){
    this.mobileNumber = ''
    this.signupDetails.name = ''
    this.signupDetails.mobileNumber = ''
    this.signupDetails.typeOfIndustry = ''
    this.signupDetails.companyName = ''
    this.signupDetails.country = ''
    this.signupDetails.state = ''
    this.signupDetails.city = ''
    this.signupDetails.zipCode = ''
    this.signupDetails.department = ''
    this.signupDetails.designation = ''
  }

  validateInput(): boolean {
    let status: boolean = true;
    this.validationResult = {
      fullName: true,
      mobileNumber: true,
      typeOfIndustry: true,
      companyName: true,
      country: true,
      state: true,
      city: true,
      zipCode: true,
      department: true,
      designation: true
    };


    if(this.signupDetails.name.length == 0) {
      // this.validationResult.fullName = false;
      status = false;
      this.errorText=true;

      console.log(this.validationResult);
    }

    if(this.signupDetails.mobileNumber.length <= 10) {
      // this.validationResult.mobileNumber = false;
      status = false;
      this.errorText=true;
      // this.toast.error({detail:"ERROR",summary:'Enter Valid Moblie Number',sticky:false,duration:5000});
    }
    if(this.hotel_user){
      if(this.signupDetails.typeOfIndustry.length == 0) {
        // this.validationResult.typeOfIndustry = false;
        status = false;
        this.errorText=true;
  
      }
  
      if(this.signupDetails.companyName.length == 0) {
        // this.validationResult.companyName = false;
        status = false;
        this.errorText=true;
  
      }
  
    }
   
    if(this.signupDetails.country.length == 0) {
      // this.validationResult.country = false;
      status = false;
      this.errorText=true;

    }

    if(this.signupDetails.state.length == 0) {
      // this.validationResult.state = false;
      status = false;
      this.errorText=true;

    }

    if(this.signupDetails.city.length == 0) {
      // this.validationResult.city = false;
      status = false;
      this.errorText=true;

    }

    if(this.signupDetails.zipCode.length == 0) {
      // this.validationResult.zipCode = false;
      status = false;
      this.errorText=true;

    }


    // if(this.signupDetails.department.length == 0) {
    //   // this.validationResult.department = false;
    //   status = false;
    // }

    // if(this.signupDetails.designation.length == 0) {
    //   // this.validationResult.designation = false;
    //   status = false;
    // }

      else{
      // this.toast.success({detail:"SUCCESS",summary:'Enter OTP Number',duration:5000});

    }

    return status;
  }


  getflag(data :any){
    this.flagArr=data;
    this.CountryFlag=false;
    this.tests =this.flagArr.dial_code
    this.mobileNumber='';
    this.accountErrorMessage = false;

    // console.log(this.flagArr)
  }

  getIndustry(industryType :string){
    this.signupDetails.typeOfIndustry=industryType;
  }

  private fetchCountry(){
    this.CountryStateCityService.getCountry().subscribe(data=>{
    this.listcountry = data
    })
  }

  selectIndustry(event:any){
    this.signupDetails.typeOfIndustry = event
    this.postIndustri.typeOfIndustry = event
  }
  
  onCountrySelected(countryIso: any,countryName:any){

    this.signupDetails.country = countryName;
    this.country =  countryIso;
    this.CountryStateCityService.getStateOfSelectedCountry(countryIso).subscribe(data=>{
      this.listState = data;
    })
  
    if(this.signupDetails.country == 'United Kingdom' ||this.signupDetails.country == 'Canada'||this.signupDetails.country == 'Ireland'|| this.signupDetails.country == 'Brunei'|| this.signupDetails.country == 'Netherlands' || this.signupDetails.country == 'KazaKhstan' ||this.signupDetails.country == 'Argentina' ||this.signupDetails.country == 'Swaziland' || this.signupDetails.country == 'Malta' ||this.signupDetails.country == 'Peru' || this.signupDetails.country == 'Somalia'){
      this.alphanumeric=true
      this.numeric=false
    }
    else{
      this.alphanumeric=false
      this.numeric=true
    }
    this.signupDetails.state ='' ;
    this.signupDetails.city ='' ;
    this.filterData=''; 
    this.signupDetails.zipCode = '';

  }
  onStateSelected(stateIso:any,stateName:any){
    this.signupDetails.state=stateName;
    this.state=stateIso;
    this.CountryStateCityService.getCitiesOfSelectedState(this.country, this.state).subscribe(data=>{
    console.log(data)
    this.listCity = data
  })
  this.signupDetails.city =''
  this.stateFilter=''; 


  }
    
  onStateCity(city:any){
    this.cityFilter=''; 
    this.cityData = city
  }

  Add(){
    this.add=this.signupDetail
  }
  addIndustry(){
    this.addindustry= !this.addindustry
  }
  errorMsg(){
    this.isRegister = false;
  }
  addIndustryType(){
    this.addIndustrys =!this.addIndustrys;
  }
  IndustryType(){
    console.log(this.postIndustri)
    this.RegisterFormService.postIndustrys(this.postIndustri).subscribe((data)=>{
      console.log(data)
  })
  // this.postIndustri.typeOfIndustry = ''
  this.instantValue = this.postIndustri.typeOfIndustry
  if(this.instantValue != ''){
    this.postIndustri.typeOfIndustry = ''
  }
  }
 

  numericPattern = /^[0-9]*$/;
  numericOnly(event :any){
     return this.numericPattern.test(event.key);
  }

  // TOGGLE
  toggle(option: string) {
    this.selectedOption = option;
  }

  Supplier(){
    this.selectedOption = 'Supplier'
  }

  Hotelier(type:any){
    this.selectedOption = 'Hotelier'
    this.RegisterFormService.industrysType().subscribe((data)=>{
      this.typeOfIndustry =data;
    })
  }
  back_jobs(){
    this.router.navigate(['console/jopopportunity']);
  }
} 
