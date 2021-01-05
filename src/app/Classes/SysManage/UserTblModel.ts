export class UserTblModel {

	public ID: number;
	public ApplicationID: number;
	public EmployeeCode: string;
	public EmployeeName: string;
	public UserName: string;
	public IsActive: boolean = true;
	public UserPassword: string;
	public RoleID: number;
	public CreatedOn: string;
	public CreatedBy: string;
	public UpdatedBy: string;
	public UpdatedOn: string;
}