import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from 'src/app/service/hotel/hotel.service';


@Component({
  selector: 'b2b-released-order-document-upload',
  templateUrl: './released-order-document-upload.component.html',
  styleUrls: ['./released-order-document-upload.component.css']
})
export class ReleasedOrderDocumentUploadComponent {
  serviceImageFiles: any = {
    invoice: [],
    lorry: [],
    delivery: [],
    warrenty: [],
    GNR: [],
    check: [],
    extra_document: [],
    vendordoc: [],
    hoteldoc: []

  }
  uploadImage: any = []
  @Output() upload = new EventEmitter();
  @Output() cancelPopup = new EventEmitter();

  @Input() type = ''
  @Input() poid = ''
  @Input() docum: any = {}
  savebtn: any = 'View'
  navproductid: any = ''
  navhotelid: any = ''
  isUploadDocument: boolean = true
  data = [
    { label: 'purchase order', value: 'Hotel' },
    // Add other data items as needed
  ];

  groups = [
    { header: 'Vendor', items: ['Invoice', 'Lorry Receipt', 'Delivery Challan', 'Warranty Card'] },

  ];
  grop = [
    { header: 'Hotel', items: ['GRN(Good Receipt Notes)', 'Extra Documents/Pictures', 'Cheque/Check copy or Voucher'] }

  ]
  service = [
    { header: 'Hotel', items: ['vendor Documents', 'Hotel Documents', 'Check', 'Extra Documents'] }

  ]
  tableData1: any = [
    { id: 1, column1: 'Browser', column2: 'No File Selected', column3: 'view' },
    { id: 2, column1: 'Browser', column2: 'No File Selected', column3: 'View' },
    { id: 3, column1: 'Browser', column2: 'No File Selected', column3: 'View' },
    { id: 4, column1: 'Browser', column2: 'No File Selected', column3: 'View' },
    { id: 5, column1: 'Browser', column2: 'No File Selected', column3: 'View' },
    { id: 6, column1: 'Browser', column2: 'No File Selected', column3: 'View' },
    { id: 7, column1: 'Browser', column2: 'No File Selected', column3: 'View' },
    { id: 8, column1: 'Browser', column2: 'No File Selected', column3: 'View' },
    { id: 9, column1: 'Browser', column2: 'No File Selected', column3: 'View' },
    { id: 10, column1: 'Browser', column2: 'No File Selected', column3: 'View' },
    { id: 11, column1: 'Browser', column2: 'No File Selected', column3: 'View' },
    { id: 12, column1: 'Browser', column2: 'No File Selected', column3: 'View' },


  ];
  pdfSrc: string | null = null;
  pdfName: string = '';

  constructor(private toast: NgToastService, private router: Router, private route: ActivatedRoute, private HotelService: HotelService) { }
  ngOnInit(): void {
    console.log(this.docum)
    this.pdfName = 'Po_recipt/' + this.docum.Hotel_Name + '.pdf';

    this.route.paramMap.subscribe((params) => {
      console.log(params)
      this.navproductid = params.get("expanded");
      this.navhotelid = params.get("ids");
      console.log(this.navproductid, this.navhotelid)
    })
    console.log(this.type)
    console.log(this.poid)
    const checked: any = ''

    switch (this.type) {
      case 'vendor':
        this.tableData1.forEach((element: any) => {
          if (element.id == 1 || element.id == 6 || element.id == 7 || element.id == 8) {
            element.checked = false
            element.disable = element.id == 1 ? false : true
            element.service = true

          } else if (element.id == 9 || element.id == 10 || element.id == 11 || element.id == 12) {
            console.log('work')
            element.service = false
          }

          else {
            element.checked = true
            element.service = true

          }
        })
        break;
      case 'vendor_service':
        this.tableData1.forEach((element: any) => {
          if (element.id == 9) {
            element.service = true
            element.checked = true
            element.disable = false

          } else if (element.id == 10 || element.id == 11 || element.id == 12) {
            element.service = true
            element.checked = false
            element.disable = true

          } else {
            element.service = false

          }
        })
        break;
      case 'hotel_service':
        this.tableData1.forEach((element: any) => {
          if (element.id == 9) {
            element.service = true
            element.checked = false
            element.disable = false

          } else if (element.id == 10) {
            element.service = true
            element.checked = true
            element.disable = false

          } else {
            element.service = false

          }
        })
        break;
      case 'service_ready_pay':
        this.tableData1.forEach((element: any) => {
          if (element.id == 9 || element.id == 10) {
            element.service = true
            element.checked = false
            element.disable = false

          } else if (element.id == 11 || element.id == 12) {
            element.service = true
            element.checked = true
            element.disable = false

          } else {
            element.service = false

          }
        })
        break;
      case 'under_process':
        this.tableData1.forEach((element: any) => {
          if (element.id == 6 || element.id == 7) {
            element.checked = true
            element.service = true


          } else if (element.id == 8) {
            element.checked = false
            element.disable = true
            element.service = true

            console.log('bhbhh')

          } else if (element.id == 9 || element.id == 10 || element.id == 11 || element.id == 12) {
            console.log('work')
            element.service = false
          }
          else {
            element.checked = false
            element.service = true

          }
        })
        break
      case 'ready_for_pay':
        this.tableData1.forEach((element: any) => {
          if (element.id == 7 || element.id == 8) {
            element.checked = true
            element.service = true

          } else if (element.id == 9 || element.id == 10 || element.id == 11 || element.id == 12) {
            console.log('work')
            element.service = false
          }
          else {
            element.checked = false
            element.service = true

          }
        })
        break
    }
    console.log(this.tableData1)
  }

