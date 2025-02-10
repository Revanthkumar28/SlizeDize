import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MagentoProductService {

  constructor(private httpclient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type' : 'application/json',
      'Accesss-token':'852jyuhvv810nflpdb1hvf8mikxnxad5'
    })
  };

  getProduct(): Observable<any[]>{
    return this.httpclient.get<any[]>('https://ezeebi.com/htptyhrfejl86tfcxfmjdxmkjysaryjnvdetg/rest/v1/products',{headers: this.httpOptions.headers})
  }
}