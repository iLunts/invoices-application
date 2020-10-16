// import { Price } from './invoice.model';
import { Unit } from './unit.model';

export class Service {
  _id: string;
  _userId: string;
  _groupId: string;
  desc: string;
  count: number;
  groupName: string;
  name: string;
  price: number;
  // price: Price;
  tax: number;
  unit: Unit;
  isFreePrice: boolean;
}

export class ServiceGroup {
  _id: string;
  _userId: string;
  name: string;
  desc: string;
}
