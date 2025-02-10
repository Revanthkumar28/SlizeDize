// import { Injectable } from '@angular/core';
// import * as countrycitystatejson from 'countrycitystatejson';
// import { Country } from '../model/country';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/models/interfaces';
import {map, skipWhile, tap} from 'rxjs/operators'

import { environment } from 'src/environments/environment.dev';

const apiUrl = environment.apiUrl;
const s3Bucket = environment.s3Bucket;
@Injectable({
  providedIn: 'root'
})
export class CountryStateCityService {
  projectdemo:any = apiUrl
  constructor(private httpclient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
        'X-CSCAPI-KEY': 'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg=='
    })
    };

  getCountry(): Observable<Country[]>{
    return this.httpclient.get<Country[]>('https://api.countrystatecity.in/v1/countries', {headers: this.httpOptions.headers})
  }

  getStateOfSelectedCountry(countryIso: string): Observable<any>{
    return this.httpclient.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states`,{headers: this.httpOptions.headers} )
  }

  getCitiesOfSelectedState(countryIso: any, stateIso: any): Observable<any>{
    return this.httpclient.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`, {headers: this.httpOptions.headers} )
  }


  // LOCAL API (LARAVAL) START
  all_countery(){
    return this.httpclient.get<any>(this.projectdemo + '/all_countery', {headers: this.httpOptions.headers})
  }

  hotel_countery(){
    return this.httpclient.get<any>(this.projectdemo + '/hotel_countery', {headers: this.httpOptions.headers})
  }

  hotel_countery_start(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotel_countery_start",data)
  }

  hotel_countery_start_city(data:any): Observable<any>{
    return this.httpclient.post<any>(this.projectdemo + "/hotel_countery_start_city",data)
  }

  // LOCAL API (LARAVAL) END

  // getCountry(): Observable<Country[]>{
  //   return this.httpclient.get<Country[]>('https://qa.ezeebi.com/api/countries', {headers: this.httpOptions.headers})
  // }

  // getStateOfSelectedCountry(countryIso: string): Observable<any>{
  //   return this.httpclient.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states`,{headers: this.httpOptions.headers} )
  // }

  // getCitiesOfSelectedState(countryIso: any, stateIso: any): Observable<any>{
  //   return this.httpclient.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`, {headers: this.httpOptions.headers} )
  // }
//   private countryData = countrycitystatejson;

//   getCountries() {
//     return this.countryData.getCountries();
//   }

//   getStatesByCountry(countryShotName: string) {
//     return this.countryData.getStatesByShort(countryShotName);
//   }

//   getCitiesByState(country: string, state: string) {
//     return this.countryData.getCities(country, state);
//   }
}
