import { Injectable } from '@angular/core';
import { MasterService } from './Master.service';


@Injectable()
export class EmployeeService{ 

	constructor(private masterService: MasterService) { }

	GetEmployeeListWithOutUserAccount() { return this.masterService.get(`system/employee/list/without/user/account`); }

	getEmployeeList() { return this.masterService.get(`system/employee/list`); }
	
	saveUpdateEmployee(EmployeeObj: any) { return this.masterService.post(`system/employee/save/update`, EmployeeObj); }
	
	
	saveUpdateDesignation(designationObj: any) { return this.masterService.post(`system/employee/designation/save/update`, designationObj); }

	//DROPDOWN API
	getDesignationList() { return this.masterService.get(`system/employee/designation/list`); }
	getDepartmentList() { return this.masterService.get(`system/employee/department/list`); }
	getEmployeeTypeList() { return this.masterService.get(`system/employee/type/list`); }
	getEmployeeStatusList() { return this.masterService.get(`system/employee/status/list`); }

}