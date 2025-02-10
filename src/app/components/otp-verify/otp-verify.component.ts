import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { OTPDetails ,RegistrationDetails} from 'src/app/models/interfaces';
import { NgToastService } from 'ng-angular-popup';
import { RegisterFormService } from 'src/app/service/registerDetails/register-form.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';

import * as firebase from 'firebase/compat/app';
import { timer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'b2b-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.css'],
})

export class OtpVerifyComponent implements OnInit {
  otpVerifyDetails: OTPDetails = {otp: ""};
  verify: any;
  isOtpValid: boolean = true;
  registerdata:any='';
  isotpSent:boolean=false;
  // fromSub =null;
  user:any;

  // phone_no:any =+919994388702
  recaptchaVerifier: any;
  verificationId: any;
  otpSent:boolean=false;
  // signupDetails: RegistrationDetails = {
  //   fullName: "",
  //   mobileNumber: "",
  //   typeOfIndustry: "",
  //   companyName: "",
  //   country: "",
  //   state: "",
  //   city: "",
  //   zipCode: "",
  //   department: "",
  //   designation: ""};
  countDown!: Subscription;
  counter = 61;
  tick = 1000;

  constructor(private router: Router, private route: ActivatedRoute, private auth: AngularFireAuth,private toast: NgToastService,private RegisterFormService: RegisterFormService,private HotelService:HotelService,private AppserviceService:AppserviceService) {
  
  }

  ngOnInit(): void {
    this.verify = JSON.parse(localStorage.getItem("verification-id") || '{}');
    // this.signupDetails = JSON.parse(localStorage.getItem("registration-details") || '{}');
    this.AppserviceService.userSource$.subscribe(x=>{
      this.user=x;
      // this.signupDetails = x; 
    })

    this.countDown = timer(0, this.tick)
    .pipe(take(this.counter))
    .subscribe(() => {
      --this.counter;
      // console.log(this.counter);
      if (this.counter == 0) {
        this.countDown.unsubscribe();
      }
    });
  }
  transform(value: number) {
    const minutes: number = Math.floor(value / 60);
    return (
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }

  navigate(id: string) {
    this.router.navigate([{type: id, fill: "true"}], {relativeTo: this.route});

  }
  
  ResendOtp(){
    let recaptchaVerifier: any;
    console.log(this.user);
    if(this.counter == 0){
    if(!recaptchaVerifier) {
      this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier("recaptcha-container", {size: 'invisible'});
    }

    this.auth.signInWithPhoneNumber(this.user.mobileNumber, this.recaptchaVerifier).then((confirmationResult) => {
      if(confirmationResult.verificationId) {
        console.log(confirmationResult.verificationId);
        localStorage.setItem('verification-id', JSON.stringify(confirmationResult.verificationId));
        this.verify = confirmationResult.verificationId;
        window.alert("Resend OTP Successfully")
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  }
  verifyOTP() {
    if(this.otpVerifyDetails.otp.length >= 0) {
      var credential = firebase.default.auth.PhoneAuthProvider.credential(this.verify, this.otpVerifyDetails.otp);
      this.auth.signInWithCredential(credential).then((response) => {
        let userCreds: firebase.default.auth.UserCredential = response;
        
        if(userCreds.user) {
          this.isotpSent === true;
          sessionStorage.removeItem("registration-details")

          // this.router.navigate(['business']);
          this.toast.success({detail:"Sucessfully Register",summary:'Success',duration:5000});
          this.RegisterFormService.getUserValue(this.user).subscribe((res:any)=>{
            console.log(res)
            localStorage.setItem('tokenn', res.token)
            this.router.navigate(['registration']);
        })   

        }
      }).catch((error) => {
        this.isOtpValid = false;
        console.log(error);
        // this.toast.error({detail:"ERROR",summary:'Emter valid OTP',sticky:false,duration:5000});
      });

    }

    else{
      //  this.toast.error({detail:"ERROR",summary:'Emter valid OTP',sticky:false,duration:5000});
  }

  }

  loginPage(){
    this.router.navigate(['login']);
  }
  
}
