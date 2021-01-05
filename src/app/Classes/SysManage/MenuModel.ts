export class MenuModel {

	public ID: number = 0;
	public ApplicationID: number;
	public ParentMenuID: number;
	public MenuNameEng: string;
	public MenuNameBng: string;
	public MenuURL: string;
	public DisplayOrder: number;
	public IsActive: boolean = true;
	public CreatedOn: string;
	public CreatedBy: string;
	public UpdatedOn: string;
	public UpdatedBy: string;
}