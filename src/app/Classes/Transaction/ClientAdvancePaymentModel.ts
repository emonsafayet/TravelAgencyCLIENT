export class ClientAdvancePaymentModel {

	public ID : number=0;
	public AdvanceCode : string;
	public AdvanceDate : string;
	public Amount : number=0;
    public CompanyCode : string="0";
	public CustomerCode : string="0";
	public PaymentType : string="0";
	public BankCode : string="0";
	public ChequeNo : string;
	public ClearingDate : string;
	public isClear : boolean;
	public Remark : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
}