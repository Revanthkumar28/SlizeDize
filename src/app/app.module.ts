import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common'
import {HttpErrorResponse } from '@angular/common/http'

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule, routerComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './material-designs/dashboard-layout/dashboard-layout.component';
import { AppbarComponent } from './material-designs/appbar/appbar.component';
import { IconButtonComponent } from './material-designs/icon-button/icon-button.component';
import { LabelComponent } from './material-designs/label/label.component';
import { SpacerComponent } from './material-designs/spacer/spacer.component';
import { IconComponent } from './material-designs/icon/icon.component';
import { BadgeComponent } from './material-designs/badge/badge.component';
import { AvatarImageComponent } from './material-designs/avatar-image/avatar-image.component';
import { TextComponent } from './material-designs/text/text.component';
import { DashboardAppbarComponent } from './components/dashboard-appbar/dashboard-appbar.component';
import { DrawerComponent } from './material-designs/drawer/drawer.component';
import { DrawerListTileComponent } from './material-designs/drawer-list-tile/drawer-list-tile.component';
import { DashboardDrawerComponent } from './components/dashboard-drawer/dashboard-drawer.component';
import { ListTileComponent } from './material-designs/list-tile/list-tile.component';
import { DashboardBodyComponent } from './components/dashboard-body/dashboard-body.component';
import { CatelogComponent } from './pages/catelog/catelog.component';
import { HeadingPanelComponent } from './components/heading-panel/heading-panel.component';
import { ContainerComponent } from './material-designs/container/container.component';
import { RowComponent } from './material-designs/row/row.component';
import { ChoiceComponent } from './material-designs/choice/choice.component';
import { InputboxComponent } from './material-designs/inputbox/inputbox.component';
import { PopupComponent } from './material-designs/popup/popup.component';
import { GestureDetectorDirective } from './service/gesture-detector/gesture-detector.directive';
import { ToggleCardComponent } from './components/toggle-card/toggle-card.component';
import { ToggleComponent } from './material-designs/toggle/toggle.component';
import { TrowComponent } from './material-designs/trow/trow.component';
import { TdataComponent } from './material-designs/tdata/tdata.component';
import { ExpandBadgeComponent } from './components/expand-badge/expand-badge.component';
import { CatelogTableComponent } from './components/catelog-table/catelog-table.component';
import { ExpandedViewComponent } from './components/expanded-view/expanded-view.component';
import { ButtonComponent } from './material-designs/button/button.component';
import { DropdownComponent } from './material-designs/dropdown/dropdown.component';
import { ProductTableDetailComponent } from './components/product-table-detail/product-table-detail.component';
import { OrderedProductsComponent } from './components/ordered-products/ordered-products.component';
import { SpecificationWarrantyComponent } from './components/specification-warranty/specification-warranty.component';
import { ImageComponent } from './material-designs/image/image.component';
import { OrderProcessComponent } from './components/order-process/order-process.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { DragScrollDirective } from './service/drag-scroll/drag-scroll.directive';
import { ProcessCardComponent } from './components/process-card/process-card.component';
import { StepperComponent } from './material-designs/stepper/stepper.component';
import { ApprovalProcessComponent } from './components/approval-process/approval-process.component';
import { RfqOrdersComponent } from './components/rfq-orders/rfq-orders.component';
import { RfqOrdersTableComponent } from './components/rfq-orders-table/rfq-orders-table.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { AllVendorDetailComponent } from './components/all-vendor-detail/all-vendor-detail.component';
import { QuoationScreenComponent } from './components/quoation-screen/quoation-screen.component';
import { QuotationTableComponent } from './components/quotation-table/quotation-table.component';
import { ConsoleComponent } from './pages/console/console.component';
import { LifecycleUsageManagementComponent } from './components/lifecycle-usage-management/lifecycle-usage-management.component';
import { StatusOrderMainComponent } from './components/status-order-main/status-order-main.component';
import { StatusOrderTableComponent } from './components/status-order-table/status-order-table.component';
import { ComparisonMarketplaceComponent } from './components/comparison-marketplace/comparison-marketplace.component';
import { AllHotelsComponent } from './pages/all-hotels/all-hotels.component';
import { FilterbySelectionCardComponent } from './components/filterby-selection-card/filterby-selection-card.component';
import { StackComponent } from './material-designs/stack/stack.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { OtpVerifyComponent } from './components/otp-verify/otp-verify.component';
import { environment } from 'src/environments/environment.dev';

