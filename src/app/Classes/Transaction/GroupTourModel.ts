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
	public SalesReferenceCode: string;
	public IsFinalLocked: boolean;
	public CreatedBy: string;
	public CreatedOn: string;
	public UpdatedBy: string;
	public UpdatedOn: string;
	public customers: string;
}
export class GroupTourCustomerDTO {
	public ID: number;
	public TransactionCode: string;
	public CustomerCode: string = "0";
	public NetPayableAmt: number;
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
export class GroupTourVisaDTO {

	public ID: number;
	public TransactionCode: string;
	public ServiceCode: string;
	public CustomerCode: string="0";
	public NameofParticipent: string;
	public CountryCode: string="0";
	public MainPrice: number;
	public ServiceParcent: number;
	public ServiceCharge: number;
	public Discount: number;
	public TotalPayableamt: number;

}
export class GroupTourAirticketDTO {
	public ID: number;
	public TransactionCode: string;
	public ServiceCode: string;
	public CustomerCode: string="0";
	public NameofParticipent: string;
	public ProviderCode:string="0";
	public AirlinesCode: string="0";
	public Route: string;
	public MainPrice: number;
	public GovtTax: number;
	public Commision: number;
	public ServiceParcent: number;
	public ServiceCharge: number;
	public Discount: number;
	public IsCancel: boolean;
	public CancelationCharge: number;
	public TotalPayableamt: number;
}
export class GroupTourHotelBookingDTO {
	public ID: number;
	public TransactionCode: string;
	public ServiceCode: string;
	public CustomerCode: string="0";
	public HotelName: string;
	public ProviderCode: string="0";
	public RoomType:  string="0";
	public MainPrice: number;
	public ServiceParcent: number;
	public ServiceCharge: number;
	public Discount: number;
	public IsCancel: boolean;
	public CancelationCharge: number;
	public TotalPayableamt: number;

}

export class GroupTourTotalPackage {
	public ID: number;
	public TransactionCode: string;
	public ServiceCode: string;
	public CustomerCode: string="0";
	public ProviderCode: string="0";
	public MainPrice: number;
	public ServiceParcent: number;
	public ServiceCharge: number;
	public Discount: number;
	public IsCancel: boolean;
	public CancelationCharge: number;
	public TotalPayableamt: number;
}

