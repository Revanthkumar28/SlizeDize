import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-approval-process',
  templateUrl: './approval-process.component.html',
  styleUrls: ['./approval-process.component.css']
})
export class ApprovalProcessComponent implements OnInit {
  tableHeading: string[] = ["Item", "Req Date", "Delivery", "Lead Time", "Dept.", "Qty", "Price", "Tax", "Shipment Cost", "Total Amount", "Price Comparision", "Shipment Status", "PO Stage", "Supplier"];
  tableColumnSpacing = "14*minmax(86px,0.4fr)";
  stepperLen: number = 0;
  
  cardDataList:any = [
    {title: "Request Raised", time: "2 days ago", data: [
      {"key": "ID", "value": "Erick Danny - GRT Chennai, F&B Assistance"},
      {"key": "Create On", "value": "27 April 2022 11AM"}
    ]},
    {title: "Grant - Approval by F&B Manager", time: "2 days ago", data: [
      {"key": "ID", "value": "Erick Danny - GRT Chennai, F&B Assistance"},
      {"key": "Created On", "value": "27 April 2022 11AM"}
    ]},
    {title: "Grant - Approval by Finance Manager", time: "2 days ago", data: [
      {"key": "ID", "value": "Erick Jeft - GRT Chennai, F&B Assistance"},
      {"key": "Created On", "value": "27 April 2022 11AM"}
    ]},
    {title: "RFQ Pushed - Ramu purchase Manager", time: "2 days ago", data: [
      {"key": "ID", "value": "Ramu Danny - GRT Chennai, F&B Assistance"},
      {"key": "Create On", "value": "27 April 2022 11AM"}
    ]}
  ];

  deatails:any=''
  special:any=''
  cardata:any=''
  name:any=''
  constructor() { }

  ngOnInit(): void {
    this.stepperLen = this.cardDataList.length;
    this.deatails = JSON.parse( sessionStorage.getItem('registration')!);
    this.cardDataList[0].data[1].value = this.deatails.req_date
    this.cardDataList[1].data[1].value = this.deatails.delivery
  }

}
