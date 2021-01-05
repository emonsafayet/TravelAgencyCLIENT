import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../Services/Notification.service";

//Common Service 
import { MenuService } from "../../Services/menu.service";
import { Library } from 'src/app/library/library';
import { AuthGuard } from '../../authGuard.guard';
import { UserService } from '../../Services/User.service';

import { UserAccessService } from '../../Services/UserAccess.service';

//classes
import { UserAccessTypeModel } from '../../Classes/SysManage/UserAccessTypeModel';
@Component({
	templateUrl: 'UserAccessType.html'
})
export class UserAccessType implements OnInit {
	user: any;

	UserAccessTypeList: any[] = [];
	SearchInAccessTypeList: string = '';
	AccessTypeObj: UserAccessTypeModel = new UserAccessTypeModel();

	constructor(private authGuard: AuthGuard, private menuService: MenuService,
		private userService: UserService, private userAccessService: UserAccessService, private Notification:NotificationService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.getUserAccessTypeList();
		this.Notification.LoadingRemove();
	}

	//User Access Type List
	getUserAccessTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.userAccessService.getUserAccessTypeList()
			.subscribe(
				data => this.setUserAccessTypeList(data),
				error => this.Notification.Error(error)
			);

	}
	setUserAccessTypeList(data) {
		this.UserAccessTypeList = data;
		console.log(this.UserAccessTypeList);
		this.Notification.LoadingRemove();
	}
	ResetAccessTypeModel() {
		this.AccessTypeObj = new UserAccessTypeModel();
	}

	EditAccessType(item) {
		this.AccessTypeObj = JSON.parse(JSON.stringify(item));
	}
	//save role
	userAccessSaveUpdate() {

		if (this.AccessTypeObj.ID > 0) this.AccessTypeObj.UpdatedBy = this.user.EmployeeCode;
		else this.AccessTypeObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateAccessTypeModel()) return;

		this.Notification.LoadingWithMessage('Loading...');

		this.userAccessService.userAccessSaveUpdate(this.AccessTypeObj)
			.subscribe(
				data => this.setUserAccessTypeSaveResult(data),
				error => this.Notification.Error(error)
			);
	}

	setUserAccessTypeSaveResult(Data: any) {

		if (Data.ID > 0) this.Notification.Success('UserAccess Type Saved Successfully.');
		else {
			this.Notification.Failure('Unable to save data.');
			console.log(Data)
		}

		this.AccessTypeObj = new UserAccessTypeModel();
		this.getUserAccessTypeList();
	}
	//validation
	validateAccessTypeModel() {
		var result = true;

		if (Library.isNullOrEmpty(this.AccessTypeObj.PermissionName)) {
			this.Notification.Warning('Please Enter Type Name.');
			result = false;
			return;
		}

		return result;
	}

}