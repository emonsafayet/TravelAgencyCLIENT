import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { AirLineModel } from '../../../Classes/ClientBusiness/AirLineModel';
@Component({
	templateUrl: 'Airline.html'
})
export class Airline implements OnInit {
	user: any;

	airlineList: any[] = [];
	airlineObj: AirLineModel = new AirLineModel();
	SearchAirlineList: string = '';


	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.getAirlineList();
		this.Notification.LoadingRemove();

	}
	saveAirline() {
		if (this.airlineObj.ID > 0) this.airlineObj.UpdatedBy = this.user.EmployeeCode;
		else this.airlineObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');

		this.clientBusinessService.saveUpdateAirline(this.airlineObj)
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

		this.airlineObj = new AirLineModel();
		this.getAirlineList();
	}
	EditItem(item) {
		this.airlineObj = JSON.parse(JSON.stringify(item));
	}
	//get travel airline List
	getAirlineList() {
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

	ResetModel() {
		this.airlineObj = new AirLineModel();
	}
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.airlineObj.AirlinesName)) {
			this.Notification.Warning('Please Enter Airline Name.');
			result = false;
			return;
		}
		return result;
	}

}

