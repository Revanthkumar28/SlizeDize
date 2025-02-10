import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'b2b-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toast:boolean = true
  @Input() text: string = "New Notification";

  constructor() { }
  ngOnInit(): void {
    this.toast = true;
    setTimeout(() => {
      this.toast = false;
    }, 3000);
  
  }

 
}
