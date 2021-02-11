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
import { MRMasterModel, MRInvoiceDetailModel, MRPaymentDetailModel, MRInvoiceDetailModelDTO } from '../../../Classes/Transaction/MoenyReceiptModel';
declare var moment: any;
@Component({
	templateUrl: 'MoneyReceipt.html'
})
export class MoneyReceipt implements OnInit {
	user: any;
	customerList: any[] = [];
	PaymentTypeList: any[] = [];
	bankList: any[] = [];
	serviceListObj: MRInvoiceDetailModelDTO = new MRInvoiceDetailModelDTO();

	mrMasterObj: MRMasterModel = new MRMasterModel();
	mrInvoiceDetailObj: MRInvoiceDetailModel = new MRInvoiceDetailModel();
	mrPaymentDetailObj: MRPaymentDetailModel[] = [];
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private transactionCommonService: TransactionCommonService, private clientBusinessService: ClientBusinessService) { }



	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.mrMasterObj.ReceivedDate = moment().format(Common.SQLDateFormat);
		this.GETCustomerLIST();
		this.getPaymentTypeList();
		this.GetBankList();
		this.Notification.LoadingWithMessage('Loading...');
		this.Notification.LoadingRemove();
	}
	ResetMoneyReceiptModel() {

	}
	saveUpdateMoneyReceipt() {

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
	onChange(customerCode) {
		this.serviceListObj = new MRInvoiceDetailModelDTO();
		this.GetServiceListByCustomerCode(customerCode);
	}
	GetServiceListByCustomerCode(customerCode) {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.getServiceListByCustomerCode(customerCode)
			.subscribe(
				data => this.setServicelist(data),
				error => this.Notification.Error(error)
			);
	}
	setServicelist(data) {
		this.serviceListObj = data;
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
	addDetailsNew() {
		this.mrPaymentDetailObj.push({			 
			ID : 0,
			ReceiptCode : "",
			PaymentType : "0",
			ReceivedAmount: 0,
			BankName : "0",
			ChequeNo : "",
			CardNo : "",
			POSTransactionNo : "",
			TxnNo : "",
			CreatedBy : "",
			CreatedOn : "",
			UpdatedBy : "",
			UpdatedOn : "",		 

		});
	}
	removeDetails(index: number) {
		this.mrPaymentDetailObj.splice(index, 1);
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
}