import { HttpHeaders } from "@angular/common/http";
import { Library } from './library/library';
import { Common } from './library/common';



export class Config {


    //public static get Site_URL(): string {return "https://www.lplmis.com/"};
    //public static get MIS_API_URL(): string {return "https://www.lplmis.com/api/"};
    //public static get APP_VERSION(): string {return "7.6.4";}

    // LIVE SERVER
    // public static get API_URL(): string { return "http://localhost:81/api/api/"; }
    // public static get getBaseUrl(): string { return "http://localhost:81/api/"; }
    
    // LIVE SERVER -->> Travel Tech
    public static get API_URL(): string { return "http://103.231.162.170:81/api/api/"; }
    public static get getBaseUrl(): string { return "http://103.231.162.170:81/api/"; }  

    // // LOCAL SERVER
    // public static get API_URL(): string {return "http://localhost:62600/api/"; } 
    // public static get getBaseUrl(): string {return "http://localhost:62600/"; }


    public static get getBaseUrlERP(): string { return "https://www.lplmis.com/#/ERP/"; }
    public static get getBaseUrlMIS(): string { return "https://www.lplmis.com/" };


    // ERP
    public static get LS_Token_ERP(): string { return "tokenMIS" };
    public static get LS_User_ERP(): string { return "userMIS" };

    // this is a test

    public static get GRANT_TYPE(): string { return "password" };


    public static getAPI_URL(url: string) {
        if (url.indexOf('/') == 0) return this.API_URL + url.substr(1);
        else return this.API_URL + url;
    }
    // public static getSiteURL(url: string){
    //     if(url.indexOf('/')==0) return this.Site_URL + url.substr(1);
    //     else return this.Site_URL + url;
    // }


    public static getAPI(url: string) {
        var URL = "";
        if (url.indexOf('/') == 0) URL = this.API_URL + url.substr(1);
        else URL = this.API_URL + url;

        return URL;
    }


    public static getApiUrlWithoutToken(url: string) {
        if (url.indexOf('/') == 0) return this.API_URL + url.substr(1);
        else return this.API_URL + url;
    }

    public static getTokenERP() {
        return "Bearer " + localStorage.getItem('tokenERP');
    }
    public static getTokenMIS() {
        return "Bearer " + localStorage.getItem('token');
    }

    public static isNullOrEmpty(str: string) {
        if (str == null || str == undefined || str == "undefined" || str == "") return true;
        else return false;
    }

    public static log(response: any) {
        return response;
    }


    public static getHeaders() {

        var user = localStorage.getItem(Config.LS_User_ERP);
        if (user == null || user == undefined || user === "undefined") return null;
        var userObj = Library.decode(user);

        const headers = new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', '*')
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Cache-Control', userObj['EmployeeCode'])
            .set('Authorization', this.getTokenERP());

        return { headers: headers };
    }

    public static getHeadersForFormData() {
        const headers = new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', '*')
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Accept', 'application/json')
            .set('Authorization', this.getTokenERP());

        return { headers: headers };
    }

    public static getHeadersWithoutToken() {
        const headers = new HttpHeaders()
            .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', '*')
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Content-Type', 'application/json; charset=utf-8');

        return { headers: headers };
    }

    // USER PERMISSION

    public static HasView: boolean = false;
    public static HasInsert: boolean = false;
    public static HasUpdate: boolean = false;
    public static HasDelete: boolean = false;
    public static HasPrint: boolean = false;
    public static HasFullAccess: boolean = false;

    public static UserPrivilege: any = {
        HasView: false,
        HasInsert: false,
        HasUpdate: false,
        HasDelete: false,
        HasPrint: false,
        HasFullAccess: false,
    };

    public static setPermission(UserPrivilege: any) {

        this.HasView = Library.isNullOrEmptyInput(UserPrivilege) ? false : UserPrivilege.HasView;
        this.HasInsert = Library.isNullOrEmptyInput(UserPrivilege) ? false : UserPrivilege.HasInsert;
        this.HasUpdate = Library.isNullOrEmptyInput(UserPrivilege) ? false : UserPrivilege.HasUpdate;
        this.HasDelete = Library.isNullOrEmptyInput(UserPrivilege) ? false : UserPrivilege.HasDelete;
        this.HasPrint = Library.isNullOrEmptyInput(UserPrivilege) ? false : UserPrivilege.HasPrint;
        this.HasFullAccess = Library.isNullOrEmptyInput(UserPrivilege) ? false : UserPrivilege.HasFullAccess;

        this.UserPrivilege = {
            HasView: this.HasView,
            HasInsert: this.HasInsert,
            HasUpdate: this.HasUpdate,
            HasDelete: this.HasDelete,
            HasPrint: this.HasPrint,
            HasFullAccess: this.HasFullAccess
        }
    }

    public static getPermission() {
        return this.UserPrivilege;
    }

    public static reset() {
        this.HasView = false;
        this.HasInsert = false;
        this.HasUpdate = false;
        this.HasDelete = false;
        this.HasPrint = false;
        this.HasFullAccess = false;
    }

    public static navToMIS(URL: string) {
        window.location.replace(Config.getBaseUrlMIS + URL);
    }
    public static navToERP(URL: string) {
        window.location.replace(Config.getBaseUrlERP + URL);
    }

    public static switchToApp(AppName: string) {
        localStorage.setItem('AppName', AppName);
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";

        console.log(baseUrl);

        if (AppName == 'MIS') {
            window.location.replace(baseUrl);
            return;
        }
        else {
            window.location.replace(baseUrl + "ERP/#");
            return;
        }
    }

    public static setExcel(Data: any, ShowInConsole: boolean = false): any {
        if (ShowInConsole) return Common.ExcelData = Config.log(Data);
        else return Common.ExcelData = Data;
    }
}