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
import { VisaRegModel } from '../../../Classes/Transaction/VisaRegModel';
import { library } from '@fortawesome/fontawesome-svg-core';

//
declare var moment: any;
@Component({
	templateUrl: 'VisaRegistration.html'
})
export class VisaRegistration implements OnInit {
	user: any;

	visaRegList: any[] = [];
	visaRegObj: VisaRegModel = new VisaRegModel();
	customerList: any[] = [];
	companyList: any[] = [];
	currencyList: any[] = [];
	visaTypeList: any[] = [];
	salesStaffList: any[] = [];
	activeCurrencyRateList: any[] = [];
	countryList: any[] = [];
	cardList: any[] = [];
	SearchVisaRegList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.visaRegObj.VisaRegDate = moment().format(Common.SQLDateFormat);
		this.GETCustomerLIST();
		this.GETCompanyLIST();
		this.GETCurrencyList();
		this.GETSalesStaffLIST();
		this.GETCardLIST();
		this.getCountryList();
		this.GETActiveCurrencyRateLIST();
		this.GETVisaTypeLIST();
		this.GETVisaTegLIST();
		this.Notification.LoadingRemove();
	}
	saveVisaReg() {
		if (this.visaRegObj.ID > 0)
			this.visaRegObj.UpdatedBy = this.user.EmployeeCode;
		else this.visaRegObj.CreatedBy = this.user.EmployeeCode;

		if (Library.isNullOrZero(this.visaRegObj.TotalPayable)) this.visaRegObj.TotalPayable = 0;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.saveOrUpdateVisaRegistation(this.visaRegObj).subscribe(
			(data) => this.setVisaReg(data),
			(error) => this.Notification.Error(error)
		);
	}
	setVisaReg(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Saved Successfully.');
		else {
			this.Notification.LoadingRemove();
		}
		this.visaRegObj = new VisaRegModel();
		this.GETVisaTegLIST();
	}
	ResetModel() {
		this.visaRegObj = new VisaRegModel();
		this.visaRegObj.CompanyCode = "0";
		this.visaRegObj.CustomerCode = "0";
		this.visaRegObj.Currency = "0";
		this.visaRegObj.SalesStaffCode = "0";
		this.visaRegObj.CurrencyRate = 0;
		this.visaRegObj.VisaRegDate = moment().format(Common.SQLDateFormat);
	}
	validateModel() {
		;
		var result = true
		if (Library.isNuLLorUndefined(this.visaRegObj.VisaRegDate)) {
			this.Notification.Warning('Please Select Registation date.');
			result = false;
			return;
		}
		if (this.visaRegObj.CustomerCode == "0") {
			this.Notification.Warning('Please Select Customer.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.visaRegObj.ServiceCharge)) {
			this.Notification.Warning('Please Enter ServiceCharge.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.visaRegObj.VisaType) || this.visaRegObj.VisaType == "0") {
			this.Notification.Warning('Please Select Visa Type .');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.visaRegObj.VisaCountry) || this.visaRegObj.VisaCountry == "0") {
			this.Notification.Warning('Please Select Visa Country .');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.visaRegObj.PassportNo)) {
			this.Notification.Warning('Please Enter Passport Number .');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.visaRegObj.Currency) || this.visaRegObj.Currency == "0") {
			this.Notification.Warning('Please Select Currency .');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.visaRegObj.CardID) || this.visaRegObj.CardID == "0") {
			this.Notification.Warning('Please Enter CardCode.');
			result = false;
			return;
		}

		if (Library.isNuLLorUndefined(this.visaRegObj.SalesStaffCode) || this.visaRegObj.SalesStaffCode == "0") {
			this.Notification.Warning('Please Select Sales Staff .');
			result = false;
			return;
		}
		if (Library.isNullOrZero(this.visaRegObj.VisaFee)) {
			this.Notification.Warning('Please Enter  Visa Fee.');
			result = false;
			return;
		}
		if (Library.isNullOrZero(this.visaRegObj.ServiceCharge)) {
			this.Notification.Warning('Please Enter Service Charge.');
			result = false;
			return;
		}
		if (Library.isNullOrZero(this.visaRegObj.GovtTax)) {
			this.Notification.Warning('Please Enter Govt Tax.');
			result = false;
			return;
		}
		if (Library.isNullOrZero(this.visaRegObj.TotalPayable)) {
			this.Notification.Warning('Total Payable Amount Can Not Zero.');
			result = false;
			return;
		}
		return result;
	}
	EditItem(item) {
		this.visaRegObj = JSON.parse(JSON.stringify(item));
		if (Library.isNuLLorUndefined(item.SalesStaffCode)) this.visaRegObj.SalesStaffCode = "0";
		if (Library.isNuLLorUndefined(item.CompanyCode)) this.visaRegObj.CompanyCode = "0";
		if (Library.isNuLLorUndefined(item.VisaTypeName)) this.visaRegObj.VisaType = "0";
		if (Library.isNuLLorUndefined(item.CustomerCode)) this.visaRegObj.CustomerCode = "0";
		if (Library.isNuLLorUndefined(item.CardName)) this.visaRegObj.CardID = "0";
		if (Library.isNuLLorUndefined(item.CurrencyName)) this.visaRegObj.Currency = "0";
		this.visaRegObj.VisaRegDate = moment(new Date(this.visaRegObj.VisaRegDate)).format(Common.SQLDateFormat);

	}
	GETVisaTegLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GETVisaRegistationLIST()
			.subscribe(
				data => this.setVisaRegLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setVisaRegLIST(data) {
		this.visaRegList = data;
		this.Notification.LoadingRemove();

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
	GETVisaTypeLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GETVisaTypeLIST()
			.subscribe(
				data => this.setVisaTypeLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setVisaTypeLIST(data) {
		this.visaTypeList = data;
		this.Notification.LoadingRemove();

	}
	updateTotalPayable() {
		debugger
		var serviceCharge: any = 0;
		if (Library.isNuLLorUndefined(this.visaRegObj.CurrencyRate))
			this.visaRegObj.CurrencyRate = 1;
		var regCharge = Library.isUndefinedOrNullOrZeroReturn0(Number(this.visaRegObj.VisaFee)) * Library.isUndefinedOrNullOrZeroReturn0(Number(this.visaRegObj.CurrencyRate));
		serviceCharge = (Number(regCharge)) / 100 * Library.isUndefinedOrNullOrZeroReturn0(Number(this.visaRegObj.ServiceCharge));
		this.visaRegObj.TotalPayable = Number(regCharge) + Number(serviceCharge)
									+ Library.isUndefinedOrNullOrZeroReturn0(Number(this.visaRegObj.GovtTax));
		this.visaRegObj.TotalPayable = Number(this.visaRegObj.TotalPayable.toFixed(2));

	}
	onCurrencyChange(item) {

		this.visaRegObj.GovtTax = 0;
		this.visaRegObj.ServiceCharge = 0;
		this.visaRegObj.TotalPayable = 0;
		this.visaRegObj.VisaFee = 0;

		var RateItem = this.activeCurrencyRateList.filter(c => c.Currency == item)[0];
		if (Library.isNullOrEmpty(RateItem)) this.visaRegObj.CurrencyRate = 0;
		else this.visaRegObj.CurrencyRate = RateItem.Rate;
	}
	//get travel Product List
	getCountryList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getTravelcountryList()
			.subscribe(
				data => this.setCountryList(data),
				error => this.Notification.Error(error)
			);
	}
	setCountryList(data) {
		this.countryList = data;
		this.Notification.LoadingRemove();
	}

}