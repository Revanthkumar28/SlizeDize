import { ChangeDetectorRef, Component,HostListener, EventEmitter, Input,OnDestroy, OnInit, Output,OnChanges } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';

@Component({
  selector: 'b2b-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit ,OnChanges,OnDestroy {
  @Input() title: string = "";
  @Input() width: string = "205px";
  @Input() height: string = "50px";
  @Input() border: boolean = false;
  @Input() bold: boolean = false;
  @Input() borderRadius: string = "var(--table-radius)";
  @Input() backgroundTheme: string = "";
  @Input() colorTheme: string = "--color-white";
  @Input() margin: string = "";
  @Input() fontSize: string = "";
  @Input() padding: string = "";
  @Input() trailingIcon: string = "";
  @Input() borderTopLeftRadius: string = "";
  @Input() borderTopRightRadius: string = "";
  @Input() trailingBgTheme: string = "";
  @Input() trailingIconRounded: boolean = false;
  @Input() boxShadow: string = "";
  @Input() borderBottom: string = "";
  @Input() position: string = "";
  @Input() positionRight: string = "";
  @Input() positionBottom: string = "";
  @Input() positionTop: string = "";

  @Input() buttonDisabled :boolean= false;

  @Output() onPressed = new EventEmitter();
  buttonStyle: string = "";

  @Input() hoverTheme: string = "";
  @Input() hoverColor: string = "";
  @Input() isNogoLoader :boolean = false
  private buttonStateSubscription :any = ''
  @Input() apiSubmitDisable :boolean= false
  
  @HostListener("mouseover") public mouseover() {
    this.hoverColor = "var(" + this.hoverTheme + ")";
  }

  @HostListener("mouseleave") public mouseleave() {
    if(this.backgroundTheme) {
      this.hoverColor = "var(" + this.backgroundTheme + ")";
    } else {
      this.hoverColor = "";
    }
  }

  constructor(private changeDetect: ChangeDetectorRef, private renderer: Renderer2,private AppserviceService:AppserviceService){

  }

  ngOnChanges() {
    this.updateStyles();
  }

  ngOnInit(): void {
    this.updateStyles();
    // token-Interceptor - Any api is hit button will disabled
    this.buttonStateSubscription = this.AppserviceService.buttonDisabled$.subscribe((res:any) =>{
      console.log(res)
      if(this.apiSubmitDisable){
        this.buttonDisabled = res
      }
    })
  }

  ngOnDestroy() {
    if (this.buttonStateSubscription) {
      this.buttonStateSubscription.unsubscribe();
    }
  }

  buttonPressed() {
    this.onPressed.emit(this.title);
    if(this.hoverTheme != ''){
      let disableColor = this.backgroundTheme
      this.backgroundTheme = this.hoverTheme

      setTimeout(() => {
        // Enable the button after 3 seconds
        this.backgroundTheme = disableColor

      }, 500)

    }
    
     // Disable the button for 3 seconds
    //  this.buttonDisabled = !this.buttonDisabled;

    //  setTimeout(() => {
    //    // Enable the button after 3 seconds
    //    this.buttonDisabled = false;
    //    if(this.hoverTheme != ''){
    //     this.backgroundTheme = disableColor
    //     this.hoverColor = "var(" + this.backgroundTheme + ")";
    //    }
       
    //    console.log(disableColor)
    //  }, 500);
 
     // Perform your button's functionality here
     // ...
  }

  updateStyles() {
    this.buttonStyle = "";
    if(this.width) {
      this.buttonStyle += "width: " + this.width + ";";
    }
    if(this.height) {
      this.buttonStyle += "height: " + this.height + ";";
    }
    if(this.fontSize) {
      this.buttonStyle += "font-size: " + this.fontSize + ";";
    }
    if(this.borderTopLeftRadius) {
      this.buttonStyle += "border-top-left-radius: " + this.borderTopLeftRadius + ";";
    }
    if(this.borderTopRightRadius) {
      this.buttonStyle += "border-top-right-radius: " + this.borderTopRightRadius + ";";
    }
    if(!this.border) {
      this.buttonStyle += "border: none;";
    }
    if(this.borderBottom) {
      this.buttonStyle += "border-bottom : 2.5px solid var("  + this.borderBottom + ");";
    }
    if(this.borderRadius) {
      this.buttonStyle += "border-radius: " + this.borderRadius + ";";
    }
    if(this.backgroundTheme) {
      this.buttonStyle += "background-color: var(" + this.backgroundTheme + ");";
      this.hoverColor = "var(" + this.backgroundTheme + ")";

    }
    
    if(this.colorTheme) {
      this.buttonStyle += "color: var(" + this.colorTheme + ");";
    }
    if(this.margin) {
      this.buttonStyle += "margin: " + this.margin + ";";
    }
    if(this.position) {
      this.buttonStyle += "position: " + this.position + ";";
    }
    if(this.positionRight) {
      this.buttonStyle += "right: " + this.positionRight + ";";
    }
    if(this.positionTop) {
      this.buttonStyle += "top: " + this.positionTop + ";";
    }
    if(this.positionBottom) {
      this.buttonStyle += "bottom: " + this.positionBottom + ";";
    }
    if(this.padding) {
      this.buttonStyle += "padding: " + this.padding + ";";
    }
    if(this.bold) {
      this.buttonStyle += "font-weight: bold;";
    }
    if(this.boxShadow && this.buttonDisabled == true) {
      this.buttonStyle += "box-shadow: " + this.boxShadow + ";";
    }

  }
}
