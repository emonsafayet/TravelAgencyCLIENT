import { Injectable } from '@angular/core';
import { MasterService } from './Master.service';



@Injectable()
export class ClientBusinessService{ 

	constructor(private masterService: MasterService) { }

	/**START Travel Product Service**/

	getTravelProductServiceList() { return this.masterService.get("client/business/travel/product/service/list"); }

	saveUpdateTravelProduct(travelProductServiceObj: any) { return this.masterService.post(`client/business/travel/product/service/save/update`, travelProductServiceObj); }

	/**END Travel Product Service**/

	/**START COUNTRY**/

	getTravelcountryList() { return this.masterService.get("client/business/travel/country/list"); }

	saveUpdateTravelcountry(travelCountryObj: any) { return this.masterService.post(`client/business/travel/country/save/update`, travelCountryObj); }
	/**END COUNTRY**/

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

}