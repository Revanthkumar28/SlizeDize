import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'b2b-view-spec',
  templateUrl: './view-spec.component.html',
  styleUrls: ['./view-spec.component.css']
})
export class ViewSpecComponent implements OnInit {

  viewSpec :any = [
    {
      dataKey :'key1',
      dataValue : 'value1'
    },
    {
      dataKey :'key2',
      dataValue : 'value1'
    },
    {
      dataKey :'key3',
      dataValue : 'value1'
    }
  ]

  @Input() spec :any = []

  constructor() { }

  ngOnInit(): void {
    console.log(this.spec)
  }


}
