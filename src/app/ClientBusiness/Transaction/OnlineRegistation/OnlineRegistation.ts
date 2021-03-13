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
import { OnlineRegistationMasterModelDTO, OnlineRegistationDetailModelDTO } from '../../../Classes/ClientBusiness/OnlineRegistationModel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFan } from '@fortawesome/free-solid-svg-icons';

//
declare var moment: any;
@Component({
	templateUrl: 'OnlineRegistation.html'
})
export class OnlineRegistation implements OnInit {
	user: any;
	sumOfTotalValue: number = 0;
	sumofTotalCancellationCharge: number = 0;
	TotalPayableAmt: number = 0;
	registaionList: any[] = [];
	customerList: any[] = [];
	currencyList: any[] = [];
	salesStaffList: any[] = [];
	activeCurrencyRateList: any[] = [];
	cardList: any[] = [];
	destinationList: any[] = [];
	regObj: OnlineRegistationMasterModelDTO = new OnlineRegistationMasterModelDTO();
	regDetailsObj: OnlineRegistationDetailModelDTO[] = [];
	SearchRegList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.setNewDetails();
		this.Notification.LoadingWithMessage('Loading...');
		this.GETCustomerLIST();
		this.GETCurrencyList();
		this.GETSalesStaffLIST();
		this.GETDestinationLIST();
		this.GETCardLIST();
		this.GETActiveCurrencyRateLIST();
		this.regObj.TransactionDate = moment().format(Common.SQLDateFormat);
		this.Notification.LoadingRemove();
	}
	getOnlineRegistation() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GetOnlineRegisationList()
			.subscribe(
				data => this.setOnlineRegistation(data),
				error => this.Notification.Error(error)
			);
	}
	setOnlineRegistation(data) {
		this.registaionList = data;
		this.Notification.LoadingRemove();

	}
	saveOnlineReg() {
		if (this.regObj.ID > 0)
			this.regObj.UpdatedBy = this.user.EmployeeCode;
		else this.regObj.CreatedBy = this.user.EmployeeCode;

		if (Library.isNullOrZero(this.regObj.NetPayableAmt)) this.regObj.NetPayableAmt = 0;

		//validation
		if (!this.validateModel()) return;

		var details = JSON.stringify(this.regDetailsObj);

		this.regObj.OnlineRegistrationDetail = Library.getBase64(details);
		this.regObj.CreatedBy = this.user.EmployeeCode;

		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.saveOnlineRegisationList(this.regObj).subscribe(
			(data) => this.setOnlineReg(data),
			(error) => this.showError(error)
		);
	}
	setOnlineReg(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Update Successfully.');
		else this.Notification.Success('Save Successfully.');
		this.getOnlineRegistation();
		document.getElementById('onlineRegEntry_tab').click();
		this.ResetModel();
		this.Notification.LoadingRemove();
	}

	validateModel() {
		var result = true;
		try {
			if (Library.isNuLLorUndefined(this.regObj.CustomerCode) || this.regObj.CustomerCode == "0") {
				this.Notification.Warning('Please Select Customer.');
				result = false;
				return;
			}

			if (Library.isNullOrZero(this.regObj.NetPayableAmt)) {
				this.Notification.Warning('Total Payable Amount Can Not Zero.');
				result = false;
				return;
			}
			var validDetails = 0;
			this.regDetailsObj.forEach(item => {
				if (!Library.isNullOrZero(item.EventName)) {
					if (Library.isNullOrZero(item.EventName)) {
						this.Notification.Warning('Please Enter Event Name.');
						result = false;
						return;
					}
					if (Library.isNullOrZero(item.RegistrationCharge)) {
						this.Notification.Warning('Please Enter Registration Charge.');
						result = false;
						return;
					}
					if (Library.isNullOrZero(item.ServiceChargeValue)) {
						this.Notification.Warning('Please Enter Service Charge Value.');
						result = false;
						return;
					}
					validDetails += 1;
				}
				else {
					this.Notification.Warning('Please Select Event Name.');
					result = false;
					return;
				}
			});
		}
		catch (e) {
			this.Notification.Warning('Please Select item.');
			return false;
		}
		return result;
	}

	ResetModel() {
		this.regObj = new OnlineRegistationMasterModelDTO();
		this.regObj.TransactionDate = moment().format(Common.SQLDateFormat);
		this.sumOfTotalValue = 0;
		this.setNewDetails();
	}
	EditItem(item) {
		this.regObj = JSON.parse(JSON.stringify(item));
		this.sumOfTotalValue = this.regObj.NetPayableAmt;
		this.regObj.TransactionDate = moment(new Date(this.regObj.TransactionDate)).format(Common.SQLDateFormat);

		this.transactionCommonService.getOnlineRegistrationDetailsByTransactionCode(this.regObj.TransactionCode)
			.subscribe(
				data => this.setOnlineRegEdit(data),
				error => this.Notification.Error(error)
			);


	}
	setOnlineRegEdit(Data: any) {
		Data.forEach(element => {
			element.EvenDate = moment(new Date(element.EvenDate)).format(Common.SQLDateFormat);
		});
		this.regDetailsObj = Data;
		document.getElementById('onlineRegEntry_tab').click();
	}
	updateTotalPayable() {
		var serviceCharge: any = 0;
		var regCharge = Number(this.regObj.CardChargeAmount) * Number(Library.isNullOrZero(this.regObj.CurrencyRate) ? 1 : this.regObj.CurrencyRate);
		this.regObj.NetPayableAmt = Number(regCharge.toFixed(2)) + Number(serviceCharge.toFixed(2)) + this.sumOfTotalValue;
	}
	onCurrencyChange(item) {

		var RateItem = this.activeCurrencyRateList.filter(c => c.Currency == item)[0];
		if (Library.isNullOrEmpty(RateItem)) this.regObj.CurrencyRate = 0;
		else this.regObj.CurrencyRate = RateItem.Rate;
	}

	setNewDetails() {
		this.regDetailsObj = [];
		this.regObj = new OnlineRegistationMasterModelDTO();

		this.addNewColumnForDetail();
	}

	addDetailsNew(value, event) {
		this.addNewColumnForDetail();
		setTimeout(() => this.selectNext(value, event), 500)
		// this.selectNext(value, event);
	}

	addNewColumnForDetail() {
		var onlineRegDetail = new OnlineRegistationDetailModelDTO();
		onlineRegDetail.EvenDate = moment().format(Common.SQLDateFormat);
		this.regDetailsObj.push(onlineRegDetail);
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
	selectTarget(e) {
		e.target.select();
	}
	//DROP DOWN	 
	GETCustomerLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getcustomerList()
			.subscribe(
				data => this.setCustomerLIST(data),
				error => this.showError(error)
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
				error => this.showError(error)
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
				error => this.showError(error)
			);
	}
	setSalesStaffLIST(data) {
		this.salesStaffList = data;
		this.Notification.LoadingRemove();

	}
	GETDestinationLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getDestinationList()
			.subscribe(
				data => this.setDestinationList(data),
				error => this.showError(error)
			);
	}
	setDestinationList(data) {
		this.destinationList = data;
		this.Notification.LoadingRemove();

	}
	GETCardLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getcardList()
			.subscribe(
				data => this.setcardList(data),
				error => this.showError(error)
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
				error => this.showError(error)
			);
	}
	setActiveCurrencyRateList(data) {
		this.activeCurrencyRateList = data;
		this.Notification.LoadingRemove();

	}
	PrintOnlineReg(obj) {
		var RegistrationCode = obj.RegistrationCode;
		window.open(`${Config.getBaseUrl}TransactionReport/onlineRegistrationDetail?onlineRegCode=${RegistrationCode}`, "_blank");
	}
	showError(error) {
		this.Notification.Error(error);
		this.Notification.LoadingRemove();
	}
	removeDetails(index: number) {
		this.regDetailsObj.splice(index, 1);
		this.getpayableAmount();
	}
	// Calculartion
	CalculateServicePertageValue(obj) {
		obj.ServiceChargePercent = (Number(obj.ServiceChargeValue) * 100) / Number(obj.RegistrationCharge);
		obj.ServiceChargePercent = Number(obj.ServiceChargePercent).toFixed(2);
		this.CalculateTotalPayableAmount(obj);
	}

	CalculateServiceChargeValue(obj) {
		obj.ServiceChargeValue = (Number(obj.RegistrationCharge) * (Number(obj.ServiceChargePercent) / 100))
		obj.ServiceChargeValue = Number(obj.ServiceChargeValue).toFixed(2);
		this.CalculateTotalPayableAmount(obj);
	}

	CalculateTotalPayableAmount(obj) {
		this.sumOfTotalValue = 0
		obj.TotalPayableAmt = Number(obj.RegistrationCharge) + Number(obj.ServiceChargeValue) + Number(obj.DiscountAmount);
		this.getpayableAmount();
	}
	getpayableAmount() {
		this.sumOfTotalValue = Common.calculateTotal(this.regDetailsObj, "TotalPayableAmt");
		this.regObj.NetPayableAmt = this.sumOfTotalValue +
			Number(this.regObj.CardChargeAmount) *
			Number(Library.isNullOrZero(this.regObj.CurrencyRate) ? 1 : this.regObj.CurrencyRate);
	}
	CalculeCancelationAmount(obj){
		debugger
		this.sumOfTotalValue = Common.calculateTotal(this.regDetailsObj, "TotalPayableAmt");

		obj.TotalPayableAmt =  Number(obj.ServiceChargeValue) + Number(obj.CancellationCharge);

		this.sumofTotalCancellationCharge = Common.calculateTotal(this.regDetailsObj, "CancellationCharge");
		this.regObj.NetPayableAmt = this.sumofTotalCancellationCharge +this.sumOfTotalValue;
	}
	isCancel(){
		this.regObj.IsCancel= true
		console.log(this.regDetailsObj)

		// this.regDetailsObj.forEach(element => {
		 
		// 	document.getElementById(element.CancellationCharge).disabled = true;
		// });
	 
	}
	 
}