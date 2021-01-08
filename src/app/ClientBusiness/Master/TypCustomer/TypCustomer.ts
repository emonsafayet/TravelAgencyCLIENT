import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { CustomerTypeModel } from '../../../Classes/ClientBusiness/CustomerTypeModel';

@Component({
	templateUrl: 'TypCustomer.html'
})
export class TypCustomer implements OnInit {
	user: any;

	customerTypeList: any[] = [];
	customerTypeObj: CustomerTypeModel = new CustomerTypeModel();
	SearchCustomerTypeList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.getCustomerTypeList();
		this.Notification.LoadingRemove();
	}
	saveCustomerType() {
		if (this.customerTypeObj.ID > 0) this.customerTypeObj.UpdatedBy = this.user.EmployeeCode;
		else this.customerTypeObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');

		this.clientBusinessService.saveUpdateCustomerType(this.customerTypeObj)
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

		this.customerTypeObj = new CustomerTypeModel();
		this.getCustomerTypeList();
	}
	EditItem(item) {
		this.customerTypeObj = JSON.parse(JSON.stringify(item));
	}
	//get Customer Type List
	getCustomerTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getCustomerTypeList()
			.subscribe(
				data => this.setCustomerTypeList(data),
				error => this.Notification.Error(error)
			);
	}
	setCustomerTypeList(data) {
		this.customerTypeList = data;
		this.Notification.LoadingRemove();
	}
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.customerTypeObj.TypeName)) {
			this.Notification.Warning('Please Enter Type Name.');
			result = false;
			return;
		}
		return result;
	}
	ResetModel() {
		this.customerTypeObj = new CustomerTypeModel();
	}

}