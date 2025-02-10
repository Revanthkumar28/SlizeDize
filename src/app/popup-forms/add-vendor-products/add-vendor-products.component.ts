import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';

interface description {
  box_id: any;
  text_box_image: any;
  text_box_title: any;
}


@Component({
  selector: 'b2b-add-vendor-products',
  templateUrl: './add-vendor-products.component.html',
  styleUrls: ['./add-vendor-products.component.css']
})
export class AddVendorProductsComponent implements OnInit {
  @Output() cancelpopup = new EventEmitter();
  serviceImageFiles:any = []
  uploadImage:any = []
  industrySeach:string='';
  isSRrequiredData:boolean = false
  buttondisable:boolean=false
  filterData: any = '';

  @Input() id = ''
  input_Values:any=["Yes","No"]
  warenty:any=['Days','Months','Weeks','Years']
    
  
  dropdownvalues:any ={
   
    category:[],
    sub_category_1:[],
    sub_category_2:[],
    manufacture:[],
    market:[],
    quantity_price:[],
    quantity_type:[],
    duration:[],
    tax:[],
    shipping:[],
    corporate_brand:[],
    special_key:[]
  }
   
  dropwown_slected_values:any = {
    catagory_name : '',
    sub_catagory_name_1 : '',
    sub_catagory_name_2 : '',
    manufacture_name :'',
    market_name:'',
    quantity_price_name:'',
    quantity_type_name:'',
    duration_name:'',
    tax_name:'',
    shipping_name:'',
    esg_name:'',
    corporate_brand_name:'',
    warenty_name:'',
    special_key:''

  }
  api_json : any = {
    name : '',
    sku:'',
    category_id : '',
    sub_main_category_id:'',
    sub_category_id:'',
    manufactured_at:'',
    selling_at:'',
    price:'',
    qty_price:'',
    box_qty:'',
    qty_type: '',

    lead_time:'',
    time_type:'',
    TAX:'',
    shipping_tax:'',
    ESG:'',
    brand_id:'',
    keyword:'',
    special_key:'',

    text_box_title: [],
    text_box: [],
    pdf_name: [],
    key:[],
    value:[],
    filenames:[],
    text_box_image:[],
    pdf:[],
    description: '',
    warranty:'',
    warranty_time_type:'',
    display_ezeebi:'1',
    type:'1',
    view_price:'1',
    main_product:'-',

    pdf_titel: [],
    pdf_id : []

  }

  sub_catagory :any = []
  sub_catagory_test:any =[]

  keyValue:any = [
    {
      spec_id : '',
      key : '',
      value : ''
    }
  ]

  product_description: any=[
    // {
    //   title : '',
    //   image : [],
    //   textarea : ''
    // }

    {
      description_id :'',
      description_image : '',
      description_title :'' ,
      description : '',
      localImage :''
    }
    
  ]
  resourcesPDF:any =[
    {
      pdf_id:'',
      pdf_name :'',
      pdf :[]
    }
  ]
  vendorProductId:any = ''
  vendor_id :any = ''
  multiSelectBrand :any =[]
  @Input() editProductId :any = ''
  constructor(private HotelService:HotelService,private toast: NgToastService,private router: Router, private route: ActivatedRoute,private AppserviceService:AppserviceService) { }

  ngOnInit(): void {
    this.dropdownValues()
    this.filterData= '';

      // EDIT BY URL
      this.route.paramMap.subscribe((params) => {
        this.vendorProductId = params.get("vendorProductId");
        this.vendor_id = params.get("vendor_id");

        // if(this.vendorProductId != '' && this.vendorProductId != null){
        //   if(this.dropdownValues() == true){
        //     this.editVendorProducts(this.vendorProductId)
        //   }
        // }
      })
    console.log(this.vendorProductId)
  }

