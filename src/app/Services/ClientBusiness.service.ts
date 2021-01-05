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
	getTravelDestinationList() { return this.masterService.get("client/business/travel/destination/list"); }

	saveUpdateTravelDestination(travelDestinationObj: any) { return this.masterService.post(`client/business/travel/Destination/save/update`, travelDestinationObj); }
	/**END TOUR DESTINATION**/

}