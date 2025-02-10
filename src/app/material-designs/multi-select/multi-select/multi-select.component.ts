import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from "@angular/common";
import { HostListener, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'b2b-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {

  @Input() inputType: string = "text";
  @Input() min: any = 0;
  @Input() iconClick: boolean = false;
  @Input() icon: any = "";
  @Input() popupPosition: any = "";
  @Input() poppupTop: any = "";
  @Input() iconWidth: string = "30px";
  @Input() iconSize: string = "30px";
  @Input() alignItem: any = 'flex-start';
  @Input() popupAlignItem: any = 'center';
  @Input() inputboxPadding: string = "0 var(--global-padding)";
  @Input() width: any = "100%";
  @Input() popWidth: string = "100px";
  @Input() titleWidth: string = "260px";
  @Input() arrayValue: any = [];

  @Input() dropdownWidth: string = "";
  @Input() popupTure: boolean = false;
  @Input() readOnly: boolean = false;
  @Input() addInput: boolean = false;
  @Input() popupValue: any = '';
  @Input() autoFocus: any = '';
  @Input() name: any = '';
  @Input() index: any = '';
  @Input() boxShadow: any = '';
  @Input() flexDirection :string = 'column';

  @Input() borderRadius: string = "";
  @Input() padding: string = "";
  @Input() height: string = "75px";
  @Input() fontSize: string = "";
  @Input() value: any = "";
  @Input() inputName: string = "";
  @Input() placeholder: string = "";
  @Input() popupOption: boolean = false;
  @Input() bold: boolean = false;
  @Input() labelFontSize: string = "";
  @Input() margin: string = "";
  @Input() backgroundTheme: string = "--color-white";
  @Input() colorTheme: string = "";
  @Input() popupHeight: string = "200px";
  @Input() popupWidth: string = "";
  @Input() popupOverflow: any = 'scroll';

  @Input() textTransform: string = "";
  @Input() inputboxFontSize: string = "";
  @Input() inputboxWidth: string = "";
  @Input() inputboxMargin: string = "";
  @Input() inputboxTextalign: string = "";
  @Input() border: string = "";
  @Input() disabled: boolean = false;
  @Input() position: string = "left";
  @Input() left: string = "";
  @Input() right: string = "0";
  @Input() top: string = "";
  @Input() triggerColorTheme: string = "--color-dark-grey";
  @Input() triggerBackgroundTheme: string = "--color-light-grey";
  @Input() triggerBackgroundThemeOne: string = "";
  @Input() triggerColorThemeOne: string = "--color-dark-grey";
  @Input() dropdownHeight: string = "";

  @Output() onChange = new EventEmitter();
  @Output() onChangee = new EventEmitter();

  @Output() Clicked = new EventEmitter();
  @Output() cencelMulti = new EventEmitter();

  @Input() label: boolean = false;
  @Input() title: any = '';
  @Input() filter: boolean= false;
  @Input() filterValue: string= '';

  @Input() Input_1: boolean= true;
  @Input() twoInputFeild:boolean =false;
  @Input() Input_3: boolean= false;
  @Input() errorMsg: string= '';
  @Input() required: boolean= false;
  @Input() dropDownValues: any= [];
 
 
  inputStyles: string = "";
  titleStyles: string = "";
  inputGroupStyles: string = "";
  inputBoxStyles: string = "";
  dropdownStyles: string = "";
  iconStyle:string=""

// for drodown Icon

dropDownIcon:string = ''
@Input() dropDownIconMargin: string = '0 1rem 0 0';
@Input() inputDropDownIconWidth: string = '30px';


@Input() showDropdown: boolean = false;
@Input() expandMore: boolean = false
@Input() selectedDate:any = new Date()
currentDate = new Date(this.selectedDate);

@HostBinding('style') hostStyles = "";

  ngOnInit(): void {
    
    if(this.flexDirection != 'column'){
      this.alignItem = "center"
    }

    this.updateStyles();
    
    // this.focusOn();
    if(this.twoInputFeild == true){
      this.Input_1 = false
      this.Input_3 = false
    }

    if(this.Input_3 == true){
      this.twoInputFeild = false
      this.Input_1 = false
    }
    this.onResize(null);
    this.currentDate = this.selectedDate
  }
  //try

  constructor(private renderer: Renderer2, private el: ElementRef,private datePipe: DatePipe) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 600) {
      this.popupHeight = "160px";
     
    } else {
      this.popupHeight = "175px"; // Reset the height to default
     
    }
  } 

  focusOn(fieldName:any) {
    const commmentBoxes = document.querySelectorAll(`textarea[ng-reflect-name="update-${fieldName}"]`);
    for( let i in commmentBoxes) {
        const element: any = commmentBoxes[i];
        const attributs = element.attributes;
        for(let j in attributs) {
            const attribute = attributs[j];
            if (attribute.nodeName === 'ng-reflect-name' && attribute.nodeValue === `update-${fieldName}`) {
                element.focus();
            }

        }

    }

}

  ngOnChanges() {
    this.updateStyles();
  }

  buttonClicked() {
    this.showDropdown=false;
  }

  dropdownClicked() {
    this.showDropdown = !this.showDropdown;
    this.popWidth = this.flexDirection === 'row' ? this.popupWidth : this.width
  }

  outsideElementClicked() {
    this.showDropdown = false;
  }
  
  valueChange() {
    this.onChange.emit(this.value);
  }
  search() {
    this.onChangee.emit(this.filterValue);
  }

  // dropdown select value 
  dropDownSelectedValue(event:any){
    this.onChange.emit(event);
    console.log(event)
  }

  updateStyles() {
    
    if(this.width) {
      this.inputStyles += "width: " + this.width + ";";
      this.hostStyles += "width: " + this.width + ";";
    }

     
    if(this.dropdownWidth) {
      this.dropdownStyles += "width: " + this.dropdownWidth + ";";
     
    }
    if(this.boxShadow) {
      this.inputStyles += "box-shadow: " + this.boxShadow + ";";
     
    }
  
    if(this.inputboxWidth) {
      this.inputBoxStyles += "width: " + this.inputboxWidth + ";";
     }

     if(this.titleWidth) {
      this.titleStyles += "width: " + this.titleWidth + ";";
     }

     if(this.inputboxTextalign) {
      this.inputBoxStyles += "text-align: " + this.inputboxTextalign + ";";
     }

    if(this.padding) {
      this.inputStyles += "padding: " + this.padding+ ";";
    }

    if(this.alignItem) {
      this.inputStyles += "align-items: " + this.alignItem+ ";";
    }

    if(this.height) {
      this.inputStyles += "height: " + this.height + ";";
      this.hostStyles += "height: " + this.height + ";";
    }
    if(this.fontSize) {
      this.inputStyles += "font-size: " + this.fontSize + ";";
    }

    if(this.flexDirection) {
      this.inputStyles += "flex-direction: " + this.flexDirection + ";";
    }

    if(this.inputboxFontSize) {
      this.inputBoxStyles += "font-size: " + this.inputboxFontSize + ";";
    }
    if(this.margin) {
      this.hostStyles += "margin: " + this.margin + ";";
    }
    if(this.inputboxMargin) {
      this.inputBoxStyles += "margin: " + this.inputboxMargin + ";";
    }
    if(this.bold) {
      this.titleStyles += "font-weight: bold;";
    }
    if(this.labelFontSize) {
      this.titleStyles += "font-size: " + this.labelFontSize + ";";
    }
    if(this.backgroundTheme) {
      this.inputGroupStyles += "background-color: var(" + this.backgroundTheme + ");";
    }
    if(this.textTransform) {
      this.inputBoxStyles += "text-transform:"  + this.textTransform + ";";
    }
    if(this.colorTheme) {
      this.inputGroupStyles += "color: var(" + this.colorTheme + ");";
      this.inputBoxStyles += "color: var(" + this.colorTheme + ");";
    }
    if(this.border) {
      this.inputGroupStyles += "border: " + this.border + ";";
    }
    if(this.borderRadius) {
      this.inputGroupStyles += "border-radius: " + this.borderRadius + ";";
    }
    if(this.inputboxPadding) {
      this.inputBoxStyles += "padding: " + this.inputboxPadding + ";";
    }
    if(this.dropdownHeight) {
      this.dropdownStyles += "min-height: " + this.dropdownHeight + ";";
    }
    if(this.left) {
      this.dropdownStyles += "left: " + this.left + ";";
    }
    if(this.right) {
      this.dropdownStyles += "right: " + this.right + ";";
    }
    if(this.top) {
      this.dropdownStyles += "top: " + this.top + ";";
    }

    
    
    if(this.position) {
      if(this.position == "right") {
        this.dropdownStyles += "right: 0;";
      } else {
        this.dropdownStyles += "left: 0;";
      }
    }

    // For dropDown Icon

    if(this.dropDownIconMargin) {
      this.dropDownIcon += "margin: " + this.dropDownIconMargin + ";";
    }

   

  }

  
  numericPattern = /^[0-9]*$/;
  //   numericOnly({ event }: { event: any; }){
  //     return this.numericPattern.test(event.key);
  // }
  numericOnly(event: any){
    return this.numericPattern.test(event.key);
  }

  // date formet
  onDateSelected(selectedDate: any): void {
    console.log('Test :' + selectedDate.input.value );
    const formattedDate = this.formatDate(selectedDate.input.value);
    this.onChange.emit(formattedDate);
  
      console.log(formattedDate)
    // You can do additional processing or store the selected date as needed.
  }
  
  // onDateTimeChange() {
  //   const selectedDate = this.currentDate;
  //   const formattedDate = this.formatDate(selectedDate);
  //   console.log('Selected Date:', formattedDate);
  
  //   // If you need to emit the formatted date, you can uncomment the following lines
  //   // const dateTime = {
  //   //   date: formattedDate
  //   // };
  //   // this.dateTime.emit(dateTime);
  // }
  
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd-MMM-yyyy') || '';
    // return 'test'
  }

  cencel(index:any){
    this.arrayValue.splice(index, 1);

  }

}
