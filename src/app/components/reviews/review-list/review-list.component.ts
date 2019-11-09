import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/shared/services/review.sevice';
import { map } from 'rxjs/operators';
import { Review } from 'src/app/shared/models/review.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss']
})
export class ReviewListComponent implements OnInit {
 
  reviews: any;
 
  constructor(private reviewService: ReviewService,
    private router: Router,
    private snackBar: MatSnackBar,
    private titleService: Title) {
      this.titleService.setTitle("Travelng Women Talk | Reviews");
    }
 
  ngOnInit() {
    this.getAllReviews();
  }
 
  getAllReviews() {
    this.reviewService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  navigateDetails(review: Review) {
    this.router.navigate(['/review', review.id]);
  }

  editReview(review: Review) {
    this.router.navigate(['/review', review.id, 'edit']);
  }
 
  deleteReview(review: Review) {
    this.reviewService.delete(review.id);
    this.snackBar.open('Review deleted', 'dismiss', {
      duration: 9000,
      panelClass: ['error-snackbar']
    });
  }
}
