import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Config } from "../config";
import { Library } from "../library/library";
import { User } from "../Classes/SysManage/UserModel";
import { MasterService } from './Master.service';

@Injectable()
export class UserService{

	constructor(private masterService : MasterService) { }


// ERP
signInMIS(usercode: string, password: string, logDetails: string): any{
	Library.setLogout();
	let params: any = {  
		ClientId: logDetails,  
		grant_type: Config.GRANT_TYPE,  
		username: usercode,  
		password: password
	};  
	
	// Encodes the parameters.  
	let body: string = Library.encodeParams(params);  
	return this.masterService.loginERP("token",body);
}

getLoggedUser(): User{
	var user = localStorage.getItem(Config.LS_User_ERP);
	if(user==null || user==undefined || user==="undefined") return null;
	var userObj = Library.decode(user);
	return userObj     
}

setTokenERP(res){
	this.setLoggedUserData(res,"ERP");
	localStorage.setItem(Config.LS_Token_ERP,res['access_token']);
}

setLoggedUserData(Data: any, Application: string = 'ERP'){
	var user = new User();        
	user = Data;
	if(Application=="ERP") localStorage.setItem(Config.LS_User_ERP, Library.encode(user));
	else localStorage.setItem(Config.LS_Token_ERP, Library.encode(user));
}

hasAuthentication(){
	const token = this.getTokenERP();
	if(token!= undefined && token.length>15) return true;
	else return false;
}

getTokenERP(){ return localStorage.getItem(Config.LS_Token_ERP); }

}