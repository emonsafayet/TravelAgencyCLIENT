import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { CardTypeModel } from '../../../Classes/ClientBusiness/CardTypeModel';

@Component({
	templateUrl: 'CardType.html'
})
export class CardType implements OnInit {
	user: any;
	cardTypeList: any[] = []; 
	cardTypeObj: CardTypeModel = new CardTypeModel();
	SearchCardTypeList: string = '';
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.getCardTypeList();
		this.Notification.LoadingWithMessage('Loading...');
		this.Notification.LoadingRemove();
		
	}
	 
	getCardTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getCardTypeList()
			.subscribe(
				data => this.setCardTypeList(data),
				error => this.Notification.Error(error)
			);
	}
	setCardTypeList(data) {
		this.cardTypeList = data;
		this.Notification.LoadingRemove();
	}
	ResetModel() {
		this.cardTypeObj = new CardTypeModel(); 
	}
	EditItem(item) {
		this.cardTypeObj = JSON.parse(JSON.stringify(item)); 
	}
	saveCardType() {
		if (this.cardTypeObj.ID > 0)
			this.cardTypeObj.UpdatedBy = this.user.EmployeeCode;
		else this.cardTypeObj.CreatedBy = this.user.EmployeeCode;
		 
		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.saveUpdateCardType(this.cardTypeObj).subscribe(
			(data) => this.SetUpdateCardType(data),
			(error) => this.Notification.Error(error)
		);
	}
	SetUpdateCardType(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Card Type Successfully.');
		else {
			this.Notification.LoadingRemove(); 
		}

		this.cardTypeObj = new CardTypeModel();
		this.getCardTypeList();
	}
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.cardTypeObj.CardTypeName)) {
			this.Notification.Warning('Please Enter Card Type Name.');
			result = false;
			return;
		}
		return result;
	}

}