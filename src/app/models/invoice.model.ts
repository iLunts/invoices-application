import { Service } from './service.model';
import { Contractor } from './contractor.model';
import * as moment from 'moment';

export class Invoice {
  _id: string;
  _userId: string;
  _contractId: string;
  _actId: string;
  _createdDate: Date;
  number: string;
  createDate: string;
  expiredDate: string;
  contractId: string;

  // TODO: Need change to model
  billTo: object;
  billFrom: object;

  contractor: Contractor;
  services: Service[];
  status: InvoiceStatus;
  type: string;
  signature: Signature;
  total: TotalSum;

  constructor(
    _id?: string,
    _userId?: string,
    _contractId?: string,
    _actId?: string,
    _createdDate?: Date,
    contractor?: Contractor,
    services?: Service[],
    number?: string,
    createDate?: string,
    expiredDate?: string,
    status?: InvoiceStatus,
    type?: string,
    contractId?: string,
    signature?: Signature,
    total?: TotalSum
  ) {
    this._id = _id || null;
    this._userId = _userId || null;
    this._contractId = _contractId || null;
    this._actId = _contractId || null;
    this._createdDate = _createdDate || new Date();
    this.number = number || null;
    this.contractor = contractor || null;
    this.services = services || [];
    this.createDate = createDate || moment().toString();
    this.expiredDate = expiredDate || moment().add(7, 'days').toString();
    this.status = status || null;
    this.type = type || null;
    this.contractId = contractId || null;
    this.signature = signature || new Signature();
    this.total = total || new TotalSum();
  }
}

export class InvoiceStatus {
  _id: string;
  name: string;
  color: string;
  order: number;
}

export class Price {
  amount: number;
  currency: number;
  code: string;

  constructor(amount?: number, currency?: number, code?: string) {
    this.amount = amount || 0;
    this.currency = amount || 913;
    this.code = code || 'BYN';
  }
}

export class TotalSum {
  totalSum: Price;
  taxSum: Price;

  constructor(totalSum?: Price, taxSum?: Price) {
    this.totalSum = totalSum || new Price();
    this.taxSum = taxSum || new Price();
  }
}

export class InvoiceListItem {
  service: Service;
  quantity: number;

  constructor(service?: Service, quantity?: number) {
    this.service = service || null;
    this.quantity = quantity || 1;
  }
}

export class Signature {
  sign: string;
  firstName: string;
  lastName: string;
  initials: string;

  constructor(
    sign?: string,
    firstName?: string,
    lastName?: string,
    initials?: string
  ) {
    this.sign = sign || null;
    this.firstName = firstName || null;
    this.lastName = lastName || null;
    this.initials = initials || null;
  }
}
