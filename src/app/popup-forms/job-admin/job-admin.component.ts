import { Component, OnInit , Output,EventEmitter,Input } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { RegistrationDetails, validationResults, Country, State, City ,postIndustri } from 'src/app/models/interfaces';
import { CountryStateCityService } from 'src/app/service/country-state-city/country-state-city.service';

@Component({
  selector: 'b2b-job-admin',
  templateUrl: './job-admin.component.html',
  styleUrls: ['./job-admin.component.css']
})
export class JobAdminComponent implements OnInit {
  All_jobs:any=[]
  @Output() close_jobs = new EventEmitter();
  @Output() view_jobs = new EventEmitter();
  @Output() view_applicaion = new EventEmitter();

  adminPage:boolean = true
  alertpopup:boolean = false
  filteredjobs:any =[]
   openform = false
  alert_type:any=''
  selected_job_id:any=''
  selected_hotel_id:any=''
  hotel_id:any=''
  edit_id:any =''
  edit_hotel_id:any =''

  delete_id:any = ''
  isLoading: boolean = false
isview:boolean = false
  edit_form:boolean = false
  state:any=''

  filterData: any = '';
  type:any = ''
  Screen:any=''

  send_job_view_data:any={
    job_data:{},
    type:''
}
cityData:any='';

job_type:any=['Full Time','Part Time']

work_mode:any=['Remote','Hotel']
country:any=''
  @Input() all_hotels:any = []
  o_hotel_name:any=''
  o_hotel_id:any=[]
  currency:any=''
  get_job_data:any ={
    position :'',
    hotel_name:'',
    address:'',
    qualification:'',
    responsibility:'',
    Benifits:'',
    salary:'',
    job_type:'',
    work_mode:'',
    contact_number:'',
    experience:'',
    vacancy:'',
    o_hotel_name:'',
    country:'',
    state:'',
    city:'',
    email:'',
    validity_date:''
  }
  listcountry!: Country[]
    countrySelected!: string
    listState!: State[]
    selectedState!: string
    listCity!: City[]
    buttonfilters2:any=[]
  usertype:any=''
  stateFilter:any='';
  cityFilter:any='';
  buttonfilters:any = [{'name':'Waiting', 'check':false},{'name':'Approved', 'check':false},{'name':'Rejected', 'check':false},{'name':'Closed', 'check':false}]
  constructor(private hotelservice:HotelService, private toast: NgToastService,    private appserviceService: AppserviceService,private CountryStateCityService: CountryStateCityService){}

