import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Review } from '../models/review.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    public toastService: ToastService
  ) {
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

  public getAuthState(): void {
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

  public async emailCreate(email: string, password: string, user: User): Promise<void> {
    return await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        this.toastService.show('Successfully signed up. Welcome!', { classname: 'bg-success text-light', delay: 4000 });
        user.uid = cred.user.uid;
        this.createUserOnLogIn(user);
        this.router.navigate(['/reviews']);
      })
      .catch(error => {
        this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 4000 });
      });
  }

  public async emailLogin(email: string, password: string): Promise<void> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((cred) => {
        this.updateUserOnLogIn(cred.user);
        this.toastService.show('Signed in as ' + email, { classname: 'bg-success text-light', delay: 4000 });
        this.router.navigate(['/reviews']);
      })
      .catch(error => {
        this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 4000 });
      });
  }

  public async googleSignin(isCreate: boolean): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider)
      .then((cred) => {
        if (cred.additionalUserInfo.isNewUser) {
          this.createUserOnLogIn(cred.user);
        } else {
          this.updateUserOnLogIn(cred.user);
        }
        this.toastService.show('Successfully signed in with Google', { classname: 'bg-success text-light', delay: 4000 });
        this.router.navigate(['/reviews']);
      })
      .catch((err) => {
        this.toastService.show('Something went wrong', { classname: 'bg-danger text-light', delay: 4000 });
        console.log(err);
      });
    return credential;
  }

  public async facebookSignin(): Promise<void> {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider)
      .then((cred) => {
        if (cred.additionalUserInfo.isNewUser) {
          this.createUserOnLogIn(cred.user);
        } else {
          this.updateUserOnLogIn(cred.user);
        }
        this.toastService.show('Successfully signed in with Facebook', { classname: 'bg-success text-light', delay: 4000 });
        this.router.navigate(['/reviews']);
      })
      .catch((err) => {
        this.toastService.show('Something went wrong', { classname: 'bg-danger text-light', delay: 4000 });
        console.log(err);
      });
    return credential;
  }

  public getUserByUserId(id: string): AngularFirestoreDocument<User> {
    return this.afs.doc<User>('/users/' + id);
  }

  public createUserOnLogIn(user: User): Promise<void> {
    const userData: User = {
      uid: user.uid,
      lastLoggedInDate: new Date(),
      createdDate: new Date(),
      email: user.email,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      isAdmin: false,
      gender: user.gender || null,
      age: user.age || null,
      status: user.status || null,
      accomplice: user.accomplice || null,
      interest: user.interest || null,
      destination: user.destination || null
    };

    return this.afs.doc(`users/${userData.uid}`).set(userData, { merge: true });
  }

  public updateUserOnLogIn(user: User): Promise<void> {
    return this.afs.doc(`users/${user.uid}`).update({
      lastLoggedInDate: new Date()
    });
  }

  public async signOut(): Promise<void> {
    await this.afAuth.auth.signOut();

    this.toastService.show('Signed out', { classname: 'bg-success text-light', delay: 2000 });

    this.router.navigate(['/reviews']);
  }

  public update(id: string, userData: User): Promise<void> {
    return this.afs.doc<User>(`users/${id}`).update(userData)
      .then(() => {
        this.toastService.show('Your user profile has been updated', { classname: 'bg-success text-light', delay: 4000 });
      })
      .catch((err) => {
        this.toastService.show('Something went wrong', { classname: 'bg-danger text-light', delay: 4000 });
        console.log(err);
      });
  }

  public updateReviewUserData(reviews: Review[]): void {
    this.user$.subscribe((user: User) => {
      reviews.forEach((review: Review) => {
        this.afs.doc<Review>(`reviews/${review.id}`).update({
          user
        });
      });
    });
  }

}
