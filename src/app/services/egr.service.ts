import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EgrService {
  // baseUrl = 'http://egr.gov.by/egrn/API.jsp';

  constructor(
    private _http: HttpClient,
    private _httpNative: HTTP,
    private _platform: Platform
  ) {}

  getCompanyInfo(UNP: string) {
    if (UNP) {
      return from(
        this._httpNative.get(
          `http://egr.gov.by/api/v2/egr/getJurNamesByRegNum/${UNP}`,
          {},
          {}
        )
      );
      // return this._http.get(
      //   `https://xn--b1agleslgi.xn--90ais/api/companies/Organization/${UNP}`
    }
  }

  getAddressByRegNum(UNP) {
    if (UNP) {
      return from(
        this._httpNative.get(
          `http://egr.gov.by/api/v2/egr/getJurNamesByRegNum/${UNP}`,
          {},
          {}
        )
      );
    }
  }

  // getCompanyInfoByUNP(UNP: string) {
  //   if (UNP) {
  //     // return this._http.get(`https://xn--b1agleslgi.xn--90ais/api/companies/Organization/${UNP}`);
  //     return this._http.get(
  //       `https://xn--b1agleslgi.xn--90ais/api/companies/Organization/${UNP}`
  //     );
  //   }
  // }

  // getEGRAddressByRegNum(UNP: string) {
  //   if (UNP) {
  //     if (this._platform.is('cordova')) {
  //       return from(
  //         this._httpNative.get(
  //           `http://egr.gov.by/api/v2/egr/getAddressByRegNum/${UNP}`,
  //           {},
  //           {}
  //         )
  //       );
  //     } else {
  //       return this._http.get(`/apiEGR/v2/egr/getAddressByRegNum/${UNP}`);
  //     }
  //   }
  // }
}
