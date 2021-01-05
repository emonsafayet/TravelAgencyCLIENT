import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../Services/User.service';

@Component({
	selector:'navbar',
	templateUrl: 'navbar.html'
})
export class Navbar implements OnInit {
 user :any
	constructor(private router: Router,private userService : UserService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
	}

	logout(){
		
		localStorage.setItem('tokenMIS', null);
		localStorage.setItem('userMIS', null);

        this.router.navigate(['/login']);
	}
}