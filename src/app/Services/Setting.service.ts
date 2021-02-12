import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, tap, finalize } from 'rxjs/operators';

import { Config } from "../config";
import { MasterService } from './Master.service';



@Injectable()
export class SettingService{
    constructor(private masterService: MasterService) { }

    /**START Signature**/

	getSignatureList() { return this.masterService.get("system/signature/list"); }

	saveUpdateSignature(signatureObj: any) { return this.masterService.post(`system/signature/save/update`, signatureObj); }

	/**END  Signature**/

    /*START Table Type*/
    getTableTypeList() { return this.masterService.get("system/table/type/list"); }

    /*END  Table Type*/ 
}