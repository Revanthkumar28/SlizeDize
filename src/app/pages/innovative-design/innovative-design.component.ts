import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';


@Component({
  selector: 'b2b-innovative-design',
  templateUrl: './innovative-design.component.html',
  styleUrls: ['./innovative-design.component.css']
})
export class InnovativeDesignComponent implements OnInit {
  counte:any = 1;

  @Input() activeIndex = 1;
  @Input() values: string[]= ['choose image', 'lobby img'];
  @Input() video: string[]= ['choose video', 'lobby vide0'];

  @Input() article: string[]= ['choose article', 'lobby article'];

  @Input() name: string = "";

  // websocket 
  socket_title:any = 'Client'
  socket_msg:any = 'Hello'

  constructor(private router: Router, private location: Location,private AppserviceService:AppserviceService) {
  }


  ngOnInit(): void {
    // this.soket_subject.pipe(takeUntil(this.socket_destroy$)).subscribe((res:any) =>{
    //   console.log(res)
    //   this.socket_chat = `${this.socket_chat} <br/> ${res}`
    // })
    // try {
    //   // this.AppserviceService.bind('private_msg', (data: any) => {
    //   //   console.log(data);
    //   // });

    //   this.AppserviceService.bind('test_msg', (data: any) => {
    //     console.log(data);
    //   });
    // } catch (error) {
    //   console.error('Error in binding event:', error);
    // }
  }
  
  goBack() {
    this.location.back();
  }
  
  changeIndex(index: number) {
    this.activeIndex = index;
    console.log(index);
  }
  changeVideo(index: number) {
    this.activeIndex = index;
  }
  changeArticle(index: number) {
    this.activeIndex = index;
  }

  counter(){
    return ++this.counte
  }
}
