import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  projectdemo:any = apiUrl

  constructor(private httpclient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
    })
    };

    getAllProducts(): Observable<any>{
      return this.httpclient.get<any>(this.projectdemo + "/AllProducts", {headers: this.httpOptions.headers})
    }

    BranProductsData(brandData:any): Observable<any>{
      return this.httpclient.post<any>(this.projectdemo + "/BrandProductsData",brandData)
    }

    VariantProduct(data:any): Observable<any>{
      return this.httpclient.post<any>(this.projectdemo + "/VariantProduct",data)
    }

    singleProductsById(data:any): Observable<any>{
      return this.httpclient.post<any>(this.projectdemo + "/singleProductsById",data)
    }

    image_mapping_lable(data:any): Observable<any>{
      return this.httpclient.post<any>(this.projectdemo + "/image_mapping_lable",data)
    }

    image_mapping_delete(data:any): Observable<any>{
      return this.httpclient.post<any>(this.projectdemo + "/image_mapping_delete",data)
    }

    clone_product_data(data:any): Observable<any>{
      return this.httpclient.post<any>(this.projectdemo + "/clone_product_data",data)
    }

    hotel_brand_style_scheme(data:any): Observable<any>{
      return this.httpclient.post<any>(this.projectdemo + "/hotel_brand_style_scheme",data)
    }
    hotel_style_scheme(data:any): Observable<any>{
      return this.httpclient.post<any>(this.projectdemo + "/hotel_style_scheme",data)
    }
}
