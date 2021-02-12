import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";
import { Library } from 'src/app/library/library';
import { Common } from "../../../library/common";
//Service    
import { SettingService } from '../../../Services/Setting.service';

// classess
import { SignatureModel } from '../../../Classes/SysManage/SignatureModel';
declare var moment: any;
@Component({
	templateUrl: 'Signature.html'
})
export class Signature implements OnInit {
	user: any;

	signatureObj: SignatureModel = new SignatureModel();
	tableTypeList: any[] = [];
	signatureList: any[] = [];
	SearchSignatureList: string = '';
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private settingService: SettingService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.GetSignatureList();
		this.GetTableType();
		this.Notification.LoadingWithMessage('Loading...');
		this.Notification.LoadingRemove();
	}
	
	saveUpdateSignature() {
		if (this.signatureObj.ID > 0)
			this.signatureObj.UpdatedBy = this.user.EmployeeCode;
		else this.signatureObj.CreatedBy = this.user.EmployeeCode;
		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.settingService.saveUpdateSignature(this.signatureObj).subscribe(
			(data) => this.setSaveUpdateSignature(data),
			(error) => this.Notification.Error(error)
		);
	}
	validateModel() { 
		var result = true
		if (Library.isNullOrEmpty(this.signatureObj.KeyID)) {
			this.Notification.Warning('Please Enter key ID.');
			result = false;
			return;
		} 
		else if (Library.isUndefinedOrNullOrZero(this.signatureObj.NoOfDigit)) {
			this.Notification.Warning('Please Enter No of Digit.');
			result = false;
			return;
		} 
		else if (Library.isNuLLorUndefined(this.signatureObj.DBName)) {
			this.Notification.Warning('Please Enter BD Name.');
			result = false;
			return;
		} 
		else if (Library.isNuLLorUndefined(this.signatureObj.TableType)) {
			this.Notification.Warning('Please Enter Table Type.');
			result = false;
			return;
		} 
		else if (Library.isNuLLorUndefined(this.signatureObj.TableName)) {
			this.Notification.Warning('Please Enter Table Name.');
			result = false;
			return;
		} 
		else if (Library.isNuLLorUndefined(this.signatureObj.ColumnName)) {
			this.Notification.Warning('Please Enter Column Name.');
			result = false;
			return;
		} 
		else if (Library.isNuLLorUndefined(this.signatureObj.InitialCode)) {
			this.Notification.Warning('Please Enter Initial Code.');
			result = false;
			return;
		} 
		return result;
	}
	setSaveUpdateSignature(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Saved Successfully.');
		else {
			this.Notification.LoadingRemove();
		}
		this.ResetModel();
		this.GetSignatureList();
	}
	GetTableType() {
		this.Notification.LoadingWithMessage('Loading...');
		this.settingService.getTableTypeList()
			.subscribe(
				data => this.setTableType(data),
				error => this.Notification.Error(error)
			);
	}
	setTableType(data) {
		this.tableTypeList = data;
		this.Notification.LoadingRemove();
	}
	GetSignatureList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.settingService.getSignatureList()
			.subscribe(
				data => this.setSignatureList(data),
				error => this.Notification.Error(error)
			);
	}
	setSignatureList(data) {
		this.signatureList = data;
		this.Notification.LoadingRemove();
	}
	EditItem(item) {
		this.signatureObj = JSON.parse(JSON.stringify(item));
	} 
	ResetModel() {
		this.signatureObj = new SignatureModel();
	}
}