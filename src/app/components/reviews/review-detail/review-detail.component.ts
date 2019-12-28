import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';
import { switchMap } from 'rxjs/operators';
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
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private reviewService: ReviewService,
    private titleService: Title) { }

  public ngOnInit(): void {
    this.getReview();
  }

  public getReview(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        this.id = params['id'];
        return this.reviewService.get(this.id).valueChanges();
      })
    ).subscribe((review: Review) => {
        this.review = review;
        this.titleService.setTitle('Travelng Women Talk | ' + this.review.location);
    });
  }

  public deleteReview(): void {
    this.reviewService.delete(this.review.id)
      .catch(err => console.log(err));

    this.router.navigate(['/reviews']);
  }
}
