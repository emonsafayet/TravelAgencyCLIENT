import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, catchError, tap, finalize } from 'rxjs/operators';

import { Config } from "../config";
//import { AlertMessage } from '../library/AlertMessage';


@Injectable()
export class MasterService{

    constructor(private http: HttpClient) { }


	get(URL: string) : any{		
		//if(URL.indexOf('user/last/notification')==-1) this.Notification.init();
		return this.http.get(Config.getAPI(URL.trim()), Config.getHeaders());
	}

	postFormData(URL: string, Body: any) {
		//this.Notification.init();
		return this.http.post(Config.getAPI(URL.trim()), Body, Config.getHeadersForFormData());
	}

	post(URL: string, Body: any) {
		//this.Notification.init();
		return this.http.post(Config.getAPI(URL.trim()), Body, Config.getHeaders());
	}

	loginERP(URL: string, Body: any) {
		//this.Notification.init();
		return this.http.post(Config.getBaseUrl + URL, Body);
		// return this.http.post(Config.API_URL + URL, Body);
	}

	loginMIS(URL: string, Body: any) {
		//this.Notification.init();
		return this.http.post(Config.API_URL + URL, Body);
	}

	put(URL: string, Body: any) {
		//this.Notification.init();
		return this.http.put(Config.getAPI(URL.trim()), Body, Config.getHeaders());
	}

	delete(URL: string) {
		//this.Notification.init();
		return this.http.delete(Config.getAPI(URL.trim()), Config.getHeaders());
	}
	
	getStatic(URL: string) : any{return this.http.get(URL.trim());}



    

}