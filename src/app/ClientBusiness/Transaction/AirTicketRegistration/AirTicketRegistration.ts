import { Component, DebugElement, OnInit } from '@angular/core';
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
import { AirTicketDetailDTo, AirTicketRegModelDTO } from '../../../Classes/Transaction/AirTicketRegModel';
import { library } from '@fortawesome/fontawesome-svg-core';
//
declare var moment: any;
@Component({
	templateUrl: 'AirTicketRegistration.html'
})
export class AirTicketRegistration implements OnInit {
	user: any;
	sumOfTotalValue: number = 0;
	sumofTotalCancellationCharge: number = 0;
	sumOfForwardingTotalValue: number = 0;
	TotalPayableAmt: number = 0;
	airTicketregistaionList: any[] = [];
	forwardingList: any[] = [];

	customerList: any[] = [];
	currencyList: any[] = [];
	salesStaffList: any[] = [];
	activeCurrencyRateList: any[] = [];
	cardList: any[] = [];
	seatTypeList: any[] = [];
	airLineList: any[] = [];
	travelProviderList: any[] = [];
	airTicketregObj: AirTicketRegModelDTO = new AirTicketRegModelDTO();
	forwardairTicketregObj: AirTicketRegModelDTO = new AirTicketRegModelDTO();

	airTicketregDetailsObj: AirTicketDetailDTo[] = [];

	SearchAirTicketRegList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.setNewDetails();
		this.GETCustomerLIST();
		this.GETCurrencyList();
		this.GETSalesStaffLIST();
		this.GETCardLIST();
		this.GetSeatTypeList();
		this.GetAirLineList();
		this.GetTravelProviderList();
		this.GETActiveCurrencyRateLIST();
		this.airTicketregObj.TransactionDate = moment().format(Common.SQLDateFormat);

