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
    if (this._auth.isLoggedIn) {
      this.customersRef = this._fs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this._auth.getUserId())
      );
    }
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
