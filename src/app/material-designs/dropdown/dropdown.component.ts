import { Component, Input, OnInit , ElementRef ,Renderer2,OnDestroy } from '@angular/core';

@Component({
  selector: 'b2b-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Input() popupWidth: string = "";
  @Input() width: string = "";
  @Input() height: string = "";

  @Input() backgroundTheme: string = "";
  @Input() borderRadius: string = "5px";
  
  @Input() border: string = " ";

  @Input() text: string = " ";
  @Input() dropdownWithLable: boolean = false;

  @Input() alignItem: string = "";
  @Input() zIndex: string = "100";
  @Input() dropdownPosition: string = "left";
  @Input() padding: string = "";
  @Input() margin: string = "";
  @Input() paddingConatiner: string = "";
  @Input() marginContainer: string = "";
  @Input() isPopupOpen: boolean = false;
  dropdownStyles: string = "";
  @Input() dropdownLeft: string = "";
  @Input() position: string = "";
  @Input() dropdownRight: string = "";
  @Input() dropdownBottom: string = "";
  @Input() dropdownTop: string = "";
  @Input() popupMaxiHeight: string = "";
  @Input() overflow: string = "scroll";
  // @Input() height:string=""
  @Input() popupHeight: string = "auto";
  @Input() isEditPopup: boolean = false;

  @Input() maxheight: string = "200px";
  dropdownContainerStyle: string = ''

  @Input() isInsideClickFalsePopup: boolean = true;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.paddingConatiner) {
      this.dropdownContainerStyle += "padding: " + this.paddingConatiner + ";";
    }
    if (this.marginContainer) {
      this.dropdownContainerStyle += "margin: " + this.marginContainer + ";";
    }
    if (this.padding) {
      this.dropdownStyles += "padding: " + this.padding + ";";
    }
    if (this.width) {
      this.dropdownContainerStyle += "width: " + this.width + ";";
    }
    if (this.height) {
      this.dropdownContainerStyle += "height: " + this.height + ";";
    }
    if (this.borderRadius) {
      this.dropdownContainerStyle += "border-radius: " + this.borderRadius + ";";
    }
    if (this.border) {
      this.dropdownContainerStyle += "border :" + this.border + ";";
    }
    
    if (this.backgroundTheme) {
      this.dropdownContainerStyle += "background-color: var(" + this.backgroundTheme + ");";
    }
    if (this.margin) {
      this.dropdownStyles += "margin: " + this.margin + ";";
    }
    if (this.zIndex) {
      this.dropdownStyles += "z-index: " + this.zIndex + ";";
    }
    if (this.dropdownTop) {
      this.dropdownStyles += "top: " + this.dropdownTop + ";";
    }
    if (this.dropdownLeft) {
      this.dropdownStyles += "left: " + this.dropdownLeft + ";";
    }
    if (this.position) {
      this.dropdownStyles += "position: " + this.position + ";";
    }
    if (this.dropdownRight) {
      this.dropdownStyles += "right: " + this.dropdownRight + ";";
    }
    if (this.dropdownBottom) {
      this.dropdownStyles += "bottom: " + this.dropdownBottom + ";";
    }

    if (this.dropdownPosition == "left") {
      this.dropdownStyles += "left: 0;";
    } else {
      this.dropdownStyles += "right: 0;";
    }
  }

  private globalClickListener: (() => void) | null = null;
  dropdownClicked() {
    this.isPopupOpen = !this.isPopupOpen;
  }

  private removeGlobalClickListener(): void {
    if (this.globalClickListener) {
      this.globalClickListener();
      this.globalClickListener = null;
    }
  }

  ngOnDestroy(): void {
    // Clean up the global click listener if the component is destroyed
    this.removeGlobalClickListener();
  }

  clickedOutside() {
    this.isPopupOpen = false;
  }

  dropdownItemsClicked() {
    if(this.isInsideClickFalsePopup == true){
      this.isPopupOpen = false;
    }
  }
}
