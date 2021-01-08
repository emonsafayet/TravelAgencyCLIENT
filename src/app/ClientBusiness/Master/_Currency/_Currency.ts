import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import {  CurrencyModel } from '../../../Classes/ClientBusiness/CurrencyModel';

@Component({
	templateUrl: '_Currency.html'
})
export class _Currency implements OnInit {
	user: any;

	CurrencyList: any[] = [];
	CurrencyObj: CurrencyModel = new CurrencyModel();
	SearchCurrencyList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService,private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.getCurrencyList();
		this.Notification.LoadingRemove();
	}
	saveCurrency(){
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
	ResetModel(){
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

}