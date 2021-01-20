import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';
import { TransactionCommonService } from '../../../Services/TransactionCommon.service';
import { Common } from "../../../library/common";

//Classes
import {AirTicketRegModel } from '../../../Classes/Transaction/AirTicketRegModel';
import { library } from '@fortawesome/fontawesome-svg-core';
//
declare var moment: any;
@Component({
	templateUrl: 'AirTicketRegistration.html'
})
export class AirTicketRegistration implements OnInit {
	user: any; 
	airTicketregistaionList: any[] = [];
	customerList: any[] = [];
	companyList: any[] = [];
	currencyList: any[] = [];
	salesStaffList: any[] = [];
	activeCurrencyRateList: any[] = [];
	cardList: any[] = [];
	seatTypeList: any[] = [];
	airLineList: any[] = [];
	travelTypeList: any[] = [];
	travelProviderList: any[] = []; 
	airTicketregObj: AirTicketRegModel = new AirTicketRegModel();
	SearchAirTicketRegList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }

		
	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.GETCustomerLIST();
		this.GETCompanyLIST();
		this.GETCurrencyList();
		this.GETSalesStaffLIST();
		this.GETCardLIST();
		this.GetSeatTypeList();
		this.GetAirLineList();
		this.GetTravelTypeList();
		this.GetTravelProviderList(); 

		this.airTicketregObj.TravelDate = moment().format(Common.SQLDateFormat);
		this.airTicketregObj.ReturnDate = moment().format(Common.SQLDateFormat);
		this.airTicketregObj.ChangeDate = moment().format(Common.SQLDateFormat);
		
		this.Notification.LoadingRemove();

	}

	saveAirTicketReg(){

	}
	ResetModel(){
		
	}

		//DROP DOWN 
		GetTravelProviderList() {
			this.Notification.LoadingWithMessage('Loading...');
			this.clientBusinessService.getProviderList()
				.subscribe(
					data => this.setTravelProviderList(data),
					error => this.Notification.Error(error)
				);
		}
		setTravelProviderList(data) {
			this.travelProviderList = data;
			this.Notification.LoadingRemove();
	
		}
		GetTravelTypeList() {
			this.Notification.LoadingWithMessage('Loading...');
			this.clientBusinessService.getAirlineList()
				.subscribe(
					data => this.setTravelTypeList(data),
					error => this.Notification.Error(error)
				);
		}
		setTravelTypeList(data) {
			this.travelTypeList = data;
			this.Notification.LoadingRemove();
	
		}
		GetAirLineList() {
			this.Notification.LoadingWithMessage('Loading...');
			this.clientBusinessService.getAirlineList()
				.subscribe(
					data => this.setAirLineList(data),
					error => this.Notification.Error(error)
				);
		}
		setAirLineList(data) {
			this.airLineList = data;
			this.Notification.LoadingRemove();
	
		}
		GetSeatTypeList() {
			this.Notification.LoadingWithMessage('Loading...');
			this.transactionCommonService.GETSeatTypeLIST()
				.subscribe(
					data => this.setSeatTypeList(data),
					error => this.Notification.Error(error)
				);
		}
		setSeatTypeList(data) {
			this.seatTypeList = data;
			this.Notification.LoadingRemove();
	
		}
		GETCompanyLIST() {
			this.Notification.LoadingWithMessage('Loading...');
			this.transactionCommonService.GETCompanyLIST()
				.subscribe(
					data => this.setCompanyLIST(data),
					error => this.Notification.Error(error)
				);
		}
		setCompanyLIST(data) {
			this.companyList = data;
			this.Notification.LoadingRemove();
	
		}
		GETCustomerLIST() {
			this.Notification.LoadingWithMessage('Loading...');
			this.clientBusinessService.getcustomerList()
				.subscribe(
					data => this.setCustomerLIST(data),
					error => this.Notification.Error(error)
				);
		}
		setCustomerLIST(data) {
			this.customerList = data;
			this.Notification.LoadingRemove();
	
		}
		GETCurrencyList() {
			this.Notification.LoadingWithMessage('Loading...');
			this.clientBusinessService.getCurrencyList()
				.subscribe(
					data => this.setCurrencyList(data),
					error => this.Notification.Error(error)
				);
		}
		setCurrencyList(data) {
			this.currencyList = data;
			this.Notification.LoadingRemove();
	
		}
		GETSalesStaffLIST() {
			this.Notification.LoadingWithMessage('Loading...');
			this.transactionCommonService.GETSalesStaffLIST()
				.subscribe(
					data => this.setSalesStaffLIST(data),
					error => this.Notification.Error(error)
				);
		}
		setSalesStaffLIST(data) {
			this.salesStaffList = data;
			this.Notification.LoadingRemove();
	
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
		GETActiveCurrencyRateLIST() {
			this.Notification.LoadingWithMessage('Loading...');
			this.transactionCommonService.GETActiveCurrencyRateLIST()
				.subscribe(
					data => this.setActiveCurrencyRateList(data),
					error => this.Notification.Error(error)
				);
		}
		setActiveCurrencyRateList(data) {
			this.activeCurrencyRateList = data;
			this.Notification.LoadingRemove();
	
		}
	

}