import { Component, OnInit,Output,EventEmitter, Input,ViewChild  } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { NgToastService } from 'ng-angular-popup';

import interactionPlugin from '@fullcalendar/interaction';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';

import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';



@Component({
  selector: 'b2b-pending-payment',
  templateUrl: './pending-payment.component.html',
  styleUrls: ['./pending-payment.component.css']
})
export class PendingPaymentComponent implements OnInit {
  @Output() cancelPopup = new EventEmitter();
   eventClicked = new EventEmitter<any>(); // Emitting clicked event data
   @ViewChild('calendar') calendarComponent: any; // Reference to the FullCalendar component

  @Input() Hotel_id =""
  loopprice:any=[]
  productfiler:any=[]
  selected_items:any=[]
  vendors:any=[]
  purchase_order:any=[]
  filerproduct:boolean = true
  Date:any=''
  total_cost:any=''
  details:boolean=false
  choice:boolean = false
  pendingorders:any={}
  paymentdate:any={}
  modifiedArray:any=''
  week_one_total:any=''
  week_two_total:any=''
  week_three_total:any=''
  week_four_total:any=''
  week_five_total:any=''
  week_six_total:any=''
  openfilter:boolean = false
  weeklytotal_array:any=[]
  selectedButton:any=''
  monthlyTotal: number = 0; // Variable to store monthly total
  currentMonthName: number=0
  currentYear: number=0
  currentMonthDates: Date[] = [];
  finalarray:any=[]
  events:any=[
    
  ]
  buttons: Record<string, any>[] = [
    {
        id:1,
      "name": "VENDOR",
       dropdown:[],
    }, 
    {
      id:2,
     "name": "Purchase Order Number",
     dropdown:[],
  }, 
    ]
    weelytotal:any=[
      {id:1,amount:''},
      {id:2,amount:''},
      {id:3,amount:''},
      {id:4,amount:''},
      {id:5,amount:''},
      {id:6,amount:''},
    ]
    price_symbol:any=''
  constructor(private HotelService:HotelService,private AppserviceService: AppserviceService,private toast: NgToastService,private authService: AuthServiceService) { }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,interactionPlugin],
    customButtons: {
      next: {
          click: this.nextMonth.bind(this),
      },
      prev: {
          click: this.prevMonth.bind(this),
      },
     
  },
    headerToolbar:{
        left:'today',
        center:'title',
        right:'prevYear,prev,next,nextYear'
    },
   
  
    events:this.events,

    eventClick: this.handleEventClick.bind(this), // bind eventClick callback
    dateClick: (arg) => this.handleDateClick(arg),
    eventDidMount: this.handleEventDidMount.bind(this),
    datesSet: this.generateWeeks.bind(this),

   

  };
  isLoggedIn:boolean = false
  ngOnInit(): void {
    this.isLoggedIn = this.authService.login();
    if(!this.isLoggedIn){
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      console.log(formattedDate); // Output: "2024-12-31"

 
    const obj ={
     id_user : localStorage.getItem('u_id'),
    }
     this.HotelService.demo_product_all(obj).subscribe((res) => {
          let pendingord = res.product.filter((org:any)=>org.status == 8)
          pendingord.forEach((org:any)=>{
            org.ischecked = 'false'
            org.last_day_for_payment = formattedDate
            org.total_cost = '200'
          })
          this.updateEvent(pendingord)
          this.vendors = this.removeDuplicatesByProperty(pendingord,'vendor_id')
          console.log(this.vendors)
          this.purchase_order = this.removeDuplicatesByProperty(pendingord,'rfq_id')
          this.buttons.forEach((element:any)=>{
           if(element.id == 1){
             element.filter= this.vendors
             element.dropdown = pendingord
             element.dropdown.forEach((order:any)=>{
               order.ischecked = false
             })
            
           }
         })
         //po filer
         this.buttons.forEach((element:any)=>{
           if(element.id == 2){
             element.filter= this.purchase_order
             element.dropdown_all = pendingord
             element.dropdown = pendingord
             element.dropdown.forEach((order:any)=>{
               order.ischecked = false
             })
            
           }
         })
     })
    }else{
      this.pendingpay()
      this.AppserviceService.country_price_symbol$.subscribe((symbol:any) =>{
        this.price_symbol = symbol
        console.log(this.price_symbol)
      })
    }
     
    
   
  }
  
  
   
 
  ngAfterViewInit() {
    const eventElements = document.querySelectorAll('.fc-event');
    eventElements.forEach((element: any) => {
      element.style.cursor = 'pointer';
    });
    // this.pendingpay()

  }
  weeks:any;
 
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }


  cancel_popup(){
    this.cancelPopup.emit(false)

  }
  currentmonth(){
    const calendarApi = this.calendarComponent.getApi()
    if (calendarApi) {
      const currentDate = calendarApi.getDate();
      console.log("Current Month:", currentDate.getMonth() + 1);
      console.log("Current Year:", currentDate.getFullYear());
       this.currentMonthName = currentDate.getMonth() + 1
      console.log(this.currentMonthName)
      this.currentYear = currentDate.getFullYear()
       this.generateCurrentMonthDates(currentDate);
       this.generateWeeklyTotals2(this.weeklytotal_array)

    }
  }
  nextMonth() {
    console.warn('nextMonth');
   const calendarApi= this.calendarComponent.getApi()
   console.log(calendarApi)
    if (calendarApi) {
      calendarApi.next();
      const currentDate = calendarApi.getDate();
      console.log("Current Month:", currentDate.getMonth() + 1);
      console.log("Current Year:", currentDate.getFullYear());
       this.currentMonthName = currentDate.getMonth() + 1
      this.currentYear = currentDate.getFullYear()
       this.generateCurrentMonthDates(currentDate)
       this.generateWeeklyTotals2(this.weeklytotal_array)

      // You can also get other information like year, day, etc. from currentDate
    }

}
prevMonth() {
  console.warn('prevMonth');

  const calendarApi = this.calendarComponent.getApi();
  if (calendarApi) {
    calendarApi.prev();
    const currentDate = calendarApi.getDate();
    console.log("Current Month:", currentDate.getMonth() + 1);
    console.log("Current Year:", currentDate.getFullYear());
     this.currentMonthName = currentDate.getMonth() + 1
    this.currentYear = currentDate.getFullYear()
     this.generateCurrentMonthDates(currentDate)
      this.generateWeeklyTotals2(this.weeklytotal_array)

    // You can also get other information like year, day, etc. from currentDate
  }
}
generateCurrentMonthDates(currentDate: Date) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  // this.currentMonthName  = currentDate.getMonth() + 1
  const firstDayOfMonth = new Date(year, month, 1); // Get first day of the month
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate(); // Get last day of the month

  this.currentMonthDates = [];
  for (let day = 1; day <= lastDayOfMonth; day++) {
    const date = new Date(year, month, day);
    const formattedDate:any = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`; // Format date as YYYY-MM-DD
    this.currentMonthDates.push(formattedDate);
  }

  console.log("Current Month Dates:", this.currentMonthDates);
  this.finalarray = []
  console.log(this.events)
  this.events.forEach((element:any)=>{
    this.currentMonthDates.forEach((env:any)=>{
      if(element.date == env){
        this.finalarray.push(element.title)
      }
    })
  })
    console.log(this.finalarray)
    let filternum:any = 0
    this.modifiedArray = 0
    this.finalarray.forEach((ord:any)=>{
      const arr = ord.replace(this.price_symbol, '')
      let num:any = parseFloat(arr)
      // const total += num
      filternum += num;
      this.modifiedArray = filternum.toFixed(2)
    })

    console.log(this.modifiedArray)

}

generateWeeks() {
  const calendarApi = this.calendarComponent.getApi();
  const startOfWeek = new Date(calendarApi.view.activeStart); // Start of the current view
  const endOfWeek = new Date(calendarApi.view.activeEnd); // End of the current view
  const currentDate2 = calendarApi.getDate();
  // this.currentMonthName = currentDate2.getMonth() + 1
  // console.log(this.currentMonthName)

  const weeks: any[] = [];

  while (startOfWeek <= endOfWeek) {
    const week: string[] = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);

      week.push(this.formatDate(currentDate));
    }

    weeks.push(week);
    startOfWeek.setDate(startOfWeek.getDate() + 7);
  }

  this.weeks = weeks.map((week, index) => ({ [`week${index + 1}`]: week }));

  console.log(this.weeks);
  const transformedObject = this.weeks.reduce((acc:any, weekObj:any) => {
    return { ...acc, ...weekObj };
  }, {});
  console.log(transformedObject)
  this.weeklytotal_array = transformedObject
  // this.generateWeeklyTotals2(transformedObject)

}
generateWeeklyTotals2(currentDate: any) {
 let weeklyTotals: any = {};

  weeklyTotals = currentDate
  // const year = currentDate.getFullYear();
  // const month = currentDate.getMonth();
  // let monthof:any= currentDate.getMonth() + 1
  // const firstDayOfMonth = new Date(year, month, 1); // Get first day of the month
  // const lastDayOfMonth = new Date(year, month + 1, 0).getDate(); // Get last day of the month

  // let weekCounter = 1;
  // const weeklyTotals: any = {};

  // let currentWeek: Date[] = [];
  // let currentDay = firstDayOfMonth;
  // console.log(firstDayOfMonth.getDay()-1)

  // // Determine the starting day of the first week dynamically
  // const startOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
  // console.log(startOfWeek)

  // // Push dates for the first week
  // for (let i = 1; i <= startOfWeek; i++) {
  //   const day = i - startOfWeek;
  //   currentWeek.push(new Date(year, month, day));
  // }
  //   console.log(currentWeek)
  // // Push remaining dates for the month
  // for (let day = 1; day <= lastDayOfMonth; day++) {
  //   currentWeek.push(new Date(year, month, day));
  //    console.log(lastDayOfMonth)
  //   // If it's the last day of the week or the last day of the month, push the current week to weeklyTotals
  //   if (currentWeek.length === 7 || day === lastDayOfMonth) {
  //     console.log('working')
  //     weeklyTotals[`week${weekCounter}`] = currentWeek.map(date => {
  //       const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + (date.getDate()-1)).slice(-2)}`;
  //       return formattedDate;
  //     });     
  //     weekCounter++;
  //     currentWeek = [];
  //   }
  // }
  // console.log(currentWeek)

  // // Manually update the last week with the actual last date of the month
  //   console.log('working2')

  //   currentWeek.push(new Date(year, month, lastDayOfMonth));
  //   weeklyTotals[`week${weekCounter}`] = currentWeek.map(date => {
  //     const nextDay = new Date(date);
  //     nextDay.setDate(nextDay.getDate());
  //     return `${nextDay.getFullYear()}-${('0' + (nextDay.getMonth() + 1)).slice(-2)}-${('0' + nextDay.getDate()).slice(-2)}`;
  //   });
      

  // console.log("Weekly Totals:", weeklyTotals);
  // week1
  let week1:any=[]
  week1= weeklyTotals.week1
  const mayDates:any = [];
// console.log(monthof)
console.log(this.currentMonthName)

  week1.forEach((date:any) => {
  const month = new Date(date).getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed month
  console.log(month)
  console.log(this.currentMonthName)

  if (month === this.currentMonthName) {
    mayDates.push(date);
  }
});

console.log(mayDates);
  let weektotal1:any = []
  this.events.forEach((element:any)=>{
     mayDates.forEach((env:any)=>{
      if(element.date == env){
        weektotal1.push(element.title)
      }
    })
  })
  console.log(weektotal1)
  this.totalofweek(weektotal1 , 'weekone')
  //week2
      let week2:any = []
  this.events.forEach((element:any)=>{
     weeklyTotals.week2.forEach((env:any)=>{
      if(element.date == env){
        week2.push(element.title)
      }
    })
  })
  console.log(week2)
  this.totalofweek(week2 , 'weektwo')
  //week3
    let week3:any = []
  this.events.forEach((element:any)=>{
     weeklyTotals.week3.forEach((env:any)=>{
      if(element.date == env){
        week3.push(element.title)
      }
    })
  })
  console.log(week3)
  this.totalofweek(week3 , 'weekthree')
  //week4
    let week4:any = []
  this.events.forEach((element:any)=>{
     weeklyTotals.week4.forEach((env:any)=>{
      if(element.date == env){
        week4.push(element.title)
      }
    })
  })
  console.log(week4)
  this.totalofweek(week4 , 'weekfour')
  //week5
  console.log(weeklyTotals.week5.length)
  let week5:any = []
  let week6:any =[]
     if (weeklyTotals.week5.length < 7){
       console.log('if works')
       week5 = week5.concat(weeklyTotals.week5, weeklyTotals.week6)
       week6 = []
     }
     else{
      console.log('else works')

      week5 = weeklyTotals.week5
      week6 = week6.concat(weeklyTotals.week6, weeklyTotals.week7)
     }
  
    console.log(week5)
    let weektotal5:any=[]
     this.events.forEach((element:any)=>{
      week5.forEach((env:any)=>{
      if(element.date == env){
        weektotal5.push(element.title)
      }
    })
  })
  this.totalofweek(weektotal5 , 'weekfive')
  //week6
   console.log(week6)
    let weektotal6:any=[]
     this.events.forEach((element:any)=>{
      week6.forEach((env:any)=>{
      if(element.date == env){
        weektotal6.push(element.title)
      }
    })
  })
  this.totalofweek(weektotal6 , 'weeksix')

  this.weelytotal.forEach((element:any)=>{
    switch(element.id){
      case 1:
        element.amount = this.week_one_total
      break;
         case 2:
        element.amount = this.week_two_total
      break;
       case 3:
        element.amount = this.week_three_total
      break;
       case 4:
        element.amount = this.week_four_total
      break;
       case 5:
        element.amount = this.week_five_total
      break;
       case 6:
        element.amount = this.week_six_total
      break;
    }
  })
}

