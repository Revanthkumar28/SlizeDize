import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'b2b-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit {
  @Input() icon: string = "";
  @Input() text: string = "";
  @Input() padding: string = "";
  @Input() margin: string = "";
  @Input() colorTheme: string = "";
  @Input() backgroundTheme: string = "";
  @Input() fontSize: string = "";
  @Input() isRounded: boolean = false;
  @Input() isDotted: boolean = false;
  @Input() isCurved: boolean = false;
  @Input() borderRadius: string = '';
  @Input() toolTipName: string = 'Test';
  @Input() toolTip: boolean = false;
  @Input() tooltiptop:boolean=false;

  @Input() iconSize: string = "28px";
  @Input() width: string = "40px";
  @Input() tabIndexIcon : boolean = false
  @Output() onPressed = new EventEmitter();

  iconStyle: string = "";
  iconTheme: string = "";

  constructor() { }

  ngOnInit(): void {
    if(this.colorTheme.length > 0) {
      this.iconStyle += "color: var(" + this.colorTheme + ");";
    }
   

    if(this.backgroundTheme.length > 0) {
      this.iconStyle += "background-color: var(" + this.backgroundTheme + ");";
    }
    if(this.borderRadius) {
      this.iconStyle += "border-radius:" + this.borderRadius + ";";
      
    }

    if(this.isRounded) {
      this.iconStyle += "border-radius: 50%;";
    }

    if(this.isDotted) {
      this.iconStyle += "border-style: dotted;";
    }

    if(this.isCurved) {
      this.iconStyle += "border-radius: 10px;";
    }

    if(this.width) {
      this.iconStyle += "width: " + this.width + ";";
      this.iconStyle += "height: " + this.width + ";";
    }
    if(this.padding) {
      this.iconStyle += "padding: " + this.padding + ";";
      
    }
    if(this.margin) {
      this.iconStyle += "margin: " + this.margin + ";";
      
    }

    if(this.iconSize) {
      this.iconTheme += "font-size: " + this.iconSize;
    }
    if(this.fontSize) {
      this.iconStyle += "font-size: " + this.fontSize;
    }
    
  }

  buttonClicked() {
    this.onPressed.emit("");
  }
}
