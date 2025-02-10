import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'b2b-delete-line-item',
  templateUrl: './delete-line-item.component.html',
  styleUrls: ['./delete-line-item.component.css']
})
export class DeleteLineItemComponent implements OnInit {
  @Input() type:any = ''
  @Input() type2:any = ''
  @Input() deleteProduct : any = {}
  @Output() cancelpopup = new EventEmitter();
  remarks:any = ''
  constructor(private HotelService:HotelService,private AppserviceService:AppserviceService,private toast:NgToastService) { }

  ngOnInit(): void {
    console.log(this.deleteProduct)
  }
  
  clocecancelpopup(){
    this.cancelpopup.emit(false);
  }

  // Reject Purchase order products
  rejectProductOrder(){
    this.deleteProduct.rejected_reason = this.remarks
    // if(this.deleteProduct.vp == '1'){
    //   this.HotelService.diractorder_cancelled_vendor_product(this.deleteProduct).subscribe((res) =>{
    //     console.log(res)
    //     this.clocecancelpopup()
    //     this.AppserviceService.deletePurchaseOrder(this.deleteProduct.product_id)
    //   })

    // }else{
    this.HotelService.diractorder_cancelled(this.deleteProduct).subscribe({
      next:(res)=>{
        console.log(res)
        this.clocecancelpopup()
        this.toast.success({ detail: "SUCCESS", summary: 'Order Deleted', duration: 3000 });
  
        this.AppserviceService.deletePurchaseOrder(this.deleteProduct.product_id)
      },error:()=>{
        this.toast.error({ detail: "Error", summary: 'Not Deleted', duration: 3000 });

      }
     
    })
    }
  

}
