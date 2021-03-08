import { getDefaultSettings } from "http2";

export class  AdvPaymentClearance{

	public ID : number;
	public AdvanceCode : string;
	public AdvanceDate : string;
	public Amount : number;
	public CompanyCode : string;
	public CustomerCode : string;
	public PaymentType : string;
	public BankCode : string;
	public ChequeNo : string;
	public ClearingDate : string;
	public isClear : boolean;
	public Remark : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean;
	public PaymentTypeName : string;
	public CustomerName : string;
	public CompanyName : string;
	public BankName : string;
}