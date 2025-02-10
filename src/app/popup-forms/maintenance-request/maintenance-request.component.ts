import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'b2b-maintenance-request',
  templateUrl: './maintenance-request.component.html',
  styleUrls: ['./maintenance-request.component.css']
})
export class MaintenanceRequestComponent implements OnInit {
  @Output() cancelPopup = new EventEmitter();
  openform :boolean = false
  serviceImageFiles:any = []
  maintainhistory:any =[]
  isSRrequiredData:boolean = false
  defaultVideoThumbnail: string = 'assets/video.png';

  hotelnameid:any=''
  serviceimg:boolean=false
  editrequest:boolean = false

  maintence:any={
    rooms:'',
    description:'',

    priorityname:'',
    priorityvalue:''
  }
  mr_priorit:any=[
    {'Name':'Low', 'value':'1' },
    {'Name':'Medium', 'value':'2' },
    {'Name':'High', 'value':'3' },
  ]
  selectedButton:any='Requests'
  button_name: Record<string, string>[] = [
    {"name": "Requests"},
    {"name": "History"}
  ];

  maintainRequest: any[] = [ "ID", "Requested Person","Created At", "Picture/Video","Room Number/Area","Priority", "Issue/Remarks","Status","Move to History"] 
  maintainRequestHistory: any[] = [ "ID", "Requested Person","Created At", "Picture/Video","Room Number/Area","Priority", "Issue/Remarks","Status"] 

