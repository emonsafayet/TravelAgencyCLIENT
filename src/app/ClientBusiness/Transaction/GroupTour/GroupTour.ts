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
import { GroupTourInfoMasterModel, GroupTourInfoDetailModel, GroupTourInfoModelDTO } from '../../../Classes/Transaction/GroupTourModel';
import { library } from '@fortawesome/fontawesome-svg-core';

declare var moment: any;
@Component({
	templateUrl: 'GroupTour.html'
})
export class GroupTour implements OnInit {
	user: any;

	groupTourList: any[] = [];
	groupTourInfoMasterObj: GroupTourInfoMasterModel = new GroupTourInfoMasterModel();
	groupTourInfoDetailObj: GroupTourInfoDetailModel = new GroupTourInfoDetailModel();
	GroupTourInfoModelDTOObj: GroupTourInfoModelDTO = new GroupTourInfoModelDTO();

	grouptourinfoList: any[] = [];
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
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.groupTourInfoMasterObj.TourDate = moment().format(Common.SQLDateFormat);
		this.GETCustomerLIST();
		this.GETCompanyLIST();
		this.GETCurrencyList();
		this.GETSalesStaffLIST();
		this.GETCardLIST();
		this.GETActiveCurrencyRateLIST();
		this.GetPackageList();
		this.GETGroupTourLIST();
		this.Notification.LoadingRemove();
	}


	saveGroupInfo() {
		// Validation
		if (!this.validateModel()) return;
		this.groupTourInfoMasterObj.GroupTourInfoDetail = Library.encode(this.packageDetailsInfoObj.filter(i => i.isSelected == true));

		this.groupTourInfoMasterObj.CreatedBy = this.user.EmployeeCode;

		this.transactionCommonService.saveUpdateGroupTour(this.groupTourInfoMasterObj)
			.subscribe(
				data => this.setsaveResult(data),
				error => this.Notification.Error(error)
			);

	}
	setsaveResult(Data: any) {
		if (Data.ID > 0) {
			this.Notification.Success("Save Successfully");
			this.ResetModel();
			document.getElementById("GroupTourList_tab").click();
			this.GETGroupTourLIST();

		}
	}
	ResetModel() {
		this.groupTourInfoMasterObj = new GroupTourInfoMasterModel();
	}
	validateModel() {
		debugger
		var result = true;
		try {
			if (Library.isUndefinedOrNullOrZero(this.groupTourInfoMasterObj.PackageName)) {
				this.Notification.Warning('Select package name.');
				result = false;
			}

			else if (this.groupTourInfoMasterObj.SalesStaffCode == "0") {
				this.Notification.Warning('Please package name.');
				result = false;
			}
			// if (Library.isNuLLorUndefined(this.groupTourInfoMasterObj.NoOfDay)) {
			// 	this.Notification.Warning('Please No Of Days.');
			// 	result = false;
			// 	return
			// }

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
	GETGroupTourLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GetGroupTourList()
			.subscribe(
				data => this.setGroupTourLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setGroupTourLIST(data) {
		debugger
		this.grouptourinfoList = data;
		this.Notification.LoadingRemove();

	}
	EditItem() {
		this.groupTourInfoMasterObj.TourDate = moment(new Date(this.groupTourInfoMasterObj.TourDate)).format(Common.SQLDateFormat);
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
		debugger
		this.packagename = "";
		var packName = this.packageList.filter(p => p.PackageCode == item)[0];
		if (Library.isNullOrEmpty(packName))
			this.groupTourInfoMasterObj.package = "";
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
			debugger
			if (Number(this.groupTourInfoMasterObj.CurrencyRate) == 0) this.groupTourInfoMasterObj.CurrencyRate = 1;
			var serviceCharge: any = 0;

			var totalServiceCharge = Number(this.groupTourInfoMasterObj.TotalServiceCharge);
			serviceCharge = Number(totalServiceCharge) * Number(this.groupTourInfoMasterObj.CurrencyRate);
			this.groupTourInfoMasterObj.TotalPayable = Number(serviceCharge);
		}, 100);

	}
	onCurrencyChange(item) {

		this.groupTourInfoMasterObj.TotalServiceCharge = 0;
		this.groupTourInfoMasterObj.TotalPayable = 0;

		var RateItem = this.activeCurrencyRateList.filter(c => c.Currency == item)[0];
		if (Library.isNullOrEmpty(RateItem)) this.groupTourInfoMasterObj.CurrencyRate = 0;
		else this.groupTourInfoMasterObj.CurrencyRate = RateItem.Rate;
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