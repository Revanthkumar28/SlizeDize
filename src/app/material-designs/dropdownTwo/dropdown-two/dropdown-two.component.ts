import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'b2b-dropdown-two',
  templateUrl: './dropdown-two.component.html',
  styleUrls: ['./dropdown-two.component.css']
})
export class DropdownTwoComponent implements OnInit {
  @Input() popupWidth: string = "";
  @Input() alignItem: string = "";
  @Input() zIndex: string = "100";
  @Input() dropdownPosition: string = "left";
  @Input() padding: string = "";
  @Input() paddingConatiner: string = "";
  @Input() marginContainer: string = "";
  @Input() dropdown_two: boolean = true;
  @Input() dropdown_one: boolean = false;
  @Input() isPopupOpen: boolean = false;
  dropdownStyles: string = "";
  @Input() dropdownLeft: string = "";
  @Input() position: string = "";
  @Input() dropdownRight: string = "38%";
  @Input() dropdownBottom: string = "";
  @Input() dropdownTop: string = "";
  @Input() popupMaxiHeight: string = "";
  @Input() alertPopWidth: string = "";
   @Input() popupPadding:string=""
   @Input() backgroundColor:string=""
  @Input() popupHeight: string = "200px";
  @Input() minWidth: string = "auto";

  dropdownContainerStyle:string=''
  dropdownStyles_hover:string=""
  @Input() hedaing:boolean=false
  isChange :boolean =false

  @Input() topHover:boolean =true
  constructor() { }

  ngOnInit(): void {
    
    if(this.paddingConatiner) {
      this.dropdownContainerStyle += "padding: " + this.paddingConatiner + ";";
     } 

    if(this.marginContainer) {
      this.dropdownContainerStyle += "margin: " + this.marginContainer + ";";
    } 

    if(this.padding) {
      this.dropdownStyles += "padding: " + this.padding + ";";
    } 

     if(this.zIndex) {
      this.dropdownStyles += "z-index: " + this.zIndex + ";";
    }

    if(this.backgroundColor) {
      this.dropdownStyles_hover += "background-color: " + this.backgroundColor + ";";
    }

    if(this.dropdownTop) {
      this.dropdownStyles += "top: " + this.dropdownTop + ";";
    }

    if(this.dropdownLeft) {
        this.dropdownStyles += "left: " + this.dropdownLeft + ";";
    } 

    if(this.position) {
      this.dropdownStyles += "position: " + this.position + ";";
  } 

    if(this.dropdownRight) {
      this.dropdownStyles += "right: " + this.dropdownRight + ";";
    } 

    if(this.dropdownBottom) {
      this.dropdownStyles += "bottom: " + this.dropdownBottom + ";";
    } 

    if(this.minWidth) {
      this.dropdownStyles += "min-width: " + this.minWidth + ";";
    } 
   
  }
  openClick() {
    if(this.topHover == true){
      this.hedaing = true;
    }
    
  }

  closeClick() {
    this.hedaing = false;
  }

  dropdownClicked() {
    this.isPopupOpen = !this.isPopupOpen;
    this.isChange =true
  }

  clickedOutside() {
    this.isPopupOpen = false;
  }

  dropdownItemsClicked() {
    this.isPopupOpen = false;
    this.isChange =false
  }

  outsideElementClicked(){
    this.isPopupOpen = false
  }

}