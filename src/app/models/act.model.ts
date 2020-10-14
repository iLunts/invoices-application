import { Service } from './service.model';
import { Contractor } from './contractor.model';
import * as moment from 'moment';

export class Act {
  _id: string;
  _userId: string;
  _contractId: string;
  _createdDate: Date;
  _invoiceId: string;
  number: string;
  createDate: string;
  expiredDate: string;
  contractId: string;

  contractor: Contractor;
  companyProfile: Contractor;

  orderList: OrderList[];
  status: ActStatus;
  signature: Signature;
  total: TotalSum;

  constructor(
    _id?: string,
    _userId?: string,
    _contractId?: string,
    _invoiceId?: string,
    _createdDate?: Date,
    contractor?: Contractor,
    orderList?: OrderList[],
    number?: string,
    createDate?: string,
    expiredDate?: string,
    status?: ActStatus,
    contractId?: string,
    signature?: Signature,
    total?: TotalSum
  ) {
    this._id = _id || null;
    this._userId = _userId || null;
    this._contractId = _contractId || null;
    this._invoiceId = _invoiceId || null;
    this._createdDate = _createdDate || new Date();
    this.number = number || null;
    this.contractor = contractor || null;
    this.orderList = orderList || [];
    this.createDate = createDate || moment().toString();
    this.expiredDate = expiredDate || moment().add(7, 'days').toString();
    this.status = status || null;
    this.contractId = contractId || null;
    this.signature = signature || new Signature();
    this.total = total || new TotalSum();
  }
}

export class OrderList {
  date: Date;
  service: Service;
  order: number;

  constructor(date?: Date, service?: Service, order?: number) {
    this.date = date || new Date();
    this.service = service || null;
    this.order = order || null;
  }
}

export class ActStatus {
  _id: string;
  name: string;
  color: string;
  order: number;
}

export class Price {
  amount: number;
  currency: number;

  constructor(amount?: number, currency?: number) {
    this.amount = amount || 0;
    this.currency = amount || 913;
  }
}

export class ActListItem {
  service: Service;
  quantity: number;

  constructor(service?: Service, quantity?: number) {
    this.service = service || null;
    this.quantity = quantity || 1;
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
