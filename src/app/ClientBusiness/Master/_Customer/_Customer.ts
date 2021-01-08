import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { CustomerModel } from '../../../Classes/ClientBusiness/CustomerModel';

@Component({
	templateUrl: '_Customer.html'
})
export class _Customer implements OnInit {
	user: any;

	customerList: any[] = [];
	customerTypeList: any[] = [];
	customerObj: CustomerModel = new CustomerModel();
	SearchCustomerList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.customerObj.CustomerTypeCode = "0";
		this.getCustomerList();
		this.getCustomerTypeList();
		this.Notification.LoadingRemove();
	}

	//get Cusomter List
	getCustomerList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getcustomerList()
			.subscribe(
				data => this.setCustomerList(data),
				error => this.Notification.Error(error)
			);
	}
	setCustomerList(data) {
		this.customerList = data;
		this.Notification.LoadingRemove();
	}
	ResetModel() {
		this.customerObj = new CustomerModel();
		this.customerObj.CustomerTypeCode = "0";
	}
	EditItem(item) {
		this.customerObj = JSON.parse(JSON.stringify(item)); 
	}
	//get Customer Type List
	getCustomerTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getCustomerTypeList()
			.subscribe(
				data => this.customerTypeList = data,
				error => this.Notification.Error(error)
			);
	}
	saveCustomer() {
		if (this.customerObj.ID > 0)
			this.customerObj.UpdatedBy = this.user.EmployeeCode;
		else this.customerObj.CreatedBy = this.user.EmployeeCode;
		console.log(this.customerObj);
		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.saveUpdateCustomer(this.customerObj).subscribe(
			(data) => this.SetsaveUpdateCustomer(data),
			(error) => this.Notification.Error(error)
		);
	}
	SetsaveUpdateCustomer(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Employee Saved Successfully.');
		else {
			this.Notification.LoadingRemove();

			console.log(Data);
		}

		this.customerObj = new CustomerModel();
		this.getCustomerList();
	}
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.customerObj.CustomerName)) {
			this.Notification.Warning('Please Enter Customer Name.');
			result = false;
			return;
		}
		return result;
	}

}