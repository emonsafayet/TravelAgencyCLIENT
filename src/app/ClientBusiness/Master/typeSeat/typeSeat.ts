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
import { SeatTypeModel } from '../../../Classes/ClientBusiness/SeatTypeModel';
@Component({
	templateUrl: 'typeSeat.html'
})
export class TypeSeat implements OnInit {
	user: any;
	seatTypeList: [] = [];
	seatTypObj: SeatTypeModel = new SeatTypeModel();
	SearchSeatTypeList: string = "";
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.getSeatTypeList();
		this.Notification.LoadingWithMessage('Loading...');
		this.Notification.LoadingRemove();
	} 
	getSeatTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.GETSeatTypeLIST()
			.subscribe(
				data => this.setSeatTypeLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setSeatTypeLIST(data) {
		this.seatTypeList = data;
		this.Notification.LoadingRemove();
	}
	saveSeatType() {
		if (this.seatTypObj.ID > 0)
			this.seatTypObj.UpdatedBy = this.user.EmployeeCode;
		else this.seatTypObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.saveOrUpdateSeatType(this.seatTypObj).subscribe(
			(data) => this.SetsaveUpdate(data),
			(error) => this.Notification.Error(error)
		);
	}
	SetsaveUpdate(Data) {
		if (Data.ID > 0) this.Notification.Success('Hotel Type Successfully.');
		this.Notification.LoadingRemove();
		this.ResetModel()
		this.getSeatTypeList();
	}
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.seatTypObj.SeatType1)) {
			this.Notification.Warning('Please Enter Seat Type Name.');
			result = false;
			return;
		}
		return result;
	}
	ResetModel() {
		this.seatTypObj = new SeatTypeModel();
	}
	EditItem(item) {
		this.seatTypObj = JSON.parse(JSON.stringify(item));
	}

}