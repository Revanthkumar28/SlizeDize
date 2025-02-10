import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'b2b-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.css']
})
export class AddBudgetComponent implements OnInit {
  @Output() cancelpopup = new EventEmitter();
  inputvalue:any=""
  tableData = [
    { column1: 'Executive Office Budget', column2: '1,00,000', column3: '50 Thousand', column4: '50 Thousand' },
    { column1: 'Front Office Budget', column2: '2,00,000', column3: '2 Lakhs', column4: '0' },
    { column1: 'House Keeping Budget', column2: '3,00,000', column3: '3 Lakhs', column4: '0' },
    { column1: 'Maintanance Budget', column2: '1,00,000', column3: '0', column4: '1 Lakh' },
    { column1: 'Hotel-Wide Budget(Total)', column2: '', column3: '5.5 Lakhs', column4: '1.5 Lakhs' }
  ];

 

  constructor(private HotelService:HotelService,private toast: NgToastService) { }

  ngOnInit(): void {
    this.tableData.forEach((data:any)=>{
         console.log(data.column2)
         data.column2 = this.inputvalue
    })
  }
  clocecancelpopup(){
    this.cancelpopup.emit(false);

  }
  submit(){
    const data={
      Hotel_Name_id:'1711192311854',
      department:"Executive Office Budget",
      budget_amt:this.inputvalue,
      spent:'2000',
      year:'2024'
    }
    
    this.HotelService.budgets_for_hotel(data).subscribe({
      next: (response) => {
       console.log(data)
       this.toast.success({detail:"Submitted",summary:'Success',duration:5000})
      },
      error: (error) => {
        // Error block
        console.log('test error');  // Log to console for debugging
        // this.toast.error({ detail: "Error", summary: 'Error', duration: 3000 });
      },
  })
}
}
