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
import { RoomTypeModel } from '../../../Classes/ClientBusiness/RoomTypeModel';
@Component({
	templateUrl: 'typeRoom.html'
})
export class TypeRoom implements OnInit {
	user: any;
	roomTypeList: [] = [];
	roomTypObj: RoomTypeModel = new RoomTypeModel();
	SearchRoomTypeList: string = "";
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.getRoomTypeList();
		this.Notification.LoadingWithMessage('Loading...');
		this.Notification.LoadingRemove();
	}
	getRoomTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.GETHotelRoomTypeLIST()
			.subscribe(
				data => this.setRoomTypeLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setRoomTypeLIST(data) {
		this.roomTypeList = data;
		this.Notification.LoadingRemove();
	}
	saveRoomType() {
		if (this.roomTypObj.ID > 0)
			this.roomTypObj.UpdatedBy = this.user.EmployeeCode;
		else this.roomTypObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.SaveUpdateHotelRoomType(this.roomTypObj).subscribe(
			(data) => this.SetsaveUpdate(data),
			(error) => this.Notification.Error(error)
		);
	}
	SetsaveUpdate(Data) {
		if (Data.ID > 0) this.Notification.Success('Hotel Type Successfully.');
		this.Notification.LoadingRemove();
		this.ResetModel()
		this.getRoomTypeList();
	}
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.roomTypObj.RoomTypeName)) {
			this.Notification.Warning('Please Enter Room Type Name.');
			result = false;
			return;
		}
		return result;
	}
	ResetModel() {
		this.roomTypObj = new RoomTypeModel();
	}
	EditItem(item) {
		this.roomTypObj = JSON.parse(JSON.stringify(item));
	}
}