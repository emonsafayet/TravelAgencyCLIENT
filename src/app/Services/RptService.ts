import { Injectable } from '@angular/core';
import { MasterService } from './Master.service';

@Injectable()
export class RptService {

	constructor(private masterService: MasterService) { }

	/*START Service Reporting*/
	GetServiceTransactionSummaryList(fromDate: string, toDate: string) { return this.masterService.get(`client/business/travel/transaction/report/service/transaction/summary/list/${fromDate}/${toDate}`); }

	getServiceTransactionDetail(fromDate: string, toDate: string, serviceCode: string) { return this.masterService.get(`client/business/travel/transaction/report/service/transaction/detail/list/${fromDate}/${toDate}/${serviceCode}`); }
	/*END Service Reporting*/

	/*START Collection Reporting*/
	GetServiceTransactionCollectionSummaryList(fromDate: string, toDate: string) { return this.masterService.get(`client/business/travel/transaction/report/service/transaction/collection/summary/list/${fromDate}/${toDate}`); }
	
	GetTransactionCollectionDetailsByServiceCode(fromDate: string, toDate: string, serviceCode: string) { return this.masterService.get(`client/business/travel/transaction/report/service/transaction/collection/details/service/code/${fromDate}/${toDate}/${serviceCode}`); }
	
	GetCustomerAdvanceList(fromDate: string, toDate: string) { return this.masterService.get(`client/business/travel/transaction/report/service/customer/advance/collection/list/${fromDate}/${toDate}`); }
	
	
	/*END Collection Reporting*/

	
	/*START Service Transaction Due Reporting*/
	GetServiceTransactionDueCollectionList(asondate: string) { return this.masterService.get(`client/business/travel/transaction/report/service/transaction/due/summary/${asondate}`); }

	getServiceTransactionDueCollectionDetail(asondate: string, serviceCode: string) { return this.masterService.get(`client/business/travel/transaction/report/service/transaction/due/detail/${asondate}/${serviceCode}`); }
	/*END Service Reporting*/
}