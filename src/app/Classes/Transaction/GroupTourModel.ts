export class GroupTourInfoMasterModel {

	public ID : number=0;
	public GRPCode : string;
	public TourDate : string;
	public NoOfPerson : number;
	public CustomerCode : string="0";
	public CompanyCode : string="0";
	public Destination : string;
	public PackageName : string="0";
	public package : string;
	public NoOfDay : number;
	public Currency : string="0";
	public CurrencyRate : number=0;
	public TotalServiceCharge : number=0;
	public TotalPayable : number=0;
	public CardCode : string="0";
	public SalesStaffCode : string="0";
	public Remark : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
    public isActive : boolean;
    public GroupTourInfoDetail:string;
}
export class GroupTourInfoDetailModel {

	public ID : number=0;
	public GRPCode : string;
	public PackageCode : string;
	public EventName : string;
	public EventDetail : string;
	public EventRemark : string;
	public EventCharge : number; 
}