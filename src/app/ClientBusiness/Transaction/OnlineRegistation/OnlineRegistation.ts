import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';
import { TransactionCommonService } from '../../../Services/TransactionCommon.service';
import { Common } from "../../../library/common";
//Classes
import { OnlineRegistationModel } from '../../../Classes/ClientBusiness/OnlineRegistationModel';

//
declare var moment: any;
@Component({
	templateUrl: 'OnlineRegistation.html'
})
export class OnlineRegistation implements OnInit {
	user: any;

	registaionList: any[] = [];
	customerList: any[] = [];
	companyList: any[] = [];
	currencyList: any[] = [];
	regObj: OnlineRegistationModel = new OnlineRegistationModel();
	SearchRegList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		//this.regObj.RegistationDate = moment().format(Common.SQLDateFormat);
		this.getOnlineRegistation();
		this.Notification.LoadingRemove();
	}
	getOnlineRegistation() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GetOnlineRegisationList()
			.subscribe(
				data => this.setOnlineRegistation(data),
				error => this.Notification.Error(error)
			);
	}
	setOnlineRegistation(data) {
		debugger
		this.registaionList = data;
		this.Notification.LoadingRemove();
		
	}
	saveOnlineReg(){

	}
	ResetModel(){

	}
	EditItem(){
		
	}

}