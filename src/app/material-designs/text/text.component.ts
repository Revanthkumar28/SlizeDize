import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @Input() text: string = "";
  @Input() padding: string = "";
  @Input() margin: string = "";
  @Input() marginLeft: string = "";
  

  @Input() textAlign: string = "";
  @Input() width: string = "";
  @Input() height: string = "";

 
  @Input() bold: boolean = false;
  @Input() fontSize: string = "16px";
  @Input() colorTheme: string = "--color-black";
  @Input() backgroundTheme: string = "";
  @Input() borderBottom: string = "";
  @Input() borderRadius: string = "";
  @Input() required: boolean = false;

  textStyle: string = "";

  @Input() position: string = "";
  @Input() positionLeft: string = "";
  @Input() positionTop: string = "";
 

 

  constructor() { }

  ngOnInit(): void {
    if(this.bold) {
      this.textStyle += "font-weight: bold;";
    }
    if(this.textAlign) {
      this.textStyle += "text-align: " + this.textAlign + ";";
    }
    if(this.padding) {
      this.textStyle += "padding: " + this.padding + ";";
    }
    if(this.margin) {
      this.textStyle += "margin: " + this.margin + ";";
    }
    if(this.marginLeft) {
      this.textStyle += "margin-left: " + this.marginLeft + ";";
    }
    if(this.fontSize) {
      this.textStyle += "font-size: " + this.fontSize + ";";
    }
    if(this.width) {
      this.textStyle += "width: " + this.width + ";";
    }
    if(this.height) {
      this.textStyle += "height: " + this.height + ";";
    }
    if(this.colorTheme) {
      this.textStyle += "color: var(" + this.colorTheme + ");";
    }
    if(this.backgroundTheme) {
      this.textStyle += "background-color: var(" + this.backgroundTheme + ");";
    }
    if(this.borderBottom) {
      this.textStyle += "border-bottom: " + this.borderBottom + ";";
    }

    if(this.borderRadius) {
      this.textStyle += "border-radius: " + this.borderRadius + ";";
    }

    if(this.position) {
      this.textStyle += "position: " + this.position + ";";
    }

    if(this.positionLeft) {
      this.textStyle += "left: " + this.positionLeft + ";";
    }

    if(this.positionTop) {
      this.textStyle += "top: " + this.positionTop + ";";
    }
  }
 

}
