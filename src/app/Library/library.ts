export class Library{
    
    private static FieldName : string = "";
    private static PreviousFieldName : string = "";
    private static SortIndex : number = 0;




    // Expecting date as format (MM/dd/yyyy, 10/14/2017 ), out will be YYYY-MM-DD
    public static convertToMySqlDate(dateValue: string): string{
        if(dateValue==null || dateValue=="") return "";
        var dateArray = dateValue.split('/'); 
        if(dateArray[0].length<=2) return dateArray[2] + "-" + dateArray[0] + "-" + dateArray[1];
        else return dateValue;
    }

    //Get days between two dates 
    public static getDaysBetweenDates(startDate:string,endDate:string)
    {
        var d1 = new Date(startDate);
        var d2 = new Date(endDate);
        var timeDiff = Math.abs(d2.getTime() - d1.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

        return diffDays;
    }

    public static encodeParams(params: any): string {  
        
        let body: string = "";  
        for (let key in params) {  
            if (body.length) {  
                body += "&";  
            }  
            body += key + "=";  
            body += encodeURIComponent(params[key]);  
        }  

        return body;  
    }
    
    public static setLogout(){
        // localStorage.clear();
    }
    
    public static encode(obj: any): string{
        try{
            if(obj==null) return "";
            return btoa(unescape(encodeURIComponent(JSON.stringify(obj)))); 
        }
        catch(e){
            console.log("Failed to encode object to string. Error: " + e.message);
            console.log(obj);
            return "";
        }
    }

    public static decode(str: string): any{
        try{
            if(str==null || str.trim().length==0) return null;
            return JSON.parse(atob(str));    
        }
        catch(e){
            return null;
        }
    }

    
    public static getTodayDate(): string{
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<=0) dd=1;

        var day = dd.toString(), month= mm.toString();

        if(dd<10) {
            day = '0' + dd;
        }
        
        if(mm<10) {
            month = '0'+ mm;
        } 
        
        return month + '/' + day + '/' + yyyy;
    }

    public static getYear(AddYear:number ): number{
        var date = new Date();
        var yyyy = date.getFullYear() + AddYear;        
        return yyyy;
    }


    public static getDay(AddDay:number ): number{
        var date = new Date();
        var day = date.getDate() + AddDay;        
        return day;
    }

    public static setDate(FromDate: string,  AddDay:number ): string{
        var date = new Date(FromDate);
        var dd = date.getDate() + AddDay;
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();  
        var day = dd.toString(), month= mm.toString();

        if(dd<10) {
            day = '0' + dd;
        }
        
        if(mm<10) {
            month = '0'+ mm;
        } 
        
        return month + '/' + day + '/' + yyyy;
    }

    public static getMonth(AddMonth:number ): string{
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1 + AddMonth;
        var yyyy = date.getFullYear();
        if(dd<=0) dd=1;
        var day = dd.toString(), month= mm.toString();        

        day = '01';     
        if(mm<10) month = '0'+ mm;
        
        return month + '/' + day + '/' + yyyy;
    }


    public static getMonthFirstDate(): string{
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<=0) dd=1;
        var day = dd.toString(), month= mm.toString();        

        day = '01';     
        if(mm<10) month = '0'+ mm;
        
        return month + '/' + day + '/' + yyyy;
    }

    public static getLastMonthThisDate(DateValue: string): string{
        var date = new Date(DateValue);
        var dd = date.getDate();
        var mm = date.getMonth();
        var yyyy = date.getFullYear();
        
        var day = dd.toString(), month= mm.toString();        
  
        if(mm<10) month = '0'+ mm;
        
        return month + '/' + day + '/' + yyyy;
    }

    public static getLastYearThisDate(DateValue: string): string{
        var date = new Date(DateValue);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear() - 1;
        if(dd<=0) dd=1;
        var day = dd.toString(), month= mm.toString();        
  
        if(mm<10) month = '0'+ mm;
        
        return month + '/' + day + '/' + yyyy;
    }

    public static getThisDate(AddYear: number, AddMonth: number): string{
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth() + 1 + AddMonth;
        var yyyy = date.getFullYear() + AddYear ;
        
        var day = dd.toString(), month= mm.toString();        
  
        if(mm<10) month = '0'+ mm;
        
        return month + '/' + day + '/' + yyyy;
    }

    public static makeDate(DateValue: string, AddYear: number, AddMonth: number): string{
        var date = new Date(DateValue);
        var dd = date.getDate();
        var mm = date.getMonth() + 1 + AddMonth;
        var yyyy = date.getFullYear() + AddYear;
        if(dd<=0) dd=1;

        if(mm>12) {
            mm = mm-12;
            yyyy++;
        }                       
        var day = dd.toString(), month= mm.toString();        
  
        if(dd<10) day = "0" + day;
        if(mm<10) month = '0'+ mm;
        
        return month + '/' + day + '/' + yyyy;
    }

    

    public static getLastWeekRange(DateValue: string): string{
        var d1 = this.getDateTitleFormat(DateValue);

        var date2 = new Date(DateValue);
        date2.setDate(date2.getDate()-7);        
        var d2 = this.getDateTitleFormat(date2.toString());

        return d1 + " - " + d2;
    }

    public static getLastMonthWeekRange(DateValue: string): string{
        var date = new Date(DateValue);
        date.setMonth(date.getMonth() -1);
        var d1 = this.getDateTitleFormat(date.toString());

        var date2 = new Date(date.toString());
        date2.setDate(date2.getDate()-7);        
        var d2 = this.getDateTitleFormat(date2.toString());

        return d1 + " - " + d2;
    }

    public static getLastYearWeekRange(DateValue: string): string{
        var date = new Date(DateValue);
        date.setFullYear(date.getFullYear() -1);
        var d1 = this.getDateTitleFormat(date.toString());

        var date2 = new Date(date.toString());
        date2.setDate(date2.getDate()-7);        
        var d2 = this.getDateTitleFormat(date2.toString());

        return d1 + " - " + d2;
    }

    public static getDateTitleFormat(DateValue: string){
        var date = new Date(DateValue);
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        
        if(dd<=0) dd=1;
        var day = dd.toString(), month= mm.toString();        
        
  
        if(mm<10) month = '0'+ mm;
        if(dd<10) day = '0'+ day;        
        return day + ' ' + this.getFullMonthName(parseInt(month)).substr(0,3) + ' ' + yyyy.toString().substr(2,2);
    }

    public static getCurrentMonthName():string {
        var date = new Date();
        return this.getFullMonthName(date.getMonth()+1).substring(0,3) + "," + date.getFullYear().toString().substring(2);
    }

    public static getMonthName(FromDate: string, MinusMonth: number):string {
        var date = new Date(FromDate);
        date.setMonth(date.getMonth() - MinusMonth);
        return this.getFullMonthName(date.getMonth()+1).substring(0,3) + "," + date.getFullYear().toString().substring(2);
    }

    public static getCurrentMonthNumber(): number {
        var date = new Date();
        return date.getMonth()+1;
    }

    public static getPreviousMonthName():string {
        var date = new Date();
        date.setMonth(date.getMonth());
        
        return this.getFullMonthName(date.getMonth()).substring(0,3) + "," + date.getFullYear().toString().substring(2);
    }

    public static getYearAndMonthName(FromDate: string): string{
        var date = new Date(FromDate);
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear().toString();
                    
        return this.getFullMonthName(mm) + ', ' + yyyy.substr(2);
    }

    public static getYearAndPreviousMonthName(FromDate: string): string{
        var date = new Date(FromDate);
        var mm = date.getMonth();
        var yyyy = date.getFullYear().toString();
                    
        return this.getFullMonthName(mm) + ', ' + yyyy.substr(2);
    }

    public static getTomorrowDate(): string{
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<=0) dd=1;

        dd = dd +1;
        if((mm==1 || mm==3 || mm==5 || mm==7 || mm==8 || mm==10 || mm==12) && dd>31) dd=31;
        else if((mm==4 || mm==6 || mm==9 || mm==11) && dd>30) dd=30;

        var day = dd.toString(), month= mm.toString();

        if(dd<10) {
            day = '0' + dd
        }
        
        if(mm<10) {
            month = '0'+ mm
        } 
        
        return month + '/' + day + '/' + yyyy;
    }

    public static getYesterdayDate(): string{
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<=0) dd=1;
        
        dd = dd - 1;
        if(dd<=0) dd = 1;
        var day = dd.toString(), month= mm.toString();

        if(dd<10) day = '0' + dd
        if(mm<10) month = '0'+ mm

        return month + '/' + day + '/' + yyyy;
    }


    public static getLastYearYesterdayDate(): string{
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear() - 1;
        
        
        dd = dd - 1;
        if(dd<=0) dd = 1;
        var day = dd.toString(), month= mm.toString();

        if(dd<10) day = '0' + dd
        if(mm<10) month = '0'+ mm

        return month + '/' + day + '/' + yyyy;
    }

    
    public static getLastMonthYesterdayDate(): string{
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth();
        var yyyy = date.getFullYear();
        if(dd<=0) dd=1;
        
        dd = dd - 1;
        if(dd<=0) dd = 1;
        var day = dd.toString(), month= mm.toString();

        if(dd<10) day = '0' + dd
        if(mm<10) month = '0'+ mm

        return month + '/' + day + '/' + yyyy;
    }

    public static getYesterdayLocalDate(): string{
        var date = new Date();
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<=0) dd=1;

        dd = dd - 1;
        var day = dd.toString(), month= mm.toString();

        if(dd<10) day = '0' + dd
        if(mm<10)  month = '0'+ mm

        return day + '/' + month + '/' + yyyy;
    }

    public static getDurationFromTime(time1: string, time2: string){

        if(time2==null || time2.length==0 || time2.indexOf(":")==-1) return "";

        var t = time1.split(':');
        var t2 = time2.split(':');
        var H = parseInt(t2[0]) - parseInt(t[0]);
        var M = 0;
        if(t2[1].length==0) t2[1]="0";
        M = parseInt(t2[1]) - parseInt(t[1]);
        
        if(M<0) {
            M = 60 + M;
            H--;
        }

        return (H<10 ? "0" + H : H ) + ":" + (M<10 ? "0" + M : M);
    }

    public static get24HoursFormatFromAmPm(time: string){

        if(time==null) return  "";
        var tt = time.substr(4,2);
        tt = tt.toLowerCase();
        if(tt=="pm"){
            var Hour = parseInt(time.substr(0,2));
            if(Hour==0) return "00" +  ":" + time.substr(2,2);
            else return (Hour + 12) +  ":" + time.substr(2,2);
        }
        else return time.substr(0,2) + ":" + time.substr(2,2);
    }

    public static isNullOrEmpty(str: string){
        if(str==null || str== undefined ||str == "undefined" || str == "") return true;
        else return false;
    }
    
    public static isListNullOrEmpty(List: any){
        if(List== undefined || List==null  ||List.length <= 0) return true;
        else return false;
    }

    public static isUndefinedOrNullOrLessThanZero(str: number){
        if(str == undefined || str == null || str < 0) return true;
        else return false;
    }
    public static isUndefinedOrNullOrZero(str){
        if(str == undefined || str == null || str == '0') return true;
        else return false;
    }
    public static isUndefinedOrNullOrZeroReturn0(str){
      
        if(str == NaN || str == null || str == undefined || str == "") return 0;
        else return str;
    }

    public static isUndefinedOrNullOrEmpty(str: any){
        if(str == undefined || str == null || str == '') return true;
        else return false;
    }

    public static isUndefinedOrFalse(str: any){
        if(str==undefined || str== false) return true;
        else return false;
    }


    public static isNullOrEmptyInput(input: any){
        if(input==null || input== undefined ||input == "undefined" || input == "") return true;
        else return false;
    }
    
    public static isNullOrZero(input: any){
        if(input==null || input== undefined ||input == "undefined" || input == "" || input == 0 || input == '0') return true;
        else return false;
    }

    public static isNuLLorUndefined(input: any){
        if(input==null || input== undefined) return true;
        else return false;
    }


    public static ToString(input: any){
        if(input==null || input== undefined ||input == "undefined" || input == "") return "";
        else return input.toString();
    }

    public static deepCopy(data: any[]){
        if(this.getLength(data)  == 0) return [];
        var dataStringified = JSON.stringify(data);
        if(this.isNullOrEmptyInput(dataStringified)) return [];
        var copiedData = JSON.parse(dataStringified);
        return copiedData;
    }

    public static getFullMonthName(monthNumber: number){
        switch(monthNumber){
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            case 7:
                return "July";
            case 8:
                return "August";
            case 9:
                return "September";
            case 10:
                return "October";
            case 11:
                return "November";
            case 12:
                return "December";
            default:
                return "Invalid Month";
        }
    }
    

    public static getAchievementClass(value: number){
        if(value>=100) return "text-success";
        else if(value<20) return "text-warning";
        else return ""; 
    }


    public static  valueDouble(value){
        if(value==null || value==undefined || value=='') return 0;
        value = value.toString().trim();
        
        value = value.toString().replace(",","");
        value = value.toString().replace(",","");
        value = value.toString().replace(",","");
   
        if(isNaN(value)) return 0;
        return parseFloat(value);
    }
   
    public static  valueInt(value){
        if(value==null || value==undefined || value=='') return 0;
        value = value.toString().trim();
   
        value = value.toString().replace(",","");
        value = value.toString().replace(",","");
        value = value.toString().replace(",","");
        
        if(isNaN(value)) return 0;
        return parseInt(value);
    }

    public static  getValue(value){
        if(value==null || value==undefined || value=='') return "";
        value = value.toString().trim();
        return value;
    }
   

    public static  currentMonthNumber(){
        return (new Date().getMonth() + 1);
    }

    public static getTimeDifference(time1,time2): string{

        if(this.isNullOrEmpty(time1) || this.isNullOrEmpty(time2)) return "";

        var startDate = new Date(time1);
        var endDate   = new Date(time2);
        var seconds = (endDate.getTime() - startDate.getTime()) / 1000;

        if(seconds<60) return "";

        return this.makeDoubleDigit(seconds/3600).substr(0,2) + ":" + this.makeDoubleDigit((seconds % 3600)/60).substr(0,2);
    }

    public static makeDoubleDigit(value: number){
        if(value<10) return "0" + value.toFixed().toString();
        else return value.toString();
    }

    public static getTotalValue(valueList: any[], TotalFieldName: string){
        var total = 0;
        for(var x=0;x<valueList.length;x++){
            if(!this.isNullOrEmpty(valueList[x][TotalFieldName])) total += this.valueDouble(valueList[x][TotalFieldName]);
        }
        return total;
    }

    public static getIDInCommas(valueList: any[], ValueFieldName: string): string{
        var codes = "";
        valueList.forEach(i => { if(!Library.isNullOrEmpty(i[ValueFieldName])) codes+= i[ValueFieldName] + ",";});
        return codes;
    }

    public static getIDInCommas2(valueList: any[], ValueFieldName: string, CompareColumn: string, CompareValue: any): string{
        var codes = "";
        valueList.forEach(i => { if(!Library.isNullOrEmpty(i[ValueFieldName]) && i[CompareColumn]==CompareValue) codes+= i[ValueFieldName] + ",";});
        return codes;
    }

    public static getSortedArray(valueArray: any[], FieldName: string){
        var vl = [];
        for(var x=0;x<valueArray.length;x++){
            vl.push(valueArray[x][FieldName]);
        }

       return vl.slice().sort(function(a,b){return b-a});
    }
    
    public static getRankArray(valueArray: any[], FieldName: string){
        var vl = [];
        for(var x=0;x<valueArray.length;x++){
            vl.push(valueArray[x][FieldName]);
        }
        var sorted = vl.slice().sort(function(a,b){return b-a});
        var ranks = vl.slice().map(function(v){ return sorted.indexOf(v)+1 });

       return ranks;
    }

    public static getGrowth(CurrentMonthSales: number, LastMonthSales: number){
        if(LastMonthSales>0) return ((CurrentMonthSales-LastMonthSales)/LastMonthSales) * 100;
        else if (LastMonthSales==0 ) return 100;
		else return 0;
    }

    
    
   

    public static getAverage(TotalSales: number, SharePercent: number){
		if(SharePercent>0) return (TotalSales/SharePercent) * 100;
		else return 0;
    }
    
    public static getAchievement(TotalSales: number, Target: number){
		if(Target>0) return (TotalSales/Target) * 100;
		else return 0;
    }
    
    public static setSort(FromCollection: any[], FieldName : string){
        this.FieldName = FieldName;
        FromCollection.sort(this.sortItem);
    }

    public static sortItem(a, b) {

		const item1 = a[this.FieldName]; 
		const item2 = b[this.FieldName]; 
		
		let comparison = 0;
        if (item1 > item2) comparison = 1;
        else if (item1 < item2) comparison = -1;
		return comparison;
    }
    
    public static isValid24HoursFormat(TimeString: string) : boolean {

        if(this.isNullOrEmpty(TimeString) || TimeString==":") return true;
        if(TimeString.indexOf(':')==-1 || TimeString.indexOf('.')>-1 || TimeString.length>5 || TimeString.length<5) return false;

        var ts = TimeString.split(':');
        if(ts[0].length<=1 || ts[1].length<=1) return false;

        return true;
    }

    public static getProperTimeFormat(TimeString: string) : string {

        if(this.isNullOrEmpty(TimeString) || TimeString==":") return "";
        TimeString =  TimeString.replace('.',':');
        TimeString =  TimeString.replace('.:',':');
        TimeString =  TimeString.replace('::',':');

        var ts = TimeString.split(':');
        if(ts[0].length<=1) TimeString = "0" + ts[0]+ ":" + ts[1];
        var ts = TimeString.split(':');
        if(ts[1].length<=1) TimeString = ts[0]+ ":" + ts[1] + "0";

        return TimeString;
    }

    public static isNewData(CreatedOn : string) : boolean{
        var startDate = new Date(CreatedOn);
        var endDate   = new Date();

        var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
        if(seconds<86400) return true;

        return false;
    }

    public static isNewData7Days(CreatedOn : string) : boolean{
        var startDate = new Date(CreatedOn);
        var endDate   = new Date();

        var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
        if(seconds < 604800) return true;

        return false;
    }

    public static getDatePart(DateValue: string, PartIndex: number = 0): string{
        if(DateValue==null || DateValue=="") return "";
        var dp = DateValue.split(' - ');
        if(dp.length==0) return "";
        return this.convertToMySqlDate(dp[PartIndex]);
    }


    public static sortArray(Data: any[], FieldName: string): any[]{
        if(Library.PreviousFieldName!="" && Library.PreviousFieldName!= Library.FieldName) 
        {
            Library.PreviousFieldName = Library.FieldName;
            Library.SortIndex = 0;
        }
        else 
        {
            if(Library.SortIndex==0) Library.SortIndex = 1;
            else Library.SortIndex = 0;
        }

        Library.FieldName = FieldName;
        
        if(Library.SortIndex==0) return Data.sort(Library.sortByASC);
        else  return Data.sort(Library.sortByDESC);
    }

    public static sortArrayAsc(Data: any[], FieldName: string): any[]{
        if(Library.PreviousFieldName!="" && Library.PreviousFieldName!= Library.FieldName) 
        {
            Library.PreviousFieldName = Library.FieldName;
            Library.SortIndex = 0;
        }
        else 
        {
            if(Library.SortIndex==0) Library.SortIndex = 1;
            else Library.SortIndex = 0;
        }

        Library.FieldName = FieldName;
        
        return Data.sort(Library.sortByDESC);
    }

    public static sortArrayDesc(Data: any[], FieldName: string): any[]{
        if(Library.PreviousFieldName!="" && Library.PreviousFieldName!= Library.FieldName) 
        {
            Library.PreviousFieldName = Library.FieldName;
            Library.SortIndex = 0;
        }
        else 
        {
            if(Library.SortIndex==0) Library.SortIndex = 1;
            else Library.SortIndex = 0;
        }

        Library.FieldName = FieldName;
        
        return Data.sort(Library.sortByASC);
    }


    public static sortByASC(a,b){
        const item1 = a[Library.FieldName]; 
		const item2 = b[Library.FieldName]; 
        let comparison = 0;
        
        if (item1 < item2) comparison = 1;
        else if (item1 > item2) comparison = -1;

		return comparison;
    }

    public static sortByDESC(a,b){
        const item1 = a[Library.FieldName]; 
		const item2 = b[Library.FieldName]; 
		let comparison = 0;

        if (item1 > item2) comparison = 1;
        else if (item1 < item2) comparison = -1;
        
		return comparison;
    }

    

    public static setDataFilter(Data: any[], ColumnName: string, FilterValue: any): any[]{
        if(FilterValue=="0") return Data;
        return Data.filter(r => r[ColumnName] == FilterValue);
    }
    
    public static setDataFilterMultiple(Data: any[], ColumnName: string, FilterValue: any, ColumnName2: string, FilterValue2: any): any[]{
        if(FilterValue=="0") return Data;
        return Data.filter(r => r[ColumnName] == FilterValue && r[ColumnName2]==FilterValue2);
    }

    public static getLength(Data: any[]): number{
        if(Data!=null && Data.length>0) return Data.length;
        else return 0;
    }

    public static getValueByIndex(Data: any[], Index: number): any{
        if(Data==null || Data ==undefined ||  Data.length==0) return null;
        else return Data[Index];
    }

    public static isValidDate(dateString): boolean
    {
        if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;

        var parts = dateString.split("/");
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);

        if(year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;

        var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;

        return day > 0 && day <= monthLength[month - 1];
    };


    public static PriceInWords (num) {

        var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
        var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
        
        if ((num = num.toString()).length > 9) return 'overflow';
        var n =[];
        n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str;
    }


    public static ShortName(employeename: string){
        return employeename.replace('Mr.','').replace('Mrs.','').replace('MD','').replace('MD.','').replace('Md','').replace('Md.','').replace('.','').replace(' ','');
    }
    

    public static getPercentOfValue(value: number, percent: number){
		if(Library.isNullOrZero(value)) return 0;
        if(Library.isNullOrZero(percent) || Library.valueDouble(percent) == 100) return value;
        else {
            return ( ( Library.valueDouble(value) * Library.valueDouble(percent) ) / 100 );
        }
    }

    public static getValuePercent(value: number, value2: number){
		return (this.valueDouble(value2) / this.valueDouble(value)) * 100;
    }
    
    public static getBase64(Source: string ):string{
        try{
            return btoa(Source);
        }
        catch(e){
            console.log("Failed to encode. -> " + Source + ". Error :" + e.message);
            return "";
        }
    }

    public static IsSubstring(maintext: string, subtext: string){
        if(Library.isNullOrEmpty(maintext)) return false;
        if(Library.isNullOrEmpty(subtext)) return false;
        if(maintext.toLowerCase().includes(subtext.toLowerCase())) return true;
        return false;
    }

    public static setTooltip(){
        setTimeout("showTooltip();",1000);
    }
}