import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Contractor } from '../models/contractor.model';

@Injectable({
  providedIn: 'root',
})
export class ContractorService {
  private dbPath = '/customers';
  customersRef: AngularFirestoreCollection<Contractor> = null;
  dbRef: AngularFirestoreCollection<Contractor> = null;

  constructor(
    private _fs: AngularFirestore,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.customersRef = this._fs.collection(this.dbPath, (q) =>
      q.where('_userId', '==', this._auth.getUserId())
    );
  }

  getAll(): AngularFirestoreCollection<Contractor> {
    return this.customersRef;
  }

  add(contractor: Contractor): void {
    const pushkey = this._fs.createId();
    contractor._id = pushkey;
    this._fs
      .collection(this.dbPath)
      .doc(pushkey)
      .set({ ...contractor });
    this._router.navigate(['/customer']);
    // this._notification.success('Контрагент успешно создан');
  }

  delete(_id: string): Promise<void> {
    return this.customersRef.doc(_id).delete();
  }

  update(_id: string, value: any): Promise<void> {
    return this.customersRef.doc(_id).update(value);
  }
}
