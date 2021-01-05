import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { CountryModel  } from '../../../Classes/ClientBusiness/CountryModel';


@Component({
	templateUrl: 'Country.html'
})
export class Country implements OnInit {
	user: any;

	travelCountryList: any[] = [];
	travelCountryObj: CountryModel = new CountryModel();
	SearchtravelCountryList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService,private clientBusinessService: ClientBusinessService) { }

	ngOnInit() {

		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.getCountryList();
		this.Notification.LoadingRemove();
	}

	saveCountry(){
		if (this.travelCountryObj.ID > 0) this.travelCountryObj.UpdatedBy = this.user.EmployeeCode;
		else this.travelCountryObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');

		this.clientBusinessService.saveUpdateTravelcountry(this.travelCountryObj)
			.subscribe(
				data => this.setaveResult(data),
				error => this.Notification.Error(error)
			);
	}
	setaveResult(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Saved Successfully.');
		else {
			this.Notification.Failure('Unable to save data.');
			console.log(Data)
		}

		this.travelCountryObj = new CountryModel();
		this.getCountryList();
	}
	EditItem(item) {
		this.travelCountryObj = JSON.parse(JSON.stringify(item));
	}

	//get travel Product List
	getCountryList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getTravelcountryList()
			.subscribe(
				data => this.setCountryList(data),
				error => this.Notification.Error(error)
			);
	}
	setCountryList(data) {
		this.travelCountryList = data;
		this.Notification.LoadingRemove();
	}
	ResetModel(){
		this.travelCountryObj = new CountryModel();
	}

	
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.travelCountryObj.CountryName)) {
			this.Notification.Warning('Please Enter Country Name.');
			result = false;
			return;
		}
		return result;
	}


}