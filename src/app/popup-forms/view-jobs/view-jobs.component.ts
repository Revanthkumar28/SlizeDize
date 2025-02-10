import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { Router ,ActivatedRoute} from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';


@Component({
  selector: 'b2b-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.css']
})
export class ViewJobsComponent implements OnInit {
  @Input() view_data:any={}
  @Output() close_view = new EventEmitter();
  apply_form:boolean = false
  uploadfile:any=[]
  type:any=''
  jobids:any=''
  send_url:any=''
  isFresher: boolean = false;

  constructor(private router: Router,private route: ActivatedRoute ,private hotelservice:HotelService, private toast: NgToastService,    private appserviceService: AppserviceService,private authService: AuthServiceService){}
  show_single_jobs:any ={
    position :'',
    hotel_name:'',
    address:'',
    qualification:'',
    responsibility:'',
    Benifits:'',
    salary:'',
    date:'',
    job_type:'',
  }
  get_job_data:any={
    full_name:'',
    phone_number:'',
    Email:'',
    Qualification:'',
    Expected_salary:'',
    Address:'',
    Pre_company_name:'',
    pre_designation:'',
    pre_salary:'',
    Start_date:'',
    End_date:'',


    }
    currentUrl:any=''
    isLoggedIn:boolean = false
    joblogin:boolean = false
  ngOnInit(): void {
     this.isLoggedIn = this.authService.login();
    this.joblogin = this.authService.JobLogin();

    this.currentUrl = window.location.href;
    console.log(this.currentUrl);


    console.log(this.view_data)
    this.type = this.view_data.type
    this.show_single_jobs.position = this.view_data.job_data.position
    this.show_single_jobs.hotel_name = this.view_data.job_data.hotel != undefined ? this.view_data.job_data.hotel :this.view_data.job_data.hotel_name
    this.show_single_jobs.address = this.view_data.job_data.address
    this.show_single_jobs.qualification = this.view_data.job_data.qualification
    this.show_single_jobs.benefit = this.view_data.job_data.benefit
    this.show_single_jobs.responsibility = this.view_data.job_data.responsibility
    this.show_single_jobs.salary = this.view_data.job_data.salary
    this.show_single_jobs.date = this.view_data.job_data.date
    this.show_single_jobs.job_type = this.view_data.job_data.job_type
    this.show_single_jobs.work_mode = this.view_data.job_data.work_mode
    this.show_single_jobs.vacancy = this.view_data.job_data.vacancy
    this.show_single_jobs.applied = this.view_data.job_data.applied
    this.show_single_jobs.experience = this.view_data.job_data.experience

    this.jobids = this.view_data.job_data.id

    
  }

  closeJobs(){
    this.close_view.emit('')

  }
applyJobs(){
  if(this.isLoggedIn || this.joblogin){
    this.apply_form = true

  }else{
    this.router.navigate(['/login' , {type:'sign-up-job'}])

  }



}
fresher(){
  this.isFresher = !this.isFresher;

    // If the user selects "Fresher", clear work experience fields
    if (this.isFresher) {
      this.clearWorkExperienceFields();
      this.isFresher = true

    }
}
clearWorkExperienceFields() {
  this.get_job_data = {
    Pre_company_name: '',
    pre_designation: '',
    pre_salary: '',
    Start_date: '',
    End_date: ''
  };
}

Apply_send(){
  const formData = new FormData();
  formData.append('Hotel_Name_id' , this.view_data.job_data.Hotel_Name_id);
  formData.append('job_posts_id' , this.view_data.job_data.id);
  formData.append('resume' , this.uploadfile);
  formData.append('email' , this.get_job_data.Email);
  formData.append('previous_company_name' , this.get_job_data.Pre_company_name);
  formData.append('previous_designation' , this.get_job_data.pre_designation);
  formData.append('Previous_company_salary' , this.get_job_data.pre_salary);
  formData.append('previous_job_start_date' , this.get_job_data.Start_date);
  formData.append('previous_job_end_date' , this.get_job_data.End_date);
  formData.append('Expected_salary' , this.get_job_data.Expected_salary);
  formData.append('address' , this.get_job_data.address);

  // formData.append('Work_experience' , 'nothing');
  formData.append('qualification' , this.get_job_data.Qualification);
  formData.append('name' , this.get_job_data.full_name);

  this.hotelservice.applying_job(formData).subscribe({
    next: (response) => {  
      this.makeEmpty() 
      this.apply_form = false
      this.uploadfile =[]
      this.toast.success({ detail: "SUCCESS", summary: 'success', duration: 3000 });

      


    },
    error:(err:any)=>{
      this.toast.error({ detail: "Error", summary: 'All Fields are Required', duration: 3000 });


    }
   
  })



}
uploadResume(event:any){
  this.uploadfile = []
  if (event.target.files && event.target.files.length > 0) {
    const file = event.target.files[0];
    this.uploadfile = file;
  }
}
makeEmpty(){
  this.get_job_data.full_name = '',
  this.get_job_data.Qualification='',
  this.get_job_data.Expected_salary='',
  this.get_job_data.End_date ='',
  this.get_job_data.Start_date='',
  this.get_job_data.pre_salary='',
  this.get_job_data.pre_designation='',
  this.get_job_data.Pre_company_name='',
  this.get_job_data.Email='',
  this.uploadfile =[]

}
ViewResume(resume:any){
  window.open(resume)
}
share() {
 
  if (navigator.share) {
    navigator.share({
      title: 'Check this out!',
      text: 'Here is some content to share.',
      url: this.currentUrl
    })
    .then(() => console.log('Share successful'))
    .catch((error) => console.error('Error sharing:', error));
  } else {
    alert('Web Share API is not supported on this browser. Try a mobile device.');
  }
}
updateUrl(): void {
  // Extract the current URL parts
  const url = new URL(this.currentUrl);
  console.log(this.jobids)

  // Update the path and maintain query parameters
 
    console.log('ddd')
    const newPath = '/#/dashboard/job';
    const newUrl = `${url.origin}${newPath};ids=${this.jobids}`;
    
    // Replace the current URL without reloading or navigating

    console.log('Updated URL:', newUrl);
    this.send_url = newUrl
  
}
CloseJob_form(){
  this.apply_form = false
  this.uploadfile = []
}
}