		this.Notification.LoadingRemove();

	}
	setNewDetails() {
		this.airTicketregDetailsObj = [];
		this.airTicketregObj = new AirTicketRegModelDTO();

		this.addNewColumnForDetail();
	}
	addDetailsNew(value, event) {
		this.addNewColumnForDetail();
		setTimeout(() => this.selectNext(value, event), 500)
	}

	addNewColumnForDetail() {
		var details = new AirTicketDetailDTo();
		details.ChangeDate = moment().format(Common.SQLDateFormat);
		details.ReturnDate = moment().format(Common.SQLDateFormat);
		details.TravelDate = moment().format(Common.SQLDateFormat);
		this.airTicketregDetailsObj.push(details);
	}
	selectNext(key, e): void {
		if (key == 'enter') {
			var elem = e.target.parentNode.parentNode.nextSibling;
			//Check IS Real Number	
			if (!Library.isNuLLorUndefined(elem)) {
				elem.firstChild.nextSibling.children[0].select();
				elem.firstChild.nextSibling.children[0].focus();
			}
		}
	}
	saveAirTicketReg() {
		if (this.airTicketregObj.ID > 0)
			this.airTicketregObj.UpdatedBy = this.user.EmployeeCode;
		else this.airTicketregObj.CreatedBy = this.user.EmployeeCode;

		if (Library.isNullOrZero(this.airTicketregObj.NetPayableAmt)) this.airTicketregObj.NetPayableAmt = 0;
		// validation
		if (!this.validateModel()) return;

		var details = JSON.stringify(this.airTicketregDetailsObj);
		this.airTicketregObj.AirticketDetails = Library.getBase64(details);

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
		document.getElementById('airTicketRegEntry_tab').click();
		this.ResetModel();
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
		this.transactionCommonService.getAirTicketDetailsByTransactionCode(this.airTicketregObj.TransactionCode)
			.subscribe(
				data => this.setAirticketRegEdit(data),
				error => this.Notification.Error(error)
			);
	}
	setAirticketRegEdit(Data: any) {
		debugger
		Data.forEach(element => {
			element.TravelDate = moment(new Date(element.TravelDate)).format(Common.SQLDateFormat);
			element.ReturnDate = moment(new Date(element.ReturnDate)).format(Common.SQLDateFormat);


		});
		this.airTicketregDetailsObj = Data;
		this.sumOfTotalValue = Common.calculateTotal(this.airTicketregDetailsObj, "TotalPayableAmt");
		document.getElementById('airTicketRegEntry_tab').click();
	}
	ResetModel() {
		this.airTicketregObj = new AirTicketRegModelDTO();
		this.airTicketregObj.TransactionDate = moment().format(Common.SQLDateFormat);
		this.sumOfTotalValue = 0;
		this.sumofTotalCancellationCharge = 0;
		this.setNewDetails();
	}
	updateTotalPayable() {
		var serviceCharge: any = 0;
		var regCharge = Number(this.airTicketregObj.CardChargeAmount) * Number(Library.isNullOrZero(this.airTicketregObj.CurrencyRate) ? 1 : this.airTicketregObj.CurrencyRate);
		this.airTicketregObj.NetPayableAmt = Number(regCharge.toFixed(2)) + Number(serviceCharge.toFixed(2)) + this.sumOfTotalValue;
	}
	onCurrencyChange(item) {
		var RateItem = this.activeCurrencyRateList.filter(c => c.Currency == item)[0];
		if (Library.isNullOrEmpty(RateItem)) this.airTicketregObj.CurrencyRate = 0;
		else this.airTicketregObj.CurrencyRate = RateItem.Rate;
	}
	removeDetails(index: number) {
		this.airTicketregDetailsObj.splice(index, 1);
		this.getpayableAmount();
	}
	validateModel() {
		debugger
		var result = true
		if (Library.isNuLLorUndefined(this.airTicketregObj.CustomerCode) || this.airTicketregObj.CustomerCode == "0") {
			this.Notification.Warning('Please Select Customer.');
			result = false;
			return;
		}
		if (Library.isNullOrZero(this.airTicketregObj.NetPayableAmt)) {
			this.Notification.Warning('Total Payable Amount Can Not Zero.');
			result = false;
			return;
		}
		var validDetails = 0;
		this.airTicketregDetailsObj.forEach(item => {
			if (!Library.isNullOrZero(item.NameofPerson)) {
				if (Library.isNullOrZero(item.NameofPerson)) {
					this.Notification.Warning('Please Enter Name of Person.');
					result = false;
					return;
				}
				if (Library.isNullOrZero(item.AirlinesCode) || item.AirlinesCode == "0") {
					this.Notification.Warning('Please Select Airlines.');
					result = false;
					return;
				}
				if (Library.isNullOrZero(item.Route)) {
					this.Notification.Warning('Please Enter Route.');
					result = false;
					return;
				}

				if (Library.isNullOrZero(item.TicketNo)) {
					this.Notification.Warning('Please Enter Ticket No.');
					result = false;
					return;
				}
				if (Library.isNullOrZero(item.BaseFare)) {
					this.Notification.Warning('Please Enter Base Fare.');
					result = false;
					return;
				}
				if (Library.isNullOrZero(item.GovTax)) {
					this.Notification.Warning('Please Enter Govt Tax.');
					result = false;
					return;
				}
				if (Library.isNullOrZero(item.TotalPayableAmt)) {
					this.Notification.Warning('Please Enter Total Payable Amount.');
					result = false;
					return;
				}
				validDetails += 1;
			}
			else {
				this.Notification.Warning('Please Select Name Of Person.');
				result = false;
				return;
			}
		});

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
	PrintAirTicketReg(obj) {
		debugger
		var airTicketRegCode = obj.AirTicketTransCode;
		window.open(`${Config.getBaseUrl}TransactionReport/GetAirTicketRegistrationByAirTicketRegCode?airticketRegCode=${airTicketRegCode}`, "_blank");
	}
	isCheckCancel(obj) {
		debugger
		obj.IsCancel = true;
		//this.getCancelationAmount(obj); 
	}
	selectTarget(e) {
		e.target.select();
	}
	isUnCheckCancel(obj) {
		obj.IsCancel = false;
	}
	isCheckForward(obj) {
		obj.IsForward = true;
	}
	isUnCheckForward(obj) {
		obj.IsCancel = false;
	}

	// Calculation

	CalculateServiceChargeValue(obj) {
		debugger
		obj.ServiceChargePercent = (Number(obj.ServiceChargeValue) * 100) / Number(obj.BaseFare);
		obj.ServiceChargePercent = Number(obj.ServiceChargePercent).toFixed(2);
		this.CalculateTotalPayableAmount(obj);
	}

	CalculateServicePertageValue(obj) {
		debugger
		obj.ServiceChargeValue = (Number(obj.BaseFare) * (Number(obj.ServiceChargePercent) / 100))
		obj.ServiceChargeValue = Number(obj.ServiceChargeValue).toFixed(2);
		this.CalculateTotalPayableAmount(obj);
	}

	CalculateTotalPayableAmount(obj) {
		this.sumOfTotalValue = 0
		obj.TotalPayableAmt = Number(obj.BaseFare) + Number(obj.GovTax) + Number(obj.ServiceChargeValue) - Number(obj.DiscountValue);
		this.getpayableAmount();
	}
	getpayableAmount() {
		this.sumOfTotalValue = Common.calculateTotal(this.airTicketregDetailsObj, "TotalPayableAmt");
		this.airTicketregObj.NetPayableAmt = this.sumOfTotalValue +
			Number(this.airTicketregObj.CardChargeAmount) *
			Number(Library.isNullOrZero(this.airTicketregObj.CurrencyRate) ? 1 : this.airTicketregObj.CurrencyRate);
	}

	CalculateTotalPayableWithForwardingChargeAmount(obj) {
		obj.TotalPayableAmt = Number(obj.TotalPayableAmt.toFixed(2)) + Number(obj.ChangePenalty.toFixed(2));

		this.sumOfForwardingTotalValue = Common.calculateTotal(this.forwardingList, "TotalPayableAmt");
		this.forwardairTicketregObj.NetPayableAmt = Number(this.forwardairTicketregObj.NetPayableAmt.toFixed(2)) + Number(this.sumOfForwardingTotalValue.toFixed(2));

	}

	// AIRTICKET FORWARDING 

	ticketDetail(obj) {
		this.forwardairTicketregObj = new AirTicketRegModelDTO();
		this.forwardingList = [];

		this.forwardairTicketregObj = this.airTicketregistaionList.filter(i => i.TransactionCode == obj)[0];
		this.transactionCommonService.getAirTicketDetailsByTransactionCode(this.forwardairTicketregObj.TransactionCode)
			.subscribe(
				data => this.setforwardList(data),
				error => this.Notification.Error(error)
			);

	}
	setforwardList(Data: any) {
		this.forwardingList = Data;
		this.sumOfForwardingTotalValue = Common.calculateTotal(this.forwardingList, "TotalPayableAmt");

		Data.forEach(element => {
			element.ChangeDate = moment(new Date(element.ChangeDate)).format(Common.SQLDateFormat); 
		});

	}
	UpdateToForwardAirTicketReg() {
		this.forwardairTicketregObj.UpdatedBy = this.user.EmployeeCode;
		// validation
		if (!this.ForwardValidateModel()) return;
		var details = JSON.stringify(this.forwardingList);
		this.forwardairTicketregObj.AirticketDetails = Library.getBase64(details);
		console.log(this.forwardairTicketregObj);
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.UpdateForwardAirTicketRegistration(this.forwardairTicketregObj).subscribe(
			(data) => this.setForwarAirticketReg(data),
			(error) => this.Notification.Error(error)
		);


	}

	setForwarAirticketReg(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Forward Successfully.');
		else {
			this.Notification.LoadingRemove();
		}
		// document.getElementById('airTicketRegEntry_tab').click();
		this.ResetForwardModel();
		this.GetAirTicketList();
	}

	ForwardValidateModel() {
		debugger
		var result = true
		if (Library.isNuLLorUndefined(this.forwardairTicketregObj.TransactionCode) || this.forwardairTicketregObj.TransactionCode == "0") {
			this.Notification.Warning('Please Select Transaction Code.');
			result = false;
			return;
		}
		var validDetails = 0;
		this.forwardingList.forEach(item => {
			 
			if (Library.isNullOrZero(item.ChangePenalty)) {
				this.Notification.Warning('Please Enter Change Penalty.');
				result = false;
				return;
			}
			validDetails += 1;
		});

		return result;
	}

	ResetForwardModel() {
		this.forwardairTicketregObj = new AirTicketRegModelDTO();
		this.forwardairTicketregObj.TransactionCode="0";
		this.forwardingList=[]; 
		this.sumOfForwardingTotalValue = 0; 
		this.forwardairTicketregObj.NetPayableAmt=0; 
	}



}