totalofweek(weekarray:any,weekname:any){
  let filternum:any = 0
    weekarray.forEach((ord:any)=>{
    const arr = ord.replace(this.price_symbol, '')
    let num:any = parseFloat(arr)
    // const total += num
    filternum += num;
  
  })
  switch(weekname){
 case 'weekone':
    this.week_one_total = filternum.toFixed(2)
  break;
  case 'weektwo':
    this.week_two_total = filternum.toFixed(2)
  break;
  case 'weekthree':
    this.week_three_total = filternum.toFixed(2) 
  break;
  case 'weekfour':
    this.week_four_total = filternum.toFixed(2) 
  break;
   case 'weekfive':
    this.week_five_total = filternum.toFixed(2) 
  break;
   case 'weeksix':
    this.week_six_total = filternum.toFixed(2) 
  break;
 
  }
      console.log("week1 "+this.week_one_total)
   console.log("week2 "+this.week_two_total)
  console.log("week3 "+this.week_three_total)
  console.log("week4 "+this.week_four_total)
  console.log("week5 "+this.week_five_total)
  console.log("week6 "+this.week_six_total)

}



  pendingpay() {
    this.events = []
    const obj = {
      Hotel_Name_id: this.Hotel_id
    };
  
   
    this.HotelService.all_due_date(obj).subscribe({
      next :(res)=>{
      console.log(res);
      if(res.all_due_date.length > 0){
        this.toast.success({ detail: "SUCCESS", summary: 'Pending Payments Available', duration: 3000 });

      }else{
        this.toast.error({ detail: "Error", summary: 'No Pending Payments Available', duration: 3000 });

      }

      let fin:any = []
      res.service_due.forEach((org:any)=>{
        org.rfq_id = org.service_request_random
      })
      fin = fin.concat(res.all_due_date,res.service_due)
      console.log(fin)
     this.pendingorders = fin
     console.log(this.pendingorders)
     this.vendors = this.removeDuplicatesByProperty(this.pendingorders,'vendor_id')
     console.log(this.vendors)
     this.purchase_order = this.removeDuplicatesByProperty(this.pendingorders,'rfq_id')
     this.buttons.forEach((element:any)=>{
      if(element.id == 1){
        element.filter= this.vendors
        element.dropdown = this.pendingorders
        element.dropdown.forEach((order:any)=>{
          order.ischecked = false
        })
       
      }
    })
    //po filer
    this.buttons.forEach((element:any)=>{
      if(element.id == 2){
        element.filter= this.purchase_order
        element.dropdown_all = this.pendingorders
        element.dropdown = this.pendingorders
        element.dropdown.forEach((order:any)=>{
          order.ischecked = false
        })
       
      }
    })
    console.log(this.buttons)
    console.log(this.pendingorders)
    this.updateEvent(this.pendingorders)
    
  },
  error: (error) => {
    console.log(error);
    this.toast.error({ detail: "Error", summary: 'No Pending Payments Available', duration: 3000 });

  }
  });
    // Calculate monthly total
    // this.calculateMonthlyTotal();
  


  }
  updateEvent(receivedorders:any){
    console.log(receivedorders)
    console.log('updateorder')

    let date_payment:any = []
    let lastDay:any = ''
    let totalCost:any = ''
    let id:any =''
    let productid:any=''
     // Iterate over each item in the response array
     receivedorders.forEach((item:any) => {
       // Extract last_day_for_payment and total_cost
       lastDay = item.last_day_for_payment.split(' ')[0];
        console.log(lastDay); 
       totalCost = item.total_cost;
       id = item.rfq_id;
       productid = item.product_id

 
     
       date_payment.push(
         {
         price: totalCost,
         id:id,
         product_id: productid,
         date: lastDay,
         color: '#075719' // Assuming you want a fixed color for all events
         }
       );

     });

     date_payment.forEach((element:any) => {
       const addprice = this.Addtotal(element.date,totalCost,date_payment)
       element.title = this.price_symbol+addprice.toString()
     });
     

         console.log(date_payment)
         this.paymentdate = date_payment
     this.events = this.removeDuplicatesByProperty(date_payment,'date')
     console.log(this.events)
     this.currentmonth()
   
     this.calendarOptions.events = this.events;
  }
  Addtotal(lastDay: string, totalCost: number,all_date:any) {
    let price:any = 0
    const same_date = all_date.filter((date:any) => date.date == lastDay)

    let sum = 0;
    for (let item of same_date) {
      sum += parseFloat(item.price);
    }
    return sum;
  }

  // REMOVE DUPLICATES
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
  handleEventClick(clickedEventInfo: any) {
    const eventDate = clickedEventInfo.event.start; // Get the start date of the clicked event
    console.log('Event clicked:', clickedEventInfo.event.title);
    console.log('Event date:', eventDate.toISOString()); // Log the date in ISO format
    console.log('Success message: Event clicked successfully!');
    const localDate = new Date(eventDate.getTime() - (eventDate.getTimezoneOffset() * 60000)); // Adjust to local timezone

    let arg = localDate.toISOString().split('T')[0];
    console.log(arg)
    this.loopprice=[]
   
   this.choice=true
   
    this.paymentdate.forEach((element:any)=>{
      if (arg == element.date){
        this.loopprice.push(
          {
            price : element.price,
            Id :element.id,
            productID : element.product_id
          })
           
      }
    })
   
    // alert('date click! ' + arg.dateStr + loopprice)
    console.log(this.loopprice)
  
      
  }
  handleDateClick(arg:any) {
    console.log(arg)
    this.details=false
    this.choice=false

  }
  close(){
      this.details=false
  }
  handleEventDidMount(info: any) {
    info.el.style.cursor = 'pointer';
  }
  viewoption(screen:any){
    if(screen == 'viewprice'){
      this.details=true

    }
   if(screen == 'viewproduct'){
    let  filterproduct:any = this.removeDuplicatesByProperty(this.loopprice,'productID')
    filterproduct.forEach((data:any)=>{
     this.productfiler.push(data.productID)
    })
    console.log(this.productfiler)
    this.AppserviceService.procurementStage_orders(this.productfiler)
    this.cancel_popup()

    }
    this.choice = false
  }
  getfilter(checked:any,vendorid:any,Rfqid:any){
     switch(this.selectedButton){
      case'VENDOR':
      this.selected_items=[]
      let selected_vendorid:any = []
      this.buttons.forEach((element:any)=>{
         if(element.id == 1){
           element.dropdown.forEach((order:any)=>{
             if(order.vendor_id == vendorid){
               order.ischecked = checked.target.checked
             }
             if(order.ischecked == true){
              selected_vendorid.push(order.vendor_id)
               this.selected_items.push(order)
             }
           })
         }

         if(element.id == 2){
          element.filter = selected_vendorid.length == 0 ? element.dropdown_all : element.dropdown_all.filter((po_id: any) => selected_vendorid.includes(po_id.vendor_id))
         }
        })
        console.log(this.buttons)


      break;
      case 'Purchase Order Number':
        this.events =[]
        this.selected_items=[]
        this.buttons.forEach((element:any)=>{
           if(element.id == 2){
             element.dropdown.forEach((order:any)=>{
               if(order.rfq_id == Rfqid && order.vendor_id == vendorid ){
                 order.ischecked = checked.target.checked
               }
               if(order.ischecked == true){
                 this.selected_items.push(order)
               }
              
             })
            
           }
          })
        break;
     }
     console.log(this.selected_items)
     this.updateEvent(this.selected_items)

  }
  buttonClicked(clicked:any){
    this.selectedButton = clicked
    console.log(this.selectedButton)
  }
  closefilter(){
    this.openfilter = !this.openfilter;

    
    this.updateEvent(this.pendingorders)

  }
}
