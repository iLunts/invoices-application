export class Invoice {
  _doc: string;
  _userId: string;
  number: string;
  createDate: Date;
  expiredDate: Date;

  // TODO: Need change to model
  billTo: object;
  billFrom: object;

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
