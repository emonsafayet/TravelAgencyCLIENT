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
	templateUrl: 'CollectionReport.html'
})
export class CollectionReport implements OnInit {
	user: any; 
	ReportModelObj: ReportModel = new ReportModel();
	ServiceTransactionCollectionListObj:any[]=[];
	ServiceTransactionCollectionDetailListObj:any[]=[];
	serviceName:string="";
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService,
		private transactionCommonService: TransactionCommonService, private rptService: RptService) { }

	ngOnInit() {
		this.ReportModelObj.FromDate = moment().format(Common.previousMonthFirstDay(this.ReportModelObj.ToDate));		
		this.ReportModelObj.ToDate = moment().format(Common.SQLDateFormat);
		this.getServiceTransactionCollectionList();
	}
	LoadRptService(){
		this.ServiceTransactionCollectionDetailListObj=[];
		this.getServiceTransactionCollectionList();
	}
	getServiceTransactionCollectionList(){
		this.Notification.LoadingWithMessage('Loading...');
		this.rptService.GetServiceTransactionCollectionSummaryList(this.ReportModelObj.FromDate,this.ReportModelObj.ToDate)
			.subscribe(
				data => this.setServiceTransactionCollectionList(data),
				error => this.Notification.Error(error)
			);
	}
	setServiceTransactionCollectionList(data) {
		this.ServiceTransactionCollectionListObj = data;
		this.Notification.LoadingRemove(); 
	}
	getServiceTransactionCollectionDetail(obj){
		this.serviceName="";
		this.ServiceTransactionCollectionDetailListObj=[];
		this.serviceName = obj.ServiceName; 
		this.Notification.LoadingWithMessage('Loading...');
		this.rptService.GetTransactionCollectionDetailsByServiceCode(this.ReportModelObj.FromDate,this.ReportModelObj.ToDate,obj.ServiceCode)
			.subscribe(
				data => this.setTransactionCollectionDetail(data),
				error => this.Notification.Error(error)
			);
	}
	setTransactionCollectionDetail(data){
		this.ServiceTransactionCollectionDetailListObj = data;
		this.Notification.LoadingRemove(); 
	}
}