import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isLoggedIn = false;


  constructor(private router: Router,) { }

  login(): boolean {
    const token = localStorage.getItem('tokenn'); // Replace 'authToken' with your actual token key
    if (token) {
      const currentuser = localStorage.getItem('currentUser');
      if(currentuser){
        const userdata = JSON.parse(currentuser)
        console.log(userdata.user_type);
        if(userdata.user_type != 'us'){
          this.isLoggedIn = true;
          console.log('User is logged in, token found in localStorage.');
          return true;
        }else{
          const uids = localStorage.getItem('u_id');
          if(!uids){
            const u_id = this.generateUniqueId()
            localStorage.setItem('u_id' ,u_id)
          }
          return false;

        }
      }else{
        return false;

      }
      
     
    } else {
      console.log('No token found. User is not logged in.');
      const uids = localStorage.getItem('u_id');
      if(!uids){
        const u_id = this.generateUniqueId()
        localStorage.setItem('u_id' ,u_id)
      }
      
      this.isLoggedIn = false;
      return false;
    }
  }
  logout(){
    this.isLoggedIn = false;
      return false;

  }
  generateUniqueId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
  }
 JobLogin():boolean{
  const currentuser = localStorage.getItem('currentUser');
  if(currentuser){
    const userdata = JSON.parse(currentuser)
    if(userdata.user_type == 'us'){
      return true
    }else{
      return false

    }
  }
  return false


 }
 
}
