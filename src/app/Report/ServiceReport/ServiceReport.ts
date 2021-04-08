import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../authGuard.guard';
import { UserService } from '../../Services/User.service';
import { NotificationService } from "../../Services/Notification.service";
import { Config } from 'src/app/config';
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
	ServiceTransactionDetailObj: any[] = [];
	serviceName : string="";
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
	getServiceTransactionDetail(obj) {
		 this.serviceName="";
		 this.ServiceTransactionDetailObj =[];
		 this.serviceName = obj.ServiceName; 
		this.Notification.LoadingWithMessage('Loading...');
		this.rptService.getServiceTransactionDetail(this.ReportModelObj.FromDate,this.ReportModelObj.ToDate,obj.ServiceCode)
			.subscribe(
				data => this.ServiceTransactionDetail(data),
				(error) => this.showError(error)
			);
	}
	ServiceTransactionDetail(data) {
		this.ServiceTransactionDetailObj = data;
		this.Notification.LoadingRemove(); 
	}
	LoadRptService(){
		this.ServiceTransactionDetailObj =[];
		this.getServiceTransactionList();
	}
	PrintSeriveDetailsByServiceCode(obj){ 
		window.open(`${Config.getBaseUrl}TransactionReport/GetSeriveDetails?ServiceCode=${obj.ServiceCode}&FromDate=${this.ReportModelObj.FromDate}&ToDate=${this.ReportModelObj.ToDate}`, "_blank"); 
	}
	showError(error) {
		this.Notification.Error(error);
		this.Notification.LoadingRemove();
	}
}