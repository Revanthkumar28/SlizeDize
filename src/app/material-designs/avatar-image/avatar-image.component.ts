import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.css']
})
export class AvatarImageComponent implements OnInit {
  @Input() img: string = "";
  @Input() isRounded: boolean = true;
  @Input() width: string = "40px";
  @Input() padding: string = "";
  
  avatarStyle: string = "";

  constructor() { }

  ngOnInit(): void {
    if(this.isRounded) {
      this.avatarStyle += "border-radius: 50%;";
    }
    if(this.width) {
      this.avatarStyle += "width: " + this.width + ";";
      this.avatarStyle += "height: " + this.width + ";";
    }
    if(this.padding) {
      this.avatarStyle += "padding: " + this.padding + ";";
      
    }
  }

}