import { MenuDropdownComponent } from './material-designs/menu-dropdown/menu-dropdown.component';

import { BadgeImageComponent } from './material-designs/badge-image/badge-image.component';
import { CatalogInputComponent } from './pages/catalog-input/catalog-input.component';
import { SteperComponent } from './components/steper/steper.component';
import { HotelInformationComponent } from './pages/hotel-information/hotel-information.component';
import { HotelCreationComponent } from './pages/hotel-creation/hotel-creation.component';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlagComponent } from './material-designs/flag/flag.component';
import { NgToastModule } from 'ng-angular-popup';
import { TextareaComponent } from './material-designs/textarea/textarea.component';
import { InnovativeDesignComponent } from './pages/innovative-design/innovative-design.component'
import { InnovativeDesignCardComponent } from './components/innovative-design-card/innovative-design-card.component';
import { SharemyexperienceComponent } from './pages/sharemyexperience/sharemyexperience.component';
import { JobopportunityComponent } from './pages/jobopportunity/jobopportunity.component';
import { InvestmentOpportunityComponent } from './pages/investment-opportunity/investment-opportunity.component';
import { MyConnectionsComponent } from './pages/my-connections/my-connections.component'

import { AppserviceService } from './service/appservice/appservice.service';
import { SearchFilterPipe } from './service/search-filter.pipe';
import { AlphaticPipe } from './pipe/alphatic/alphatic.pipe';
import { PieChart2Component } from './components/pie-chart2/pie-chart2.component';
import { PieChart1Component } from './components/pie-chart1/pie-chart1.component';
import { IndustryPipe } from './pipe/industry.pipe';
import { AutofocusDirective } from './service/directive/autofocus.directive';
// import { CountryFlagService } from './service/country-flag/country-flag.service';
import { AuthGuardGuard } from "./guard/auth-guard.guard";
import { TokenInterceptorService } from "./service/token-interceptor/token-interceptor.service";
import { ProtectTableTwoComponent } from './components/protect-table-two/protect-table-two/protect-table-two.component';
import { ProcessCardOneComponent } from './components/process-card-one/process-card-one/process-card-one.component';
import { ProcessCardTwoComponent } from './components/process-card-two/process-card-two/process-card-two.component';

