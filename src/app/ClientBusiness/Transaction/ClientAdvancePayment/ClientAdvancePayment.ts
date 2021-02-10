import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";
import { Library } from 'src/app/library/library';
import { Common } from "../../../library/common";
//Service   
import { TransactionCommonService } from '../../../Services/TransactionCommon.service';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { ClientAdvancePaymentModel } from '../../../Classes/Transaction/ClientAdvancePaymentModel';

declare var moment: any;
@Component({
	templateUrl: 'ClientAdvancePayment.html'
})
export class ClientAdvancePayment implements OnInit {
	user: any;
	advancePaymentList: any[] = [];
	customerList: any[] = [];
	companyList: any[] = [];
	clientAdvceList: any[] = [];
	PaymentTypeList: any[] = [];
	bankList: any[] = [];
	clientAdvceObj: ClientAdvancePaymentModel = new ClientAdvancePaymentModel();
	searchList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private transactionCommonService: TransactionCommonService, private clientBusinessService: ClientBusinessService) { }



	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.clientAdvceObj.AdvanceDate = moment().format(Common.SQLDateFormat);		
		this.GETCustomerLIST();
		this.GETCompanyLIST();
		this.getPaymentTypeList();
		this.getAdvancePaymentList();
		this.Notification.LoadingWithMessage('Loading...');
		this.Notification.LoadingRemove();
	}
	saveUpdate() {
		// Validation
		if (!this.validateModel()) return;
		this.clientAdvceObj.CreatedBy = this.user.EmployeeCode;

		this.transactionCommonService.saveUpdateAdvancePayment(this.clientAdvceObj)
			.subscribe(
				data => this.setsaveResult(data),
				error => this.Notification.Error(error)
			);
	}
	setsaveResult(Data: any) {
		if (Data.ID > 0) {
			this.Notification.Success("Save Successfully");
			this.ResetModel();
			this.getAdvancePaymentList();

		}
	}
	getAdvancePaymentList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.getAdvancePayment()
			.subscribe(
				data => this.setAdvancePaymentList(data),
				error => this.Notification.Error(error)
			);
	}
	setAdvancePaymentList(data) {
		this.advancePaymentList = data;
		this.Notification.LoadingRemove();

	}
	ResetModel() {
		this.clientAdvceObj = new ClientAdvancePaymentModel();
		this.clientAdvceObj.AdvanceDate = moment().format(Common.SQLDateFormat);
	}
	EditItem(item) {
		debugger
		 if(item.BankName != null) this.GetBankList();
		this.clientAdvceObj = JSON.parse(JSON.stringify(item));
		this.clientAdvceObj.AdvanceDate = moment(new Date(this.clientAdvceObj.AdvanceDate)).format(Common.SQLDateFormat);
		this.clientAdvceObj.ClearingDate = moment(new Date(this.clientAdvceObj.ClearingDate)).format(Common.SQLDateFormat);
	}
	validateModel() {
		var result = true
		if (Library.isUndefinedOrNullOrZero(this.clientAdvceObj.Amount)) {
			this.Notification.Warning('Amount is not Zero.');
			result = false;
		}
		else if (Library.isNuLLorUndefined(this.clientAdvceObj.CompanyCode)) {
			this.Notification.Warning('Please Select Company.');
			result = false;
		}
		else if (Library.isNuLLorUndefined(this.clientAdvceObj.PaymentType)) {
			this.Notification.Warning('Please Select Company.');
			result = false;
		}
		return result;
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
	getPaymentTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getPaymentTypeList()
			.subscribe(
				data => this.setPaymentTypeList(data),
				error => this.Notification.Error(error)
			);
	}
	setPaymentTypeList(data) {
		this.PaymentTypeList = data;
		this.Notification.LoadingRemove();
	}
	GetBankList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.GetBankList()
			.subscribe(
				data => this.setBankList(data),
				error => this.Notification.Error(error)
			);
	}
	setBankList(data) {
		this.bankList = data;
		this.Notification.LoadingRemove();
	}
	onChangeBank(val){
		if(val=="PT-0001" || val=="PT-0006"){
			this.GetBankList();
		} else  {
			this.clientAdvceObj.BankCode="";
			this.bankList=[];
		}
	}
}