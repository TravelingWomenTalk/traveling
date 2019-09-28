import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { Review } from 'src/app/shared/models/review.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { reject } from 'q';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit, OnDestroy {
  reviewForm: FormGroup;
  review: Review = {
    key: undefined,
    name: '',
    age: undefined
  };
  isEdit: boolean = false;
  id: string;
  private subscription: any;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder) { }

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
      name: new FormControl(this.review.name),
      age: new FormControl(this.review.age)
    });
  }

  save() {
    this.review = this.reviewForm.getRawValue();

    this.isEdit ? this.reviewService.update(this.id, this.review) : this.reviewService.create(this.review);
    this.router.navigate(['/reviews']);
  }

  cancel() {
    this.router.navigate(['/reviews']);
  }
}
