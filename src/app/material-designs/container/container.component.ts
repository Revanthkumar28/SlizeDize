import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { ContainerStyles } from 'src/app/models/interfaces';

@Component({
  selector: 'b2b-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  defaultStyles: ContainerStyles = { backgroundTheme: "--color-white", padding: "var(--container-padding)", borderRadius: "var(--global-radius)", alignItem: "center"};
  @Input() property: ContainerStyles = {};
  containerStyles: string = "";
  @HostBinding("style") hostStyle = "";

  constructor() {}

  ngOnInit(): void {
    this.updateStyles();
  }

  ngOnChanges() {
    this.updateStyles();
  }

  addStyles(obj: string, key: string, val: string) {
    obj += key + ": " + val + ";";
    return obj;
  }

  updateStyles() {
    this.property = {...this.defaultStyles, ...this.property};
    
    if(this.property.width) {
      this.hostStyle = this.addStyles(this.hostStyle, "width", this.property.width);
    }

    if(this.property.minWidth) {
      this.hostStyle = this.addStyles(this.hostStyle, "min-width", this.property.minWidth);
    }
    if(this.property.maxWidth) {
      this.containerStyles = this.addStyles(this.containerStyles, "max-width", this.property.maxWidth);
    }

    if(this.property.maxHeight) {
      this.containerStyles = this.addStyles(this.hostStyle, "max-height", this.property.maxHeight);
    }

    if(this.property.height) {
      this.containerStyles = this.addStyles(this.containerStyles, "height", this.property.height);
      if(this.property.rootHeight) {
        this.hostStyle = this.addStyles(this.hostStyle, "height", this.property.rootHeight);
      } else {
        this.hostStyle = this.addStyles(this.hostStyle, "height", this.property.height);
      }
    }

    if(this.property.width1) {
      this.containerStyles = this.addStyles(this.containerStyles, "width", this.property.width1);
    }

    if(this.property.backgroundTheme) {
      this.containerStyles = this.addStyles(this.containerStyles, "background-color", "var(" + this.property.backgroundTheme + ")");
    }

    if(this.property.background) {
      this.containerStyles = this.addStyles(this.containerStyles, "background", this.property.background);
    }

    if(this.property.padding) {
      this.containerStyles = this.addStyles(this.containerStyles, "padding", this.property.padding);
    }

    if(this.property.borderRadius) {
      this.containerStyles = this.addStyles(this.containerStyles, "border-radius", this.property.borderRadius);
    }

    if(this.property.flex) {
      this.hostStyle = this.addStyles(this.hostStyle, "flex", this.property.flex.toString());
    }
    if(this.property.margin) {
      this.containerStyles = this.addStyles(this.containerStyles, "margin", this.property.margin);
    }
    if(this.property.border) {
      this.containerStyles = this.addStyles(this.containerStyles, "border", this.property.border);
    }
    if(this.property.overflowX) {
      this.containerStyles = this.addStyles(this.containerStyles, "overflow-x", this.property.overflowX);
    }
    if(this.property.overflowY) {
      this.containerStyles = this.addStyles(this.containerStyles, "overflow-y", this.property.overflowY);
    }
    if(this.property.alignItem) {
      this.containerStyles = this.addStyles(this.containerStyles, "align-items", this.property.alignItem);
    }
    if(this.property.justifyContent) {
      this.containerStyles = this.addStyles(this.containerStyles, "justify-content", this.property.justifyContent);
    }
    if(this.property.position) {
      this.containerStyles = this.addStyles(this.containerStyles, "position", this.property.position);
    }
    if(this.property.positionTop) {
      this.containerStyles = this.addStyles(this.containerStyles, "top", this.property.positionTop);
    }
    if(this.property.positionBottom) {
      this.containerStyles = this.addStyles(this.containerStyles, "botton", this.property.positionBottom);
    }
    if(this.property.positionLeft) {
      this.containerStyles = this.addStyles(this.containerStyles, "left", this.property.positionLeft);
    }
    if(this.property.positionRight) {
      this.containerStyles = this.addStyles(this.containerStyles, "right", this.property.positionRight);
    }
    if(this.property.borderLeft) {
      this.containerStyles = this.addStyles(this.containerStyles, "border-left", this.property.borderLeft);
    }
    if(this.property.borderTop) {
      this.containerStyles = this.addStyles(this.containerStyles, "border-top", this.property.borderTop);
    }
    if(this.property.borderRight) {
      this.containerStyles = this.addStyles(this.containerStyles, "border-right", this.property.borderRight);
    }
    if(this.property.boxShadow) {
      this.containerStyles = this.addStyles(this.containerStyles, "box-shadow", this.property.boxShadow);
    }
    if(this.property.zIndex) {
      this.containerStyles = this.addStyles(this.containerStyles, "z-index", this.property.zIndex);
    }
  }
}
