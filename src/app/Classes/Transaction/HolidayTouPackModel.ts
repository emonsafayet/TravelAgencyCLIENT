export class HolidayPackageMasterModel{

	public ID : number;
	public HOPCode : string;
	public TourDate : string;
	public NoOfPersonAdult : number;
	public NoOfPersonChild : number;
	public CustomerCode : string="0";
	public CompanyCode : string="0";
	public Destination : string;
	public PackageCode : string="0";
	public NoOfDay : number;
	public Currency : string="0";
	public CurrencyRate : number;
	public TotalServiceCharge : number;
	public TotalPayable : number;
	public CardCode : string="0";
	public SalesStaffCode : string="0";
	public Remark : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean;
}

export class HolidayPackageDetailModel{

	public ID : number;
	public HOPCode : string;
	public PackageCode : string;
	public EventName : string;
	public EventDetail : string;
	public EventRemark : string;
	public EventCharge : number;
}