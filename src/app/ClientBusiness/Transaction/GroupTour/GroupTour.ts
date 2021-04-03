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
import { GroupTourMasterDTO,GroupTourCustomerDTO,GroupTourMemberDTO } from '../../../Classes/Transaction/GroupTourModel';
import { library } from '@fortawesome/fontawesome-svg-core';

declare var moment: any;
@Component({
	templateUrl: 'GroupTour.html'
})
export class GroupTour implements OnInit {
	user: any;
	customerList: any[] = [];
	groupTourList: any[] = [];
	groupTourMasterObj: GroupTourMasterDTO = new GroupTourMasterDTO();
	groupTourCustomerObj: GroupTourCustomerDTO[] = [];
	groupTourParticipentObj: GroupTourMemberDTO[] = [];
	showEvent:boolean=false;
	salesStaffList: any[] = [];
	grouptourinfoList: any[] = [];
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.setNewCustomerDetails();
		//this.setNewParticipentDetails();
		this.groupTourMasterObj.TransactionDate = moment().format(Common.SQLDateFormat);
		this.GETSalesStaffLIST();
		this.GETCustomerLIST();
		this.Notification.LoadingRemove();
	}
	setNewCustomerDetails() {
		this.groupTourCustomerObj = []; 
		this.addNewColumnForCustomerDetail();
	}
	addNewColumnForCustomerDetail() {
		var details = new GroupTourCustomerDTO(); 
		this.groupTourCustomerObj.push(details);
	}
	addCustomerDetailsNew(value, event) {
		this.addNewColumnForCustomerDetail();
		setTimeout(() => this.selectNext(value, event), 500)
	} 
	removeCustomerDetails(index: number){
		this.groupTourCustomerObj.splice(index, 1);
	}
	//Participent
	setNewParticipentDetails() {
		this.groupTourParticipentObj = []; 
		this.addNewColumnForParticipentDetail();
	}
	addParticipentDetailsNew(value, event){
		this.addNewColumnForParticipentDetail();
		setTimeout(() => this.selectNext(value, event), 500)
	}
	addNewColumnForParticipentDetail() {
		var details = new GroupTourMemberDTO(); 
		this.groupTourParticipentObj.push(details);
	}
	removeparticipentDetails(index: number){
		this.groupTourParticipentObj.splice(index, 1);
	}
	selectNext(key, e): void {
		if (key == 'enter') {
			var elem = e.target.parentNode.parentNode.nextSibling;
			//Check IS Real Number	
			if (!Library.isNuLLorUndefined(elem)) {
				elem.firstChild.nextSibling.children[0].select();
				elem.firstChild.nextSibling.children[0].focus();
			}
		}
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
	GETCustomerLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getDropDownCustomerList()
			.subscribe(
				data => this.setCustomerLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setCustomerLIST(data) {
		this.customerList = data;
		this.Notification.LoadingRemove();

	}

	// Tour Event Break Down

	addEventNew(){
		this.showEvent=true;
	}
}