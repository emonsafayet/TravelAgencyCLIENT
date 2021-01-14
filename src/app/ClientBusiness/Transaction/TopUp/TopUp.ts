import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service   
import {  TransactionCommonService } from '../../../Services/TransactionCommon.service';
import {  ClientBusinessService  } from '../../../Services/ClientBusiness.service';

// classess
import {  TopUpModel } from '../../../Classes/Transaction/TopUpModel';
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
	SearchCardTypeList: string = '';
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private transactionCommonService: TransactionCommonService,private clientBusinessService:ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user); 

		this.getTopUpList();
		this.GetTopUpTypeList();
		this.GetProviderList();
		this.GetAirlineList();
		this.Notification.LoadingWithMessage('Loading...');
		this.Notification.LoadingRemove();
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

}