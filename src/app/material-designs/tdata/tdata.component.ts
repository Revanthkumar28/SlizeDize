import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'b2b-tdata',
  templateUrl: './tdata.component.html',
  styleUrls: ['./tdata.component.css']
})
export class TdataComponent implements OnInit {
  @Input() title: any = "";
  @Input() borderColor: string = "";
  @Input() borderRadius: string = "";
  @Input() border: string = "";
  @Input() color: string = "";
  @Input() colorTheme: string = "";
  @Input() margin: string = "";
  @Input() backgroundTheme: string = "";
  @Input() fontSize: string = "";
  @Input() textTransform: string = "";
  @Input() height: string = "";
  @Input() width: string = "";
  @Input() alignItem: string = "";
  @Input() justifyContent: string = "";
  @Input() textAlign: string = "center";
  @Input() textWidth: string = "";
  @Input() contenteditable: boolean = false;
  @Input() headingWidth: string = "";
  @Input() toolTip: boolean = false;
  @Input() toolTipName: string = "";
  @Input() ifEditContent: boolean = false;
  @Input() padding: string = '';
  @Input() title2: string = '';
  @Input() flexDirection: string = 'row';

  @Input() borderTop: string = '';
  @Input() borderLeft: string = '';
  @Input() borderRight: string = '';
  @Input() borderBottom: string = '';
  @Input() dateFormet: string = '';

  @Input() doneIcon: boolean = false;
  @Input() editableValue : any = this.title
  @Input() bold: boolean = false;
  dataStyles: string = "";
  textStyles: string = "";

  @Output() onClick = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
    if(this.dateFormet != ''){
      this.title = this.formatDate(this.dateFormet)
    }

    if(this.borderColor) {
      this.dataStyles += "border: 2px solid var(" + this.borderColor + ");";
    }
    if(this.colorTheme) {
      this.textStyles += "color: var(" + this.colorTheme + ");";
    }
    if(this.color) {
      this.dataStyles += "color: var(" + this.color + ");";
    }
    if(this.margin) {
      this.dataStyles += "margin: " + this.margin + ";";
    }
    if(this.border) {
      this.dataStyles += "border: " + this.border + ";";
    }
    if(this.width) {
      this.dataStyles += "width: " + this.width + ";";
    }
    if(this.textTransform) {
      this.textStyles += "text-transform: " + this.textTransform + ";";
    }
    if(this.height) {
      this.dataStyles += "height: " + this.height + ";";
    }
    if(this.backgroundTheme) {
      this.dataStyles += "background-color: var(" + this.backgroundTheme + ");";
    }
    if(this.fontSize) {
      this.dataStyles += "font-size: " + this.fontSize + ";";
    }
    if(this.borderRadius) {
      this.dataStyles += "border-radius: " + this.borderRadius + ";";
    }
    if(this.bold) {
      this.dataStyles += "font-weight: bold;";
    }
    if(this.alignItem) {
      this.dataStyles += "align-items: " + this.alignItem + ";";
    }
    if(this.justifyContent) {
      this.dataStyles += "justify-content: " + this.justifyContent + ";";
    }
    if(this.flexDirection) {
      this.dataStyles += "flex-direction: " + this.flexDirection + ";";
    }
    if(this.textAlign) {
      this.textStyles += "text-align: " + this.textAlign + ";";
    }
    if(this.headingWidth){
      this.textStyles += "width: " + this.headingWidth + ";";
    }

    if(this.borderTop) {
      this.dataStyles += "border-top: " + this.borderTop + ";";
    }
    if(this.borderLeft) {
      this.dataStyles += "border-left: " + this.borderLeft + ";";
    }
    if(this.borderRight) {
      this.dataStyles += "border-right: " + this.borderRight + ";";
    }
    if(this.borderBottom) {
      this.dataStyles += "border-bottom: " + this.borderBottom + ";";
    }
    if(this.padding) {
      this.dataStyles += "padding: " + this.padding + ";";
    }

    if(this.textWidth) {
      this.textStyles += "width: " + this.textWidth + ";";
      this.textStyles += "overflow: hidden ;"; 
      this.textStyles += "text-overflow: ellipsis;";
      this.textStyles += "white-space: nowrap;";

    }
    
  }

  editableIcon(){
    if(this.contenteditable == true){
      this.doneIcon = !this.doneIcon 

    }
  }

  outsideElementClicked(){
    this.doneIcon = false
  }

  // submitIcon(){
  //   console.log('test-1')
  //   this.onClick.emit(this.editableValue);
  // }

  onContentChange(event:any) {
    this.editableValue = event.target.innerText;
    this.ifEditContent = true
    console.log(event.target.innerText)
  }

  clickedOutside(){
    // if(this.contenteditable == true && this.ifEditContent == true){
    //   this.onClick.emit(this.editableValue);
    // }

    // this.ifEditContent = false
  }

  // Date Formet
  formatDate(date:any) {
    // Parse the input date in 'dd-MM-yyyy' format
    console.log(date)
    let formattedDate = ''
    const parts = date.split('-');
    if (parts.length === 3) {
      const day = parts[2];
      const month = parts[1];
      const year = parts[0];
      
      // Convert the month numeric value to a three-letter abbreviation
      const monthAbbreviation = new Date(`${year}-${month}-01`)
        .toLocaleString('en-us', { month: 'short' });
      
      // Format the date as 'dd-MMM-yyyy'
       formattedDate = `${day}-${monthAbbreviation}-${year}`;

    } 

    return formattedDate
  }

}
