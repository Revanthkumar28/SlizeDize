import { Directive,HostListener,HostBinding } from '@angular/core';

@Directive({
  selector: '[b2bUpArrowKey]'
})
export class UpArrowKeyDirective {

  @HostBinding('class.selected') isSelected = false;

  constructor() { }

  @HostListener('keydown.ArrowUp', ['$event'])
  selectPreviousItem(event: KeyboardEvent) {
    event.preventDefault();
    this.isSelected = false;
    const previousItem = this.getPreviousSibling();
    if (previousItem) {
      this.isSelected = true;
      previousItem.focus();
    }
  }

  @HostListener('keydown.ArrowDown', ['$event'])
  selectNextItem(event: KeyboardEvent) {
    event.preventDefault();
    this.isSelected = false;
    const nextItem = this.getNextSibling();
    if (nextItem) {
      this.isSelected = true;
      nextItem.focus();
    }
  }

  private getPreviousSibling(): HTMLElement {
    const element = this.getElement();
    return element?.previousElementSibling as HTMLElement;
  }

  private getNextSibling(): HTMLElement {
    const element = this.getElement();
    return element?.nextElementSibling as HTMLElement;
  }

  private getElement(): HTMLElement {
    return document.activeElement as HTMLElement;
  }

}
