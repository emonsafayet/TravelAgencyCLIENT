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
	templateUrl: 'DueReport.html'
})
export class DueReport implements OnInit {
	user: any;
	ReportModelObj: ReportModel = new ReportModel();
	ServiceTransactionDueListObj: any[] = [];
	ServiceTransactionDueDetailsListObj: any[] = [];
	serviceName : string="";
	sumOfTotalDueAmounteValue:number=0;
	sumOfTotalPaidAmountValue:number=0;
	sumOfTotalInvoiceAmountValue:number=0;
	sumOfTotalDetailsInvoiceAmountValue:number=0;
	sumOfTotalDetailsDueAmounteValue:number=0;
	sumOfTotalDetailsPaidAmountValue:number=0;
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService,
		private transactionCommonService: TransactionCommonService, private rptService: RptService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.Notification.LoadingWithMessage('Loading...');
		this.ReportModelObj.FromDate = moment().format(Common.SQLDateFormat); 
		this.getServiceTransactionDueList();
		
		this.Notification.LoadingRemove();
	}
	LoadRptServiceDue(){
		this.ServiceTransactionDueDetailsListObj=[];
		this.getServiceTransactionDueList();
	}
	getServiceTransactionDueList() {
		this.Notification.LoadingWithMessage('Loading...');
		setTimeout(() => {
			this.rptService.GetServiceTransactionDueCollectionList(this.ReportModelObj.FromDate)
			.subscribe(
				data => this.setServiceTransactionDueList(data),
				error => this.Notification.Error(error)
			);
		}, 300);
		
	}
	setServiceTransactionDueList(data) {
		this.ServiceTransactionDueListObj = data;
		this.sumOfTotalInvoiceAmountValue = Common.calculateTotal(data, "InvoiceAmount");
		this.sumOfTotalPaidAmountValue = Common.calculateTotal(data, "PaidAmount");
	    this.sumOfTotalDueAmounteValue = Common.calculateTotal(data, "DueAmount");
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
	   this.sumOfTotalDetailsInvoiceAmountValue = Common.calculateTotal(data, "InvoiceAmount");
	   this.sumOfTotalDetailsPaidAmountValue = Common.calculateTotal(data, "PaidAmount");
	   this.sumOfTotalDetailsDueAmounteValue = Common.calculateTotal(data, "DueAmount");
	   this.Notification.LoadingRemove(); 
   }
   PrintDue(obj){
	window.open(`${Config.getBaseUrl}TransactionReport/GetDueStatusASONDetails?ServiceCode=${obj.ServiceCode}&FromDate=${this.ReportModelObj.FromDate}`, "_blank");  

   }

}