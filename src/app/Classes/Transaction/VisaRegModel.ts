export class VisaRegModel{

	public ID : number=0;
	public VisaCode : string;
	public CustomerCode : string="0";
	public CompanyCode : string="0";
	public VisaType : string="0";
	public VisaCountry : string="0";
	public VisaFee : number=0;
	public PassportNo : string;
	public GovtTax : number;
	public ServiceCharge : number=0;
	public CardID : string="0";
	public Currency : string="0";
	public CurrencyRate : number=0;
	public TotalPayable : number=0;
	public SalesStaffCode : string="0";
	public Remark : string;
	public isGroup : boolean;
	public GroupReference : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
	
}