import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { ProviderModel   } from '../../../Classes/ClientBusiness/ProviderModel';


@Component({
	templateUrl: 'Provider.html'
})
export class Provider implements OnInit {
	user: any;

	providerList: any[] = [];
	providerObj: ProviderModel = new ProviderModel();
	SearchProviderList: string = '';
	
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService,private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		// ---
		this.Notification.LoadingRemove();
	}

	saveProvider(){

	}

	ResetModel(){
		this.providerObj = new ProviderModel();
	}
}