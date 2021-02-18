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
// classess
import { VisaTypeModel } from '../../../Classes/ClientBusiness/VisaTypeModel';

@Component({
	templateUrl: 'typVisa.html'
})
export class TypVisa implements OnInit {
	user: any;
	visaTypeList: [] = [];
	visaTypObj: VisaTypeModel = new VisaTypeModel();
	SearchVisaTypeList: string = "";
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.getVisaTypeList();
		this.Notification.LoadingWithMessage('Loading...');
		this.Notification.LoadingRemove();
	}
	getVisaTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GETVisaTypeLIST()
			.subscribe(
				data => this.setVisaTypeList(data),
				error => this.Notification.Error(error)
			);
	}
	setVisaTypeList(data) {
		this.visaTypeList = data;
		this.Notification.LoadingRemove();
	}
	saveVisaType() {
		if (this.visaTypObj.ID > 0)
			this.visaTypObj.UpdatedBy = this.user.EmployeeCode;
		else this.visaTypObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.saveOrUpdateVisaType(this.visaTypObj).subscribe(
			(data) => this.SetsaveUpdate(data),
			(error) => this.Notification.Error(error)
		);
	}
	SetsaveUpdate(Data) {
		if (Data.ID > 0) this.Notification.Success('Hotel Type Successfully.');
		this.Notification.LoadingRemove();
		this.ResetModel()
		this.getVisaTypeList();
	}
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.visaTypObj.VisaTypeName)) {
			this.Notification.Warning('Please Enter Visa Type Name.');
			result = false;
			return;
		}
		return result;
	}
	ResetModel() {
		this.visaTypObj = new VisaTypeModel();
	}
	EditItem(item) {
		this.visaTypObj = JSON.parse(JSON.stringify(item));
	}

}