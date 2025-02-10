import { Component, Input,Output, OnInit,EventEmitter } from '@angular/core';

@Component({
  selector: 'b2b-drawer-list',
  templateUrl: './drawer-list.component.html',
  styleUrls: ['./drawer-list.component.css']
})
export class DrawerListComponent implements OnInit {
  @Input() text: string = "";
  @Input() active: boolean = false;
  @Input() isExpand: boolean = false;
  @Input() isChild: boolean = false;
  @Input() width: string = "";
  @Input() height: string = "";
  @Input() backgroundTheme: string = "";
  @Input() colorTheme: string = "";
  @Input() margin: string = "";
  @Input() padding: string = "";
  @Input() fontSize: string = "";
  @Input() address:string = ""
  backRound:boolean=false
  drawerStyle: string = "";

  childOpen : boolean = false;
  @Output() onPressed = new EventEmitter();

  constructor() { }
  ngOnInit(): void {
    this.updateStyles();
  }
  ngOnChanges() {
    this.updateStyles();
  }
  updateStyles() {
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
  outsideElementClicked(){
    this.backRound=false
  }
  backround(){
    this.backRound=!this.backRound
  }

  buttonPressed() {
    this.onPressed.emit();
  }
  

  
  }
 