  // Event handler for the button in the first column
  handleButton1Click(row: any): void {
    // Your logic for button 1 click
    console.log('Button 1 clicked for:', row.column1);
    // Add your custom logic here
  }

  // Event handler for the button in the third column
  handleButton3Click(row: any): void {
    // Your logic for button 3 click
    console.log('Button 3 clicked for:', row.column3);
    // Add your custom logic here
    if (row.id == 2) {
      const fileType = {
        type: 'invoice',
        file: this.invoice
      }
      this.upload.emit(fileType)
    }
  }
  isuploded: boolean = false;

  speccification() {
    this.router.navigate([{ ids: this.navhotelid, expanded: this.navproductid, nav: "Specification & Warranty" }], { relativeTo: this.route });
    // const urlTree = this.router.createUrlTree([{ ids: this.navhotelid,productType: "brandProduct", expanded: this.navproductid, nav: "Specification & Warranty" }], { relativeTo: this.route });
    // const url = this.router.serializeUrl(urlTree);
    // window.open(url, '_blank');
  }
  exit() {
    // this.isUploadDocument = false
    this.cancelPopup.emit(false)

  }


  // INVOICE UPLOAD
  invoice: any = ''
  serviceRequestFile(event: any, row: any) {
    const form = new FormData();
    this.invoice = event.target.files;

    if (row.id == 2) {
      const fileType = {
        type: 'invoice',
        file: this.invoice
      }
      this.serviceImageFiles.invoice = fileType
      this.upload.emit(fileType)
    }

    if (row.id == 3) {
      const fileType = {
        type: 'lorry',
        file: this.invoice
      }
      this.serviceImageFiles.lorry = fileType
      this.upload.emit(fileType)
    }

    if (row.id == 4) {
      const fileType = {
        type: 'delivery',

        file: this.invoice
      }
      this.serviceImageFiles.delivery = fileType
      this.upload.emit(fileType)
    }

    if (row.id == 5) {
      const fileType = {
        type: 'warrenty',
        file: this.invoice
      }
      this.serviceImageFiles.warrenty = fileType
      this.upload.emit(fileType)
    }
    if (row.id == 6) {
      const fileType = {
        type: 'GNR',
        file: this.invoice
      }
      this.serviceImageFiles.GNR = fileType
      this.upload.emit(fileType)
    }

    if (row.id == 7 || row.id == 12) {
      const fileType = {
        type: 'extra_document',
        file: this.invoice
      }
      this.serviceImageFiles.extra_document = fileType
      this.upload.emit(fileType)
    }
    if (row.id == 8 || row.id == 11) {
      const fileType = {
        type: 'check',
        file: this.invoice
      }
      this.serviceImageFiles.check = fileType
      this.upload.emit(fileType)
    }
    if (row.id == 9) {
      const fileType = {
        type: 'vendor_doc',
        file: this.invoice
      }
      this.serviceImageFiles.vendordoc = fileType
      this.upload.emit(fileType)
    }
    if (row.id == 10) {
      const fileType = {
        type: 'hotel_doc',
        file: this.invoice
      }
      this.serviceImageFiles.hoteldoc = fileType
      this.upload.emit(fileType)
    }


  }

