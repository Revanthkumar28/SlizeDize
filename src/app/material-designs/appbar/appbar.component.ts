import { Component, Input, OnInit } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';

@Component({
  selector: 'b2b-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.css']
})
export class AppbarComponent implements OnInit {

  @Input() leading_img: string = "";
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