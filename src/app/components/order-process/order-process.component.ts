import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-order-process',
  templateUrl: './order-process.component.html',
  styleUrls: ['./order-process.component.css']
})
export class OrderProcessComponent implements OnInit {
  tableHeading: string[] = ["Item", "Req Date", "Delivery", "Lead Time", "Dept.", "Qty", "Price", "Tax", "Shipment Cost", "Total Amount", "Price Comparision", "Shipment Status", "PO Stage", "Supplier"];
  tableColumnSpacing = "14*minmax(150px,1fr)";

  cardDataList: {title: string, time: string, data: Record<string, string>[]}[] = [
  {title: "Order Initiated", time: "2 days ago", data: [
    {"key": "Name", "value": "Rama Swamy, Purchase Manager"},
    {"key": "Released", "value": "27 April 2022 11AM"}
  ]},
  {title: "Vendor Accepted", time: "2 days ago", data: [
    {"key": "Name", "value": "Welcome International"},
    {"key": "Created On", "value": "27 April 2022 11AM"}
  ]},
  {title: "Received", time: "2 days ago", data: [
    {"key": "Received by", "value": "Eric Danny - GRT Chennai"},
    {"key": "Desg", "value": "House keeping Asst"}
  ]},
  {title: "Payment Done", time: "2 days ago", data: [
    {"key": "Payment", "value": "Delta Labs"},
    {"key": "Date", "value": "27 April 2022 11AM"}
  ]}
];

  constructor() { }

  ngOnInit(): void {
  }

}
