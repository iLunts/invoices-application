import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServicesGroupService {
  private dbPath = '/servicesGroup';
  servicesGroupRef: AngularFirestoreCollection<Service> = null;
  dbRef: AngularFirestoreCollection<Service> = null;

  constructor(private _fs: AngularFirestore, private _auth: AuthService) {
    this.servicesGroupRef = _fs.collection(this.dbPath, (q) =>
      q.where('_userId', '==', this._auth.getUserId())
    );
  }

  getAll(): AngularFirestoreCollection<Service> {
    return this.servicesGroupRef;
  }

  // getByName(name: string): AngularFirestoreCollection<Service> {
  //   return this._fs.collection(this.dbPath, (q) =>
  //     q.where('_userId', '==', this._auth.getUserId()).where('name', '>=', name)
  //   );
  // }

  add(service: Service) {
    const pushkey = this._fs.createId();
    service._id = pushkey;
    service._userId = this._auth.getUserId();
    return this._fs
      .collection(this.dbPath)
      .doc(pushkey)
      .set({ ...service });
  }

  delete(_id: string): Promise<void> {
    if (!_id) {
      return;
    }
    return this.servicesGroupRef.doc(_id).delete();
  }

  update(_id: string, value: any): Promise<void> {
    return this.servicesGroupRef.doc(_id).update(value);
  }
}
