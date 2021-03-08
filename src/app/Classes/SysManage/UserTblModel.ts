export class UserTblModel {

	public ID: number=0;
	public ApplicationID: number=0;
	public EmployeeCode: string="0";
	public EmployeeName: string="";
	public UserName: string;
	public IsActive: boolean = true;
	public UserPassword: string;
	public RoleID: number=0;
	public CreatedOn: string;
	public CreatedBy: string;
	public UpdatedBy: string;
	public UpdatedOn: string;
}