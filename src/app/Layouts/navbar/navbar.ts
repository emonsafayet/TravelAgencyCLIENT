import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../Services/User.service';
import { Config } from "../../config";
@Component({
	selector:'navbar',
	templateUrl: 'navbar.html'
})
export class Navbar implements OnInit {
 user :any
	constructor(private router: Router,private userService : UserService) { }
	url:string;
	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.url=Config.getBaseUrl;
		this.url=this.url+"File/Image/Logo.jpg";
	}

	logout(){
		
		localStorage.setItem('tokenMIS', null);
		localStorage.setItem('userMIS', null);

        this.router.navigate(['/login']);
	}
}