import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth.service';
import { map } from 'rxjs/operators';

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
      map((params: Params) => {
        this.id = params['id'];
        this.reviewService.get(this.id).valueChanges();
      })
    ).subscribe((document: any) => {
        this.review = document;
        this.review.travelDate = document.travelDate.toDate();
        this.titleService.setTitle('Travelng Women Talk | ' + this.review.location);
    });
  }

  public deleteReview(): void {
    this.reviewService.delete(this.review.id)
      .catch(err => console.log(err));

    this.router.navigate(['/reviews']);
  }
}
