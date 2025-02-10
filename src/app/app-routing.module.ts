import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllHotelsComponent } from './pages/all-hotels/all-hotels.component';
import { CatelogComponent } from './pages/catelog/catelog.component';
import { ConsoleComponent } from './pages/console/console.component';
import { LoginComponent } from './pages/login/login.component';
import { HotelInformationComponent } from './pages/hotel-information/hotel-information.component';
import { HotelCreationComponent } from './pages/hotel-creation/hotel-creation.component';
import { CatalogInputComponent } from './pages/catalog-input/catalog-input.component';
import { InnovativeDesignComponent } from './pages/innovative-design/innovative-design.component'
import { SharemyexperienceComponent } from './pages/sharemyexperience/sharemyexperience.component'
import { JobopportunityComponent } from './pages/jobopportunity/jobopportunity.component'
import { InvestmentOpportunityComponent } from './pages/investment-opportunity/investment-opportunity.component'
import { MyConnectionsComponent } from './pages/my-connections/my-connections.component'
import { OtpVerifyComponent } from './components/otp-verify/otp-verify.component';
import { AuthGuardGuard,LoginGuard } from "./guard/auth-guard.guard";
import { VendorGuardGuard } from "./guard/vendor-guard/vendor-guard.guard";

import { QuoationScreenComponent } from './components/quoation-screen/quoation-screen.component';
import { VendorCatalogComponent } from './pages/vendorCatalog/vendor-catalog/vendor-catalog.component';
import { RollsComponent } from './pages/rolls/rolls/rolls.component';
import { VendorContactFormComponent } from './components/vendor-contact-form/vendor-contact-form/vendor-contact-form.component';
import { ResolverResolver } from './guard/resolver/resolver.resolver';
import { Employee } from './guard/resolver/resolver.resolver';
import { UserName } from './guard/resolver/resolver.resolver';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';


const token = localStorage.getItem('tokenn') // Replace 'authToken' with your actual token key
// i have removed authguard in console and catalog route
  const routes: Routes = [
    
    {path: '', redirectTo: '/console', pathMatch: 'full'},
    // ,canActivate:[LoginGuard]
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: CatalogInputComponent ,canActivate:[AuthGuardGuard]},
    {path: 'detail-information', component: HotelInformationComponent ,canActivate:[AuthGuardGuard]},
    {path: 'catalog', component: HotelCreationComponent},
    {path: 'otp-verify', component: OtpVerifyComponent},
    {path: 'rfq-order', component:QuoationScreenComponent},
    {path: 'vendor-catalog', component: VendorCatalogComponent,canActivate:[VendorGuardGuard]},
    {path: 'vendor-contact-form', component: VendorContactFormComponent},
    // 
    {path: 'console', component: ConsoleComponent ,resolve: { data: ResolverResolver,emp: Employee,profile: UserName}
    ,children: [
      {path: '', redirectTo: 'catalog', pathMatch: 'full'},
      {path: 'catalog', component: CatelogComponent},
      {path: 'all-hotels', component: AllHotelsComponent}, 
      {path: 'innovativeDesign', component: InnovativeDesignComponent},
      {path: 'sharemyexperience', component: SharemyexperienceComponent},
      {path: 'jopopportunity', component: JobopportunityComponent},
      {path: 'InvestmentOpportunity', component: InvestmentOpportunityComponent},
      {path: 'MyConnections', component: MyConnectionsComponent},
      {path: 'Settings', component: RollsComponent},
    ]},
    // {path: 'dashboard',
    //   component: ConsoleComponent,
    //   children: [
    //     {path: '', redirectTo: 'job', pathMatch: 'full'},
    //     {path: 'catalog', component: CatelogComponent},
       
    //     { path: 'job', component: JobopportunityComponent }
    //   ]
    //  }
  
    
  
  ];
  const routes2: Routes = [
     {path: '', redirectTo: '/console', pathMatch: 'full'},

    // ,canActivate:[LoginGuard]
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: CatalogInputComponent ,canActivate:[AuthGuardGuard]},
   
    {path: 'console',
      component: ConsoleComponent,
      children: [
        {path: '', redirectTo: 'jopopportunity', pathMatch: 'full'},
        {path: 'catalog', component: CatelogComponent},
       
        { path: 'jopopportunity', component: JobopportunityComponent }
      ]
     }
  
    

  ]
  @NgModule({
    imports: [RouterModule.forRoot( routes)],
    exports: [RouterModule]
  })





export class AppRoutingModule { }
export const routerComponents = [
  ConsoleComponent,
  CatelogComponent
]


