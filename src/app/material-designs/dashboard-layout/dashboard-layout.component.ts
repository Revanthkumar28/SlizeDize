import { Component, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';

@Component({
  selector: 'dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  isDrawerOpen: boolean = false;
  side_bar:boolean = true

  toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
  }

  constructor(private AppserviceService:AppserviceService) { }

  ngOnInit(): void {
    this.AppserviceService.setUserRole([1])
    this.AppserviceService.open_close_sidebar$.subscribe((res:any)=>{
      console.log(res)

      if(res !=null){
        this.side_bar = res
      }
      
    })
  }

}