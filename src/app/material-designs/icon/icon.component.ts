import { Component, Input, OnInit,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'b2b-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() width = "";
  @Input() padding = "";
  @Input() margin = "";

  @Input() icon = "";
  @Input() justifyContent = "";
  
  @Input() fontSize: any = '';
  @Input() backgroundTheme: string = "";
  @Input() position: string = "";
  @Input() top: string = "";
  @Input() left: string = "";
  @Input() bottom: string = "";
  @Input() borderRadius: string = "";
  @Input() colorTheme: string = "";
  @Input() isRounded: boolean = false;
 iconStyle: string = "";

 @Output() onPressed = new EventEmitter();

constructor() { }

  ngOnInit(): void {
    if(this.fontSize) {
      this.iconStyle += "font-size: " + this.fontSize + ";";
    }
    if(this.padding) {
      this.iconStyle += "padding: " + this.padding + ";";
    }
    if(this.margin) {
      this.iconStyle += "margin: " + this.margin + ";";
    }
    if(this.position) {
      this.iconStyle += "position: " + this.position + ";";
    }
    if(this.top) {
      this.iconStyle += "top: " + this.top + ";";
    }
    if(this.bottom) {
      this.iconStyle += "bottom: " + this.bottom + ";";
    }
    if(this.justifyContent) {
      this.iconStyle += "justify-content: " + this.justifyContent + ";";
    }
    if(this.left) {
      this.iconStyle += "left: " + this.left + ";";
    }
    if(this.borderRadius) {
      this.iconStyle += "border-radius: " + this.borderRadius + ";";
    }
    if(this.backgroundTheme) {
      this.iconStyle += "background-color: var(" + this.backgroundTheme + ");";
    }
    if(this.isRounded) {
      this.iconStyle += "border-radius: 50%;";
    }
    if(this.colorTheme) {
      this.iconStyle += "color: var(" + this.colorTheme + ");";
    }
    if(this.width) {
      this.iconStyle += "width: " + this.width + ";";
      this.iconStyle += "height: " + this.width + ";";
    }
  }

  iconPressed() {
    this.onPressed.emit();
  }

}