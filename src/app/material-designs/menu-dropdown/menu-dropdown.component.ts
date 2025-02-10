import { Component,EventEmitter,Output, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'b2b-menu-dropdown',
  templateUrl: './menu-dropdown.component.html',
  styleUrls: ['./menu-dropdown.component.css']
})
export class MenuDropdownComponent implements OnInit {

  @Input() text: string = "";
  @Input() active: boolean = false;
  @Input() isExpand: boolean = false;
  
  @Input() isChild: boolean = false;
  @Input() width: string = "";
  @Input() backgroundTheme: string = "";
  @Input() iconBackgroundTheme: string = "";
  @Input() height: string = "";
  @Input() fontSize: string = "";
  @Input() margin: string = "";
  @Input() padding: string = "";
  @Input() paddingg: string = "";
  // @Input() maxHeight: string = "";

  @Input() icon: string = "expand_more";


  @Input() colorTheme: string = "";

  @Input() childOpen : boolean = false;
  @Input() bold : boolean = false;
  @Input() menuContent: boolean = false;
  @Input() moveVert : boolean = true;
  @Input() showExpand : boolean = false;
  outSideOpen : boolean = false;

  @Input() drawerStyle: string = "";
  drawerStyless:string = '';
  iconstyle:string=''

  @Output() onPressed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    if(this.bold) {
      this.drawerStyle += "font-weight: bold;";
    }
    if(this.width) {
      this.drawerStyle += "width: " + this.width + ";";
    }
    if(this.height) {
      this.drawerStyle += "height: " + this.height + ";";
    }
    if(this.margin) {
      this.drawerStyle += "margin: " + this.margin + ";";
    }
    if(this.fontSize) {
      this.drawerStyle += "font-size: " + this.fontSize + ";";
    }
    if(this.padding) {
      this.drawerStyle += "padding: " + this.padding + ";";
    }
    if(this.colorTheme) {
      this.drawerStyle += "color: var(" + this.colorTheme + ");";
    }
    if(this.backgroundTheme) {
      this.drawerStyle += "background-color: var(" + this.backgroundTheme + ");";
    }
    if(this.iconBackgroundTheme) {
      this.iconstyle+= "background-color: var(" + this.iconBackgroundTheme + ");";
    }
    if(this.paddingg) {
      this.drawerStyless += "padding: " + this.paddingg + ";";
    }

    // if(this.maxHeight) {
    //   this.drawerStyless += "max-height: " + this.maxHeight + ";";
    // }

    if(this.menuContent==true){
      this.moveVert=false
    }

  }

  openChildren(){
    this.childOpen = !this.childOpen;
    this.onPressed.emit(this.childOpen);
  }
  outsideElementClicked() {
    this.childOpen = false; 
  }

}
