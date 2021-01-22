export class HotelTypeModel{

	public ID : number;
	public HotelTypeCode : string;
	public HotelTypeName : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean;
}

export class HotelBookingModel{

	public ID : number;
	public BookingCode : string;
	public CustomerCode : string;
	public CompanyCode : string;
	public CountryCode : string;
	public CityCode : string;
	public TravelProvider : string;
	public HotelType : string;
	public HotelName : string;
	public RoomType : string;
	public CheckInDate : string;
	public CheckOutDate : string;
	public NoOfDay : number;
	public isAirportPickUp : boolean;
	public RoomFare : number;
	public ServiceCharge : number;
	public TotalPayable : number;
	public SalesStaffCode : string;
	public CardCode : string;
	public Currency : string;
	public Remark : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean;
}
export class RoomTypeModel{

	public ID : number;
	public RoomTypeCode : string;
	public RoomTypeName : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean;
}