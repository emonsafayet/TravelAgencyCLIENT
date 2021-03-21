export class OnlineRegistationMasterModelDTO  {

	public ID : number=0;
	public TransactionCode : string;
	public TransactionDate : string;
	public CustomerCode : string="0";
	public TravelDestinationCode : string="0";
	public SalesReferenceCode : string="0";
	public Remarks : string;
	public NetPayableAmt : number=0;
	public IsFinalLocked : boolean;
	public CardCode : string="0";
	public Currency : string="0";
	public CurrencyRate : number;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;  
	public OnlineRegistrationDetail:string;
}

export class OnlineRegistationDetailModelDTO{
	public OnlineRegDetailID : number = 0;
	public TransactionCode : string = "";
	public NameofPerson : string ="";
	public EventName : string="";
	public EvenDate : string="";
	public RegistrationCharge : number=0;
	public ServiceChargePercent : number=0;
	public ServiceChargeValue : number=0;
	public DiscountAmount : number=0;
	public CardChargeAmount : number=0;
	public TotalPayableAmt : number=0;
	public IsCancel : boolean;
	public CancellationCharge : number=0;
	public CreatedBy : string ="";
	public CreatedOn : string="";
	public UpdatedBy : string="";
	public UpdatedOn : string="";
}
 