import { Component, OnInit ,Output,EventEmitter } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { RegistrationDetails, validationResults, Country, State, City ,postIndustri } from 'src/app/models/interfaces';
import { CountryStateCityService } from 'src/app/service/country-state-city/country-state-city.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';


@Component({
  selector: 'b2b-investment-admin',
  templateUrl: './investment-admin.component.html',
  styleUrls: ['./investment-admin.component.css']
})
export class InvestmentAdminComponent implements OnInit {
  adminPage:boolean = true
  @Output() close_jobs = new EventEmitter();
  @Output() refresh_data = new EventEmitter();
  openpopup:boolean = false
  share_data:any ={}
  image_array:any=[]
  video_array:any=[]
  doc_array:any=[]
  send_image_array:any=[]
  send_video_array:any=[]
  send_doc_array:any=[]

  send_type:any =''
  propertylisting:any=[]
  image:any=[]
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
  constructor(private HotelService:HotelService, private toast: NgToastService, private CountryStateCityService: CountryStateCityService,private AppserviceService:AppserviceService) { }
  filterData: any = '';
  country:any=''
  edit_form:boolean = false
  edit_id:any =''
  multiSelectBrand :any = []
  uploadfile:any=[]
  sale_rent:any=['For Sale','For Rent']
  alertpopup:boolean = false
  delete_id:any = ''
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

