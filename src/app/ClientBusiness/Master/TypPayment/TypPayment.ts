import { CompilerConfig } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';
// classess
import { PaymentTypeModel  } from '../../../Classes/ClientBusiness/PaymentTypeModel';
@Component({
	templateUrl: 'TypPayment.html'
})
export class TypPayment implements OnInit {
	user: any;

	PaymentTypeList: any[] = [];
	PaymentTypeObj:  PaymentTypeModel= new PaymentTypeModel();
	SearchPaymentTypeList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService,private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.getPaymentTypeList();
		this.Notification.LoadingRemove();
	}
	savePaymentType(){
		if (this.PaymentTypeObj.ID > 0) 
		this.PaymentTypeObj.UpdatedBy = this.user.EmployeeCode;
		else this.PaymentTypeObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');

		this.clientBusinessService.saveUpdatePaymentType(this.PaymentTypeObj)
			.subscribe(
				data => this.setsaveResult(data),
				error => this.Notification.Error(error)
			);
	}
	setsaveResult(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Saved Successfully.');
		else {
			this.Notification.Failure('Unable to save data.');
			console.log(Data)
		}

		this.PaymentTypeObj = new PaymentTypeModel();
		this.getPaymentTypeList();
	}
	EditItem(item) {
		this.PaymentTypeObj = JSON.parse(JSON.stringify(item));
	}


	getPaymentTypeList(){
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
	ResetModel(){
		this.PaymentTypeObj = new PaymentTypeModel();
	}
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.PaymentTypeObj.PaymentTypeName)) {
			this.Notification.Warning('Please Enter Country Name.');
			result = false;
			return;
		}
		return result;
	}

}