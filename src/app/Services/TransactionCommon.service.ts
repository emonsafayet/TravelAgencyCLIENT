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


}