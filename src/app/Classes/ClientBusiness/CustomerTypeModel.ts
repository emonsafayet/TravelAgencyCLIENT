export class CustomerTypeModel {

	public ID : number=0;
	public TypeCode : string;
	public TypeName : string;
	public isCompany : boolean;
	public isIndivisual : boolean;
	public isActive : boolean=true;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
}