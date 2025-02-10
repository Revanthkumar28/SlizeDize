import { Component ,ElementRef ,Input, OnInit} from '@angular/core';

@Component({
  selector: 'b2b-draggable-popup',
  templateUrl: './draggable-popup.component.html',
  styleUrls: ['./draggable-popup.component.css']
})
export class DraggablePopupComponent implements OnInit {

  top:any  = '10%';

  @Input() positionTop: string = "";
  @Input() positionLeft: string = "";
  @Input() dragwidth: string = "70%";
  dragable :string= ''

  draggableStyles :string = ""
  DragPopup :any = ''
  border :string = ''
  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    this.registerDragElement();

    if (this.positionTop) {
      this.DragPopup += "top: " + this.positionTop + ";";
    }
    if (this.positionLeft) {
      this.DragPopup += "left: " + this.positionLeft + ";";
    }

    if (this.border) {
      this.DragPopup += "border: " + this.border + ";";
    }
   
    
  }

  public registerDragElement() {
    const elmnt: any = document.getElementById('mydiv');
  
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
    const dragMouseDown = (e: any) => {
      e = e || window.event;
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    };
  
    const elementDrag = (e: any) => {
      e = e || window.event;
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
  
      // Calculate the new position of the element
      let newTop = elmnt.offsetTop - pos2;
      let newLeft = elmnt.offsetLeft - pos1;
  
      // Ensure the element stays within the visible area of the browser window
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
  
      if (newTop < 0) {
        newTop = 0;
      } else if (newTop + elmnt.offsetHeight > windowHeight) {
        newTop = windowHeight - elmnt.offsetHeight;
      }
  
      if (newLeft < 0) {
        newLeft = 0;
      } else if (newLeft + elmnt.offsetWidth > windowWidth) {
        newLeft = windowWidth - elmnt.offsetWidth;
      }
  
      // Set the element's new position:
      elmnt.style.top = newTop + 'px';
      elmnt.style.left = newLeft + 'px';
    };
  
    const closeDragElement = () => {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    };
  
    if (document.getElementById(elmnt.id + 'header')) {
      /* if present, the header is where you move the DIV from:*/
      const header = document.getElementById(elmnt.id + 'header');
      if (header) {
        header.onmousedown = dragMouseDown;
      }
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  }

}
