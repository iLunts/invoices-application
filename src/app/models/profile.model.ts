import { ContractorAddress, ContractorInfo } from './contractor.model';
import { BankAccount } from './bank.model';
import * as moment from 'moment';

export class Profile {
  _id: string;
  _createdDate: string;
  _userId: string;

  info: ContractorInfo;
  mailingAddress: ContractorAddress;
  juridicalAddress: ContractorAddress;
  bankAccount: BankAccount;

  constructor(
    _id?: string,
    _createdDate?: string,
    _userId?: string,
    // _contractId?: string,
    info?: ContractorInfo,
    mailingAddress?: ContractorAddress,
    juridicalAddress?: ContractorAddress,
    bankAccount?: BankAccount
  ) {
    this._id = this._id || null;
    this._userId = this._userId || null;
    this._createdDate = this._createdDate || moment().toString() || null;
    this.info = info || new ContractorInfo();
    this.mailingAddress = mailingAddress || new ContractorAddress();
    this.juridicalAddress = juridicalAddress || new ContractorAddress();
    this.bankAccount = bankAccount || new BankAccount();
  }
}
