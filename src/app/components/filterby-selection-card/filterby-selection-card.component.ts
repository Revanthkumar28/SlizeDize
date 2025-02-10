import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-filterby-selection-card',
  templateUrl: './filterby-selection-card.component.html',
  styleUrls: ['./filterby-selection-card.component.css']
})
export class FilterbySelectionCardComponent implements OnInit {
  @Input() activeIndex = 1;
  @Input() values: string[]= [];
  @Input() name: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  changeIndex(index: any) {
    this.activeIndex = index;
    console.log(index);
  }
}
