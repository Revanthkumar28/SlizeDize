import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {
  @Input() backgroundTheme: string = "";

  bgColor: string = "";
  constructor() { }

  ngOnInit(): void {
    if(this.backgroundTheme) {
      this.bgColor += "var(" + this.backgroundTheme + ")";
    }
  }

}
