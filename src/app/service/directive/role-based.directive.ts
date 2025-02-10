// role-based-button.directive.ts

import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AppserviceService } from 'src/app/service/appservice/appservice.service';
import { Subscription } from 'rxjs';


@Directive({
  selector: '[appRoleBasedButton]',
})
export class RoleBasedButtonDirective {
    private subscription: Subscription = new Subscription();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: AppserviceService
  ) {}

  @Input() set appRoleBasedButton(allowedRoles: any | any[]) {
    // Unsubscribe to prevent multiple subscriptions
    // this.subscription.unsubscribe();
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    this.subscription = this.userService.role$.subscribe((userRole:any) => {
      this.viewContainer.clear(); // Always clear before deciding whether to display

      // if (roles.includes(userRole)) {
      //   this.viewContainer.createEmbeddedView(this.templateRef);
      // }

      if(userRole.length > 0){
        if (userRole.some((role:any) => roles.includes(role))) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      }
      
    });
  }

  ngOnDestroy() {
    // Ensure to unsubscribe when the directive is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
