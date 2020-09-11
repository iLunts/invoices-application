import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { Contractor } from '../models/contractor.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private dbPath = '/contracts';
  private dbPathStatuses = '/contractStatuses';
  contractsRef: AngularFirestoreCollection<Contractor> = null;

  constructor(private _fs: AngularFirestore, private _auth: AuthService) {
    if (this._auth.isLoggedIn) {
      this.contractsRef = this._fs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this._auth.getUserId())
      );
    }
  }

  getAll(): AngularFirestoreCollection<Contractor> {
    return this.contractsRef;
  }

  getAllStatus() {
    return this._fs
      .collection(this.dbPathStatuses, (q) => q.orderBy('order'))
      .valueChanges();
  }

  add(contract: any): Observable<any> {
    const pushkey = this._fs.createId();
    contract._id = pushkey;
    contract._userId = this._auth.getUserId();
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(pushkey)
        .set(JSON.parse(JSON.stringify(contract)))
    );
  }

  delete(_id: string): Promise<void> {
    return this.contractsRef.doc(_id).delete();
  }

  update(_id: string, value: any): Promise<void> {
    return this.contractsRef.doc(_id).update(value);
  }
}
