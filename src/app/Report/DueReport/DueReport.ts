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
	templateUrl: 'DueReport.html'
})
export class DueReport implements OnInit {
	user: any;
	ReportModelObj: ReportModel = new ReportModel();
	ServiceTransactionDueListObj: any[] = [];
	ServiceTransactionDueDetailsListObj: any[] = [];
	serviceName : string="";
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService,
		private transactionCommonService: TransactionCommonService, private rptService: RptService) { }

	ngOnInit() {
		this.ReportModelObj.FromDate = moment().format(Common.previousMonthFirstDay(this.ReportModelObj.ToDate));
		this.ReportModelObj.ToDate = moment().format(Common.SQLDateFormat);
		this.getServiceTransactionDueList();
	}
	LoadRptServiceDue(){
		this.ServiceTransactionDueDetailsListObj=[];
		this.getServiceTransactionDueList();
	}
	getServiceTransactionDueList() {
		debugger
		this.Notification.LoadingWithMessage('Loading...');
		this.rptService.GetServiceTransactionDueCollectionList(this.ReportModelObj.FromDate)
			.subscribe(
				data => this.setServiceTransactionDueList(data),
				error => this.Notification.Error(error)
			);
	}
	setServiceTransactionDueList(data) {
		this.ServiceTransactionDueListObj = data;
		this.Notification.LoadingRemove(); 
	}

	getServiceTransactionDetail(obj) {
		this.serviceName="";
		this.ServiceTransactionDueDetailsListObj =[];
		this.serviceName = obj.ServiceName; 
	   this.Notification.LoadingWithMessage('Loading...');
	   this.rptService.getServiceTransactionDueCollectionDetail(this.ReportModelObj.FromDate,obj.ServiceCode)
		   .subscribe(
			   data => this.ServiceTransactionDetail(data),
			   error => this.Notification.Error(error)
		   );
   }
   ServiceTransactionDetail(data) {
	   this.ServiceTransactionDueDetailsListObj = data;
	   this.Notification.LoadingRemove(); 
   }

}