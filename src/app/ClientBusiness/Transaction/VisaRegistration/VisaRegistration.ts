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
import { VisaMasterDTO, VisaDetailDTO } from '../../../Classes/Transaction/VisaRegModel';
import { library } from '@fortawesome/fontawesome-svg-core';

//
declare var moment: any;
@Component({
	templateUrl: 'VisaRegistration.html'
})
export class VisaRegistration implements OnInit {
	user: any;
	sumOfTotalValue: any = 0;
	visaRegList: any[] = [];
	visaMasterObj: VisaMasterDTO = new VisaMasterDTO();
	visaDetailsObj: VisaDetailDTO[] = [];
	customerList: any[] = [];
	currencyList: any[] = [];
	visaTypeList: any[] = [];
	salesStaffList: any[] = [];
	activeCurrencyRateList: any[] = [];
	travelProviderList: any[] = [];
	countryList: any[] = [];
	cardList: any[] = [];
	SearchVisaRegList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.Notification.LoadingWithMessage('Loading...');
		this.setNewDetails();
		this.visaMasterObj.TransactionDate = moment().format(Common.SQLDateFormat);
		this.GETCustomerLIST();
		this.GETCurrencyList();
		this.GETSalesStaffLIST();
		this.GETCardLIST();
		this.getCountryList();
		this.GETActiveCurrencyRateLIST();
		this.GETVisaTypeLIST();
		this.GetTravelProviderList();
		this.Notification.LoadingRemove();
	}
	isNumberKey(evt) {
		debugger
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode != 46 && charCode > 31
			&& (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	}
	saveVisaReg() {
		if (this.visaMasterObj.ID > 0)
			this.visaMasterObj.UpdatedBy = this.user.EmployeeCode;
		else this.visaMasterObj.CreatedBy = this.user.EmployeeCode;

		if (Library.isNullOrZero(this.visaMasterObj.NetPayableAmt)) this.visaMasterObj.NetPayableAmt = 0;

		//validation
		if (!this.validateModel()) return;
		var details = JSON.stringify(this.visaDetailsObj);
		this.visaMasterObj.visaDetails = Library.getBase64(details);


		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.saveOrUpdateVisaRegistation(this.visaMasterObj).subscribe(
			(data) => this.setVisaReg(data),
			(error) => this.Notification.Error(error)
		);
	}
	setVisaReg(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Update Successfully.');
		else this.Notification.Success('Save Successfully.');
		document.getElementById('visaRegistrationEntry_tab').click();
		this.ResetModel();
		this.Notification.LoadingRemove();

	}
	ResetModel() {
		this.visaMasterObj = new VisaMasterDTO();
		this.visaMasterObj.TransactionDate = moment().format(Common.SQLDateFormat);
		this.sumOfTotalValue = 0;
		this.setNewDetails();
	}
	validateModel() {
		var result = true
		if (Library.isNuLLorUndefined(this.visaMasterObj.TransactionDate)) {
			this.Notification.Warning('Please Select Transaction date.');
			result = false;
			return;
		}
		if (this.visaMasterObj.CustomerCode == "0") {
			this.Notification.Warning('Please Select Customer.');
			result = false;
			return;
		}

		if (this.visaMasterObj.NetPayableAmt == 0) {
			this.Notification.Warning('Total Payable Amount Can Not Zero.');
			result = false;
			return;
		}
		var validDetails = 0;
		this.visaDetailsObj.forEach(item => {
			if (!Library.isNullOrZero(item.NameofPerson)) {
				if (Library.isNullOrZero(item.NameofPerson)) {
					this.Notification.Warning('Please Enter Event Name.');
					result = false;
					return;
				}
				if (Library.isNullOrZero(item.VisaType)) {
					this.Notification.Warning('Please Select Visa Type.');
					result = false;
					return;
				}
				if (Library.isNullOrZero(item.VisaCountry)) {
					this.Notification.Warning('Please Select Visa Country.');
					result = false;
					return;
				}
				if (Library.isNullOrZero(item.VisaFee) || item.VisaFee == 0) {
					this.Notification.Warning('Please Enter Visa Fee Value.');
					result = false;
					return;
				}

				validDetails += 1;
			}
			else {
				this.Notification.Warning('Please Enter Name of Person.');
				result = false;
				return;
			}
		});
		return result;
	}
	setNewDetails() {
		this.visaDetailsObj = [];
		this.visaMasterObj = new VisaMasterDTO();

		this.addNewColumnForDetail();
	}
	addDetailsNew(value, event) {
		this.addNewColumnForDetail();
		setTimeout(() => this.selectNext(value, event), 500)
	}
	addNewColumnForDetail() {
		var visaRegDetail = new VisaDetailDTO();
		this.visaDetailsObj.push(visaRegDetail);
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
	EditItem(item) {
		this.visaMasterObj = JSON.parse(JSON.stringify(item));
		this.visaMasterObj.TransactionDate = moment(new Date(this.visaMasterObj.TransactionDate)).format(Common.SQLDateFormat);
		this.transactionCommonService.getVisaRegDetailsByTransactionCode(this.visaMasterObj.TransactionCode)
			.subscribe(
				data => this.setVisaRegEdit(data),
				error => this.Notification.Error(error)
			);

	}
	setVisaRegEdit(Data: any) {
		this.visaDetailsObj = Data;
		this.sumOfTotalValue = Common.calculateTotal(this.visaDetailsObj, "TotalPayableAmt");
		document.getElementById('visaRegistrationEntry_tab').click();
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

	GETCustomerLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getDropDownCustomerList()
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

	onCurrencyChange(item) {
		var RateItem = this.activeCurrencyRateList.filter(c => c.Currency == item)[0];
		if (Library.isNullOrEmpty(RateItem)) this.visaMasterObj.CurrencyRate = 0;
		else this.visaMasterObj.CurrencyRate = RateItem.Rate;
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
	PrintVisaReg(obj) {
		var TransactionCode = obj.TransactionCode;
		window.open(`${Config.getBaseUrl}TransactionReport/VisaRegistrationPrint?transactionCode=${TransactionCode}`, "_blank");
		// window.open('../Report/Reports/ReportViewer.aspx', '_newtab');
	}
	removeDetails(index: number) {
		this.visaDetailsObj.splice(index, 1);
		this.getpayableAmount();
	}
	//Calculation
	CalculateServiceChargeValue(obj) {
		obj.ServiceChargeValue = Number(Library.isUndefinedOrNullOrZeroReturn0(obj.VisaFee))
			* (Number(obj.ServiceChargePercent) / 100);

		obj.ServiceChargeValue = Number(obj.ServiceChargeValue).toFixed(2);
		this.CalculateTotalPayableAmount(obj);
	}
	CalculateServicePertageValue(obj) {
		obj.ServiceChargePercent = (Number(Library.isUndefinedOrNullOrZeroReturn0(obj.ServiceChargeValue)) * 100) /
			Number(Library.isUndefinedOrNullOrZeroReturn0(obj.VisaFee));
		obj.ServiceChargePercent = Number(obj.ServiceChargePercent).toFixed(2);
		this.CalculateTotalPayableAmount(obj);
	}

	getpayableAmount() {
		this.sumOfTotalValue = Common.calculateTotal(this.visaDetailsObj, "TotalPayableAmt");
		this.visaMasterObj.NetPayableAmt = this.sumOfTotalValue;

	}
	CalculateTotalPayableAmount(obj) {
		debugger
		this.sumOfTotalValue = 0;
		//VisaFee+GovtTax+ServiceChargeValue
		obj.TotalPayableAmt = Number(Library.isUndefinedOrNullOrZeroReturn0(obj.VisaFee))
			+ Number(Library.isUndefinedOrNullOrZeroReturn0(obj.GovtTax)) +
			(Number(Library.isUndefinedOrNullOrZeroReturn0(obj.ServiceChargeValue)));

		this.getpayableAmount();
	}

}