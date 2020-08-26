import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Bank } from '../models/bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private dbPath = '/banks';
  banksRef: AngularFirestoreCollection<Bank> = null;

  constructor(
    private _fs: AngularFirestore,
  ) {
    // this.banksRef = _fs.collection(this.dbPath, q => q.where('CdControl', '==', null));
    this.banksRef = _fs.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Bank> {
    return this.banksRef;
  }
}
