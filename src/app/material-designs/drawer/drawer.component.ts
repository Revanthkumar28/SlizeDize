import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  @Input() backgroundTheme: string = "--color-primary";
  @Input() backgroundSecondary: string = "";

  drawerStyle: string = "";

  constructor() { }

  ngOnInit(): void {
    if(this.backgroundTheme && this.backgroundSecondary) {
      this.drawerStyle += "background: linear-gradient(to bottom, var(" + this.backgroundTheme + "), var(" + this.backgroundSecondary + "));"
    } else if (this.backgroundTheme) { 
      this.drawerStyle += "background-color: var(" + this.backgroundTheme + ");";
    }
  }

}
