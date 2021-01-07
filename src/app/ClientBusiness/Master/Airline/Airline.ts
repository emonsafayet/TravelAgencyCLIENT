import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { AirLineModel   } from '../../../Classes/ClientBusiness/AirLineModel';
@Component({
	templateUrl: 'Airline.html'
})
export class Airline implements OnInit {
	user: any;

	airlineList: any[] = [];
	airlineObj: AirLineModel = new AirLineModel();
	SearchAirlineList: string = '';


	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService,private clientBusinessService: ClientBusinessService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		//  ---
		this.Notification.LoadingRemove();

	}
	saveAirline(){

	}
	ResetModel(){
		this.airlineObj = new AirLineModel();
	}

}

