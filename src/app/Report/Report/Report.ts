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
	providerList: any[] = [];
	showCardList: boolean = false;
	showCustomerList: boolean = false;
	showProvierList: boolean = false;
	showFromDate: boolean = false;
	showToDate: boolean = false;
	showAsOnDate: boolean = false;


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
		debugger
		this.hideAll();
		if (obj == "Card Statement") {
			this.GETCardLIST();
			this.showCardList = true;
			this.showFromDate = true;
			this.showToDate = true;
		}
		else if (obj == "Customer Due") {
			this.GETCustomerLIST();
			this.showCustomerList = true;
			this.showAsOnDate = true;
		}
		else if (obj == "Cutomser Statement") {
			this.GETCustomerLIST();
			this.showCustomerList = true; 
		}
		else if (obj == "Provider Statement") {
			this.GETProvierLIST();
			this.showProvierList = true;
			this.showFromDate = true;
			this.showToDate = true;
		}

	}
	hideAll() {
		//clear   list
		this.cardList = [];
		this.customerList = [];
		this.providerList = [];

		//hide 
		this.showCustomerList = false;
		this.showProvierList = false;
		this.showCardList = false;
		this.showFromDate = false;
		this.showToDate = false;
		this.showAsOnDate = false;
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
	GETProvierLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getProviderList()
			.subscribe(
				data => this.setProviderList(data),
				(error) => this.showError(error)
			);
	}
	setProviderList(data) {
		this.providerList = data;
		this.Notification.LoadingRemove();

	}
	GETCustomerLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.getReportCustomerList()
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
		debugger
		// validation
		if (!this.validateModel()) return;
		var objstr = Library.encode(obj);
		// window.open(`${Config.getBaseUrl}TransactionReport/StatementReport?ReportName=${obj.ReportName}&FromDate=${obj.FromDate}&ToDate=${obj.ToDate}&Code=${obj.Code}`, "_blank");
		window.open(`${Config.getBaseUrl}TransactionReport/StatementReport?objstr=${objstr}`, "_blank");



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
	showError(error) {
		this.Notification.Error(error);
		this.Notification.LoadingRemove();
	}

}