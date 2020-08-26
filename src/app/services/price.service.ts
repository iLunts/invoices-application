import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Unit } from '../models/unit.model';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private dbPath = '/priceTypes';
  priceRef: AngularFirestoreCollection<Unit> = null;

  constructor(private _fs: AngularFirestore) {
    this.priceRef = _fs.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Unit> {
    return this.priceRef;
  }
}
