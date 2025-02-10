import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';


@Component({
  selector: 'b2b-view-job-application',
  templateUrl: './view-job-application.component.html',
  styleUrls: ['./view-job-application.component.css']
})
export class ViewJobApplicationComponent implements OnInit {
  @Output() close_jobs = new EventEmitter();
  @Input() all_hotels:any = []
  o_hotel_name:any=''
  filterData: any = '';

  o_hotel_id:any=[]
  All_jobs:any=[]
  job_application:boolean = true
  isLoading:boolean = false
  send_job_view_data:any={
    job_data:{},
    type:''
  }

  constructor(private hotelservice:HotelService, private toast: NgToastService,    private appserviceService: AppserviceService){}

  ngOnInit(): void {
   
    this.get_jobs()
    this.isLoading = true
  }
  get_jobs(){
    this.o_hotel_id=[]
   
    this.hotelservice.listing_application().subscribe((res:any)=>{
      console.log(res)
      const jobarray = res.job_list
      jobarray.forEach((org:any)=>{
        org.date = this.formatJobPostDate(org.created_at)
      })
      console.log(jobarray)

      this.All_jobs = jobarray.reverse()
          console.log(this.All_jobs)
      this.isLoading = false


    })
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
  buttonClicked(){

  }
 
  viewJobs(data:any,type:any='Application'){
    this.job_application = false
    this.send_job_view_data.job_data = data
    this.send_job_view_data.type = type  
  }
  closeJobs(){
    this.close_jobs.emit('admin')
  
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
