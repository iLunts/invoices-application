import { Contractor } from './contractor.model';
import { BankAccount } from './bank.model';

export class Profile {
  _id: string;
  _userId: string;
  company: Contractor;
  bankAccount: BankAccount;
  legalInformation: any;

  constructor(
    _id?: string,
    _userId?: string,
    company?: Contractor,
    bankAccount?: any,
    legalInformation?: any
  ) {
    this._id = _id || null;
    this._userId = _userId || null;
    this.company = company || null;
    this.bankAccount = bankAccount || null;
    this.legalInformation = legalInformation || null;
  }
}
