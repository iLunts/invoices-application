import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

//
// Firebase
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreDocument } from 'angularfire2/firestore';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user$: Observable<User>;
  // user = new BehaviorSubject<User>(null);
  // userInformation: User;
  userData: User;
  userSubject: BehaviorSubject<User>;

  constructor(
    private _fa: AngularFireAuth,
    private _fs: AngularFirestore,
    private _router: Router,
    public _ngZone: NgZone
  ) {
    this._fa.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Login in with email/password
  SignIn(email, password) {
    return this._fa.auth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this._fa.auth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this._fa.auth.currentUser.sendEmailVerification().then(() => {
      // this._router.navigate(['verify-email']);
    });
  }

  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this._fa.auth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert(
          'Password reset email has been sent, please check your inbox.'
        );
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this._fa.auth
      .signInWithPopup(provider)
      .then((result) => {
        this._ngZone.run(() => {
          this._router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Store user in localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this._fs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    // this.userSubject.next(userData);
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign-out
  SignOut() {
    return this._fa.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this._router.navigate(['login']);
    });
  }

  // getUserStateChange(): Observable<User> {
  //   return this.userSubject.asObservable();
  // }
}
