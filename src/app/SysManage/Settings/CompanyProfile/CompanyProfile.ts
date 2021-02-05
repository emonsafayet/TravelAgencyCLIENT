import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../Services/Notification.service";
//Common Service 
import { MenuService } from "../../../Services/menu.service";
import { Library } from 'src/app/library/library';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';
import { Common } from "../../../library/common";
//Classes
import { CompaynProfileModel } from '../../../Classes/SysManage/CompanyProfileModel';
declare var moment: any;
@Component({
	templateUrl: 'CompanyProfile.html'
})
export class CompanyProfile implements OnInit {
	user: any;

	companyList: any[] = [];
	companyObj: CompaynProfileModel = new CompaynProfileModel();

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.companyObj.OpeningDate = moment().format(Common.SQLDateFormat);

		this.Notification.LoadingWithMessage('Loading...');
		this.getCompanyProfileList();
		this.Notification.LoadingRemove();
	}
	ResetModel() {
		this.companyObj = new CompaynProfileModel();
	}
	saveUpdate() { 
		//validation
		if (!this.validateModel()) return;
		this.Notification.LoadingWithMessage('Loading...');
		if (this.companyObj.ID > 0)  this.companyObj.UpdatedBy = this.user.EmployeeCode; 
		else this.companyObj.CreatedBy = this.user.EmployeeCode; 
		this.clientBusinessService.saveUpdateCompanyProfile(this.companyObj)
				.subscribe(
					data => this.setsaveResult(data),
					error => this.Notification.Error(error)
				);	
	}
	setsaveResult(Data: any) {
		if (Data.ID > 0) {
			this.Notification.Success("Save Successfully");
			this.ResetModel();
			this.getCompanyProfileList();

		}

	}
	validateModel() {
		var result = true;
		if (Library.isNuLLorUndefined(this.companyObj.CompanyName)) {
			this.Notification.Warning('Please Enter Company Name.');
			result = false;
			return;
		}
		if (Library.isNuLLorUndefined(this.companyObj.HoAddress)) {
			this.Notification.Warning('Please Enter Head Office Address.');
			result = false;
			return;
		}
		return result;
	}
	EditItem(item) {
		this.companyObj = JSON.parse(JSON.stringify(item));
	}
	getCompanyProfileList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getCompanyProfileList()
			.subscribe(
				data => this.setCompanyProfileList(data),
				error => this.Notification.Error(error)
			);
	}
	setCompanyProfileList(data) {
		this.companyList = data;
		this.Notification.LoadingRemove();
	}

}