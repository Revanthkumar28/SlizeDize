import { Injectable,Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HttpErrorResponse } from '@angular/common/http';
import { Observable ,throwError } from 'rxjs';
import { RegisterFormService } from 'src/app/service/registerDetails/register-form.service';
import { catchError,finalize } from 'rxjs/operators';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private RegisterFormService:RegisterFormService,private AppserviceService:AppserviceService,private Injector:Injector,private toast:NgToastService) { }

  intercept(req:any, next:any){
    let registerService = this.Injector.get(RegisterFormService)
    let tokenizedRed=req.clone({
      setHeaders: {
        Authorization: `Bearer ${registerService.getToken()} `
      }
    })
    this.AppserviceService.buttonDisabled(true)
    return next.handle(tokenizedRed).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error and set the toggle to false
        console.log('intgercept - error')

        this.AppserviceService.error_Toggle(false);
        this.AppserviceService.buttonDisabled(false)
        // Log the error or handle it as needed
        console.error('Error occurred:', error);
        // this.toast.error({ detail: "Error " + error.error.status, summary: error.error.message, duration: 2000 });

        return throwError(error);
      }),
      finalize(() => {
        this.AppserviceService.buttonDisabled(false);  // Enable the button after request completes
      })
    );
  }
}