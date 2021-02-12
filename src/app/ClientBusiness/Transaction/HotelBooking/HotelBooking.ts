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
import { HotelBookingModel, HotelTypeModel, RoomTypeModel } from '../../../Classes/Transaction/HotelBookingModel';

declare var moment: any;
@Component({
	templateUrl: 'HotelBooking.html'
})
export class HotelBooking implements OnInit {
	user: any;

	hotelBookingList: any[] = [];
	hotelBookingObj: HotelBookingModel = new HotelBookingModel();
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
		this.hotelBookingObj.BookingRegDate = moment().format(Common.SQLDateFormat);
		this.GETCustomerLIST();
		this.GETCompanyLIST();
		this.GETCurrencyList();
		this.GETSalesStaffLIST();
		this.GETCardLIST();
		this.GETActiveCurrencyRateLIST();
		this.getCountryList();
		this.GETHotelTypeLIST();
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

	//SAVE/UPDATE
	saveHotelBooking() {
		if (this.hotelBookingObj.ID > 0)
			this.hotelBookingObj.UpdatedBy = this.user.EmployeeCode;
		else this.hotelBookingObj.CreatedBy = this.user.EmployeeCode;

		if (Library.isNullOrZero(this.hotelBookingObj.TotalPayable)) this.hotelBookingObj.TotalPayable = 0;
		//validation
		if (!this.validateModel()) return;

		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.SaveUpdateHotelBooking(this.hotelBookingObj).subscribe(
			(data) => this.setHotelBooking(data),
			(error) => this.Notification.Error(error)
		);

	}
	setHotelBooking(Data: any) {
		if (Data.ID > 0) this.Notification.Success('Saved Successfully.');
		else {
			this.Notification.LoadingRemove();
		}
		this.hotelBookingObj = new HotelBookingModel();
		this.getHotelBookingList();
	}


	validateModel() {
		;
		var result = true
		if (Library.isNuLLorUndefined(this.hotelBookingObj.BookingRegDate)) {
			this.Notification.Warning('Please Select Event date.');
			result = false;
			return;
		}
		if (this.hotelBookingObj.CustomerCode == "0") {
			this.Notification.Warning('Please Select Customer.');
			result = false;
			return;
		}
		if (this.hotelBookingObj.CountryCode == "0") {
			this.Notification.Warning('Please Select Country.');
			result = false;
			return;
		}
		if (this.hotelBookingObj.TravelProvider == "0") {
			this.Notification.Warning('Please Select Travel Provider.');
			result = false;
			return;
		}
		if (this.hotelBookingObj.HotelType == "0") {
			this.Notification.Warning('Please Select Hotel Type.');
			result = false;
			return;
		}
		if (this.hotelBookingObj.RoomFare == 0 || Library.isNuLLorUndefined(this.hotelBookingObj.RoomFare)) {
			this.Notification.Warning('Please Enter Room Charge.');
			result = false;
			return;
		}
		if (this.hotelBookingObj.ServiceCharge == 0 || Library.isNuLLorUndefined(this.hotelBookingObj.ServiceCharge)) {
			this.Notification.Warning('Please Enter ServiceCharge.');
			result = false;
			return;
		}
		if (this.hotelBookingObj.TotalPayable == 0 || Library.isNullOrZero(this.hotelBookingObj.TotalPayable)) {
			this.Notification.Warning('Total Payable Amount Can Not Zero.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.hotelBookingObj.Currency) || this.hotelBookingObj.Currency == "0") {
			this.Notification.Warning('Please Select Currency .');
			result = false;
			return;
		}

		if (Library.isNuLLorUndefined(this.hotelBookingObj.SalesStaffCode) || this.hotelBookingObj.SalesStaffCode == "0") {
			this.Notification.Warning('Please Select Sales Staff .');
			result = false;
			return;
		}

		return result;
	}
	EditItem(item) {
		this.ResetModel();
		this.hotelBookingObj = JSON.parse(JSON.stringify(item));
		this.hotelBookingObj.BookingRegDate =  moment(new Date(this.hotelBookingObj.BookingRegDate)).format(Common.SQLDateFormat);
		this.hotelBookingObj.CheckInDate =  moment(new Date(this.hotelBookingObj.CheckInDate)).format(Common.SQLDateFormat);
		this.hotelBookingObj.CheckOutDate =  moment(new Date(this.hotelBookingObj.CheckOutDate)).format(Common.SQLDateFormat);
	 
	}
	ResetModel() {
		this.hotelBookingObj = new HotelBookingModel();
	}
	updateTotalPayable() {
		setTimeout(() => {
			
			var serviceCharge: any = 0;
			var roomFare = 0;
			roomFare = Number(this.hotelBookingObj.RoomFare) * Number(this.hotelBookingObj.CurrencyRate);
			serviceCharge = (Number(roomFare)) / 100 * Number(this.hotelBookingObj.ServiceCharge);
			this.hotelBookingObj.TotalPayable = Number(roomFare.toFixed(2)) + Number(serviceCharge.toFixed(2));
		}, 100);
	}
	onCurrencyChange(item) {
		setTimeout(() => {
			
			this.hotelBookingObj.RoomFare = 0;
			this.hotelBookingObj.ServiceCharge = 0;
			this.hotelBookingObj.TotalPayable = 0;

			var RateItem = this.activeCurrencyRateList.filter(c => c.Currency == item)[0];
			if (Library.isNullOrEmpty(RateItem)) this.hotelBookingObj.CurrencyRate = 0;
			else this.hotelBookingObj.CurrencyRate = RateItem.Rate;
		}, 100);

	}
	//DROP DOWN
	//get travel Product List

	getRoomTypeList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.GETHotelRoomTypeLIST()
			.subscribe(
				data => this.setRoomTypeList(data),
				error => this.Notification.Error(error)
			);
	}
	setRoomTypeList(data) {
		this.roomTypeList = data;
		this.Notification.LoadingRemove();
	}
	getCityList(coutryCode: string) {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getCityByCountryCodeList(coutryCode)
			.subscribe(
				data => this.setCityList(data),
				error => this.Notification.Error(error)
			);
	}
	setCityList(data) {
		this.cityList = data;
		this.Notification.LoadingRemove();
	}
	filterCityByCountryCode() {
		this.cityList = []; // flush previous data
		this.hotelBookingObj.CityCode = "0";
		this.getCityList(this.hotelBookingObj.CountryCode);
	}
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
	GETCompanyLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.transactionCommonService.GETCompanyLIST()
			.subscribe(
				data => this.setCompanyLIST(data),
				error => this.Notification.Error(error)
			);
	}
	setCompanyLIST(data) {
		this.companyList = data;
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
	GETHotelTypeLIST() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.GETHotelLIST()
			.subscribe(
				data => this.setHotelTypeList(data),
				error => this.Notification.Error(error)
			);
	}
	setHotelTypeList(data) {
		this.hotelTypeList = data;
		this.Notification.LoadingRemove();

	}

}

