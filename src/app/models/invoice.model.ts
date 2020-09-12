import { Service } from './service.model';
import { Contractor } from './contractor.model';
import * as moment from 'moment';

export class Invoice {
  _id: string;
  _userId: string;
  number: string;
  createDate: string;
  expiredDate: string;
  contractId: string;

  // TODO: Need change to model
  billTo: object;
  billFrom: object;

  contractor: Contractor;
  services: object;
  status: InvoiceStatus;

  constructor(
    contractor?: Contractor,
    services?: Service,
    number?: string,
    createDate?: string,
    expiredDate?: string,
    status?: InvoiceStatus,
    contractId?: string
  ) {
    this.number = number || null;
    this.contractor = contractor || null;
    this.services = services || [];
    this.createDate = createDate || moment().toString();
    this.expiredDate = expiredDate || moment().add(7, 'days').toString();
    this.status = status || null;
    this.contractId = contractId || null;
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
}

export class InvoiceListItem {
  service: Service;
  quantity: number;

  constructor(service?: Service, quantity?: number) {
    this.service = service || null;
    this.quantity = quantity || 1;
  }
}
