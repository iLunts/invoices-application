export class Bank {
  _id: string;
  count: number;
  isCalculate: boolean;
  textValue: string;

  constructor(
    _id?: string,
    count?: number,
    isCalculate?: boolean,
    textValue?: string
  ) {
    this._id = _id || null;
    this.count = count || null;
    this.isCalculate = isCalculate || null;
    this.textValue = textValue || null;
  }
}
