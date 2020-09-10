import * as moment from 'moment';

export class Contract {
  _id: string;
  _createdDate: string;
  _userId: string;

  template: string;

  constructor(
    _id?: string,
    _createdDate?: string,
    _userId?: string,
    template?: string,
  ) {
    this._id = this._id || null;
    this._userId = this._userId || null;
    this._createdDate = this._createdDate || moment().toString() || null;
    this.template = template || null;
  }
}
