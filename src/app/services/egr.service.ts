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
            `https://invoices.by/api/v2/egr/getJurNamesByRegNum/${UNP}`
            // `http://egr.gov.by/api/v2/egr/getJurNamesByRegNum/${UNP}`
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
          `https://invoices.by/api/v2/egr/getJurNamesByRegNum/${UNP}`
          // `http://egr.gov.by/api/v2/egr/getJurNamesByRegNum/${UNP}`
        )
      );
    }
  }

  private mappingJurAddress(data: any): ContractorAddress {
    let juridicalAddress = new ContractorAddress();

    juridicalAddress.city = data.vnp || data[0].vnp;
    juridicalAddress.country = data.nsi00201.vnstranp || data[0].nsi00201.vnstranp;
    // juridicalAddress.countryType = data.vfn;
    juridicalAddress.houseNumber = data.vdom || data[0].vdom;
    juridicalAddress.office = data.vpom || data[0].vpom;
    juridicalAddress.street = data.vulitsa || data[0].vulitsa;
    juridicalAddress.zipCode = data.nindex || data[0].nindex;
    juridicalAddress.phone = data.vtels || data[0].vtels;
    juridicalAddress.email = data.vemail || data[0].vemail;

    debugger;

    return juridicalAddress;
  }

  private mappingJurNames(data: any): ContractorInfo {
    let info = new ContractorInfo();

    info.fullName = data.vnaim || data[0].vnaim;
    info.shortName = data.vn || data[0].vn;
    info.name = data.vfn || data[0].vfn;

    info.fullNameBel = data.vnaimb || data[0].vnaimb;
    info.shortNameBel = data.vnb || data[0].vnb;
    info.nameBel = data.vfnb || data[0].vfnb;

    info.registrationDate = data.dcrta || data[0].dcrta;

    debugger;

    return info;
  }
}
