import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private dbPath = '/reviews';

  reviewsRef: AngularFirestoreCollection<Review> = null;

  constructor(private afs: AngularFirestore) { }

  get(id: string) {
    return this.afs.collection(this.dbPath).doc(id).ref.get();
  }

  getAll(): AngularFirestoreCollection<Review> {
    return this.afs.collection(this.dbPath);
  }

  create(review: Review): void {
    this.afs.collection(this.dbPath).add({ ...review });
  }

  update(id: string, value: any): Promise<void> {
    return this.afs.collection(this.dbPath).doc(id).update(value);
  }

  delete(id: string): Promise<void> {
    return this.afs.collection(this.dbPath).doc(id).delete();
  }
}