  savefiles() {
    console.log(this.serviceImageFiles)
    switch (this.type) {
      case 'vendor':
        if (this.serviceImageFiles.invoice != '' && this.serviceImageFiles.lorry != '' && this.serviceImageFiles.delivery != '') {
          this.toast.success({ detail: "SUCCESS", summary: 'Documents Saved', duration: 3000 });
          this.cancelPopup.emit(false)
        } else
          this.toast.error({ detail: "Error", summary: 'Upload All Documents', duration: 3000 });
        break
      case 'vendor_service':
        if (this.serviceImageFiles.vendordoc != '') {
          this.toast.success({ detail: "SUCCESS", summary: 'Documents Saved', duration: 3000 });
          this.cancelPopup.emit(false)
        } else
          this.toast.error({ detail: "Error", summary: 'Upload All Documents', duration: 3000 });
        break
      case 'hotel_service':
        if (this.serviceImageFiles.hoteldoc != '') {
          this.toast.success({ detail: "SUCCESS", summary: 'Documents Saved', duration: 3000 });
          this.cancelPopup.emit(false)
        } else
          this.toast.error({ detail: "Error", summary: 'Upload All Documents', duration: 3000 });
        break

      case 'under_process':
        if (this.serviceImageFiles.GNR != '') {
          this.toast.success({ detail: "SUCCESS", summary: 'Documents Saved', duration: 3000 });
          this.cancelPopup.emit(false)

        } else
          this.toast.error({ detail: "Error", summary: 'Upload GRN Documents', duration: 3000 });
        break
      case 'ready_for_pay':
        if (this.serviceImageFiles.check != '') {
          this.toast.success({ detail: "SUCCESS", summary: 'Documents Saved', duration: 3000 });
          this.cancelPopup.emit(false)

        } else
          this.toast.error({ detail: "Error", summary: 'Upload Check Documents', duration: 3000 });
        break
      case 'service_ready_pay':
        if (this.serviceImageFiles.check != '') {
          console.log('dede')
          this.toast.success({ detail: "SUCCESS", summary: 'Documents Saved', duration: 3000 });
          this.cancelPopup.emit(false)

        } else
          this.toast.error({ detail: "Error", summary: 'Upload Check Documents', duration: 3000 });
        break
    }
  }
  openLink_brand(product_id: any) {
    const link = 'https://qa.ezeebi.com/brand_view_products/' + product_id; // Adjust the URL structure
    window.open(link)
  }
  showdocumens(id: any, view: any) {
    console.log(id)
    let lorryrecept = ''
    let invoice = ''
    let Deleverychalan = ''
    let warrentycard = ''
    let GRN = ''
    let check = ''
    let extradocument = ''
    let vendordocument = ''
    let hoteldocument = ''
    console.log(this.docum.invoice)
    switch (this.type) {
      case 'vendor':
        if (id == 1) {

          const quation_id = { id: this.poid };
          this.HotelService.Purchase_pdf_view(quation_id).subscribe(
            (data: any) => {
              if (view == 1) {
                this.openPdfInNewTab(data);

              } else {
                this.downloadPdf(data)
              }
            },
            error => {
              console.error('Error fetching PDF:', error);
            }
          );

        }

        break;
      case 'hotel_service':
        vendordocument = this.docum.documentarray[0]
        break;
      case 'service_ready_pay':
        vendordocument = this.docum.vendordoc[0]
        hoteldocument = this.docum.hoteldoc[0]
        break;
      case 'under_process':
        console.log(this.docum.invoices)
        invoice = this.docum.invoices[0]
        lorryrecept = this.docum.lorryrecepts[0]
        Deleverychalan = this.docum.deliverychalans[0]
        warrentycard = this.docum.warrentys[0]
        break;
      default:
        invoice = this.docum.invoices[0]
        lorryrecept = this.docum.lorryrecepts[0]
        Deleverychalan = this.docum.deliverychalans[0]
        warrentycard = this.docum.warrentys[0]
        GRN = this.docum.Grns[0]
    }
    switch (id) {
      case 1:
        if (this.type != 'vendor') {
          const quation_id = { id: this.docum.id };
          this.HotelService.pdf_view(quation_id).subscribe(
            (data: any) => {
              if (view == 1) {
                this.openPdfInNewTab(data);

              } else {
                this.downloadPdf(data)
              }


            },
            error => {
              console.error('Error fetching PDF:', error);
            }
          );
        }


        break;
      case 2:


        window.open(invoice)
        console.log(invoice)
        break;
      case 3:
        window.open(lorryrecept)

        console.log(lorryrecept)
        break;
      case 4:
        window.open(Deleverychalan)

        console.log(Deleverychalan)
        break;
      case 5:
        window.open(warrentycard)

        console.log(warrentycard)
        break;
      case 6:
        window.open(GRN)

        console.log(GRN)
        break;
      case 8:
        window.open(check)

        console.log(check)
        break;
      case 9:
        window.open(vendordocument)

        console.log(vendordocument)
        break;
      case 10:
        window.open(hoteldocument)

        console.log(hoteldocument)
        break;
    }




  }
  // saveFile(data: any, filename: string) {
  //   const blob = new Blob([data], { type: 'application/pdf' });
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = filename;
  //   link.click();
  //   this.toast.success({detail:" Sucessfully PDF Downloaded",summary:'Success',duration:5000});
  //   console.log("file downloaded")
  // }
  openPdfInNewTab(data: any) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');
    if (newWindow) {
      newWindow.onload = () => {
        window.URL.revokeObjectURL(url);
        const a = document.createElement('a');

      };
    } else {
      console.error('Failed to open new tab');
    }
  }
  downloadPdf(data: any) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    if (url) {
      const a = document.createElement('a');
      a.href = url;
      a.download = this.pdfName;
      a.click();
    }
  }
  openPDFsInNewTabs(pdfUrls: string[]) {
    pdfUrls.forEach((url, index) => {
      setTimeout(() => {
        console.log('Opening:', url); // Check if this logs for both URLs
        window.open(url, '_blank');
      }, index * 500);
    });
  }

}
