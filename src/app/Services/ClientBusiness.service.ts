import { Injectable } from '@angular/core';
import { MasterService } from './Master.service';



@Injectable()
export class ClientBusinessService {

	constructor(private masterService: MasterService) { }

	/*START COMPANY PROFILE*/

	saveUpdateCompanyProfile(companyObj: any) { return this.masterService.post(`client/business/company/profile/save/update`, companyObj); }

	getCompanyProfileList() { return this.masterService.get("client/business/company/profile/list"); }
	/*END COMPANY PROFILE*/

	/**START Travel Product Service**/

	getTravelProductServiceList() { return this.masterService.get("client/business/travel/product/service/list"); }

	saveUpdateTravelProduct(travelProductServiceObj: any) { return this.masterService.post(`client/business/travel/product/service/save/update`, travelProductServiceObj); }

	/**END Travel Product Service**/

	/**START COUNTRY**/

	getTravelcountryList() { return this.masterService.get("client/business/travel/country/list"); }

	saveUpdateTravelcountry(travelCountryObj: any) { return this.masterService.post(`client/business/travel/country/save/update`, travelCountryObj); }
	/**END COUNTRY**/

	/* START CITY*/
	saveUpdateCity(cityObj: any) { return this.masterService.post(`client/business/travel/city/save/update`, cityObj); }

	getCityList() { return this.masterService.get("client/business/travel/city/info/list"); }

	getCityByCountryCodeList(countryCode: string) { return this.masterService.get("client/business/travel/city/info/list/by/country/code/" + countryCode); }

	/* END CITY*/

	/**START TOUR DESTINATION**/
	getDestinationList() { return this.masterService.get("client/business/travel/destination/list"); }

	saveUpdateTravelDestination(travelDestinationObj: any) { return this.masterService.post(`client/business/travel/Destination/save/update`, travelDestinationObj); }
	/**END TOUR DESTINATION**/

	/*START TOUR PROVIDER*/
	saveUpdateProvider(providerObj: any) { return this.masterService.post(`client/business/travel/Provider/save/update`, providerObj); }

	getProviderList() { return this.masterService.get("client/business/travel/provider/list"); }
	/*END TOUR PROVIDER*/

	/*START TOUR AIRLINE*/
	saveUpdateAirline(airlineObj: any) { return this.masterService.post(`client/business/travel/Airline/save/update`, airlineObj); }

	getAirlineList() { return this.masterService.get("client/business/travel/Airline/list"); }
	/*END TOUR AIRLINE*/

	/*START TOUR Customer Type*/
	saveUpdateCustomerType(customerTypeObj: any) { return this.masterService.post(`client/business/travel/customer/type/save/update`, customerTypeObj); }

	getCustomerTypeList() { return this.masterService.get("client/business/travel/customer/type/list"); }
	/*END TOUR Customer Type*/


	/*START TOUR Payment Type*/
	saveUpdatePaymentType(customerTypeObj: any) { return this.masterService.post(`client/business/travel/payment/type/save/update`, customerTypeObj); }

	getPaymentTypeList() { return this.masterService.get("client/business/travel/payment/type/list"); }
	/*END TOUR Payment Type*/

	/*START Currency*/
	saveUpdateCurrency(customerTypeObj: any) { return this.masterService.post(`client/business/travel/currency/save/update`, customerTypeObj); }

	getCurrencyList() { return this.masterService.get("client/business/travel/currency/list"); }
	/*END Currency */


	/*START Currency Rate */
	GETCurrencyRateLIST() { return this.masterService.get("client/business/travel/Currency/Rate/list"); }
	
	saveUpdateCurrencyRate(currencyRateObj: any) { return this.masterService.post(`client/business/travel/currency/rate/save/update`, currencyRateObj); }
	/*END Currency Rate */

	/*START Customer*/
	saveUpdateCustomer(customerTypeObj: any) { return this.masterService.post(`client/business/travel/customer/save/update`, customerTypeObj); }

	getcustomerList() { return this.masterService.get("client/business/travel/customer/list"); }
	/*END Customer */


	/*START PACKAGE INFORMATIONS*/

	savePackage(packageMasterObj: any) { return this.masterService.post(`client/business/travel/package/save`, packageMasterObj); }

	getPackageList() { return this.masterService.get("client/business/travel/package/list"); }

	getPackageDetailsByPackCodeList(packageCode: any) { return this.masterService.get("client/business/travel/package/details/list/package/code/" + packageCode); }
	/*END PACKAGE INFORMATIONS*/

	/* START Card INFORMATIONS*/
	saveUpdateCard(cardObj: any) { return this.masterService.post(`client/business/travel/card/info/save/update`, cardObj); }

	getcardList() { return this.masterService.get("client/business/travel/card/info/list"); }
	/* END Card INFORMATIONS*/

	/* START Card TYPE INFORMATIONS*/
	saveUpdateCardType(cardTypeObj: any) { return this.masterService.post(`client/business/travel/card/type/info/save/update`, cardTypeObj); }

	getCardTypeList() { return this.masterService.get("client/business/travel/card/type/info/list"); }
	/* END Card TYPE INFORMATIONS*/

	/*START Seat Type */
	GETSeatTypeLIST() { return this.masterService.get("client/business/travel/transaction/Seat/Type/list"); }

	saveOrUpdateSeatType(seattypeObj: any) { return this.masterService.post(`client/business/travel/transactionSeat/Seat/Type/save/update`, seattypeObj); }

	/*END Seat Type */

	/*START ROOM TYPE */
	GETHotelRoomTypeLIST() { return this.masterService.get("client/business/travel/transaction/hotel/Room/Type/list"); }

	SaveUpdateHotelRoomType(roomObj: any) { return this.masterService.post(`client/business/travel/transactionSeat/hotel/Room/type/save/update`, roomObj); }

	/*END Seat Type */

	/*START Hotel TYPE */
	GETHotelLIST() { return this.masterService.get("client/business/travel/transaction/hotel/type/list"); }

	SaveUpdateHotelType(hotelTypeObj: any) { return this.masterService.post(`client/business/travel/transactionSeat/hotel/type/save/update`, hotelTypeObj); }

	/*END Hotel Type */

/*START Top Up TYPE */
 
saveUpdateTopUpType(topUpTypeObj: any) { return this.masterService.post(`client/business/travel/transaction/topUp/Type/save/update`, topUpTypeObj); }

/*END Top Up TYPE*/
}