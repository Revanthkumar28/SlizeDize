import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { HostListener, Renderer2, ElementRef } from '@angular/core';

@Component({
    selector: 'b2b-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
    @Input() image: string = "";
    @Input() width: string = "50%";
    @Input() margin: string = "";
    @Input() minWidth: string = "";

    @Input() height: string = "auto";
    @Input() aspectRatio: number = 0;
    // @Input() objectFit: string = "cover";
    @Input() objectFit: string = "";
    @Input() isRounded: boolean = false;
    @Input() isCurved: boolean = false;
    @Input() border: string = '';
    @Input() borderRadius: string = '';

    imageStyles: string = "";
    @HostBinding('style') hostStyles = "";

   

    ngOnInit(): void {
        if(this.width) {
            this.imageStyles += "width: " + this.width + ";";
            this.hostStyles += "width: " + this.width + ";";
        }
        if(this.height) {
            this.imageStyles += "height: " + this.height + ";";
            this.hostStyles += "height: " + this.height + ";";
        }
        if(this.margin) {
            this.imageStyles += "margin: " + this.margin + ";";
        }
        if(this.minWidth) {
            this.imageStyles += "min-width: " + this.minWidth + ";";
        }
        if(this.aspectRatio) {
            this.imageStyles += "aspect-ratio: " + this.aspectRatio + ";";
        }
        if(this.objectFit) {
            this.imageStyles += "object-fit: " + this.objectFit + ";";
        }
        if(this.isRounded) {
            this.imageStyles += "border-radius: 50%;";
        }
        if(this.borderRadius) {
            this.imageStyles += "border-radius:" + this.borderRadius +";";
        }
        if(this.isCurved) {
            this.imageStyles += "border-radius: var(--table-radius);";
        }
        if(this.border) {
            this.imageStyles += "border: " + this.border + ";";
        }
        this.onResize(null);
    }
    constructor(private renderer: Renderer2, private el: ElementRef) {}
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      if (window.innerWidth < 600) {
        this.aspectRatio = 2;
       
      } else {
        this.aspectRatio = 1; // Reset the height to default
       
      }
    }

}
