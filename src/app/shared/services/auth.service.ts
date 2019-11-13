import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  async emailCreate(email: string, password: string) {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.snackBar.open('Successfully signed up. Welcome!', 'dismiss', {
      duration: 9000,
      panelClass: ['info-snackbar']
    });
    return this.updateUserData(credential.user);
  }

  async emailLogin(email: string, password: string) {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.snackBar.open('Successfully signed in', 'dismiss', {
      duration: 9000,
      panelClass: ['info-snackbar']
    });
    return this.updateUserData(credential.user);
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider)
      .then((cred) => {
        this.updateUserData(cred.user);
        this.snackBar.open('Successfully signed in with Google', 'dismiss', {
          duration: 9000,
          panelClass: ['info-snackbar']
        });
        this.router.navigate(['/reviews']);
      })
      .catch((err) => {
        this.snackBar.open('Something went wrong.', 'dismiss', {
          duration: 9000,
          panelClass: ['error-snackbar']
        });
        console.log(err);
      });
    return credential;
  }

  async facebookSignin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider)
      .then((cred) => {
        this.updateUserData(cred.user);
        this.snackBar.open('Successfully signed in with Facebook', 'dismiss', {
          duration: 9000,
          panelClass: ['info-snackbar']
        });
        this.router.navigate(['/reviews']);
      })
      .catch((err) => {
        this.snackBar.open('Something went wrong.', 'dismiss', {
          duration: 9000,
          panelClass: ['error-snackbar']
        });
        console.log(err);
      });
    return credential;
  }

  getUserByUserId(id: string) {
    return this.afs.collection('user').doc(id).ref.get();
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isAdmin: false
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();

    this.snackBar.open('Sign out successful', 'dismiss', {
      duration: 9000,
      panelClass: ['info-snackbar']
    });

    this.router.navigate(['/reviews']);
  }

}
