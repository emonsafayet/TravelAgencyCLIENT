import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../authGuard.guard';
import { UserService } from '../../Services/User.service';
import {NotificationService} from "../../Services/Notification.service";
//Service 
import { MenuService } from "../../Services/menu.service";
import { UserAccessService } from "../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';

//classes
import { RoleModel } from '../../Classes/SysManage/RoleModel';


@Component({
	templateUrl: 'UserRole.html'
})
export class UserRole implements OnInit {

	user: any;
	roleList: any[] = [];
	RoleObj :RoleModel = new RoleModel();
	SearchInRoleList :string ='';

	constructor(private userService: UserService, private authGuard: AuthGuard, 
		private menuService: MenuService,private userAccessService:UserAccessService, private Notification:NotificationService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		
		this.Notification.LoadingWithMessage('Loading...');
		this.getroleList();
		this.Notification.LoadingRemove();
	
	}

	ActiveInActiveRole(item :RoleModel, IsActive :boolean){

		item.IsActive = IsActive;
		item.UpdateBy =this.user.EmployeeCode;

		this.userAccessService.saveRole(item)
		.subscribe(
			data => this.setRoleSaveResult(data),
			error => this.Notification.Error(error)
		);
	}

	EditItem(item){
		this.RoleObj = JSON.parse(JSON.stringify(item));
	}

	ResetRoleModel(){
		this.RoleObj = new RoleModel();
	}
	//save role
	saveRole() {

		if(this.RoleObj.ID > 0) this.RoleObj.UpdateBy = this.user.EmployeeCode;
		else this.RoleObj.CreatedBy = this.user.EmployeeCode;
		//validation
		if (!this.validateRoleModel()) return;

		this.Notification.LoadingWithMessage('Loading...');

		this.userAccessService.saveRole(this.RoleObj)
		.subscribe(
			data => this.setRoleSaveResult(data),
			error => this.Notification.Error(error)
		);
	}


	setRoleSaveResult(Data: any) {

		if(Data.ID > 0) this.Notification.Success('Role Saved Successfully.');
		else
		{
			this.Notification.Failure('Unable to save data.');
			console.log(Data)
		}

		this.RoleObj = new RoleModel();
		this.getroleList();
	}

	//validation
	 validateRoleModel() {
		var result =true;

		if(Library.isNullOrEmpty(this.RoleObj.Name)){
			this.Notification.Warning('Please Enter Role Name.');
			result = false;
			return;
		}

		return result;
	}


	//get role List
	getroleList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.userAccessService.getRoleList()
			.subscribe(
				data => this.setRoleListResult(data),
				error => this.Notification.Error(error)
			);
	}

	setRoleListResult(data){
		this.roleList = data;
		this.Notification.LoadingRemove();
	}
}

