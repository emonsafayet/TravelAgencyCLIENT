import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../authGuard.guard';
import { UserService } from '../../Services/User.service';
import { NotificationService } from "../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../Services/ClientBusiness.service';
import { TransactionCommonService } from '../../Services/TransactionCommon.service';
import { Common } from "../../library/common";

declare var $: any;


@Component({
	templateUrl: 'Dashboard.html'
})
export class Dashboard implements OnInit {

	user :any ;
	activeCurrencyRateList:any[]=[];
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.Notification.LoadingWithMessage('Loading...');
		this.GETActiveCurrencyRateLIST();
		this.Notification.LoadingRemove();

	}

	GETActiveCurrencyRateLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GETActiveCurrencyRateLIST()
			.subscribe(
				data => this.setActiveCurrencyRateLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setActiveCurrencyRateLIST(data) { 
		this.activeCurrencyRateList = data;
		this.Notification.LoadingRemove();

	}

	 
}