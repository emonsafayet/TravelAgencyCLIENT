import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../Services/Notification.service";
//Common Service 
import { MenuService } from "../../Services/menu.service";
import { Library } from 'src/app/library/library';
import { AuthGuard } from '../../authGuard.guard';
import { UserService } from '../../Services/User.service';

import { UserAccessService } from '../../Services/UserAccess.service';


@Component({
	templateUrl: 'UserAccess.html'
})
export class UserAccess implements OnInit {

	user: any;

	UserDetailList: any[] = [];
	searchInUserList: string;

	ApplicationList: any[] = [];
	selectedUser: any;
	AllMenuAccessList: any[] = [];

	

	constructor(private authGuard: AuthGuard, private menuService: MenuService,
		private userService: UserService, private userAccessService: UserAccessService, private Notification:NotificationService) { }

	ngOnInit() {

		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.getUserList();
		this.getApplications();
		this.Notification.LoadingRemove();

	}



	saveAccess(menuItem: any, AccessItem: any) {
		if (AccessItem['FieldValue']) AccessItem['FieldValue'] = false;
		else AccessItem['FieldValue'] = true;

		this.userAccessService.saveUpdateUserAccess(this.selectedUser.EmployeeCode, AccessItem['FieldValue'], menuItem.ID, AccessItem.AccessID, this.user.EmployeeCode)
			.subscribe(
				data => this.setSaveUpdateUserAccessResult(data),
				error => this.Notification.Error(error)
			);
	}

	setSaveUpdateUserAccessResult(data) {
		//console.log(data);
		this.Notification.Success('Saved Successfully');
	}

	selectUser(item) {
		this.selectedUser = item;
		//console.log(this.selectedUser);

		if (Library.isNuLLorUndefined(this.selectUser)) return;

		this.getUserAllMenuWithAccessList();
	}

	getUserAllMenuWithAccessList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.userAccessService.getUserAllMenuWithAccessList(this.selectedUser['EmployeeCode'])
			.subscribe(
				data => this.setUserAllMenuWithAccessList(data),
				error => this.Notification.Error(error)
			);
	}

	setUserAllMenuWithAccessList(data) {
		this.AllMenuAccessList = data;
		//console.log(this.AllMenuAccessList);
		this.Notification.LoadingRemove();
	}
	//Application List
	getApplications() {
		this.menuService.getApplicationList()
			.subscribe(
				data => this.ApplicationList = data,
				error => this.Notification.Error(error)
			);
	} 

	//get user List
	getUserList() {

		this.Notification.LoadingWithMessage('Loading...');
		this.userAccessService.getUserDetailList()
			.subscribe(
				data => this.setUserDetailList(data),
				error => this.Notification.Error(error)
			);

	}
	setUserDetailList(data) {
		this.Notification.LoadingRemove();
		this.UserDetailList = data;
		//console.log(this.UserDetailList);
	}



}

