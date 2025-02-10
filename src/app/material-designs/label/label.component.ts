import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {
  @Input() text: string = "";
  @Input() backgroundTheme: string = "--color-primary";
  @Input() colorTheme: string = "--color-white";
  @Input() width: string = "";
  @Input() padding: string = "";
  @Input() margin: string = "";
  @Input() borderRadius: string = "";
  @Input() border: string = "";
  @Input() height: string = "";
  @Input() isCurved: boolean = false;
  @Input() isRounded: boolean = false;
  @Input() fontSize: string = "";
  @Input() center: boolean = false;


  labelStyle: string = "";
  @HostBinding("style") hostStyle = "";

  constructor() { }

  ngOnInit(): void {
    this.updateStyles();
  }

  ngOnChanges() {
    this.updateStyles();
  }

  updateStyles() {
    if(this.backgroundTheme) {
      this.labelStyle += "background-color: var(" + this.backgroundTheme + ");";
    }

    if(this.colorTheme) {
      this.labelStyle += "color: var(" + this.colorTheme + ");";
    }
    
    if(this.width) {
      this.labelStyle += "width: " + this.width + ";";
      this.hostStyle += "width: " + this.width + ";";
    }

    if(this.height) {
      this.labelStyle += "height: " + this.height + ";";
    }
    if(this.padding) {
      this.labelStyle += "padding: " + this.padding + ";";
    }
    if(this.margin) {
      this.labelStyle += "margin: " + this.margin + ";";
    }
    if(this.border) {
      this.labelStyle += "border: " + this.border + ";";
    }

    if(this.isCurved) {
      this.labelStyle += "border-radius: var(--table-radius);";
    }

    if(this.isRounded) {
      this.labelStyle += "border-radius: 40px;";
    }

    if(this.fontSize) {
      this.labelStyle += "font-size: " + this.fontSize + ";";
    }
    if(this.borderRadius) {
      this.labelStyle += "border-radius: " + this.borderRadius + ";";
    }
    if(this.center) {
      this.labelStyle += "justify-content: center;";
    }
  }
}
