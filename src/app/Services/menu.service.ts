import { Injectable } from '@angular/core';
import { MasterService } from './Master.service';


@Injectable()
export class MenuService {

	constructor(private masterService: MasterService) { }

	getSystemMenuList() { return this.masterService.get("system/all/menu/list/"); }

	getUserAllMenuList(empcode: string) { return this.masterService.get("system/user/menu/list/" + empcode); }

	checkUserThisMenuPrivilege(IpInfoObj : any) { return this.masterService.post("system/check/user/menu/permission/", IpInfoObj); }

	saveMenu(menuObj: any) { return this.masterService.post(`system/menu/save/update`, menuObj); }

	getApplicationList() { return this.masterService.get(`system/application/list`); }
	
}