import { DrawerListComponent } from './material-designs/drawerList/drawer-list/drawer-list.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RfqProcessListComponent } from './components/RFQ-Process/rfq-process-list/rfq-process-list.component';
import { MyFilterPipe } from './pipe/myFilter/my-filter.pipe';
import { AddVendarComponent } from './components/addVendar/add-vendar/add-vendar.component';
import { SidenavComponent } from './material-designs/sidenav/sidenav/sidenav.component';
import { VendorCatalogComponent } from './pages/vendorCatalog/vendor-catalog/vendor-catalog.component';
import { VendorLayoutComponent } from './material-designs/vendor-layout/vendor-layout/vendor-layout.component';
import { VendorBodyComponent } from './components/vendor-body/vendor-body/vendor-body.component';
import { VendorTableComponent } from './components/vendor-table/vendor-table/vendor-table.component';
import { DropdownTwoComponent } from './material-designs/dropdownTwo/dropdown-two/dropdown-two.component';
import { RfqOrderTableTwoComponent } from './components/rfq-ordeTableTwo/rfq-order-table-two/rfq-order-table-two.component';
import { UniqePipe } from './pipe/uniqe/uniqe.pipe';
import { DarkModeComponent } from './material-designs/dark-mode/dark-mode/dark-mode.component';
import { ViewSpecComponent } from './material-designs/view-spec/view-spec/view-spec.component';
import { DraggablePopupComponent } from './material-designs/draggable-popup/draggable-popup/draggable-popup.component';
import { AddProductVendorComponent } from './components/addProductVendor/add-product-vendor/add-product-vendor.component';
import { RollsComponent } from './pages/rolls/rolls/rolls.component';
import { VendorContactFormComponent } from './components/vendor-contact-form/vendor-contact-form/vendor-contact-form.component';
import { UpArrowKeyDirective } from './service/directive/up-arrow-key.directive';
import { ProcurementStageComponent } from './components/procurement-stage/procurement-stage/procurement-stage.component';
import { ApprovalProcessTrackComponent } from './components/approval-process-track/approval-process-track/approval-process-track.component';
import { DropDownXaxisComponent } from './material-designs/drop-down-xaxis/drop-down-xaxis/drop-down-xaxis.component';
import { ReleasedOrderDocumentUploadComponent } from './components/releasedOrderDocumentUpload/released-order-document-upload/released-order-document-upload.component';
import { DeleteLineItemComponent } from './popup-forms/delete-line-item/delete-line-item/delete-line-item.component';
import { ReviseReorderTableComponent } from './components/revise-reorder-table/revise-reorder-table.component';
import { RenegotiateTableComponent } from './popup-forms/renegotiate-table/renegotiate-table/renegotiate-table.component';
import { AllDocumentsComponent } from './components/all-documents/all-documents.component';
import { VendorBudgetComponent } from './popup-forms/vendor-budget/vendor-budget.component';
import { AddBudgetComponent } from './popup-forms/add-budget/add-budget.component';
// role based
import { RoleBasedButtonDirective } from './service/directive/role-based.directive';
//angular-full-calender
import { FullCalendarModule } from '@fullcalendar/angular';

// Date
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CommonModule, DatePipe } from '@angular/common';
import { AddVendorProductsComponent } from './popup-forms/add-vendor-products/add-vendor-products.component';
import { MultiSelectComponent } from './material-designs/multi-select/multi-select/multi-select.component';
import { GroupByComponent } from './popup-forms/groupBy/group-by/group-by.component';
import { UserProfileComponent } from './popup-forms/user-profile/user-profile.component';
import { UserHistoryComponent } from './popup-forms/user-history/user-history.component';
import { PendingPaymentComponent } from './popup-forms/pending-payment/pending-payment.component';
import { MultisearchFilterPipe } from './pipe/multisearch-filter.pipe';
import { MyDiagramComponent } from './pages/my-diagram/my-diagram.component';
import { MaintenanceRequestComponent } from './popup-forms/maintenance-request/maintenance-request.component';
import { PaginationComponent } from './material-designs/pagination/pagination/pagination.component';
import { OtpComponent } from './components/otp/otp/otp.component';
import { ToastComponent } from './material-designs/toast/toast.component';
import { FullHistoryComponent } from './popup-forms/full-history/full-history.component';
import { ChatEmailComponent } from './popup-forms/chat-email/chat-email.component';

