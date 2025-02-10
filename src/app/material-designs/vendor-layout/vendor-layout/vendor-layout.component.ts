import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';

@Component({
  selector: 'b2b-vendor-layout',
  templateUrl: './vendor-layout.component.html',
  styleUrls: ['./vendor-layout.component.css']
})
export class VendorLayoutComponent implements OnInit {
  side_bar:boolean = true

  constructor(private AppserviceService:AppserviceService) { }

  ngOnInit(): void {
    this.AppserviceService.open_close_sidebar$.subscribe((res:any)=>{
      console.log(res)

      if(res !=null){
        this.side_bar = res
      }
      
    })
  
  }

}
