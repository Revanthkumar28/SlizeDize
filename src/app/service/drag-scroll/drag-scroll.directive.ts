import { Directive, ElementRef, HostListener, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[b2bDragScroll]'
})
export class DragScrollDirective {
  @Input() elementRef: any;
  mouseDown = false;

  constructor() { }

  @HostListener('mousedown', ['$event']) public mouseDownHandler(event: any) {
    this.startDragging(event, false, this.elementRef);
  };

  @HostListener('mouseup', ['$event']) public mouseUpHandler(event: any) {
    this.stopDragging(event, false);
  };

  @HostListener('mouseleave', ['$event']) public mouseLeaveHandler(event: any) {
    this.stopDragging(event, false);
  };

  @HostListener('mousemove', ['$event']) public mouseMoveHandler(event: any) {
    this.moveEvent(event, this.elementRef);
  };

  startX: any;

  scrollLeft: any;

  startDragging(e: any, flag: any, el: any) {
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }
  stopDragging(e: any, flag: any) {
    this.mouseDown = false;
  }
  moveEvent(e: any, el: any) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll;
  }

}       
