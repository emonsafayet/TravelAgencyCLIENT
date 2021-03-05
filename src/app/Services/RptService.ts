import { Injectable } from '@angular/core';
import { MasterService } from './Master.service';

@Injectable()
export class RptService{ 

	constructor(private masterService: MasterService) { }

	GetServiceTransactionSummaryList(fromDate: string,toDate: string) { return this.masterService.get(`client/business/travel/transaction/report/service/transaction/summary/list/${fromDate}/${toDate}`); }

	getServiceTransactionDetail(fromDate: string,toDate: string,serviceCode: string) { return this.masterService.get(`client/business/travel/transaction/report/service/transaction/detail/list/${fromDate}/${toDate}/${serviceCode}`); }

}