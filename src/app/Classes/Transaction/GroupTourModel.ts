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
    public isActive : boolean=true;
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
	public isSelected: boolean=true;
}
export class GroupTourInfoModelDTO  {

	public ID : number;
	public GRPCode : string;
	public TourDate : string;
	public NoOfPerson : number;
	public CustomerCode : string;
	public CompanyCode : string;
	public Destination : string;
	public PackageName : string;
	public NoOfDay : number;
	public Currency : string;
	public CurrencyRate : number;
	public TotalServiceCharge : number;
	public TotalPayable : number;
	public CardCode : string;
	public SalesStaffCode : string;
	public Remark : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean;
	public CustomerName : string;
	public CompanyName : string;
	public CardName : string;
	public PackageNamee : string;
	public EmployeeName : string;
}
