export class CountryModel {

	public ID : number=0;
	public CountryName : string;
	public CountryCode : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean=true;
}
export class CityModel {

	public ID : number;
	public CityCode : string;
	public CityName : string;
	public CountryCode : string;
	public CreatedBy : string;
	public CreatedOn : string;
	public UpdatedBy : string;
	public UpdatedOn : string;
	public isActive : boolean;
}

