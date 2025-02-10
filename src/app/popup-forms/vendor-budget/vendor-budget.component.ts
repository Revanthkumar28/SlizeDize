import { Component, OnInit,Output,EventEmitter,Input  } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';


@Component({
  selector: 'b2b-vendor-budget',
  templateUrl: './vendor-budget.component.html',
  styleUrls: ['./vendor-budget.component.css']
})
export class VendorBudgetComponent implements OnInit {
  add_budget:boolean=false
  @Output() cancelpopup = new EventEmitter();
  @Input() type:any = ''
  year = new Date().getFullYear();
  currentYear = new Date().getFullYear();
  details:boolean=false
  loopprice:any=[]

  budgetInput:number = 0
  budgetTotal:number = 0
  row: any;

  tableData:any = [
    { id: 1,amount:0,column1: 'Executive Office Budget', column2: '1,00,000', column3: '50 Thousand', column4: '50 Thousand' },
    { id: 2,amount:0,column1: 'Front Office Budget', column2: '2,00,000', column3: '2 Lakhs', column4: '0' },
    { id: 3,amount:0,column1: 'House Keeping Budget', column2: '3,00,000', column3: '3 Lakhs', column4: '0' },
    { id: 4,amount:0,column1: 'Maintanance Budget', column2: '1,00,000', column3: '0', column4: '1 Lakh' },
    { id: 5,amount:0,column1: 'Hotel-Wide Budget(Total)', column2: '', column3: '5 Lakhs', column4: '1.5 Lakhs' }
  ];

  tableData1:any = []


  addingRow = false; 
  
  deleteRow() {
    const totalRows = this.tableData1.length;
    if (totalRows > 0) {
      const rowToDeleteIndex = totalRows - 1; // Index of the row above the last two rows
      this.tableData1.splice(rowToDeleteIndex, 1); // Remove the row at rowToDeleteIndex
      this.addingRow = false; // Hide "Add" button if no new row is being added
    }
  }
  hotel_id:any = ''
  department_details :any = []
  budgeted:any = 0
  spend_total :any = 0
  remaining_total :any = 0
  constructor(private HotelService:HotelService,private toast: NgToastService, private router: Router, private route: ActivatedRoute,private AppserviceService: AppserviceService) { }
  price_symbol:any=''
  ngOnInit(): void {
    console.log(this.type)
    this.tableData1 = []

    const hash = window.location.hash.substr(1); // Get the hash part of the URL without the '#'
    const params = this.parseHashParams(hash); // Parse the parameters from the hash

    if (params.has('ids')) {
      this.hotel_id = params.get('ids');
    } else {
      this.hotel_id = null;
    }

    this.view_budget(this.year)
    this.AppserviceService.country_price_symbol$.subscribe((symbol:any) =>{
      this.price_symbol = symbol
      console.log(this.price_symbol)
    })
  }

  view_budget(table_year:any){
    const payload = {
      Hotel_Name_id : this.hotel_id
    }

    this.HotelService.hotel_budget_view(payload).subscribe({
      next:(res)=>{
      console.log(res)
      this.budgeted = 0
      this.remaining_total = 0
      this.spend_total = 0
      this.tableData1 = []
      this.department_details = res.budgets
     if(this.department_details.length >0){
      this.toast.success({detail:"Success",summary:'Create?Edit Budget',duration:5000});

     }else{
      this.toast.error({detail:"Error",summary:'No Departments Found',duration:5000});

     }
      const dublicate = this.removeDuplicatesByProperty(res.budgets,'department')
      const filter = res.budgets.filter((ye:any) => ye.year == table_year)
      dublicate.forEach((dep:any) =>{
        filter.forEach((exist:any) => {
          if(dep.department == exist.department){
            dep.budget_amt = exist.budget_amt
            dep.spent = exist.spent
            dep.budget_remaining = exist.budget_remaining
            dep.table_year = exist.year
          }
        });
      })
      console.log(dublicate)
      dublicate.forEach((element:any) => {
        if(element.table_year != table_year){
          element.budget_amt = 0
          element.spent = 0
          element.budget_remaining = 0
        }
      });
      this.calculation_budget(dublicate)
    },
    error:()=>{
      
    }
  })
  }

  calculation_budget(data:any){
    data.forEach((element:any) => {
      this.tableData1.push({
        id: element.id,
        department_id: element.department,
        column1 : element.department_name,
        column2: element.budget_amt != null ? element.budget_amt : '', 
        column3: element.spent != null ? element.spent : '0', 
        column4: element.budget_remaining != null ? element.budget_remaining : '0',
      })
    });

    console.log(this.tableData1)
    this.tableData1.forEach((element:any) => {
      this.budgeted += element.column2 == '' ? 0 : parseInt(element.column2)
      this.spend_total += element.column3 == '' ? 0 : parseInt(element.column3)
      this.remaining_total += element.column4 == '' ? 0 : parseInt(element.column4)
      
    });
  }

  parseHashParams(hash: string): Map<string, string> {
    const params = new Map<string, string>();
    const pairs = hash.split(';'); // Split the hash fragment by ';'
  
    for (const pair of pairs) {
      const keyValue = pair.split('='); // Split each key-value pair by '='
      if (keyValue.length === 2) {
        const key = keyValue[0];
        const value = keyValue[1];
        params.set(key, value);
      }
    }
  
    return params;
  }

