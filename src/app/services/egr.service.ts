import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EgrService {
  // baseUrl = 'http://egr.gov.by/egrn/API.jsp';

  constructor(
    private _http: HttpClient,
  ) { }

  // getCompanyInfo(params: HttpParams) {
  //   return this._http.get(
  //     '/egr',
  //     {
  //       params
  //     });
  // }

  getCompanyInfo(UNP: string) {
    if (UNP) {
      return this._http.get(`https://xn--b1agleslgi.xn--90ais/api/companies/Organization/${UNP}`);
    }
  }
}
