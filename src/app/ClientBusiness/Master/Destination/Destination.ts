import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";
import { FormsModule } from '@angular/forms';

//Service  
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { DestinationModel } from '../../../Classes/ClientBusiness/DestinationModel';


@Component({
	templateUrl: 'Destination.html'
})
export class Destination implements OnInit {
	user: any;

	travelDestinationList: any[] = [];
	travelCountryList: any[] = [];

	destinationObj: DestinationModel = new DestinationModel();
	SearchtravelDestinationList: string = '';



	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.getDestinationList();
		this.getCountryList();

		this.destinationObj.CountryCode = "0";
		this.Notification.LoadingRemove();
	}

	saveDestination() {
		if (this.destinationObj.ID > 0) this.destinationObj.UpdatedBy = this.user.EmployeeCode;
		else this.destinationObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');

		this.clientBusinessService.saveUpdateTravelDestination(this.destinationObj)
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

		this.destinationObj = new DestinationModel();
		this.getDestinationList();
	}
	//get travel Destination List
	getDestinationList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getDestinationList()
			.subscribe(
				data => this.setDestinationList(data),
				error => this.Notification.Error(error)
			);
	}
	setDestinationList(data) {
		this.travelDestinationList = data;
		this.Notification.LoadingRemove();
	}
	EditItem(item) {
		this.destinationObj = JSON.parse(JSON.stringify(item));
	}
	ResetModel() {
		this.destinationObj = new DestinationModel();
	}

	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.destinationObj.DestinationName)) {
			this.Notification.Warning('Please Enter Destination Name.');
			result = false;
			return;
		}
		return result;
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
}