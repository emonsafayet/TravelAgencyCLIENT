import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";
import { Config } from 'src/app/config';
//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';
import { TransactionCommonService } from '../../../Services/TransactionCommon.service';
import { Common } from "../../../library/common";

//Classes
import { AirTicketRegModel } from '../../../Classes/Transaction/AirTicketRegModel';
import { library } from '@fortawesome/fontawesome-svg-core';
//
declare var moment: any;
@Component({
	templateUrl: 'AirTicketRegistration.html'
})
export class AirTicketRegistration implements OnInit {
	user: any;
	airTicketregistaionList: any[] = [];
	customerList: any[] = [];
	companyList: any[] = [];
	currencyList: any[] = [];
	salesStaffList: any[] = [];
	activeCurrencyRateList: any[] = [];
	cardList: any[] = [];
	seatTypeList: any[] = [];
	airLineList: any[] = [];
	travelTypeList: any[] = [];
	travelProviderList: any[] = [];
	airTicketregObj: AirTicketRegModel = new AirTicketRegModel();
	SearchAirTicketRegList: string = '';

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
		this.GetSeatTypeList();
		this.GetAirLineList();
		this.GetTravelTypeList();
		this.GetTravelProviderList();
		this.GETActiveCurrencyRateLIST();
		this.airTicketregObj.TravelDate = moment().format(Common.SQLDateFormat);
		this.airTicketregObj.ReturnDate = moment().format(Common.SQLDateFormat);
		this.airTicketregObj.ChangeDate = moment().format(Common.SQLDateFormat);
		this.GetAirTicketList();
		this.Notification.LoadingRemove();

	}

	saveAirTicketReg() {
		if (this.airTicketregObj.ID > 0)
			this.airTicketregObj.UpdatedBy = this.user.EmployeeCode;
		else this.airTicketregObj.CreatedBy = this.user.EmployeeCode;

		if (Library.isNullOrZero(this.airTicketregObj.TotalPayable)) this.airTicketregObj.TotalPayable = 0;
		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.SaveUpdateAirTicketRegistration(this.airTicketregObj).subscribe(
			(data) => this.setAirticketReg(data),
			(error) => this.Notification.Error(error)
		);
	}
	setAirticketReg(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Saved Successfully.');
		else {
			this.Notification.LoadingRemove();
		}
		this.airTicketregObj = new AirTicketRegModel();
		this.GetAirTicketList();
	}
	GetAirTicketList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GETAirTicketLIST()
			.subscribe(
				data => this.settAirTicketList(data),
				error => this.Notification.Error(error)
			);
	}
	settAirTicketList(data) {
		this.airTicketregistaionList = data;
		this.Notification.LoadingRemove();

	}
	EditItem(item) {
		this.airTicketregObj = JSON.parse(JSON.stringify(item));
		this.airTicketregObj.TravelDate = moment(new Date(this.airTicketregObj.TravelDate)).format(Common.SQLDateFormat);
		this.airTicketregObj.ReturnDate = moment(new Date(this.airTicketregObj.ReturnDate)).format(Common.SQLDateFormat);
		this.airTicketregObj.ChangeDate = moment(new Date(this.airTicketregObj.ChangeDate)).format(Common.SQLDateFormat);

	}
	ResetModel() {
		this.airTicketregObj = new AirTicketRegModel();
	}
	updateTotalPayable() {
		debugger
		var serviceCharge: any = 0;
		if (Library.isNuLLorUndefined(this.airTicketregObj.CurrencyRate))
			this.airTicketregObj.CurrencyRate = 1;
		var BaseRate = Library.isUndefinedOrNullOrZeroReturn0(Number(this.airTicketregObj.BaseFare))
						* Library.isUndefinedOrNullOrZeroReturn0(Number(this.airTicketregObj.CurrencyRate));
		serviceCharge = (Number(BaseRate)) / 100 * 
						Number(this.airTicketregObj.ServiceCharge);

		this.airTicketregObj.TotalPayable = Number(BaseRate) + Number(serviceCharge)
											+ Library.isUndefinedOrNullOrZeroReturn0(Number(this.airTicketregObj.ComissionAmount))
											+ Library.isUndefinedOrNullOrZeroReturn0(Number(this.airTicketregObj.GovTax))
											+ Library.isUndefinedOrNullOrZeroReturn0(Number(this.airTicketregObj.ChangePenalty));
		this.airTicketregObj.TotalPayable = Number(this.airTicketregObj.TotalPayable.toFixed(2));

	}
	onCurrencyChange(item) {

		this.airTicketregObj.BaseFare = 0;
		this.airTicketregObj.GovTax = 0;
		this.airTicketregObj.ServiceCharge = 0;
		this.airTicketregObj.ChangePenalty = 0;
		this.airTicketregObj.ComissionAmount = 0;
		this.airTicketregObj.TotalPayable = 0;

		var RateItem = this.activeCurrencyRateList.filter(c => c.Currency == item)[0];
		if (Library.isNullOrEmpty(RateItem)) this.airTicketregObj.CurrencyRate = 0;
		else this.airTicketregObj.CurrencyRate = RateItem.Rate;
	}

	validateModel() { 
		var result = true
		if (this.airTicketregObj.CustomerCode == "0") {
			this.Notification.Warning('Please Select Customer.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.airTicketregObj.ArilineCode)) {
			this.Notification.Warning('Please Select Airline.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.airTicketregObj.Route)) {
			this.Notification.Warning('Please Enter Route.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.airTicketregObj.SeatTypeCode)) {
			this.Notification.Warning('Please Select Seat Type.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.airTicketregObj.TravelType)) {
			this.Notification.Warning('Please Select Travel Type.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.airTicketregObj.TravelProvider)) {
			this.Notification.Warning('Please Select Travel Provider.');
			result = false;
			return;
		}
		if (this.airTicketregObj.BaseFare == 0 || Library.isNuLLorUndefined(this.airTicketregObj.BaseFare)) {
			this.Notification.Warning('Please Enter Resigtation Charge.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.airTicketregObj.ServiceCharge)) {
			this.Notification.Warning('Please Enter ServiceCharge.');
			result = false;
			return;
		}
		if (this.airTicketregObj.TotalPayable == 0 || Library.isNullOrZero(this.airTicketregObj.TotalPayable)) {
			this.Notification.Warning('Total Payable Amount Can Not Zero.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.airTicketregObj.SalesStaffCode) || this.airTicketregObj.SalesStaffCode == "0") {
			this.Notification.Warning('Please Select Sales Staff .');
			result = false;
			return;
		}
		if (Library.isUndefinedOrNullOrEmpty(this.airTicketregObj.TicketNo) ) {
			this.Notification.Warning('Please Enter Ticket No.');
			result = false;
			return;
		}
		return result;
	}
	//DROP DOWN 

	GetTravelProviderList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getProviderList()
			.subscribe(
				data => this.setTravelProviderList(data),
				error => this.Notification.Error(error)
			);
	}
	setTravelProviderList(data) {
		this.travelProviderList = data;
		this.Notification.LoadingRemove();

	}
	GetTravelTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GETVisaTypeLIST()
			.subscribe(
				data => this.setTravelTypeList(data),
				error => this.Notification.Error(error)
			);
	}
	setTravelTypeList(data) {

		this.travelTypeList = data;
		this.Notification.LoadingRemove();

	}
	GetAirLineList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getAirlineList()
			.subscribe(
				data => this.setAirLineList(data),
				error => this.Notification.Error(error)
			);
	}
	setAirLineList(data) {
		this.airLineList = data;
		this.Notification.LoadingRemove();

	}
	GetSeatTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.GETSeatTypeLIST()
			.subscribe(
				data => this.setSeatTypeList(data),
				error => this.Notification.Error(error)
			);
	}
	setSeatTypeList(data) {
		this.seatTypeList = data;
		this.Notification.LoadingRemove();

	}
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
	PrintAirTicketReg(obj){
		debugger
		var airTicketRegCode = obj.AirTicketTransCode; 
		window.open(`${Config.getBaseUrl}TransactionReport/GetAirTicketRegistrationByAirTicketRegCode?airticketRegCode=${airTicketRegCode}`, "_blank");
	}


}