import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";
import { Common } from "../../../library/common";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { CurrencyModel, CurrencyConversationHistoryModel } from '../../../Classes/ClientBusiness/CurrencyModel';
declare var moment: any;
@Component({
	templateUrl: '_Currency.html'
})
export class _Currency implements OnInit {
	user: any;

	CurrencyList: any[] = [];
	CurrencyObj: CurrencyModel = new CurrencyModel();
	CurrencyRateObj: CurrencyConversationHistoryModel = new CurrencyConversationHistoryModel();
	SearchCurrencyList: string = '';

	SearchCurrencyRateList: string = '';
	CurrencyRateList: any[] = [];
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.getCurrencyList();
		this.Notification.LoadingRemove();
	}
	saveCurrency() {
		if (this.CurrencyObj.ID > 0) this.CurrencyObj.UpdatedBy = this.user.EmployeeCode;
		else this.CurrencyObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');

		this.clientBusinessService.saveUpdateCurrency(this.CurrencyObj)
			.subscribe(
				data => this.setaveResult(data),
				error => this.Notification.Error(error)
			);
	}
	setaveResult(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Saved Successfully.');
		else {
			this.Notification.Failure('Unable to save data.');
			console.log(Data)
		}

		this.CurrencyObj = new CurrencyModel();
		this.getCurrencyList();
	}
	EditItem(item) {
		this.CurrencyObj = JSON.parse(JSON.stringify(item));
	}
	//Get Currency List
	getCurrencyList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getCurrencyList()
			.subscribe(
				data => this.setCurrencyList(data),
				error => this.Notification.Error(error)
			);
	}
	setCurrencyList(data) {
		this.CurrencyList = data;
		this.Notification.LoadingRemove();
	}
	ResetModel() {
		this.CurrencyObj = new CurrencyModel();
	}
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.CurrencyObj.CurrencyName)) {
			this.Notification.Warning('Please Enter Currency Name.');
			result = false;
			return;
		}
		return result;
	}

	// -----------------------Currency Conversation Rate History------------------------------------------
	saveUpdateCurrencyRate() {
		if (this.CurrencyRateObj.ID > 0) this.CurrencyRateObj.UpdatedBy = this.user.EmployeeCode;
		else this.CurrencyRateObj.CreatedBy = this.user.CurrencyRateObj;

		//validation
		if (!this.validateCurrencyRateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');

		this.clientBusinessService.saveUpdateCurrencyRate(this.CurrencyRateObj)
			.subscribe(
				data => this.setCurrencyRate(data),
				error => this.Notification.Error(error)
			);
	}

	setCurrencyRate(Data) {
		if (Data.ID > 0) this.Notification.Success('Saved Successfully.');
		else {
			this.Notification.Failure('Unable to save data.'); 
		}
		this.CurrencyRateObj = new CurrencyConversationHistoryModel();
		this.getCurrencyRate();
	}
	validateCurrencyRateModel(){
		var result = true;
		if (Library.isNuLLorUndefined(this.CurrencyRateObj.Currency)) {
			this.Notification.Warning('Please Select Currency  .');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.CurrencyRateObj.Rate)) {
			this.Notification.Warning('Please Enter Currency  Rate.');
			result = false;
			return;
		}
		return result;
	}
	getCurrencyRate() {
		this.CurrencyRateObj.FromdDate = moment().format(Common.SQLDateFormat); 
		this.CurrencyRateObj.ExpireDate = moment().format(Common.SQLDateFormat); 
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.GETCurrencyRateLIST()
			.subscribe(
				data => this.setCurrencyRateList(data),
				error => this.Notification.Error(error)
			);
	}
	setCurrencyRateList(data) {
		this.CurrencyRateList = data;
		this.Notification.LoadingRemove();
	}
	EditCurrencyRate(item) {
		this.CurrencyRateObj = JSON.parse(JSON.stringify(item));
	}
	ResetCurrencyRateModel(){
		
	}
	
}