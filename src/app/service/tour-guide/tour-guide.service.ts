import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { HotelService } from 'src/app/service/hotel/hotel.service';

import {
  GuidedTour,
  GuidedTourService,
  Orientation,
  ProgressIndicatorLocation,
} from 'ngx-guided-tour';

@Injectable({
  providedIn: 'root'
})
export class TourGuideService {
  progressIndicatorLocation = ProgressIndicatorLocation.TopOfTourBlock;

  private readonly TOUR: GuidedTour = {
    tourId: 'purchases-tour',
    useOrb: false,
    // skipCallback: () => alert('Skip'),
    // completeCallback: () => alert('complete clicked'),
    steps: [
      {
        title: 'Step in h1',
        selector: '.tour-menu',
        content: 'After created hotel then create Departments for hotel',
        orientation: Orientation.Bottom,
      },
      {
        selector: '.tour-settings',
        title: 'Create Departments',
        content: 'Content is fix on the screen',
        orientation: Orientation.TopLeft,
      },
      {
        title: 'Step in paragraph',
        content: 'Select Hotel and add Department',
        selector: '.tour-list-hotel',
        orientation: Orientation.BottomLeft,
      },
      {
        title: 'Step in button',
        selector: '.tour-department',
        content: 'Enter Department',
        orientation: Orientation.BottomLeft,
      },
      {
        title: 'Step in link',
        selector: '.tour-dep-submit',
        content: 'Click Submit button to save department for hotel',
        orientation: Orientation.BottomRight,
      },
      {
        title: 'Hotel Budget',
        selector: '.tour-hotel-menu',
        content: 'Open menu to select budget option, add budget for hotel department',
        orientation: Orientation.BottomRight,
      },
      {
        title: 'Menu Hotel',
        selector: '.tour-hotel-menu-budget',
        content: 'Content in link at Right',
        orientation: Orientation.BottomRight,
      },
      {
        title: 'Purchase Request',
        selector: '.tour-purchase-request',
        content: 'Open menu select Purchase request (or) service request for Products',
        orientation: Orientation.BottomRight,
      },
      {
        title: 'Payment terms',
        selector: '.tour-payment-terms',
        content: 'Payment terms select for order',
        orientation: Orientation.TopRight,
      },
      {
        title: 'Select Vendor',
        selector: '.tour-select-vendor',
        content: 'Select vendor for Purchase product',
        orientation: Orientation.TopRight,
      },
      {
        title: 'Procurement Stage',
        selector: '.tour-procurement-stage',
        content: 'direct order and RFQ , placed Order status tracking from vendor',
        orientation: Orientation.TopRight,
      },
      {
        title: 'Filter Products',
        selector: '.tour-filter-products',
        content: 'Filter products in Table heading',
        orientation: Orientation.TopRight,
      },
      {
        title: 'Hotel Budget',
        selector: '.tour-hotel-budget',
        content: 'Hotel Budget view department wise listed',
        orientation: Orientation.TopRight,
      },
      {
        title: 'Payment History',
        selector: '.tour-payment-history',
        content: 'Date wise payment pending price, paid price listed',
        orientation: Orientation.TopRight,
      },
      {
        title: 'Group Order',
        selector: '.tour-group-order',
        content: 'All products order grouped By',
        orientation: Orientation.BottomLeft,
      },
      {
        title: 'Maintanence Request',
        selector: '.tour-maintanence-req',
        content: 'Maintanance Hotel services',
        orientation: Orientation.BottomRight,
      },
      {
        title: 'Done',
        content: 'Tour Completed',
        orientation: Orientation.BottomRight,
      },
    ],
  };

  constructor(private guidedTourService: GuidedTourService,private router:Router,private AppserviceService:AppserviceService,private HotelService:HotelService) {
    this.guidedTourService.guidedTourCurrentStepStream.subscribe((step) => {
      this.AppserviceService.guideTour('')
      console.log(step)
      if(step.selector == '.tour-settings'){
        this.router.navigate(['/console/Settings']);
      }
      if(step.selector == '.tour-hotel-menu'){
        this.router.navigate(['/console/catalog']);
      }
      if(step.selector == '.tour-hotel-menu'){
        this.AppserviceService.guideTour('.tour-hotel-menu')
      }
      if(step.selector == '.tour-purchase-request'){
        this.AppserviceService.guideTour('.tour-purchase-request')
      }
      if(step.title == 'Done' || step.title == 'Skip'){
        console.log('Done')
        this.HotelService.tour_guides().subscribe((res:any)=>{
          console.log('success')
          console.log(res)
        })
      }

    });
  }

  startTour() {
    this.guidedTourService.startTour(this.TOUR);
  }
}
