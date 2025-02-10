import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router ,ActivatedRoute} from '@angular/router';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';


@Component({
  selector: 'b2b-jobopportunity',
  templateUrl: './jobopportunity.component.html',
  styleUrls: ['./jobopportunity.component.css']
})
export class JobopportunityComponent implements OnInit {
  All_jobs:any=[]
  open_share_page:boolean=false
  filter :any ={
    Job_title:'',
  }
  filterData: any = '';
  hotels:any=[]
  jobOpportunity: Record<string, string>[] =[
    {
      'position' :'F&B Manager',
      'hotelName' :'Hiton Grand Hotel',
      'location' :'Chennai',
      'amount' :'$3000/m'
    },
    {
      'position' :'F&B Manager',
      'hotelName' :'Hiton Grand Hotel',
      'location' :'Chennai',
      'amount' :'$3000/m'
    },
    {
      'position' :'F&B Manager',
      'hotelName' :'Hiton Grand Hotel',
      'location' :'Chennai',
      'amount' :'$3000/m'
    }
  ]
  searchText: string = '';
  searchDate: string = '';
  searchJob_type:string = '';
  searchLocation:string='';
  userID:string=''
  send_job_view_data:any={
        job_data:{},
        type:''
  }
  filteredUsers:any = []; // Initialize with the full list

  openform:boolean = false
  edit_form:boolean = false
  isLoading:boolean = false

  alertpopup:boolean = false
  closing_type:any=''
  view_jobs:boolean = false
  Screen:any=''
  edit_id:any =''
  delete_id:any = ''
  hotel_id:any=''
  isLoggedIn:boolean = false
  joblogin:boolean = false
  Emptyfields:any = ''
  job_type:any=['All','Full Time','Part Time']
  job_date:any =['Date','Relevance']
  constructor(private router: Router,private route: ActivatedRoute ,private location: Location, private hotelservice:HotelService,private toast: NgToastService,    private appserviceService: AppserviceService,private authService: AuthServiceService
  ) {}

  currentUrl:any=''
  shared_jobs:any=[]
  shared_id:any=''
  show_jobs_name:any='All Jobs'
  check_jobs:boolean = true
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();
    console.log(this.isLoggedIn)
    this.joblogin = this.authService.JobLogin();

