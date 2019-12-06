import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastService } from './toast.service';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public toastService: ToastService
  ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public async emailCreate(email: string, password: string): Promise<void> {
    const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.toastService.show('Successfully signed up. Welcome!', { classname: 'bg-success text-light', delay: 2000 });
    return this.updateUserData(credential.user);
  }

  public async emailLogin(email: string, password: string): Promise<void> {
    const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.toastService.show('Successfully signed in', { classname: 'bg-success text-light', delay: 2000 });
    return this.updateUserData(credential.user);
  }

  public async googleSignin(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider)
      .then((cred) => {
        this.updateUserData(cred.user);
        this.toastService.show('Successfully signed in with Google', { classname: 'bg-success text-light', delay: 2000 });
        this.router.navigate(['/reviews']);
      })
      .catch((err) => {
        this.toastService.show('Something went wrong', { classname: 'bg-danger text-light', delay: 2000 });
        console.log(err);
      });
    return credential;
  }

  public async facebookSignin(): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider)
      .then((cred) => {
        this.updateUserData(cred.user);
        this.toastService.show('Successfully signed in with Facebook', { classname: 'bg-success text-light', delay: 2000 });
        this.router.navigate(['/reviews']);
      })
      .catch((err) => {
        this.toastService.show('Something went wrong', { classname: 'bg-danger text-light', delay: 2000 });
        console.log(err);
      });
    return credential;
  }

  public getUserByUserId(id: string): AngularFirestoreDocument<User> {
    return this.afs.doc<User>('/users/' + id);
  }

  private updateUserData(user: User): Promise<void> {
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

  public async signOut(): Promise<void> {
    await this.afAuth.auth.signOut();

    this.toastService.show('Signed out', { classname: 'bg-success text-light', delay: 2000 });

    this.router.navigate(['/reviews']);
  }

}
