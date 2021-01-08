import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { ProviderModel } from '../../../Classes/ClientBusiness/ProviderModel';


@Component({
	templateUrl: 'Provider.html'
})
export class Provider implements OnInit {
	user: any;

	providerList: any[] = [];
	providerObj: ProviderModel = new ProviderModel();
	SearchProviderList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.getProviderList();
		this.Notification.LoadingRemove();
	}

	saveProvider() {
		if (this.providerObj.ID > 0) this.providerObj.UpdatedBy = this.user.EmployeeCode;
		else this.providerObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');

		this.clientBusinessService.saveUpdateProvider(this.providerObj)
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

		this.providerObj = new ProviderModel();
		this.getProviderList();
	}
	EditItem(item) { 
		this.providerObj = JSON.parse(JSON.stringify(item));
	}
	//get travel Provider List
	getProviderList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getProviderList()
			.subscribe(
				data => this.setProviderList(data),
				error => this.Notification.Error(error)
			);
	}
	setProviderList(data) {
		this.providerList = data;
		this.Notification.LoadingRemove();
	}
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.providerObj.ProviderName)) {
			this.Notification.Warning('Please Enter Provider Name.');
			result = false;
			return;
		} 
		return result;
	}

	ResetModel() {
		this.providerObj = new ProviderModel();
	}
}