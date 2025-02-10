import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.css']
})
export class SpacerComponent implements OnInit {
  @Input() width: string = "0px"; //Width in pixels
  @Input() height: string = "0px";
  @Input() minHeight: string = "0px";
  @Input() display: string = "";
  @Input() flex: number = 0; //Flex in number

  @HostBinding("style") hostStyle = "";

  constructor() { }

  ngOnInit(): void {
    this.hostStyle = "";

    if(this.width) {
       this.hostStyle += "width: " + this.width + ";";
    } 
    if (this.flex) {
      this.hostStyle += "flex: " + this.flex + ";";
    }
    if(this.height) {
      this.hostStyle += "height: " + this.height + ";";
    }
    if(this.height) {
      this.hostStyle += "min-height: " + this.minHeight + ";";
    }
    if(this.display) {
      this.hostStyle += "display: " + this.display + ";";
    }
  }

}
