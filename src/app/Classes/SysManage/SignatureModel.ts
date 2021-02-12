export class SignatureModel{

	public ID : number=0;
	public KeyID : string;
	public Prefix : string;
	public Suffix : string;
	public NoOfDigit : number;
	public DBName : string="0";
	public TableType : string="0";
	public TableName : string="0";
	public ColumnName : string="0";
	public InitialCode : string;
	public CriteriaColumn : string;
	public ExtraCondition : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
}