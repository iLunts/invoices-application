import { Service } from './service.model';
import { Contractor } from './contractor.model';
import * as moment from 'moment';

export class Invoice {
  _doc: string;
  _userId: string;
  number: string;
  createDate: Date;
  expiredDate: Date;

  // TODO: Need change to model
  billTo: object;
  billFrom: object;

  contractor: Contractor;
  services: object;

  constructor(
    contractor?: Contractor,
    services?: Service,
    number?: string,
    createDate?: Date,
    expiredDate?: Date
  ) {
    this.number = number || null;
    this.contractor = contractor || null;
    this.services = services || [];
    this.createDate = createDate || moment().toDate();
    this.expiredDate = expiredDate || moment().add(7, 'days').toDate();
  }
}

export class Price {
  amount: number;
  currency: number;
}

export class InvoiceListItem {
  service: Service;
  quantity: number;

  constructor(service?: Service, quantity?: number) {
    this.service = service || null;
    this.quantity = quantity || 1;
  }
}
