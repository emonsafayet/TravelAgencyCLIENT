import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../Services/Notification.service";
//Common Service 
import { MenuService } from "../../Services/menu.service";
import { Library } from 'src/app/library/library';
import { AuthGuard } from '../../authGuard.guard';
import { UserService } from '../../Services/User.service';

//Classes
import { MenuModel  } from '../../Classes/SysManage/MenuModel';
 

@Component({
	templateUrl: 'MenuSetting.html'
})
export class MenuSetting implements OnInit {

	user: any;

	AllMenuList: any = [] = [];
	MenuObj: MenuModel = new MenuModel();
	ApplicationList: any;
	IsUpdate: boolean = false;
	constructor(private authGuard: AuthGuard, private menuService: MenuService, private userService: UserService, private Notification:NotificationService) { }

	ngOnInit() {

		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user); 
		this.Notification.LoadingWithMessage('Loading...');
		this.getAllMenuList();
		this.getApplications();
		this.Notification.LoadingRemove();

	}
	saveMenu() {

		//validation
		if (!this.validateMenuModel()) return;

		if (this.IsUpdate) this.MenuObj.UpdatedBy = this.user.EmployeeCode;
		else this.MenuObj.CreatedBy = this.user.EmployeeCode;

		this.Notification.LoadingWithMessage('Loading...');
		this.menuService.saveMenu(this.MenuObj)
			.subscribe(
				data => this.setMenuSaveResult(data),
				error => this.Notification.Error(error)
			);
	}
	setMenuSaveResult(data) {
		this.Notification.Success('Menu Saved Successfully.');
		this.getAllMenuList();

	}
	ResetEntryForm() {
		this.MenuObj = new MenuModel(); this.IsUpdate = false;
	}

	EditMenuItem(item) {
		console.log(item);
		this.IsUpdate = true;
		this.MenuObj = item;
	}

	validateMenuModel() {
		var result = true;

		if (Library.isNullOrEmpty(this.MenuObj.MenuNameEng)) {
			this.Notification.Warning('Please Enter Menu Name.');
			result = false;
			return;
		}
		else if (Library.isNullOrEmpty(this.MenuObj.MenuURL)) {
			this.Notification.Warning('Please Enter Menu Url.');
			result = false;
			return;
		}
		else if (Library.isNullOrZero(this.MenuObj.ParentMenuID)) {
			this.Notification.Warning('Please select Parent Menu.');
			result = false;
			return;
		}
		else if (Library.isNullOrZero(this.MenuObj.ApplicationID)) {
			this.Notification.Warning('Please select Application.');
			result = false;
			return;
		}
		else if (Library.isNullOrZero(this.MenuObj.DisplayOrder)) {
			this.Notification.Warning('Please Enter Display Order.');
			result = false;
			return;
		}

		return result;
	}
	//Application List
	getApplications() {
		this.menuService.getApplicationList()
			.subscribe(
				data => this.ApplicationList = data,
				error => this.Notification.Error(error)
			);
	}

	getAllMenuList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.menuService.getSystemMenuList()
			.subscribe(
				data => this.setAllMenuList(data),
				error => this.Notification.Error(error)
			);
	}

	setAllMenuList(data) {
		this.AllMenuList = data;
		console.log(this.AllMenuList);
		this.Notification.LoadingRemove();
	}
}

