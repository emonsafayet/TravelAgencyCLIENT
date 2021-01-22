import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../../authGuard.guard';
import { UserService } from '../../../Services/User.service';
import { NotificationService } from "../../../Services/Notification.service";

//Service  
import { UserAccessService } from "../../../Services/UserAccess.service";
import { Library } from 'src/app/library/library';
import { ClientBusinessService } from '../../../Services/ClientBusiness.service';

// classess
import { PackageMasterModel, PackageDetailsModel } from '../../../Classes/ClientBusiness/PackageModel';

@Component({
	templateUrl: '_PackTour.html'
})
export class _PackTour implements OnInit {

	user: any;
	packageList: PackageMasterModel [] = [];  

	packageDetailObj: PackageDetailsModel[] = [];
	packageMasterObj: PackageMasterModel = new PackageMasterModel();
	SearchPackageList: string = "";
	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.setNewPackageDetails();
		this.getPackageList();
		this.Notification.LoadingRemove();
	}
	getPackageList() {
		this.Notification.LoadingWithMessage('Loading...');
		this.clientBusinessService.getPackageList()
			.subscribe(
				data => this.setPackageList(data),
				error => this.Notification.Error(error)
			);
	}
	setPackageList(data) {
		this.packageList = data;
		console.log(this.packageList);
		this.Notification.LoadingRemove();
	}
	EditItem(item){

		this.packageMasterObj = JSON.parse(JSON.stringify(item)); 
		
		this.clientBusinessService.getPackageDetailsByPackCodeList(this.packageMasterObj.PackageCode)
			.subscribe(
				data => this.packageDetailObj = (data),
				error => this.Notification.Error(error)
			);

			document.getElementById('PackageEntry_tab').click();

	}
	setNewPackageDetails() {
		this.packageDetailObj = [];
		this.packageMasterObj = new PackageMasterModel();

		this.packageDetailObj.push({
			ID: 0,
			PackageCode: "",
			EventName: "",
			EventDetails: "",
			EventPrice: 0,
			Remarks: "",
		});
	}
	addDetailsNew() {
		this.packageDetailObj.push({
			ID: 0,
			PackageCode: "",
			EventName: "",
			EventDetails: "",
			EventPrice: 0,
			Remarks: "",
		});
	}
	removeDetails(index: number) {
		this.packageDetailObj.splice(index, 1);
	}
	savePackage() {
		// console.log(this.packageMasterObj);
		// console.log(this.packageDetailObj);
		debugger
		// Validation
		if (!this.validateModel()) return;

		var details = JSON.stringify(this.packageDetailObj);

		this.packageMasterObj.packageDetails = Library.getBase64(details);
		this.packageMasterObj.CreatedBy = this.user.EmployeeCode;

		this.clientBusinessService.savePackage(this.packageMasterObj)
			.subscribe(
				data => this.setaveResult(data),
				error => this.Notification.Error(error)
			);
	}
	setaveResult(Data: any) {
		if (Data.ID > 0) {
			this.Notification.Success('Saved Successfully.');
			this.ResetModel();
			document.getElementById("PackageList_tab").click();
			this.getPackageList(); 
		}
		else {
			this.Notification.Failure('Unable to save data.');
			console.log(Data)
		}
	}
	ResetModel() {
		this.packageMasterObj = new  PackageMasterModel();		
		this.setNewPackageDetails();  
	}
	validateModel() {
		debugger
		var result = true;
		try {
			if (Library.isNullOrEmpty(this.packageMasterObj.PackageName)) {
				this.Notification.Warning('Please package name.');
				result = false;
				return;
			}

			if (Library.isNuLLorUndefined(this.packageMasterObj.NoOfDay)) {
				this.Notification.Warning('Please No Of Days.');
				result = false;
				return
			}
			var validDetails = 0;
			this.packageDetailObj.forEach(item => {

				if (!Library.isNullOrZero(item.EventName)) {

					if (Library.isNullOrZero(item.EventPrice)) {
						this.Notification.Warning('Please Select Event Price.');
						result = false;
						return;
					}
					validDetails += 1;
				}
				else {
					this.Notification.Warning('Please Select Event Name.');
					result = false;
					return;
				}
			});
		}
		catch (e) {
			this.Notification.Warning('Please Select item.');
			return false;
		}
		return result;
	}

}
