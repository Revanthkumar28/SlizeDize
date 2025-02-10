import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  @Input() stepperCount: number = 3;
  @Input() active: number = 1;
  @Input() lineHeight: string = "100px";

  stepperId: string[] = [];
  stepperStyle: string = "";

  constructor() { }

  ngOnInit(): void {
    for(let i=1; i<= this.stepperCount; i++) {
      this.stepperId[i-1] = "stepItems" + i.toString();
    }

    if(this.lineHeight) {
      this.stepperStyle += "height: " + this.lineHeight + ";";
    }
  }

}
