import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { CustomerTypeModel   } from '../../../Classes/ClientBusiness/CustomerTypeModel';

@Component({
	templateUrl: 'CutomerType.html'
})
export class CutomerType implements OnInit {
	user: any;

	customerTypeList: any[] = [];
	customerTypeObj: CustomerTypeModel = new CustomerTypeModel();
	SearchCustomerTypeList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService,private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		//  ----------------------
		this.Notification.LoadingRemove();
	}
	saveCustomerType(){

	}
	ResetModel(){
		this.customerTypeObj = new CustomerTypeModel();
	}

}