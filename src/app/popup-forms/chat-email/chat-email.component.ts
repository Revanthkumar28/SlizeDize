import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryFlagService } from 'src/app/service/country-flag/country-flag.service';
interface countryFlag{
  name:string;
  code:any;
  dial_code:any;
  flag:any;
}

@Component({
  selector: 'b2b-chat-email',
  templateUrl: './chat-email.component.html',
  styleUrls: ['./chat-email.component.css']
})
export class ChatEmailComponent implements OnInit {
  CountryFlag:boolean=true;
  flagArr :any= {};
  constructor(private HotelService:HotelService,private AppserviceService:AppserviceService,private toast: NgToastService, private route: ActivatedRoute,private CountryFlagService:CountryFlagService) { }
  @Output() cancelpopup = new EventEmitter();
  @Input() chat_orders :any={}
   hotelid :any =''
  @Input() screen :any =''

  chat_name:any=''
  videoimg:any='assets/video_img.png'
  docimg:any ='assets/pdfimg.png'
  mobileNumber:any=''
  opened_mail_id:any=''
  openemail:boolean = false
  del_pop:boolean = false
  order_chat:any=[]
  search_chat_user=''
  search_mail_user=''
  owner_img='assets/default-profile.jpg'
  owner_name=''
  owner_email=''
  now_user_id:any=''
  mail_replay:any=''
  multiSelect_To:any=[]
  multiSelect_CC:any=[]
  showcontact_array:any = []
  showmail_array:any = []
  defaultflag:any='+91'
  openchat:boolean = false
  compose_email:boolean = false
  emailhome:boolean = true
  open_one_mail:boolean = false
  open_mail_details:boolean = false
  upload :boolean = false
  hide_one_chat:boolean = true
  open_one_chat:boolean = false
  open_contact:boolean = false
  upload_mail:boolean = false
  selectedButton:any='Chat'
  message:any = ''
  mail_message:any = ''
  opened_user_id:any=''
  subject:any=''
  show_mail:any=[]

  storemsg:any=''
  button_name: Record<string, string>[] = [
     {"name": "Chat"},
     {"name": "Email"},
  ];
  usertype:any={}
  org_user_id:any =''
  To_mail:any=''
  chat_img:any=''
  CC_mail:any=''
  send_img:any=''
  image:any= 'assets/default-profile.jpg'
show_chat:any =[
  {
    name:'Ecort',
    id : 1,
    message:'text',
    image:'assets/default-profile.jpg'
  }
]
show_cotact:any=[
  {
    name:'',
    id:1,
    type:'user',
    profile:'assets/default-profile.jpg'

  }
]
  chatArray:any = [
    {
      msg_id : 1,
      msg : 'How much is a Vagamon hotel?'
    },
    {
      msg_id : 1,
      msg : 'Angular developre'
    },
    {
      msg_id : 2,
      msg : 'Angular developer'
    },
    {
      msg_id : 1,
      msg : 'Full stack developer'
    },
    {
      msg_id : 1,
      msg : 'Full stack developer'
    },
    {
      msg_id : 2,
      msg : 'Full stack developer'
    },
    {
      msg_id : 1,
      msg : 'Full stack developer'
    }
  ]
  mail_subject:any=''
   flag:any=''
   flagFilter:any='';
   defaultCountryCode:any = '+91'

