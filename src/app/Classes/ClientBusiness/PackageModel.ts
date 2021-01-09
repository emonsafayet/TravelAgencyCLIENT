export class PackageMasterModel{

	public ID : number=0;
	public PackageCode : string;
	public PackageName : string;
	public Summary : string;
	public NoOfDay : number;
	public NoOfNight : number;
	public TotalPackagePrice : number;
	public Remarks : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
	public packageDetails : string;
}
export class PackageDetailsModel {

	public ID : number;
	public PackageCode : string;
	public EventName : string;
	public EventDetails : string;
	public EventPrice : number;
	public Remarks : string;
}