  completedorder:any=[]
  constructor(private HotelService:HotelService,private toast: NgToastService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let i = params.get("ids");
      this.hotelnameid= i
    })
       this.maintenance_req()
  }
  maintenance_req(){
    const obj = {
      Hotel_Name_id: this.hotelnameid
     }
      this.HotelService.maintenance_request_view(obj).subscribe({
        next: (response) => {
           this.completedorder = response.mintanance_request
           this.completedorder.forEach((elem:any)=>{
            elem.image = elem.images[0]
          })
           console.log(this.completedorder)
           this.completedorder.forEach((elem:any)=>{

               switch(elem.priority){
                case '1':
                  elem.priority_full = 'Low'
                break;
                case '2':
                  elem.priority_full = 'Medium'
                break;
                case '3':
                  elem.priority_full = 'High'
                break;
               }
               switch(elem.status){
                case '0':
                 elem.work_status = 'Not Started' 
                break; 
                case '1':
                 elem.work_status = 'Under Process' 
                break; 
                case '2':
                 elem.work_status = 'Completed' 
                break; 
                case '3':
                 elem.work_status = 'Cancelled' 
                break; 
               }
           })
  
        }
        })
         //history
    const con ={
      Hotel_Name_id :this.hotelnameid
    }
    this.HotelService.maintenance_request_history(con).subscribe({
      next: (response) => {
        this.maintainhistory  = response.maintenance_request_history
        // this.toast.success({ detail: "SUCCESS", summary: 'success', duration: 3000 });
        this.maintainhistory.forEach((elem:any)=>{
          elem.imagearray = elem.images.split(','); 
          elem.image = elem.imagearray[0]

          switch(elem.priority){
           case '1':
             elem.priority_full = 'Low'
           break;
           case '2':
             elem.priority_full = 'Medium'
           break;
           case '3':
             elem.priority_full = 'High'
           break;
          }
          switch(elem.status){
           case '0':
            elem.work_status = 'Not Started' 
           break; 
           case '1':
            elem.work_status = 'Under Process' 
           break; 
           case '2':
            elem.work_status = 'Completed' 
           break; 
           case '3':
            elem.work_status = 'Cancelled' 
           break; 
          }
        })
      },
      error: (error) => {
        console.log(error);
        this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });

      }
     
    })
  }
  open(){
    this.openform = true
  }
  select(name:any,value:any){
    this.maintence.priorityname = name
    this.maintence.priorityvalue = value

  }
  cancel_popup(){
    this.cancelPopup.emit(false)

  }
  closepopup(){
    this.openform = false
   this.clearall()

  }
  clearall(){
 this.maintence.rooms =''
 this.maintence.description =''
 this.maintence.priorityname=''
 this.uploadImage =[]
  }
  uploadImage:any = []

  serviceRequestImage(event: any) {
    this.uploadImage =[]
    if (event.target.files) {
      const files = event.target.files;
      this.serviceImageFiles = files;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith('image')) {
          const reader = new FileReader();
          reader.onload = ((fileIndex, fileType) => (event: any) => {
            this.uploadImage.push({ type: fileType, src: event.target.result });
          })(i, file.type);
          reader.readAsDataURL(file);
        } else if (file.type.startsWith('video')) {
          this.uploadImage.push({ type: file.type, src: this.defaultVideoThumbnail });
        }
      }
    }
  }
  isImage2(fileUrl: string): boolean {
    if (!fileUrl) {
      return false;
    }
    
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const fileExtension = fileUrl.split('.').pop()?.toLowerCase();
    return fileExtension ? imageExtensions.includes(fileExtension) : false;
  
   }
  submit(){
    const form = new FormData();
    form.append('Hotel_Name_id', this.hotelnameid);
    form.append('room_area', this.maintence.rooms);
    form.append('description', this.maintence.description);
    form.append('priority', this.maintence.priorityvalue);
    for (let i = 0; i < this.serviceImageFiles.length; i++) {
      const file = this.serviceImageFiles[i];
      form.append('images[]', file, file.name);
    }
    this.HotelService.maintenance_request(form).subscribe({
      next: (response) => {
       
        console.log(response)
        this.toast.success({ detail: "SUCCESS", summary: 'success', duration: 3000 });
        this.openform = false
        this.clearall()       
        this.maintenance_req()
      },
      error: (error) => {
        console.log(error);
        this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });

      }

    })

  }
  buttonclicked(buttonName:any){
    this.selectedButton = buttonName;
    console.log(buttonName)
  }
  DropDown(value:any,id:any,order:any){
    switch(value){
    
      case '0':
        order.work_status = 'Not Started'
      break;
      case '1':
        order.work_status = 'Under Process'
      break;
      case '2':
        order.work_status = 'Completed'
      break;
      case '3':
        order.work_status = 'Cancelled'
      break;
  
  
    }
  
  
    const org={
      Hotel_Name_id:this.hotelnameid,
      status:value,
      id:id
    }
   

    this.HotelService.maintenance_request_process(org).subscribe({
      next: (response) => {
        this.toast.success({ detail: "Success", summary: 'Status Updated', duration: 3000 });

      },
      error: (error) => {
        console.log(error);
        this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });

      }

    })
   
    


  }
  closeimg(){
    this.serviceimg=false
  }
  ServiceIMG(images:any) {
    this.serviceImages = images
    this.serviceimg=true
    this.currentImageIndex = 0;
   
}
isImage(url: string): boolean {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

isVideo(url: string): boolean {
  return url.match(/\.(mp4|webm|ogg)$/) != null;
}
serviceImages: any[] = [
 
];

currentImageIndex = 0; // Keep track of the current image index

// Function to display the next image
nextImage(): void {
  if (this.currentImageIndex < this.serviceImages.length - 1) {
    this.currentImageIndex++;
  } else {
    // If at the end, loop back to the first image
    this.currentImageIndex = 0;
  }
}

// Function to display the previous image
previousImage(): void {
  if (this.currentImageIndex > 0) {
    this.currentImageIndex--;
  } else {
    // If at the beginning, loop to the last image
    this.currentImageIndex = this.serviceImages.length - 1;
  }
}
togglePost(hotelid:any,id:any){
  const org={
    Hotel_Name_id:hotelid,
    id:id
  }
  this.HotelService.maintenance_requests_complete(org).subscribe({
    next: (response) => {
      this.toast.success({ detail: "SUCCESS", summary: 'success', duration: 3000 });
       this.maintenance_req()

    },
    error: (error) => {
      console.log(error);
      this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });

    }
  
  })
  
}
formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const options = { day: '2-digit', month: 'short', year: 'numeric' } as const;
  return date.toLocaleDateString('en-GB', options).replace(' ', '-').replace(',', '');
}
}
