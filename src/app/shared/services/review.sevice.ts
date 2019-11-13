import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private dbPath = '/reviews';

  reviewsRef: AngularFirestoreCollection<Review> = null;

  constructor(private db: AngularFirestore) { }

  get(id: string) {
    return this.db.collection(this.dbPath).doc(id).ref.get();
  }

  getAll(): AngularFirestoreCollection<Review> {
    return this.db.collection(this.dbPath);
  }

  create(review: Review): void {
    this.db.collection(this.dbPath).add({ ...review });
  }

  update(id: string, value: any): Promise<void> {
    return this.db.collection(this.dbPath).doc(id).update(value);
  }

  delete(id: string): Promise<void> {
    return this.db.collection(this.dbPath).doc(id).delete();
  }
}
