export class CurrencyModel  {

	public ID : number=0;
	public CurrencyName : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
}

export class CurrencyConversationHistoryModel {

	public ID : number=0;
	public CurrencyRateCode : string;
	public Currency : string="0";
	public Rate : number;
	public Order : number;
	public FromdDate : string;
	public ExpireDate : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
}