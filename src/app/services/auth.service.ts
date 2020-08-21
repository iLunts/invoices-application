import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

//
// Firebase
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
// import { auth } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  user = new BehaviorSubject<User>(null);
  userInformation: User;

  constructor(
    private _fa: AngularFireAuth,
    private _fs: AngularFirestore,
    private _router: Router
  ) {
    this.user$ = this._fa.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.userInformation = user;
          return this._fs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this._fs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      refreshToken: user.refreshToken,
    };
    this.userInformation = data;
    this.user.next(data);

    localStorage.removeItem('userInformation');
    localStorage.setItem(
      'userInformation',
      JSON.stringify(this.userInformation)
    );

    return userRef.set(data, { merge: true });
  }

  async logout() {
    await this._fa.auth.signOut();
    localStorage.removeItem('userId');
    return this._router.navigate(['/']);
  }

  getUserStateChange(): Observable<User> {
    return this.user.asObservable();
  }

  getUser() {
    if (!this.userInformation.uid) {
      this.userInformation.uid = localStorage.getItem('userId');
    }
    return this.userInformation;
  }

  getUserId() {
    if (this.userInformation) {
      return this.userInformation.uid;
    } else {
      return localStorage.getItem('userId');
    }
  }

  login(data: any): Promise<any> {
    return this._fa.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  // login(data: any): void {
  //   this._fa.auth
  //     .signInWithEmailAndPassword(data.email, data.password)
  //     .then((value) => {
  //       this.updateUserData(value.user);
  //       localStorage.setItem('userId', value.user.uid);
  //       // if (!value.user.emailVerified) {
  //       //   debugger;
  //       //   this.verifyEmail(value.user.email);
  //       // }
  //     })
  //     .catch((err) => {
  //       console.log('Something went wrong:', err.message);
  //     });
  // }

  checkPreAuthorization() {
    if (localStorage.getItem('userInformation')) {
      this.updateUserData(JSON.parse(localStorage.getItem('userInformation')));
    }
  }
}
