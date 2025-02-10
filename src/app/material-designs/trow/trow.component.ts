import { Component, EventEmitter,HostListener, HostBinding, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
@Component({
  selector: 'b2b-trow',
  templateUrl: './trow.component.html',
  styleUrls: ['./trow.component.css']
})
export class TrowComponent implements OnInit {
  @Input() column: string = "";
  @Input() colorTheme: string = "";
  @Input() backgroundTheme: string = "";
  @Input() bold: boolean = false;
  @Input() borderRadius = "";
  @Input() position = "";
  @Input() top = "";
  @Input() height: string = "50px";
  @Input() border: string = "";
  @Input() zIndex: string = "";
  @Input() margin: string = "0 0 10px 0";
  @Input() showExpand: boolean = false;
  @Input() showExpand2: boolean = false;
 @Input() RfqExpand: boolean = false;
  @Input() hoverExpand: boolean = false;
  @Input() ExpandName: any ='RFQ Expand'
  @Input() Expandwidth: any ='110px';
  @Input() id: any = '';
  @Input() fontSize: string = "";
  @Input() gap: string = "";
  @Input() width: string = "100%";
  @Input() borderBottom: string = "";
  @Input() display: string = "";
  @Input() overflowY:string="";
  @Input() mobileview: boolean = false;

  @Input() isExpanded: boolean = false;
  trowStyles: string = "";
  @Input() search: boolean = false;
  boxShadow : string = ''
  @Input() HoverBoxShadow :boolean = false

  @Output() onExpand = new EventEmitter();
  @Output() onExpand2 = new EventEmitter();

  hoverTheme : string ='--color-box-sadow'
  // count:any='All Products/2B Ordered'
  hoverColor :any = ''

  @HostBinding("style") hostStyles = "";

  // @HostListener("mouseover") public mouseover() {
  //   this.hoverColor = "var(" + this.hoverTheme + ")";
  // }

  // @HostListener("mouseleave") public mouseleave() {
  //   if(this.boxShadow) {
  //     this.hoverColor = "var(" + this.boxShadow + ")";
  //   } else {
  //     this.hoverColor = "";
  //   }
  // }

  constructor(private route: ActivatedRoute, private router: Router,private AppserviceService:AppserviceService) { }

  ngOnInit(): void {
    if(this.isExpanded == true) {
      this.RfqExpand = true;

    } else 
    this.RfqExpand = false;

    if(this.column) {
      let gridColums: string = this.getColumns(this.column);
      this.trowStyles += "grid-template-columns: " + gridColums + ";";
    }
    if(this.colorTheme) {
      this.trowStyles += "color: var(" + this.colorTheme + ");";
    }
    if(this.display) {
      this.trowStyles += "display: " + this.display + ";";
    }
    if(this.backgroundTheme) {
      this.trowStyles += "background-color: var(" + this.backgroundTheme + ");";
      
    }
    if(this.overflowY) {
      this.trowStyles += "overflow-y: " + this.overflowY + ";";
    }
    if(this.bold) {
      this.trowStyles += "font-weight: bold;"
    }
    if(this.borderRadius) {
      this.trowStyles += "border-radius: " + this.borderRadius + ";";
    }
    if(this.position) {
      this.trowStyles += "position: " + this.position + ";";
    }
    if(this.zIndex) {
      this.trowStyles += "z-index: " + this.zIndex + ";";
    }
    if(this.top) {
      this.trowStyles += "top: " + this.top + ";";
    }
    if(this.height && this.height != 'none') {
      this.trowStyles += "height: " + this.height + ";";
    }
    if(this.fontSize) {
      this.trowStyles += "font-size: " + this.fontSize + ";";
    }
    if(this.border) {
      this.trowStyles += "border: " + this.border + ";";
    }
    if(this.margin) {
      this.trowStyles += "margin : " + this.margin + ";";
    }
    if(this.trowStyles) {
      this.trowStyles += "gap: " + this.gap + ";";
    }
    if(this.borderBottom) {
      this.trowStyles += "border-bottom: " + this.borderBottom + ";";
    }

    if(this.boxShadow) {
      this.trowStyles += "box-shadow: " + this.boxShadow + ";";
      this.hoverColor = "var(" + this.boxShadow + ")";
    }

    if(this.width) {
      this.trowStyles += "width: " + this.width + ";";
      this.hostStyles += "width: " + this.width + ";";
    }
  }

  getColumns(data: string) {
    let gridColumns = "";
    let splitData = data.split(" ");

    for(let i=0; i<splitData.length; i++) {
      let multiplyData: string[] = splitData[i].split("*");
      if(multiplyData.length == 1) {
        gridColumns += multiplyData[0] + " ";
      } else if (multiplyData.length == 2) {
        let multiplyCount: number = parseInt(multiplyData[0]);
        for(let j=0; j<multiplyCount; j++)
          gridColumns += multiplyData[1] + " ";
      } 
    }

    return gridColumns;
  }

  expandClicked() {
    this.isExpanded = !this.isExpanded;
    if(this.isExpanded == true) {
      this.onExpand.emit(this.id);
      this.AppserviceService.hidescrollbar(false)
    }else {
      this.onExpand.emit('');
      this.AppserviceService.hidescrollbar(true)
    }
    console.log(this.isExpanded)
  }
  expandClicked2() {
    this.isExpanded = !this.isExpanded;
    if(this.isExpanded == true) {
      this.onExpand.emit(this.id);
    }else {
      this.onExpand.emit('');
    }
    
    console.log(this.isExpanded)
    
  }

  expand(){
    if(this.isExpanded == false) {
      this.onExpand2.emit('0');
    }else{
      this.onExpand2.emit(this.id);
    }
  }

  rfqExpandHover(){
    this.RfqExpand = true;
  }
  
  rfqStay(){
    if(this.isExpanded == true) {
      this.RfqExpand = true;
    }
    else 
    this.RfqExpand = false;
  }


}
