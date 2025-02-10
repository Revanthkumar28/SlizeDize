import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { signInDetails, signInResults } from 'src/app/models/interfaces';
import * as firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgToastService } from 'ng-angular-popup';
import { RegisterFormService } from 'src/app/service/registerDetails/register-form.service';
import { CountryFlagService } from 'src/app/service/country-flag/country-flag.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';

interface countryFlag{
  name:string;
  code:any;
  image:string;
  emoji:string;
  unicode:string;
  phcode:any;
}
@Component({
  selector: 'b2b-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInDetails: signInDetails = {mobileNumber: ""}; 
  // otp: ""};
  otp:any=''
  validationResult: signInResults = {mobileNumber: true, otp: true};
  CountryFlag:boolean=true;
  flagArr :any='';
  recaptchaVerifier: any;
  verificationId: any;
  otpSent: boolean = false;
  flag:any='';
  errorText:boolean=false
  validNumber:boolean=false;
  accountErrorMessage:boolean=false;
  loading :boolean = false ;

  submit=false;
  errorMessage="";
  loginAuth=''
  loginRes = ''
  loginTrue:boolean=false;
  flagFilter:any = '';

  tests:any='+91'
  mobileNumber:any=''
  todaydate:any = new Date()
  constructor(private router: Router, private route: ActivatedRoute, private auth: AngularFireAuth,private toast: NgToastService , private RegisterFormService:RegisterFormService ,private CountryFlagService:CountryFlagService ,private AppserviceService:AppserviceService,private HotelService:HotelService,private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.flag = this.CountryFlagService.countryFlag   
    console.log(this.todaydate) 
  }

  navigate(id: string) {
    this.router.navigate([{type: id}], {relativeTo: this.route});
  }
 
  sendOTP() {
    this.signInDetails.mobileNumber =this.tests + this.mobileNumber;
    // console.log(this.signInDetails)
    this.otpSent = false;
    if(this.validateInput()) {
      // this.validNumber =false
      this.loading = true ;

      // for ttest if vendor no otp 
      this.RegisterFormService.verifyUser(this.signInDetails).subscribe((data)=>{
        if(new Date(data.date_of_joining) > this.todaydate ){
          console.log(data.date_of_joining)
          this.toast.error({detail:"ERROR",summary:'Your Joining Date IS ' +data.date_of_joining,sticky:false,duration:5000});
          this.loading = false ;

        }else{
          console.log('no')
        // console.log(data)
        localStorage.setItem('token', data.token)

        if(data.status == 1){
              this.loginRes = data.status
              console.log(this.loginRes)
              this.loginTrue =true
              this.validNumber =false

              // no otp for vendor
              this.RegisterFormService.loginUsers(this.signInDetails).subscribe((data)=>{
                // if(data.user_type == 'vu'){
                //   localStorage.setItem('tokenn' ,data.token)
                //   this.router.navigate(['vendor-catalog']);
                // }

                // TEST 
                // this.isVendor()

                //MITHESH NUMBER
                if(this.mobileNumber == '8884000402'){
                  this.isVendor()
                }
              })
              // no otp for vendor

              if(!this.recaptchaVerifier && this.mobileNumber.length == 10) {
                this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier("recaptcha-container", {size: 'invisible'});
              }
              this.auth.signInWithPhoneNumber(this.signInDetails.mobileNumber, this.recaptchaVerifier).then((confirmationResult) => {
                if(confirmationResult.verificationId) {
                  this.verificationId = confirmationResult.verificationId;
                  this.otpSent = true;
                  this.loading = false ;
                  this.AppserviceService.login(this.signInDetails)
                }
              }).catch((err) => {
                console.log(err);
                if(err){
                  this.accountErrorMessage =true ;
                  this.loading = false ;
                  this.toast.error({ detail: "Error ", summary: err.FirebaseError, duration: 3000 });
                }
              });            
            }
            else{
              this.validNumber =true ;
              this.loading = false ;
            }
          }
           
      })

    }
  }

  validateInput(): boolean {
    let status = true;
    this.validationResult = {mobileNumber: true, otp: true};

    if(this.mobileNumber.length < 10 || this.signInDetails.mobileNumber =='') {
      // this.validationResult.mobileNumber = false;
      status = false;
      this.errorText = true
      this.validNumber =false
      this.toast.error({detail:"ERROR",summary:'Enter 10 Digit Moblie Number',sticky:false,duration:5000});
    }

    if(this.otp.length == 0 && this.otpSent == true) {
      this.validationResult.otp = false;
      this.toast.error({detail:"ERROR",summary:'Enter Valid OTP Number',sticky:false,duration:5000});
    }

    return status;
  }

  validateOTP() {
    this.loading = true ;

    if(this.validateInput()) {

      var credential = firebase.default.auth.PhoneAuthProvider.credential(this.verificationId, this.otp);
      this.auth.signInWithCredential(credential).then((response) => {
        let userCreds: firebase.default.auth.UserCredential = response;
        if(userCreds.user) {
          // this.router.navigate(['/console/catalog']);
          // this.toast.success({detail:"SUCCESS",summary:'Success',duration:5000});
          // this.RegisterFormService.loginUsers(this.signInDetails).subscribe((data)=>{
          //   console.log(data)
          //   localStorage.setItem('tokenn' ,data.token)
          //   this.router.navigate(['/console/catalog']);
          // }
          this.isVendor()
        }
      }).catch((err) => {
        this.validationResult.otp = false;
        console.log(err);
        this.toast.error({ detail: "Error " + err.error.status, summary: err.error.message, duration: 3000 });
        this.loading = false ;
      });

    }
  }

  isVendor(){
    this.RegisterFormService.loginUsers(this.signInDetails).subscribe((data)=>{
      console.log(data)
      localStorage.setItem('tokenn' ,data.token)
      this.authService.login();

      if(data.user_type == 'vu'){
        this.router.navigate(['vendor-catalog']);
      }if(data.user_type == 'he'){
        this.router.navigate(['/console/catalog']);
      }if(data.user_type == 'us'){
        this.router.navigate(['/console/jopopportunity']);

      }else{
        this.HotelService.getDetails().subscribe((data :any) =>{    
          if(data.hotel_registrations.length == 0 ){
            this.router.navigate(['/registration']);
          }else{
            this.router.navigate(['/console/catalog']);
          }
        })
      }
    },(error:any) =>{
      console.log(error)
      this.loading = false;
      this.toast.error({detail:"ERROR",summary:error.error.message,sticky:false,duration:3000});
    })
  }

  getflag(data :any){
    this.flagArr=data;
    this.CountryFlag=false;
    // this.signInDetails.mobileNumber =this.flagArr.phcode;
    // console.log(this.flagArr)
    this.tests =this.flagArr.dial_code
    this.mobileNumber='';

  }

  numericPattern = /^[0-9]*$/;
  numericOnly(event:any){
     return this.numericPattern.test(event.key);
  }
}
