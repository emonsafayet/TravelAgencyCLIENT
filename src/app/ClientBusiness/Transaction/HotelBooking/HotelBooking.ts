import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";
import { Config } from 'src/app/config';
//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';
import { TransactionCommonService } from '../../../Services/TransactionCommon.service';
import { Common } from "../../../library/common";
//Classes
import { HotelBookMaster,HotelBookDetail,  RoomTypeModel } from '../../../Classes/Transaction/HotelBookingModel';

declare var moment: any;
@Component({
	templateUrl: 'HotelBooking.html'
})
export class HotelBooking implements OnInit {
	user: any;
	sumOfTotalValue:any=0;
	sumofTotalCancellationCharge:any=0;
	hotelBookingList: any[] = [];
	hotelBookingObj: HotelBookMaster = new HotelBookMaster();
	hotelBookingDetailObj: HotelBookDetail[] =[];
	customerList: any[] = [];
	companyList: any[] = [];
	currencyList: any[] = [];
	visaTypeList: any[] = [];
	countryList: any[] = [];
	cityList: any[] = [];
	salesStaffList: any[] = [];
	activeCurrencyRateList: any[] = [];
	cardList: any[] = [];
	providerList: any[] = [];
	hotelTypeList: any[] = [];
	roomTypeList: any[] = [];
	SearchHotelBookingList: string = '';

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService, private transactionCommonService: TransactionCommonService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.setNewDetails();
		this.hotelBookingObj.TransactionDate = moment().format(Common.SQLDateFormat);
		this.GETCustomerLIST(); 
		this.GETCurrencyList();
		this.GETSalesStaffLIST();
		this.GETCardLIST();
		this.GETActiveCurrencyRateLIST(); 
		this.GETTravelProviderLIST();
		this.getRoomTypeList();
		this.getHotelBookingList();
		this.Notification.LoadingRemove();
	} 
	
	//GET LIST
	getHotelBookingList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GetHotelBooking()
			.subscribe(
				data => this.setHotelBookingList(data),
				error => this.Notification.Error(error)
			);
	}
	setHotelBookingList(data) {
		this.hotelBookingList = data;
		this.Notification.LoadingRemove();

	}
	PrintHotelBooking(obj){
		var RegistrationCode = obj.TransactionCode;
	   window.open(`${Config.getBaseUrl}TransactionReport/GetHotelBookingTransactionCode?TransactionCode=${RegistrationCode}`, "_blank");
	}
	//SAVE/UPDATE
	saveHotelBooking() {
		if (this.hotelBookingObj.ID > 0)
			this.hotelBookingObj.UpdatedBy = this.user.EmployeeCode;
		else this.hotelBookingObj.CreatedBy = this.user.EmployeeCode;

		if (Library.isNullOrZero(this.hotelBookingObj.NetPayableAmt)) this.hotelBookingObj.NetPayableAmt = 0;
		//validation
		if (!this.validateModel()) return;
		var details = JSON.stringify(this.hotelBookingDetailObj);

		this.hotelBookingObj.HotelBookingDetail = Library.getBase64(details);

		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.SaveUpdateHotelBooking(this.hotelBookingObj).subscribe(
			(data) => this.setHotelBooking(data),
			(error) => this.Notification.Error(error)
		);

	}
	setHotelBooking(Data: any) {
		debugger
		if (Data.ID > 0) this.Notification.Success('Update Successfully.');
		else this.Notification.Success('Save Successfully.'); 
		document.getElementById('hotelBookingEntry_tab').click();
		this.ResetModel();
		this.Notification.LoadingRemove();
	}
 
	validateModel() {		 
		var result = true;
		if (Library.isNuLLorUndefined(this.hotelBookingObj.TransactionDate)) {
			this.Notification.Warning('Please Select Transaction date.');
			result = false;
			return;
		}
		if (this.hotelBookingObj.CustomerCode == "0") {
			this.Notification.Warning('Please Select Customer.');
			result = false;
			return;
		}   
		if (this.hotelBookingObj.NetPayableAmt == 0 || Library.isNullOrZero(this.hotelBookingObj.NetPayableAmt)) {
			this.Notification.Warning('Total Payable Amount Can Not Zero.');
			result = false;
			return;
		} 
		 
		var validDetails = 0;
			this.hotelBookingDetailObj.forEach(item => {
				if (!Library.isNullOrZero(item.NameofPerson)) {
					if (Library.isNullOrZero(item.NameofPerson)) {
						this.Notification.Warning('Please Enter Event Name.');
						result = false;
						return;
					}
					if (Library.isNullOrZero(item.HotelName)) {
						this.Notification.Warning('Please Enter Hotel Name.');
						result = false;
						return;
					}
					if (Library.isNullOrZero(item.RoomFare) || item.RoomFare== 0) {
						this.Notification.Warning('Please Enter Service Charge Value.');
						result = false;
						return;
					}
					if (Library.isNullOrZero(item.TotalPayableAmt) || item.TotalPayableAmt== 0) {
						this.Notification.Warning('Total Amount does not Zero.');
						result = false;
						return;
					}
					validDetails += 1;
				}
				else {
					this.Notification.Warning('Please Enter Name of Person.');
					result = false;
					return;
				}
			});

		return result;
	}
	EditItem(item) {		
		this.hotelBookingObj = JSON.parse(JSON.stringify(item)); 
		this.hotelBookingObj.TransactionDate = moment(new Date(this.hotelBookingObj.TransactionDate)).format(Common.SQLDateFormat);
		this.transactionCommonService.getHotelDetailsByTransactionCode(this.hotelBookingObj.TransactionCode)
		.subscribe(
			data => this.setHotelEdit(data),
			error => this.Notification.Error(error)
		);	 
	}
	setHotelEdit(Data: any) {
		debugger
		Data.forEach(element => {
			element.CheckInDate = moment(new Date(element.CheckInDate)).format(Common.SQLDateFormat);
			element.CheckOutDate = moment(new Date(element.CheckOutDate)).format(Common.SQLDateFormat);
			if(element.isCancel == true)element.isCancel=true;
		 
		});
		this.hotelBookingDetailObj = Data;
		this.sumOfTotalValue = Common.calculateTotal(this.hotelBookingDetailObj, "TotalPayableAmt");
		this.sumofTotalCancellationCharge = Common.calculateTotal(this.hotelBookingDetailObj, "CancellationCharge");
		document.getElementById('hotelBookingEntry_tab').click();
	}
	ResetModel() { 
		this.hotelBookingObj = new HotelBookMaster();
		this.hotelBookingObj.TransactionDate = moment().format(Common.SQLDateFormat);
		this.sumOfTotalValue = 0;
		this.sumofTotalCancellationCharge = 0;
		this.setNewDetails();
	} 
	//DROP DOWN 

	getRoomTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.GETHotelRoomTypeLIST()
			.subscribe(
				data => this.setRoomTypeList(data),
				error => this.Notification.Error(error)
			);
	}
	setRoomTypeList(data) {
		debugger
		this.roomTypeList = data;
		this.Notification.LoadingRemove();
	}
	  
	 
	 
	GETCustomerLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getcustomerList()
			.subscribe(
				data => this.setCustomerLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setCustomerLIST(data) {
		this.customerList = data;
		this.Notification.LoadingRemove();

	}
	GETCurrencyList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getCurrencyList()
			.subscribe(
				data => this.setCurrencyList(data),
				error => this.Notification.Error(error)
			);
	}
	setCurrencyList(data) {
		this.currencyList = data;
		this.Notification.LoadingRemove();
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
	GETCardLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getcardList()
			.subscribe(
				data => this.setcardList(data),
				error => this.Notification.Error(error)
			);
	}
	setcardList(data) {
		this.cardList = data;
		this.Notification.LoadingRemove();

	}
	GETActiveCurrencyRateLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GETActiveCurrencyRateLIST()
			.subscribe(
				data => this.setActiveCurrencyRateList(data),
				error => this.Notification.Error(error)
			);
	}
	setActiveCurrencyRateList(data) {
		this.activeCurrencyRateList = data;
		this.Notification.LoadingRemove();

	}
	GETTravelProviderLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getProviderList()
			.subscribe(
				data => this.setTravelProviderLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setTravelProviderLIST(data) {
		this.providerList = data;
		this.Notification.LoadingRemove();

	}
	onCurrencyChange(item) {

		var RateItem = this.activeCurrencyRateList.filter(c => c.Currency == item)[0];
		if (Library.isNullOrEmpty(RateItem)) this.hotelBookingObj.CurrencyRate = 0;
		else this.hotelBookingObj.CurrencyRate = RateItem.Rate;
	}
	setNewDetails() {
		this.hotelBookingDetailObj = [];
		this.hotelBookingObj = new HotelBookMaster();

		this.addNewColumnForDetail();
	}

	addDetailsNew(value, event) {
		this.addNewColumnForDetail();
		setTimeout(() => this.selectNext(value, event), 500) 
	}   
	addNewColumnForDetail() {
		var hotelBookingDetail = new HotelBookDetail();
		hotelBookingDetail.CheckInDate = moment().format(Common.SQLDateFormat); 
		this.hotelBookingDetailObj.push(hotelBookingDetail);
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
	selectTarget(e) {
		e.target.select();
	}
	removeDetails(index: number) {
		this.hotelBookingDetailObj.splice(index, 1);
		this.getpayableAmount();
	}
	// Calculation
	CalculateServicePertageValue(obj) {
		obj.ServiceChargePercent = (Number( Library.isUndefinedOrNullOrZeroReturn0(obj.ServiceChargeValue)) * 100) /
									 Number(Library.isUndefinedOrNullOrZeroReturn0(obj.RoomFare));
		obj.ServiceChargePercent = Number(obj.ServiceChargePercent).toFixed(2);
		this.CalculateTotalPayableAmount(obj);
	}

	CalculateServiceChargeValue(obj) {
		obj.ServiceChargeValue = ((  Number(Library.isUndefinedOrNullOrZeroReturn0(obj.NoOfDay))*
								Number(Library.isUndefinedOrNullOrZeroReturn0(obj.RoomFare)) ) * 
								(Number(obj.ServiceChargePercent) / 100));

		obj.ServiceChargeValue = Number(obj.ServiceChargeValue).toFixed(2);
		this.CalculateTotalPayableAmount(obj);
	}
	CalculateTotalPayableAmount(obj) {
		debugger
		this.sumOfTotalValue = 0;
		obj.TotalPayableAmt =(  Number(Library.isUndefinedOrNullOrZeroReturn0(obj.NoOfDay))
								*Number(Library.isUndefinedOrNullOrZeroReturn0(obj.RoomFare)) ) +
							  Number(Library.isUndefinedOrNullOrZeroReturn0(obj.ServiceChargeValue)) - 
							  Number(Library.isUndefinedOrNullOrZeroReturn0(obj.DiscountValue));
		this.getpayableAmount();
	}
	getpayableAmount() {
		this.sumOfTotalValue = Common.calculateTotal(this.hotelBookingDetailObj, "TotalPayableAmt");
		this.hotelBookingObj.NetPayableAmt = this.sumOfTotalValue ;
		
	}
	CalculeCancelationAmount(obj){ 
		this.getCancelationAmount(obj);
	}
	isCheckCancel(obj){ 
		obj.IsCancel = true;  
		this.getCancelationAmount(obj);	 
	}
	getCancelationAmount(obj){ 
		obj.TotalPayableAmt = Number(Library.isUndefinedOrNullOrZeroReturn0(obj.ServiceChargeValue)) +
							  Number(Library.isUndefinedOrNullOrZeroReturn0(obj.CancellationCharge));
		this.sumOfTotalValue = Common.calculateTotal(this.hotelBookingDetailObj, "TotalPayableAmt");
		this.sumofTotalCancellationCharge = Common.calculateTotal(this.hotelBookingDetailObj, "CancellationCharge");
		this.hotelBookingObj.NetPayableAmt = this.sumOfTotalValue;
	}
	isUnCheckCancel(obj){
		debugger
		obj.IsCancel = false; 
		obj.CancellationCharge=0; 
		obj.TotalPayableAmt = Number(Library.isUndefinedOrNullOrZeroReturn0(obj.RegistrationCharge))
							+ Number(Library.isUndefinedOrNullOrZeroReturn0(obj.ServiceChargeValue)) -
		 Number(Library.isUndefinedOrNullOrZeroReturn0(obj.DiscountAmount));

		this.sumofTotalCancellationCharge = Common.calculateTotal(this.hotelBookingDetailObj, "CancellationCharge");
		this.sumOfTotalValue = Common.calculateTotal(this.hotelBookingDetailObj, "TotalPayableAmt");
		this.hotelBookingObj.NetPayableAmt = this.sumOfTotalValue; 
	
	}

}

