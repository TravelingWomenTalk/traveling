import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { Review } from 'src/app/shared/models/review.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Title } from '@angular/platform-browser';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit, OnDestroy {
  public reviewForm: FormGroup;
  public review: Review = {
    id: undefined,
    user: undefined,
    createdDate: undefined,
    travelDate: undefined,
    placeId: undefined,
    location: undefined,
    rating: undefined,
    description: undefined
  };
  public isEdit = false;
  public title = '';
  public id: string;
  private subscription: any;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToastService,
    private authService: AuthService,
    private titleService: Title) {
    this.titleService.setTitle('Travelng Women Talk | Write');
  }

  public ngOnInit() {
    this.isEdit = this.route.routeConfig.path.substr(this.route.routeConfig.path.length - 5) === '/edit';

    if (this.isEdit) {
      this.title = 'Edit review';
      this.getReviewId()
        .then(() => this.getReview())
        .then(() => this.buildForm());
    } else {
      this.title = 'Write a review';
    }

    this.buildForm();
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public getReviewId() {
    const idParam = 'id';

    return new Promise((resolve, reject) => {
      this.subscription = this.route.params.subscribe(params => {
        this.id = params[idParam];
        resolve();
      });
    });
  }

  public getReview() {
    return new Promise((resolve, reject) => {
      this.reviewService.get(this.id).then((doc) => {
        if (doc.exists) {
          this.review = doc.data() as Review;
          this.review.travelDate = doc.data().travelDate.toDate();
          resolve();
        } else {
          console.log('No such document!');
          reject();
        }
      }).catch((error) => {
        console.log('Error getting document:', error);
        reject();
      });
    });
  }

  public buildForm() {
    this.reviewForm = new FormGroup({
      travelDate: new FormControl(this.review.travelDate),
      location: new FormControl(this.review.location),
      rating: new FormControl(this.review.rating),
      description: new FormControl(this.review.description)
    });
  }

  public save() {
    this.review = this.reviewForm.getRawValue();

    if (this.isEdit) {
      this.review.lastEdited = new Date();
      this.reviewService.update(this.id, this.review);
    } else {
      this.authService.user$.subscribe((user) => {
        this.review.user = user;
        this.review.createdDate = new Date();
        this.reviewService.create(this.review);
      });
    }

    this.toastService.show('Review saved', { classname: 'bg-success text-light', delay: 2000 });

    this.router.navigate(['/reviews']);
  }

  public cancel() {
    this.router.navigate(['/reviews']);
  }
}
