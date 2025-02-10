import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterFormService } from 'src/app/service/registerDetails/register-form.service';

@Injectable({
  providedIn: 'root'
})
export class VendorGuardGuard implements CanActivate {
  constructor(private router: Router, private RegisterFormService:RegisterFormService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.RegisterFormService.getCurrentUserRole();
    // return !!;

    if (user && user.user_type == "vu" && this.RegisterFormService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false; // Access denied
    }


  }
  
}
