import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from "@angular/common";
import { HostListener, Renderer2, ElementRef } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { DateTime } from 'luxon';

@Component({
  selector: 'b2b-inputbox',
  templateUrl: './inputbox.component.html',
  styleUrls: ['./inputbox.component.css']
})
export class InputboxComponent implements OnInit {
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
  @Input() textIndent: any = "";



  
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
  @Input() right: string = "";
  @Input() top: string = "";
  @Input() triggerColorTheme: string = "--color-dark-grey";
  @Input() triggerBackgroundTheme: string = "--color-light-grey";
  @Input() triggerBackgroundThemeOne: string = "";
  @Input() triggerColorThemeOne: string = "--color-dark-grey";
  @Input() dropdownHeight: string = "";

  @Output() onChange = new EventEmitter();
  @Output() onChangee = new EventEmitter();

  @Output() Clicked = new EventEmitter();
  
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
  @Input() input_lable_font: any= '';

  date_lable:any = ''
  @Input() send_date:any=''
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
@Input() isTrueMonthDate :boolean = false;
maxDate: Date = new Date(); // Initialize maxDate with today's date
@HostBinding('style') hostStyles = "";
minDate: string;
@Input() Dateshow:any='DD-MMM-YYYY'
selectedDate2:any=''

@Input() multibleSearch:boolean = false
  ngOnInit(): void {

    if(this.send_date){
      this.Dateshow = this.send_date
    }else{
      this.dateTime()
      this.Dateshow = this.send_date
    }

    // this.Dateshow='DD-MMM-YYYY'
    if(this.flexDirection != 'column'){
      this.alignItem = "center"
    }
    this.maxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);


    this.updateStyles();
    this.onDateSelected_1(this.selectedDate)
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
    if(this.isTrueMonthDate == true){
      this.currentDate = this.parseUserDate(this.selectedDate)
    }else{
      this.currentDate = this.selectedDate 
    }
    
  }
  //try

  constructor(private renderer: Renderer2, private el: ElementRef,private datePipe: DatePipe,private AppserviceService: AppserviceService) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Adding 1 because months are zero-based
    const day = today.getDate();
    this.minDate = `${year}-${month >= 10 ? month : '0' + month}-${
      day >= 10 ? day : '0' + day
    }`;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (window.innerWidth < 600) {
      this.popupHeight = "160px";
     
    } else {
      this.popupHeight = "175px"; // Reset the height to default
    }
  } 

  // Method to handle date selection
  onDateSelected_1(selectedDate: Date) {
    // Update the minSelectableDate to tomorrow if today's date is selected
    if (selectedDate.getDate() === this.currentDate.getDate()) {
        this.selectedDate.setDate(this.currentDate.getDate() );
    } else {
        // Reset minSelectableDate to today's date if any other date is selected
        this.selectedDate = new Date();
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

  inputClickOpen(){
    if(this.popupOption == true || this.expandMore == true){
      this.dropdownClicked()
    }
    if(this.inputType == 'multi-search'){
      this.showDropdown = true
    }
  }

  outsideElementClicked() {
    this.showDropdown = false;
  }
  
  valueChange() {
    if (this.textTransform == "capitalize") {
      this.value = this.capitalizeFirstLetter(this.value);
    }

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
      // this.hostStyles += "height: " + this.height + ";";  //santhosh
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
    if(this.input_lable_font) {
      this.date_lable += "font-size: " + this.input_lable_font + ";";
    }
    if(this.backgroundTheme) {
      this.inputGroupStyles += "background-color: var(" + this.backgroundTheme + ");";
    }
    // if(this.textTransform) {
    //   this.inputBoxStyles += "text-transform:"  + this.textTransform + ";";
    // }
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
        // this.dropdownStyles += "right: 0;"; //santhosh
      } else {
        // this.dropdownStyles += "left: 0;"; //santhosh
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
//   onDateSelected(selectedDate: any): void {
//     console.log(selectedDate)
//     // Check if the selected date is before today
//     if (selectedDate.value < this.minDate) {
//         // If selected date is before today, reset to today's date
//         selectedDate.value = this.minDate;
//     }
    
//     // Format the selected date
//     const formattedDate = this.formatDate(selectedDate.input.value);
//     console.log(formattedDate)
//     // Emit the formatted date
//     this.onChange.emit(formattedDate);

//     // Log the formatted date for debugging or additional processing
//     console.log('Formatted Date:', formattedDate);
// }
onDateSelected(selectedDate: any): void {
   // Emit the formatted date
    this.onChange.emit(selectedDate);
}
  
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd-MMM-yyyy') || '';
    // return 'test'
  }

  // NORMAL DATE CHANGE
  parseUserDate(inputDate: string): any {
    // if (inputDate.includes('-')) {
      const parts = inputDate.split('-');
      const day = parseInt(parts[2], 10);
      const month:any = parts[1];
      const year = parseInt(parts[0], 10);
      return new Date(year, month - 1, day);
    // }
  }

  getMonthNumber(monthName: string): number {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.findIndex(month => month.toLowerCase() === monthName.toLowerCase()) + 1;
  }
  onDateChange(){
     console.log(this.selectedDate2)
     this.Dateshow = this.formatDate(this.selectedDate2)
     console.log(this.Dateshow)
     this.onDateSelected(this.Dateshow)
  }

  // FIRST LETTER CAPITALIZE
  capitalizeFirstLetter(value: string): string {
    if (!value) return value;
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  dateTime() {
    // Get current date and time using Luxon
    const currentDate = DateTime.local();
    // Get the month abbreviation
    const monthAbbreviation = currentDate.toFormat('LLL'); // 'LLL' gives the abbreviated month name
    // Format date in 'dd-MMM-yyyy' format
    const formattedDate = currentDate.toFormat('dd') + '-' + monthAbbreviation + '-' + currentDate.toFormat('yyyy hh:mm:ss a');
   const sendtodaydate = currentDate.toFormat('dd') + '-' + monthAbbreviation + '-' + currentDate.toFormat('yyyy');
    // Assign the formatted date to dateString
    // this.dateString = formattedDate;
    this.send_date = sendtodaydate;

  }
}
