import { Component, HostBinding,Output,EventEmitter, Input, OnInit,HostListener } from '@angular/core';

@Component({
  selector: 'b2b-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() width: string = "210px";
  @Input() maxheight: string = "";
  @Input() height: string = "";
  @Input() overflow: string = "scroll";
  @Input() position: string = "";
  @Input() top: string = "";
  @Input() left: string = "";
  @Input() alignItem: string = "";
  @Input() padding: string = "";
  @Input() overflowY :String ="";
  @Input() overflowX :String ="hidden";

  popupStyles: string = "";
  @HostBinding('style') hostStyles = "";


  @Output() onSelectValue = new EventEmitter();

  constructor() { }



  @Input() dropdownItems: any[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  selectedItem: string = '';
  isOpen = false;

  @Input() arrowKey :boolean = false
  @Input() popUpValues :any = []

  options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  selectedIndex: number = -1;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      this.selectedIndex = Math.min(this.selectedIndex + 1, this.popUpValues.length - 1);
    } else if (event.key === 'ArrowUp') {
      this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
    }
  }

  ngOnInit(): void {
 
    if(this.width) {
      this.popupStyles += "width: " + this.width + ";";
      this.hostStyles += "width: " + this.width + ";";
    }
    if(this.maxheight) {
      this.popupStyles += "max-height: " + this.maxheight + ";";
      // this.hostStyles += "height: " + this.height + ";";
    }
    if(this.overflowY) {
      this.popupStyles += "overflow-y: " + this.overflowY + ";";
    }
    if(this.overflowX) {
      this.popupStyles += "overflow-x: " + this.overflowX + ";";
    }
    if(this.overflow) {
      this.popupStyles += "overflow: " + this.overflow + ";";
    }
    if(this.padding) {
      this.popupStyles += "padding: " + this.padding + ";";
    }
    if(this.height) {
     this.popupStyles += "height: " + this.height + ";";
    }
    if(this.alignItem) {
      this.popupStyles += "align-items: " + this.alignItem + ";";
     }
     if(this.position) {
      this.popupStyles += "position: " + this.position + ";";
     }
     if(this.top) {
      this.popupStyles += "top: " + this.top + ";";
     }
     if(this.left) {
      this.popupStyles += "left: " + this.left + ";";
     }
  }

  

  onInputKeyDown(event: KeyboardEvent) {
    event.stopPropagation(); // Prevent arrow keys from triggering the dropdown list
  }

  seletedValue(selectedValue:any){
    
      this.onSelectValue.emit(selectedValue);
    
  }

}
