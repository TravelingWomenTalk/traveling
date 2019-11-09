import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { Review } from 'src/app/shared/models/review.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit, OnDestroy {
  reviewForm: FormGroup;
  review: Review = {
    id: undefined,
    userId: undefined,
    createdDate: undefined,
    travelDate: undefined,
    placeId: undefined,
    location: undefined,
    rating: undefined,
    description: undefined
  };
  isEdit: boolean = false;
  id: string;
  private subscription: any;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private auth: AuthService) { }

  ngOnInit() {
    this.isEdit = this.route.routeConfig.path.substr(this.route.routeConfig.path.length - 5) === '/edit';

    if (this.isEdit) {
      this.getReviewId()
        .then(() => this.getReview())
        .then(() => this.buildForm());
    }

    this.buildForm();
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  getReviewId() {
    return new Promise((resolve, reject) => {
      this.subscription = this.route.params.subscribe(params => {
        this.id = params['id']; // (+) converts string 'id' to a number
        resolve();
      });
    });
  }

  getReview() {
    return new Promise((resolve, reject) => {
      this.reviewService.get(this.id).then((doc) => {
        if (doc.exists) {
          this.review = <Review>doc.data();
          this.review.travelDate = doc.data().travelDate.toDate()
          resolve();
        } else {
          console.log("No such document!");
          reject();
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
        reject();
      });
    });
  }

  buildForm() {
    this.reviewForm = new FormGroup({
      travelDate: new FormControl(this.review.travelDate),
      location: new FormControl(this.review.location),
      rating: new FormControl(this.review.rating),
      description: new FormControl(this.review.description)
    });
  }

  save() {
    this.review = this.reviewForm.getRawValue();

    if (this.isEdit) {
      this.review.lastEdited = new Date();
      this.reviewService.update(this.id, this.review)
    } else {
      this.auth.user$.subscribe((user) => {
        this.review.userId = user.uid;
        this.review.createdDate = new Date();
        this.reviewService.create(this.review)
      });
    }

    this.snackBar.open('Review saved', 'dismiss', {
      duration: 9000,
      panelClass: ['info-snackbar']
    });

    this.router.navigate(['/reviews']);
  }

  cancel() {
    this.router.navigate(['/reviews']);
  }
}
