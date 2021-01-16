export class CorporateCustomerModel {

	public ID : number=0;
	public RegistrationCode : string;
	public RegistationDate : string;
	public CustomerCode : string="0";
	public CompanyCode : string="0";
	public WebsiteLink : string;
	public EventName : string;
	public EvenDate : string;
	public TravelDestinationCode : string;
	public RegistrationCharge : number;
	public ServiceCharge : number;
	public TotalPayableAmt : number;
	public CardCode : string;
	public CardChargeAmount : number;
	public Currency : string="0";
	public SalesReferenceCode : string="0";
	public Remark : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
}