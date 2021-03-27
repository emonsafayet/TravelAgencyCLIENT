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
import { Config } from 'src/app/config';
//Classes
import { ReportModel } from '../../Classes/Report/ReportModel';
declare var moment: any;
@Component({
	templateUrl: 'Report.html'
})
export class Report implements OnInit {
	user: any;
	ReportModelObj: ReportModel = new ReportModel();
	reportObj: any[] = [];
	cardList: any[] = [];
	customerList: any[] = [];
	showCardList: boolean = false;
	showCustomerList: boolean = false;


	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService, private rptService: RptService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.Notification.LoadingWithMessage('Loading...');
		this.ReportModelObj.FromDate = moment().format(Common.previousMonthFirstDay(this.ReportModelObj.ToDate));
		this.ReportModelObj.ToDate = moment().format(Common.SQLDateFormat);
		this.getReportList();
		this.Notification.LoadingRemove();
	}
	getReportList() {
		this.Notification.LoadingWithMessage('Loading...');
		setTimeout(() => {
			this.rptService.GetReportList()
				.subscribe(
					data => this.setReportList(data),
					error => this.Notification.Error(error)
				);
		}, 300);

	}
	setReportList(data) {
		this.reportObj = data;
		this.Notification.LoadingRemove();
	}
	onReportChange(obj) {
		this.hideAll();
		if (obj == "Card Statement") {
			this.GETCardLIST();
			this.showCardList = true;
		}
		else if (obj == "Customer Due") {
			this.GETCustomerLIST();
			this.showCustomerList = true;
		}

	}
	hideAll() {
		//clear   list
		this.cardList  = [];
		this.customerList  = [];

		//hide 
		this.showCustomerList = false;
		this.showCardList = false;
	}
	GETCardLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getcardList()
			.subscribe(
				data => this.setcardList(data),
				error => this.Notification.Error(error)
			);
	}
	setcardList(data) {
		this.cardList = data;
		this.Notification.LoadingRemove();

	}
	GETCustomerLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.getMRcustomerList()
			.subscribe(
				data => this.setCustomerLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setCustomerLIST(data) {
		this.customerList = data;
		this.Notification.LoadingRemove();

	}
	PrintReport(obj) {
		// validation
		if (!this.validateModel()) return; 
		window.open(`${Config.getBaseUrl}TransactionReport/StatementReport?ReportName=${obj.ReportName}&FromDate=${obj.FromDate}&ToDate=${obj.ToDate}&Code=${obj.Code}`, "_blank");


	}
	validateModel() {
		var result = true
		if (Library.isNuLLorUndefined(this.ReportModelObj.ReportName) || this.ReportModelObj.ReportName == "0") {
			this.Notification.Warning('Please Select Report Name.');
			result = false;
			return;
		}


		return result;
	}

}