  dropdownValues(){
    let status:any = false
    this.HotelService.product_data().subscribe((data :any) =>{    
      console.log(data)
       this.dropdownvalues.category = data.categories
       this.dropdownvalues.sub_category_1 = data.sub_categories_level_1
       this.dropdownvalues.sub_category_2 = data.sub_categories_level_2
       this.dropdownvalues.manufacture = data.currencies
       this.dropdownvalues.quantity_price=data.price
       this.dropdownvalues.quantity_type=data.box_quantity
       this.dropdownvalues.duration = data.time
       this.dropdownvalues.tax=data.tax
       this.dropdownvalues.shipping=data.shipping_tax
       this.dropdownvalues.corporate_brand = data.brands
       this.dropdownvalues.special_key = data.high_low_keyword
 
       status = true
       console.log(this.dropdownvalues)
       this.editVendorProducts(this.vendor_id)

     })

     return status
  }

  // EDIT VENDOR PRODUCT DETAILS START
  editVendorProducts(id:any){
    const _id = {
      id : this.vendorProductId
    }
    this.HotelService.show_vendor_date(_id).subscribe((res:any) =>{
      console.log(res)
      this.editProductValues(res)
    })
  }

  productImage:any = []
  descriptionImages :any = []
  pdfImages :any = []
  
