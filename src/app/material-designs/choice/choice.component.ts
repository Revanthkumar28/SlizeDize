import { Component,EventEmitter, Input, OnInit,Output } from '@angular/core';

@Component({
  selector: 'b2b-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {
  @Input() group: string = "";
  @Input() name: string = "";
  @Input() fontSize: string = "";
  @Input() borderBottom: string = "";
  @Input() height: string = "50px";
  @Input() alignItem: string = "";

  @Input() width: string = "";

  @Input() radioType: string = "radio";
  @Input() colorTheme: string = "";

  @Input() checked: boolean = false;
  choiseStyle: string = "";
  choiseStyles: string = "";

  @Output() clickRadio = new EventEmitter();


  constructor() { }
  
  ngOnInit(): void {
    if(this.fontSize) {
      this.choiseStyle += "font-size: "  + this.fontSize;
    }
    if(this.borderBottom) {
      this.choiseStyle += "border-bottom: " + this.borderBottom;
    }
    if(this.height) {
      this.choiseStyles += "height: " + this.height +";";
    }
    if(this.alignItem) {
      this.choiseStyles += "align-items: " + this.alignItem +";";
    }
    if(this.colorTheme) {
      this.choiseStyles += "color: var(" + this.colorTheme + ");";
    }
  
  }

  radio(){
    this.clickRadio.emit();
  }


}
