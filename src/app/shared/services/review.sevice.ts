import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private dbPath: string = '/reviews';

  constructor(
    private afs: AngularFirestore,
    private router: Router,
    public toastService: ToastService
  ) { }

  public get(id: string): AngularFirestoreDocument<Review> {
    return this.afs.doc<Review>(this.dbPath + '/' + id);
  }

  public getByUserId(id: string): AngularFirestoreCollection<Review> {
    return this.afs.collection<Review>(this.dbPath, ref =>
      ref.where('user.uid', '==', id).orderBy('createdDate')
    );
  }

  public getAll(): AngularFirestoreCollection<Review> {
    return this.afs.collection<Review>(this.dbPath, ref =>
      ref.orderBy('createdDate'));
  }

  public create(review: Review): void {
    this.afs.collection(this.dbPath).add({ ...review })
    .then(() => {
      this.toastService.show('Review created for ' + review.location, { classname: 'bg-success text-light', delay: 4000 });
      this.router.navigate(['/reviews']);
    })
    .catch((err) => {
      this.toastService.show('Something went wrong', { classname: 'bg-danger text-light', delay: 4000 });
      console.log(err);
    });
  }

  public update(id: string, review: Review): Promise<void> {
    return this.afs.doc<Review>(this.dbPath + '/' + id).update(review)
    .then(() => {
      this.toastService.show('Review for ' + review.location + ' updated', { classname: 'bg-success text-light', delay: 4000 });
      this.router.navigate(['/reviews']);
    })
    .catch((err) => {
      this.toastService.show('Something went wrong', { classname: 'bg-danger text-light', delay: 4000 });
      console.log(err);
    });
  }

  public delete(id: string): Promise<void> {
    return this.afs.doc<Review>(this.dbPath + '/' + id).delete()
    .then(() => {
      this.toastService.show('Review deleted', { classname: 'bg-success text-light', delay: 4000 });
      this.router.navigate(['/reviews']);
    })
    .catch((err) => {
      this.toastService.show('Something went wrong', { classname: 'bg-danger text-light', delay: 4000 });
      console.log(err);
    });
  }
}
