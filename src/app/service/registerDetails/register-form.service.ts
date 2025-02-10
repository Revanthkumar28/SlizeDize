import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { RegistrationDetails, postIndustri, brandHotel } from 'src/app/models/interfaces';
import { signInDetails, signInResults } from 'src/app/models/interfaces';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment.dev';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RegisterFormService {
  tokenresp: any = ''

  apiUrls: any = apiUrl

  constructor(private httpclient: HttpClient, private router: Router) {
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    })
  };

  industrysType(): Observable<any> {
    return this.httpclient.get<any>(this.apiUrls + "/typeOfIndustry_getdata", { headers: this.httpOptions.headers })
  }

  postIndustrys(industrys: any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrls + "/typeOfIndustry", industrys)
  }

  getUserValue(register: any): Observable<RegistrationDetails[]> {
    return this.httpclient.post<RegistrationDetails[]>(this.apiUrls + "/register", register, { headers: this.httpOptions.headers })
  }
  user_register(register: any): Observable<RegistrationDetails[]> {
    return this.httpclient.post<RegistrationDetails[]>(this.apiUrls + "/user_register", register, { headers: this.httpOptions.headers })
  }
  vendor_register_first(register: any): Observable<RegistrationDetails[]> {
    return this.httpclient.post<any>(this.apiUrls + "/vendor_register_first", register, { headers: this.httpOptions.headers })
  }

  loginUsers(login: any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrls + "/login", login).pipe(
      map(user => {
        // login successful if there's a user in the response
        if (user) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          // user.authdata = window.btoa(username + ":" + password);
          localStorage.setItem("currentUser", JSON.stringify(user));
        }

        return user;
      })
    );
  }

  verifyUser(login: any): Observable<any> {
    return this.httpclient.post<any>(this.apiUrls + "/check_register", login, { headers: this.httpOptions.headers })
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("tokenn");
    localStorage.clear();
  }

  loggedIn() {
    return !!localStorage.getItem("tokenn");
  }

  getCurrentUserRole() {
    return JSON.parse(localStorage.getItem('currentUser') || "[]")
  }

  getToken() {
    return localStorage.getItem('tokenn') || '';
  }

  getroleByToken(token: any) {
    let _token = token.split('.')[1];
    this.tokenresp = window.btoa(token.split('.')[1])
    console.log(this.tokenresp)
  }


}
