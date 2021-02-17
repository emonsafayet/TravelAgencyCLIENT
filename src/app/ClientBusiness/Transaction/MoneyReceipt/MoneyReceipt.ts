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
import { MRMasterModel, MRInvoiceDetailModel, MRPaymentDetailModel, MRMasterModelDTO, MRInvoiceDetailModelDTO} from '../../../Classes/Transaction/MoenyReceiptModel';
import { library } from '@fortawesome/fontawesome-svg-core';
declare var moment: any;
@Component({
	templateUrl: 'MoneyReceipt.html'
})
export class MoneyReceipt implements OnInit {
	user: any; 
	customerList: any[] = [];
	PaymentTypeList: any[] = [];
	bankList: any[] = []; 
	serviceListObj: MRInvoiceDetailModelDTO [] = [];

	mrMasterObj: MRMasterModel = new MRMasterModel();
	mrMasterModelDTOObj: MRMasterModelDTO = new MRMasterModelDTO();
	mrInvoiceDetailObj: MRInvoiceDetailModel = new MRInvoiceDetailModel();
	mrPaymentDetailObj: MRPaymentDetailModel[] = [];
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private transactionCommonService: TransactionCommonService, private clientBusinessService: ClientBusinessService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.mrMasterModelDTOObj.ReceivedDate = moment().format(Common.SQLDateFormat);
		this.GETCustomerLIST();
		this.getPaymentTypeList();
		this.GetBankList();
		this.addDetailsNew();
		this.Notification.LoadingWithMessage('Loading...');
		this.Notification.LoadingRemove();
	}
	ResetMoneyReceiptModel() {
		this.mrMasterModelDTOObj = new MRMasterModelDTO();
		this.mrInvoiceDetailObj = new MRInvoiceDetailModel();
		this.serviceListObj = [];
		this.mrPaymentDetailObj = [];
	}
	saveUpdateMoneyReceipt() {
		debugger
		if (this.mrMasterModelDTOObj.ID > 0)
			this.mrMasterModelDTOObj.UpdatedBy = this.user.EmployeeCode;
		else this.mrMasterModelDTOObj.CreatedBy = this.user.EmployeeCode;

		// Validation
		if (!this.validateModel()) return;

		var invoiceDetails = JSON.stringify(this.mrInvoiceDetailObj);
		var paymentDetails = JSON.stringify(this.mrPaymentDetailObj);

		this.mrMasterModelDTOObj.InvoiceDetail = Library.getBase64(invoiceDetails);
		this.mrMasterModelDTOObj.mrPaymentDetail = Library.getBase64(paymentDetails);

		console.log(this.mrMasterModelDTOObj);
		this.transactionCommonService.saveUpdateMoenyReceipt(this.mrMasterModelDTOObj)
			.subscribe(
				data => this.setaveResult(data),
				error => this.Notification.Error(error)
			);

	}
	setaveResult(Data: any) {
		if (Data.ID > 0) {
			this.Notification.Success('Saved Successfully.');
			this.ResetMoneyReceiptModel();
			document.getElementById("NRList_tab").click();
			//this.getPackageList(); 
		}
		else {
			this.Notification.Failure('Unable to save data.'); 
		}
	}
	validateModel() {
		var result = true;
		try {
			if (Library.isUndefinedOrNullOrZero(this.mrMasterModelDTOObj.TotalPayableAmount)) {
				this.Notification.Warning('Please Enter Total Payable Amount.');
				result = false;
				return;
			}
			var validDetails = 0;
			this.mrPaymentDetailObj.forEach(item => {
				if (!Library.isNullOrZero(item.PaymentType)) {
					if (Library.isNullOrZero(item.ReceivedAmount)) {
						this.Notification.Warning('Please Select Receive Amount.');
						result = false;
						return;
					}
					validDetails += 1;
				}
				else {
					this.Notification.Warning('Please Select Payment Type.');
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
		 
		this.serviceListObj = [];
		this.GetServiceListByCustomerCode(customerCode);
		this.mrMasterModelDTOObj.TotalPayableAmount = 0;
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
			ID: 0,
			ReceiptCode: "",
			PaymentType: "0",
			ReceivedAmount: 0,
			BankName: "0",
			ChequeNo: "",
			CardNo: "",
			POSTransactionNo: "",
			TxnNo: "",
			CreatedBy: "",
			CreatedOn: "",
			UpdatedBy: "",
			UpdatedOn: "",

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
	CalculateTotalPayableValue(item) {
		
		this.mrMasterModelDTOObj.TotalPayableAmount = 0;
		item.forEach(element => { 
			if(element.PayableAmount == NaN || element.PayableAmount == undefined) element.PayableAmount=0;
			this.mrMasterModelDTOObj.TotalPayableAmount = Library.isUndefinedOrNullOrZeroReturn0(Number(this.mrMasterModelDTOObj.TotalPayableAmount)) + 
								Library.isUndefinedOrNullOrZeroReturn0(Number(element.PayableAmount));
								this.mrMasterModelDTOObj.TotalPayableAmount= Library.isUndefinedOrNullOrZeroReturn0(Number(this.mrMasterModelDTOObj.TotalPayableAmount.toFixed(2)));
		});
		console.log(this.mrMasterModelDTOObj.TotalPayableAmount);
	}
}