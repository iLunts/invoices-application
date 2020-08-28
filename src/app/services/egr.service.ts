import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root',
})
export class EgrService {
  // baseUrl = 'http://egr.gov.by/egrn/API.jsp';

  constructor(private _http: HttpClient, private _nativeHttp: HTTP) {}

  getCompanyInfo(UNP: string) {
    if (UNP) {
      return this._http.get(
        `https://xn--b1agleslgi.xn--90ais/api/companies/Organization/${UNP}`
      );
    }
  }

  getCompanyInfoByUNP(UNP: string) {
    if (UNP) {
      // return this._http.get(`https://xn--b1agleslgi.xn--90ais/api/companies/Organization/${UNP}`);
      return this._http.get(
        `https://xn--b1agleslgi.xn--90ais/api/companies/Organization/${UNP}`
      );
    }
  }

  getEGRAddressByRegNum(UNP: string) {
    if (UNP) {
      return this._nativeHttp.get(
        `http://egr.gov.by/api/v2/egr/getAddressByRegNum/${UNP}`,
        {},
        {}
      );
      // return this._http.get(
      //   `http://egr.gov.by/api/v2/egr/getAddressByRegNum/${UNP}`
      // );
    }
  }
}
