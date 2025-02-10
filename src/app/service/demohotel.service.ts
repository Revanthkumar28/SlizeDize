import { Injectable } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DemohotelService {

  constructor(private HotelService: HotelService,
    private AppserviceService: AppserviceService,
  ) { }

  Show_Demo_Orders(prod_id:any){
    const user_id = localStorage.getItem('u_id')
    if(user_id && prod_id){
      const obj={
        id_user:user_id,
        product_id: prod_id
      }
      this.HotelService.demo_product(obj).subscribe((d: any) => {
        console.log(d)
         d.product.forEach((obj:any)=>{
            obj.user_name = 'Ram'
            obj.department_name ='Demo'
            obj.purchase_request_random = obj.rfq_id
            obj.mv_id = obj.rfq_id
            obj.PR_id = obj.rfq_id
            obj.vendor_coating_price = '200'
            obj.total_cost = '2000'
            obj.before_required_date = this.dateTime()
            obj.Vendor_remarks = 'Good'
            obj.payment_terms = 'Net 0'
            obj.requested_on = this.dateTime()
            obj.vendor_sku ='SKU007'
            obj.total_req_qty = obj.qty
            obj.vendor_quantity = obj.qty
            obj.ETA = this.dateTime()
            obj.advanced_delayed_days = '0'
            obj.payment_due = this.dateTime()
            obj.vednor = obj.vendor_company
            obj.companyName = obj.vendor_company
            obj.riquredQty = obj.qty
            obj.selected_vendor_companyName =  obj.vendor_company
         })
        this.AppserviceService.share_demo_orders(d.product) 

      })

    }
  }
  update_demo_hotel(vlue:any){
    const user_id = localStorage.getItem('u_id')
    if(user_id && vlue){
      const obj={
        id_user:user_id,
        product_id: vlue.product_id,
        status:vlue.status,
        id:vlue.id
      }
      this.HotelService.demo_product_update(obj).subscribe((d: any) => {
        console.log(d)
        // return d.product
        this.Show_Demo_Orders(vlue.product_id) 

      })

    }
  }
   dateTime() {
      // Get current date and time using Luxon
      const currentDate = DateTime.local();
      // Get the month abbreviation
      const monthAbbreviation = currentDate.toFormat('LLL'); // 'LLL' gives the abbreviated month name
      // Format date in 'dd-MMM-yyyy' format
      const formattedDate = currentDate.toFormat('dd') + '-' + monthAbbreviation + '-' + currentDate.toFormat('yyyy hh:mm:ss a');
     const sendtodaydate =currentDate.toFormat('dd') + '-' + monthAbbreviation + '-' + currentDate.toFormat('yyyy');
      // Assign the formatted date to dateString
            
        return sendtodaydate
    }
  
}

//status and values for the demo hotel orders
 // 1 = RFQ
 // 2 = Do
 // 3 = RFQ compare
 // 4 = Direct order sent
 // 5 = Under process
 // 6 = renogotiation
 // 7 = descrepancy
 // 8 = ready for pay
 // 9 = history