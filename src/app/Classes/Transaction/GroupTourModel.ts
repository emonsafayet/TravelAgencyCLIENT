export class GroupTourMasterDTO
{

	public ID : number;
	public TransactionCode : string;
	public TransactionDate : string;
	public TourName : string;
	public TourStartDate : string;
	public TourEndDate : string;
	public NoofDays : number;
	public NoofNight : number;
	public NoofParticipent : number;
	public SalesReferenceCode : string;
	public IsFinalLocked : boolean;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public customers:string;
}
export class GroupTourCustomerDTO{
	public ID : number;
	public TransactionCode : string;
	public CustomerCode : string="0";
	public NetPayableAmt : number;
	public CardCode : string;
	public Currency : string;
	public CurrencyRate : number;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
}
export class GroupTourMember {

	public ID : number;
	public TransactionCode : string;
	public CustomerCode : string="0";
	public NameofParticipent : string;
	public PassportNo : string;
	public IsChild : boolean;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
}
