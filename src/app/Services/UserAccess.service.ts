import { Injectable } from '@angular/core';
import { MasterService } from './Master.service';

@Injectable()
export class UserAccessService{

	constructor(private masterService : MasterService) { }



// User Service	
getUserList() { return this.masterService.get(`system/user/list`); }

getUserDetailList() { return this.masterService.get(`system/user/detail/list`); }

saveUser(user: any) { return this.masterService.post(`system/user/save/update`, user); }

//Role Service
getRoleList() { return this.masterService.get(`system/role/list`); }

saveRole(roleDto: any) { return this.masterService.post(`system/role/save/update`, roleDto); }

saveUpdateUserAccess(employeecode:string, accesstype: boolean, menuID :number, accessID:number, entryBy:any) { 
	return this.masterService.get("system/user/access/save/update/" + employeecode + '/'  + accesstype + '/' + menuID + '/' + accessID + '/' + entryBy); 
}

//
getUserAllMenuWithAccessList(empcode: string) { return this.masterService.get("system/user/all/access/list/" + empcode); }

//User Access Type Service
userAccessSaveUpdate(UserAccessTypeDto: any) { return this.masterService.post(`system/user/access/type/save/update`, UserAccessTypeDto); }
 
getUserAccessTypeList() { return this.masterService.get(`system/user/access/type/list`); }



}