import { Injectable } from '@angular/core';
import { MasterService } from './Master.service';



@Injectable()
export class TransactionCommonService{ 

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

	//DROP DOWN
	GETCompanyLIST() { return this.masterService.get("client/business/travel/transaction/company/list"); }

	GETSalesStaffLIST() { return this.masterService.get("client/business/travel/transaction/sales/staff/list"); }	
	
	GetOnlineRegisationList() { return this.masterService.get("client/business/travel/transaction/online/registation/list"); }

	saveOnlineRegisationList(regObj: any) { return this.masterService.post(`client/business/travel/transaction/online/registation/save/update`, regObj); }

	/**END  Online Registation Service**/

	/*START Currency Rate */
	GETCurrencyRateLIST() { return this.masterService.get("client/business/travel/transaction/Currency/Rate/list"); }	

	GETActiveCurrencyRateLIST() { return this.masterService.get("client/business/travel/transaction/Active/Currency/Rate/list"); }	
	/*END Currency Rate */ 

	/*START VISA Registation */
	GETVisaRegistationLIST() { return this.masterService.get("client/business/travel/transaction/Visa/Registation/list"); }	

	saveOrUpdateVisaRegistation(visaRegObj: any) { return this.masterService.post(`client/business/travel/transaction/Visa/Registation/save/update`, visaRegObj); }
 
	/*END Currency Rate */ 

 


}