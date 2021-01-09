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

	packageDetailObj: PackageDetailsModel[] = [];
	packageMasterObj: PackageMasterModel = new PackageMasterModel();

	constructor(private userService: UserService, private authGuard: AuthGuard,
		private Notification: NotificationService, private clientBusinessService: ClientBusinessService) { }


	ngOnInit() {
		this.user = this.userService.getLoggedUser();
		this.authGuard.hasUserThisMenuPrivilege(this.user);

		this.Notification.LoadingWithMessage('Loading...');
		this.setNewPackageDetails();
		this.Notification.LoadingRemove();
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
		console.log(this.packageMasterObj);
		console.log(this.packageDetailObj);


		// Validation
		// if(!this.validateModel()) return;

		// var details = JSON.stringify(this.packageDetailObj);

		// this.packageMasterObj.packageDetails = Library.getBase64(details);
		// this.packageMasterObj.CreatedBy = ""

		// console.log(this.packageMasterObj.packageDetails);

		// this.creditNoteService.saveCreditNote(this.creditNote)
		// .subscribe(
		// 	data => this.setSaveSuccess(data),
		// 	error => AlertMessage.setError(error)
		// );


	}

}