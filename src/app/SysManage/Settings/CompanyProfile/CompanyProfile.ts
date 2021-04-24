import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../../Services/Notification.service";
import { Config } from "../../../config";
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

	companyObj: CompaynProfileModel = new CompaynProfileModel();

	public imagePath;
	imgFileBase64: any;
	url:string;
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }

	ngOnInit() {		
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);
		this.url=Config.getBaseUrl;
		this.url=this.url+"File/Image/Logo.jpg"; 

		this.Notification.LoadingWithMessage('Loading...');
		this.getCompanyProfileList();
		this.Notification.LoadingRemove();
	}

	Imagepreview(files) {
		if (files.length === 0)	return;
		
		var mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}
		var reader = new FileReader();
		this.imagePath = files;
		reader.readAsDataURL(files[0]);
		reader.onload = (_event) => {
			this.imgFileBase64 = reader.result;
		}
	}
	ResetModel() {
		this.companyObj = new CompaynProfileModel();
	}
	saveUpdate() {

		//validation
		if (!this.validateModel()) return;
		this.Notification.LoadingWithMessage('Loading...');
		if (this.companyObj.ID > 0) this.companyObj.UpdatedBy = this.user.EmployeeCode;
		else this.companyObj.CreatedBy = this.user.EmployeeCode;

		if(this.imgFileBase64) this.companyObj.CompanyLogo = this.imgFileBase64;

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
		
		this.companyObj = data;
		// this.companyObj.OpeningDate = moment(this.companyObj.OpeningDate).add(0, 'months').format('MM/DD/YYYY');
		this.Notification.LoadingRemove();
	}


	

}