// Tour-guiide
import { GuidedTourModule, GuidedTourService } from "ngx-guided-tour";
import { SignUpVendorComponent } from './components/sign-up-vendor/sign-up-vendor/sign-up-vendor.component';
import { DateTimeFormatPipe } from './pipe/dateTimeFormat/date-time-format.pipe';
import { JobAdminComponent } from './popup-forms/job-admin/job-admin.component';
import { ViewJobsComponent } from './popup-forms/view-jobs/view-jobs.component';
import { ViewJobApplicationComponent } from './popup-forms/view-job-application/view-job-application.component';
import { InvestmentAdminComponent } from './popup-forms/investment-admin/investment-admin.component';
import { InvestmentViewpropertyComponent } from './popup-forms/investment-viewproperty/investment-viewproperty.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AppComponent,
    VendorCatalogComponent,
    VendorLayoutComponent,
    VendorBodyComponent,
    VendorTableComponent,
    DashboardLayoutComponent,
    AppbarComponent,
    IconButtonComponent,
    LabelComponent,
    SpacerComponent,
    IconComponent,
    BadgeComponent,
    AvatarImageComponent,
    TextComponent,
    DashboardAppbarComponent,
    DrawerComponent,
    DrawerListTileComponent,
    DashboardDrawerComponent,
    ListTileComponent,
    DashboardBodyComponent,
    CatelogComponent,
    HeadingPanelComponent,
    ContainerComponent,
    RowComponent,
    ChoiceComponent,
    InputboxComponent,
    PopupComponent,
    GestureDetectorDirective,
    ToggleCardComponent,
    ToggleComponent,
    TrowComponent,
    TdataComponent,
    ExpandBadgeComponent,
    CatelogTableComponent,
    ExpandedViewComponent,
    ButtonComponent,
    DropdownComponent,
    ProductTableDetailComponent,
    OrderedProductsComponent,
    SpecificationWarrantyComponent,
    ImageComponent,
    OrderProcessComponent,
    ProductTableComponent,
    DragScrollDirective,
    ProcessCardComponent,
    StepperComponent,
    ApprovalProcessComponent,
    RfqOrdersComponent,
    RfqOrdersTableComponent,
    OrdersListComponent,
    AllVendorDetailComponent,
    QuoationScreenComponent,
    QuotationTableComponent,
    ConsoleComponent,
    routerComponents,
    LifecycleUsageManagementComponent,
    StatusOrderMainComponent,
    StatusOrderTableComponent,
    ComparisonMarketplaceComponent,
    AllHotelsComponent,
    FilterbySelectionCardComponent,
    StackComponent,
    HotelCardComponent,
    LoginComponent,
    SignUpComponent,
    SignInComponent,
    OtpVerifyComponent,
    HotelInformationComponent,
    HotelCreationComponent ,
    MenuDropdownComponent,
    BadgeImageComponent,
    SteperComponent,
    CatalogInputComponent,
    FlagComponent,
    TextareaComponent,
    InnovativeDesignComponent,
    InnovativeDesignCardComponent,
    SharemyexperienceComponent,
    JobopportunityComponent,
    InvestmentOpportunityComponent,
    MyConnectionsComponent,
    SearchFilterPipe,
    AlphaticPipe,
    PieChart2Component,
    PieChart1Component,
    IndustryPipe,
    AutofocusDirective,
    ProtectTableTwoComponent,   
    ProcessCardOneComponent,
    ProcessCardTwoComponent,
    DrawerListComponent,
    RfqProcessListComponent,
    MyFilterPipe,
    AddVendarComponent,
    SidenavComponent,
    DropdownTwoComponent,
    RfqOrderTableTwoComponent,
    UniqePipe,
    DarkModeComponent,
    ViewSpecComponent,
    DraggablePopupComponent,
    AddProductVendorComponent,
    RollsComponent,
    VendorContactFormComponent,
    UpArrowKeyDirective,
    ProcurementStageComponent,
    ApprovalProcessTrackComponent,
    DropDownXaxisComponent,
    ReleasedOrderDocumentUploadComponent,
    DeleteLineItemComponent,
    ReviseReorderTableComponent,
    RenegotiateTableComponent,
    AllDocumentsComponent,
    VendorBudgetComponent,
    AddBudgetComponent,
    RoleBasedButtonDirective,
    AddVendorProductsComponent,
    MultiSelectComponent,
    GroupByComponent,
    UserProfileComponent,
    UserHistoryComponent,
    PendingPaymentComponent,
    MultisearchFilterPipe,
    MyDiagramComponent,
    MaintenanceRequestComponent,
    PaginationComponent,
    OtpComponent,
    ToastComponent,
    FullHistoryComponent,
    ChatEmailComponent,
    SignUpVendorComponent,
    DateTimeFormatPipe,
    JobAdminComponent,
    ViewJobsComponent,
    ViewJobApplicationComponent,
    InvestmentAdminComponent,
    InvestmentViewpropertyComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    NgToastModule,
    Ng2SearchPipeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    FullCalendarModule,
    GuidedTourModule,
    EditorModule
  ],
  providers: [{provide : LocationStrategy , useClass: HashLocationStrategy},AppserviceService,AuthGuardGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },
  { provide:TINYMCE_SCRIPT_SRC, useValue:'tinymce/tinymce.min.js'},
  DatePipe,
  GuidedTourService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
