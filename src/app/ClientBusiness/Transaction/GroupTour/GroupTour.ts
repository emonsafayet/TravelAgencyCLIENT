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
	GroupTourMasterDTO, GroupTourCustomerDTO, GroupTourMemberDTO, GroupTourEventDetailDTO
} from '../../../Classes/Transaction/GroupTourModel';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Config } from 'src/app/config';

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
	serviceList: any[] = [];
	ParticipantList: any[] = [];

	sumTotalDetailsAmt: any = 0;
	sumofTotalCustomerNetPayableAmount: any = 0;

	groupTourMasterObj: GroupTourMasterDTO = new GroupTourMasterDTO();
	groupTourCustomerObj: GroupTourCustomerDTO[] = [];
	groupTourParticipentObj: GroupTourMemberDTO[] = [];
	cancellingGroupTourRegObj: GroupTourMasterDTO = new GroupTourMasterDTO();

	groupTourEventDetailDTO: GroupTourEventDetailDTO[] = [];
	grouptourList: any[] = [];
	showEvent: boolean = false;
	showCancellationForm: boolean = false;
	salesStaffList: any[] = [];
	grouptourinfoList: any[] = [];
	SearchGroupTourList: string = '';
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.ParticipantList = [];
		this.setNewCustomerDetails();
		this.getGroupTourList();
		this.groupTourMasterObj.TransactionDate = moment().format(Common.SQLDateFormat);
		this.GETSalesStaffLIST();
		this.GETCustomerLIST();
		this.getServiceList();
		this.Notification.LoadingRemove();
	}
	PrintGroupTour(obj){
		var transactionCode = obj.TransactionCode;
		window.open(`${Config.getBaseUrl}TransactionReport/GroupTour?TransactionCode=${transactionCode}`, "_blank");
	}
	//GET LIST
	getGroupTourList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GetGroupTourList()
			.subscribe(
				data => this.setGroupTourList(data),
				(error) => this.showError(error)
			);
	}
	setGroupTourList(data) {
		this.grouptourList = data;
		this.Notification.LoadingRemove();

	}
	saveUpdateGroupTour() {
		if (this.groupTourMasterObj.ID > 0)
			this.groupTourMasterObj.UpdatedBy = this.user.EmployeeCode;
		else this.groupTourMasterObj.CreatedBy = this.user.EmployeeCode;

		//validation
		if (!this.validationModel()) return;

		var cus = JSON.stringify(this.groupTourCustomerObj);
		var pars = JSON.stringify(this.groupTourParticipentObj);
		var details = JSON.stringify(this.groupTourEventDetailDTO);

		this.groupTourMasterObj.customers = Library.getBase64(cus);
		this.groupTourMasterObj.participants = Library.getBase64(pars);
		this.groupTourMasterObj.eventDetails = Library.getBase64(details);

		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.saveUpdateGroupTour(this.groupTourMasterObj).subscribe(
			(data) => this.setGroupTour(data),
			(error) => this.showError(error)
		);

	}
	setGroupTour(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Save Successfully.');
		else this.Notification.Success('update Successfully.');
		document.getElementById('GroupTourEntry_tab').click();
		this.ResetMasterModel();
		this.Notification.LoadingRemove();
	}

	validationModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.groupTourMasterObj.TransactionDate)) {
			this.Notification.Warning('Please Select Transaction date.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.groupTourMasterObj.TourName)) {
			this.Notification.Warning('Please Enter Name of Tour.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.groupTourMasterObj.TourStartDate)) {
			this.Notification.Warning('Please Select Tour Start Date.');
			result = false;
			return;
		}
		// if (Library.isNuLLorUndefined(this.groupTourMasterObj.TourEndDate)) {
		// 	this.Notification.Warning('Please Select Tour End Date.');
		// 	result = false;
		// 	return;
		// }
		// if (Library.isNuLLorUndefined(this.groupTourMasterObj.NoofDays)) {
		// 	this.Notification.Warning('Please Enter No of Days.');
		// 	result = false;
		// 	return;
		// }
		// if (Library.isNuLLorUndefined(this.groupTourMasterObj.NoofParticipent)) {
		// 	this.Notification.Warning('Please Enter No of Participant.');
		// 	result = false;
		// 	return;
		// }
		var validCustomerDetails = 0;
		this.groupTourCustomerObj.forEach(item => {
			if (!Library.isNullOrZero(item.CustomerCode)) {
				if (item.CustomerCode == "0" || Library.isNullOrZero(item.CustomerCode)) {
					this.Notification.Warning('Please Select Customer.');
					result = false;
					return;
				}
				validCustomerDetails += 1;
			}
			else {
				this.Notification.Warning('Please  Select Customer.');
				result = false;
				return;
			}
		});
		var validParticipentDetails = 0;
		this.groupTourParticipentObj.forEach(item => {
			if (!Library.isNullOrZero(item.CustomerCode)) {
				if (item.CustomerCode == "0" || Library.isNullOrZero(item.CustomerCode)) {
					this.Notification.Warning('Please Select Customer.');
					result = false;
					return;
				}
				if (Library.isNullOrZero(item.NameofParticipent)) {
					this.Notification.Warning('Please Enter Name of Participant.');
					result = false;
					return;
				}
				validParticipentDetails += 1;
			}
			else {
				this.Notification.Warning('Please  Select Customer.');
				result = false;
				return;
			}
		});
		return result;
	}
	EditItem(item) {
		this.groupTourMasterObj = JSON.parse(JSON.stringify(item));
		this.groupTourMasterObj.TransactionDate = moment(new Date(this.groupTourMasterObj.TransactionDate)).format(Common.SQLDateFormat);

		this.transactionCommonService.GetGroupTourDetailsbyTransactionCode(this.groupTourMasterObj.TransactionCode)
			.subscribe(
				data => this.setGroupTourEdit(data),
				(error) => this.showError(error)
			);
	}
	setGroupTourEdit(Data: any) {
		this.groupTourCustomerObj = Data["groupTourCustomer"];
		this.groupTourParticipentObj = Data["groupTourMember"];
		this.groupTourEventDetailDTO = Data["groupTourDetails"];
		this.groupTourMasterObj.TourStartDate = moment(new Date(this.groupTourMasterObj.TourStartDate)).format(Common.SQLDateFormat);
		this.groupTourMasterObj.TourEndDate = moment(new Date(this.groupTourMasterObj.TourEndDate)).format(Common.SQLDateFormat);

		this.sumofTotalCustomerNetPayableAmount = Common.calculateTotal(this.groupTourCustomerObj, "NetPayableAmt");
		this.filterCustomers();
		document.getElementById('GroupTourEntry_tab').click();

	}
	ResetMasterModel() {
		this.groupTourMasterObj = new GroupTourMasterDTO();
		this.groupTourMasterObj.TransactionDate = moment().format(Common.SQLDateFormat);
		this.setNewCustomerDetails();
		this.setNewParticipentDetails();
		this.setNewTourEventDetails();
	}

	//Customer
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

		if (!this.validationForCustomerSelection()) return;
		this.filterCustomers();
		this.addNewColumnForParticipentDetail();
		setTimeout(() => this.selectNext(value, event), 500);
	}
	validationForCustomerSelection() {
		var result = true;
		//validation
		var validDetails = 0;
		this.groupTourCustomerObj.forEach(item => {
			if (!Library.isNullOrZero(item.CustomerCode)) {
				if (Library.isNullOrZero(item.CustomerCode)) {
					this.Notification.Warning('Please Select Customer Code.');
					result = false;
					return;
				}
				validDetails += 1;
			}
			else {
				this.Notification.Warning('Please Select Customer Code.');
				result = false;
				return;
			}
		});
		return result;
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
	//Start Tour Event Details
	setNewTourEventDetails() {
		this.addNewColumnForTourEventDetail();
	}
	addNewColumnForTourEventDetail() {
		var details = new GroupTourEventDetailDTO();
		this.groupTourEventDetailDTO.push(details);
	}

	addTourEventDetailsNew(value, event) {
		console.log(this.groupTourEventDetailDTO);
		this.addNewColumnForTourEventDetail();
		setTimeout(() => this.selectNext(value, event), 500)
	}
	removeTourEventDetails(index: number) {
		this.groupTourEventDetailDTO.splice(index, 1);
		this.sumTotalDetailsAmt = Common.calculateTotal(this.groupTourEventDetailDTO, "TotalPayableamt");
		this.CalculateCustomerNetPayableAmount();
	}
	onCustomerChangeForParticipantFilter(obj) { 
		obj['ParticipantList'] = this.groupTourParticipentObj.filter(i => i.CustomerCode == obj.CustomerCode);

	}
	//End  Event Break Down	 

	addEventNew() {
		var result = true;
		if (this.groupTourParticipentObj.length == 0) {
			this.Notification.Warning('Please Enter At Least One Participant');
			result = false;
			return;
		}
		else {
			this.showEvent = true;
			this.groupTourEventDetailDTO = [];
			this.LoadDropDown();
			this.filterCustomers();
			this.setNewTourEventDetails();
		}
	}
	updateEventNew() {
		this.showEvent = true;
		this.LoadDropDown();
		this.filterCustomers();
		this.groupTourEventDetailDTO.forEach(element => {
			this.onCustomerChangeForParticipantFilter(element);
		});
		this.sumTotalDetailsAmt = Common.calculateTotal(this.groupTourEventDetailDTO, "TotalPayableamt");
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
	getServiceList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getTravelProductServiceList()
			.subscribe(
				data => this.setServiceList(data),
				(error) => this.showError(error)
			);
	}
	setServiceList(data) {
		this.serviceList = data; 
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

	selectTarget(e) {
		e.target.select();
	}
	//Details Save And Validation 
	saveUpdateTourEventDetails() {
		//validation
		//	if (!this.validationEventDetails()) return; 
		this.showEvent = false;
	}
	validationEventDetails() {
		var result = true;
		var validDetails = 0;
		this.groupTourEventDetailDTO.forEach(item => {
			if (!Library.isNuLLorUndefined(item.ServiceCode)) {
				if (item.ServiceCode == "0" || Library.isNuLLorUndefined(item.ServiceCode)) {
					this.Notification.Warning('Please Select Service Code.');
					result = false;
					return;
				}
				if (item.CustomerCode == "0" || Library.isNuLLorUndefined(item.CustomerCode)) {
					this.Notification.Warning('Please Select Customer Code.');
					result = false;
					return;
				}
				if (item.NameofParticipent == "0" || Library.isNuLLorUndefined(item.NameofParticipent)) {
					this.Notification.Warning('Please Select Name Of Participant.');
					result = false;
					return;
				}
				if (Library.isNullOrZero(item.MainPrice)) {
					this.Notification.Warning('Please Enter main price.');
					result = false;
					return;
				}
				/*
					//visa validation 
					if (item.ServiceCode = "PS-0001") {
						if (item.CountryCode == "0" || Library.isNuLLorUndefined(item.CountryCode)) {
							this.Notification.Warning('Please Select country for visa registration.');
							result = false;
							return;
						}
					}
					//online validation
					if (item.ServiceCode = "PS-0002") {
						if (Library.isNullOrZero(item.ServiceCharge)) {
							this.Notification.Warning('Please Enter service charge for online registration.');
							result = false;
							return;
						}
					}
					//air ticket validation
					if (item.ServiceCode = "PS-0003") {
						if (item.CountryCode == "0" || Library.isNuLLorUndefined(item.CountryCode)) {
							this.Notification.Warning('Please Select country for air ticket registration.');
							result = false;
							return;
						}
						if (item.AirlinesCode == "0" || Library.isNuLLorUndefined(item.AirlinesCode)) {
							this.Notification.Warning('Please Select Air line for air ticket registration.');
							result = false;
							return;
						}
						if (Library.isNuLLorUndefined(item.Route)) {
							this.Notification.Warning('Please Enter Route for air ticket registration.');
							result = false;
							return;
						}
					}
					//Hotel booking validation
					if (item.ServiceCode = "PS-0004") {
						if (Library.isNuLLorUndefined(item.HotelName)) {
							this.Notification.Warning('Please Enter hotel name for hotel booking registration.');
							result = false;
							return;
						}
						if (Library.isNuLLorUndefined(item.RoomType)) {
							this.Notification.Warning('Please Enter hotel room type for hotel booking registration.');
							result = false;
							return;
						}
					}
				*/

				validDetails += 1;
			}
			else {
				this.Notification.Warning('Please Select Service Code.');
				result = false;
				return;
			}
		});
		return result;
	}
	ResetEventDetailsModel() {
		this.groupTourEventDetailDTO = [];
		this.setNewTourEventDetails();
		this.sumTotalDetailsAmt = 0;

	}

	/* Group Tour Cancellation*/
	cancellation(obj) {
		this.showCancellationForm = true;
		this.transactionCommonService.GetGroupTourDetailsbyTransactionCode(obj.TransactionCode)
			.subscribe(
				data => this.setGroupTourEventDetailsForCancellationForom(data),
				(error) => this.showError(error)
			);
	}
	setGroupTourEventDetailsForCancellationForom(Data: any) {
		this.groupTourEventDetailDTO = Data["groupTourDetails"];
		this.getpayableAmount()
	}
	UpdateForCancellation() {
		this.groupTourMasterObj.UpdatedBy = this.user.EmployeeCode;
		//update customer netAmount 
		console.log(this.groupTourCustomerObj);
		var details = JSON.stringify(this.groupTourEventDetailDTO);
		this.groupTourMasterObj.eventDetails = Library.getBase64(details);
		this.transactionCommonService.updateGroupTourCancellation(this.groupTourMasterObj)
			.subscribe(
				data => this.setupdateGroupTourCancellation(data),
				(error) => this.showError(error)
			);
	}
	setupdateGroupTourCancellation(Data: any) {
		this.showCancellationForm = false;
		this.Notification.Warning(Data);
	}
	isCheckCancel(obj) {
		obj.IsCancel = true;
		this.CalculateCancelationCharge(obj);
	}

	isUnCheckCancel(obj) {
		obj.IsCancel = false;
		obj.CancelationCharge = 0;
		obj.TotalPayableamt = (Number(Library.isUndefinedOrNullOrZeroReturn0(obj.MainPrice))) +
			(Number(Library.isUndefinedOrNullOrZeroReturn0(obj.GovtTax))) +
			(Number(Library.isUndefinedOrNullOrZeroReturn0(obj.ServiceCharge))) -
			(Number(Library.isUndefinedOrNullOrZeroReturn0(obj.Discount)));
		this.getpayableAmount();
	}
	// Calculation
	CalculateCancelationCharge(obj) {
		this.sumTotalDetailsAmt = 0;
		obj.TotalPayableamt = (Number(Library.isUndefinedOrNullOrZeroReturn0(obj.ServiceCharge))) +
			(Number(Library.isUndefinedOrNullOrZeroReturn0(obj.Commision))) +
			(Number(Library.isUndefinedOrNullOrZeroReturn0(obj.CancelationCharge))) -
			(Number(Library.isUndefinedOrNullOrZeroReturn0(obj.Discount)));
		this.getpayableAmount();
	}
	CalculateTotalPayableAmount(obj) {
		this.sumTotalDetailsAmt = 0;
		obj.TotalPayableamt = (Number(Library.isUndefinedOrNullOrZeroReturn0(obj.MainPrice))) +
			(Number(Library.isUndefinedOrNullOrZeroReturn0(obj.GovtTax))) +
			(Number(Library.isUndefinedOrNullOrZeroReturn0(obj.ServiceCharge))) -
			(Number(Library.isUndefinedOrNullOrZeroReturn0(obj.Discount)));
		this.getpayableAmount();
		this.CalculateCustomerNetPayableAmount();
	}

	CalculateCustomerNetPayableAmount() {
		var filterCustomer = this.groupTourEventDetailDTO.map(item => item.CustomerCode).filter((value, index, self) => self.indexOf(value) === index);

		filterCustomer.forEach(element => {
			var SingleCustomerItems = this.groupTourEventDetailDTO.filter(c => c.CustomerCode == element);
			var selectedCutomer = this.groupTourCustomerObj.filter(i => i.CustomerCode == element)[0];
			selectedCutomer.NetPayableAmt = 0;
			SingleCustomerItems.forEach(element => {
				selectedCutomer.NetPayableAmt = selectedCutomer.NetPayableAmt + Number(element.TotalPayableamt);
			});
		});
		this.sumofTotalCustomerNetPayableAmount = Common.calculateTotal(this.groupTourCustomerObj, "NetPayableAmt");
	}

	CalculateServiceChargeValue(obj) {
		obj.ServiceCharge = (Number(Library.isUndefinedOrNullOrZeroReturn0(obj.MainPrice))
			* Number(obj.ServiceParcent)) / 100;
		obj.ServiceCharge = Number(obj.ServiceCharge).toFixed(2);
		this.CalculateTotalPayableAmount(obj);
	}
	CalculateServicePertageValue(obj) {
		obj.ServiceParcent = (Number(Library.isUndefinedOrNullOrZeroReturn0(obj.ServiceCharge)) * 100) /
			Number(Library.isUndefinedOrNullOrZeroReturn0(obj.MainPrice));
		obj.ServiceParcent = Number(obj.ServiceParcent).toFixed(2);
		this.CalculateTotalPayableAmount(obj);
	}
	getpayableAmount() {
		this.sumTotalDetailsAmt = Common.calculateTotal(this.groupTourEventDetailDTO, "TotalPayableamt");
	}
}