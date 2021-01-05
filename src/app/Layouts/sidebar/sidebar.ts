import { Component,OnInit } from '@angular/core';
import { NotificationService } from '../../Services/Notification.service'
//import { common } from '../../Library/common'
//import { Library } from '../../Library/library';
import { Router } from '@angular/router';

import { UserService } from '../../Services/User.service';
import { MenuService } from "../../Services/menu.service";
@Component({
	selector:'sidebar',
	templateUrl: 'sidebar.html'
})
export class Sidebar implements OnInit {

	user :any ;
	MenuList :any [] =[];
	public href: any;

	constructor(private userService : UserService, private menuservice : MenuService, private router : Router, private Notification:NotificationService) { }

	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		//console.log(this.user);
		this.getUserMenuList();
	}

	navTo(menu){
		console.log(menu);
		var url =  menu.MenuURL;
		//if(Library.isNullOrEmpty(url)) return;
		this.router.navigate([url]);
		this.ResetMenuSelection();

		setTimeout(() => {
			menu.IsSelected = true;
		}, 200);
	}

	getUserMenuList(){
		this.menuservice.getUserAllMenuList(this.user.EmployeeCode)
		.subscribe(
			data => this.setUserMenuList(data),
			error => this.Notification.Error(error)
		);
	}

	setUserMenuList(data:any){
		this.MenuList = data;
		this.ResetMenuSelection();
	}

	ResetMenuSelection(){
		this.MenuList.forEach(item => {
			item.ParentMenu['IsSelected'] = false;

			item.ChildMenuList.forEach(childItem => {
				childItem['IsSelected'] = false;
			});

		});
	}
}