import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'b2b-status-order-main',
  templateUrl: './status-order-main.component.html',
  styleUrls: ['./status-order-main.component.css']
})
export class StatusOrderMainComponent implements OnInit {
  tableHeading: string[] = ["Item", "Req Date", "Delivery", "Lead Time", "Dept.", "Qty", "Price", "Tax", "Shipment Cost", "Total Amount", "Price Comparision", "Shipment Status", "PO Stage", "Supplier"];
  tableColumnSpacing = "14*minmax(85px,0.5fr)";
  specificationData: {title: string, items: Record<string, string>[]} = {title: "Read A Barton RB 1180 Spec", items: [
    {"key": "GST", "value": "40"},
    {"key": "Quantity", "value": "7 inch"},
    {"key": "Shipping Cost", "value": "Silver"},
    {"key": "Shipping Date", "value": "Stainless Steel"},
    {"key": "Transite Time", "value": "8/10"},
    {"key": "ETA", "value": "Solid"},
    {"key": "Payment", "value": "Salad Fork"},
    {"key": "Total Amount", "value": "Extra heavy"},
    {"key": "Brand Price", "value": "Salad Fork"},
    {"key": "Rating", "value": "Extra heavy"},
  ]};

  buttonName: Record<string, string>[] = [
    {
      "id": "ITEM",
      "depricated": "22/11/22",
      },
      {
      "id": "QTY",
      "depricated": "22/11/22",
      },
      {
        "id": "REQUIRED DATE",
        "depricated": "22/11/22",
        },
        {
          "id": "LEAD TIME",
          "depricated": "22/11/22",
          }
    ]
  constructor() { }

  ngOnInit(): void {
  }

}
