import { Injectable } from '@angular/core';
import { MasterService } from './Master.service';



@Injectable()
export class TransactionCommonService {

	constructor(private masterService: MasterService) { }

	/**START TOP UP Service**/

	GetTopUpList() { return this.masterService.get("client/business/travel/transaction/topUp/list"); }

	saveUpdateToUp(topUpObj: any) { return this.masterService.post(`client/business/travel/transaction/topUp/save/update`, topUpObj); }

	/**END  TOP UP Service**/

	/**START TOP UP TYPE Service**/

	GetTopUpTypeList() { return this.masterService.get("client/business/travel/transaction/topUp/type/list"); }

	saveUpdateToUpType(topUpTypeObj: any) { return this.masterService.post(`client/business/travel/transaction/topUp/Type/save/update`, topUpTypeObj); }

	/**END  TOP UP TYPE Service**/

	/**START Online Registation Service**/

	GetOnlineRegisationList() { return this.masterService.get("client/business/travel/transaction/online/registation/list"); }

	saveOnlineRegisationList(regObj: any) { return this.masterService.post(`client/business/travel/transaction/online/registation/save/update`, regObj); }

	/**END  Online Registation Service**/

	/*START ACTIVE Currency Rate */
	GETActiveCurrencyRateLIST() { return this.masterService.get("client/business/travel/transaction/Active/Currency/Rate/list"); }
	/*END ACTIVE Currency Rate */

	/*START VISA TYPE*/
	GETVisaTypeLIST() { return this.masterService.get("client/business/travel/transaction/Visa/Type/list"); }

	saveOrUpdateVisaType(visaTypeObj: any) { return this.masterService.post(`client/business/travel/transaction/Visa/Type/save/update`, visaTypeObj); }
	/*END VISA TYPE*/

	/*START VISA Registation */
	GETVisaRegistationLIST() { return this.masterService.get("client/business/travel/transaction/Visa/Registation/list"); }

	saveOrUpdateVisaRegistation(visaRegObj: any) { return this.masterService.post(`client/business/travel/transaction/Visa/Registation/save/update`, visaRegObj); }

	/*END VISA Registation */

	/*START Air ticket */
	GETAirTicketLIST() { return this.masterService.get("client/business/travel/transaction/Air/Ticket/Registration/list"); }

	SaveUpdateAirTicketRegistration(seattypeObj: any) { return this.masterService.post(`client/business/travel/transactionSeat/Air/Ticket/Registration/save/update`, seattypeObj); }

	/*END  Air ticket */


	/*START Hotel Booking  */
	GetHotelBooking() { return this.masterService.get("client/business/travel/transaction/hotel/booking/list"); }

	SaveUpdateHotelBooking(hotelBookingObj: any) { return this.masterService.post(`client/business/travel/transactionSeat/hotel/booking/save/update`, hotelBookingObj); }

	/*END  Hotel Booking  */


	// START COMMON DROP DOWN
	GETCompanyLIST() { return this.masterService.get("client/business/travel/transaction/company/list"); }

	GETSalesStaffLIST() { return this.masterService.get("client/business/travel/transaction/sales/staff/list"); }
	// END COMMON DROP DOWN

	//START GROUP TOUR 
	saveUpdateGroupTour(groupTourObj: any) { return this.masterService.post(`client/business/travel/transaction/group/tour/save/update`, groupTourObj); }

	GetGroupTourList() { return this.masterService.get("client/business/travel/transaction/group/tour/list"); }

	// END GROUP TOUR 

	//START HOLIDAY PACKAGE TOUR

	saveUpdateHolidayPackageTour(holidayPackageTourObj: any) { return this.masterService.post(`client/business/travel/transaction/holiday/package/tour/save/update`, holidayPackageTourObj); }

	getholidayPackageTourList() { return this.masterService.get("client/business/travel/transaction/holiday/package/tour/list"); }

	//END HOLIDAY PACKAGE TOUR 

	//START Advance Payment

	saveUpdateAdvancePayment(clientAdvceObj: any) { return this.masterService.post(`client/business/travel/transaction/advance/payment/save/update`, clientAdvceObj); }

	getAdvancePayment() { return this.masterService.get("client/business/travel/transaction/advance/payment/list"); }

	//END Advance Payment

	//START Money Receipt

	getServiceListByCustomerCode(customerCode: string) { return this.masterService.get("client/business/travel/transaction/money/receipt/service/list/" + customerCode); }

	saveUpdateMoenyReceipt(mrReceiptObj: any) { return this.masterService.post(`client/business/travel/transaction/money/receipt/save/update`, mrReceiptObj); }
	 
	getMRList(fromDate: string,toDate: string):any { return this.masterService.get(`client/business/travel/transaction/money/receipt/list/${fromDate}/${toDate}`); }
	//pullDiscountPolicyData(KeyType: string, KeyValue: string): any { return this.masterService.get(`data/pull/${KeyType}/${KeyValue}`); }
	//END Money Receipt 

}