  editProductValues(res:any){
    this.keyValue = []
    this.product_description = []
    this.resourcesPDF = []

    this.productImage = res.product.product_image
    // this.descriptionImages = Object.values(res.message[0].text_box_image)
    // this.pdfImages = Object.values(res.message[0].pdf_image)
    this.multiSelectBrand = [
      {
        name : 'Choice Group of Hotel',
        id : '1',
      },
      {
        name : 'Marriott',
        id : '2',
      }
    ]

    console.log(res.product.product_data)
    this.api_json.name = res.product.product_data.name
      this.api_json.sku = res.product.product_data.sku,
      this.api_json.category_id = res.product.product_data.category_id,
      this.api_json.sub_main_category_id = res.product.product_data.sub_main_category_id,
      this.api_json.sub_category_id = res.product.product_data.sub_category_id,
      this.api_json.manufactured_at = res.product.product_data.manufactured_at,
      this.dropwown_slected_values.manufacture_name = res.product.product_data.manufactured_at,
      this.api_json.selling_at = res.product.product_data.selling_at,
      this.dropwown_slected_values.market_name = res.product.product_data.selling_at,

      this.api_json.price = res.product.product_data.price,
      this.api_json.qty_price = res.product.product_data.qty_price,
      this.api_json.box_qty = res.product.product_data.box_qty,
      this.api_json.qty_type = res.product.product_data.qty_type,
      this.api_json.time_type = res.product.product_data.time_type,
      // // this.api_json.TAX = res.product.product_data.tax_name + '('+ res.product.product_data.tax_percentage +'%)',
      this.api_json.TAX = parseInt(res.product.product_tax_type.tax_percentage),

      // // this.api_json.shipping_tax = res.product.product_data.shipping_tax_name + '('+ res.product.product_data.shipping_tax_percentage +'%)'
      this.api_json.shipping_tax = parseInt(res.product.product_shipping_tax_type.tax_percentage)

      this.api_json.lead_time = res.product.product_data.lead_time
      this.api_json.warranty = res.product.product_data.warranty
      this.api_json.ESG = res.product.product_data.ESG
      this.dropwown_slected_values.esg_name = res.product.product_data.ESG == '0' ? 'No' : 'Yes'
      this.api_json.description = res.product.product_data.description
      this.api_json.type = 1 // test
      this.api_json.keyword = res.product.product_data.keyword
      this.api_json.brand_id = 1 // test

      this.dropwown_slected_values.quantity_price_name = res.product.product_data.qty_price
      this.dropwown_slected_values.tax_name = res.product.product_tax_type.name + '('+ res.product.product_tax_type.tax_percentage +'%)'
      this.dropwown_slected_values.quantity_type_name = res.product.product_data.qty_type // test
      this.dropwown_slected_values.Duration = res.product.product_data.Duration
      this.dropwown_slected_values.warenty_name = res.product.product_data.warranty_time_type
      this.dropwown_slected_values.shipping_name = res.product.product_shipping_tax_type.name + '('+ res.product.product_shipping_tax_type.tax_percentage +'%)'
      this.dropwown_slected_values.duration_name = res.product.product_data.time_type // test
      // // this.dropwown_slected_values.corporate_brand_name = res.product.product_data.brand

      // // // DESCRIPTION, SPECIFICATION ,PDF
      res.product.product_description.forEach((element:any) => {
        this.product_description.push({
          description_id : element.description_id,
          description_image : element.description_image,
          description_title : element.description_title ,
          description : element.description,
          localImage : element.description_image
        })
      });
      // this.product_description = res.product.product_description
      this.resourcesPDF = res.product.product_pdf
      this.keyValue = res.product.product_spc

      // // PDF ID
      // res.message[0].vendor_product_pdf.forEach((element:any) => {
      //   this.deleteEditPdf.push(element.pdf_id)
      // });

      // // DESCRIPTION ID
      // res.message[0].vendor_product_boxes.forEach((element:any) => {
      //   this.deleteDescBox_id.push(element.box_id)
      // });

      // // SPECIFICATION ID
      // res.message[0].vendor_product_specs.forEach((element:any) => {
      //   this.deleteSpec.push(element.spec_id)
      // });

      // // // CATAGORY NAME
      console.log(this.dropdownvalues.category)

      const catagoryName = this.dropdownvalues.category.find((d:any) => d.id == res.product.product_data.category_id) 
      const id = {
        name : catagoryName.name,
        id: res.product.product_data.category_id
      }
      this.getInput(id,'category')

      // // // SUB MAIN CATAGORY NAME
      const subMainCatagoryFilter = this.dropdownvalues.sub_category_1.find((d:any) =>d.id == res.product.product_data.sub_main_category_id) 
      const subMainCatagory = {
        name: subMainCatagoryFilter.name,
        id : res.product.product_data.sub_main_category_id ,
        category_id : res.product.product_data.category_id
      }
      this.getInput(subMainCatagory,'sub_category_1')

      // // SUB CATAGORY 2 NAME
      const subCatagoryFilter = this.dropdownvalues.sub_category_2.find((d:any) =>d.id == res.product.product_data.sub_category_id) 
      const subCatagory = {
        name: subCatagoryFilter.name,
        id : res.product.product_data.sub_category_id,
      }
      this.getInput(subCatagory,'sub_category_2')
// ....
      // Duration Days ,Month NAME
      // console.log(this.dropdownvalues.duration)
      // const duration = this.dropdownvalues.duration.find((d:any) =>d.id == res.message[0].Duration) 
      // console.log(duration)

      // const durationDelevery = {
      //   name: duration.name,
      //   id : res.message[0].Duration,
      // }
      // this.getInput(durationDelevery,'duration')
      // console.log(durationDelevery)

      // CORPORATE BRAND EDIT
      // console.log(res.message[0].brand[0])
      // const brandName = this.dropdownvalues.corporate_brand.find((d:any) =>d.id == res.message[0].brand[0]) 
      // console.log(brandName)

      // const corporate_brand = {
      //   brand_name: brandName.brand_name,
      //   id : res.message[0].id,
      // }
      // this.getInput(corporate_brand,'corporate')

      // ..........................................

      // this.HotelService.product_data().subscribe((data :any) =>{
      //   // this.dropdownvalues.sub_category_1 = data.sub_categories_level_1
      //   // CATAGORY
      //   const catagoryName = data.categories.find((item:any) => item.id == res.message[0].category_id);
      //   this.dropwown_slected_values.catagory_name = catagoryName.name ? catagoryName.name : ''
  
      //   // SUB MAIN CATAGORY 
      //   const subMAinCatagory = data.sub_categories_level_1.find((item:any) => item.category_id == res.message[0].category_id);
      //   this.dropwown_slected_values.sub_catagory_name_1 = subMAinCatagory.name

      //   // SUB CATAGORY 2 
      //   const subMAinCatagory_2 = data.sub_categories_level_2.find((item:any) => item.category_id == res.message[0].category_id);
      //   this.dropwown_slected_values.sub_catagory_name_2 = subMAinCatagory_2.name
      // })

      console.log(this.dropdownvalues.sub_category_1)
  }
  // EDIT VENDOR PRODUCT DETAILS END

  subMainCatagory(){
    this.HotelService.product_data().subscribe((data :any) =>{
      this.dropdownvalues.sub_category_1 = data.sub_categories_level_1
    })
  }


  speckeyvalue(){
    this.keyValue.push(
      {
        key:'',
        value:''
      }
    )
  }

