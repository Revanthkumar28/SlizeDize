import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';

@Component({
  selector: 'b2b-investment-viewproperty',
  templateUrl: './investment-viewproperty.component.html',
  styleUrls: ['./investment-viewproperty.component.css']
})
export class InvestmentViewpropertyComponent implements OnInit {
  @Output() close_view = new EventEmitter();
  @Input() view_property:any={}
  @Input() type:any=''
  constructor(private HotelService:HotelService,) { }
  currentUrl:any
  serviceImages: any[] = [];
  currentImageIndex = 0; 
  document_img:any= 'assets/pdfimg.png'
  ngOnInit(): void {

    this.currentUrl = window.location.href;
    console.log(this.currentUrl);
    console.log(this.view_property)
    this.serviceImages = [...this.view_property.images , ...this.view_property.videos]
    console.log(this.serviceImages)
  }
  nextImage(): void {
    if (this.currentImageIndex < this.serviceImages.length - 1) {
      this.currentImageIndex++;
    } else {
      // If at the end, loop back to the first image
      this.currentImageIndex = 0;
    }
  }

  // Function to display the previous image
  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      // If at the beginning, loop to the last image
      this.currentImageIndex = this.serviceImages.length - 1;
    }
  }
  isImage(url: string): boolean {
    return url.match(/\.(jpeg|jpg|gif|png|jfif)$/) != null;
  }
  closeview_listing(){
    this.close_view.emit('')

  }
  share() {
 
    if (navigator.share) {
      navigator.share({
        title: 'Check this out!',
        text: 'Here is some content to share.',
        url: this.currentUrl
      })
      .then(() => console.log('Share successful'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      alert('Web Share API is not supported on this browser. Try a mobile device.');
    }
  }
  Openfile(file:any){
    window.open(file)
  }
}
