import { Component, Input, OnInit,Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';

@Component({
  selector: 'b2b-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ToggleComponent implements OnInit {
  @Input() toggleLabel: string = "";
  @Input() padding: string = "";
  @Input() toggle: boolean = false;
  @Input() disabletoggle: boolean = false;
  @Input() toggleState: boolean = false;
  @Input() margin: string = "";

  // is ON , OFF default set
  @Input() isToggleValue: boolean = false;

  toggleLabelStyle:string=''
  @Input() is_apiError:boolean = true
  @Output() onChange = new EventEmitter();

  constructor(private AppserviceService:AppserviceService) { }

  ngOnInit() {
    // this.isToggleValue = false
    if(this.padding) {
      this.toggleLabelStyle += "padding: " + this.padding + ";";
    }
    if(this.margin) {
      this.toggleLabelStyle += "margin: " + this.margin + ";";
    }

    this.AppserviceService.error_Toggle$.subscribe((res:any) => {
      if(this.is_apiError){
        this.toggle = false
        this.isToggleValue = false
      }
    });

  }

  toggleChange() {
    this.isToggleValue = true
    this.onChange.emit(this.isToggleValue);
  }

}
