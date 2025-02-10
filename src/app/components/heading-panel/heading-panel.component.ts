import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-heading-panel',
  templateUrl: './heading-panel.component.html',
  styleUrls: ['./heading-panel.component.css']
})
export class HeadingPanelComponent implements OnInit {
  @Input() title: string = "";
  @Input() height: string = "";
  @Input() fontSize: string = "";
  @Input() width: string = "";
  headingPanelStyle:string=''
  headingTitlePanel:string=''
  constructor() { }

  ngOnInit(): void {
    if(this.height) {
      this.headingPanelStyle += "height: "  + this.height;
    }
    if(this.fontSize) {
      this.headingTitlePanel += "font-size: "  + this.fontSize;
    }
    if(this.width) {
      this.headingTitlePanel += "width: "  + this.width;
    }
  }

}
