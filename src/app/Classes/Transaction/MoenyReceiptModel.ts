export class MRMasterModel{
	public ID : number=0;
	public ReceiptCode : string;
	public ReceivedDate : string; 
	public CustomerCode : string="0";
	public TotalPayableAmount : number;
	public Remark : string;
	public IsLocked : boolean;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
    public isActive : boolean=true;
	public mrInvoiceDetail :string;
	public mrPaymentDetail :string;
}


export class MRInvoiceDetailModel{
	public ID : number;
	public ReceiptCode : string;
	public ServiceCode : string;
	public DueAmount : number;
	public PaidAmount : number=0;
	public Remark : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
}
export class MRPaymentDetailModel{
	public ID : number;
	public ReceiptCode : string;
	public PaymentType : string="0";
	public ReceivedAmount : number;
	public BankName : string;
	public ChequeNo : string;
	public CardNo : string;
	public POSTransactionNo : string;
	public TxnNo : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
}

export class MRMasterModelDTO{
	public ID : number=0;
	public ReceiptCode : string;
	public ReceivedDate : string; 
	public CustomerCode : string="0";
	public TotalPayableAmount : number=0;
	public Remark : string;
	public IsLocked : boolean;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
    public isActive : boolean=true;
	public mrInvoiceDetail :string;
	public mrPaymentDetail :string;
	public PaymentDetail : string;
	public InvoiceDetail: string;
}

export class MRInvoiceDetailModelDTO{
	public ServiceCode : string;
	public ServiceName : string;
	public ServiceAmount : number=0; 
	public PayableAmount : number=0; 
	public Remark : string;
 
}
 