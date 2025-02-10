import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-toggle-card',
  templateUrl: './toggle-card.component.html',
  styleUrls: ['./toggle-card.component.css']
})
export class ToggleCardComponent implements OnInit {
  @Input() toggle: boolean = false;
  @Input() title: string = "";
  @Input() margin: string = "";

  toggleStyles: string = "";
  
  constructor() { }

  ngOnInit(): void {
    if(this.margin) {
      this.toggleStyles += "margin: " + this.margin + ";";
    }
  }

}
