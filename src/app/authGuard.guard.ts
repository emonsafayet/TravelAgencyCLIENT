import { Injectable } from '@angular/core';
//classes

import { IpInfoModel } from '../app/Classes/SysManage/IpInfoModel';

import {
  Router,
  ActivatedRoute,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

//Service
import { Config } from './config';
import { Library } from './library/library';
import { UserService } from './Services/User.service';
import { MenuService } from './Services/menu.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { library } from '@fortawesome/fontawesome-svg-core';
declare var $: any;

@Injectable()
export class AuthGuard implements CanActivate {
  errorBody: any;
  favMenus: any;

  public PrivilegeID: number = 0;

  IpInfoObj: IpInfoModel = new IpInfoModel();
  InfoListObj : any[] = [];
  canReloadReport: boolean = false;

  constructor(
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private menuservice: MenuService,
    private deviceService: DeviceDetectorService,
    private http: HttpClient
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.hasAuthentication()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  setErrorMessage(res) {
    if (res.status != null && res.status !== undefined) {
      if (res.status === 0)
        return 'Unable to connect server. Please try again.';
      else if (res.status === 400) {
        // console.log(res._body);
        return 'Please try again.';
      } else if (res.status === 401) this.router.navigate(['/login']);
      else if (res.status === 500) {
        this.saveError(res.url);
        var message = res._body;
        return (
          'Unable to process the request. Please try again later! ' + message
        );
      }
    }

    if (res._body != null) {
      this.errorBody = JSON.parse(res._body)['error'];
      return 'Unable to process. ' + this.errorBody;
    }
    return res;
  }

  saveError(errordetails: string) {
    console.log(errordetails);
  }

  hasUserThisMenuPrivilege(user: any) {
    try {
      // Checking Route
      var routePath = this.router.routerState.snapshot.url;
      if (routePath.substr(0, 1) == '/') routePath = routePath.substr(1);
      if (Library.isNullOrEmpty(routePath)) return;

      this.IpInfoObj.UserName = user.UserName;
      this.IpInfoObj.EmployeeCode = user['EmployeeCode'];
      this.IpInfoObj.routePath = Library.encode(routePath);

      ////device dector
      var DeviceInfo = this.deviceService.getDeviceInfo();
      //console.log(DeviceInfo);
      //getting ip address

      var IpAddressDetails = null;
      var ip = null;

      this.http
        .get('http://api.ipify.org/?format=json')
        .subscribe((res: any) => {
          ip = res.ip;

          if (Library.isNuLLorUndefined(ip)) {
			this.IpInfoObj.IpAddressDetails = '0';

            this.menuservice
              .checkUserThisMenuPrivilege(this.IpInfoObj)
              .subscribe(
                (data) => this.setRouteProtection(data),
                (error) => this.setErrorMessage(error)
              );
          } else {
            this.http
              .get('http://ip-api.com/json/' + ip)
              .subscribe((data: any) => {
                IpAddressDetails = data;

                if (Library.isNuLLorUndefined(IpAddressDetails)) {
                  IpAddressDetails['query'] = ip;

				  this.InfoListObj.push(IpAddressDetails);
                  this.IpInfoObj.IpAddressDetails = Library.encode(this.InfoListObj);
                  this.menuservice
                    .checkUserThisMenuPrivilege(
						this.IpInfoObj
                    )
                    .subscribe(
                      (data) => this.setRouteProtection(data),
                      (error) => this.setErrorMessage(error)
                    );
                } else {
                  //console.log(IpAddressDetails);
                  IpAddressDetails['ClientDeviceInfoDto'] = DeviceInfo;
				  
				  this.InfoListObj.push(IpAddressDetails);
				  this.IpInfoObj.IpAddressDetails = Library.encode(this.InfoListObj);

				  
                  this.menuservice
                    .checkUserThisMenuPrivilege(
						this.IpInfoObj
                    )
                    .subscribe(
                      (data) => this.setRouteProtection(data),
                      (error) => this.setErrorMessage(error)
                    );
                }
              });
          }
        });

      return;
    } catch (e) {
      return;
    }
  }

  setRouteProtection(data) {
    if (data == false) {
      this.router.navigate(['no/access']);
      return null;
    }
    //if(!Library.isNullOrEmpty(routePath)) localStorage.setItem("backto", routePath);
    //this.setPermission(data);
  }

  checkOneTimeNotify(): boolean {
    var oneTimeNotify = localStorage.getItem('one_time_notify');

    if (Library.isNullOrEmpty(oneTimeNotify)) {
      localStorage.setItem('one_time_notify', '1');
      this.router.navigate(['celebrate']);
      return true;
    }

    return false;
  }

  isThisRoute(Route: string): boolean {
    // Checking Route
    var routePath = this.router.routerState.snapshot.url;
    if (routePath.substr(0, 1) == '/') routePath = routePath.substr(1);

    if (routePath.indexOf(Route) > -1) return true;
    else return false;
  }

  updateTitle() {
    var routePath = this.router.routerState.snapshot.url;

    if (Library.isNullOrEmpty(routePath)) {
      this.titleService.setTitle('Web ERP');
      return;
    }

    routePath = routePath
      .replace('/', ' ')
      .replace('/', ' ')
      .replace('/', ' ')
      .replace('/', ' ')
      .replace('inventory', '')
      .replace('accounts', '')
      .toLocaleUpperCase();
    this.titleService.setTitle('ERP :' + routePath);
  }

  // USER PERMISSION
  setPermission(Data: any) {}
}
