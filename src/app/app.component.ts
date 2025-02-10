import { Component,HostListener,OnInit } from '@angular/core';
import {TourGuideService} from './service/tour-guide/tour-guide.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'multi_vendor_marketplace';

  constructor() {}

  ngOnInit(){
    this.startTour()
  }

  startTour(): void {
    // this.appGuidedTourService.startTour();
  }
}
