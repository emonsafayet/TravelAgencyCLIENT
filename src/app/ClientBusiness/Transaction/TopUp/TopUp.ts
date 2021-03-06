import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";
import { Library } from 'src/app/library/library';
import { Common } from "../../../library/common";
import { Config } from 'src/app/config';
//Service   
import { TransactionCommonService } from '../../../Services/TransactionCommon.service';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { TopUpModel, TopUpTypeModel } from '../../../Classes/Transaction/TopUpModel';

declare var moment: any;
@Component({
	templateUrl: 'TopUp.html'
})
export class TopUp implements OnInit {
	user: any;

	topUpList: any[] = [];
	topUpTypeList: any[] = [];
	providerList: any[] = [];
	airlineList: any[] = [];
	topUpObj: TopUpModel = new TopUpModel();
	topUpTypeObj: TopUpTypeModel = new TopUpTypeModel();
	SearchTopUpList: string = '';
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private transactionCommonService: TransactionCommonService, private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.topUpObj.TopUpDate = moment().format(Common.SQLDateFormat);
		this.getTopUpList();
		this.GetTopUpTypeList();
		this.GetProviderList();
		this.GetAirlineList();
		this.Notification.LoadingWithMessage('Loading...');
		this.Notification.LoadingRemove();
	}
	saveUpdateTopUp() {
		if (this.topUpObj.ID > 0)
			this.topUpObj.UpdatedBy = this.user.EmployeeCode;
		else this.topUpObj.CreatedBy = this.user.EmployeeCode;
		console.log(this.topUpObj);
		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.saveUpdateToUp(this.topUpObj).subscribe(
			(data) => this.SETToUp(data),
			(error) => this.Notification.Error(error)
		);
	}

	SETToUp(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Saved Successfully.');
		else {
			this.Notification.LoadingRemove();
		}
		this.topUpObj = new TopUpModel();
		this.getTopUpList();
	}
	validateModel() {
		;
		var result = true
		if (this.topUpObj.TopUpTypeCode == "0") {
			this.Notification.Warning('Please Select Top Up Type.');
			result = false;
			return;
		}
		if (this.topUpObj.ProviderID == "0") {
			this.Notification.Warning('Please Select Provider.');
			result = false;
			return;
		}
		return result;
	}
	ResetModel() {
		this.topUpObj = new TopUpModel();
		this.topUpObj.ProviderID = "0";
		this.topUpObj.TopUpTypeCode = "0";
		this.topUpObj.AirlinesID = "0";
	}

	EditItem(item) {
		this.topUpObj = JSON.parse(JSON.stringify(item));
		this.topUpObj.TopUpDate = moment(new Date(this.topUpObj.TopUpDate)).format(Common.SQLDateFormat);
	}
	getTopUpList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GetTopUpList()
			.subscribe(
				data => this.setCardTypeList(data),
				error => this.Notification.Error(error)
			);
	}
	setCardTypeList(data) {
		this.topUpList = data;
		this.Notification.LoadingRemove();
	}


	GetTopUpTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GetTopUpTypeList()
			.subscribe(
				data => this.setTopUpTypeList(data),
				error => this.Notification.Error(error)
			);
	}
	setTopUpTypeList(data) {
		this.topUpTypeList = data;
		this.Notification.LoadingRemove();
	}
	GetProviderList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getProviderList()
			.subscribe(
				data => this.setProviderList(data),
				error => this.Notification.Error(error)
			);
	}
	setProviderList(data) {
		this.providerList = data;
		this.Notification.LoadingRemove();
	}
	GetAirlineList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getAirlineList()
			.subscribe(
				data => this.setAirlineList(data),
				error => this.Notification.Error(error)
			);
	}
	setAirlineList(data) {
		this.airlineList = data;
		this.Notification.LoadingRemove();
	}

	// ----------------Top Up Type -------------------------
	saveUpdateTopUpType() {
		if (this.topUpTypeObj.ID > 0)
			this.topUpTypeObj.UpdatedBy = this.user.EmployeeCode;
		else this.topUpTypeObj.CreatedBy = this.user.EmployeeCode; 
		//validation
		if (!this.validateTopUpTypeModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.saveUpdateTopUpType(this.topUpTypeObj).subscribe(
			(data) => this.SETToUpType(data),
			(error) => this.Notification.Error(error)
		);

	}
	SETToUpType(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Saved Successfully.');
		else {
			this.Notification.LoadingRemove();
		}
		this.ResetTopUpTypeModel();
		this.GetTopUpTypeList();
	}
	validateTopUpTypeModel() { 
		var result = true
		if (Library.isNullOrEmpty(this.topUpTypeObj.TopUpTypeName)) {
			this.Notification.Warning('Please Enter Top Up Type Name.');
			result = false;
			return;
		} 
		return result;
	}
	ResetTopUpTypeModel() {
		this.topUpTypeObj = new TopUpTypeModel();
	}
	EditTopUpType(item) {
		this.topUpTypeObj = JSON.parse(JSON.stringify(item));
		 
	}
	Print(obj){
		var topUpCode = obj.TopUpCode; 
		window.open(`${Config.getBaseUrl}TransactionReport/TopUpDetail?topUpCode=${topUpCode}`, "_blank");
	}
}