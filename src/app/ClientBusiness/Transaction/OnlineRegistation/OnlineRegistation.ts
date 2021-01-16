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
import { OnlineRegistationModel } from '../../../Classes/ClientBusiness/OnlineRegistationModel';
import { library } from '@fortawesome/fontawesome-svg-core';

//
declare var moment: any;
@Component({
	templateUrl: 'OnlineRegistation.html'
})
export class OnlineRegistation implements OnInit {
	user: any;

	registaionList: any[] = [];
	customerList: any[] = [];
	companyList: any[] = [];
	currencyList: any[] = [];
	salesStaffList: any[] = [];
	cardList: any[] = [];
	destinationList:any[]=[];
	regObj: OnlineRegistationModel = new OnlineRegistationModel();
	SearchRegList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		//this.regObj.RegistationDate = moment().format(Common.SQLDateFormat);
		this.getOnlineRegistation();
		this.GETCustomerLIST();
		this.GETCompanyLIST();
		this.GETCurrencyList();
		this.GETSalesStaffLIST();
		this.GETDestinationLIST(); 
		this.GETCardLIST();
		this.regObj.RegistationDate = moment().format(Common.SQLDateFormat);
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
		
		if(Library.isNullOrZero(this.regObj.TotalPayableAmt))this.regObj.TotalPayableAmt=0;
		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.saveOnlineRegisationList(this.regObj).subscribe(
			(data) => this.setOnlineReg(data),
			(error) => this.Notification.Error(error)
		);
	}
	setOnlineReg(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Saved Successfully.');
		else {
			this.Notification.LoadingRemove();
		}
		this.regObj = new OnlineRegistationModel();
		this.getOnlineRegistation();
	}
	validateModel() {
		debugger;
		var result = true
		if (this.regObj.CustomerCode == "0") {
			this.Notification.Warning('Please Select Customer.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.regObj.EventName)) {
			this.Notification.Warning('Please Enter Event Name.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.regObj.EvenDate)) {
			this.Notification.Warning('Please Select Event date.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.regObj.TravelDestinationCode) || this.regObj.TravelDestinationCode == "0") {
			this.Notification.Warning('Please Select Destination.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.regObj.RegistrationCharge)) {
			this.Notification.Warning('Please Enter Resigtation Charge.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.regObj.ServiceCharge)) {
			this.Notification.Warning('Please Enter ServiceCharge.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.regObj.CardCode)) {
			this.Notification.Warning('Please Enter CardCode.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.regObj.CardChargeAmount)) {
			this.Notification.Warning('Please Enter Card Charge .');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.regObj.Currency)) {
			this.Notification.Warning('Please Select Currency .');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.regObj.SalesReferenceCode)) {
			this.Notification.Warning('Please Select Sales Staff .');
			result = false;
			return;
		}
		return result;
	}
	ResetModel() {
		this.regObj = new OnlineRegistationModel();
		this.regObj.CompanyCode = "0";
		this.regObj.CustomerCode = "0";
		this.regObj.Currency = "0";
		this.regObj.SalesReferenceCode = "0";
		this.regObj.TravelDestinationCode = "0";
		this.regObj.RegistationDate = moment().format(Common.SQLDateFormat);
	}
	 
	EditItem(item) {
		this.regObj = JSON.parse(JSON.stringify(item));
		if (Library.isNuLLorUndefined(item.SalesReferenceCode)) this.regObj.SalesReferenceCode = "0";
		if (Library.isNuLLorUndefined(item.CompanyCode)) this.regObj.CompanyCode = "0";
		if (Library.isNuLLorUndefined(item.TravelDestinationCode)) this.regObj.TravelDestinationCode = "0";
	}
	updateTotalPayable(){
		debugger
		this.regObj.TotalPayableAmt=Number(this.regObj.RegistrationCharge) +Number(this.regObj.ServiceCharge);
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
	GETDestinationLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getDestinationList()
			.subscribe(
				data => this.setDestinationList(data),
				error => this.Notification.Error(error)
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
				error => this.Notification.Error(error)
			);
	}
	setcardList(data) {
		this.cardList = data;
		this.Notification.LoadingRemove();

	}

}