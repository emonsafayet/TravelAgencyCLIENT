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

import { RptService } from '../../Services/RptService';
import { Common } from "../../library/common";
//Classes
import { ReportModel } from '../../Classes/Report/ReportModel';
declare var moment: any;
@Component({
	templateUrl: 'ServiceReport.html'
})
export class ServiceReport implements OnInit {
	user: any;
	ReportModelObj: ReportModel = new ReportModel();
	ServiceTransactionListObj: any[] = [];
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService,
		private transactionCommonService: TransactionCommonService, private rptService: RptService) { }

	ngOnInit() {
		this.ReportModelObj.ToDate = moment().format(Common.SQLDateFormat);
		this.ReportModelObj.FromDate = moment().format(Common.previousMonthFirstDay(this.ReportModelObj.ToDate));
		
		this.getServiceTransactionList();
	}
	getServiceTransactionList() {

		this.Notification.LoadingWithMessage('Loading...');
		this.rptService.GetServiceTransactionSummaryList(this.ReportModelObj.FromDate,this.ReportModelObj.ToDate)
			.subscribe(
				data => this.setServiceTransactionList(data),
				error => this.Notification.Error(error)
			);
	}
	setServiceTransactionList(data) {
		this.ServiceTransactionListObj = data;
		this.Notification.LoadingRemove();
		console.log(this.ServiceTransactionListObj);
	}
	LoadRptService(){
		this.getServiceTransactionList();
	}

}