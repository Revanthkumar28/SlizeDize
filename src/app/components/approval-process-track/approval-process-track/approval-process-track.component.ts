import { Component, OnInit ,Input,EventEmitter,Output} from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';

@Component({
  selector: 'b2b-approval-process-track',
  templateUrl: './approval-process-track.component.html',
  styleUrls: ['./approval-process-track.component.css']
})
export class ApprovalProcessTrackComponent implements OnInit {
  button_name:any[]=[
    {"name": "Approval process"},
    {"name": "Order process"}, 
   
  ]
  @Input() isOrderTracking:boolean = false
  @Input() type:any = ''
  deleteProduct : any = {}

  isDelete:boolean = false
  @Input() rejectProduct = [
    { 
      image: 'assets/chair.jpg', // Replace this with the URL or image data
      hotel_required_qty: '100',
      product_id: ''
    },
    { 
      image: 'assets/spoon.jpg', // Replace this with the URL or image data
      hotel_required_qty: '8',
      product_id: ''
    },
  ];
  
  buttonType :any ={
    screen : '',
    type:'',
  }
 
  @Output() cacenl = new EventEmitter();
  process_person :any = [] 
  selectedButton:any='Approval process'
  deleteTableColumnSpacing:any = '3*1fr 0.2fr'
  constructor(private HotelService:HotelService) { }

  ngOnInit(): void {
    console.log(this.type.screen)
    const payload = {
      Hotel_Name_id : this.type.Hotel_Name_id,
      id :this.type.order_id,
      finance: this.type.finance,
      finance_price_percent : this.type.finance_price_percent
    }

    this.process_person = payload
  }

  buttonclicked(event:any){
    this.selectedButton=event
  }
  closeButton(){
    // this.isOrderTracking=false
    this.cacenl.emit(false);
  }
  
  deleteItem(type:any){
    this.isDelete = true
    this.buttonType.type = type
    this.buttonType.screen = this.type.screen
    console.log(this.rejectProduct)
    this.rejectProduct.forEach((d:any) =>{
      if(d.isCheck == true){
        this.deleteProduct.product_id = d.product_id
        this.deleteProduct.mv_id = d.mv_id
        this.deleteProduct.Hotel_Name_id = d.Hotel_Name_id
        this.deleteProduct.vp = d.vp

        // this.HotelService.cancelled_order(payload).subscribe((res) =>{
        //   console.log(res)
        // })
      }
    })

    console.log(this.deleteProduct)
  }

  isCheckProduct(event:any,product_id:any){
    this.rejectProduct.forEach((d:any) =>{
      if( d.product_id == product_id){
        d.isCheck = event.target.checked
      }
    })
  }

}
