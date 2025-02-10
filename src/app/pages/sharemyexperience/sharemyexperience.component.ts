import { Component, OnInit } from '@angular/core';
import { MagentoProductService } from 'src/app/service/magento-product.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'b2b-sharemyexperience',
  templateUrl: './sharemyexperience.component.html',
  styleUrls: ['./sharemyexperience.component.css']
})
export class SharemyexperienceComponent implements OnInit {
  listProduct:any=''
  card: Record<string, string>[] =[
    {
      'image':'assets/hotel1.jpeg',
      'description' : 'Lancaster Table& Seating 60 Round Heavy',
      'user' : 'Jeff George'

     },
     {
      'image':'assets/hotel-menu-image.jpg',
      'description' : 'Lancaster Table& Seating 60 Round Heavy',
      'user' : 'Andorson'
     },
     {
      'image':'assets/hotel1.jpeg',
      'description' : 'Lancaster Table& Seating 60 Round Heavy',
      'user' : 'Will Smith'
     },
     {
      'image':'assets/hotel1.jpeg',
      'description' : 'Lancaster Table& Seating 60 Round Heavy',
      'user' : 'Andre Russle'
     },
     {
      'image':'assets/hotel1.jpeg',
      'description' : 'Lancaster Table& Seating 60 Round Heavy',
      'user' : 'Jeff George'
     },
     {
      'image':'assets/hotel1.jpeg',
      'description' : 'Lancaster Table& Seating 60 Round Heavy',
      'user' : 'Jeff George'
     },
     {
      'image':'assets/hotel1.jpeg',
      'description' : 'Lancaster Table& Seating 60 Round Heavy',
      'user' : 'Will Smith'
     }
  ]
  constructor(private catalog:MagentoProductService,private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.catalog.getProduct().subscribe(data=>{
      this.listProduct = data
      console.log(this.listProduct)
  })
  }
  goBack() {
    this.location.back();
  }
  
}
