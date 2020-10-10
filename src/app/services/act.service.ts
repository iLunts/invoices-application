import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Invoice } from '../models/invoice.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { ContractorService } from './contractor.service';
import { Act } from '../models/act.model';

@Injectable({
  providedIn: 'root',
})
export class ActService {
  private dbPath = '/acts';
  private dbPathStatuses = '/actStatuses';
  actsRef: AngularFirestoreCollection<Act> = null;
  actsForContractorsRef: AngularFirestoreCollection<Act> = null;
  // invoiceList: Observable<Invoice[]>;

  constructor(
    private _fs: AngularFirestore,
    private _auth: AuthService,
    // private _contractor: ContractorService
  ) {
    if (this._auth.isLoggedIn) {
      this.actsRef = _fs.collection(this.dbPath, (q) =>
        q
          .where('_userId', '==', this._auth.getUserId())
          .orderBy('_createdDate', 'desc')
      );
    }
  }

  getAll(): Observable<any[]> {
    return this.actsRef.valueChanges();
  }

  get(id: string) {
    return this._fs
      .collection(this.dbPath, (q) => q.where('_id', '==', id))
      .valueChanges();
  }

  getAllStatus() {
    return this._fs
      .collection(this.dbPathStatuses, (q) => q.orderBy('order'))
      .valueChanges();
  }

  getAllByStatus(statusId: string) {
    return this._fs
      .collection(this.dbPathStatuses, (q) =>
        q
          .where('_userId', '==', this._auth.getUserId())
          .where('_id', '==', statusId)
      )
      .valueChanges();
  }

  // getAllByContractor(): Observable<any[]> {
  //   this.actsForContractorsRef = this._fs.collection(this.dbPath, (q) =>
  //     q
  //       .where('_userId', '==', this._auth.getUserId())
  //       .where(
  //         'contractor.info.unp',
  //         '==',
  //         this._contractor.getContractor().info.unp
  //       )
  //       .orderBy('_createdDate', 'desc')
  //   );
  //   return this.actsForContractorsRef.valueChanges();
  // }

  add(act: Act) {
    const pushkey = this._fs.createId();
    act._id = pushkey;
    act._userId = this._auth.getUserId();
    act._createdDate = new Date();
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(pushkey)
        .set(JSON.parse(JSON.stringify(act)))
      // .set({ ...invoice })
    );
  }

  delete(_id: string): Promise<void> {
    return this.actsRef.doc(_id).delete();
  }

  update(_id: string, value: any): Promise<void> {
    return this.actsRef.doc(_id).update(value);
  }
}
