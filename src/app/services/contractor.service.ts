import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Contractor, ContractorInfo } from '../models/contractor.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractorService {
  // private dbPath = '/customers';
  private dbPath = '/contractors';
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

  add(contractor: Contractor): Observable<any> {
    const pushkey = this._fs.createId();
    contractor._id = pushkey;
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(pushkey)
        .set({ ...contractor })
    );
  }

  delete(_id: string): Promise<void> {
    return this.customersRef.doc(_id).delete();
  }

  update(_id: string, value: any): Promise<void> {
    return this.customersRef.doc(_id).update(value);
  }

  getMappingJurNamesFromEGR(data: any): ContractorInfo {
    debugger;
    let info = new ContractorInfo();

    info.fullName = data.vnaim;
    info.shortName = data.vn;
    info.name = data.vfn;

    info.fullNameBel = data.vnaimb;
    info.shortNameBel = data.vnb;
    info.nameBel = data.vfnb;

    info.registrationDate = data.dcrta;

    debugger;

    return info;
  }
}
