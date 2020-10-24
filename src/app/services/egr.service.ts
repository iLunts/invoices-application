import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import {
  Contractor,
  ContractorInfo,
  ContractorAddress,
} from '../models/contractor.model';

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

  getContractorByUnp(UNP: string): Contractor {
    let tempContractor: Contractor = new Contractor();

    this.getJurNames(UNP).subscribe(
      (responseInfo: any) => {
        if (responseInfo) {
          tempContractor.info = this.mappingJurNames(responseInfo);
          tempContractor.info.unp = UNP;
          tempContractor._type = 1;

          this.getAddressByRegNum(UNP).subscribe((responseAddress: any) => {
            if (responseAddress) {
              tempContractor.juridicalAddress = this.mappingJurAddress(
                responseAddress
              );
              return tempContractor;
            }
          });
        }
      },
      (error: any) => {
        if (error.status === 404) {
          this.getIPFIOByRegNum(UNP).subscribe((responseInfo: any) => {
            if (responseInfo) {
              tempContractor.info = this.mappingIPFIOByRegNum(responseInfo);
              tempContractor.info.unp = UNP;
              tempContractor._type = 2;

              this.getAddressByRegNum(UNP).subscribe((responseAddress: any) => {
                if (responseAddress) {
                  tempContractor.juridicalAddress = this.mappingJurAddress(
                    responseAddress
                  );
                  return tempContractor;
                }
              });
            }
          });
        }
      }
    );
    return tempContractor;
  }

  private getJurNames(UNP: string) {
    if (UNP) {
      if (this._platform.is('cordova')) {
        return from(
          this._httpNative.get(
            `https://invoices.by/api/v2/egr/getJurNamesByRegNum/${UNP}`,
            // `http://egr.gov.by/api/v2/egr/getJurNamesByRegNum/${UNP}`,
            {},
            {}
          )
        );
      } else {
        return from(
          this._http.get(
            `/api/v2/egr/getJurNamesByRegNum/${UNP}`
            // `http://egr.gov.by/api/v2/egr/getJurNamesByRegNum/${UNP}`
          )
        );
      }
    }
  }

  private getIPFIOByRegNum(UNP: string) {
    if (UNP) {
      if (this._platform.is('cordova')) {
        return from(
          this._httpNative.get(
            `https://invoices.by/api/v2/egr/getIPFIOByRegNum/${UNP}`,
            {},
            {}
          )
        );
      } else {
        return from(this._http.get(`/api/v2/egr/getIPFIOByRegNum/${UNP}`));
      }
    }
  }

  private getAddressByRegNum(UNP) {
    if (!UNP) {
      return;
    }

    if (this._platform.is('cordova')) {
      return from(
        this._httpNative.get(
          `https://invoices.by/api/v2/egr/getAddressByRegNum/${UNP}`,
          {},
          {}
        )
      );
    } else {
      return from(this._http.get(`/api/v2/egr/getAddressByRegNum/${UNP}`));
    }
  }

  private mappingJurAddress(data: any): ContractorAddress {
    let juridicalAddress = new ContractorAddress();

    juridicalAddress.city = data[0].vnp;
    juridicalAddress.country = data[0].nsi00201.vnstranp;
    juridicalAddress.houseNumber = data[0].vdom;
    juridicalAddress.office = data[0].vpom;
    juridicalAddress.street = data[0].vulitsa;
    juridicalAddress.zipCode = data[0].nindex;
    juridicalAddress.phone = data[0].vtels;
    juridicalAddress.email = data[0].vemail;
    juridicalAddress.fax = data[0].vfax;

    return juridicalAddress;
  }

  private mappingJurNames(data: any): ContractorInfo {
    let info = new ContractorInfo();

    info.fullName = data[0].vnaim;
    info.shortName = data[0].vn;
    info.name = data[0].vfn;

    info.fullNameBel = data[0].vnaimb;
    info.shortNameBel = data[0].vnb;
    info.nameBel = data[0].vfnb;

    info.registrationDate = data[0].dcrta;

    return info;
  }

  private mappingIPFIOByRegNum(data: any): ContractorInfo {
    let info = new ContractorInfo();

    info.fullName = 'Индивидуальный предприниматель ' + data[0].vfio;
    info.shortName = 'ИП ' + data[0].vfio;
    info.name = 'ИП ' + data[0].vfio;

    info.fullNameBel = 'Iндывідуальны прадпрымальнік' + data[0].vfio;
    info.shortNameBel = 'IП ' + data[0].vfio;
    info.nameBel = 'IП ' + data[0].vfio;

    info.registrationDate = data[0].dcrta;

    return info;
  }
}
