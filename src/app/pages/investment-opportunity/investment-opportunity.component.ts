import { Component, OnInit,Input } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { Router,ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';
import { NgToastService } from 'ng-angular-popup';
import { CountryStateCityService } from 'src/app/service/country-state-city/country-state-city.service';
import { RegistrationDetails, validationResults, Country, State, City ,postIndustri } from 'src/app/models/interfaces';


@Component({
  selector: 'b2b-investment-opportunity',
  templateUrl: './investment-opportunity.component.html',
  styleUrls: ['./investment-opportunity.component.css']
})
export class InvestmentOpportunityComponent implements OnInit {
  propertylisting:any = []
  send_type:any=''
  shared_id:any=''

  
    Screen:any=''

  opportunity: Record<string, string>[] = [
    {
      "HOTEL NAME": "GRT Chennai",
      "IMAGE":'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80',
      "AMOUNT": "$700,000",
     "FEET":'3.500 sq.ft',
   "HOTEL":'Hotel Available for sale ',
     "BUTTON":''
    },
    {
      "HOTEL NAME": "GRT Covai",
      "AMOUNT": "$500,000",
      "IMAGE":'https://images.unsplash.com/photo-1631049035634-c04c637651b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
     "FEET":'3.500 sq.ft',
     "HOTEL":'Hotel Available for sale ',
     "BUTTON":''
    },
    {
      "HOTEL NAME": "GRT Trichy",
      "IMAGE":"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      "AMOUNT": "$600,000",
     "FEET":'3.500 sq.ft',
     "HOTEL":'Hotel Available for sale ',
     "BUTTON":''
    },
   ];

  
   constructor(private HotelService:HotelService, private toast: NgToastService,private router: Router,private route: ActivatedRoute,private CountryStateCityService: CountryStateCityService, private location: Location,private authService: AuthServiceService,private AppserviceService:AppserviceService) {}
   filterData: any = '';
   closing_type:any=''
     share_data:any={}
     country:any=''
     view_property:boolean = false
     edit_form:boolean = false
     edit_id:any =''
     multiSelectBrand :any = []
     uploadfile:any=[]
     sale_rent:any=['For Sale','For Rent']
     searchDate: string = '';
     searchLocation:string='';
     searchName: string = '';
     filteredlist:any = [];

     listcountry!: Country[]
         countrySelected!: string
         listState!: State[]
         selectedState!: string
         listCity!: City[]
       usertype:any=''
       stateFilter:any='';
       cityFilter:any='';
       
       state:any=''
       cityData:any='';
       uploadimage:any=[]
       uploadvideo:any=[]
       currency:any=''
       view_property_list:any={
        job_data:{},
        type:''
  }
   
     get_job_data:any={
       propertyname :'',
       keys:'',
       address:'',
       beds:'',
       country:'',
       yearsbuild:'',
       state:'',
       yearsrenovated:'',
       city:'',
       buildings:'',
       askingprice:'',
       stories:'',
       expiration_date:'',
       lot_size:'',
       send_me_reminder:'',
       parking_type:'',
       square_feet:'',
       sub_header:'',
       marketing_descrip:'',
       inves_highlight:'',
       for_sale:'',
     }
   isLoggedIn:boolean = false
   joblogin:boolean = false
   open_share_page:boolean=false
   shared_files:any=[]
   video_thumnail: any = 'assets/video_img.png'
   video_thumb:any='assets/video.png'
   job_date:any =['Date','Relevance']

  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();
    console.log(this.isLoggedIn)
    this.joblogin = this.authService.JobLogin();
    this.fetchCountry()

    this.route.paramMap.subscribe((params) => {
      this.shared_id = params.get("ids");
      console.log(this.shared_id)
      if (this.shared_id) {
        this.open_share_page = true;
      } else {
        this.open_share_page = false; 
      }
    })
    this.getapi()
   

  }
  getapi(){
    this.HotelService.view_investment().subscribe((data :any) =>{  
      console.log(data)
      this.propertylisting = data.investment_list
      console.log(this.propertylisting)

      this.propertylisting.forEach((org:any)=>{
        org.images=[]
        org.videos =[]
        org.document =[]
        org.date = this.formatJobPostDate(org.created_at)
        
        org.files.forEach((arr:any)=>{
          if(arr.type == 'document'){
            org.document.push({
              id:arr.id,
              file:arr.file
            })
          }
          if(arr.type == 'photos'){
            org.images.push({
              id:arr.id,
              file:arr.file
            })
          }
         
          if(arr.type == 'video'){
            org.videos.push({
              id:arr.id,
              file:arr.file,
              thumb:this.video_thumb
            })
          
           
          }
         
         

        })
       
        if(org.id == this.shared_id){
          this.shared_files.push(org)
        }
      })
      console.log(this.propertylisting)
      this.filteredlist = [...this.propertylisting.reverse()]; // Initialize with the full list
      console.log( this.filteredlist)
    })
  }
  goBack() {
    this.location.back();
  }

  viewproperty(data:any ,type:any='user'){
  
  this.share_data=data
  this.Screen = 'viewing'
  this.send_type = type
  this.router.navigate([{ids:data.id }], { relativeTo: this.route });


}
closeView(){
  this.Screen = ''
  this.router.navigate([{ids:'' }], { relativeTo: this.route });

}
filterlist(){
  const nameSearchWords = this.searchName.toLowerCase().split(' ');

  this.filteredlist = this.propertylisting.filter((user:any) => {
    // Check if name matches all search words
    const nameMatch = nameSearchWords.every((word) =>
      user.property_name.toLowerCase().includes(word)
    );
    return nameMatch


  });
}
filterlocation(text:any,Swords:any){
  const nameSearchWords = text.toLowerCase().split(' ');

  this.filteredlist = this.propertylisting.filter((user: any) => {
    // Check if name matches all search words
    return nameSearchWords.every((word:any) =>
      user.country.toLowerCase().includes(word)
    );
  });
}

  onStateSelected(stateIso:any,stateName:any){
    this.get_job_data.state=stateName;
    this.state=stateIso;
    this.CountryStateCityService.getCitiesOfSelectedState(this.country, this.state).subscribe(data=>{
    console.log(data)
    this.listCity = data
  })
  this.get_job_data.city =''
  this.stateFilter=''; 
  
  
  }
  private fetchCountry(){
    this.CountryStateCityService.getCountry().subscribe(data=>{
    this.listcountry = data
    })
  }
  onCountrySelected(countryIso: any,countryName:any,currency:any){
    this.currency = currency
    this.get_job_data.country = countryName;
    this.country =  countryIso;
    this.CountryStateCityService.getStateOfSelectedCountry(countryIso).subscribe(data=>{
      this.listState = data;
    })
  
   
    this.get_job_data.state ='' ;
    this.get_job_data.city ='' ;
    this.filterData=''; 
  
  }
  onStateCity(city:any){
    this.cityFilter=''; 
    this.cityData = city
  }
 

  


  uploadfiles(event:any){
    this.uploadfile = []
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadfile = file;
    }
  }
  uploadphotos(event:any){
    this.uploadimage = []
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadimage = file;
    }
  }
  uploadvideos(event:any){
    this.uploadvideo = []
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadvideo = file;
    }
  }
  ADD_listing(){

    console.log(this.get_job_data)
    const form = new FormData();
    form.append('property_name', this.get_job_data.propertyname);
    form.append('address', this.get_job_data.address);
    form.append('country', this.get_job_data.country);
    form.append('state', this.get_job_data.state);
    form.append('city', this.get_job_data.city);
    form.append('asking_price', this.get_job_data.askingprice);
    form.append('experation_date', this.get_job_data.expiration_date);
    form.append('send_me_remainder', this.get_job_data.send_me_reminder);
    form.append('square_feet', this.get_job_data.square_feet);
    form.append('keys', this.get_job_data.keys);
    form.append('beds', this.get_job_data.beds);
    form.append('years_build', this.get_job_data.yearsbuild);
    form.append('yours_renovated', this.get_job_data.yearsrenovated);
    form.append('buildings', this.get_job_data.buildings);
    form.append('stories', this.get_job_data.stories);
  
    form.append('lot_size', this.get_job_data.lot_size);
    form.append('parking_type', this.get_job_data.parking_type);
    form.append('subheading', this.get_job_data.sub_header);
    form.append('marketing_description', this.get_job_data.marketing_descrip);
  
    form.append('investment_highlights', this.get_job_data.inves_highlight);
    // form.append('photos', this.get_job_data.add_image);
    // form.append('videos', this.get_job_data.add_video);
    // form.append('document', this.get_job_data.document);
  
      form.append('photos[]',  this.uploadimage);
      form.append('videos[]', this.uploadvideo);
    
      form.append('document[]', this.uploadfile);

      console.log(this.get_job_data);

      this.HotelService.add_investment(form).subscribe({
        next: (response:any) => {
                  
          this.toast.success({ detail: "SUCCESS", summary: 'Update Successfully', duration: 3000 });
          this.AppserviceService.realoadVendorData('reload')
          this.uploadfile =[]
          this.uploadimage =[]
          this.uploadvideo =[]
          // this.AppserviceService.rfqRequestReload(this.serviceRequest_form.product_id
          console.log(response)
        },
        error: (error) => {
          console.log(error);
          this.toast.error({ detail: "ERROR", summary: 'Required All Fields', duration: 3000 });
  
        },
      })
    
}

getInput(data:any){
        this.get_job_data.for_sale = data
    }
    getInput2(data:any){
      this.searchDate = data
      if(this.searchDate == 'Date'){
        this.filteredlist = this.propertylisting
    
       }else{
        this.filteredlist = this.propertylisting.filter((org:any)=> org.date == 'Just Now')
    
       }

    }
  
  Admin(){
    this.Screen = 'admin'
  }
  formatJobPostDate(dateString: string): string {
    // Parse the input date string
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }
  
    // Get the current date
    const now = new Date();
  
    // Calculate the difference in milliseconds
    const diffMs = now.getTime() - date.getTime();
  
    // Calculate the difference in days
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    // Determine the output format based on the time difference
    if (diffDays === 0) {
        return "Just Now";
    } else if (diffDays === 1) {
        return "posted 1 day ago";
    } else if (diffDays < 7) {
        return `posted: ${diffDays} days ago`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `posted: ${weeks} week${weeks > 1 ? "s" : ""} ago`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `posted: ${months} month${months > 1 ? "s" : ""} ago`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `posted: ${years} year${years > 1 ? "s" : ""} ago`;
    }
  }
}
