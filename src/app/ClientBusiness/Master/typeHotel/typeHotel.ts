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
import { HotelTypeModel } from '../../../Classes/ClientBusiness/HotelTypeModel';
@Component({
	templateUrl: 'typeHotel.html'
})
export class TypeHotel implements OnInit {
	user: any;
	hotelTypeList: [] = [];
	hotelTypObj: HotelTypeModel = new HotelTypeModel();
	SearchHotelTypeList: string = "";
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.getHotelTypeList();
		this.Notification.LoadingWithMessage('Loading...');
		this.Notification.LoadingRemove();
	}
	saveHotelType() {
		if (this.hotelTypObj.ID > 0)
			this.hotelTypObj.UpdatedBy = this.user.EmployeeCode;
		else this.hotelTypObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.SaveUpdateHotelType(this.hotelTypObj).subscribe(
			(data) => this.SetsaveUpdate(data),
			(error) => this.Notification.Error(error)
		);
	}
	SetsaveUpdate(Data) {
		if (Data.ID > 0) this.Notification.Success('Hotel Type Successfully.');
		this.Notification.LoadingRemove();
		this.ResetModel()
		this.getHotelTypeList();
	}
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.hotelTypObj.HotelTypeName)) {
			this.Notification.Warning('Please Enter Hotel Type Name.');
			result = false;
			return;
		}
		return result;
	}
	ResetModel() {
		this.hotelTypObj = new HotelTypeModel();
	}
	getHotelTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.GETHotelTypeLIST()
			.subscribe(
				data => this.setHotelTypeLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setHotelTypeLIST(data) {
		this.hotelTypeList = data;
		this.Notification.LoadingRemove();
	}
	EditItem(item) {
		this.hotelTypObj = JSON.parse(JSON.stringify(item));
	}
}