  ngOnInit(): void {
    console.log(this.screen)
    this.buttonclicked('Chat')

    this.route.paramMap.subscribe((params) => {
      let i = params.get("ids");
      if (i) this.hotelid = i
    })

    this.usertype = JSON.parse(localStorage.getItem('currentUser') || '[]')
    console.log(this.usertype.user_type)
    this.AppserviceService.user_id$.subscribe((res) =>{
      console.log(res)
      this.org_user_id = res
    })
    console.log(this.chat_orders)
    // this.chat_name = this.chat_orders.companyName || this.chat_orders.Hotel_Name
    this.all_messages()
    this.all_contact()
    this.all_mails()

    this.AppserviceService.notification_reload_data$.subscribe((notify:any) =>{
      if(notify && (notify.status == '61' )){
        this.view_chat(this.now_user_id)
        this.all_messages()
      }
      if(notify && (notify.status == '62' )){
        this.opensinglemail(this.opened_mail_id,'')
        this.all_mails()
      }
    })  
    this.flag = this.CountryFlagService.countryFlag

    window.onload = () => {
      const chatContainer = document.getElementById('chatContainer');
      
      if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
      }
  };
  

  }
  closeButton(){
    console.log('ffff')
    this.cancelpopup.emit(false);

  }
  getflag(data :any){
    console.log(data)
    this.defaultflag = data.dial_code
    this.flagArr = data;
    this.CountryFlag=false;
    this.mobileNumber='';

    console.log(this.flagArr)
  }
  buttonclicked(value:any){
    this.selectedButton = value
    if(value == 'Chat'){
      this.openchat = true
      this.openemail = false

    }else{
      this.openchat = false
      this.openemail = true

    }

  }
  sendButton(){
    if(this.message != ''){
      this.storemsg =  this.message

    }
        console.log(this.storemsg)
        this.message =''
             
        //   const obk ={
        //     Hotel_Name_id :this.hotelid,
        //     user_id:this.now_user_id,
        //    message:this.storemsg,
        //   //  order_id:this.chat_orders.id
        //  } 
         const form = new FormData();
         if(this.usertype.user_type != 'vu'){
          form.append('Hotel_Name_id', this.hotelid);

         }
         if(this.screen == 'order'){
          form.append('order_id', this.chat_orders.id);
    
        }
         form.append('user_id', this.now_user_id);
         form.append('message',this.storemsg);
         for (let i = 0; i < this.serviceImageFiles.length; i++) {
          const file = this.serviceImageFiles[i];
          form.append('image[]', file, file.name);
        }
        if(this.storemsg !='' || this.uploadImage.length > 0){
          this.HotelService.send_new_message(form).subscribe({
            next: (response) => {
              console.log(response)
              this.storemsg=''
              this.uploadImage =[]
             //  this.toast.success({ detail: "SUCCESS", summary: 'success', duration: 3000 });
              this.all_messages()
              this.upload = false
              this.view_chat(this.now_user_id)
 
 
             //  this.chatArray.push(
             //   {
             //     msg_id : 1,
             //     msg :this.storemsg != '' ? this.storemsg :'',
             //      image: '',
             //      chat_id:''
     
             //   }
             // )
             
            },
            error: (error) => {
            console.log('test error');  // Log to console for debugging
             this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
            },
          })
        }
         

        
        
  }
  chat_del_id:any=''
  delmessage(id:any){
         this.chat_del_id=''
     this.del_pop = !this.del_pop
    this.chat_del_id=id


  }
  delete_chat(id:any){
    const obk ={
       chat_id:id
    }
    this.HotelService.delete_message(obk).subscribe({
      next: (response) => {
        console.log(response)
        this.toast.success({ detail: "SUCCESS", summary: 'message deleted', duration: 3000 });
        this.del_pop = false
        this.view_chat(this.now_user_id)
       
      },
      error: (error) => {
      console.log('test error');  // Log to console for debugging
       this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
      },
    })

  }
  view_chat(id:any){
    this.now_user_id =''
    this.now_user_id = id
      let obk={}
    if(this.screen == 'owner'){
       obk ={
        user_id:id,
     } 
    }else{
       obk ={
        user_id:id,
        order_id:this.chat_orders.id

     } 
    }
     
     this.HotelService.view_new_message(obk).subscribe({
       next: (response) => {
        this.chatArray =[]
         console.log(response.message)
         this.order_chat = response.message
         this.arrange_chat(response.message)
        
       },
       error: (error) => {
       console.log('test error');  // Log to console for debugging
         // this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
       },
     })
    

  }
  all_messages(){
    this.show_chat=[]
    if(this.screen == 'owner'){
      this.HotelService.all_message().subscribe({
        next: (response) => {
          console.log(response)
          const allmessage = response.message.reverse()
          allmessage.forEach((org:any)=>{
            org.usertype = org.user_type == 'vu'? 'Vendor':'User'
            console.log(org.usertype)
           this.show_chat.push(
             {
               name:(org.user_type == 'vu'? org.vendor_name:  org.name)+'-'+org.usertype ,
               id:org.id,
               message:org.message,
               image:org.profile_photo_path != null ?org.profile_photo_path :this.image
             }
           )
             
           
           console.log(this.show_chat)
          })
         
        },
        error: (error) => {
        console.log('test error');  // Log to console for debugging
          // this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
        },
      })
   
    }else{
      const olx ={
        order_id: this.chat_orders.id
      }
      this.HotelService.all_message_on_order(olx).subscribe({
        next: (response) => {
          console.log(response)
          response.message.forEach((org:any)=>{
            org.usertype = org.user_type == 'vu'? 'Vendor':'User'

           this.show_chat.push(
             {
              name:(org.user_type == 'vu'? org.vendor_name:  org.name)+'-'+org.usertype,
              id:org.id,
               message:org.message,
               image:org.profile_photo_path != null ?org.profile_photo_path :this.image
             }
           )
             
           
           console.log(this.show_chat)
          })
         
        },
        error: (error) => {
        console.log('test error');  // Log to console for debugging
        },
      })
   

    }
   
  }
  all_mails(){
    this.show_mail=[]
    if(this.screen == 'owner'){
      this.HotelService.all_mail().subscribe({
        next: (response) => {
          console.log(response)
          const chat = response.message.reverse()
          chat.forEach((org:any)=>{
           this.show_mail.push(
             {
               name:org.sender_name,
               id:org.id,
               message:org.subject
             }
           )
             
           
           console.log(this.show_mail)
          })
         
        },
        error: (error) => {
        console.log('test error');  // Log to console for debugging
          // this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
        },
      })
  

    }else{
      const all = {
        order_id : this.chat_orders.id
      }
      this.HotelService.all_mail_on_order(all).subscribe({
        next: (response) => {
          console.log(response)
          response.message.forEach((org:any)=>{
           this.show_mail.push(
             {
               name:org.sender_name,
               id:org.id,
               message:org.subject
             }
           )
             
           
           console.log(this.show_mail)
          })
         
        },
        error: (error) => {
        console.log('test error');  // Log to console for debugging
          // this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
        },
      })
  

    }
   
  }
  search_contact(number:any){
    const obk ={
      mobileNumber:this.flagArr.dial_code!= undefined ? this.flagArr.dial_code:this.defaultflag + number
       } 
   this.HotelService.search_for_contacts(obk).subscribe({
     next: (response) => {
       console.log(response.message)
       this.toast.success({ detail: "SUCCESS", summary: 'success', duration: 3000 });
       this.mobileNumber =''
       this.all_contact()

      
     },
     error: (error) => {
     console.log('test error');  // Log to console for debugging
       this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
     },
   })
  


  }
  all_contact(){
    
    if(this.usertype.user_type == 'vu'){
      const org={
        Hotel_Name_id :'hhh'
       }
       this.HotelService.User_contacts_detalis_vendor(org).subscribe({
        next: (response) => {
          this.show_cotact=[]
          this.succes_conact(response)

        },
        error: (error) => {
          console.log('test error');  // Log to console for debugging
            // this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
          },
          
        })

    }else{
    const org={
      Hotel_Name_id :this.hotelid
     }
     this.HotelService.User_contacts_detalis(org).subscribe({
      next: (response) => {
        this.show_cotact=[]
        this.succes_conact(response)

      },
      error: (error) => {
        console.log('test error');  // Log to console for debugging
          // this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
        },
        
      })
      }
    }
  succes_conact(contact:any){ 
    this.show_cotact=[]   
   let  hotelvendor:any = []
    if(contact.hotel_vendors){
      hotelvendor = this.removeDuplicatesByProperty(contact.hotel_vendors,'new_id')
      hotelvendor.forEach((ord:any)=>{
        ord.user_name = ord.vendor_name !=null ? ord.vendor_name : ''
        ord.type = 'vendor'
        ord.id  = ord.new_id

      })
    }
  if(contact.hotel_users){
    contact.hotel_users.forEach((ord:any)=>{
      ord.type = 'user'
      ord.id  = ord.add_to

    })
  }
     if(contact.current_user){
      contact.current_user.forEach((ord:any)=>{
          this.owner_name = ord.name
          this.owner_email = ord.new_mail
          this.owner_img = ord.profile_photo_path !=null ? ord.profile_photo_path : this.image

      })
     }
     if(contact.contact_details){
      contact.contact_details.forEach((ord:any)=>{
        ord.user_name = ord.contact_name
        ord.id = ord.chart_user_id
        ord.type = ord.user_type == 'vu'? 'vendor':'user'

      })
     }
     
           this.showcontact_array=[]
           this.showcontact_array = this.showcontact_array.concat(contact.hotel_users ? contact.hotel_users:[] ,this.usertype.user_type == 'vu' ? []:hotelvendor,contact.contact_details)
          console.log(this.showcontact_array)
           this.showcontact_array.forEach((abc:any)=>{
            this.show_cotact.push(
              {
                name:abc.user_name,
                id:this.usertype.user_type == 'vu' ? abc.chart_user_id:abc.id,
                type:abc.type,
                profile:abc.profile_photo_path != null ? abc.profile_photo_path :this.image
              }
            )

           })
         
          }
       
      
    
    
   

  
  arrange_chat(orders:any){
    
    orders.forEach((org:any)=>{
       if(org.send_id == this.org_user_id){
         org.msg_id = 1
       }else{
        org.msg_id = 2
       }
   
        this.chatArray.push(
          {
            msg_id : org.msg_id,
            msg : org.message,
            image: org.image,
            chat_id :org.id

          }
        )
    

    })
    console.log(orders)
    console.log(this.chatArray)

  }
  addButton(type:any){

   if(type == 'chat'){
    this.upload =!this.upload

   }else{
    this.upload_mail = !this.upload_mail
   }

  }
  addcontacts(){
     this.open_contact = true
     this.open_one_chat = false
     this.hide_one_chat = false

      }
  opensinglechat(id:any,name:any,img:any){
    this.chat_name = name
    this.chat_img = img !=null ? img:this.image
    console.log(id)
    this.open_one_chat = true
    this.hide_one_chat = false
    this.open_contact = false
    this.chatArray =[]
    this.view_chat(id)

  }
  backButton(value:any){
   switch(value){
    case 'chat':
      this.open_one_chat = false
      this.hide_one_chat = true
      this.open_contact = false
     break;
    case 'contact':
      this.open_contact = false
      this.hide_one_chat = true
    break;
    case 'email':
      this.compose_email = false
      this.emailhome = true

    break;    
    case 'single_mail':
      this.open_one_mail = false
      this.emailhome = true

   }
      

   
    
  }
  file_1 :any = []
  productImage:any = []
  uploadImage:any = []
  uploadImage_compose:any = []
  uploadImage_replay:any = []

  serviceImageFiles:any = []

  serviceRequestImage(event: any,type:any) {
    switch(type){
      case 'chat':
        this.uploadImage =[]
        if (event.target.files) {
          const files = event.target.files;
          this.serviceImageFiles = files;
        
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(file.type)
            if (file.type.startsWith('image')) {
              const reader = new FileReader();
              reader.onload = ((fileIndex, fileType) => (event: any) => {
                this.uploadImage.push({ type: fileType, src: event.target.result });
              })(i, file.type);
              reader.readAsDataURL(file);
            } else if (file.type.startsWith('video')) {
              this.uploadImage.push({ type: file.type, src: this.videoimg });
            }else if (file.type.startsWith('application')){
              this.uploadImage.push({ type: file.type, src: this.docimg });
    
            }
          }
          console.log(this.serviceImageFiles)
        }

      break;  
      case 'compose':
        this.uploadImage_compose =[]
        if (event.target.files) {
          const files = event.target.files;
          this.serviceImageFiles = files;
        
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(file.type)
            if (file.type.startsWith('image')) {
              const reader = new FileReader();
              reader.onload = ((fileIndex, fileType) => (event: any) => {
                this.uploadImage_compose.push({ type: fileType, src: event.target.result });
              })(i, file.type);
              reader.readAsDataURL(file);
            } else if (file.type.startsWith('video')) {
              this.uploadImage_compose.push({ type: file.type, src: this.videoimg });
            }else if (file.type.startsWith('application')){
              this.uploadImage_compose.push({ type: file.type, src: this.docimg });
    
            }
          }
          console.log(this.serviceImageFiles)
        }
      break;
      case 'replay':
         this.uploadImage_replay =[]
         if (event.target.files) {
          const files = event.target.files;
          this.serviceImageFiles = files;
        
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(file.type)
            if (file.type.startsWith('image')) {
              const reader = new FileReader();
              reader.onload = ((fileIndex, fileType) => (event: any) => {
                this.uploadImage_replay.push({ type: fileType, src: event.target.result });
              })(i, file.type);
              reader.readAsDataURL(file);
            } else if (file.type.startsWith('video')) {
              this.uploadImage_replay.push({ type: file.type, src: this.videoimg });
            }else if (file.type.startsWith('application')){
              this.uploadImage_replay.push({ type: file.type, src: this.docimg });
    
            }
          }
          console.log(this.serviceImageFiles)
        }
      break;    
    }
  
  }
  // serviceRequestImage_pic(event: any ) {
  //   this.send_img=''
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     const reader = new FileReader();
      
  //     reader.onload = (e) => {
  //       const fileoeg = e.target?.result 
  //       const fileExtension = file.name.split('.').pop()?.toLowerCase();
  //       console.log('File Extension:', fileExtension ? `.${fileExtension}` : 'Unknown');
  //       this.send_img = fileoeg + (fileExtension ? `.${fileExtension}` : 'Unknown')
  //       console.log(this.send_img)

  //     };
      
  //     reader.readAsDataURL(file);
  //     }
  //   console.log(event)
  //   this.file_1 = event.target.files;

  //   // SELECTED IMAGE SHOW
  //   if (event.target.files) {
  //     // Iterate through the selected files
  //     for (let i = 0; i < event.target.files.length; i++) {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(event.target.files[i]);
  
  //       // Closure to capture the current file
  //       reader.onload = ((fileIndex) => (event: any) => {
  //         // Update the imageList array with the base64 data of the image
  //         this.productImage[fileIndex].product_image = event.target.result;
  //       })(i);

  //     }

  //   }

  // }
  isImage2(fileUrl: string) {
    if (!fileUrl) {
      return null;
  }

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'];
  const fileExtension = fileUrl.split('.').pop()?.toLowerCase();

  if (!fileExtension) {
      return null;
  }

  if (imageExtensions.includes(fileExtension)) {
      return 'image';
  }

  if (videoExtensions.includes(fileExtension)) {
      return 'video';
  }

  return 'pdf';
   }
   openpdf(file:any){
    window.open(file) 


   }
  //email
  Menu(){

  }
  composemail(){
    this.compose_email = true
    this.emailhome = false
  }
  attachment(){

  }
  sendmail(type:any){
    console.log(type)
    const form = new FormData();
    if(this.usertype.user_type != 'vu'){
      form.append('Hotel_Name_id', this.hotelid);

    }
    if(this.screen == 'order'){
      form.append('order_id', this.chat_orders.id);

    }
  
    for (let i = 0; i < this.serviceImageFiles.length; i++) {
     const file = this.serviceImageFiles[i];
     form.append('image[]', file, file.name);
   }
   let toarray:any =[]
   let ccarray:any=[]
    switch(type){
      case 'compose':

        console.log(this.storemsg)
      

        this.multiSelect_To.forEach((org:any)=>{
          toarray.push(org.id)
        })
        this.multiSelect_CC.forEach((org:any)=>{
          ccarray.push(org.id)
        })
        console.log(toarray)
        console.log(ccarray)
        const string_toarray = JSON.stringify(toarray);
        const string_ccarray = JSON.stringify(ccarray);

        form.append('user_id', string_toarray);
        form.append('message',this.mail_message);
        form.append('subject',this.subject);
        form.append('cc',string_ccarray);
        console.log(form)

      break;  
      case 'replay':
        console.log(this.showmail_array)
        let arrayof:any=[]
        let arraycc:any=[]
        const lastElement = this.showmail_array;
        console.log(lastElement)
        const to_idss:any = JSON.parse(lastElement[0].received_id) as string[];
        const sendid:any = lastElement[0].send_id
        const to_ccc:any = JSON.parse(lastElement[0].cc) as string[];

        if(to_ccc == this.org_user_id ){
          arrayof = to_idss
        }else{
          arrayof = Array.of(to_idss,sendid)
          arrayof = arrayof.flat(2)
        }

        console.log(to_ccc)
       if(to_ccc == this.org_user_id ){
        arraycc = Array.of(to_ccc,sendid)
        arraycc = arraycc.flat(2)
       
        console.log(arraycc)
       }else{
        arraycc = to_ccc
       }
         console.log(this.org_user_id)
        const filterarray_to =arrayof.filter((name:any)=>name != this.org_user_id)
        const filterarray_cc =arraycc.filter((name:any)=>name != this.org_user_id)

        console.log(filterarray_to)
        console.log(filterarray_cc)

        const chat_id = this.showmail_array[0].id
       
        const subject = this.showmail_array[0].subject
        const string_toarray2 = JSON.stringify(filterarray_to);
        const string_ccarray2 = JSON.stringify(filterarray_cc);
        console.log(string_toarray2)
        console.log(string_ccarray2)

        form.append('replay',chat_id);
        form.append('user_id', string_toarray2);
        form.append('message',this.mail_replay);
        form.append('subject',subject);
        form.append('cc',string_ccarray2);
        console.log(form)

      break;  

    }
  
    console.log(form)

     this.HotelService.send_new_mail(form).subscribe({
       next: (response) => {
         console.log(response)
         this.toast.success({ detail: "SUCCESS", summary: 'success', duration: 3000 });
         this.all_mails()
         if(type =='compose' ){
          toarray=[]
          ccarray =[]
          this.mail_message =''
          this.uploadImage_compose =[]

          this.compose_email = false
          this.emailhome = true
         }else{

          this.opensinglemail(this.opened_mail_id,'')
          this.mail_replay=''
          this.upload_mail = false

         }

       },
       error: (error) => {
       console.log('test error');  // Log to console for debugging
         this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
       },
     })


  }
  viewsinglemail(id:any){
    this.showmail_array =[]
    this.opened_mail_id = ''

    this.opened_mail_id = id
    this.open_one_mail = true
    this.emailhome = false

    this.opensinglemail(id,'')
  }
  opensinglemail(id:any,name:any){
    let obk:any;
    if(this.screen == 'owner'){
       obk={
        mail_id : id
  
      }
    }else{
      obk={
        mail_id : id,
        order_id:this.chat_orders.id
      }
    }
  
    this.HotelService.view_mail(obk).subscribe({
      next: (response) => {
        this.showmail_array =[]

        console.log(response)
        let messagearray:any = []
        messagearray.push(response.message)
        this.mail_subject = response.message.subject
        response.find_user_cc.forEach((ong:any)=>{
          if(ong.user_type == 'vu'){
            ong.name = ong.companyName
          }        })
        response.find_user_from.forEach((ong:any)=>{
          if(ong.user_type == 'vu'){
            ong.name = ong.companyName
          }        })
        response.find_user_to.forEach((ong:any)=>{
          if(ong.user_type == 'vu'){
            ong.name = ong.companyName
          }
        })
        // response.replay.forEach((ong:any)=>{
        //   ong.find_mail = 'replay'
        // })
        //  messagearray.forEach((ong:any)=>{
        //   ong.find_mail = 'mesg'
        // })
        let all_mail_users:any =[]
        all_mail_users = all_mail_users.concat(response.find_user_cc,response.find_user_from,response.find_user_to)
        console.log(all_mail_users)
        this.showmail_array = this.showmail_array.concat(messagearray,response.replay)
        console.log(this.showmail_array)
        //new try
        this.showmail_array.forEach((message:any )=> {

          message.dropdown = false
          // Parse the string into an array of IDs
            const ids = JSON.parse(message.received_id) as number[];

            const cc_ids = JSON.parse(message.cc) as number[];
          

        console.log(cc_ids)
          // Map the IDs to the corresponding names
          
          message.to_name = ids.map(id => {
            const nameObj = all_mail_users.find((user: any) => user.id === id);
            if (nameObj) {
              return { name: nameObj.name, email: nameObj.new_mail };
            } else {
              return { name: '', email: '' }; // handle case where ID does not match
            }
          });
          
          
          if(cc_ids != null){
            message.cc_name = cc_ids.map(id => {
              const nameObj = all_mail_users.find((user: any) => user.id === id);
              if (nameObj ) {
                return { name: nameObj.name, email: nameObj.new_mail };
              } else {
                return { name: '', email: '' }; // handle case where ID does not match
              }
            });
          }else{
            message.cc_name =[]
          }
         
            
         
         
        });
        
        console.log(this.showmail_array);
        //new end
        all_mail_users.forEach((org:any)=>{
          this.showmail_array.forEach((all:any)=>{

            if( all.send_id == org.id  ){
                all.send_name = org.name,
                all.send_email =org.new_mail
              }
          
          })
         })
       
        console.log(this.showmail_array)
      },
      error: (error) => {
      console.log('test error');  // Log to console for debugging
       // this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
      },
    })
 }
 getInput_mail(email:any,id:any,type:any){
  console.log(id)
    if(type == 'To'){
      this.To_mail = email
      this.multiSelect_To.push({
        name : email,
        id :id
      })

    }else{
      this.CC_mail = email
      this.multiSelect_CC.push({
        name : email,
        id : id
      })

    }
    

 }
 open_mail_cc(){
  this.open_mail_details = !this.open_mail_details

 }
 delete_mail(id:any){
  const obk ={
    mail_id:id
  }
  this.HotelService.delete_mail(obk).subscribe({
    next: (response) => {
      console.log(response)
      this.toast.success({ detail: "SUCCESS", summary: 'message deleted', duration: 3000 });
      this.del_pop = false
      this.opensinglemail(this.opened_mail_id,'')
      this.all_mails()

     
    },
    error: (error) => {
    console.log('test error');  // Log to console for debugging
     this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
    },
  })

}
removeDuplicatesByProperty(arr: any[], prop: string): any[] {
  const uniqueValues = new Set();
  return arr.filter(item => {
    const value = item[prop];
    if (!uniqueValues.has(value)) {
      uniqueValues.add(value);
      return true;
    }
    return false;
  });
}
}
