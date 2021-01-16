export class OnlineRegistationModel  {

	public ID : number=0;
	public RegistrationCode : string;
	public RegistationDate : string;
	public CustomerCode : string="0";
	public CompanyCode : string="0";
	public WebsiteLink : string;
	public EventName : string;
	public EvenDate : string;
	public TravelDestinationCode : string="0";
	public RegistrationCharge : number=0;
	public ServiceCharge : number=0;
	public TotalPayableAmt : number=0;
	public CardCode : string="0"; 
	public Currency : string="0";
	public CurrencyRate : number=0;
	public SalesReferenceCode : string="0";
	public Remark : string;	
	public isActive : boolean=true;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string; 
	
 
}