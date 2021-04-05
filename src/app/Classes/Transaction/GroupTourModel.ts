export class GroupTourMasterDTO {
	public ID: number = 0;
	public TransactionCode: string;
	public TransactionDate: string;
	public TourName: string;
	public TourStartDate: string;
	public TourEndDate: string;
	public NoofDays: number;
	public NoofNight: number;
	public NoofParticipent: number;
	public SalesReferenceCode: string="0";
	public IsFinalLocked: boolean;
	public CreatedBy: string;
	public CreatedOn: string;
	public UpdatedBy: string;
	public UpdatedOn: string;
	public customers: string;
	public participants: string;
	public eventDetails: string;
}
export class GroupTourCustomerDTO {
	public ID: number;
	public TransactionCode: string;
	public CustomerCode: string = "0";
	public NetPayableAmt: number=0;
	public CardCode: string;
	public Currency: string;
	public CurrencyRate: number;
	public CreatedBy: string;
	public CreatedOn: string;
	public UpdatedBy: string;
	public UpdatedOn: string;
}
export class GroupTourMemberDTO {
	public ID: number;
	public TransactionCode: string;
	public CustomerCode: string = "0";
	public NameofParticipent: string;
	public PassportNo: string;
	public IsChild: boolean;
	public CreatedBy: string;
	public CreatedOn: string;
	public UpdatedBy: string;
	public UpdatedOn: string;
}
export class GroupTourEventDetailDTO{

	public ID : number;
	public TransactionCode : string;
	public ServiceCode : string="0";
	public CustomerCode : string="0";
	public NameofParticipent : string="0";
	public ProviderCode : string="0";
	public AirlinesCode : string="0";
	public CountryCode :string="0";
	public Route : string;
	public HotelName : string;
	public RoomType : string="0";
	public CardChargeAmount : number=0;
	public MainPrice : number=0;
	public GovtTax : number=0;
	public Commision : number=0;
	public ServiceParcent : number=0;
	public ServiceCharge : number=0;
	public Discount : number=0;
	public IsCancel : boolean;
	public CancelationCharge : number=0;
	public TotalPayableamt : number=0;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;

} 