  tableDatas(){
    const data = [
      { id: 1,amount:0,column1: 'Executive Office Budget', tempValue: '', column3: '50 Thousand', column4: '50 Thousand' },
      { id: 2,amount:0,column1: 'Front Office Budget', tempValue: '', column3: '2 Lakhs', column4: '0' },
      { id: 3,amount:0,column1: 'House Keeping Budget', tempValue: '', column3: '3 Lakhs', column4: '0' },
      { id: 4,amount:0,column1: 'Maintanance Budget', tempValue: '', column3: '0', column4: '1 Lakh' },
      { id: 5,amount:0,column1: 'Hotel-Wide Budget(Total)', tempValue: '', column3: '5.5 Lakhs', column4: '1.5 Lakhs' }
    ];

    return data
  }
  clocecancelpopup(){
    this.cancelpopup.emit(false);
  }
  AddBudget(){
    this.add_budget=true
  }

  addRow(){
    const newRow = { id:0,amount:0,column1: '', column2: 'Added', column3: 'Here', column4: 'Extra' };
    const totalRowIndex = this.tableData1.findIndex((row:any) => row.column1 === 'Hotel-Wide Budget(Total)');
    this.tableData1.splice(totalRowIndex === -1 ? this.tableData.length : totalRowIndex, 0, newRow);
    this.addingRow = true; // Show "Add" button
  }

  department_id :any = {
    id : '',
    department_id : '',
    amount : ''
  }
  addBudgetTotal(event:any,id:any,amount:any,department_id:any){
    const count = event.target.value
    // this.budgetTotal = this.budgetTotal + count
    this.department_id.department_id = department_id
    this.department_id.id = id
    this.department_id.amount = event.target.value

    this.tableData1.forEach((d:any) =>{
      if(d.id == id){
        d.amount = event.target.value
      }
    })

    // this.calculateTotalAmount();
    console.log(this.calculateTotalAmount())
  }

  calculateTotalAmount() {
    this.budgetTotal = this.tableData1.reduce((total:any, item:any) => {
      // Convert amount to number (assuming it's a string with commas)
      const amount = parseFloat((item.amount || '').replace(/,/g, '')) || 0;
      return total + amount;
    }, 0);
  }

  nextYear(){
    this.year += 1
    
    if(this.year === this.currentYear){
      this.view_budget(this.year)
    }else{
      // this.tableData1.forEach((d:any) =>{
      //   d.column3 = ''
      //   d.column4 = ''
      // })
      this.view_budget(this.year)
    }
  }

  preYear(){
    this.year -= 1
    
    if(this.year === this.currentYear){
      console.log(this.tableData)
      this.view_budget(this.year)
    }else{
      this.tableData1.forEach((d:any) =>{
        d.column3 = ''
        d.column4 = ''
      })
      this.view_budget(this.year)
    }
  }
 

  // Function to disable the input and do further processing (e.g., saving the value)
  
  disableInput(row: any) {
    // row.inputDisabled = true;
  }
  submit(){
    const data={
      Hotel_Name_id:'1711192311854',
      department:'Executive Office Budget',
      budget_amt:'12000',
      spent:'2000',
      year:'2024'
    }

    let payload:any = {
      'Hotel_Name_id' : this.hotel_id,
      'department' : this.department_id.department_id,
      'id': this.department_id.id,
      'budget_amt' : this.department_id.amount,
    }

    console.log(this.tableData1)
    // CURRENT YEAR & NEXT YEAR
    if(this.year != this.currentYear){
      payload.year = this.year
      this.HotelService.next_year_budget_creation(payload).subscribe({
        next: (response) => {
          this.toast.success({detail:"Submitted",summary:'Success',duration:5000});

        },
        error: (error) => {
          this.toast.error({detail:"Error",summary:'We can add budget for only current and next year',duration:5000});

        }
      })
    }else{
      this.HotelService.hotel_budget_edit(payload).subscribe({
        next: (response) => {
         console.log(data)
         this.toast.success({detail:"Submitted",summary:'Success',duration:5000});
  
         this.view_budget(this.year)
        },
        error: (error) => {
          // Error block
          console.log('test error'); 
          this.toast.error({detail:"Error",summary:'The Budget should be more than Spent',duration:5000});
        },
      })
    }
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

openreport(report:any){
  this.loopprice=[]
  console.log(report)
  const payload={
    Hotel_Name_id:  this.hotel_id,
    department: report.department_id,
    year:this.year

  }
if(report.column3 > 0 ){

  this.HotelService.budget_total_history_rfq(payload).subscribe({
    next: (response) => {

     console.log(response.order_history)
     
     response.order_history.forEach((elem:any)=>{
      this.loopprice.push({
           Id:elem.mv_id,
           price:this.price_symbol +elem.total_cost,
           product_id:elem.product_id  
      })

     })
     this.details = true

     this.toast.success({detail:"Submitted",summary:'Success',duration:5000});

    },
    error: (error) => {
      console.log('test error');  // Log to console for debugging
      // this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
    },
})
}else{
       this.toast.error({ detail: "Error", summary: 'No Orders', duration: 3000 });

}

}
filterproduct(product:any){
  console.log(product)
  product = [product]
  console.log(product)

  this.AppserviceService.procurementStage_orders(product)
  this.details= false
  this.clocecancelpopup()
}
}