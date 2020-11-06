import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Profile } from '../models/profile.model';
import { from, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  profileRef: AngularFirestoreCollection<Profile> = null;
  dbRef: AngularFirestoreCollection<Profile> = null;
  profileList: Profile[] = [];

  private selectedProfileSubject = new Subject<Profile>();
  private selectedProfile = new Profile();
  private dbPath = '/profiles';

  constructor(
    private _fs: AngularFirestore,
    private _auth: AuthService,
    private _router: Router
  ) {
    if (this._auth.isLoggedIn) {
      this.profileRef = this._fs.collection(this.dbPath, (q) =>
        q.where('_userId', '==', this._auth.getUserId())
      );

      this.getAll()
        .valueChanges()
        .subscribe((response: Profile[]) => {
          if (response && response.length > 0) {
            this.setSelectedProfile(response[0]);
            this.profileList = response;
          }
        });
    }
  }

  setSelectedProfile(profile: Profile): void {
    this.selectedProfileSubject.next(profile);
    this.selectedProfile = profile;
  }

  getSelectedProfile(): Observable<Profile> {
    return this.selectedProfileSubject.asObservable();
  }

  getSelectedProfileValue(): Profile {
    return this.selectedProfile;
  }

  clearSelectedProfile() {
    this.selectedProfileSubject.next();
  }

  getAll(): AngularFirestoreCollection<Profile> {
    // getAll(): Observable<Profile[]> {
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

  // Returns true when user is have activated profile
  get isActive(): boolean {
    if (!this.profileList) {
      this.profileRef.valueChanges().subscribe((response: any) => {
        if (response) {
          this.profileList = response;
        }
      });
    }

    if (this.profileList && this.profileList.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
