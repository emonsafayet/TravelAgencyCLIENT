import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import {NotificationService} from "../../../Services/Notification.service";
//Service   
import { Library } from 'src/app/library/library';
import { EmployeeService } from "../../../Services/Employee.service";
//classes

import { DesignationModel } from '../../../Classes/SysManage/DesignationModel'
@Component({
	templateUrl: 'EmployeeDesignation.html'
})
export class EmployeeDesignation implements OnInit {
	user: any;
	designationList: any[] = [];
	designationObj: DesignationModel = new DesignationModel();

	constructor(private userService: UserService, private authGuard: AuthGuard, private EmployeeService: EmployeeService, private Notification:NotificationService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);


		this.Notification.LoadingWithMessage('Loading...');
		this.getDesignationList();
		this.Notification.LoadingRemove();

	}
	saveUpdateDesignation() {
		if (this.designationObj.ID > 0) this.designationObj.UpdatedBy = this.user.EmployeeCode;
		else this.designationObj.CreatedBy = this.user.EmployeeCode;
		// validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.EmployeeService.saveUpdateDesignation(this.designationObj)
			.subscribe(
				data => this.setSaveUpdateResult(data),
				error => this.Notification.Error(error)
			);
	}
	setSaveUpdateResult(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Saved Successfully.');
		else {
			this.Notification.Failure('Unable to save data.');
			console.log(Data)
		}

		this.designationObj = new DesignationModel();
		this.getDesignationList();
	}
	//validation
	validateModel() {
		var result = true;

		if (Library.isNullOrEmpty(this.designationObj.DesignationName)) {
			this.Notification.Warning('Please Enter Designation.');
			result = false;
			return;
		}

		return result;
	}

	ResetModel() { this.designationObj = new DesignationModel(); }

	EditItem(item) {
		this.designationObj = JSON.parse(JSON.stringify(item));
	}

	getDesignationList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.EmployeeService.getDesignationList()
			.subscribe(
				data => this.setDesignationList(data),
				error => this.Notification.Error(error)
			);
	}
	setDesignationList(data) {
		this.designationList = data;
		this.Notification.LoadingRemove();
	}

}