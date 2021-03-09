import { getDefaultSettings } from "http2";
import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../Services/Notification.service";
import { Library } from 'src/app/library/library';
import { AuthGuard } from '../../authGuard.guard'; 
//Common Service 
import { MenuService } from "../../Services/menu.service";
import { UserService } from '../../Services/User.service';
import { UserAccessService } from '../../Services/UserAccess.service';
import { EmployeeService } from '../../Services/Employee.service';

//Classes
import { UserTblModel } from '../../Classes/SysManage/UserTblModel';


@Component({
	templateUrl: 'User.html'
})
export class User implements OnInit {
	user: any;

	//UserList: any[] = [];
	UserDetailList: any[] = [];
	RoleList: any[] = [];
	ApplicationList: any[] = [];
	EmpList: any[] = [];
	UserObj: UserTblModel = new UserTblModel();
	IsUpdate: boolean = false;
	searchInUserList: string;

	IsPasswordShow: boolean = false;

	constructor(private authGuard: AuthGuard, private menuService: MenuService,
		private userService: UserService, private userAccessService: UserAccessService, private employeeService: EmployeeService, private Notification: NotificationService) { }

	ngOnInit() {

		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.Notification.LoadingWithMessage('Loading...');
		this.ResetUserEntryForm();
		this.getUserList();
		this.getApplications();
		this.GetEmployeeList();
		this.getRoles();
		this.Notification.LoadingRemove();

	}
	ResetUserEntryForm() {
		this.UserObj = new UserTblModel(); this.IsUpdate = false;
	}
	saveUser() {

		//validation
		if (!this.validateUserModel()) return;

		if (this.IsUpdate) this.UserObj.UpdatedBy = this.user.EmployeeCode;
		else this.UserObj.CreatedBy = this.user.EmployeeCode;

		this.Notification.LoadingWithMessage('Loading...');
		this.userAccessService.saveUser(this.UserObj)
			.subscribe(
				data => this.setUserSaveResult(data),
				error => this.Notification.Error(error)
			);
	};

	setUserSaveResult(data) {
		//this.Notification.LoadingRemove();
		//console.log(data);
		this.Notification.Success('Saved Successfully.');
		this.getUserList();

	}

	//validation
	validateUserModel() {

		var result = true;

		if (Library.isNullOrEmpty(this.UserObj.UserName)) {
			this.Notification.Warning('Please Enter User Name.');
			result = false;
			return;
		}
		else if (this.UserObj.UserName.length < 3) {
			this.Notification.Warning('User name must be more than 3 character.');
			result = false;
			return;
		}

		else if (Library.isNullOrEmpty(this.UserObj.UserPassword)) {
			this.Notification.Warning('Please Enter Password');
			result = false;
			return;
		}
		else if (this.UserObj.UserPassword.length < 5) {
			this.Notification.Warning('User Password must be more than 5 character');
			result = false;
			return;
		}
		else if (Library.isNullOrZero(this.UserObj.RoleID)) {
			this.Notification.Warning('Please select user Role.');
			result = false;
			return;
		}
		else if (Library.isNullOrZero(this.UserObj.ApplicationID)) {
			this.Notification.Warning('Please select Application.');
			result = false;
			return;
		}
		else if (Library.isNullOrEmpty(this.UserObj.EmployeeCode)) {
			this.Notification.Warning('Please select user EmployeeCode.');
			result = false;
			return;
		}

		var IsUserExist = this.UserDetailList.filter(u => u.UserName == this.UserObj.UserName)[0];

		if (!Library.isNuLLorUndefined(IsUserExist) && this.IsUpdate == false) {
			this.Notification.Warning('User Name already exist');
			result = false;
			return;
		}

		return result;
	}
	EditUser(item) {
		this.IsUpdate = true;
		//console.log(item);
		this.UserObj = JSON.parse(JSON.stringify(item));

		this.UserObj.IsActive = item.UserIsActive;
		this.UserObj.EmployeeName = item.FullName;
	}

	//get user List
	getUserList() {
		this.ResetUserEntryForm();
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
	//Application List
	getApplications() {
		this.menuService.getApplicationList()
			.subscribe(
				data => this.ApplicationList = data,
				error => this.Notification.Error(error)
			);
	}
	//Role List
	getRoles() {
		this.userAccessService.getRoleList()
			.subscribe(
				data => this.RoleList = data,
				error => this.Notification.Error(error)
			);
	}
	//Employee List
	GetEmployeeList() {
		this.employeeService.GetEmployeeListWithOutUserAccount()
			.subscribe(
				data => this.EmpList = data,
				error => this.Notification.Error(error)
			);
	}
}

