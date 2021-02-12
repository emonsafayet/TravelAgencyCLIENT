import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';
import { SettingService } from '../../../Services/Setting.service';

//classes
import { TravelProductModel } from '../../../Classes/ClientBusiness/TravelProductModel';


@Component({
	templateUrl: 'TravelProduct.html'
})
export class TravelProduct implements OnInit {
	user: any;
	travelProductList: any[] = [];
	tableNameList: any[] = [];
	travelProductObj: TravelProductModel = new TravelProductModel();
	SearchtravelProductList: string = '';
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService,private settingService:SettingService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.getTableList();
		this.getTravelProductList();
		this.Notification.LoadingRemove();

	}
	saveService() {
		if (this.travelProductObj.ID > 0) this.travelProductObj.UpdatedBy = this.user.EmployeeCode;
		else this.travelProductObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');

		this.clientBusinessService.saveUpdateTravelProduct(this.travelProductObj)
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

		this.travelProductObj = new TravelProductModel();
		this.getTravelProductList();
	}
	EditItem(item) {
		this.travelProductObj = JSON.parse(JSON.stringify(item));
	}
	ResetModel() {
		this.travelProductObj = new TravelProductModel();
	}

	//get travel Product List
	getTravelProductList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getTravelProductServiceList()
			.subscribe(
				data => this.setTravelProductList(data),
				error => this.Notification.Error(error)
			);
	}

	setTravelProductList(data) {
		this.travelProductList = data;
		this.Notification.LoadingRemove();
	}

	validateModel() {
		var result = true;

		if (Library.isNullOrEmpty(this.travelProductObj.ServiceName)) {
			this.Notification.Warning('Please Enter Service Name.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.travelProductObj.ServiceCharge_Percent)) {
			this.Notification.Warning('Please Enter Service Charge AS Percentage.');
			result = false;
			return;
		}

		return result;
	}
	getTableList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.settingService.getSignatureList()
			.subscribe(
				data => this.setTableNameList(data),
				error => this.Notification.Error(error)
			);
	}

	setTableNameList(data) {  	
		this.tableNameList = data; 
		this.tableNameList=this.tableNameList.filter(p => p.TableType =="Transaction"); 
		this.Notification.LoadingRemove();
	}
}