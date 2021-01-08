import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routing } from './app.route';
import { map } from 'rxjs/operators';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { AuthGuard } from './authGuard.guard';

import { ReactiveFormsModule } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
// ng-select
import { NgSelectModule } from '@ng-select/ng-select';
// Components
import { _Customer } from "./ClientBusiness/Master/_Customer/_Customer";

import { _Currency } from "./ClientBusiness/Master/_Currency/_Currency";

import { TypPayment } from "./ClientBusiness/Master/TypPayment/TypPayment";

import { TypCustomer } from "./ClientBusiness/Master/TypCustomer/TypCustomer";

import { Airline } from "./ClientBusiness/Master/Airline/Airline";

import { Destination } from "./ClientBusiness/Master/Destination/Destination"; 

import { Country } from "./ClientBusiness/Master/Country/Country";
import { TourPackage } from "./ClientBusiness/Master/TourPackage/TourPackage";
import { TravelProduct } from "./ClientBusiness/Master/TravelProduct/TravelProduct";
import { Provider } from "./ClientBusiness/Master/Provider/Provider";
import { NotiflixUI } from "./SysManage/template/NotiflixUI/NotiflixUI";

import { EmployeeBasic } from "./SysManage/Employee/EmployeeBasic/EmployeeBasic";

import { EmployeeDesignation } from "./SysManage/Employee/EmployeeDesignation/EmployeeDesignation";
import { EmployeeDepartment } from "./SysManage/Employee/EmployeeDepartment/EmployeeDepartment";
// import { EmployeeInfo } from "./SysManage/Employee/EmployeeInfo/EmployeeInfo";

import { TmpProfile } from "./SysManage/template/TmpProfile/TmpProfile";
import { TmpIcon } from "./SysManage/template/TmpIcon/TmpIcon";
import { TmpTypography } from "./SysManage/template/TmpTypography/TmpTypography";
import { TmpTable } from "./SysManage/template/TmpTable/TmpTable";
import { TmpNotification } from "./SysManage/template/TmpNotification/TmpNotification";
import { TmpPanel } from "./SysManage/template/TmpPanel/TmpPanel";
import { TmpElement } from "./SysManage/template/TmpElement/TmpElement";
import { TmpDashboard } from "./SysManage/template/TmpDashboard/TmpDashboard";

import { NotFound } from "./Layouts/NotFound/NotFound";
import { NoAccess } from "./Layouts/NoAccess/NoAccess";
import { UserAccessType } from "./SysManage/UserAccessType/UserAccessType";
import { UserAccess } from "./SysManage/UserAccess/UserAccess";
import { User } from "./SysManage/User/User";
import { UserRole } from "./SysManage/UserRole/UserRole";
import { MenuSetting } from "./SysManage/MenuSetting/MenuSetting";
import { CompanyProfile } from "./SysManage/Settings/CompanyProfile/CompanyProfile";
import { Location } from "./SysManage/Settings/Location/Location";
import { Login } from "./Public/Login/Login";

import { Dashboard } from "./SysManage/Dashboard/Dashboard";

import { AdminLayout } from "./Layouts/AdminLayout/AdminLayout";
import { Sidebar } from "./Layouts/sidebar/sidebar";
import { Navbar } from "./Layouts/navbar/navbar";

// PIPES 
import { ArraySortPipe } from "./pipes/arraySortPipe.pipe";
import { TableHtmlPipe } from "./pipes/tableHtml.pipe";
import { RemoveZeroPipe } from "./pipes/RemoveZero.pipe";
import { ShortNamePipe } from "./pipes/shortName.pipe";
import { ShortNamePipe2 } from "./pipes/shortName2.pipe";
import { LeoxTimePipe } from "./pipes/LeoxTime.pipe";
import { Leox_CurrencyPipe } from "./pipes/currency.pipe";
import { ChangeStatusPipe } from "./pipes/changeStatus.pipe";
import { PercentCheckPipe } from "./pipes/percentCheck.pipe";

import { RemoveZeroOrNullPipe } from "./pipes/removeZeroOrNull.pipe";
import { ValueInShort } from "./pipes/ValueInShort.pipe";
import { FilterPipe } from "./pipes/Filter.pipe";
import { DaysFromDatePipe } from "./pipes/DaysFromDate.pipe";
import { LimitTextPipe } from "./pipes/limitText.pipe";
import { Format_Percentage } from "./pipes/formatPercentage.pipe";
import { AmountInWords } from "./pipes/AmountInWords.pipe";
import { NumberToRoman } from "./pipes/NumberToRoman.pipe.";
import { showInMillion } from "./pipes/showInMillion.pipe";
import { showInCrore } from "./pipes/showInCrore.pipe";
import { ProductNameShorter } from "./pipes/ProductNameShorter.pipe";

// Services 
import { ClientBusinessService } from "./Services/ClientBusiness.service";
import { NotificationService } from "./Services/Notification.service";
import { EmployeeService } from "./Services/Employee.service";
import { UserAccessService } from "./Services/UserAccess.service";
import { MasterService } from "./Services/Master.service";
import { UserService } from "./Services/User.service";
import { MenuService } from "./Services/menu.service";




@NgModule({
  declarations: [
    AppComponent
    , Navbar, Sidebar, AdminLayout, Dashboard, Login, MenuSetting, UserRole, User, UserAccess, UserAccessType,
    NoAccess, NotFound, TmpDashboard, TmpElement, TmpPanel, TmpNotification, TmpTable, TmpTypography, TmpIcon, TmpProfile,

    // Pipes
    TableHtmlPipe, Leox_CurrencyPipe, LeoxTimePipe, ShortNamePipe, RemoveZeroPipe, ValueInShort, RemoveZeroOrNullPipe, ChangeStatusPipe, AmountInWords,
    PercentCheckPipe, FilterPipe, ArraySortPipe, DaysFromDatePipe, LimitTextPipe, Format_Percentage, NumberToRoman,
    ShortNamePipe2, showInMillion, showInCrore, ProductNameShorter, EmployeeDepartment, EmployeeDesignation, EmployeeBasic, CompanyProfile,
    Location, NotiflixUI, TravelProduct, Country, Destination, Airline, Provider, TypCustomer, TypPayment, _Currency, _Customer],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, NgSelectModule, Routing,
    // required animations module   
  ],
  providers: [AuthGuard, { provide: APP_BASE_HREF, useValue: '/' }, NotificationService,
    //SysManage
    MenuService, UserService, MasterService, UserAccessService, EmployeeService,
    //Client Business
     TourPackage, Provider, ClientBusinessService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
