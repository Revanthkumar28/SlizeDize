import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HotelService } from 'src/app/service/hotel/hotel.service';
import { switchMap } from 'rxjs/operators'; // Import switchMap operator
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverResolver implements Resolve<any> {
  constructor(private HotelService: HotelService,private authService: AuthServiceService) {}
 
  resolve(): Observable<any> | Promise<any> | any {
    const isLoggedIn = this.authService.login();
    if (isLoggedIn) {
          return this.HotelService.getDetails(); // Assuming getData() method in DataService fetches data from API

    }
  
 }
 
  
}

// USER PROFILE 
@Injectable({
  providedIn: 'root'
})
export class UserName implements Resolve<any> {
  constructor(private HotelService: HotelService,private authService: AuthServiceService) {}

  resolve(): Observable<any> | Promise<any> | any {
    const isLoggedIn = this.authService.login();
    if (isLoggedIn) {
      return this.HotelService.user_name(); // Assuming getData() method in DataService fetches data from API

    }
  }
  
}

// 
@Injectable({
  providedIn: 'root'
})
export class Employee implements Resolve<any> {
  constructor(private HotelService: HotelService,private authService: AuthServiceService) {}

  resolve(): Observable<any> | Promise<any> | any {
    const isLoggedIn = this.authService.login();
    if (isLoggedIn) {
      return this.HotelService.user_privilege(); // Assuming getData() method in DataService fetches data from API

    }
  }
  
}

// VENDOR API 
// @Injectable({
//   providedIn: 'root'
// })
// export class Vendor implements Resolve<any> {
//   constructor(private HotelService: HotelService) {}

//   resolve(): Observable<any> | Promise<any> | any {
//     return this.HotelService.vendor_catlog(); // Assuming getData() method in DataService fetches data from API
//   }
  
// }

