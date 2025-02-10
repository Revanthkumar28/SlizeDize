import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {
  @Input() text: string = "";
  @Input() positionTop: string = "0";
  @Input() positionRight: string = "0";
  @Input() width: string = "";
  @Input() height: string = "";
  @Input() backgroundTheme: string = "";
  @Input() fontSize: string = "";


  positionLable : string = ''
  constructor() { }

  ngOnInit(): void {
    if (this.positionTop) {
      this.positionLable += "top: " + this.positionTop + ";";
    }
    if (this.positionRight) {
      this.positionLable += "right: " + this.positionRight + ";";
    }
    if (this.width) {
      this.positionLable += "width: " + this.width + ";";
    }
    if (this.height) {
      this.positionLable += "height: " + this.height + ";";
    }
    if (this.backgroundTheme) {
      this.positionLable += "background-color: var(" + this.backgroundTheme + ");";
    }
    if (this.fontSize) {
      this.positionLable += "font-size: " + this.fontSize + ";";
    }
  }

}
