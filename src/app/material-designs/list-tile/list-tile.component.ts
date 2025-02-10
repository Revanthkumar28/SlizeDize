import { Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'b2b-list-tile',
  templateUrl: './list-tile.component.html',
  styleUrls: ['./list-tile.component.css']
})
export class ListTileComponent implements OnInit {
  @Input() title: string = "";
  
  @Input() backgroundTheme: string = "";
  @Input() hoverTheme: string = "";
  @Input() fontWeight: string = "";
  @Input() colorTheme: string = "";
  @Input() borderRadius: string = "var(--list-tile-padding)";
  @Input() fontSize: string = "";
  @Input() width: string = "100%";
  @Input() height: string = "45px";
  @Input() margin: string = "5px 0";
  @Input() padding: string = "";
  @Input() iconWidth: string = "";
  
  @Input() bold: boolean = false;
  @Input() border: string = "";
 @Output() tileClicked = new EventEmitter();

  listStyles: string = "";
  textStyles: string = "";
  hoverColor: string = "";

  @Input() icon :string = 'construction' ;
  @Input() isIcon :boolean = false
  @Input() iconBackgroundTheme :string = '' ;

  @HostListener("mouseover") public mouseover() {
    this.hoverColor = "var(" + this.hoverTheme + ")";
  }

  @HostListener("mouseleave") public mouseleave() {
    if(this.backgroundTheme) {
      this.hoverColor = "var(" + this.backgroundTheme + ")";
    } else {
      this.hoverColor = "";
    }
  }

  constructor() { }

  ngOnInit(): void {
    if(this.backgroundTheme) {
      this.listStyles += "background-color: var(" + this.backgroundTheme + ");";
      this.hoverColor = "var(" + this.backgroundTheme + ")";
    }
    if(this.colorTheme) {
      this.listStyles += "color: var(" + this.colorTheme + ");";
    }
    if(this.borderRadius) {
      this.listStyles += "border-radius: " + this.borderRadius +";"
    }
    if(this.fontSize) {
      this.listStyles += "font-size: " + this.fontSize + ";";
    }
    if(this.width) {
      this.listStyles += "width: " + this.width + ";";
    }
    if(this.height) {
      this.listStyles += "height: " + this.height + ";";
    }
    if(this.margin) {
      this.listStyles += "margin: " + this.margin + ";";
    }
    if(this.padding) {
      this.listStyles += "padding: " + this.padding + ";";
    }
    if(this.bold) {
      this.textStyles += "font-weight: bold;";
    }
    if(this.fontWeight) {
      this.textStyles += "font-weight:"+this.fontWeight+";";
    }
    if(this.border) {
      this.listStyles += "border: " + this.border + ";";
    }
  }

  listtileClicked() {
    this.tileClicked.emit(this.title);
  }
}
