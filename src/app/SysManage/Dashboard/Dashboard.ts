import { Component,OnInit } from '@angular/core';
import {NotificationService} from "../../Services/Notification.service";
import { UserService } from '../../Services/User.service';
import { AuthGuard } from '../../authGuard.guard';
declare var $: any;


@Component({
	templateUrl: 'Dashboard.html'
})
export class Dashboard implements OnInit {

	user :any ;
	
	constructor(private userService : UserService, private authGuard: AuthGuard) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		//console.log(this.user);
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		console.log(`jQuery version: ${$.fn.jquery}`);

	}

	showTowster(){
		//this.toastr.info('Hello world!', 'Toastr fun!');
		$.blockUI({ 
            message: '<h1>Auto-Unblock!</h1>', 
            timeout: 2000 
		}); 
		
	}
}