import { Component, EventEmitter, HostListener,Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'b2b-badge-image',
  templateUrl: './badge-image.component.html',
  styleUrls: ['./badge-image.component.css']
})
export class BadgeImageComponent implements OnInit {
  @Input() icon: string = "";
  @Input() text: string = "";
  @Input() padding: string = "";
  @Input() iconpadding: string = "";

  @Input() height: string = "";
  @Input() position: string = "";
  @Input() positionTop: string = "";
  @Input() positionLeft: string = "";
  @Input() positionBottom: string = "";

  @Input() borderRadius: string = "";
  @Input() borderRadiuss: string = "50%";

  @Input() colorTheme: string = "";
  @Input() backgroundTheme: string = "";
  @Input() backgroundThemee: string = "";

  @Input() isRounded: boolean = false;
  @Input() isDotted: boolean = false;
  @Input() isCurved: boolean = false;


  @Input() iconSize: string = "15px";
  @Input() iconWeight: string = "600";

  @Input() width: string = "40px";
  @Input() fontSize: string = "";

  @Input() hoverWidths: string = "";
  @Input() hoverTexts: boolean = false;
  hoverText:string='';
  @Output() onPressed = new EventEmitter();

  iconStyle: string = "";
  iconTheme: string = "";
  hoverWidth: string = "";
 @HostListener("mouseover") public mouseover() {
    this.hoverWidth =  this.hoverWidths;
      if(this.text){
        this.hoverTexts=true;
      }
  }
@HostListener("mouseleave") public mouseleave() {
    if(this.width) {
      this.hoverWidth = this.width ;
    } 
    if(this.text){
      this.hoverTexts=false;
    }
    else {
      this.hoverWidth = "";
    }
  }

  constructor() { }

  ngOnInit(): void {
    if(this.colorTheme.length > 0) {
      this.iconStyle += "color: var(" + this.colorTheme + ");";
    }
   

    if(this.backgroundTheme.length > 0) {
      this.iconStyle += "background-color: var(" + this.backgroundTheme + ");";
    }
    if(this.backgroundThemee.length > 0) {
      this.iconTheme += "background-color: var(" + this.backgroundThemee + ");";
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
      this.iconTheme += "width: var(" + this.width + ");";
      this.iconStyle += "height: " + this.width + ";";
      this.hoverWidth = this.width;
    }
    if(this.padding) {
      this.iconStyle += "padding: " + this.padding + ";"; 
    }
    if(this.iconpadding) {
      this.iconTheme += "padding: " + this.iconpadding + ";"; 
    }
    if(this.height) {
      this.iconStyle += "height: " + this.height + ";";
      
    }

    if(this.iconSize) {
      this.iconTheme += "font-size: " + this.iconSize +";";
    }
    if(this.iconWeight) {
      this.iconTheme += "font-weight: " + this.iconWeight +";";
    }
    if(this.position) {
      this.iconStyle += "position: " + this.position + ";"; 
    }
    if(this.positionTop) {
      this.iconStyle += "top: " + this.positionTop + ";"; 
    }
    if(this.positionBottom) {
      this.iconStyle += "bottom: " + this.positionBottom + ";"; 
    }
    if(this.positionLeft) {
      this.iconStyle += "left: " + this.positionLeft + ";"; 
    }
    if(this.borderRadius) {
      this.iconStyle += "border-radius: " + this.borderRadius + ";"; 
    }
    if(this.borderRadiuss) {
      this.iconTheme += "border-radius: " + this.borderRadiuss + ";"; 
    }
    if(this.fontSize) {
      this.iconStyle += "font-size: " + this.fontSize +";";
    }
    
  }

  buttonClicked() {
    this.onPressed.emit("");
  }
}
