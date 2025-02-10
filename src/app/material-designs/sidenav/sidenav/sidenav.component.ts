import { Component, OnInit,Input,EventEmitter ,Output} from '@angular/core';

@Component({
  selector: 'b2b-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  childopen:boolean=true
  @Input() menu:any='menu'
  sidenavstyle:any=""
  @Input() height:any = ''

  @Output() onPressed = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    if(this.height) {
      this.sidenavstyle += "height: " + this.height + ";";
     }
  }

  buttonPressed() {
    this.onPressed.emit();
  }

}
