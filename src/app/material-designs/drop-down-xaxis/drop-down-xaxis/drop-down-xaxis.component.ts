import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'b2b-drop-down-xaxis',
  templateUrl: './drop-down-xaxis.component.html',
  styleUrls: ['./drop-down-xaxis.component.css']
})
export class DropDownXaxisComponent implements OnInit {
  @Input() maxheight :any = ''
  @Input() overflowY :any = ''
  @Input() popupWidth:any = '180px'
  markerLeft = 0;
  markerTop = 0;
  markerClickCounter = 0;
  
  isPopupOpen:boolean = false
  @Input() isInsidePopupClose:boolean = true
  constructor() { }

  ngOnInit(): void {
  }

  // DropDown
  image_mark(event: MouseEvent) {
    if (this.isPopupOpen && this.markerClickCounter === 1) {
        this.isPopupOpen = false;
        this.markerClickCounter = 0;
    } else {
        this.isPopupOpen = true;
       // Get the click position
       const clickX = event.clientX;
       const clickY = event.clientY;

       // Calculate the width and height of the popup
       const popupWidth = 180; // Adjust as needed
       const popupHeight = 200; // Adjust as needed

      // Calculate the maximum available space in the viewport
      const maxAvailableWidth = window.innerWidth - popupWidth;
      const maxAvailableHeight = window.innerHeight - popupHeight;

      // Adjust markerLeft and markerTop based on available space
      this.markerLeft = Math.min(clickX, maxAvailableWidth)+1;
      this.markerTop = Math.min(clickY, maxAvailableHeight)+1;

      this.markerClickCounter = 1;
  
    }
}

  clickedOutside() {
    this.isPopupOpen = false;
  }

  closePopup(){
    if(this.isInsidePopupClose == true){
      this.isPopupOpen =false
    }else{
      this.isPopupOpen =true
    }
  }

}
