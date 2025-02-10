import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-drawer-list-tile',
  templateUrl: './drawer-list-tile.component.html',
  styleUrls: ['./drawer-list-tile.component.css']
})
export class DrawerListTileComponent implements OnInit {
  @Input() text: string = "";
  @Input() active: boolean = false;
  @Input() isExpand: boolean = false;
  @Input() isChild: boolean = false;
  @Input() width: string = "";
  @Input() height: string = "";
  @Input() required: boolean= false;
  @Input() backgroundTheme: string = "";
  @Input() colorTheme: string = "";
  @Input() margin: string = "";
  @Input() padding: string = "";
  @Input() fontSize: string = "";
  drawerStyle: string = "";

  childOpen : boolean = false;
  
  constructor() { }

  ngOnInit(): void {
    if(this.width) {
      this.drawerStyle += "width: " + this.width + ";";
    }
    if(this.fontSize) {
      this.drawerStyle += "font-size: " + this.fontSize + ";";
    }
    if(this.height) {
      this.drawerStyle += "height: " + this.height + ";";
    }
    if(this.backgroundTheme) {
      this.drawerStyle += "background-color: " + this.backgroundTheme + ";";
    }
    if(this.colorTheme) {
      this.drawerStyle += "color: " + this.colorTheme + ";";
    }
    if(this.margin) {
      this.drawerStyle += "margin: " + this.margin + ";";
    }
    if(this.padding) {
      this.drawerStyle += "padding: " + this.padding + ";";
    }
  }

  openChildren() {
    this.childOpen = !this.childOpen;
  }
}
