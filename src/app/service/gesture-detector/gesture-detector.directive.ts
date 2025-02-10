import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

@Directive({
  selector: '[b2bGestureDetector]'
})
export class GestureDetectorDirective implements OnChanges, OnDestroy {
  @Input() detectInsideClicks: boolean = false; // Default to false, customizable
  @Output() clickedOutside = new EventEmitter<void>();
  @Output() onPressed = new EventEmitter<void>();

  private globalClickListener: (() => void) | null = null;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['detectInsideClicks']) {
      this.updateClickListener();
      console.log('Target clicked:');
    }
  }

  ngOnDestroy(): void {
    this.removeGlobalClickListener();
  }

  private updateClickListener(): void {
    this.removeGlobalClickListener();
    // Always listen for outside clicks
    if (this.detectInsideClicks) {
      this.globalClickListener = this.renderer.listen('document', 'click', (event) => {
        const clickedInside = this.elementRef.nativeElement.contains(event.target);

        if (!clickedInside) {
          this.clickedOutside.emit();
        } else {
          this.onPressed.emit();
        }
      });
    }
  }

  private removeGlobalClickListener(): void {
    if (this.globalClickListener) {
      this.globalClickListener();
      this.globalClickListener = null;
    }
  }
}
