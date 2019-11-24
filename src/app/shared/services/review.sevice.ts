import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private dbPath = '/reviews';

  constructor(private afs: AngularFirestore) { }

  public get(id: string) {
    return this.afs.collection(this.dbPath).doc(id).ref.get();
  }

  public getAll(): AngularFirestoreCollection<Review> {
    return this.afs.collection<Review>(this.dbPath);
  }

  public create(review: Review): void {
    this.afs.collection(this.dbPath).add({ ...review });
  }

  public update(id: string, value: any): Promise<void> {
    return this.afs.collection(this.dbPath).doc(id).update(value);
  }

  public delete(id: string): Promise<void> {
    return this.afs.collection(this.dbPath).doc(id).delete();
  }
}
