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
  customersExistRef: AngularFirestoreCollection<Contractor> = null;
  dbRef: AngularFirestoreCollection<Contractor> = null;

  selectedContractor: Contractor;

  constructor(
    private _fs: AngularFirestore,
    private _auth: AuthService,
    private _router: Router
  ) {
    if (this._auth.isLoggedIn) {
      this.customersRef = this._fs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this._auth.getUserId())
      );
    }
  }

  getAll(): AngularFirestoreCollection<Contractor> {
    return this.customersRef;
  }

  getById(id: string): AngularFirestoreCollection<any> {
    const collection = this._fs.collection(this.dbPath, (q) =>
      q.where('_userId', '==', this._auth.getUserId()).where('_id', '==', id)
    );
    return collection;
  }

  checkExistContactorByUNP(unp): Observable<any> {
    // let isExist = false;
    return this._fs
      .collection(this.dbPath, (q) =>
        q
          .where('_userId', '==', this._auth.getUserId())
          .where('info.unp', '==', unp)
      )
      .valueChanges();
    // return isExist;
  }

  add(contractor: any): Observable<any> {
    const pushkey = this._fs.createId();
    contractor._id = pushkey;
    contractor._userId = this._auth.getUserId();
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(pushkey)
        .set(JSON.parse(JSON.stringify(contractor)))
    );
  }

  delete(_id: string): Promise<void> {
    return this.customersRef.doc(_id).delete();
  }

  update(_id: string, value: any): Promise<void> {
    return this.customersRef.doc(_id).update(value);
  }

  setContractor(contractor: Contractor): void {
    this.selectedContractor = contractor;
  }

  getContractor(): Contractor {
    return this.selectedContractor;
  }

  // getMappingJurNamesFromEGR(data: any): ContractorInfo {
  //   debugger;

  //   let info = new ContractorInfo();

  //   info.fullName = data.vnaim || data[0].vnaim;
  //   info.shortName = data.vn || data[0].vn;
  //   info.name = data.vfn || data[0].vfn;

  //   info.fullNameBel = data.vnaimb || data[0].vnaimb;
  //   info.shortNameBel = data.vnb || data[0].vnb;
  //   info.nameBel = data.vfnb || data[0].vfnb;

  //   info.registrationDate = data.dcrta || data[0].dcrta;

  //   debugger;

  //   return info;
  // }
}
