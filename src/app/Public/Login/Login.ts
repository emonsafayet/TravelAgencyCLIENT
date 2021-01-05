import { Component,OnInit } from '@angular/core';
import { Library } from '../../library/library';
import { UserService } from '../../Services/User.service';
import { Router } from '@angular/router';
import { Config } from "../../config";

@Component({
	templateUrl: 'Login.html'
})

export class Login implements OnInit {

	user: any;
	UserName:string;
	UserPassword:string;
	errors: any;
	constructor(private userService : UserService, private router: Router) { }

	

	ngOnInit() {
	}


	signIn(){
		
		this.userService.signInMIS(this.UserName, this.UserPassword, "")
			.subscribe(
				response => this.setSignInMIS(this.user,response),
				error => this.setErrorMessage(error)
			);						 
	}

	setErrorMessage(error){		 
		//setTimeout("hideLoader()",100);
		this.errors = error;
		//console.log(this.errors);
	}
	
	setSignInMIS(user, res){
		//setTimeout("hideLoader()",100);

		var token= res['access_token'];
		var err= res['error'];

			
        if(token==null || token==undefined || token.length==0){
            this.errors =  "Invalid email or password";
        }
        else if(err!=undefined && err.length>0) {
            this.errors = err;
        }
        else {
			
			localStorage.setItem(Config.LS_Token_ERP, token);
			this.userService.setTokenERP(res);

			this.user = this.userService.getLoggedUser(); 

			//var GUID = $('#divGUID').text(); 
			//var deviceInfo = $('#divDeviceInfo').text();
	

			// this.userService.updateLog(this.user['userid'], GUID, deviceInfo, this.locationInfo)
			// .subscribe(
			// 	data => {},
			// 	error => this.setErrorMessage(error)
			// );

			this.navigateUser();
        }
	}

	navigateUser(){

		if(Library.isNullOrEmpty(this.user)) this.user = this.userService.getLoggedUser(); 

		this.router.navigate(["dashboard"]);

	}
}