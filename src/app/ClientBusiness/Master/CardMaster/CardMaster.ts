import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';
import { Common } from "../../../library/common";
//Classes
import { CardMasterModel } from '../../../Classes/ClientBusiness/CardMasterModel';

//
declare var moment: any;

@Component({
	templateUrl: 'CardMaster.html'
})
export class CardMaster implements OnInit {
	user: any;

	cardList: any[] = [];
	cardTypeList: any[] = [];
	currencyList: any[] = [];
	cardObj: CardMasterModel = new CardMasterModel();
	SearchCardList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.cardObj.CardType = "0";
		this.cardObj.Currency = "0";
		
		this.cardObj.ExpireDate = moment().format(Common.SQLDateFormat); 
		this.getCardinfosList();
		this.getCardTypeList();
		this.getCurrencyList();
		
		this.Notification.LoadingRemove();
	}

	saveCard(){
		if (this.cardObj.ID > 0)
			this.cardObj.UpdatedBy = this.user.EmployeeCode;
		else this.cardObj.CreatedBy = this.user.EmployeeCode;
		console.log(this.cardObj);
		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.saveUpdateCard(this.cardObj).subscribe(
			(data) => this.SetsaveUpdateCard(data),
			(error) => this.Notification.Error(error)
		);
	}

	SetsaveUpdateCard(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Employee Saved Successfully.');
		else {
			this.Notification.LoadingRemove(); 
		}
		this.cardObj = new CardMasterModel();
		this.getCardinfosList();
	}

	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.cardObj.CardName)) {
			this.Notification.Warning('Please Enter card Name.');
			result = false;
			return;
		}
		return result;
	}

	ResetModel() {
		this.cardObj = new CardMasterModel();
		this.cardObj.CardType = "0";
	}

	EditItem(item) {
		this.cardObj = JSON.parse(JSON.stringify(item)); 
	}

	//get Card List
	getCardinfosList() {
		debugger
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getcardList()
			.subscribe(
				data => this.setCardList(data),
				error => this.Notification.Error(error)
			);
	}

	setCardList(data) {
		this.cardList = data;
		this.Notification.LoadingRemove();
	}

	//get Card TYPE List
	getCardTypeList() {
		debugger
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getCardTypeList()
			.subscribe(
				data => this.setCardTypeList(data),
				error => this.Notification.Error(error)
			);
	}

	setCardTypeList(data) {
		debugger
		this.cardTypeList = data;
		this.Notification.LoadingRemove();
		console.log(this.cardTypeList);
	}

	//get Currency List
	getCurrencyList() {
		debugger
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getCurrencyList()
			.subscribe(
				data => this.setCurrencyList(data),
				error => this.Notification.Error(error)
			);
	}

	setCurrencyList(data) {
		debugger
		this.currencyList = data;
		this.Notification.LoadingRemove();
		console.log(this.currencyList);
	}

}