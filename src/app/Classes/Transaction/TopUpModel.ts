
export class TopUpModel  {

	public ID : number=0;
	public TopUpCode : string; 
	public TopUpTypeCode : string="0";
	public ProviderID : string="0";
	public CardID : string;
	public AirlinesID : string="0";
	public TopUpDate : string;
	public Amount : number=0;
	public Description : string;
	public Remarks : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
}

export class TopUpTypeModel {

	public ID : number=0;
	public TopUpTypeCode : string;
	public TopUpTypeName : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
}
