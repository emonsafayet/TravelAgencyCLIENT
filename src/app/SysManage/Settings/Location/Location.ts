import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';

//Service  
import { Library } from 'src/app/library/library';

//classes
import { EmployeeLocationModel } from '../../../Classes/SysManage/EmployeeLocationModel';

@Component({
	templateUrl: 'Location.html'
})
export class Location implements OnInit {
	user: any;
	locationList:any[]=[];
	LocationObj:EmployeeLocationModel=new EmployeeLocationModel();
	SearchInlocationList:string='';

	constructor(private userService: UserService,private authGuard: AuthGuard ) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		
		
	}

}