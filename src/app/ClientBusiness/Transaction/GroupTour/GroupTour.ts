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
import {
	GroupTourMasterDTO, GroupTourCustomerDTO, GroupTourMemberDTO,
	GroupTourVisaDTO, GroupTourAirticketDTO, GroupTourHotelBookingDTO, GroupTourTotalPackage
} from '../../../Classes/Transaction/GroupTourModel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

declare var moment: any;
@Component({
	templateUrl: 'GroupTour.html'
})
export class GroupTour implements OnInit {
	user: any;
	countryList: any[] = [];
	customerList: any[] = [];
	travelProviderList: any[] = [];
	airLineList: any[] = [];
	filtercustomerList: any[] = [];
	groupTourList: any[] = [];
	roomTypeList: any[] = [];

	groupTourMasterObj: GroupTourMasterDTO = new GroupTourMasterDTO();
	groupTourCustomerObj: GroupTourCustomerDTO[] = [];
	groupTourParticipentObj: GroupTourMemberDTO[] = [];
	groupTourVisaObj: GroupTourVisaDTO[] = [];
	groupTourAirticketObj: GroupTourAirticketDTO[] = [];
	groupTourHotelBookingObj: GroupTourHotelBookingDTO[] = [];
	groupTourTotalPackageObj: GroupTourTotalPackage[] = [];

	showEvent: boolean = false;
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
	removeCustomerDetails(index: number) {
		this.groupTourCustomerObj.splice(index, 1);
		this.filterCustomers();
	}
	//Participent
	setNewParticipentDetails() {
		this.groupTourParticipentObj = [];
		this.addNewColumnForParticipentDetail();
	}
	addParticipentDetailsNew(value, event) {
		this.filterCustomers();
		this.addNewColumnForParticipentDetail();
		setTimeout(() => this.selectNext(value, event), 500)
	}
	addNewColumnForParticipentDetail() {
		var details = new GroupTourMemberDTO();
		this.groupTourParticipentObj.push(details);
	}
	removeparticipentDetails(index: number) {
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
		this.countryList = data;
		this.Notification.LoadingRemove();
	}
	setCustomerLIST(data) {
		this.customerList = data;
		this.Notification.LoadingRemove();
	}

	filterCustomers() {
		const first = this.customerList;
		const second = this.groupTourCustomerObj;
		this.filtercustomerList = first.filter(x => second.map(y => y.CustomerCode).includes(x.CustomerCode));

	}

	// Tour Event Break Down
	onCustomerChange(obj) {
		this.filterCustomers();
	}
	//Start visa Details
	setNewVisaDetails() {
		this.groupTourVisaObj = [];
		this.addNewColumnForVisaDetail();
	}
	addNewColumnForVisaDetail() {
		var details = new GroupTourVisaDTO();
		this.groupTourVisaObj.push(details);
	}
	addVisaDetailsNew(value, event) {
		this.addNewColumnForVisaDetail();
		setTimeout(() => this.selectNext(value, event), 500)
	}
	removeVisaDetails(index: number){
		this.groupTourVisaObj.splice(index, 1);
	}
	//End Visa End

	//Start Airticket Details
	setNewAirticketDetails() {
		this.groupTourAirticketObj = [];
		this.addNewColumnForAirticketDetail();
	}
	addNewColumnForAirticketDetail() {
		var details = new GroupTourAirticketDTO();
		this.groupTourAirticketObj.push(details);
	}
	addAirticketDetailsNew(value, event) {
		this.addNewColumnForAirticketDetail();
		setTimeout(() => this.selectNext(value, event), 500)
	}
	removeAirticketDetails(index: number){
		this.groupTourAirticketObj.splice(index, 1);
	}
	//End Airticket 

	//Start Hotel Booking
	setNewHotelBookingDetails() {
		this.groupTourHotelBookingObj = [];
		this.addNewColumnForHotelBookingDetail();
	}
	addNewColumnForHotelBookingDetail() {
		var details = new GroupTourHotelBookingDTO();
		this.groupTourHotelBookingObj.push(details);
	}
	addhotelBookingDetailsNew(value, event) {
		this.addNewColumnForHotelBookingDetail();
		setTimeout(() => this.selectNext(value, event), 500)
	}
	removeHotelBoolingDetails(index: number){
		this.groupTourHotelBookingObj.splice(index, 1);
	}
	//End Hotel Booling

	//Start Total Tour Package
	setNewTourPackageDetails() {
		this.groupTourTotalPackageObj = [];
		this.addNewColumnForTourPakageDetail();
	}
	addNewColumnForTourPakageDetail() {
		var details = new GroupTourTotalPackage();
		this.groupTourTotalPackageObj.push(details);
	}
	addTourPackageDetailsNew(value, event) {
		this.addNewColumnForTourPakageDetail();
		setTimeout(() => this.selectNext(value, event), 500)
	}
	removeTourPackageDetails(index: number){
		this.groupTourTotalPackageObj.splice(index, 1);
	}
	//End Total Tour Package

	addEventNew() {
		this.showEvent = true;
		this.LoadDropDown();
		this.filterCustomers();
		this.showEventItemList();
	}
	showEventItemList() {
		this.setNewVisaDetails();
		this.setNewAirticketDetails();
		this.setNewHotelBookingDetails();
		this.setNewTourPackageDetails();
	}
	LoadDropDown() {
		this.getCountryList();
		this.GetTravelProviderList();
		this.GetAirLineList();
		this.getRoomTypeList();

	}
	//Start Event Details Drop Down
	GetTravelProviderList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getProviderList()
			.subscribe(
				data => this.setTravelProviderList(data),
				error => this.Notification.Error(error)
			);
	}
	setTravelProviderList(data) {
		this.travelProviderList = data;
		this.Notification.LoadingRemove();

	}
	GetAirLineList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getAirlineList()
			.subscribe(
				data => this.setAirLineList(data),
				error => this.Notification.Error(error)
			);
	}
	setAirLineList(data) {
		this.airLineList = data;
		this.Notification.LoadingRemove();

	}
	getRoomTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.GETHotelRoomTypeLIST()
			.subscribe(
				data => this.setRoomTypeList(data),
				(error) => this.showError(error)
			);
	}
	setRoomTypeList(data) {
		this.roomTypeList = data;
		this.Notification.LoadingRemove();
	}
	//End Event Details Drop Down
	
	showError(error) {
		this.Notification.Error(error);
		this.Notification.LoadingRemove();
	}
	isNumberKey(evt) {
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode != 46 && charCode > 31
			&& (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	}
}