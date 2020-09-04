import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Platform } from '@ionic/angular';
import { from } from 'rxjs';
import {
  Contractor,
  ContractorInfo,
  ContractorAddress,
} from '../models/contractor.model';
import { ContractorService } from './contractor.service';

@Injectable({
  providedIn: 'root',
})
export class EgrService {
  // baseUrl = 'http://egr.gov.by/egrn/API.jsp';

  constructor(
    private _http: HttpClient,
    private _httpNative: HTTP,
    private _platform: Platform,
    private _contractor: ContractorService
  ) {}

  getContractorByUnp(UNP: string): Contractor {
    let tempContractor: Contractor = new Contractor();
    debugger;

    this.getJurNames(UNP).subscribe((responseInfo: any) => {
      if (responseInfo.data) {
        tempContractor.info = this.mappingJurNames(
          JSON.parse(responseInfo.data)[0]
        );

        this.getAddressByRegNum(UNP).subscribe((responseAddress: any) => {
          if (responseAddress) {
            tempContractor.juridicalAddress = this.mappingJurAddress(
              JSON.parse(responseAddress.data)[0]
            );
          }
        });
      }
    });

    debugger;
    return tempContractor;
  }

  private getJurNames(UNP: string) {
    if (UNP) {
      if (this._platform.is('cordova')) {
        return from(
          this._httpNative.get(
            `http://egr.gov.by/api/v2/egr/getJurNamesByRegNum/${UNP}`,
            {},
            {}
          )
        );
      } else {
        return from(
          this._http.get(
            `http://egr.gov.by/api/v2/egr/getJurNamesByRegNum/${UNP}`
          )
        );
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
          `http://egr.gov.by/api/v2/egr/getJurNamesByRegNum/${UNP}`,
          {},
          {}
        )
      );
    } else {
      return from(
        this._http.get(
          `http://egr.gov.by/api/v2/egr/getJurNamesByRegNum/${UNP}`
        )
      );
    }
  }

  private mappingJurAddress(data: any): ContractorAddress {
    let juridicalAddress = new ContractorAddress();

    juridicalAddress.city = data.vnp;
    juridicalAddress.country = data.nsi00201.vnstranp;
    // juridicalAddress.countryType = data.vfn;
    juridicalAddress.houseNumber = data.vdom;
    juridicalAddress.office = data.vpom;
    juridicalAddress.street = data.vulitsa;
    juridicalAddress.zipCode = data.nindex;
    juridicalAddress.phone = data.vtels;
    juridicalAddress.email = data.vemail;

    return juridicalAddress;
  }

  private mappingJurNames(data: any): ContractorInfo {
    let info = new ContractorInfo();

    info.fullName = data.vnaim;
    info.shortName = data.vn;
    info.name = data.vfn;

    info.fullNameBel = data.vnaimb;
    info.shortNameBel = data.vnb;
    info.nameBel = data.vfnb;

    info.registrationDate = data.dcrta;

    return info;
  }
}
