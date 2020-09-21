import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Profile } from '../models/profile.model';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private dbPath = '/profiles';
  profileRef: AngularFirestoreCollection<Profile> = null;
  dbRef: AngularFirestoreCollection<Profile> = null;

  constructor(
    private _fs: AngularFirestore,
    private _auth: AuthService,
    private _router: Router
  ) {
    if (this._auth.isLoggedIn) {
      this.profileRef = this._fs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this._auth.getUserId())
      );
    }
  }

  getAll(): AngularFirestoreCollection<Profile> {
    return this.profileRef;
  }

  add(profile: Profile) {
    const pushkey = this._fs.createId();
    profile._id = pushkey;
    profile._userId = this._auth.getUserId();
    return from(
      this._fs
        .collection(this.dbPath)
        .doc(pushkey)
        .set(JSON.parse(JSON.stringify(profile)))
    );
  }

  delete(_id: string): Promise<void> {
    return this.profileRef.doc(_id).delete();
  }

  update(_id: string, value: any): Promise<void> {
    return this.profileRef.doc(_id).update(value);
  }
}
