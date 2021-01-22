export class HotelTypeModel{

	public ID : number=0;
	public HotelTypeCode : string;
	public HotelTypeName : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
}


export class HotelBookingModel{

	public ID : number=0;
	public BookingCode : string;
	public CustomerCode : string="0";
	public CompanyCode : string="0";
	public CountryCode : string="0";
	public CityCode : string="0";
	public TravelProvider : string="0";
	public HotelType : string="0";
	public HotelName : string;
	public RoomType : string="0";
	public CheckInDate : string;
	public CheckOutDate : string;
	public NoOfDay : number;
	public isAirportPickUp : boolean;
	public RoomFare : number;
	public ServiceCharge : number;
	public TotalPayable : number;
	public SalesStaffCode : string="0";
	public CardCode : string;
	public Currency : string;
	public Remark : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
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
