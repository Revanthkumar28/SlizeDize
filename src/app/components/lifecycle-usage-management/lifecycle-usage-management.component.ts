import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-lifecycle-usage-management',
  templateUrl: './lifecycle-usage-management.component.html',
  styleUrls: ['./lifecycle-usage-management.component.css']
})
export class LifecycleUsageManagementComponent implements OnInit {

  catelogTable: string[] = ["YEAR", "TIMELEFT", "BEGIN VALUE", "DEPRECIATED %","ENDING VALUE","REPAIR/MAIN","HOTEL","DEPT","INVOICENO","TODAY-PRICE"];
  catelogColumnSpacing = "10*1fr 0.5fr";

  catelogTableData: Record<string, string>[] = [
    {
      "YEAR": "1",
      "TIMELEFT": "2Year",
      "BEGIN BOOK VALUE": "$1000",
      "DEPRECIATED %": "20%",
      "ENDING BOOK VALUE": "$100",
      "REPAIR/MAIN": "$140",
      "HOTEL": "GRT",
      "DEPT": "F$B",
      "INVOICENO": "$645",
      "TODAY-PRICE": "$2100"
     
     
    },
    {
      "YEAR": "1",
      "TIMELEFT": "2Year",
      "BEGIN BOOK VALUE": "$1000",
      "DEPRECIATED %": "20%",
      "ENDING BOOK VALUE": "$100",
      "REPAIR/MAIN": "$140",
      "HOTEL": "GRT",
      "DEPT": "F$B",
      "INVOICENO": "$645",
      "TODAY-PRICE": "$2100"
     },
    {
      "YEAR": "1",
      "TIMELEFT": "2Year",
      "BEGIN BOOK VALUE": "$1000",
      "DEPRECIATED %": "20%",
      "ENDING BOOK VALUE": "$100",
      "REPAIR/MAIN": "$140",
      "HOTEL": "GRT",
      "DEPT": "F$B",
      "INVOICENO": "$645",
      "TODAY-PRICE": "$2100"
     }
];

  
  constructor( ) {
  }

  ngOnInit(): void {
   
  }

}