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
@Component({
	templateUrl: 'VisaRegistration.html'
})
export class VisaRegistration implements OnInit {
	user: any; 

	visaRegList:any=[];
	visaRegObj: VisaRegModel = new VisaRegModel();
	customerList: any[] = [];
	companyList: any[] = [];
	currencyList: any[] = [];
	visaTypeList: any[] = [];
	salesStaffList: any[] = [];
	activeCurrencyRateList: any[] = [];
	countryList:any[]=[];
	cardList: any[] = [];
	SearchVisaRegList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
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
	saveVisaReg(){

	}
	ResetModel(){

	}
	EditItem(item) {
		this.visaRegObj = JSON.parse(JSON.stringify(item));
		if (Library.isNuLLorUndefined(item.SalesStaffCode)) this.visaRegObj.SalesStaffCode = "0";
		if (Library.isNuLLorUndefined(item.CompanyCode)) this.visaRegObj.CompanyCode = "0";
		if (Library.isNuLLorUndefined(item.VisaTypeName)) this.visaRegObj.VisaType = "0";
		if (Library.isNuLLorUndefined(item.CustomerCode)) this.visaRegObj.CustomerCode = "0"; 
		if (Library.isNuLLorUndefined(item.CardID)) this.visaRegObj.CardID = "0";
		if (Library.isNuLLorUndefined(item.CurrencyName)) this.visaRegObj.Currency = "0";
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
	updateTotalPayable(){
		debugger 
		var serviceCharge: any =0;
		var regCharge =Number(this.visaRegObj.VisaFee) * Number(this.visaRegObj.CurrencyRate);
		serviceCharge=  (Number(regCharge))/100 *Number(this.visaRegObj.ServiceCharge);		
		this.visaRegObj.TotalPayable=Number(regCharge.toFixed(2)) +Number(serviceCharge.toFixed(2));
	 
	}
	onCurrencyChange(item){
		debugger 	
		this.visaRegObj.GovtTax=0;
		this.visaRegObj.ServiceCharge=0;
		this.visaRegObj.TotalPayable=0;	 
		this.visaRegObj.VisaFee=0;	 

		var RateItem = this.activeCurrencyRateList.filter(c => c.Currency == item)[0];
		if(Library.isNullOrEmpty(RateItem)) this.visaRegObj.CurrencyRate = 0 ;
		else this.visaRegObj.CurrencyRate =RateItem.Rate;	
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