    this.route.paramMap.subscribe((params) => {
      this.shared_id = params.get("ids");
      console.log(this.shared_id)
      if (this.shared_id) {
        this.open_share_page = true;
      } else {
        this.open_share_page = false; 
      }
    })
    this.get_jobs()
    this.isLoading = true

  }
  get_jobs(){
   
    this.hotelservice.all_post_view().subscribe((res:any)=>{
      console.log(res)
    
      const jobarray = res.all_jobs
      jobarray.forEach((org:any)=>{
        org.date = this.formatJobPostDate(org.created_at)
        org.applied = false
        if(org.id == this.shared_id){
          this.shared_jobs.push(org)
        }
       
       
     
      })
      console.log(jobarray)

      this.All_jobs = jobarray.reverse()
          console.log(this.All_jobs)
          this.filteredUsers = [...this.All_jobs]; // Initialize with the full list
          this.isLoading = false

        
    })
    if(this.isLoggedIn || this.joblogin){
      setTimeout(()=>{
        this.hotelservice.listing_applly_jobs().subscribe((resp:any)=>{
          resp.job_list.forEach((abc:any)=>{
            this.filteredUsers.forEach((oz:any)=>{
              if(abc.id == oz.id){
                oz.applied = true
              }
            })
          
           
      })
        })
      },10)
     
    }
   
  }
  goBack() {
    this.location.back();
  }
  
   
  
  
  

  closeJobs(){
  
      this.Screen = ' '

    
  }
  viewJobs(data:any , type:number){
       this.closing_type = type
       this.Screen = 'viewing'
       this.router.navigate([{ids:data.id }], { relativeTo: this.route });

       this.send_job_view_data.job_data = data
       this.send_job_view_data.type = 'All'

    this.view_jobs = true
    console.log(data)
   

  }
  alertJobs(id:any){
    this.alertpopup = true
    this.delete_id = id



  }
 
 
  filterUsers() {
    const nameSearchWords = this.searchText.toLowerCase().split(' ');
    const dateSearch = this.searchDate.toLowerCase().trim();

    this.filteredUsers = this.All_jobs.filter((user:any) => {
      // Check if name matches all search words
      const nameMatch = nameSearchWords.every((word) =>
        user.position.toLowerCase().includes(word)
      );

      // Check if date contains the search term
      const dateMatch = user.date.toLowerCase().includes(dateSearch);

      return nameMatch && (!dateSearch || dateMatch); // Match both if provided
    });
  }
  filterUsers2(text:any,Swords:any) {
    const nameSearchWords = text.toLowerCase().split(' ');
    if(Swords == 'job_type'){
      this.filteredUsers = this.All_jobs.filter((user: any) => {
        // Check if name matches all search words
        return nameSearchWords.every((word:any) =>
          user.job_type.toLowerCase().includes(word)
        );
      });

    }else{
      this.filteredUsers = this.All_jobs.filter((user: any) => {
        // Check if name matches all search words
        return nameSearchWords.every((word:any) =>
          user.address.toLowerCase().includes(word)
        );
      });

    }
    
  }
  



  formatDate(dateString: string): string {
    // Parse the input date string
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }

    // Get date components
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // Short month name (e.g., "Nov")
    const year = date.getFullYear();

    // Format the date as "DD-MMM-YYYY"
    return `${day.toString().padStart(2, '0')}-${month}-${year}`;
}

listHotel(){
  this.appserviceService.user_ID$.subscribe(datas => {
    this.userID = datas;
    const obj = { user_id: this.userID };
    this.hotelservice.hotel_for_user(obj).subscribe((res: any) => {
      this.hotels = res.hotel.map((element: any) => ({
        Hotel_Name_id: element.Hotel_Name_id,
        Hotel_Name: element.Hotel_Name
      }));
    });
  });
}

Admin(){
  this.Screen = 'admin'

}
viewApplication(){
  this.Screen = 'application'

}
closeView(){
  this.Screen = ''
  this.router.navigate([{ids:'' }], { relativeTo: this.route });
  this.open_share_page = false

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
JobType(value:number){
 
  if(value === 1){
    this.filteredUsers = this.All_jobs.filter((org:any)=> org.applied)
    this.show_jobs_name='Applied Jobs'
    this.check_jobs = false
  }else{
    this.filteredUsers = this.All_jobs
    this.show_jobs_name='All Jobs'
    this.check_jobs = true
  }

}
// viewAppliedJobs(){
//   this.hotelservice.listing_applly_jobs().subscribe((res:any)=>{
//     console.log(res)
   

//     const jobarray = res.job_list
//     jobarray.forEach((org:any)=>{
//       org.date = this.formatDate(org.created_at)
      
//       if(org.id == this.shared_id){
//         this.shared_jobs.push(org)
//       }
//     })
//     console.log(jobarray)

//     this.All_jobs = jobarray.reverse()
//         console.log(this.All_jobs)
//         this.filteredUsers = [...this.All_jobs];

//   })

// }

getInput(data:any,type:any){
  if(type == 'job_type'){
    this.searchJob_type = data
   if(this.searchJob_type == 'All'){
    this.filteredUsers = this.All_jobs

   }else{
    this.filteredUsers = this.All_jobs.filter((org:any)=> org.job_type == this.searchJob_type)

   }
  }else{
    this.searchDate = data
    if(this.searchDate == 'Date'){
      this.filteredUsers = this.All_jobs
  
     }else{
      this.filteredUsers = this.All_jobs.filter((org:any)=> org.date == 'Just Now')
  
     }
  }
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
}
