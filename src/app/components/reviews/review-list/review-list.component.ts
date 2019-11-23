import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { map } from 'rxjs/operators';
import { Review } from 'src/app/shared/models/review.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {

  public reviews: Observable<Review[]>;

  constructor(
    public toastService: ToastService,
    private reviewService: ReviewService,
    private router: Router,
    private auth: AuthService,
    private titleService: Title) {
    this.titleService.setTitle('Travelng Women Talk | Reviews');
  }

  public ngOnInit() {
    this.getAllReviews();
  }

  public getAllReviews() {
    this.reviews = this.reviewService.getAll().snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Review;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public navigateDetails(review: Review) {
    this.router.navigate(['review', review.id]);
  }

  public shareReview(review: Review) {
    this.toastService.show('Shared review!', { classname: 'bg-success text-light', delay: 2000 });
  }

  public editReview(review: Review) {
    this.router.navigate(['review', review.id, 'edit']);
  }

  public deleteReview(review: Review) {
    this.reviewService.delete(review.id);
    this.toastService.show('Review deleted', { classname: 'bg-success text-light', delay: 2000 });
  }
}
