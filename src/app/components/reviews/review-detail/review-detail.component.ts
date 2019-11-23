import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent implements OnInit, OnDestroy {

  public review: any;
  public id: string;
  private subscription: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private titleService: Title) { }

    public ngOnInit() {
    const idParam = 'id';
    this.subscription = this.route.params.subscribe(params => {
      this.id = params[idParam];
    });

    this.reviewService.get(this.id).then((doc) => {
      if (doc.exists) {
        this.review = doc.data();
        this.titleService.setTitle('Travelng Women Talk | ' + this.review.location);
      } else {
        console.log('No such document!');
        this.review = null;
      }
    }).catch(function(error) {
      console.log('Error getting document:', error);
      this.review = null;
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  public deleteReview() {
    this.reviewService.delete(this.review.id)
      .catch(err => console.log(err));

    this.router.navigate(['/reviews']);
  }
}
