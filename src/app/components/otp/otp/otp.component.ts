import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import * as firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CountryFlagService } from 'src/app/service/country-flag/country-flag.service';

@Component({
  selector: 'b2b-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  recaptchaVerifier: any;
  mobileNumber:any
  verificationId: any = '';
  validate_otp_nummber :any
  flag :any
  flagFilter:any = ''
  flagArr:any = {
    image :'',
    code : '',
    dial_code : '+91'
  }
  @Output() validated_otp = new EventEmitter();
  @Input() isSendOtp:boolean = false
  @Output() onChange = new EventEmitter();

  CountryFlag:boolean = true
  constructor(private auth: AngularFireAuth,private CountryFlagService:CountryFlagService) { }

  ngOnInit(): void {
    this.flag = this.CountryFlagService.countryFlag
  }

  validateInput(){
    return true
  }

  getflag(data :any){
    this.flagArr=data;
    this.CountryFlag=false;
    // this.signInDetails.mobileNumber =this.flagArr.phcode;
    // console.log(this.flagArr)
    // this.tests =this.flagArr.dial_code
    this.mobileNumber='';

  }

  sendOTP() {
    const mobileNumber = this.flagArr.dial_code + this.mobileNumber;
    // console.log(this.signInDetails)
    // this.otpSent = false;
    console.log(mobileNumber)
    if(!this.recaptchaVerifier && mobileNumber.length > 10) {
      this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier("recaptcha-container", {size: 'invisible'});
    }
    this.auth.signInWithPhoneNumber(mobileNumber, this.recaptchaVerifier).then((confirmationResult) => {
      if(confirmationResult.verificationId) {
        this.verificationId = confirmationResult.verificationId;
        // this.otpSent = true;
        // this.loading = false ;
        // this.AppserviceService.login(this.signInDetails)
      }
    }).catch((error) => {
      console.log(error);
      if(error){
        // this.accountErrorMessage = true ;
        // this.loading = false ;
      }
    });

  }

  mobileNumberFuc(event:any){
    this.mobileNumber = event
    const mobile = {
      mobile_number : this.mobileNumber,
      dial_code : this.flagArr.dial_code
    }
    this.onChange.emit(mobile);
  }

  validateOTP() {
    // this.loading = true ;

    if(this.validateInput()) {
      var credential = firebase.default.auth.PhoneAuthProvider.credential(this.verificationId, this.validate_otp_nummber);
      this.auth.signInWithCredential(credential).then((response) => {
        let userCreds: firebase.default.auth.UserCredential = response;
        if(userCreds.user) {
          this.validated_otp.emit(true);
          this.verificationId = ''
          this.isSendOtp = false
          // alert('OTP Number is correct')
          // this.isVendor()
        }
      }).catch((error) => {
        console.log(error);
        // this.loading = false ;
      });

    }
  }

}
