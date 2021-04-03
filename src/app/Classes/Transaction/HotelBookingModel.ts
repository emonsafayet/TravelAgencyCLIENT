export class HotelBookMaster {

	public ID : number=0;
	public TransactionCode : string;
	public TransactionDate : string;
	public CustomerCode :  string="0";
	public SalesStaffCode :  string="0";
	public CardCode :  string="0";
	public Currency :  string="0";
	public CurrencyRate : number;
	public Remark : string;
	public NetPayableAmt : number=0;
	public IsFinalLocked : boolean;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public HotelBookingDetail : string;
} 
export class HotelBookDetail  {

	public DetailID : number;
	public TransactionCode : string;
	public NameofPerson : string;
	public CityName : string;
	public TravelProvider : string="0";
	public HotelName : string;
	public RoomType : string="0";
	public CheckInDate : string;
	public CheckOutDate : string;
	public NoOfDay :  number=0;
	public CardChargeAmount :  number=0;
	public BookingRefNo : string;
	public RoomFare :  number=0;
	public ServiceChargePercent :  number=0;
	public ServiceChargeValue : number=0;
	public DiscountValue : number=0;
	public TotalPayableAmt : number=0;
	public IsCancel : boolean;
	public CancellationCharge : number=0;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
}
export class RoomTypeModel{

	public ID : number=0;
	public RoomTypeCode : string;
	public RoomTypeName : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
}
