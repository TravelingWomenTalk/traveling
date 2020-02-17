import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { switchMap, map } from 'rxjs/operators';
import { Review } from 'src/app/shared/models/review.model';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent implements OnInit {

  public review: any;
  public id: string;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private titleService: Title) { }

  public ngOnInit(): void {
    this.getReview();
  }

  public getReview(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.id = params['id'];
        return this.reviewService.get(this.id).snapshotChanges().pipe(
          map(action => {
            const data = action.payload.data() as Review;
            const id = action.payload.id;
            return { id, ...data };
          })
        )
      })
    ).subscribe((review: Review) => {
      this.review = review;
      this.titleService.setTitle('Travelng Women Talk | ' + this.review.location);
    });
  }
}
