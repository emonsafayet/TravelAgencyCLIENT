export class VisaMasterDTO{

	public ID : number=0;
	public TransactionCode : string;
	public TransactionDate : string;
	public CustomerCode : string="0";
	public SalesReferenceCode : string="0";
	public NetPayableAmt : number=0;
	public IsFinalLocked : boolean;
	public CardCode : string="0";
	public Currency : string="0";
	public CurrencyRate : number;
	public Remark : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
	public visaDetails :string;
	
}

export class VisaDetailDTO{

	public DetailID : number;
	public TransactionCode : string;
	public NameofPerson : string;
	public VisaType : string="0";
	public ProviderCode : string="0";
	public VisaCountry : string="0";
	public PassportNo : string;
	public CardChargeAmount : number=0;
	public VisaFee : number=0;
	public GovtTax : number=0;
	public ServiceChargePercent : number=0;
	public ServiceChargeValue : number=0;
	public TotalPayableAmt : number=0;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
}