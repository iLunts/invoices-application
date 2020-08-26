import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Unit } from '../models/unit.model';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private dbPath = '/utitTypes';
  unitRef: AngularFirestoreCollection<Unit> = null;

  constructor(private _fs: AngularFirestore) {
    this.unitRef = _fs.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Unit> {
    return this.unitRef;
  }
}
