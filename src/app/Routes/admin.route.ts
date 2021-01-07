import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { Dashboard } from "../SysManage/Dashboard/Dashboard";
import { User } from "../SysManage/User/User";
import { UserAccess } from "../SysManage/UserAccess/UserAccess";
import { UserAccessType } from "../SysManage/UserAccessType/UserAccessType";
import { UserRole } from "../SysManage/UserRole/UserRole";
import { MenuSetting } from "../SysManage/MenuSetting/MenuSetting";
import { EmployeeBasic } from "../SysManage/Employee/EmployeeBasic/EmployeeBasic";
import { EmployeeDepartment } from "../SysManage/Employee/EmployeeDepartment/EmployeeDepartment";
import { EmployeeDesignation } from "../SysManage/Employee/EmployeeDesignation/EmployeeDesignation";
import { Location } from "../SysManage/Settings/Location/Location";
import { CompanyProfile } from "../SysManage/Settings/CompanyProfile/CompanyProfile";

import { NoAccess } from "../Layouts/NoAccess/NoAccess";
import { NotFound } from "../Layouts/NotFound/NotFound";

//template pages
import { TmpProfile } from "../SysManage/template/TmpProfile/TmpProfile";
import { TmpIcon } from "../SysManage/template/TmpIcon/TmpIcon";
import { TmpTypography } from "../SysManage/template/TmpTypography/TmpTypography";
import { TmpTable } from "../SysManage/template/TmpTable/TmpTable";
import { TmpNotification } from "../SysManage/template/TmpNotification/TmpNotification";
import { TmpPanel } from "../SysManage/template/TmpPanel/TmpPanel";
import { TmpElement } from "../SysManage/template/TmpElement/TmpElement";
import { TmpDashboard } from "../SysManage/template/TmpDashboard/TmpDashboard";
import { NotiflixUI } from "../SysManage/template/NotiflixUI/NotiflixUI";

//ClientBusiness Master Pages
import { Country } from "../ClientBusiness/Master/Country/Country";
import { Currency } from "../ClientBusiness/Master/Currency/Currency";
import { Customer } from "../ClientBusiness/Master/Customer/Customer";
import { CutomerType} from "../ClientBusiness/Master/CutomerType/CutomerType";
import { PaymentType } from "../ClientBusiness/Master/PaymentType/PaymentType";
import { TourPackage } from "../ClientBusiness/Master/TourPackage/TourPackage";
import { Airline } from "../ClientBusiness/Master/Airline/Airline";
import { Destination } from "../ClientBusiness/Master/Destination/Destination";
import { TravelProduct } from "../ClientBusiness/Master/TravelProduct/TravelProduct";
import { TravelProvider } from "../ClientBusiness/Master/TravelProvider/TravelProvider";


export const AdminRoutes: Routes = [
	{ path: '', component: Dashboard },
	{ path: 'system/employee/basicinfo', component: EmployeeBasic },
	{ path: 'system/employee/department', component: EmployeeDepartment },
	{ path: 'system/employee/designation', component: EmployeeDesignation },
	{ path: 'system/settings/companyprofile', component: CompanyProfile },
	{ path: 'system/settings/location', component: Location },
	{ path: 'dashboard', component: Dashboard },
	{ path: 'no/access', component: NoAccess },
	{ path: 'not/found', component: NotFound },

	{ path: 'system/user', component: User },
	{ path: 'system/user/role', component: UserRole },
	{ path: 'system/user/access', component: UserAccess },
	{ path: 'system/user/access/type', component: UserAccessType },
	{ path: 'system/menu/setting', component: MenuSetting },

	{ path: 'system/template/profile', component: TmpProfile },
	{ path: 'system/template/icon', component: TmpIcon },
	{ path: 'system/template/typography', component: TmpTypography },
	{ path: 'system/template/table', component: TmpTable },
	{ path: 'system/template/notification', component: TmpNotification },
	{ path: 'system/template/panel', component: TmpPanel },
	{ path: 'system/template/element', component: TmpElement },
	{ path: 'system/template/dashboard', component: TmpDashboard },
	{ path: 'system/template/notifilix', component: NotiflixUI },

	//ClientBusiness Master Routes

	{ path: 'client/business/travel/country', component: Country },
	{ path: 'client/business/travel/currency', component: Currency },
	{ path: 'client/business/travel/customer', component: Customer },
	{ path: 'client/business/travel/customer/type', component: CutomerType },
	{ path: 'client/business/travel/package', component: TourPackage },
	{ path: 'client/business/travel/payment/type', component: PaymentType },
	{ path: 'client/business/travel/airline', component: Airline },
	{ path: 'client/business/travel/destination', component: Destination },
	{ path: 'client/business/travel/product/service', component: TravelProduct },
	{ path: 'client/business/travel/provider', component: TravelProvider },

];