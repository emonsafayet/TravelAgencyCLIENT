import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";
//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';
import { TransactionCommonService } from '../../../Services/TransactionCommon.service';
import { Common } from "../../../library/common";
//Classes
import { HolidayPackageMasterModel, HolidayPackageDetailModel } from '../../../Classes/Transaction/HolidayTouPackModel';
import { library } from '@fortawesome/fontawesome-svg-core';

declare var moment: any;
@Component({
	templateUrl: 'HolidayPackageTour.html'
})
export class HolidayPackageTour implements OnInit {
	user: any;


	holidayTourList: any[] = [];
	HolidayPackageMasterObj: HolidayPackageMasterModel = new HolidayPackageMasterModel();
	holidayPackageDetailObj: HolidayPackageDetailModel[] =[]; //new HolidayPackageDetailModel();
 

	getpackageTourInfoList:any[]=[];
	customerList: any[] = [];
	companyList: any[] = [];
	currencyList: any[] = [];
	salesStaffList: any[] = [];
	packageList: any[] = [];
	packageDetailsInfoObj: any[] = [];
	activeCurrencyRateList: any[] = [];
	cardList: any[] = [];
	packagename: string = "";
	isSelectAllpackage: boolean = false;
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, 
		private transactionCommonService: TransactionCommonService) { }



	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.HolidayPackageMasterObj.TourDate = moment().format(Common.SQLDateFormat);
		this.GETCustomerLIST();
		this.GETCompanyLIST();
		this.GETCurrencyList();
		this.GETSalesStaffLIST();
		this.GETCardLIST();
		this.GETActiveCurrencyRateLIST();
		this.GetPackageList();

		this.GETHolidayPackageTourList();

		this.Notification.LoadingRemove();
	}

	GETHolidayPackageTourList() {
		
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.getholidayPackageTourList()
			.subscribe(
				data => this.setHolidayPackageTourLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setHolidayPackageTourLIST(data) {
		
		this.getpackageTourInfoList = data;
		this.Notification.LoadingRemove();

	}

	saveHolidayPackageInfo() {
		// Validation
		if (!this.validateModel()) return;
		this.HolidayPackageMasterObj.HolidayPackageDetail = Library.encode(this.packageDetailsInfoObj.filter(i => i.isSelected == true));
		this.HolidayPackageMasterObj.CreatedBy = this.user.EmployeeCode;

		this.transactionCommonService.saveUpdateHolidayPackageTour(this.HolidayPackageMasterObj)
			.subscribe(
				data => this.setsaveResult(data),
				error => this.Notification.Error(error)
			);

	}
	setsaveResult(Data: any) {
		if (Data.ID > 0) {
			this.Notification.Success("Save Successfully");
			this.ResetModel();
			document.getElementById("HolidayTourList_tab").click();
			// this.GETGroupTourLIST();

		}
	}
	ResetModel() {
		this.HolidayPackageMasterObj = new HolidayPackageMasterModel();
	}
	validateModel() {
		
		var result = true;
		try {
			if (Library.isUndefinedOrNullOrZero(this.HolidayPackageMasterObj.PackageCode)) {
				this.Notification.Warning('Select package name.');
				result = false;
			}

			else if (this.HolidayPackageMasterObj.SalesStaffCode == "0") {
				this.Notification.Warning('Please package name.');
				result = false;
			}  

			if (this.packageDetailsInfoObj.filter(i => i.isSelected == true).length == 0) {
				this.Notification.Warning('Please select at least One Event.');
				result = false;
			}
		}
		catch (e) {
			this.Notification.Warning('Please Select item.');
			return false;
		}
		return result;
	}
	EditItem(item) {
		this.HolidayPackageMasterObj=JSON.parse(JSON.stringify(item)); 
		this.HolidayPackageMasterObj.TourDate = moment(new Date(this.HolidayPackageMasterObj.TourDate)).format(Common.SQLDateFormat);
		
		this.transactionCommonService.getHolidayPackageDetailByHOPCodeList(this.HolidayPackageMasterObj.HOPCode)
		.subscribe(
			data => this.holidayPackageDetailObj = data,
			error => this.Notification.Error(error)
		
		);	console.log(this.holidayPackageDetailObj);
		document.getElementById('HolidayTourEntry_tab').click();

	}
	//DROP DOWN
	GETCompanyLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GETCompanyLIST()
			.subscribe(
				data => this.setCompanyLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setCompanyLIST(data) {
		this.companyList = data;
		this.Notification.LoadingRemove();

	}
	GETCurrencyList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getCurrencyList()
			.subscribe(
				data => this.setCurrencyList(data),
				error => this.Notification.Error(error)
			);
	}
	setCurrencyList(data) {
		this.currencyList = data;
		this.Notification.LoadingRemove();
	}
	GETSalesStaffLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GETSalesStaffLIST()
			.subscribe(
				data => this.setSalesStaffLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setSalesStaffLIST(data) {
		this.salesStaffList = data;
		this.Notification.LoadingRemove();

	}
	GETCardLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getcardList()
			.subscribe(
				data => this.setcardList(data),
				error => this.Notification.Error(error)
			);
	}
	setcardList(data) {
		this.cardList = data;
		this.Notification.LoadingRemove();

	}
	GETActiveCurrencyRateLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GETActiveCurrencyRateLIST()
			.subscribe(
				data => this.setActiveCurrencyRateList(data),
				error => this.Notification.Error(error)
			);
	}
	setActiveCurrencyRateList(data) {
		this.activeCurrencyRateList = data;
		this.Notification.LoadingRemove();

	}
	GETCustomerLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getcustomerList()
			.subscribe(
				data => this.setCustomerLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setCustomerLIST(data) {
		this.customerList = data;
		this.Notification.LoadingRemove();

	}
	GetPackageList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getPackageList()
			.subscribe(
				data => this.setPackageList(data),
				error => this.Notification.Error(error)
			);
	}
	setPackageList(data) {
		this.packageList = data;
		this.Notification.LoadingRemove();

	}
	//get packageName
	onPackageChange(item) {		
		this.packagename = "";
		var packName = this.packageList.filter(p => p.PackageCode == item)[0];
		if (Library.isNullOrEmpty(packName))
			this.HolidayPackageMasterObj.PackageCode = "";
		this.packagename = packName.PackageName;
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getPackageDetailsByPackCodeList(packName.PackageCode)
			.subscribe(
				data => this.setPackageDetailsList(data),
				error => this.Notification.Error(error)
			);


	}
	setPackageDetailsList(data) {
		setTimeout(() => {
			this.packageDetailsInfoObj = [];
			this.packageDetailsInfoObj = data;
			this.Notification.LoadingRemove();
		}, 100);
	}
	updateTotalPayable() {
		setTimeout(() => {
			
			if (Number(this.HolidayPackageMasterObj.CurrencyRate) == 0) this.HolidayPackageMasterObj.CurrencyRate = 1;
			var serviceCharge: any = 0;

			var totalServiceCharge = Number(this.HolidayPackageMasterObj.TotalServiceCharge);
			serviceCharge = Number(totalServiceCharge) * Number(this.HolidayPackageMasterObj.CurrencyRate);
			this.HolidayPackageMasterObj.TotalPayable = Number(serviceCharge);
		}, 100);

	}
	onCurrencyChange(item) {
		this.HolidayPackageMasterObj.TotalServiceCharge = 0;
		this.HolidayPackageMasterObj.TotalPayable = 0;

		var RateItem = this.activeCurrencyRateList.filter(c => c.Currency == item)[0];
		if (Library.isNullOrEmpty(RateItem)) this.HolidayPackageMasterObj.CurrencyRate = 0;
		else this.HolidayPackageMasterObj.CurrencyRate = RateItem.Rate;
	}

	selectSinglePackage(item) {
		if (item.isSelected) {
			item.isSelected = false;
		} else item.isSelected = true;
	}
	selectAllPackage(itemList) {
		if (this.isSelectAllpackage) {
			itemList.forEach(element => {
				element.isSelected = false;
			});

			this.isSelectAllpackage = false;
		}
		else {
			itemList.forEach(element => {
				element.isSelected = true;
			});

			this.isSelectAllpackage = true;
		}
	}

}