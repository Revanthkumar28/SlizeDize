import { Component, OnInit } from '@angular/core';
import { MagentoProductService } from 'src/app/service/magento-product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'b2b-comparison-marketplace',
  templateUrl: './comparison-marketplace.component.html',
  styleUrls: ['./comparison-marketplace.component.css']
})
export class ComparisonMarketplaceComponent implements OnInit {
  listProduct :any=''
  public baseUrl = 'https://www.ezeebi.com/';
  public apiEndPoint = this.baseUrl + 'rest/V1/products';
 
  private userName = 'ezeebiadmin'; // add your username
  private userPass = 'DeltaLabs@2019'; // add your passwoord
  private adminToken: any;
 
  public prodItems: Array<{ id: string; sku: string; name: string; image: string; price: string }> = [];
 
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.getAuthToken();

  //   this.catalog.getProduct().subscribe(data=>{
  //     this.listProduct = data
  // })
}

getAuthToken() {
  const formData = new FormData(); 
  formData.append('username', this.userName);
  formData.append('password', this.userPass);

  const adminTokenPoint = this.baseUrl + 'rest/V1/integration/admin/token';
  // make http post request to magento2 api
  this.http.post<any>(adminTokenPoint, formData)
    .subscribe(
      res => {
        this.adminToken = res;
        this.getProducts(res);
        console.log(res)
      },
      err => {
        console.log(err);
      }
    );
}

/**
 * get products from magento2 category
 * @param adminTokenStr
 */
getProducts(adminTokenStr: string) {
  const adminToken = adminTokenStr;
  const categoryId = 1; // get products from category id 3
  const sortOderType = 'DESC'; // sort order type
  const pageSize = 10; // number of products
  const currentPage = 1; // get products for first page
  const apiEndPoint = `
  ${this.apiEndPoint}?searchCriteria[filterGroups][0][filters][0][field]=category_id&
  searchCriteria[filterGroups][0][filters][0][value]=${categoryId}&
  searchCriteria[filterGroups][0][filters][0][conditionType]=eq&
  searchCriteria[sortOrders][0][field]=created_at&
  searchCriteria[sortOrders][0][direction]=${sortOderType}&
  searchCriteria[pageSize]=${pageSize}&
  searchCriteria[currentPage]=${currentPage}
  `;

  // make http request to magento2's api
  this.http.get<any>(apiEndPoint, {
    headers: { 'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
     'Authorization':'Bearer ' + adminToken}
    }).subscribe(
      res => {
        console.log('res');
        console.log(res);
        const prodsArr = res.items;

        prodsArr.forEach((item:any)=>{
        const imagePath = `${this.baseUrl}pub/media/catalog/product${item.custom_attributes[0].value}`;
        this.prodItems.push({
            id: item.id,
            sku: item.sku,
            name: item.name,
            image: imagePath,
            price: item.price,
          });
        });
      },
      err => {
        console.log(err);
      }
    );
}
}
