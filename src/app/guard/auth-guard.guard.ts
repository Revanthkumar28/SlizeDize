import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterFormService } from 'src/app/service/registerDetails/register-form.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private RegisterFormService:RegisterFormService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.RegisterFormService.getCurrentUserRole();
    // return !!;

    if (user && (user.user_type === 'ho' || user.user_type === 'he') && this.RegisterFormService.loggedIn()) {
      // this.router.navigate(['/console'])
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false; // Access denied
    }

  }
  
}



// LOGIN GAURD
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private RegisterFormService:RegisterFormService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.RegisterFormService.getCurrentUserRole();
    // if (user && (user.user_type === 'ho' || user.user_type === 'he') && this.RegisterFormService.loggedIn()) {
    //   // this.router.navigate(['/console'])
    //   return true;
    // }

    if(user && (user.user_type === 'ho' || user.user_type === 'he') && this.RegisterFormService.loggedIn()) {
      // User is logged in, redirect to a different page (e.g., dashboard)
      this.router.navigate(['/console']);
      return false; // Prevent access to the login page
    } else if(user && (user.user_type === 'vu') && this.RegisterFormService.loggedIn()){
      this.router.navigate(['/vendor-catalog']);
      return false; // Prevent access to the login page
    }else {
      // User is not logged in, allow access to the login page
      return true;
    }
  }
  
}