  ngOnInit(): void {
    this.fetchCountry()
    this.getdata()
   

     
      
    
  }
  getdata(){
    this.HotelService.user_view_investment().subscribe((data :any) =>{  
      console.log(data)
      this.propertylisting = data.investment_list
      console.log(this.propertylisting)
      this.propertylisting.forEach((org:any)=>{
        org.images=[]
        org.videos =[]
        org.document =[]
        org.files.forEach((arr:any)=>{
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
              thumb:'assets/video.png'

            })

          }
          if(arr.type == 'document'){
            org.document.push({
              id:arr.id,
              file:arr.file
            })
          }
         

        })
       

      })
      console.log(this.propertylisting)
    })
  }
  addjobs(){
    this.openpopup = true

  }
  closeJobs(){
    this.close_jobs.emit('')
  
  }
  addlisting(){
    this.openpopup = true
    this.edit_form = false
  }
  closepopup(){
    this.openpopup = false

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
      const file = event.target.files;
      this.uploadfile = file;
    }
  }
  uploadphotos(event:any){
    this.uploadimage = []
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files;
      this.uploadimage = file;
    }
  }
  uploadvideos(event:any){
    this.uploadvideo = []
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files;
      this.uploadvideo = file;
    }
  }
  ADD_listing(){

    console.log(this.get_job_data)
    console.log(this.uploadimage)
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
    form.append('sale_type', this.get_job_data.for_sale);

    form.append('lot_size', this.get_job_data.lot_size);
    form.append('parking_type', this.get_job_data.parking_type);
    form.append('subheading', this.get_job_data.sub_header);
    form.append('marketing_description', this.get_job_data.marketing_descrip);
  
    form.append('investment_highlights', this.get_job_data.inves_highlight);
    // form.append('photos', this.get_job_data.add_image);
    // form.append('videos', this.get_job_data.add_video);
    // form.append('document', this.get_job_data.document);
    for (let i = 0; i < this.uploadimage.length; i++) {
      const file = this.uploadimage[i];
      form.append('photos[]', file, file.name);
    }
    for (let i = 0; i < this.uploadvideo.length; i++) {
      const file = this.uploadvideo[i];
      form.append('videos[]', file, file.name);
    }
    for (let i = 0; i < this.uploadfile.length; i++) {
      const file = this.uploadfile[i];
      form.append('document[]', file, file.name);
    }

   
      console.log(this.get_job_data);
   if(!this.edit_form){
    this.HotelService.add_investment(form).subscribe({
      next: (response:any) => {
                
        this.toast.success({ detail: "SUCCESS", summary: 'Update Successfully', duration: 3000 });
        this.Empty_field()
        this.getdata()
        this.refresh_data.emit('')
        this.closepopup()
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
   }else{
    form.append('id', this.edit_id);
    if(this.send_image_array.length > 0) form.append('delete_photos[]', this.send_image_array);
    if(this.send_video_array.length > 0)form.append('delete_videos[]', this.send_video_array);
    if(this.send_doc_array.length > 0)form.append('delete_document[]', this.send_doc_array);

 this.HotelService.edit_investment (form).subscribe({
      next: (response:any) => {
                
        this.toast.success({ detail: "SUCCESS", summary: 'Update Successfully', duration: 3000 });
        this.Empty_field()
        this.getdata()
        this.refresh_data.emit('')

        this.closepopup()
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
     
    
}

getInput(data:any){
        this.get_job_data.for_sale = data
        console.log(this.get_job_data.for_sale);

    }

    Empty_field(){
      this.get_job_data.propertyname = '',
      this.get_job_data.keys = '',
      this.get_job_data.address = '',
      this.get_job_data.beds = '',
      this.get_job_data.country = '',
      this.get_job_data.yearsbuild = '',
      this.get_job_data.state = '',
      this.get_job_data.yearsrenovated = '',
      this.get_job_data.city = '',
      this.get_job_data.buildings = '',
      this.get_job_data. askingprice = '',
      this.get_job_data.stories = '',
      this.get_job_data.expiration_date = '',
      this.get_job_data.lot_size = '',
      this.get_job_data.send_me_reminder = '',
      this.get_job_data.parking_type = '',
      this.get_job_data.square_feet = '',
      this.get_job_data.sub_header = '',
      this.get_job_data.marketing_descrip = '',
      this.get_job_data.inves_highlight = '',
      this.get_job_data.for_sale = ''
      this.currency = ''
    }

    View(data:any,type:any = 'admin'){
      this.adminPage = false
         console.log(data)
         this.share_data = data
         this.send_type = type
    }
    close_view(){
      this.adminPage = true

    }
    Edit(data:any){
      this.image_array =[]
      this.video_array =[]
      this.doc_array =[]
      console.log(data)
       this.edit_form = true
       this.get_job_data.propertyname = data.property_name,
       this.get_job_data.keys = data.keys,
       this.get_job_data.address = data.address,
       this.get_job_data.beds = data.beds,
       this.get_job_data.country = data.country,
       this.get_job_data.yearsbuild = data.years_build,
       this.get_job_data.state = data.state,
       this.get_job_data.yearsrenovated = data.yours_renovated,
       this.get_job_data.city = data.city,
       this.get_job_data.buildings = data.buildings,
       this.get_job_data. askingprice = data.asking_price,
       this.get_job_data.stories = data.stories,
       this.get_job_data.expiration_date = data.experation_date,
       this.get_job_data.lot_size = data.lot_size,
       this.get_job_data.send_me_reminder = data.send_me_remainder,
       this.get_job_data.parking_type = data.parking_type,
       this.get_job_data.square_feet = data.square_feet,
       this.get_job_data.sub_header = data.subheading,
       this.get_job_data.marketing_descrip = data.marketing_description,
       this.get_job_data.inves_highlight = data.investment_highlights,
       this.get_job_data.for_sale = data.sale_type
       this.edit_id = data.id
       this.image_array = [...data.images]
       this.video_array =[...data.videos]
       this.doc_array =[...data.document]

       this.openpopup = true
       this.send_image_array =[]
       this.send_video_array =[]
       this.send_doc_array =[]

    }
    alertJobs(id:any){
      this.alertpopup = true
      this.delete_id = id
    
    
    
    }
    Delete(){
      const obj ={
        id:this.delete_id
      }
      this.HotelService.delete_investment(obj).subscribe({
        next:(res:any)=>{
    
          this.toast.success({ detail: "SUCCESS", summary: 'successfully deleted', duration: 3000 });
          this.propertylisting = this.propertylisting.filter((ids:any) => ids.id != this.delete_id)
          this.alertpopup = false
          this.delete_id  =''
          // this.view_jobs.emit('')
          this.refresh_data.emit('')

          // this.alertpopup = false
        },
        error:(err:any)=>{
          this.toast.error({ detail: "ERROR", summary: 'Unable to delete', duration: 3000 });
        }
      })

    }
    RemoveItems(type:any,id:any){
      if(type == 'images'){
        console.log(id)
       
        this.send_image_array .push(this.image_array.filter((arr: any)=> arr.id == id)[0].id)
        console.log(this.send_image_array)
        this.image_array = this.image_array.filter((arr: any)=> arr.id != id)
        console.log(this.image_array)

      }
      else if(type == 'videos'){
        console.log(id)
       
        this.send_video_array.push(this.video_array.filter((arr: any)=> arr.id == id)[0].id)
        console.log(this.send_video_array)
        this.video_array = this.video_array.filter((arr: any)=> arr.id != id)
        console.log(this.video_array)

      }else{
        this.send_doc_array.push(this.doc_array.filter((arr: any)=> arr.id == id)[0].id)
        this.doc_array = this.doc_array.filter((arr: any)=> arr.id != id)

      }
    }
    Openfile(file:any){
      window.open(file)
    }


    editorConfig = {
      base_url:'/tinymce',
      suffix:'.min',
      plugins:'lists link image workcount',
      height:200,
      statusbar:false,
      menubar:false
    }
    
 
}
