import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
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
    debugger;

    return userRef.set(data, { merge: true });
  }

  async logout() {
    await this._fa.signOut();
    localStorage.removeItem('userId');
    return this._router.navigate(['/']);
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

  login(email: string, password: string) {
    this._fa
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        this.updateUserData(value.user);
        localStorage.setItem('userId', value.user.uid);
        if (!value.user.emailVerified) {
          debugger;
          this.verifyEmail(value.user.email);
        }
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }
}