  deleteSpec :any = []
  deleteInputSpec(index: number,id:any) {
    this.deleteSpec.push(id)
    this.keyValue.splice(index, 1);
  }

  product(){
    this.product_description.push(
      {
        description_id : '',
        description_title : '',
        description_image : [],
        description : '',
        localImage :''
      }
    )
  }

  deleteDescBox_id :any = []
  delproduct(index: number,id:any) {
    this.deleteDescBox_id.push(id)
    this.product_description.splice(index, 1);
    console.log(this.deleteDescBox_id)
  }

  resource(){
    this.resourcesPDF.push(
      {
        pdf_id :"",
        pdf_name :'',
        pdf :[]
      }
    )
  }

  deleteEditPdf :any = []
  delresource(index: number,id:any) {
    this.deleteEditPdf.push(id)
    this.resourcesPDF.splice(index, 1);
  }

  deleteProductId:any = []
  deleteProductImage(index:any,id:any){
    this.deleteProductId.push(id)
    this.productImage.splice(index, 1);
  }
  close_window(){
    this.cancelpopup.emit(false);
  }

  file_1 :any = []
  serviceRequestImage_pic(event: any ) {
    const form = new FormData();
    this.file_1 = event.target.files;

    // SELECTED IMAGE SHOW
    if (event.target.files) {
      // Iterate through the selected files
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
  
        // Closure to capture the current file
        reader.onload = ((fileIndex) => (event: any) => {
          // Update the imageList array with the base64 data of the image
          this.productImage[fileIndex].product_image = event.target.result;
        })(i);

      }

    }

  }

  file_2 :any = []
  addEditTextBox:any = []
  descLocalImage:any = []
  serviceRequestImage_dec(event: any,desc:any) {
    console.log()
    const form = new FormData();
    this.file_2 = event.target.files;
    desc.description_image = event.target.files;
    this.addEditTextBox = event.target.files;

    // SELECTED IMAGE SHOW
    if (event.target.files) {
      // Iterate through the selected files
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
  
        // Closure to capture the current file
        reader.onload = ((fileIndex) => (event: any) => {
          // Update the imageList array with the base64 data of the image
          desc.localImage = event.target.result;
        })(i);

      }

    }
  }

  file_3 :any = []
  newAddPdf :any = []
  serviceRequestImage_res(event: any ,pdf:any) {
    const form = new FormData();
    console.log(this.uploadImage)

    this.file_3 = event.target.files;
    pdf.pdf = event.target.files;
    this.deleteEditPdf.push(pdf.pdf_id)
    this.newAddPdf = event.target.files;
  }

  sumbit(){
    this.buttondisable =true
    this.api_json.text_box_title = []
    this.api_json.text_box = []

    this.isSRrequiredData=true

    // SPECIFICATION KEY VALUE GRT INPUT START
    console.log(this.keyValue)
    this.api_json.key = []
    this.api_json.value = []
    this.api_json.pdf_name = []
    this.api_json.pdf_id = []

    this.keyValue.forEach((element:any) => {
      this.api_json.key.push(element.key)
      this.api_json.value.push(element.value)
    });

    
    // SPECIFICATION KEY VALUE GRT INPUT END
    if(this.vendorProductId == '' || this.vendorProductId == null){
      console.log(this.resourcesPDF)
      this.resourcesPDF.forEach((element:any) => {
        this.api_json.pdf_titel.push(element.pdf_name)
      });
  
      console.log(this.product_description)
      this.product_description.forEach((element:any) => {
        this.api_json.text_box.push(element.description)
        // this.api_json.description.push(element.textarea)
        this.api_json.text_box_title.push(element.description_title)
      });
    }

    // BRAND SELECTED like 1,2,3,
    this.api_json.brand_id = this.multiSelectBrand.map((obz:any)=>{
               return obz.id
    })
    console.log(this.api_json.brand_id)

    const form = new FormData();
    form.append('vendor_id', this.vendor_id);
    form.append('name', this.api_json.name);
    form.append('sku', this.api_json.sku);
    form.append('category_id', this.api_json.category_id);
    form.append('sub_main_category_id', this.api_json.sub_main_category_id);
    form.append('sub_category_id', this.api_json.sub_category_id);
    form.append('manufactured_at', this.api_json.manufactured_at);
    form.append('selling_at', this.api_json.selling_at);
    form.append('price', this.api_json.price);
    form.append('qty_price', this.api_json.qty_price);
    form.append('box_qty', this.api_json.box_qty);
    form.append('qty_type', this.api_json.qty_type);
    form.append('lead_time', this.api_json.lead_time);
    form.append('time_type', this.api_json.time_type);
    // form.append('TAX', this.api_json.TAX);
    form.append('TAX', this.api_json.TAX);

    form.append('shipping_tax', this.api_json.shipping_tax);
    // form.append('ship_tax', this.api_json.shipping_tax);
    form.append('ESG', this.api_json.ESG);
    form.append('brand_id', this.api_json.brand_id);
    form.append('keyword', this.api_json.keyword);
  
    form.append('description', this.api_json.description);
    form.append('warranty', this.api_json.warranty);
    form.append('warranty_time_type', this.api_json.warranty_time_type);
    form.append('display_ezeebi', this.api_json.display_ezeebi);
    form.append('type', this.api_json.type);
    form.append('view_price', this.api_json.view_price);
    form.append('main_product', this.api_json.main_product);
    form.append('high_low_keyword', this.api_json.special_key);

    // ADD VENDOR PRODUCTS
    console.log(this.api_json)
    if(this.vendorProductId == '' || this.vendorProductId == null){
      form.append('id', '0');

      // CONDITION FOR INPUT VALIDATE 
    // if (this.api_json.name.length > 0 && this.api_json.sku.length > 0 && this.dropwown_slected_values.catagory_name.length>0 && this.dropwown_slected_values.sub_catagory_name_1.length >0 && this.dropwown_slected_values.sub_catagory_name_2.length >0 && this.dropwown_slected_values.manufacture_name.length >0 && this.dropwown_slected_values.market_name.length >0 && this.api_json.price.length >0 && this.dropwown_slected_values.quantity_price_name.length>0 && this.api_json.box_qty.length >0 && this.dropwown_slected_values.quantity_type_name.length >0 && this.api_json.lead_time.length >0 && this.dropwown_slected_values.duration_name.length >0 && this.api_json.warranty.length>0 && this.dropwown_slected_values.warenty_name.length>0 && this.dropwown_slected_values.tax_name.length >0 && this.dropwown_slected_values.shipping_name.length>0 && this.dropwown_slected_values.corporate_brand_name.length>0 && this.api_json.keyword.length>0 && this.api_json.text_box_title.length>0 && this.api_json.text_box.length>200 && this.api_json.pdf_name.length>0 && this.api_json.description.length>200 ){
    //   console.log("valid_success")
    //    this.HotelService.add_new_vendor_product(form).subscribe({
    //    next: (response) => {
                 
    //      this.toast.success({ detail: "SUCCESS", summary: 'success', duration: 3000 });
    //      // this.AppserviceService.rfqRequestReload(this.serviceRequest_form.product_id
    //      console.log(response)
    //    },
    //    error: (error) => {
    //      console.log(error);
    //      this.toast.error({ detail: "ERROR", summary: 'Required All Fields', duration: 3000 });
 
    //    },
    //  })
    //  }else{
    //    console.log("valid_fail")
    //    this.toast.error({ detail: "ERROR", summary: 'Required All Fields', duration: 3000 });
 
    //  }
 

    // PDF IMAGE UPLOAD
    // SPECIFICATION KEY
    for (let i = 0; i < this.api_json.key.length; i++) {
      const key = this.api_json.key[i];
      form.append('key[]', key);
    }

    // SPECIFICATION VALUE
    for (let i = 0; i < this.api_json.value.length; i++) {
      const specValue = this.api_json.value[i];
      form.append('value[]', specValue);
    }

    // TEXT BOX TITLE VALUE
    // for (let i = 0; i < this.api_json.text_box_title.length; i++) {
    //   const text_box_title = this.api_json.text_box_title[i];
    //   form.append('text_box_title[]', text_box_title);
    // }

    // TEXT BOX VALUE 150 LETTER
    // for (let i = 0; i < this.api_json.text_box.length; i++) {
    //   const text_box = this.api_json.text_box[i];
    //   form.append('text_box[]', text_box);
    // }

    // TEXT BOX IMAGE
    console.log(this.product_description)
    for (let i = 0; i < this.product_description.length; i++) {
        const product = this.product_description[i];
        form.append('text_box[]', product.description);
        form.append('text_box_title[]', product.description_title);

        for (let key in product.description_image) {
            if (product.description_image.hasOwnProperty(key)) {
                const file = product.description_image[key];
                form.append('text_box_image[]', file, file.name);
            }
        }
    }

    // PDF NAME , IMAGE
    // for (let i = 0; i < this.api_json.pdf_titel.length; i++) {
    //   const pdf_name = this.api_json.pdf_titel[i];
    //   form.append('pdf_name[]', pdf_name);
    // }

    console.log(this.resourcesPDF)
    for (let i = 0; i < this.resourcesPDF.length; i++) {
        const pdf = this.resourcesPDF[i];
        form.append('pdf_name[]', pdf.pdf_name);

        for (let key in pdf.pdf) {
            if (pdf.pdf.hasOwnProperty(key)) {
                const file = pdf.pdf[key];
                form.append('pdf[]', file, file.name);
            }
        }
    }

    // PRODUCT IMAGE
    for (let i = 0; i < this.file_1.length; i++) {
      const file = this.file_1[i];
      form.append('filenames[]', file, file.name);
    }

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

     // CONDITION FOR INPUT VALIDATE END
     
      this.HotelService.add_new_vendor_product(form).subscribe({
        next: (response) => {
                 
          this.toast.success({ detail: "SUCCESS", summary: 'success', duration: 3000 });
          this.AppserviceService.realoadVendorData('reload')
          this.close_window()
          // this.AppserviceService.rfqRequestReload(this.serviceRequest_form.product_id
          console.log(response)
        },
        error: (err) => {
          console.log(err);
          this.buttondisable =false
          this.toast.error({ detail: "ERROR", summary: err.error.error, duration: 3000 });
  
        },
      })
    }

    // EDIT VENDOR PRODUCT 
    console.log('')
    if(this.vendorProductId != '' && this.vendorProductId != null){
      console.log(this.product_description)
      this.product_description.forEach((element:any) => {
        this.api_json.text_box_title.push(element.description_title)
        this.api_json.text_box.push(element.description)
      });

      // PDF
      console.log(this.resourcesPDF)
      this.resourcesPDF.forEach((element:any) => {
        this.api_json.pdf_id.push(element.pdf_id)
        this.api_json.pdf_name.push(element.pdf_name)
      });

      form.append('id',this.vendorProductId);

      // SPECIFICATION KEY
        for (let i = 0; i < this.api_json.key.length; i++) {
          const key = this.api_json.key[i];
          form.append('key[]', key);
        }

        // SPECIFICATION VALUE
        for (let i = 0; i < this.api_json.value.length; i++) {
          const specValue = this.api_json.value[i];
          form.append('value[]', specValue);
        }

    // DESC START ..................................
        // TEXT BOX TITLE VALUE
      //   console.log(this.api_json.text_box_title)
      //   for (let i = 0; i < this.api_json.text_box_title.length; i++) {
      //     const text_box_title = this.api_json.text_box_title[i];
      //     form.append('text_box_title[]', text_box_title);
      //   }

      //   // TEXT BOX VALUE 150 LETTER
      //   for (let i = 0; i < this.api_json.text_box.length; i++) {
      //     const text_box = this.api_json.text_box[i];
      //     form.append('text_box[]', text_box);
      //   }
        
      // console.log(this.resourcesPDF)

      // if(this.addEditTextBox.length > 0){
      //   for (let i = 0; i < this.addEditTextBox.length; i++) {
      //     const file = this.addEditTextBox[i];
      //     form.append('text_box_image[]', file, file.name);
      //   }  
      // }else{
      //   let str:any = 0;
      //   for (let i = 0; i < this.api_json.text_box_title.length; i++) {
      //     str = i
      //     form.append('text_box_image[]', str + 1);
      //   }
      // }

      // // TEXT,TITLE,IMAGE BOX ID
      // for (let i = 0; i < this.deleteDescBox_id.length; i++) {
      //   const descBoxID = this.deleteDescBox_id[i];
      //   form.append('specs_box_id[]', descBoxID);
      //   // form.append('pdf_name_edit[]', pdf_titel);
      // }
      
      
      // DESC..................................

      // SIMPLICITY CODE FOR DESCRIPTION
      for (let i = 0; i < this.product_description.length; i++) {
        const desc = this.product_description[i];
        if(desc.description_id != ''){
          // PDF ID 
          form.append('specs_box_id[]', desc.description_id);
          form.append('text_box_title[]', desc.description_title);
          form.append('text_box[]', desc.description);

        }
        
        if (typeof desc.description_image !== 'string') {
          for (let key in desc.description_image) {
              if (desc.description_image.hasOwnProperty(key)) {
                  const file = desc.description_image[key];
                  form.append('text_box_image[]', file, file.name);
                }
          }
        }else{
          form.append('text_box_image[]', desc.description_image);
        }

        // NEW PDF
        let descNameTitle = []
        let descTextBox = []
        if(desc.description_id == ''){
          descNameTitle.push(desc.description_title)
          descTextBox.push(desc.description)

          for (let key in desc.description_image) {
            if (desc.description_image.hasOwnProperty(key)) {
                const file = desc.description_image[key];
                form.append('text_box_image_add[]', file, file.name);
              }
          }

          // NEW DESC TITLE NAME
          for (let i = 0; i < descNameTitle.length; i++) {
            const desc_titel = descNameTitle[i];
            form.append('text_box_title_add[]', desc_titel);
          }

          // NEW TEXT BOX
          for (let i = 0; i < descTextBox.length; i++) {
            const desc_Box = descTextBox[i];
            form.append('text_box_add[]', desc_Box);
          }
        }
        
      }

      // let strPdf:any = 0
      // for (let i = 0; i < this.api_json.pdf_name.length; i++) {
      //   strPdf = i
      //   form.append('product_pdf_edit[]', strPdf + 1);
      // }

      // PDF EDIT
      console.log(this.resourcesPDF)
      for (let i = 0; i < this.resourcesPDF.length; i++) {
        const pdf = this.resourcesPDF[i];
        if(pdf.pdf_id != ''){
          // PDF ID 
          form.append('pdf_id[]', pdf.pdf_id);
          form.append('pdf_name_edit[]', pdf.pdf_name);
        }
        
        if (typeof pdf.pdf !== 'string') {
          for (let key in pdf.pdf) {
              if (pdf.pdf.hasOwnProperty(key)) {
                  const file = pdf.pdf[key];
                  form.append('product_pdf_edit[]', file, file.name);
                }
          }
        }else{
          form.append('product_pdf_edit[]', pdf.pdf);
        }

        // NEW PDF
        let pdfName = []
        if(pdf.pdf_id == ''){
          pdfName.push(pdf.pdf_name)
          for (let key in pdf.pdf) {
            if (pdf.pdf.hasOwnProperty(key)) {
                const file = pdf.pdf[key];
                form.append('pdf[]', file, file.name);
              }
          }

          // NEW NAME
          for (let i = 0; i < pdfName.length; i++) {
            const pdf_titel = pdfName[i];
            form.append('pdf_name[]', pdf_titel);
            // form.append('pdf_name_edit[]', pdf_titel);
          }
        }
        
      }

      // NEW 
      if(this.deleteProductId.length > 0){
        form.append('delete_image[]', this.deleteProductId);
      }

      // PRODUCT IMAGE
      if(this.file_1.length > 0){
        for (let i = 0; i < this.file_1.length; i++) {
          const file = this.file_1[i];
          form.append('filenames[]', file, file.name);
        }
      }
      
      this.HotelService.edit_vendor_product(form).subscribe({
        next: (response) => {
                  
          this.toast.success({ detail: "SUCCESS", summary: 'Update Successfully', duration: 3000 });
          this.AppserviceService.realoadVendorData('reload')
          this.close_window()
          // this.AppserviceService.rfqRequestReload(this.serviceRequest_form.product_id
          console.log(response)
        },
        error: (error) => {
          console.log(error);
          this.buttondisable =false
          this.toast.error({ detail: "ERROR", summary: 'Required All Fields', duration: 3000 });
  
        },
      })
    }
  }

  getInput(obj:any,type:any){
    this.filterData=''
    switch (type) {

      case 'category':
        this.dropwown_slected_values.catagory_name = obj.name
        this.dropwown_slected_values.sub_catagory_name_1 = ''
        this.dropwown_slected_values.sub_catagory_name_2 = ''

        this.api_json.category_id = obj.id
        this.sub_catagory = []

        this.dropdownvalues.sub_category_1.forEach((element:any) => {
          if(element.category_id == obj.id){
            this.sub_catagory.push(element)
          }
        });
      console.log(this.dropdownvalues.sub_category_1)
        
       break;
       case 'sub_category_1':
        this.sub_catagory_test = []
        if(this.api_json.category_id == obj.category_id){
          this.dropwown_slected_values.sub_catagory_name_1 = obj.name
          this.dropwown_slected_values.sub_catagory_name_2 = ''

          this.api_json.sub_main_category_id = obj.id
        }

        this.dropdownvalues.sub_category_2.forEach((element:any) => {
          if(element.category_id == obj.category_id && obj.id == element.sub_category_level_1_id){
            this.sub_catagory_test.push(element)
          }
        });

        console.log(this.sub_catagory_test)
        
        break;
        case 'sub_category_2':
          this.dropwown_slected_values.sub_catagory_name_2 = obj.name
          this.api_json.sub_category_id = obj.id
          break;  
        case 'manufacture':
            this.dropwown_slected_values.manufacture_name = obj.name
  
            this.api_json.manufactured_at=obj.iso3
            break; 
        case 'market':
            this.dropwown_slected_values.market_name = obj.name + "("+obj.currency_symbol+")"
  
            this.api_json.selling_at=obj.iso3
            break;  
            case 'quantity_price':
            this.dropwown_slected_values.quantity_price_name = obj.name
  
            this.api_json.qty_price=obj.name
            break;  
            case 'quantity_type':
              this.dropwown_slected_values.quantity_type_name = obj.name
    
              this.api_json.qty_type = obj.name
              break;  
              case 'duration':
              this.dropwown_slected_values.duration_name = obj.name
              this.api_json.time_type = obj.name
              break; 
              case 'tax':
              this.dropwown_slected_values.tax_name = obj.name+"("+obj.tax_percentage+"%"+")"
    
              this.api_json.TAX=obj.id
              break;  
              case 'shipping':
                this.dropwown_slected_values.shipping_name = obj.name+"("+obj.tax_percentage+"%"+")"
      
                this.api_json.shipping_tax=obj.id
                break;  
                case 'special_key':
                  this.dropwown_slected_values.special_key = obj.keyword
        
                  this.api_json.special_key=obj.id
                  break;  
                case 'esg':
                  this.dropwown_slected_values.esg_name = obj
                   if(obj == 'Yes'){
                  this.api_json.ESG="1"
                   }else;
                   this.api_json.ESG="0"
                  break;  
                case 'corporate':
                  this.dropwown_slected_values.corporate_brand_name = obj.brand_name
                  // this.api_json.brand_id = obj.id
                  const exist_value = this.multiSelectBrand.some((val:any) => val.name == obj.brand_name)
                  if(!exist_value){
                    this.multiSelectBrand.push({
                      name : obj.brand_name,
                      id :obj.id
                    })
                  }
                  
                  console.log(this.multiSelectBrand)
                break; 
                case 'warenty':
                  this.dropwown_slected_values.warenty_name = obj
                  switch(obj){
                case 'Days':
                      this.api_json.warranty_time_type = '1'
                    break;
                case 'Months':
                      this.api_json.warranty_time_type = '30'
                    break;
                case 'Weeks':
                      this.api_json.warranty_time_type = '7'
                    break;
                case 'Years':
                      this.api_json.warranty_time_type = '365'
                    break;  

                }
      
                  break; 

    }
  }

  getchoice(type:any,value:any){
    switch (type) {

      case 'list':
        this.api_json.display_ezeebi=value
        break;
      case 'different':
        this.api_json.type=value
      break;
      case 'show_price':
        this.api_json.view_price=value

    }
  }
}
