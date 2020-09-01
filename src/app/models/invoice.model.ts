import { Service } from './service.model';
import { Contractor } from './contractor.model';

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

  constructor(_userId?: string, number?: string) {
    this._userId = _userId;
    this.number = number;
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
