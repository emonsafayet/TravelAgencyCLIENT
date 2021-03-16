export class AirTicketRegModelDTO  {

	public ID : number=0;
	public TransactionCode : string;
	public TransactionDate : string;
	public CustomerCode : string="0";
	public Remarks : string;
	public SalesReferenceCode : string="0";
	public isConfirmed : boolean;
	public IsFinalLocked : boolean;
	public CardCode : string="0";
	public CardChargeAmount : number=0;
	public Currency : string="0";
	public CurrencyRate : number;
	public NetPayableAmt : number=0;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
}
export class AirTicketDetailDTo{

	public DetailID : number;
	public TransactionCode : string;
	public NameofPerson : string;
	public AirlinesCode : string="0";
	public Route : string;
	public TicketNo : string;
	public SeatTypeCode : string="0";
	public ProviderCode : string="0";
	public TravelDate : string;
	public ReturnDate : string;
	public BaseFare : number=0;
	public GovTax : number=0;
	public AIT : number=0;
	public Comission : number=0;
	public ServiceChargePercent : number;
	public ServiceChargeValue : number=0;
	public DiscountValue : number=0;
	public TotalPayableAmt : number=0;
	public IsForward : boolean;
	public ChangePenalty : number=0;
	public ChangeDate : string;
	public IsCancel : boolean;
	public CancellationCharge : number=0;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
}