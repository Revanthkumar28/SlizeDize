import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'b2b-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent implements OnInit {
  @Input() placeholder:string ='';
  @Input() value:string ='';
  @Output() onChange = new EventEmitter();

  @Input() rows:string ='';
  @Input() cols:string ='';
  @Input() text:string ='';
  @Input() width:string ='';
  @Input() height:string ='';

  @Input() border:string ='';
  @Input() borderRadius:string ='';
  @Input() padding:string ='';

  textareaStyle:string ='';

  constructor() { }

  ngOnInit(): void {
    if(this.border) {
      this.textareaStyle += "border :"+ this.border + ";";
    }
    if(this.borderRadius) {
      this.textareaStyle += "border-radius: " + this.borderRadius + ";";
    }
    if(this.padding) {
      this.textareaStyle += "padding: " + this.padding + ";";
    }
    if(this.width) {
      this.textareaStyle += "width: " + this.width + ";";
    }
    if(this.height) {
      this.textareaStyle += "height: " + this.height + ";";
    }
  }
  valueChange() {
    
    this.onChange.emit(this.value);
  }

}
