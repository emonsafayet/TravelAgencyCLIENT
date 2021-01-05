import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../../Services/Notification.service";

//Common Service
import { MenuService } from '../../../Services/menu.service';
import { Common } from "../../../library/common";
import { Library } from 'src/app/library/library';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';

//Classess
import { EmployeeModel } from '../../../Classes/SysManage/EmployeeModel';

//Services
import { EmployeeService } from '../../../Services/Employee.service';

//
declare var moment: any;
@Component({
	templateUrl: 'EmployeeBasic.html',
})
export class EmployeeBasic implements OnInit {
	user: any;

	EmployeeList: any[] = []; 
	DesignationList: any[] = [];
	DepartmentList: any[] = [];
	EmployeeTypeList: any[] = [];
	EmployeeStatusList: any[] = [];
	EmployeeObj: EmployeeModel = new EmployeeModel();
	SearchInEmployeeList: string = '';

	constructor(private authGuard: AuthGuard, private menuService: MenuService, private userService: UserService, private employeeService: EmployeeService, private Notification:NotificationService) { }



	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		
		this.getDesignationList();
		this.getDepartmentList();
		this.getEmployeeStatusList();
		this.getEmployeeTypeList();
		
		this.EmployeeObj.MaritalStatus="0";
		this.EmployeeObj.Sex="0";
		this.EmployeeObj.DepartmentID=0;
		this.EmployeeObj.DesignationID=0;
		this.EmployeeObj.EmployeeTypeID=0;

		this.EmployeeObj.ConfirmationDate = moment().format(Common.SQLDateFormat);
    	this.EmployeeObj.DOB = moment().format(Common.SQLDateFormat);
    	this.EmployeeObj.DOJ = moment().format(Common.SQLDateFormat); 
	}

	ResetModel() {
		this.EmployeeObj = new EmployeeModel();
	}

	//save role
	saveUpdateEmployee() {
		if (this.EmployeeObj.ID > 0)
			this.EmployeeObj.UpdatedBy = this.user.EmployeeCode;
		else this.EmployeeObj.CreatedBy = this.user.EmployeeCode;
		//validation
		//if (!this.validateRoleModel()) return;

		 this.Notification.LoadingWithMessage('Loading...');		
		this.employeeService.saveUpdateEmployee(this.EmployeeObj).subscribe(
			(data) => this.SetsaveUpdateEmployee(data),
			(error) => this.Notification.Error(error)
		);
	}
	SetsaveUpdateEmployee(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Employee Saved Successfully.');
		else {
			this.Notification.LoadingRemove();

			console.log(Data);
		}

		this.EmployeeObj = new EmployeeModel();
		//this.getEmployeeList();
	}
	//get Employee List
	getEmployeeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.employeeService.getEmployeeList().subscribe(
			(data) => this.setEmployeeList(data),
			(error) => this.Notification.Error(error)
		);
	}
	//set Employee List
	setEmployeeList(data) {
		this.Notification.LoadingRemove();
		this.EmployeeList = data;
	}

	//DROP DOWN

	//get Employee Designation List
	getDesignationList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.employeeService.getDesignationList().subscribe(
			(data) => this.setDesignationList(data),
			(error) => this.Notification.Error(error)
		);
	}
	//set Employee department List
	setDesignationList(data) {
		this.Notification.LoadingRemove();
		this.DesignationList = data;
	}

	//get Employee Department List
	getDepartmentList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.employeeService.getDepartmentList().subscribe(
			(data) => this.setDepartmentList(data),
			(error) => this.Notification.Error(error)
		);
	}
	//set Employee Department List
	setDepartmentList(data) {
		this.Notification.LoadingRemove();
		this.DepartmentList = data;
	}
	//get Employee TYPE List
	getEmployeeTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.employeeService.getEmployeeTypeList().subscribe(
			(data) => this.setEmployeeTypeList(data),
			(error) => this.Notification.Error(error)
		);
	}
	//set Employee TYPE List
	setEmployeeTypeList(data) {
		this.Notification.LoadingRemove();
		this.EmployeeTypeList = data;
	}
	//get Employee TYPE List
	getEmployeeStatusList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.employeeService.getEmployeeStatusList().subscribe(
			(data) => this.setEmployeeStatusList(data),
			(error) => this.Notification.Error(error)
		);
	}
	//set Employee TYPE List
	setEmployeeStatusList(data) {
		this.Notification.LoadingRemove();
		this.EmployeeStatusList = data;
	}

}
