import { BankAccount } from './bank.model';
import * as moment from 'moment';

export class Contractor {
  _id: string;
  _createdDate: string;
  _userId: string;
  _type: number;

  info: ContractorInfo;
  mailingAddress: ContractorAddress;
  juridicalAddress: ContractorAddress;
  bankAccount: BankAccount;

  constructor(
    _id?: string,
    _createdDate?: string,
    _userId?: string,
    _type?: number,
    info?: ContractorInfo,
    mailingAddress?: ContractorAddress,
    juridicalAddress?: ContractorAddress,
    bankAccount?: BankAccount
  ) {
    this._id = this._id || null;
    this._userId = this._userId || null;
    this._createdDate = this._createdDate || moment().toString() || null;
    this._type = this._type || 1;
    this.info = info || new ContractorInfo();
    this.mailingAddress = mailingAddress || new ContractorAddress();
    this.juridicalAddress = juridicalAddress || new ContractorAddress();
    this.bankAccount = bankAccount || new BankAccount();
  }
}

export class ContractorAddress {
  zipCode: string;
  country: string;
  countryType: string;
  city: string;
  street: string;
  houseNumber: string;
  office: string;
  email: string;
  phone: string;
  fax: string;

  constructor(
    zipCode?: string,
    country?: string,
    countryType?: string,
    city?: string,
    street?: string,
    houseNumber?: string,
    office?: string,
    email?: string,
    phone?: string,
    fax?: string
  ) {
    this.zipCode = zipCode || null;
    this.country = country || null;
    this.countryType = countryType || null;
    this.city = city || null;
    this.street = street || null;
    this.houseNumber = houseNumber || null;
    this.office = office || null;
    this.email = email || null;
    this.phone = phone || null;
    this.fax = fax || null;
  }

  // getAddressFromEGR(data: any) {
  //   let obj = new ContractorAddress();
  //   return obj;
  // }
}

export class ContractorInfo {
  fullName?: string;
  fullNameBel?: string;
  shortName?: string;
  shortNameBel?: string;
  name?: string;
  nameBel?: string;
  registrationDate?: string;
  unp?: string;

  constructor(
    fullName?: string,
    fullNameBel?: string,
    shortName?: string,
    shortNameBel?: string,
    name?: string,
    nameBel?: string,
    registrationDate?: string,
    unp?: string
  ) {
    this.fullName = fullName || null;
    this.fullNameBel = fullNameBel || null;
    this.shortName = shortName || null;
    this.shortNameBel = shortNameBel || null;
    this.name = name || null;
    this.nameBel = nameBel || null;
    this.registrationDate = registrationDate || null;
    this.unp = unp || null;
  }
}
