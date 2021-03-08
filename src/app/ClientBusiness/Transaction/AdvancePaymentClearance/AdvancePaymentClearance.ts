import { Component, OnInit } from '@angular/core'; 
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service"; 
import { Library } from 'src/app/library/library';
import { Common } from "../../../library/common";
//Service   
import { TransactionCommonService } from '../../../Services/TransactionCommon.service'; 

// classess
import { AdvPaymentClearance } from '../../../Classes/Transaction/AdvPaymentClearance';
declare var moment: any;
@Component({
	templateUrl: 'AdvancePaymentClearance.html'
})
export class AdvancePaymentClearance implements OnInit {
	user: any;
	advancePaymentClearanceList: AdvPaymentClearance[] = [];
	searchList: string = '';
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private transactionCommonService: TransactionCommonService) { } 


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.GetadvancePaymentClearanceList();
		this.Notification.LoadingWithMessage('Loading...');
		this.Notification.LoadingRemove();
	}
	GetadvancePaymentClearanceList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.getAdvancePaymentNotClearanceList()
			.subscribe(
				data => this.setadvancePaymentClearanceList(data),
				error => this.Notification.Error(error)
			);
	}
	setadvancePaymentClearanceList(data) {
		for(var i of data)  i.ClearingDate =  moment().format(Common.SQLDateFormat);	 
		
		this.advancePaymentClearanceList = data;
		this.Notification.LoadingRemove();
	}
	Update(obj) {
		console.log(obj);
		if(obj.isClear ==true)
		{ 
			this.transactionCommonService.updateadvanceClearance(obj)
			.subscribe(
				data => this.setupdateadvanceClearance(data),
				error => this.Notification.Error(error)
			);
		}
	}
	setupdateadvanceClearance(data) {
		this.GetadvancePaymentClearanceList();
		this.Notification.LoadingRemove();
	}

}