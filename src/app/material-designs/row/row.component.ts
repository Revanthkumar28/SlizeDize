import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent implements OnInit {
  @Input() height = "auto";
  @Input() width = "";
  @Input() minWidth = "";
  @Input() minheight = "";
  @Input() maxheight = "";

  @Input() maxWidth = "";

  @Input() widths = "";
  @Input() textAlign = "";
  @Input() alignItem = "center";
  @Input() borderRadius: string = "";
  
  @Input() justifyContent = "flex-start";
  @Input() wrap: boolean = false;
  @Input() margin = "";
  @Input() padding = "";
  @Input() backgroundTheme: string = "";
  @Input() border: string = "";
  @Input() position: string = "";
  @Input() positionTop: string = "";
  @Input() positionLeft: string = "";
  @Input() borderLeft: string = "";
  @Input() borderRight: string = "";
  @Input() borderTop: string = "";
  @Input() borderBottom: string = "";
  @Input() flexDirection: string = "";
  @Input() positionBottom: string = "";
  @Input() borderTopLeftRadius: string = "";
  @Input() borderTopRightRadius: string = "";
  @Input() positionRight: string = "";
  @Input() boxShadow: string = "";
  @Input() zIndex: string = "";
  @Input() fontSize: string = "";
  @Input() overflowX: string = "";
  @Input() overflowY: string = "";

  @Input() colorTheme: string = "";
  @Input() bold: boolean = false;
  @Input() mobileview: boolean = false;
  @Input() mobilewidth: boolean = false;
  @Input() gap: string = "";
  @Input() backgroundImage: string = "";

  rowStyles: string = "";
  @HostBinding("style") hostStyles = "";

  constructor() { }

  ngOnInit(): void {
    if(this.height) {
      this.rowStyles += "height: " + this.height + ";";
      this.hostStyles += "height: " + this.height + ";";
    }
    if(this.width) {   
      this.hostStyles += "width: " + this.width + ";";
    }
    if(this.minWidth) {   
      this.hostStyles += "min-width: " + this.minWidth + ";";
    }
    if(this.minheight) {   
      this.hostStyles += "min-height: " + this.minheight + ";";
    }
    if(this.maxheight) {   
      this.hostStyles += "max-height: " + this.maxheight + ";";
    }
    if(this.maxWidth) {   
      this.hostStyles += "max-width: " + this.maxWidth + ";";
    }
    if(this.widths) {   
      this.rowStyles += "width: " + this.widths + ";";
    }
    if(this.gap) {
      this.rowStyles += "gap: " + this.gap + ";";
    }
    if(this.borderRadius) {
      this.rowStyles += "border-radius: " + this.borderRadius + ";";
    }
    if(this.textAlign) {
      this.rowStyles += "text-align: " + this.textAlign + ";";
    }


    if(this.alignItem) {
      this.rowStyles += "align-items: " + this.alignItem + ";";
    }

    if(this.justifyContent) {
      this.rowStyles += "justify-content: " + this.justifyContent + ";";
    }
    if(this.margin) {
      this.rowStyles += "margin: " + this.margin + ";";
    }
    if(this.position) {
      this.rowStyles += "position: " + this.position + ";";
    }
    if(this.positionBottom) {
      this.rowStyles += "bottom: " + this.positionBottom + ";";
    }
    if(this.positionRight) {
      this.rowStyles += "right: " + this.positionRight + ";";
    }
    if(this.positionTop) {
      this.rowStyles += "top: " + this.positionTop + ";";
    }
    if(this.positionLeft) {
      this.rowStyles += "left: " + this.positionLeft + ";";
    }
    if(this.borderLeft) {
      this.rowStyles += "border-left: " + this.borderLeft + ";";
    }
    if(this.borderRight) {
      this.rowStyles += "border-right: " + this.borderRight + ";";
    }
    if(this.borderTop) {
      this.rowStyles += "border-top: " + this.borderTop + ";";
    }
    if(this.borderBottom) {
      this.rowStyles += "border-bottom: " + this.borderBottom + ";";
    }
    if(this.backgroundImage) {
      this.rowStyles += "background-image: var(" + this.backgroundImage + ");";
    }
    if(this.borderTopLeftRadius) {
      this.rowStyles += "border-top-left-radius: " + this.borderTopLeftRadius + ";";
    }
    if(this.borderTopRightRadius) {
      this.rowStyles += "border-top-right-radius: " + this.borderTopRightRadius + ";";
    }
    if(this.overflowX) {
      this.rowStyles += "overflow-x:" + this.overflowX + ";";
    }
    if(this.overflowY) {
      this.rowStyles += "overflow-y:" + this.overflowY + ";";
    }
   
    if(this.padding) {
      this.rowStyles += "padding: " + this.padding + ";";
    }
    if(this.boxShadow) {
      this.rowStyles += "box-shadow: " + this.boxShadow + ";";
    }

    if(this.wrap) {
      this.rowStyles += "flex-wrap: wrap;";
    }
    if(this.backgroundTheme) {
      this.rowStyles += "background-color: var(" + this.backgroundTheme + ");";
    }
    if(this.zIndex) {
      this.rowStyles += "z-index: " + this.zIndex + ";";
    }
    if(this.flexDirection) {
      this.rowStyles += "flex-direction: " + this.flexDirection + ";";
    }
    if(this.fontSize) {
      this.rowStyles += "font-size: " + this.fontSize + ";";
    }
    if(this.colorTheme) {
      this.rowStyles += "color: var(" + this.colorTheme + ");";
    }
    if(this.bold) {
      this.rowStyles += "font-weight: bold;"
    }
  }
  ngOnChanges(){
    if(this.border) {
      this.rowStyles += "border: " + this.border + ";";
    }
  }

}