  ngOnInit(): void {
    this.usertype = JSON.parse(localStorage.getItem('currentUser') || '[]')
    console.log(this.usertype.user_type)
    this.get_jobs()
    this.fetchCountry()
    this.isLoading = true
  }
  addjobs(){
    this.openform = true

  }
  get_jobs(){

    this.o_hotel_id=[]
   
    
  
    this.hotelservice.view_approve_post().subscribe((res:any)=>{
      console.log(res)
      res.unapprove_job.forEach((org:any)=>{
        org.job_status = 'Rejected'
        org.color ='--color-orange'
        org.application =[]
      })
      res.approve_job.forEach((org:any)=>{
        org.job_status = 'Approved'
        org.color ='--color-green'
      })
      res.closed_job.forEach((org:any)=>{
        org.job_status = 'Closed'
        org.color ='--color-redd'
        org.application =[]


      })
      res.waiting_for_approve_job.forEach((org:any)=>{
        org.job_status = 'Waiting'
        org.color ='--color-yellow'
        org.application =[]


      })
      const reorder = res.waiting_for_approve_job.reverse()
      this.All_jobs = reorder.concat(res.approve_job,res.unapprove_job,res.closed_job)
      this.All_jobs.forEach((org:any)=>{
        org.date = this.formatJobPostDate(org.created_at)
        org.ischecked = false
      })
      console.log(this.All_jobs)

      this.filteredjobs = this.All_jobs
          console.log(this.All_jobs)

          this.isLoading = false



    })
  }
//   formatDate(dateString: string): string {
//     // Parse the input date string
//     const date = new Date(dateString);

//     // Check if the date is valid
//     if (isNaN(date.getTime())) {
//         throw new Error("Invalid date format");
//     }

//     // Get date components
//     const day = date.getDate();
//     const month = date.toLocaleString('default', { month: 'short' }); // Short month name (e.g., "Nov")
//     const year = date.getFullYear();

//     // Format the date as "DD-MMM-YYYY"
//     return `${day.toString().padStart(2, '0')}-${month}-${year}`;
// }

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
      return "Job posted today";
  } else if (diffDays === 1) {
      return "Job posted 1 day ago";
  } else if (diffDays < 7) {
      return `Job posted: ${diffDays} days ago`;
  } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `Job posted: ${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `Job posted: ${months} month${months > 1 ? "s" : ""} ago`;
  } else {
      const years = Math.floor(diffDays / 365);
      return `Job posted: ${years} year${years > 1 ? "s" : ""} ago`;
  }
}

viewJobs(data:any,type:any){
  this.adminPage = false
  this.send_job_view_data.job_data = data
  this.send_job_view_data.type = type
  

}
clocecancelpopup(){
  this.openform = false
}
getHotels(event:any, hotel:any){
         
  this.all_hotels.forEach((org:any)=>{
        
    if(hotel.Hotel_Name_id == org.Hotel_Name_id){
        org.checked = event.target.checked
    }

  })
console.log(this.all_hotels)
  const hotel_details = this.all_hotels.filter((org:any)=>org.checked == true)
  console.log(hotel_details)
  this.get_jobs()

}
Approve(data:any){
  console.log(data)
     let obj ={}
  if(data.job_status == 'Unapproved'){

     obj={
      Hotel_Name_id :this.o_hotel_id,
      id:data.id,
      status:1
    }
    }else{
       obj={
        Hotel_Name_id :this.o_hotel_id,
        id:data.id,
        status:0
      }

    }
    this.hotelservice.approve_post(obj).subscribe((res:any)=>{
      console.log(res)
      this.get_jobs()

      this.view_jobs.emit('')
  
    })
  
}
closeJobs(){
  this.close_jobs.emit('')

}
alertJobs(job_id:any,hotel_id:any, type:any){
  this.alert_type = type
  this.alertpopup = true
  this.selected_job_id = job_id
  this.selected_hotel_id = hotel_id



}
Delete_Jobs(job_id:any,hotel_id:any, type:any){
  const obj = {
    id:job_id,
  }
  if(type == 'close'){
    this.hotelservice.close_post(obj).subscribe({
      next:(res:any)=>{
  
        this.toast.success({ detail: "SUCCESS", summary: 'successfully deleted', duration: 3000 });
        // this.All_jobs = this.All_jobs.filter((ids:any) => ids.id != job_id)
        this.view_jobs.emit('')
        this.get_jobs()

        console.log(this.All_jobs)
        this.alertpopup = false
      },
      error:(err:any)=>{
        this.toast.error({ detail: "ERROR", summary: 'Unable to delete', duration: 3000 });
      }
    })

  }else{
    this.hotelservice.post_delete(obj).subscribe({
      next:(res:any)=>{
  
        this.toast.success({ detail: "SUCCESS", summary: 'successfully deleted', duration: 3000 });
       this.filteredjobs = this.All_jobs.filter((ids:any) => ids.id != job_id)
        console.log(this.filteredjobs)
        this.view_jobs.emit('')

        this.alertpopup = false
      },
      error:(err:any)=>{
        this.toast.error({ detail: "ERROR", summary: 'Unable to delete', duration: 3000 });
      }
    })


  }
  

}
Job_post(type:boolean){
  if(type){
    const obj = {
      id:this.edit_id,
      position:this.get_job_data.position,
      address:this.get_job_data.address,
      hotel_name: this.get_job_data.hotel_name,
      qualification:this.get_job_data.qualification,
      responsibility:this.get_job_data.responsibility,
      salary :this.get_job_data.salary,
      benefit:this.get_job_data.Benifits,
      job_type:this.get_job_data.job_type,
      experience:this.get_job_data.experience,
      conact_number:this.get_job_data.contact_number,
      vacancy:this.get_job_data.vacancy,
      work_mode:this.get_job_data.work_mode,
    }

    this.hotelservice.update_post(obj).subscribe({
      next:(res:any)=>{

        this.toast.success({ detail: "SUCCESS", summary: 'successfully Updated', duration: 3000 });
        
        this.edit_form = false
        this.openform = false
        this.Empty_field()
        this.get_jobs()
        this.view_jobs.emit('')


        console.log(this.All_jobs)

      },
      error:(err:any)=>{
        this.toast.success({ detail: "SUCCESS", summary: 'No Changes Done', duration: 3000 });
      

      }
    })

  }else{
    console.log('submit')
    console.log(this.get_job_data)
    const obj ={
      position:this.get_job_data.position,
      address:this.get_job_data.address,
      hotel_name: this.get_job_data.hotel_name,
      qualification:this.get_job_data.qualification,
      responsibility:this.get_job_data.responsibility,
      salary :  this.get_job_data.salary == ''? 'Not Disclosed' :this.currency +this.get_job_data.salary ,
      benefit:this.get_job_data.Benifits,
      job_type:this.get_job_data.job_type,
      experience:this.get_job_data.experience,
      // conact_number:this.get_job_data.contact_number,
      vacancy:this.get_job_data.vacancy,
      work_mode:this.get_job_data.work_mode,
      country:this.get_job_data.country,
      state:this.get_job_data.state,
      city:this.get_job_data.city,
      email:this.get_job_data.email,
      validity_date:this.get_job_data.validity_date


    }
    if(this.get_job_data.position != '' && this.get_job_data.address != '' && this.get_job_data.hotel_name !=''&& this.get_job_data.qualification !='' && this.get_job_data.responsibility!=''){
      this.hotelservice.jobpost(obj).subscribe({
        next:(response:any)=>{
          console.log('sucess')
          console.log(response)
         
         this.toast.success({ detail: "SUCCESS", summary: 'success', duration: 3000 });
            this.Empty_field()
            this.openform = false
            this.get_jobs()

  
  
        },
        error:(error:any)=>{
          console.log('fail')
          console.log(error)
         this.toast.error({ detail: "ERROR", summary:error , duration: 3000 });
  
  
        }
      })
    }else{
      this.toast.error({ detail: "ERROR", summary: 'Required All Fields', duration: 3000 });

    }

  }
}
Empty_field(){
  this.get_job_data.position = '',
  this.get_job_data.address = '',
  this.get_job_data.hotel_name = '',
  this.get_job_data.qualification ='',
  this.get_job_data.responsibility ='',
  this.get_job_data.salary ='',
  this.get_job_data.Benifits ='',
  this.get_job_data.job_type ='',
  this.get_job_data.work_mode ='',
  this.get_job_data.vacancy ='',
  this.get_job_data.contact_number ='',
  this.get_job_data.experience =''
  this.currency = ''

}
editjob(data:any){
  console.log(data)
  this.edit_form = true
  this.openform = true
  this.edit_id = data.id,
  this.edit_hotel_id = data.Hotel_Name_id,
  this.get_job_data.position = data.position,
  this.get_job_data.address =data.address,
  this.get_job_data.hotel_name =  data.hotel_name ,
  this.get_job_data.qualification =data.qualification,
  this.get_job_data.responsibility =data.responsibility,
  this.get_job_data.salary = data.salary.replace(/[^0-9]/g, ""),
  this.get_job_data.Benifits =data.benefit,
  this.get_job_data.job_type = data.job_type,
  this.get_job_data.work_mode = data.work_mode,
  this.get_job_data.experience = data.experience,
  this.get_job_data.contact_number = data.conact_number,
  this.get_job_data.vacancy = data.vacancy



 

}
getInput(data:any,type:any){
  if(type == 'job_type'){
    this.get_job_data.job_type = data
  }else if(type =='owner_hotel'){
    console.log(data)
    this.get_job_data.o_hotel_name = data.Hotel_Name
    this.hotel_id = data.Hotel_Name_id
  }else{
    this.get_job_data.work_mode = data
  }
}
viewApplication(){
  // this.view_applicaion.emit('')
  this.isview = !this.isview
  if(this.isview){
    this.filteredjobs = this.All_jobs.filter((org:any)=> org.application.length > 0)

  }else{
    this.filteredjobs = this.All_jobs
  }
}
transformPlacementData (brandProductsName: string, times:number) {
  if (brandProductsName != null) {
    const words = brandProductsName.split(' ');
    if (words.length > times) {
      return words.slice(0, times).join(' ') + '...';
    } else {
      return brandProductsName;
    }
  }
  return '-';
}
private fetchCountry(){
  this.CountryStateCityService.all_countery().subscribe(data=>{
  this.listcountry = data.countries
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
onStateCity(city:any){
  this.cityFilter=''; 
  this.cityData = city
}

getfilter(event:any, value:any){
   console.log(event.target.checked)

    this.All_jobs.forEach((org:any)=>{
        if(value == org.job_status){
          org.ischecked = event.target.checked
        }
   })
   this.buttonfilters.forEach((org:any)=>{
    if(value == org.name){
      org.check = event.target.checked

    }
})
   this.filteredjobs = this.All_jobs.filter((org:any)=>org.ischecked == true)
   console.log(this.All_jobs)
}
cancelfilter(){
  this.filteredjobs = this.All_jobs
  this.buttonfilters.forEach((org:any)=>{
       org.check = false
  })
  console.log(this.buttonfilters)

}

}
